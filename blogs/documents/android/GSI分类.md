# 正文

本文将解释应如何在 [GSI](https://developer.android.google.cn/topic/generic-system-image) 的诸多分类 (arm64/a64/bgn/bvn/bgs/vndklite) 中做出选择。

网上流传的 GSI 的命名通常遵循以下模式。

```
{arm|a64|arm64}_{a|b}{v|g}{N|S}-{vndklite|secure|personal}
```

在解释每个术语之前，我建议先安装 [Treble Check](https://github.com/kevintresuelo/treble) 应用程序，因为它所显示的信息将作为本文的参考点。

### {arm|a64|arm64}

在 Treble Check 中查看 CPU 体系架构部分。可见，我的设备所使用的CPU是 64 位 ARM 。所以我的设备应当选用标记为 "arm64" 的 GSI 。

![CPU Architecture](https://yzyf1312.github.io/assets/pics/Treble%20Check/alioth/CPU%20Architecture.png)

### {a|b}

请查看 System-as-root 部分。如果显示支持，则设备的分区类型是 AB ，但为了方便起见，开发者往往将 GSI 标记为 "b" 。如果显示不支持，那么设备的分区类型是 Aonly ，此时选择被标记为 "a" 的 GSI 。可见，我的设备支持 System-as-root ，所以我的设备应当选用标记为 "b" 的 GSI 。

![System-as-root](https://yzyf1312.github.io/assets/pics/Treble Check/alioth/System-as-root.png)

### {v|g}

这里的 "v" 代表 Vanilla，这意味着没有 GApps [Google Apps、软件包、服务和框架] 。而 G 表示此 GSI 内置 Google Apps 。这完全是个人选择，如果你需要 Google Apps，那么请选择 "g" 版本。

### {N|S}

"N" 表示此 GSI 没有超级用户。换句话说，这是一个没有 root 权限的 GSI 。而 "S" 表示 GSI 内置了超级用户。尽管我更喜欢 root 我的设备，但是我通常会下载 "N" 版本，因为我更喜欢自行 root 设备而不是使用内置的超级用户。和前面一样，这完全取决于个人。

### {vndklite|secure|personal}

你必须在 {vndklite|secure|personal} 中作选择。首先，转到 Treble Check 应用程序并查看 Project Treble 部分。在这里可以看到设备是否支持 [VNDK](https://source.android.google.cn/docs/core/architecture/vndk?hl=zh-cn) 。从技术上讲， "vndklite" 适用于 VNDKLite 设备或非 vndklite 设备上的可读写系统。可见，我的设备支持 Project Treble ，所以我的设备应当选用标记为 "vndklite" 的 GSI 。

![Project Treble](https://yzyf1312.github.io/assets/pics/Treble Check/alioth/Project Treble.png)

# 题外话

### 应该下载 vndklite GSI 还是非 vndklite GSI ？

这可能是人们最多的疑问。其实只需要安装 [Treble Info](https://gitlab.com/TrebleInfo/TrebleInfo) 应用程序，转到 "详细" 页，并查看 "链接器命名空间隔离" 显示的信息。如果显示 "VNDK 处于非 Lite 模式" ，则必须下载非 vndklite GSI 。另一方面，如果如果显示 "VNDK 处于 Lite 模式" ，则下载 vndklite GSI 。