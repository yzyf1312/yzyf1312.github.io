# 关于 WSL

文章内容均来源于 [WSL 官方文档](https://learn.microsoft.com/windows/wsl)。

## 为什么应该选择 WSL？

WSL（Windows Subsystem for Linux）允许在 Windows 系统上无缝运行 Linux 环境，支持多种 Linux 发行版，提供高效的开发体验。它通过虚拟化技术提升文件系统性能，支持完整的系统调用，适合需要同时使用 Windows 和 Linux 的开发人员。

## WSL 的使用

官方文档提供了 WSL 的[命令手册](https://learn.microsoft.com/zh-cn/windows/wsl/basic-commands)以供查阅。

### WSL 支持的 Linux 发行版

如果你想了解在 WSL 中当下可用的 Linux 发行版有什么，可以在命令行中输入以下指令：

```shell
wsl --list --online
```

通过该指令可查看在线商店中官方免费提供的 Linux 发行版列表。实际上，这个列表的信息来自 Github 仓库 [WSL](https://github.com/microsoft/WSL) 中的 `/distributions/DistributionInfo.json` 文件。

`DistributionInfo.json` 的片段如下：

```json
{
    "Distributions": [
        {
            "Name": "Ubuntu",
            "FriendlyName": "Ubuntu",
            "StoreAppId": "9PDXGNCFSCZV",
            "Amd64": true,
            "Arm64": true,
            "Amd64PackageUrl": "https://wslstorestorage.blob.core.windows.net/wslblob/Ubuntu2204-220117.appx",
            "Arm64PackageUrl": "https://wslstorestorage.blob.core.windows.net/wslblob/Ubuntu2204-220117_ARM64.appx",
            "PackageFamilyName": "CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc"
        },
        ......
    ]
}
```

### 不同版本的 WSL

WSL 分为两个版本，分别是 WSL 1 和 WSL 2。

本文之所以提及 WSL 的两个版本，是因为两个版本之间区别较大，并且对 Windows 版本要求不同。

#### 功能对比

以下是 WSL 1 与 WSL 2 的功能对比，本文仅给出不同之处：

| 功能                                           | WSL 1 | WSL 2 |
| :--------------------------------------------- | :---- | :---- |
| 可以与当前版本的 VMware 和 VirtualBox 一起运行 | ✅     | ❌     |
| 托管 VM                                        | ❌     | ✅     |
| 完整的 Linux 内核                              | ❌     | ✅     |
| 完全的系统调用兼容性                           | ❌     | ✅     |
| 跨 OS 文件系统的性能                           | ✅     | ❌     |
| systemd 支持                                   | ❌     | ✅     |

#### Windows 版本要求

根据官方文档给出的信息，只有 Windows 10 的 1903 版本（内部版本号 18362）或更高版本才能使用 WSL 2，版本号低于 14393 的 Windows 则完全不能使用 WSL。

#### 关于外置设备

在过去，如果想要在 WSL 中访问串行端口或 USB 设备，则必须使用 WSL 1。而现在，通过 [USBIPD-WIN](https://github.com/dorssel/usbipd-win) 项目可以为 WSL 2 提供 USB 设备支持。 可遗憾的是，WSL 2 仍然不支持访问串行端口。

#### 在 WSL 中访问 Windows 的文件

Windows 的本地驱动器被挂载在 `/mnt` 目录下。

#### 使用 WSL 提供网络服务

因为 WSL 共享 Windows 的 IP 地址，所以启动服务后直接访问 localhost 的对应端口即可。