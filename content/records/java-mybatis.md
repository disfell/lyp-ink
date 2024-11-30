---
title: Java和Mybatis
published: 2019/11/20
---

记录下学习的内容，方便以后可以回顾，主要学习一下 Mapper 实现原理（草稿向）。

# Mybatis

## JDBC

Mybatis 的实现，其最底层依赖于 JDBC 接口。

JDBC 的核心接口如下：

1. DriverManager - 用于注册数据库连接
2. Connection    - 与数据库连接对象
3. Statement/PrepareStatement - 操作数据库SQL语句的对象
4. ResultSet - 结果集或一张虚拟表

## Mybatis 核心类

Mybatis 也具备几个核心接口：

1. Configuration - mybatis 的配置项都在这
2. SqlSession - 开/关连接、执行 CURD 、事务等等
3. Executor - Sqlsession 调用 Executor，动态生成 SQL 并且执行
4. MappedStatement - XML 中 SQL 相关信息都体现在这里
5. ResultHandler - 处理SQL执行结果，返回预期响应格式

本次使用版本

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.1</version>
</dependency>
```

## Mybatis 例子

[mybatis – MyBatis 3 | Getting started](https://mybatis.org/mybatis-3/getting-started.html)

```java
InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
SqlSessionFactory session = new SqlSessionFactoryBuilder().build(inputStream);
SqlSession sqlSession = session.openSession();
// 对应 mapper 
AuthorMapper sm = sqlSession.getMapper(AuthorMapper.class);
```

## Mybatis 执行原理

Mybatis 生成 Mapper 实现类用的是 **JDK动态代理**

***

**new SqlSessionFactoryBuilder().build(inputStream)**  
跟踪 `.build(inputStream)`  
↓  
**org.apache.ibatis.builder.xml.XMLConfigBuilder#parseConfiguration**  

```java
private void parseConfiguration(XNode root) {
  try {
    // issue #117 read properties first
    propertiesElement(root.evalNode("properties"));
    Properties settings = settingsAsProperties(root.evalNode("settings"));
    loadCustomVfs(settings);
    loadCustomLogImpl(settings);
    typeAliasesElement(root.evalNode("typeAliases"));
    pluginElement(root.evalNode("plugins"));
    objectFactoryElement(root.evalNode("objectFactory"));
    objectWrapperFactoryElement(root.evalNode("objectWrapperFactory"));
    reflectorFactoryElement(root.evalNode("reflectorFactory"));
    settingsElement(settings);
    // read it after objectFactory and objectWrapperFactory issue #631
    environmentsElement(root.evalNode("environments"));
    databaseIdProviderElement(root.evalNode("databaseIdProvider"));
    typeHandlerElement(root.evalNode("typeHandlers"));
    mapperElement(root.evalNode("mappers"));
  } catch (Exception e) {
    throw new BuilderException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
  }
}
```
一眼看去，有很多和 mybatis-config.xml 相关的标签的关键字，这里应该是解析标签的逻辑

***

主要看了一下 **mapperElement(root.evalNode("mappers"))**

`mappers` 标签，详见 [mybatis – MyBatis 3 | Configuration](https://mybatis.org/mybatis-3/configuration.html#mappers)：展示了 mappers 节点的几种配置方式

以下是公司项目里常用的方式：

```xml
<mappers>
  <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
</mappers>
```

一般还会再搭配一个 Java 接口

```java
// AuthorMapper.xml
public interface AuthorMapper {
  Map queryById();
}
```

***

进入方法查看，看见的几个 if else 逻辑就是在实现不同的 mappers 配置方式

```java
private void mapperElement(XNode parent) throws Exception {
  if (parent != null) {
    for (XNode child : parent.getChildren()) {
      if ("package".equals(child.getName())) {
        String mapperPackage = child.getStringAttribute("name");
        configuration.addMappers(mapperPackage);
      } else {
        String resource = child.getStringAttribute("resource");
        String url = child.getStringAttribute("url");
        String mapperClass = child.getStringAttribute("class");
        if (resource != null && url == null && mapperClass == null) {
          ErrorContext.instance().resource(resource);
          try(InputStream inputStream = Resources.getResourceAsStream(resource)) {
            XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
            mapperParser.parse();
          }
        } else if (resource == null && url != null && mapperClass == null) {
          ErrorContext.instance().resource(url);
          try(InputStream inputStream = Resources.getUrlAsStream(url)){
            XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, url, configuration.getSqlFragments());
            mapperParser.parse();
          }
        } else if (resource == null && url == null && mapperClass != null) {
          Class<?> mapperInterface = Resources.classForName(mapperClass);
          configuration.addMapper(mapperInterface);
        } else {
          throw new BuilderException("A mapper element may only specify a url, resource or class, but not more than one.");
        }
      }
    }
  }
}
```

***

再看看 if else 代码里的 **mapperParser.parse();** 方法如下，这里就是解析 AuthorMapper.xml 的逻辑。

```java
public void parse() {
  if (!configuration.isResourceLoaded(resource)) {
    configurationElement(parser.evalNode("/mapper"));
    configuration.addLoadedResource(resource);
    bindMapperForNamespace();
  }

  parsePendingResultMaps();
  parsePendingCacheRefs();
  parsePendingStatements();
}
```

AuthorMapper.xml 例子如下

```xml
<mapper namespace="org.xxx.AuthorMapper">
  <!-- 略 ...-->
	<select id="queryById" resultMap="beanMap">
		select * from table
	</select>
