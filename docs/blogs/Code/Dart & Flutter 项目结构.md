# Dart & Flutter 项目结构

## 核心概念

### Package（包）

- **定义**：Dart 的基本代码组织单元，通过 `pubspec.yaml` 定义元数据和依赖关系，支持模块化开发。一个包可包含多个库（library）。
- **类型**：
  - **应用包**：包含可执行入口（`main.dart`），如 Flutter 应用。
  - **库包**：提供可复用的功能模块，通过 `export` 暴露 API。

### Library（库）

- **作用**：通过 `library` 关键字声明，实现代码逻辑封装。使用 `import` 导入其他库，支持别名和条件导入。
- **访问控制**：以下划线开头的成员为私有，仅库内可见。

### Flutter 分层架构

- **UI层**：Widget 树构建与渲染，关注展示逻辑。
- **业务逻辑层**：状态管理（如 Provider/BLoC），处理数据转换。
- **数据层**：API 请求、本地存储、模型映射。

## 目录结构

### 标准布局（中型项目）

```
flutter_project/
├── android/                # Android 平台代码
├── ios/                    # iOS 平台代码
├── lib/                    # 核心代码
│   ├── main.dart           # 应用入口
│   ├── app/                # 全局配置（主题、路由等）
│   ├── features/           # 功能模块（DDD 风格）
│   │   └── auth/           # 示例模块
│   │       ├── data/       # 数据层（API、本地存储）
│   │       ├── domain/     # 业务逻辑（实体、UseCase）
│   │       └── presentation/ # UI层（页面、组件）
│   ├── core/               # 基础服务
│   │   ├── network/        # 网络封装
│   │   ├── di/             # 依赖注入
│   │   └── utils/          # 通用工具
│   ├── shared/             # 跨模块共享组件
│   └── generated/          # 自动生成代码（如路由）
├── test/                   # 单元测试
├── integration_test/       # 集成测试
├── assets/                 # 静态资源
│   ├── images/             # 图片（支持多分辨率）
│   └── fonts/              # 字体文件
└── pubspec.yaml            # 依赖管理
```

### 关键目录说明

- **`features/`**：按功能模块划分，遵循「功能切片」原则，每个模块独立实现数据-逻辑-UI 闭环。
- **`core/`**：基础设施层，包含网络请求、日志系统等跨模块服务。
- **`shared/`**：可复用的基础组件（按钮、对话框）或工具类。
- **`generated/`**：自动生成文件（如 `freezed` 模型、`go_router` 路由）。

## 模块化与架构模式

### 状态管理方案

| 方案       | 适用场景                  | 特点                                      |
|------------|---------------------------|-------------------------------------------|
| Provider   | 简单状态传递             | 轻量级，基于 InheritedWidget              |
| BLoC       | 复杂业务逻辑             | 事件驱动，支持异步流处理                   |
| Riverpod   | 现代化替代方案           | 支持全局/局部状态，依赖注入友好            |
| GetX       | 快速开发                  | 集成路由、依赖管理，但耦合度高             |

### 路由管理

- **声明式路由**：使用 `go_router` 或 `auto_route` 定义集中式路由表：

  ```dart
  // routes/app_routes.dart
  class AppRoutes {
    static const home = '/';
    static const profile = '/profile';
    
    static final router = GoRouter(
      routes: [
        GoRoute(path: home, builder: (_,__) => HomePage()),
        GoRoute(path: profile, builder: (_,__) => ProfilePage())
      ]
    );
  }
  ```

### 代码分层实践

- **数据层**：实现 `Repository` 模式，隔离 API 与本地存储：

  ```dart
  abstract class AuthRepository {
    Future<User> login(String email, String password);
  }
  
  class AuthRepositoryImpl implements AuthRepository {
    final AuthApi _api;
    final AuthLocalStorage _storage;
  
    Future<User> login(...) async {
      final user = await _api.login(...);
      await _storage.saveUser(user);
      return user;
    }
  }
  ```
- **领域层**：定义 `UseCase` 封装业务规则。

## 高级项目结构

### 多包管理（Monorepo）

- **方案**：使用 `melos` 管理多个独立包，共享依赖与工具链。
- **目录示例**：

  ```
  monorepo/
  ├── packages/
  │   ├── design_system/   # UI 组件库
  │   ├── auth/            # 认证模块
  │   └── analytics/       # 分析SDK
  ├── apps/
  │   ├── mobile_app/      # 主应用
  │   └── admin_panel/      # 管理后台
  └── melos.yaml            # 多包配置
  ```

### 微前端架构

- **模块动态加载**：通过 `flutter_modular` 实现按需加载：

  ```dart
  void main() => runApp(ModularApp(module: AppModule()));
  
  class AppModule extends Module {
    @override
    List<Bind> get binds => [...];
    
    @override
    List<ModularRoute> get routes => [
      ChildRoute('/', child: (_,__) => HomePage()),
      ModuleRoute('/products', module: ProductModule())
    ];
  }
  ```

## 工具与最佳实践

### 开发流程

1. **初始化项目**：`flutter create --org com.example my_app`。
2. **依赖管理**：
   - 添加依赖：`flutter pub add provider`。
   - 升级依赖：`flutter pub upgrade --major-versions`。
3. **代码格式化**：使用 `import_sorter` 自动整理导入。

### 性能优化

- **编译优化**：启用 `--dart-define` 区分环境配置。
- **内存分析**：通过 DevTools 检测 Widget 重建与内存泄漏。

## 总结

构建健壮的 Flutter 项目需关注：

1. **分层清晰**：严格分离 UI/逻辑/数据层，通过 DI 解耦。
2. **模块化设计**：按功能划分模块，支持独立开发与测试。
3. **状态管理**：根据复杂度选择合适方案，避免全局状态污染。
4. **自动化工具**：集成代码生成、格式化、静态分析提升效率。

通过以上实践，可构建出可维护性强、适应快速迭代的 Flutter 应用架构，从容应对从中小型应用到企业级项目的挑战。