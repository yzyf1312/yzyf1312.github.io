# Dart & Flutter 镜像加速配置

### 核心镜像变量配置

Dart和Flutter依赖两个关键环境变量实现加速，所有操作系统均需配置以下内容（任选一个镜像站）：

#### 推荐镜像源列表

1. **Flutter社区镜像**（官方维护，稳定性优先）
   ```bash
   PUB_HOSTED_URL=https://pub.flutter-io.cn
   FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
   ```

2. **清华大学 TUNA 镜像**（同步频率高，支持多协议）
   ```bash
   PUB_HOSTED_URL=https://mirrors.tuna.tsinghua.edu.cn/dart-pub
   FLUTTER_STORAGE_BASE_URL=https://mirrors.tuna.tsinghua.edu.cn/flutter
   ```

3. **上海交大 SJTUG 镜像**（实时同步，回源策略完善）
   ```bash
   PUB_HOSTED_URL=https://dart-pub.mirrors.sjtug.sjtu.edu.cn
   FLUTTER_STORAGE_BASE_URL=https://mirrors.sjtug.sjtu.edu.cn
   ```

4. **腾讯云镜像**（适合使用腾讯云服务的用户）
   ```bash
   PUB_HOSTED_URL=https://mirrors.cloud.tencent.com/dart-pub
   FLUTTER_STORAGE_BASE_URL=https://mirrors.cloud.tencent.com/flutter
   ```

### 操作系统配置步骤

#### Windows 系统

1. **临时生效（当前会话窗口）**

   打开PowerShell或CMD：

   ```powershell
   $env:PUB_HOSTED_URL="镜像地址"
   $env:FLUTTER_STORAGE_BASE_URL="镜像地址"
   ```

2. **永久生效**
   `[Environment]::SetEnvironmentVariable("PUB_HOSTED_URL", "镜像地址", "Machine")`
   `[Environment]::SetEnvironmentVariable("FLUTTER_STORAGE_BASE_URL", "镜像地址", "Machine")`

#### macOS / Linux 系统

1. **临时生效（当前会话窗口）**
   ```bash
   export PUB_HOSTED_URL="镜像地址"
   export FLUTTER_STORAGE_BASE_URL="镜像地址"
   ```

2. **永久生效**
   - 编辑Shell配置文件（如 `~/.bashrc`、`~/.zshrc`）：
     ```bash
     echo 'export PUB_HOSTED_URL="镜像地址"' >> ~/.bashrc
     echo 'export FLUTTER_STORAGE_BASE_URL="镜像地址"' >> ~/.bashrc
     ```
   - 生效配置：`source ~/.bashrc`

### Flutter SDK 下载加速

若需手动下载SDK，将原始URL中的 `storage.googleapis.com` 替换为镜像域名。例如：

- **原始URL**：
  ```
  https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_v3.13.0-stable.zip
  ```
  
- **镜像URL**（以Flutter社区为例）：
  
  ```
  https://storage.flutter-io.cn/flutter_infra_release/releases/stable/windows/flutter_windows_v3.13.0-stable.zip
  ```

### Android Studio 相关配置

1. **Gradle镜像加速**

   在项目根目录的 `build.gradle` 中添加阿里云仓库：

   ```groovy
   buildscript {
     repositories {
       maven { url 'https://maven.aliyun.com/repository/google' }
       maven { url 'https://maven.aliyun.com/repository/central' }
     }
   }
   ```

2. **Android SDK镜像**

   - 打开 Android Studio → Settings → Android SDK → SDK Update Sites
   - 添加镜像源（如清华源）：
     ```
     https://mirrors.tuna.tsinghua.edu.cn/android/repository/
     ```

### 验证配置

1. 执行 `flutter doctor`，检查依赖下载是否正常。
2. 运行 `echo $PUB_HOSTED_URL`（Unix）或 `echo %PUB_HOSTED_URL%`（Windows），确认变量已生效。

### 注意事项

1. **发布Package时需要恢复默认源**

   发布到 `pub.dev` 前需取消镜像变量，否则会失败：

   ```bash
   unset PUB_HOSTED_URL  # Unix
   Remove-Item Env:\PUB_HOSTED_URL  # PowerShell
   ```

2. **镜像同步延迟**：若遇到依赖版本不一致问题，尝试切换其他镜像源。

### 常见问题

- **镜像失效**：检查镜像站状态页面（如清华镜像状态页），或切换备用镜像。
- **环境变量不生效**：确保变量名无拼写错误，重启终端或IDE。
- **混合开发配置**：若集成到Android原生项目，需同步配置Gradle镜像。

通过以上配置，可显著提升Dart包下载和Flutter SDK安装速度。更多细节可参考[Flutter中文文档](https://flutter.cn/community/china/)。