</mapper>
```

***

**configurationElement**

```java
private void configurationElement(XNode context) {
  try {
    String namespace = context.getStringAttribute("namespace");
    if (namespace == null || namespace.isEmpty()) {
      throw new BuilderException("Mapper's namespace cannot be empty");
    }
    builderAssistant.setCurrentNamespace(namespace);
    cacheRefElement(context.evalNode("cache-ref"));
    cacheElement(context.evalNode("cache"));
    parameterMapElement(context.evalNodes("/mapper/parameterMap"));
    resultMapElements(context.evalNodes("/mapper/resultMap"));
    sqlElement(context.evalNodes("/mapper/sql"));
    buildStatementFromContext(context.evalNodes("select|insert|update|delete"));
  } catch (Exception e) {
    throw new BuilderException("Error parsing Mapper XML. The XML location is '" + resource + "'. Cause: " + e, e);
  }
}
```

接着再看  **buildStatementFromContext(context.evalNodes("select|insert|update|delete"));** 根据 select、insert、update、delete 生成若干个 **MappedStatement**，并且存储在 **org.apache.ibatis.session.Configuration#mappedStatements** 中。

```java
protected final Map<String, MappedStatement> mappedStatements = new StrictMap<MappedStatement>...
```

也就是以 key value 的形式缓存起来。顺着 **buildStatementFromContext** 方法一直走可以找到  
**org.apache.ibatis.builder.MapperBuilderAssistant#applyCurrentNamespace**  
最终以 currentNamespace + "." + base 返回，base 即标签的 id，
即这个标签的 id `<select id="queryById" />`，也就是说 key 的形式就是这样的：org.xxx.AuthorMapper.queryById。

```java
return currentNamespace + "." + base;
```

这里也大概能猜到 Mybatis 怎么执行 SQL 了。

动态代理可以利用反射得到 java 类、方法的相关信息，结合接口名称+方法名称组成`currentNamespace` + `id`，再通过 Map 查到对应的 MappedStatement，也就是 Java 接口和 XML 建立起了映射关系。

*** 

再回到 **mapperParser.parse** 调用的 **bindMapperForNamespace**，找到 **org.apache.ibatis.binding.MapperRegistry#addMapper**

```java
public <T> void addMapper(Class<T> type) {
  if (type.isInterface()) {
    if (hasMapper(type)) {
      throw new BindingException("Type " + type + " is already known to the MapperRegistry.");
    }
    boolean loadCompleted = false;
    try {
      knownMappers.put(type, new MapperProxyFactory<>(type));
      // It's important that the type is added before the parser is run
      // otherwise the binding may automatically be attempted by the
      // mapper parser. If the type is already known, it won't try.
      MapperAnnotationBuilder parser = new MapperAnnotationBuilder(config, type);
      parser.parse();
      loadCompleted = true;
    } finally {
      if (!loadCompleted) {
        knownMappers.remove(type);
      }
    }
  }
}
```

再找到 **org.apache.ibatis.binding.MapperProxyFactory** 

```java
public class MapperProxyFactory<T> {

  private final Class<T> mapperInterface;
  private final Map<Method, MapperMethodInvoker> methodCache = new ConcurrentHashMap<>();

  public MapperProxyFactory(Class<T> mapperInterface) {
    this.mapperInterface = mapperInterface;
  }

  public Class<T> getMapperInterface() {
    return mapperInterface;
  }

  public Map<Method, MapperMethodInvoker> getMethodCache() {
    return methodCache;
  }

  @SuppressWarnings("unchecked")
  protected T newInstance(MapperProxy<T> mapperProxy) {
    return (T) Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[] { mapperInterface }, mapperProxy);
  }

  public T newInstance(SqlSession sqlSession) {
    final MapperProxy<T> mapperProxy = new MapperProxy<>(sqlSession, mapperInterface, methodCache);
    return newInstance(mapperProxy);
  }

}
```

可以找到 **newInstance** 方法入参是 **org.apache.ibatis.binding.MapperProxy** ，实现了 InvocationHandler 接口，可以明确知道 Mybatis 是使用的 JDK 动态代理。

***

看到这就不想再往下看了，了解 JDK 动态代理，大概也能知道里边在做些什么，知道了 `addMapper` 大致过程，再回过头看 `getMapper` 会很好理解。

还没去看 Spring 注入的 Mapper 的原理，但是我的猜想是根据 `getMapper` 的方式获得一个 mybatis 生成的代理对象，最后赋给定义的引用。

```java
// 猜想
@Autowired
AuthorMapper ≈ sqlSession.getMapper(StockMapper.class);
```

## Mybatis 常见问题

......

一级缓存：mybatis有一级缓存，同一次会话里，相同sql的查询结果，从第二次开始往后的查询，都从一级缓存里取，除非中间发生了写操作。

......


# 参考资料

- [mybatis – MyBatis 3 | Introduction](https://mybatis.org/mybatis-3/index.html)
- [浅析MyBatis的动态代理原理 - SegmentFault 思否](https://segmentfault.com/a/1190000019130222)

