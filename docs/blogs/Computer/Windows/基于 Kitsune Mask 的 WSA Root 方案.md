# 基于 Kitsune Mask 的 WSA Root 方案

![Kitsune-WSA](http://i0.hdslb.com/bfs/article/ab99cdc8e6db9e89467338586463612e549933280.jpg)

> **声明**
>
> 本方案的实现基于开源项目 **[MagiskOnWSALocal](https://github.com/LSPosed/MagiskOnWSALocal)**，一切行为均遵循 AGPL-3.0。
>
> 本文使用的 MagiskOnWSALocal 最后一次更改提交于 Oct 25, 2023，编译输出的 WSA 版本为 231.40000.5.0，Kitsune Mask 版本为 26.4-kitsune-2 (26400) 。
>
> 本文仅提供此方案最关键的部分，其余不详细或未提及部分的信息均可在互联网轻松获取。

截至写作时间 Feb 19, 2024，我在 XDA、酷安、哔哩哔哩还没能找到关于 "基于 Kitsune Mask 的 WSA Root 方案" 的文章，所以我在此提供一个简陋的方案。

### 方案主体内容

正常获取 MagiskOnWSALocal 仓库的内容，在按照 Readme.md 执行 Run.sh 前，修改同目录的 generateMagiskLink.py。具体内容如下：

将

```
https://github.com/topjohnwu/magisk-files/raw/master/{magisk_ver}.json
```

替换为

```
https://github.com/HuskyDG/magisk-files/raw/main/{magisk_ver}.json
```

将

```
https://fastly.jsdelivr.net/gh/topjohnwu/magisk-files@master/{magisk_ver}.json
```

替换为

```
https://fastly.jsdelivr.net/gh/HuskyDG/magisk-files@main/{magisk_ver}.json
```

并保存。随后执行 Run.sh 并按正常流程进行即可。

### 补充

在实际编译的过程中，我遇到了 build.sh 的报错：

```
Create system images
mk_image_umount: /tmp/wsa-build-KdtqMS5oxv_/system_root_merged/vendor /tmp/wsa-build-KdtqMS5oxv_/wsa/x64/vendor.img /tmp/wsa-build-KdtqMS5oxv_/upper/vendor ext4
ERROR: Not yet implemented
Build: an error has occurred, exit
```

应用 [@sn-o-w](https://github.com/sn-o-w) 提供的[补丁](https://raw.githubusercontent.com/sn-o-w/MagiskOnWSALocal/main/scripts/build.sh)便可以解决这个问题，这是我在 [[Bug] Build Error - Create system images](https://github.com/LSPosed/MagiskOnWSALocal/issues/717) 里面找到的。