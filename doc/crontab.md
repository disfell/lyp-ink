# Crontab on Mac

Mac 原生安装有 crontab，这里比较简单粗暴，首先放开 cron 权限

1. 系统偏好设置->安全性和隐私->隐私->完全磁盘访问权限
2. 点击左下角的小锁头，解锁
3. 单击 +，同时按住command+shift+g，添加usr/sbin下的cron

***

Mac 查看 cron 任务是否存在
```
sudo launchctl list | grep cron
输出: 446	0	com.vix.cron
```

```
locate com.vix.cron
```

如果有 Waring 警告，按照提示执行命令，没有则跳过


```
sudo launchctl load -W /System/Library/LaunchDaemons/com.apple.locate.plist
```

***

创建定时任务

```
sudo crontab -e
```

输入以下内容

* * * * * cd /Users/lyp/Documents/project/iiiillll-py/ && ./run.sh > ./stdout.log 2> ./stderr.log

查看是否生效

```
sudo crontab -l
```