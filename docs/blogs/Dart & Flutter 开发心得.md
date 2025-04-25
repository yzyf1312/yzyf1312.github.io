# Dart & Flutter 开发心得

> 小声逼逼：
>
> 这应该算得上是心得吧（至少是笔记）......现在网上资料本来就难找，关联性还差，真是难受。

Q：编译 APK 时卡在 `Running Gradle task 'assembleRelease'...` 不动？

A：是 Gradle 的问题。国内的网络环境导致无法下载 Gradle。想要解决也很简单：首先找个国内可以正常使用的镜像源（此处推荐[腾讯软件源](https://mirrors.cloud.tencent.com/gradle/)），编辑 `[Project]/android/gradle/wrapper/gradle-wrapper.properties`，将 distributionUrl 所对的链接替换成镜像源对应版本的链接就行。

## 包

找不到理想的包？

推荐网站：[Easy Flutter Pubs](https://pubdev.top/#/)、[Flutter Gems](https://fluttergems.dev/)

把握不了 MD3 的动态颜色？

试试这个项目：[dynamic_color_viewer](https://github.com/yzyf1312/dynamic_color_viewer)

### 包推荐

**[rename](https://pub.dev/packages/rename)**

可用于设置项目的包名、应用名。

**[flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons)**

可用于生成并应用项目图标，但是没办法为安卓应用设置使用动态颜色的图标。

## 编译出现问题

如果代码没问题，不管别的，先清理一遍环境。

```bash
flutter clean
flutter pub cache clean
flutter pub cache repair
flutter pub get
flutter pub upgrade
```

执行完上面的指令，大概率就没问题了。

## 启动时提示缺少 DLL

有时一些奇怪的用户电脑上会缺少以下 DLL：

```
MSVCP140.dll      # C++ 标准库
vcruntime140.dll  # C 运行时库
vcruntime140_1.dll
```

作为贴心的开发者，当然要事先准备好一切啦。 `C:\Windows\System32` 下面的 DLL 是 64 位的，`C:\Windows\SysWOW64` 下是 32 位的。将上面提到的 3 个 DLL copy 到编译好的 Flutter 程序旁边就行了。