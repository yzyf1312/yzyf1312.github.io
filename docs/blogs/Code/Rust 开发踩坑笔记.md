# Rust 开发踩坑笔记

> 碎碎念：
>
> 国内 Rust 开发环境搭建总被网络问题卡脖子，实测[中科大镜像源](https://mirrors.ustc.edu.cn/)最稳定。

### 安装 Rust 时下载龟速

配置中科大镜像源

在 PowerShell 中运行以下命令：

```powershell
# 设置临时镜像变量
$env:RUSTUP_DIST_SERVER = "https://mirrors.ustc.edu.cn/rust-static"
$env:RUSTUP_UPDATE_ROOT = "https://mirrors.ustc.edu.cn/rust-static/rustup"
```

安装完成后，**永久生效配置**需设置系统环境变量：

```powershell
# 设置 RUSTUP_DIST_SERVER
[Environment]::SetEnvironmentVariable("RUSTUP_DIST_SERVER", "https://mirrors.ustc.edu.cn/rust-static", "Machine")

# 设置 RUSTUP_UPDATE_ROOT
[Environment]::SetEnvironmentVariable("RUSTUP_UPDATE_ROOT", "https://mirrors.ustc.edu.cn/rust-static/rustup", "Machine")
```

### `cargo build` 依赖下载超时

配置 Cargo 国内源：编辑 `~\.cargo\config`

```powershell
[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"

[registries.ustc]
index = "sparse+https://mirrors.ustc.edu.cn/crates.io-index/"

[http]
check-revoke = false  # 解决 Windows 下的证书问题

# 清华源（备用）
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# 字节跳动源（企业级）
[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"
```

> **注意**：
>
> - 若使用 Rust 1.68 以下版本，需删除 `sparse+` 前缀
> - 修改后建议清理缓存：`cargo clean`

## 缓存清理

遇到玄学问题时，依次执行：

```powershell
# 清理 Rust 编译产物
cargo clean

# 重置工具链
rustup self uninstall
rustup update

# 暴力删除缓存
rm -r ~\.cargo\registry
rm -r ~\.rustup\tmp
```