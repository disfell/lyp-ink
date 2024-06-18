---
title: Online Status
date: 2023/09/01
last: 2023/09/05
---

# 起因

上班摸鱼的时候刷到了这么一行[代码](https://apple.stackexchange.com/questions/406941/applescript-and-music)。

`tell application "Music" to get properties of current track`

这是 AppleScript 代码，其功能：获取 MacOS 里 Apple Music 播放中的音乐信息。于是我就想到了模仿 QQ ，做个在线听歌状态的功能，效果如下。

::MyImg{src="/imgs/2023/my-online-status/1.jpg" alt="Playing Music Info"}
::

另外 [Travelers' encore](https://www.bilibili.com/video/BV1Eh411J7Us?vd_source=0e62add6e473b5930bb615aa8cf1d2ba) 真好听![](/emoji/kx.webp){class="inline-flex items-baseline h-8 w-8"}

# AppleScript

MacOS 自带一个叫 **脚本编辑器** 的软件，可用于运行 AppleScript。关于 AppleScript，苹果官方还有详细文档，但是全英文，淦！

::MyImg{src="/imgs/2023/my-online-status/2.jpg" alt="Playing Music Info"}
::

# 思路

结合资料，简单扩展了代码逻辑，拿到 Apple Music 的信息并不难。

```
set musicName to ""
set musicArtist to ""
if application "Music" is running then
	tell application "Music"
		try
			if player state is playing or player state is paused then
				set musicName to the name of the current track
				set musicArtist to the artist of the current track
				display dialog musicName & " - " & musicArtist
			end if
		on error
			set errorText to "test error"
		end try
	end tell
end if
```

数据能拿到了，还要往服务器发送数据才行。我想到的是用 Shell 执行 curl 命令，AppleScript 也支持这么做。

```
do shell script "curl -X POST ..."
```

# 后台运行

还差一点，要做到代码持续监控，就必须得保持代码后台运行，好在 AppleScript 也支持这么做，可使用 `on idle` 实现。

>idle Handlers
>
>If a stay-open script application includes an idle handler, AppleScript sends the script application periodic idle commands—by >default, every 30 seconds—allowing it to perform background tasks when it is not performing other actions.

```
on idle{}
  if application "Music" is running then
    -- 代码略
  end if
  -- 每 60s 唤醒进程
  return 60
end idle
```

不过这个要结合“导出”选项来用。

# 导出

选择左上角：文件 -> 导出。
  
文件格式：应用程序  
选项：运行处理程序后保持打开

如下图所示。

::MyImg{src="/imgs/2023/my-online-status/3.jpg" alt="Export as an App"}
::

接着执行导出的 App，最后设置为开机自启动，这样只要电脑还在运作中，代码就会一直监控并且推送数据到服务器。

::MyImg{src="/imgs/2023/my-online-status/4.jpg" alt="Export as an App"}
::


# 缺点&疑惑

脚本只能 MacOS 平台用  
学习成本，中文资料少，需要学会英文搜索  
不知道 AppleScript 能否获取其他第三方APP的内容  
不想弄的太复杂，AppleScript 目前也够用，即开即合

# 参考资料

[Introduction to AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html)  
[The AppleScript delay command | alvinalexander.com](https://alvinalexander.com/blog/post/mac-os-x/applescript-delay-command/)  
[iTunes AppleScript examples (command examples) | alvinalexander.com](https://alvinalexander.com/apple/itunes-applescript-examples-scripts-mac-reference/)  
[applescript remove spaces replace with un… - Apple Community](https://discussions.apple.com/thread/7551872)  
[shell - Applescript: Curl command was working, now I get a missing token error - Stack Overflow](https://stackoverflow.com/questions/76036963/applescript-curl-command-was-working-now-i-get-a-missing-token-error)  
[AppleScript “repeat while” examples | alvinalexander.com](https://alvinalexander.com/blog/post/mac-os-x/applescript-repeat-while-syntax/)  
[AppleScript: How can I end a repeat while true loop? - Stack Overflow](https://stackoverflow.com/questions/74188849/applescript-how-can-i-end-a-repeat-while-true-loop)  
[Doug's AppleScripts » Idle Handler Projects (dougscripts.com)](https://dougscripts.com/itunes/itinfo/idle00.php)  
[Line Continuation Character - AppleScript in a Nutshell [Book] (oreilly.com)](https://www.oreilly.com/library/view/applescript-in-a/1565928415/ch01s06s03.html)