---
title: Java的HashMap
published: 2019/11/12
---

记录下学习的内容，方便以后可以回顾，主要了解一下 HashMap 扩列原理。

# HashMap原理简析

## 概述

  > [散列表](https://baike.baidu.com/item/散列表/10027933)（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的[数据结构](https://baike.baidu.com/item/数据结构/1450)。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做[散列函数](https://baike.baidu.com/item/散列函数/2366288)，存放记录的[数组](https://baike.baidu.com/item/数组/3794097)叫做[散列表](https://baike.baidu.com/item/散列表/10027933)。

**HashMap** 在 Java 项目里随处可见，它内部维护了一个哈希表，用于映射(键值对)处理的数据类型。

## 要点

官方[文档](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)里已经对 HashMap 进行了描述，大致有下列 5 个要点：

  1. 允许 `null` 值与 `null` key
  2. 无法保证顺序
  3. 影响性能的两个因素：*capacity* 和 *load factor*
  4. 不保证线程同步
  5. 具备 *fail-fast* 保护机制

*capacity* 指的是哈希表的容量， *load factor* 指的是哈希表的负载因子，关于这两个变量的关系，官方的描述是：

  > The *load factor* is a measure of how full the hash table is allowed to get before its capacity is automatically increased. When the number of entries in the hash table exceeds the product of the load factor and the current capacity, the hash table is ***rehashed*** (that is, internal data structures are rebuilt) so that the hash table has approximately twice the number of buckets.

  > As a general rule, the default load factor (.75) offers a good tradeoff between time and space costs. Higher values decrease the space overhead but increase the lookup cost (reflected in most of the operations of the `HashMap` class, including `get` and `put`). The expected number of entries in the map and its load factor should be taken into account when setting its initial capacity,

简而言之：

  * 只要满足条件 `总数据量 > load factor * current capacity`，HashMap 内部的哈希表就会被重构 (简称 rehash)，哈希表容量扩大至原来的 2 倍。
  * 为避免哈希表 rehash 带来的性能损耗，建议考虑初始容量大小 *initial capacity*。
  * *load factor* 默认值是 0.75，该值的定义权衡了时间与空间的成本，设置太高或者太低都会导致性能失衡。

## 初始化

HashMap 提供四个构造函数。

```java
public HashMap() // 默认
public HashMap(int initialCapacity) // 指定初始化容量
public HashMap(int initialCapacity, float loadFactor) // 指定初始化容量、负载因子
public HashMap(Map<? extends K, ? extends V> m) // 初始化并且复制另外一个 Map
```

如果未指定 `initialCapacity`，那么 (初始) 哈希表容量默认是 **16**，如果未指定 `loadFactor`，那么负载因子默认是 **0.75**。正常情况下，开发人员无需改动 `loadFactor` 数值。

```java
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16
static final float DEFAULT_LOAD_FACTOR = 0.75f;
```

根据 HashMap 的文档所述，可通过预估需要存储的数据量，来避免不必要的 rehash。[阿里巴巴Java开发手册](https://github.com/alibaba/p3c)也针对这种情况进行了描述：

> 说明：HashMap 使用 HashMap(int initialCapacity) 初始化，如果暂时无法确定集合大小，那么指定默认值（16）即可。  
>正例：initialCapacity = (需要存储的元素个数 / 负载因子) + 1。注意负载因子（即 loader factor）默认为 0.75，如果暂时无法确定初始值大小，请设置为 16（即默认值）。  
>反例：HashMap 需要放置 1024 个元素，由于没有设置容量初始大小，随着元素不断增加，容量 7 次被迫扩大，resize 需要重建 hash 表。当放置的集合元素个数达千万级别时，不断扩容会严重影响性能。

类似的，Google 出品的 Guava 库也针对 HashMap 的初始化进行了封装：

```java
public static <K, V> HashMap<K, V> newHashMapWithExpectedSize(int expectedSize) {
  return new HashMap(capacity(expectedSize));
}

static int capacity(int expectedSize) {
    if (expectedSize < 3) {
        CollectPreconditions.checkNonnegative(expectedSize, "expectedSize");
        return expectedSize + 1;
    } else {
        return expectedSize < 1073741824 ? (int)((float)expectedSize / 0.75F + 1.0F) : 2147483647;
    }
}
```

无一例外，它们都使用 `((float) expectedSize / loadFactor) + 1.0F` 作为 HashMap 的入参。因此在开发过程中，如果知道需要存储的数据量较大，可以采用这些方式进行初始化，提高系统运行的效率。

## 存数据(put)

在执行一行 `map.put("one", "")`代码大概发生了什么？

------

  1.  根据字符串 *one* 的 *hashCode()* 做一次 *hash* 计算
  2.  判断哈希表是否初始化。否，则进行初始化 `resize`
  3.  根据 *hash* 计算 *one* 在哈希表的实际位置 *index*
  4.  判断所处位置是否有数据 (哈希碰撞)
      * 有且等于 *one* ，把旧数据覆盖掉
      * 有且不等于 *one*
        * 在当前位置以链表方式追加。如果链表长度大于等于 7，链表重构为红黑树  
          如果追加过程发现相同数据  *one*，覆盖旧数据
      * 无，直接存入哈希表
  5.  如果当前满足 `总数据量 > load factor * current capacity`，则数据结构重构 `resize`

------

以上流程可直接进入 **java.util.HashMap#put** 方法一探究竟。

## 哈希表的容量(2^n)

无论是哈希表默认大小、指定初始大小、扩容大小，结果都将是 **2的幂**（2的n次方）。

如果指定 `initialCapacity`，那么 `initialCapacity` 就会被 **java.util.HashMap#tableSizeFor** 方法处理。

```java
public HashMap(int initialCapacity)
                          |
                          |_______
                                  |
static final int tableSizeFor(int cap)
```



```java
/**
* Returns a power of two size for the given target capacity.
*/
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

假设指定 `initialCapacity = 7`，那么根据代码逻辑可推演出以下内容：

```java
cap = 7
n = cap - 1 = 6 = 0 1 1 0
n |= n >>> 1;    0 1 1 0 | 0 0 1 1 = 0 1 1 1 = 7
n |= n >>> 2;    0 1 1 1 | 0 0 0 1 = 0 1 1 1 = 7
n |= n >>> 4;    0 1 1 1 | 0 0 0 0 = 0 1 1 1 = 7
n |= n >>> 8;    0 1 1 1 | 0 0 0 0 = 0 1 1 1 = 7
n |= n >>> 16;   0 1 1 1 | 0 0 0 0 = 0 1 1 1 = 7
return n + 1     7 + 1 = 8 
```

所以计算出的哈希表容量是 8 = 2^3，然后再根据`load factor * current capacity`计算出当前有效存储量为 6，并将 6 赋予给 HashMap 的实例变量 `threshold` 。

```java
int threshold;
```

而当哈希表的数据条数大于 6 将会发生 rehash。

```java
if (++size > threshold)
    resize();
```

哈希表的扩容计算方式很简单：

 `newCap = oldCap << 1`，`newThr = oldThr << 1`

## 计算位置(下标)

分为两步，首先计算一次 hash，利用 key 的 hashcode 高十六位和低十六位进行异或运算：

```java
static final int hash(Object key) {
      int h;
      return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

然后是下标的计算，n 代表哈希表容量，将准备好的 hash 再次进行 `&` 运算， n-1 避免数组越界：

```java
i = (n - 1) & hash
```

假设哈希表容量为 8，并且存入一条数据： `map.put("abcabcabc", "")`

```java
h = key.hashCode(): 0001 0010 0100 0011 1011 0011 1010 0010 // "abcabcabc".hashCode();
                                      xor
h >>> 16:           0000 0000 0000 0000 0001 0010 0100 0011
                                      ↓↓↓
hash = h ^ h>>>16:  0001 0010 0100 0011 1010 0001 1110 0001
                                       &
n - 1:              0000 0000 0000 0000 0000 0000 0000 0111
                                      ↓↓↓
(n - 1) & hash:     0000 0000 0000 0000 0000 0000 0000 0001 // index = 1
```

因此计算出 “abcabcabc” 这个 key 在哈希表的位置(下标)是 1 。

关于 hash 函数的设计，代码注释的说法是：

>   Computes key.hashCode() and spreads (XORs) higher bits of hash to lower.  Because the table uses power-of-two masking, sets of hashes that vary only in bits above the current mask will always collide. (Among known examples are sets of Float keys holding consecutive whole numbers in small tables.)  So we apply a transform that spreads the impact of higher bits downward. There is a tradeoff between speed, utility, and quality of bit-spreading. Because many common sets of hashes are already reasonably distributed (so don't benefit from spreading), and because we use trees to handle large sets of collisions in bins, we just XOR some shifted bits in the cheapest possible way to reduce systematic lossage, as well as to incorporate impact of the highest bits that would otherwise never be used in index calculations because of table bounds.

注释中说到，大多数的 hashCode 的分布已经非常合理了，如果还发生冲突就使用链表或者树结构解决，因此设计者使用最节省系统性能开销的移位以及异或运算来避免更多的冲突。

使用 hash 函数，是因为要考虑到，如果使用的 hashCode 仅在高位不同，而低位相同，那么在极端情况下发生冲突概率将增大。

例如：

```java
hashCode 1:         1100 0011 1000 0011 1000 1010 0001 0000
hashCode 2:         0100 1011 0100 1100 1111 0110 1100 0000
hashCode 3:         0000 0001 1001 1001 0110 1011 1110 0000
                                       &
n - 1:              0000 0000 0000 0000 0000 0000 0000 0111
                                      ↓↓↓
(n - 1) & hashCode: 0000 0000 0000 0000 0000 0000 0000 0111 // Index is always the same: 7
```

可以看到，如果三个 hashCode 的高位不同，而低 3 位完全相同(全为 0)，那  `(n -1) & hashCode` 运算的结果都相同 (7)，这种情况所有的数据都以链表或者树结构形式存在同一位置 (7)。如果发生更多冲突，时间复杂度从 O(1) 变为 O(n) 或者 O(log n)，性能就会有所降低。

使用 XOR 的原因，是因为这样的运算可使得 1 和 0 具有 50% / 50% 的分布，相比于 `&` 和 `|` 的 25/75 和 75/25 更加平均、稳定。

| XOR   | 1    | 0    |
| ----- | ---- | ---- |
| **1** | 0    | 1    |
| **0** | 1    | 0    |

1 和 0 数量各占总数一半。

| &   | 1    | 0    |
| ----- | ---- | ---- |
| **1** | 1    | 0    |
| **0** | 0    | 0    |

1 和 0 数量各占总数 25% 和 75%。

| \|    | 1    | 0    |
| ----- | ---- | ---- |
| **1** | 1    | 1    |
| **0** | 1    | 0    |

1 和 0 数量各占总数 75% 和 25%。

## 扩容(resize)

哈希表的初始化与扩容都使用同一套逻辑，即 **java.util.HashMap#resize** 方法。

```java
final Node<K,V>[] resize()
```

> Initializes or doubles table size.  If null, allocates in accord with initial capacity target held in field threshold. Otherwise, because we are using power-of-two expansion, the elements from each bin must either stay at same index, or move with a power of two offset in the new table.

大致意思就是说，当超过限制的时候会 resize，然而又因为我们使用的是2次幂的扩展(指长度扩为原来2倍)，所以，元素的位置要么是在原位置，要么是在原位置再移动2次幂的位置。

![](/imgs/2019/java-hashmap/java-hashmap.png)

观察上图扩容后(8 -> 16)的数据分布，要么是改变了索引，要么是不变，改变的就是移动2次幂的位置(+8)。

```java
5 + 8 = 13
    4 = 4
0 + 8 = 8
```


再次扩容亦是如此，如 16 -> 32 ，那么改变的也是移动2次幂的位置(+16)。

```java
13 + 16 = 29
4  + 16 = 20
8  + 16 = 24
```

对于是否需要改变索引，只需要看看原来的 hash 值新增的那个 bit 是 1 还是 0 就好了，是 0 则无需改变位置。例如上图的 hash2，扩容后由 `100` 变为 `0100`，多出的一位数是 0，那么 0 和其它数字进行与运算都是 0。

```java
hash2:   100
          &
n = 8:   111 
          ↓
         100 = 4
--------------------
hash2:  0100
          &
n = 16: 1111
          ↓
        0100 = 4
```

## 取数据(get)

在理解以上逻辑之后，get 就很简单了。大致思路如下：

1. 根据 key 的 hashCode 进行一次 hash
2. 利用 `(n - 1) & hash` 计算出实际位置(索引)
3. 如果根据索引直接匹配到，直接返回， O(1)
4. 如果根据索引未能匹配到
   * 若为树，则使用查询树的操作，O(logn)
   * 若为链表，则循环链表查找，O(n)

## 测试

利用 benchmark 测试工具来测试 HashMap，在初始化指定容量与使用默认构造函数的性能区别。

测试分为 5 个等级：

1. 添加不同的数据直到满足 16 条
2. 添加不同的数据直到满足 100 条
3. 添加不同的数据直到满足 1000 条
4. 添加不同的数据直到满足 10000 条
5. 添加不同的数据直到满足 100000 条

使用默认构造函数：

| Benchmark                   | Mode  | Cnt  | Score                       | Error | Units |
| --------------------------- | ----- | ---- | --------------------------- | ----- | ----- |
| MapBenchmark.measure_level1 | thrpt | 5    | 141991260.547 ±  419002.953 |       | ops/s |
| MapBenchmark.measure_level2 | thrpt | 5    | 66501311.793 ± 5285311.107  |       | ops/s |
| MapBenchmark.measure_level3 | thrpt | 5    | 70077920.597 ± 6574269.856  |       | ops/s |
| MapBenchmark.measure_level4 | thrpt | 5    | 58270016.113 ± 3106384.470  |       | ops/s |
| MapBenchmark.measure_level5 | thrpt | 5    | 25518813.878 ± 1097213.863  |       | ops/s |

使用初始化容量的构造函数，并且考虑实际数据量传入合理的参数：

| Benchmark                   | Mode  | Cnt  | Score                        | Error | Units |
| --------------------------- | ----- | ---- | ---------------------------- | ----- | ----- |
| MapBenchmark.measure_level1 | thrpt | 5    | 122338131.327 ±  9689798.828 |       | ops/s |
| MapBenchmark.measure_level2 | thrpt | 5    | 102039334.216 ±  2403155.914 |       | ops/s |
| MapBenchmark.measure_level3 | thrpt | 5    | 96752178.779 ±  4839327.658  |       | ops/s |
| MapBenchmark.measure_level4 | thrpt | 5    | 88239132.356 ±  9597356.077  |       | ops/s |
| MapBenchmark.measure_level5 | thrpt | 5    | 55940080.977 ± 13094145.548  |       | ops/s |

关注 Score 的结果，它们都是 xxx ± xxx，Units 代表单位每秒多少次操作。

可以看到无论哪种初始化操作，随着数据量增大，每秒操作次数都随之降低。而同样条件下，使用**初始化容量的构造函数**相比使用**默认构造函数**，前者性能更佳。

  # 附录

 benchmark 测试代码。

```java
@State(Scope.Thread)
public class MapBenchmark {

    String[] resource;

    @Setup()
    public void prepare() {
        resource = new String[100000];
        for (int i = 0; i < resource.length; i++) {
            resource[i] = String.valueOf(i);
        }
    }

    private Map<String, String> reps(int reps) {
        // Map<String, String> map = new HashMap<>((int) ((float) reps / 0.75F + 1.0F)); // 使用初始化容量的构造函数
        Map<String, String> map = new HashMap<>(); // 使用默认构造函数

        for (int i = 0; i < reps; i++) {
            String test = resource[i];
            map.put(test, test);
        }
        return map;
    }

    @Benchmark
    @OperationsPerInvocation(10)
    public Map<String, String> measure_level1() {
        return reps(10);
    }

    @Benchmark
    @OperationsPerInvocation(100)
    public Map<String, String> measure_level2() {
        return reps(100);
    }

    @Benchmark
    @OperationsPerInvocation(1000)
    public Map<String, String> measure_level3() {
        return reps(1000);
    }

    @Benchmark
    @OperationsPerInvocation(10000)
    public Map<String, String> measure_level4() {
        return reps(10_000);
    }

    @Benchmark
    @OperationsPerInvocation(100000)
    public Map<String, String> measure_level5() {
        return reps(100_000);
    }

    public static void main(String[] args) throws RunnerException {
        Options opt = new OptionsBuilder()
                .include(MapBenchmark.class.getSimpleName())
                .forks(1)
                .build();
        new Runner(opt).run();
    }

}
```

使用默认构造函数的测试结果。

```java
# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53301:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level1

# Run progress: 0.00% complete, ETA 00:08:20
# Fork: 1 of 1
# Warmup Iteration   1: 127001625.901 ops/s
# Warmup Iteration   2: 141822524.390 ops/s
# Warmup Iteration   3: 133428241.333 ops/s
# Warmup Iteration   4: 132244469.411 ops/s
# Warmup Iteration   5: 138276778.513 ops/s
Iteration   1: 141895511.199 ops/s
Iteration   2: 141923059.081 ops/s
Iteration   3: 142158823.597 ops/s
Iteration   4: 141937212.493 ops/s
Iteration   5: 142041696.363 ops/s


Result "tester.MapBenchmark.measure_level1":
  141991260.547 ±(99.9%) 419002.953 ops/s [Average]
  (min, avg, max) = (141895511.199, 141991260.547, 142158823.597), stdev = 108813.736
  CI (99.9%): [141572257.593, 142410263.500] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53301:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level2

# Run progress: 20.00% complete, ETA 00:06:43
# Fork: 1 of 1
# Warmup Iteration   1: 66265103.610 ops/s
# Warmup Iteration   2: 66389800.461 ops/s
# Warmup Iteration   3: 67855747.609 ops/s
# Warmup Iteration   4: 67289955.476 ops/s
# Warmup Iteration   5: 67750553.602 ops/s
Iteration   1: 67298893.171 ops/s
Iteration   2: 66615628.545 ops/s
Iteration   3: 64314592.829 ops/s
Iteration   4: 66334869.364 ops/s
Iteration   5: 67942575.053 ops/s


Result "tester.MapBenchmark.measure_level2":
  66501311.793 ±(99.9%) 5285311.107 ops/s [Average]
  (min, avg, max) = (64314592.829, 66501311.793, 67942575.053), stdev = 1372578.510
  CI (99.9%): [61216000.685, 71786622.900] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53301:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level3

# Run progress: 40.00% complete, ETA 00:05:02
# Fork: 1 of 1
# Warmup Iteration   1: 67605636.507 ops/s
# Warmup Iteration   2: 69621052.760 ops/s
# Warmup Iteration   3: 71010248.192 ops/s
# Warmup Iteration   4: 69532881.868 ops/s
# Warmup Iteration   5: 71013446.760 ops/s
Iteration   1: 70574046.109 ops/s
Iteration   2: 70965533.458 ops/s
Iteration   3: 71067189.031 ops/s
Iteration   4: 70739591.373 ops/s
Iteration   5: 67043243.012 ops/s


Result "tester.MapBenchmark.measure_level3":
  70077920.597 ±(99.9%) 6574269.856 ops/s [Average]
  (min, avg, max) = (67043243.012, 70077920.597, 71067189.031), stdev = 1707317.004
  CI (99.9%): [63503650.740, 76652190.453] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53301:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level4

# Run progress: 60.00% complete, ETA 00:03:21
# Fork: 1 of 1
# Warmup Iteration   1: 58376736.170 ops/s
# Warmup Iteration   2: 56309258.446 ops/s
# Warmup Iteration   3: 58577905.930 ops/s
# Warmup Iteration   4: 58987213.188 ops/s
# Warmup Iteration   5: 56652677.235 ops/s
Iteration   1: 56883247.928 ops/s
Iteration   2: 58521062.413 ops/s
Iteration   3: 58301230.510 ops/s
Iteration   4: 58767115.865 ops/s
Iteration   5: 58877423.848 ops/s


Result "tester.MapBenchmark.measure_level4":
  58270016.113 ±(99.9%) 3106384.470 ops/s [Average]
  (min, avg, max) = (56883247.928, 58270016.113, 58877423.848), stdev = 806718.182
  CI (99.9%): [55163631.643, 61376400.583] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53301:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level5

# Run progress: 80.00% complete, ETA 00:01:40
# Fork: 1 of 1
# Warmup Iteration   1: 24666505.202 ops/s
# Warmup Iteration   2: 25541321.825 ops/s
# Warmup Iteration   3: 25787825.310 ops/s
# Warmup Iteration   4: 25812122.914 ops/s
# Warmup Iteration   5: 25673018.223 ops/s
Iteration   1: 25745027.348 ops/s
Iteration   2: 25655260.447 ops/s
Iteration   3: 25747293.453 ops/s
Iteration   4: 25341679.313 ops/s
Iteration   5: 25104808.828 ops/s


Result "tester.MapBenchmark.measure_level5":
  25518813.878 ±(99.9%) 1097213.863 ops/s [Average]
  (min, avg, max) = (25104808.828, 25518813.878, 25747293.453), stdev = 284942.956
  CI (99.9%): [24421600.015, 26616027.741] (assumes normal distribution)


# Run complete. Total time: 00:08:23

REMEMBER: The numbers below are just data. To gain reusable insights, you need to follow up on
why the numbers are the way they are. Use profilers (see -prof, -lprof), design factorial
experiments, perform baseline and negative tests that provide experimental control, make sure
the benchmarking environment is safe on JVM/OS/HW level, ask for reviews from the domain experts.
Do not assume the numbers tell you what you want them to tell.

Benchmark                     Mode  Cnt          Score         Error  Units
MapBenchmark.measure_level1  thrpt    5  141991260.547 ±  419002.953  ops/s
MapBenchmark.measure_level2  thrpt    5   66501311.793 ± 5285311.107  ops/s
MapBenchmark.measure_level3  thrpt    5   70077920.597 ± 6574269.856  ops/s
MapBenchmark.measure_level4  thrpt    5   58270016.113 ± 3106384.470  ops/s
MapBenchmark.measure_level5  thrpt    5   25518813.878 ± 1097213.863  ops/s

Process finished with exit code 0
```

使用初始化构造函数的测试结果。

```java
# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53688:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level1

# Run progress: 0.00% complete, ETA 00:08:20
# Fork: 1 of 1
# Warmup Iteration   1: 118482946.186 ops/s
# Warmup Iteration   2: 112336132.574 ops/s
# Warmup Iteration   3: 118383971.447 ops/s
# Warmup Iteration   4: 116669575.125 ops/s
# Warmup Iteration   5: 119473270.826 ops/s
Iteration   1: 121741335.641 ops/s
Iteration   2: 124303130.157 ops/s
Iteration   3: 124904353.757 ops/s
Iteration   4: 118528835.278 ops/s
Iteration   5: 122213001.803 ops/s


Result "tester.MapBenchmark.measure_level1":
  122338131.327 ±(99.9%) 9689798.828 ops/s [Average]
  (min, avg, max) = (118528835.278, 122338131.327, 124904353.757), stdev = 2516409.984
  CI (99.9%): [112648332.499, 132027930.155] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53688:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level2

# Run progress: 20.00% complete, ETA 00:06:43
# Fork: 1 of 1
# Warmup Iteration   1: 93315434.143 ops/s
# Warmup Iteration   2: 92983341.778 ops/s
# Warmup Iteration   3: 97101517.219 ops/s
# Warmup Iteration   4: 92564247.846 ops/s
# Warmup Iteration   5: 100285038.019 ops/s
Iteration   1: 102162049.729 ops/s
Iteration   2: 102379826.993 ops/s
Iteration   3: 102475922.945 ops/s
Iteration   4: 100944632.787 ops/s
Iteration   5: 102234238.627 ops/s


Result "tester.MapBenchmark.measure_level2":
  102039334.216 ±(99.9%) 2403155.914 ops/s [Average]
  (min, avg, max) = (100944632.787, 102039334.216, 102475922.945), stdev = 624091.959
  CI (99.9%): [99636178.302, 104442490.130] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53688:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level3

# Run progress: 40.00% complete, ETA 00:05:02
# Fork: 1 of 1
# Warmup Iteration   1: 97822881.423 ops/s
# Warmup Iteration   2: 95718868.583 ops/s
# Warmup Iteration   3: 97607085.636 ops/s
# Warmup Iteration   4: 95961881.083 ops/s
# Warmup Iteration   5: 96181959.004 ops/s
Iteration   1: 97486071.647 ops/s
Iteration   2: 97317494.401 ops/s
Iteration   3: 97341695.379 ops/s
Iteration   4: 97097857.201 ops/s
Iteration   5: 94517775.269 ops/s


Result "tester.MapBenchmark.measure_level3":
  96752178.779 ±(99.9%) 4839327.658 ops/s [Average]
  (min, avg, max) = (94517775.269, 96752178.779, 97486071.647), stdev = 1256758.025
  CI (99.9%): [91912851.122, 101591506.437] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53688:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level4

# Run progress: 60.00% complete, ETA 00:03:21
# Fork: 1 of 1
# Warmup Iteration   1: 92047944.166 ops/s
# Warmup Iteration   2: 89678443.566 ops/s
# Warmup Iteration   3: 89812773.142 ops/s
# Warmup Iteration   4: 88930887.557 ops/s
# Warmup Iteration   5: 85792676.395 ops/s
Iteration   1: 89347289.220 ops/s
Iteration   2: 89191963.589 ops/s
Iteration   3: 83800965.269 ops/s
Iteration   4: 89119847.919 ops/s
Iteration   5: 89735595.781 ops/s


Result "tester.MapBenchmark.measure_level4":
  88239132.356 ±(99.9%) 9597356.077 ops/s [Average]
  (min, avg, max) = (83800965.269, 88239132.356, 89735595.781), stdev = 2492402.896
  CI (99.9%): [78641776.279, 97836488.433] (assumes normal distribution)


# JMH version: 1.23
# VM version: JDK 1.8.0_221, Java HotSpot(TM) 64-Bit Server VM, 25.221-b11
# VM invoker: C:\Program Files\Java\jdk1.8.0_221\jre\bin\java.exe
# VM options: -javaagent:E:\app\IntelliJ IDEA 2019.1.4\lib\idea_rt.jar=53688:E:\app\IntelliJ IDEA 2019.1.4\bin -Dfile.encoding=UTF-8
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: tester.MapBenchmark.measure_level5

# Run progress: 80.00% complete, ETA 00:01:40
# Fork: 1 of 1
# Warmup Iteration   1: 54077395.641 ops/s
# Warmup Iteration   2: 59732722.907 ops/s
# Warmup Iteration   3: 53583150.778 ops/s
# Warmup Iteration   4: 59899100.161 ops/s
# Warmup Iteration   5: 60709074.795 ops/s
Iteration   1: 60754432.284 ops/s
Iteration   2: 51357719.856 ops/s
Iteration   3: 55849596.896 ops/s
Iteration   4: 54854535.391 ops/s
Iteration   5: 56884120.457 ops/s


Result "tester.MapBenchmark.measure_level5":
  55940080.977 ±(99.9%) 13094145.548 ops/s [Average]
  (min, avg, max) = (51357719.856, 55940080.977, 60754432.284), stdev = 3400508.017
  CI (99.9%): [42845935.429, 69034226.525] (assumes normal distribution)


# Run complete. Total time: 00:08:23

REMEMBER: The numbers below are just data. To gain reusable insights, you need to follow up on
why the numbers are the way they are. Use profilers (see -prof, -lprof), design factorial
experiments, perform baseline and negative tests that provide experimental control, make sure
the benchmarking environment is safe on JVM/OS/HW level, ask for reviews from the domain experts.
Do not assume the numbers tell you what you want them to tell.

Benchmark                     Mode  Cnt          Score          Error  Units
MapBenchmark.measure_level1  thrpt    5  122338131.327 ±  9689798.828  ops/s
MapBenchmark.measure_level2  thrpt    5  102039334.216 ±  2403155.914  ops/s
MapBenchmark.measure_level3  thrpt    5   96752178.779 ±  4839327.658  ops/s
MapBenchmark.measure_level4  thrpt    5   88239132.356 ±  9597356.077  ops/s
MapBenchmark.measure_level5  thrpt    5   55940080.977 ± 13094145.548  ops/s

Process finished with exit code 0
```



  # 参考资料

  * [Oracle, Class HashMap, *Oracle Java Documentation*.](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
  * [Yikun, Java-HashMap工作原理及实现, *Yikun’s* Blog, 2015.](https://yikun.github.io/2015/04/01/Java-HashMap工作原理及实现/)
  * [美团, Java 8系列之重新认识HashMap, *美团技术团队*, 2015.](https://tech.meituan.com/2016/06/24/java-hashmap.html)
  * [Aniket Thakur, “Why HashMap insert new Node on index (n - 1) & hash?”, *Stack Overflow*, 2017.](https://stackoverflow.com/a/44615382)
  * [Jul, "Why return (h = key.hashCode()) ^ (h >>> 16) other than key.hashcode?", *Stack Overflow*, 2017.](https://stackoverflow.com/a/45140621)
  * [Andy Turner, "HashMap.tableSizeFor(…). How does this code round up to the next power of 2?", *Stack Overflow*, 2018.](https://stackoverflow.com/a/51121765)
  * [Mincong Huang, learning-hashmap, *Mincong Huang’s* Blog, 2019.](https://mincong.io/2018/04/08/learning-hashmap/)
  * [飞污熊博客, Java微基准测试框架JMH, *飞污熊博客’s* Blog, 2018.](https://www.xncoding.com/2018/01/07/java/jmh.html)
  * [Jakob Jenkov, JMH - Java Microbenchmark Harness, *Jakob Jenkov's* Blog, 2015.](http://tutorials.jenkov.com/java-performance/jmh.html)
  * [jhm samples.](https://hg.openjdk.java.net/code-tools/jmh/file/tip/jmh-samples/src/main/java/org/openjdk/jmh/samples/)