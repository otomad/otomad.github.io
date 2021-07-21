# Python 版 bv2av 使用方法

1. 确保您已在您的计算机安装 Python，且已配置**环境变量**。
2. 将 **“bv2av.py”, “bv2av.bat”** 两个文件复制到 C:\Windows\System32 文件夹下，如果提示需要管理员权限，选择“是”。
3. 然后就可以在**运行对话框**或者**命令提示符**中输入以下指令就能得到你想要的对应结果了。
```
bv2av 你的AV或BV号
```

## 使用例
```
bv2av av1
```
> 结果：`BV1xx411c7mQ`
```
bv2av BV1xx411c7mQ
```
> 结果：`av1`

## 参考资料

* mcfx 的 Python 源码：https://www.zhihu.com/question/381784377/answer/1099438784
* mrhso 的 JavaScript 源码：https://mrhso.github.io/IshisashiWebsite/BVwhodoneit/

## 关于 **bv2av.bat**

这里的 bv2av.py 已经过改写优化，可以直接通过命令行输入指令获取对应的 BV/AV 号。
但是需要输入
```
python bv2av.py av1
```
才能得出对应结果，使用并不太方便。

因此额外增加一个 bat 文件，这样就能更方便地使用脚本了。放在 System32 目录下更方便使用。
```
bv2av av1
```