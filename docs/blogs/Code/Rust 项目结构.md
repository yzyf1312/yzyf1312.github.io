# Rust 项目结构

本文是对 Rust 项目结构的详细解析，涵盖核心概念、目录布局及最佳实践。

## 核心概念

### Package（包）

- **定义**：Package 是 Cargo 管理的基本单元，对应一个包含 `Cargo.toml` 文件的目录，用于定义项目元数据（名称、版本、依赖等）。
- **组成**：一个 Package 可包含多个 Crate（二进制或库），但最多只能有一个库 Crate（`lib.rs`）和多个二进制 Crate（`main.rs` 或 `src/bin/` 下的文件）。
- **创建方式**：
  - `cargo new project_name`：创建二进制 Package（默认生成 `src/main.rs`）。
  - `cargo new --lib project_name`：创建库 Package（默认生成 `src/lib.rs`）。

### Crate（箱）

- **类型**：
  - **Binary Crate**：可执行文件，入口为 `src/main.rs` 或 `src/bin/*.rs`。
  - **Library Crate**：库文件，入口为 `src/lib.rs`，供其他项目引用。
- **依赖管理**：通过 `Cargo.toml` 的 `[dependencies]` 添加外部库，支持本地路径或 crates.io 版本。

### Module（模块）

- **作用**：组织代码的命名空间，通过 `mod` 关键字声明，支持嵌套结构。
- **文件映射**：
  - 模块 `foo` 可对应 `foo.rs` 或 `foo/mod.rs` 文件。
  - 通过 `pub` 控制可见性，支持 `pub(crate)`、`pub(super)` 等作用域限定。
- **路径引用**：
  - 绝对路径：`crate::module::item`。
  - 相对路径：`self::module::item` 或 `super::module::item`。

## 目录结构

### 标准布局

```
my_project/
├── Cargo.toml     # 项目配置（依赖、元数据）
├── Cargo.lock     # 依赖版本锁定（自动生成）
├── src/
│   ├── main.rs    # 默认二进制入口
│   ├── lib.rs     # 默认库入口
│   └── bin/       # 其他二进制入口（每个文件生成独立可执行文件）
│       └── util.rs
├── tests/         # 集成测试
├── examples/      # 示例代码
├── benches/       # 基准测试
└── target/        # 构建输出目录（自动生成）
```

### 关键目录说明

- **`src/`**：核心代码存放位置：
  - `lib.rs` 定义库的根模块，通过 `pub mod` 导出子模块。
  - `bin/` 下每个 `.rs` 文件生成独立二进制文件，可通过 `cargo run --bin <name>` 运行。
- **`tests/` 和 `benches/`**：分别存放集成测试和性能测试，使用 `#[test]` 和 `criterion` 库。
- **`examples/`**：展示库用法的示例代码，通过 `cargo run --example <name>` 运行。

## 模块化与代码组织

### 模块树构建

- **隐式根模块**：`lib.rs` 或 `main.rs` 是模块树的根（`crate`），通过 `mod` 引入子模块。
- **示例结构**：
  ```rust
  // src/lib.rs
  pub mod network {    // 对应 network.rs 或 network/mod.rs
      pub mod client;  // 对应 network/client.rs
  }
  ```

### 代码拆分最佳实践

- **按功能分层**：如将模型、控制器、接口分开放置：
  ```
  src/
  ├── user/
  │   ├── model.rs
  │   ├── controller.rs
  │   └── api.rs
  └── order/
      ├── model.rs
      ├── controller.rs
      └── api.rs
  ```
- **使用 `pub use` 简化导出**：在根模块中重新导出深层模块，减少外部调用路径。

## 高级项目结构

### Workspace（工作区）

- **用途**：管理多个相关 Package（如共享依赖的库和二进制文件）。
- **配置**：顶层 `Cargo.toml` 定义 `[workspace]`，指定成员路径：
  
  ```toml
  [workspace]
  members = ["crates/adder", "crates/add-one"]
  ```
- **优势**：共享 `target/` 和 `Cargo.lock`，减少重复构建。

### 大型项目建议

- **扁平化结构**：避免深层嵌套，将 Crate 直接放在 `crates/` 下（如 rust-analyzer 项目）。
- **独立配置**：每个 Crate 的 `Cargo.toml` 可自定义编译选项（如 `[lib]` 或 `[[bin]]`）。

## 工具与命令

- **常用命令**：
  - `cargo new`：创建项目。
  - `cargo build`：编译项目（`--release` 优化）。
  - `cargo test`：运行测试。
  - `cargo doc --open`：生成并打开文档。
- **依赖管理**：在 `Cargo.toml` 中添加 `[dependencies]`，支持语义化版本（如 `serde = "1.0"`）。

## 总结

Rust 通过 **Package → Crate → Module** 三级结构实现代码组织，结合 `Cargo.toml` 的灵活配置和标准目录约定，既能支持小型项目快速开发，也能通过 Workspace 和模块化设计管理大型代码库。掌握这些结构后，可结合项目规模选择扁平化或分层设计，提升代码的可维护性和扩展性。