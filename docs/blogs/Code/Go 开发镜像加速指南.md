# Go 开发镜像加速指南

## 安装 Go 时下载龟速

使用国内镜像站下载官方安装包：

> **推荐镜像源**
> - 官方中国镜像：https://golang.google.cn/dl/
> - 第三方镜像站：https://mirrors.aliyun.com/golang/

## Go 模块依赖加速

### 配置 GOPROXY 镜像源

#### 类 Unix 系统 (Linux/macOS)

```bash
# 三选一设置镜像源（七牛/阿里/官方）
go env -w GOPROXY=https://goproxy.cn,direct  # 七牛云
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct  # 阿里云
go env -w GOPROXY=https://goproxy.io,direct  # 官方全球CDN

# 验证配置
go env | grep GOPROXY
```

#### Windows 系统 (PowerShell)

```powershell
# 三选一设置镜像源
$env:GOPROXY = "https://goproxy.cn,direct"
$env:GOPROXY = "https://mirrors.aliyun.com/goproxy/,direct"
$env:GOPROXY = "https://goproxy.io,direct"

# 永久生效（需管理员权限）
[Environment]::SetEnvironmentVariable("GOPROXY", "https://goproxy.cn,direct", "Machine")
```

### 私有模块配置

```bash
# 设置不走代理的私有仓库（支持通配符）
go env -w GOPRIVATE=*.corp.example.com,*.internal.com
```

## 缓存清理

```bash
# 清理模块缓存
go clean --modcache

# 重置环境配置
go env -u GOPROXY
go env -u GOPRIVATE
```

## GOSUMDB 校验加速

解决 `sum.golang.org` 连接超时问题：

```bash
# 类 Unix 系统
go env -w GOSUMDB=sum.golang.google.cn

# Windows 系统
$env:GOSUMDB = "sum.golang.google.cn"
```

> **注意事项**
>
> 1. Go 1.13 及以上版本支持镜像代理
> 2. 多个镜像源用逗号分隔，`direct` 表示直连源站
> 4. 私有仓库请务必配置 GOPRIVATE 避免校验失败