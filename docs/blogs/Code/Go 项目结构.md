# Go 项目结构

本文是对 Go 项目结构的详细解析，涵盖核心概念、目录布局及最佳实践。

## 核心概念

### Module（模块）

- **定义**：Go 1.11+ 引入的依赖管理单元，对应包含 `go.mod` 文件的目录，定义项目路径、Go 版本及依赖项。
- **组成**：一个 Module 可包含多个 Package，每个 Package 对应一个目录下的 `.go` 文件集合。Module 支持版本化管理，通过语义化版本（SemVer）声明依赖。

### Package（包）

- **类型**：
  - **Library Package**：代码库，通过 `package <name>` 声明，供其他模块引用（如 `github.com/user/mymod/pkg/mypkg`）。
  - **Executable Command**：可执行程序，入口为 `package main` 的 `main()` 函数。
- **访问控制**：通过首字母大小写控制可见性（大写导出，小写私有）。

### Internal 目录

- **作用**：存放私有代码，禁止被其他 Module 导入（Go 编译器强制校验），常用于封装内部实现细节。
- **层级**：可在任意目录层级创建 `internal`，仅同级及子级目录可访问。

## 目录结构

### 标准布局

```
my_go_project/
├── go.mod          # 模块声明与依赖管理
├── go.sum          # 依赖哈希校验
├── cmd/            # 可执行文件入口
│   └── app1/       # 每个子目录对应一个二进制
│       └── main.go
├── internal/       # 私有代码（禁止外部导入）
│   ├── auth/       # 认证逻辑
│   └── db/         # 数据库封装
├── pkg/            # 公共库代码（可选）
│   └── utils/      # 通用工具包
├── api/            # API 定义（Protobuf/OpenAPI）
├── configs/        # 配置文件模板
├── test/           # 测试代码与数据
├── scripts/        # 构建/部署脚本
├── web/            # 前端资源（可选）
└── vendor/         # 依赖本地缓存（已淘汰，推荐 go mod）
```

### 关键目录说明

- **`cmd/`**：存放可执行文件入口，每个子目录独立编译（如 `go build ./cmd/app1`）。
- **`internal/`**：核心私有逻辑，如数据库操作、中间件实现，避免暴露内部细节。
- **`pkg/`**（可选）：公共库代码，供其他项目引用，需谨慎设计接口。
- **`api/`**：OpenAPI/Swagger 规范或 gRPC Protobuf 文件，便于生成客户端/服务端代码。

## 模块化与代码组织

### 分层架构

- **领域驱动设计（DDD）**：按业务域划分包（如 `user/`、`order/`），每个域包含模型、服务、存储层：
  
  ```
  user/
  ├── model.go      # 数据模型
  ├── service.go    # 业务逻辑
  └── repository.go # 数据访问
  ```
- **Clean Architecture**：分离接口、业务逻辑与基础设施，通过依赖注入解耦。

### 代码拆分实践

- **接口与实现分离**：定义接口于 `pkg/`，实现在 `internal/`，如：
  
  ```go
  // pkg/database/db.go
  type DB interface {
      Query(query string) (Result, error)
  }
  
  // internal/db/postgres.go
  type PostgresDB struct{}
  func (p *PostgresDB) Query(query string) (Result, error) { ... }
  ```
- **依赖管理**：通过 `go mod` 管理版本，使用 `replace` 指令处理本地依赖。

## 高级项目结构

### 多模块工作区（Go 1.18+）

- **用途**：管理多个关联 Module（如微服务生态），共享依赖与构建缓存。
- **配置**：顶层 `go.work` 文件定义工作区模块：
  
  ```go
  go 1.18
  use (
      ./service/user
      ./service/order
      ./shared/auth
  )
  ```

### 微服务架构

- **独立模块**：每个服务为独立 Module，通过 API 通信，共享公共库（如 `shared/` 目录）。
- **目录示例**：
  ```
  services/
  ├── user/          # 用户服务
  │   ├── cmd/
  │   ├── internal/
  │   └── go.mod
  └── order/         # 订单服务
      ├── cmd/
      ├── internal/
      └── go.mod
  shared/
  ├── pkg/           # 公共库
  └── go.mod
  ```

## 工具与命令

### 开发流程

- **初始化模块**：`go mod init github.com/user/mymodule`。
- **依赖管理**：
  - 添加依赖：`go get github.com/pkg/errors@v0.9.1`。
  - 清理无用依赖：`go mod tidy`。
- **构建与测试**：
  - 编译：`go build -o bin/app ./cmd/app1`。
  - 测试：`go test -v ./...`（支持单元/集成测试）。

### 性能优化

- **依赖分析**：`go mod why <pkg>` 查看依赖路径。
- **逃逸分析**：`go build -gcflags="-m"` 检测堆内存分配。

## 总结

Go 项目通过 **Module → Package → Internal** 三级结构实现高效组织，结合标准目录约定（cmd/internal/pkg）与模块化设计，兼顾小型项目敏捷开发与大型系统可维护性。关键实践包括：
1. **严格分层**：通过 internal 限制可见性，pkg 暴露稳定接口。
2. **依赖隔离**：利用 go.mod 管理版本，多模块工作区优化协作。
3. **领域驱动**：按业务拆分目录，结合 DDD 或 Clean Architecture 提升内聚性。

遵循上述原则，可构建出高可读、易扩展的 Go 项目，适应从单体应用到微服务生态的多样化场景。