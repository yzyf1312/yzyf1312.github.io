# Dart 使用动态链接库

您可以访问 [WordPress](http://blog.yfstudio.online/?p=347) 版本以获得不一样的体验。

本文使用 `ffigen` 包为 Dart 生成动态链接库的绑定。

## 前置知识

1. Dart 开发基础
2. Go 开发基础
3. 动态链接库概念

本文默认读者已经了解以上知识。若未了解，请读者自行查阅资料。

## 示例

以下是一个使用 Go 语言生成动态链接库并使用 Dart 调用其导出的函数的示例。

### 环境

- 系统
  - 版本：Windows 10 专业工作站版
  - 操作系统内部版本：19045.3803
- 开发环境
  - Go ：`go1.23.2 windows/amd64`
  - Dart ：`3.6.1 (stable) (Tue Jan 7 09:50:00 2025 -0800) on "windows_x64"`
    - `ffi: ^2.1.3`
    - `ffigen: ^15.0.0`
  - LLVM：`19.1.7`
    - 安装路径：`D:\App\Runtime\LLVM`

### 完整流程

#### Go 部分 - 生成动态链接库

新建一个名为 go-test 的文件夹。

在 go-test 下运行指令：

```shell
go mod init go-test
```

新建文件 `main.go`，内容如下：

```go
package main

import "C"

//export Add
func Add(a, b int) int {
	return a + b
}

func main() {}
```

保存后 `main.go` 后运行指令：

```shell
go build -o add.dll -buildmode=c-shared main.go
```

此时 go-test 下的结构如下：

```shell
.
├── add.dll
├── add.h
├── go.mod
├── main.go

0 directories, 4 files
```

至此，Go 部分即动态链接库的生成已经完成，接下来就是 Dart 部分即动态链接库的调用。

#### Dart 部分 - 调用动态链接库

新建一个名为 ffi_test 的文件夹。

在 ffi_test 下运行指令：

```shell
dart create . --force
```

使用以下指令将 ffigen 添加至 dev_dependencies：

```shell
dart pub add -d ffigen
```

将前面生成的 `add.h` 复制到 `lib/lib_headers` 下。

新建文件 `ffigen.yaml`，内容如下：

```yaml
name: GoAddLibAutoGen
output: 'lib/goaddlib_bindings.dart'
headers:
  entry-points:
    - 'lib/lib_headers/add.h'
llvm-path: ['D:\\App\\Runtime\\LLVM']
```

保存 `ffigen.yaml` 后运行指令：

```shell
dart run ffigen --config ffigen.yaml
```

此时 ffi_test 下的结构如下：

```shell
.
├── CHANGELOG.md
├── README.md
├── analysis_options.yaml
├── bin
│   └── ffi_test.dart
├── ffigen.yaml
├── lib
│   ├── ffi_test.dart
│   ├── goaddlib_bindings.dart
│   └── lib_headers
│       └── add.h
├── pubspec.lock
├── pubspec.yaml
└── test
    └── ffi_test_test.dart

4 directories, 11 files
```

新建文件 `lib/ff.dart`，内容如下：

```dart
import 'dart:ffi';
import 'dart:io';
import 'package:ffi_test/goaddlib_bindings.dart' as goaddlib_bindings;

List<DynamicLibrary> _libs4 = [
  DynamicLibrary.open(Platform.isWindows ? "add.dll" : "add.so"),
];

Pointer<T> _looup<T extends NativeType>(String symbolName) {
  for (final i in _libs4) {
    if (i.providesSymbol(symbolName)) {
      return i.lookup(symbolName);
    }
  }
  throw Exception("can not find the symbol $symbolName from library");
}

final ff = goaddlib_bindings.GoAddLibAutoGen.fromLookup(_looup);
```

保存 `lib/ff.dart` 后修改 `bin/ffi_test.dart`，内容如下：

```dart
import 'package:ffi_test/ffi_test.dart' as ffi_test;
import 'package:ffi_test/ff.dart';

void main(List<String> arguments) {
  print('Hello world: ${ffi_test.calculate()}!');
  print('ff.Add(1, 2): ${ff.Add(1, 2)}');
}
```

保存 `bin/ffi_test.dart` 后新建文件夹 `compile/exe` 并运行指令：

```shell
dart compile exe .\bin\ffi_test.dart -o .\compile\exe\ffi_test.exe
```

将前面生成的 `add.dll` 复制到 `compile/exe` 下后，运行指令：

```shell
.\compile\exe\ffi_test.exe
```

此时命令行中便会输出：

```shell
Hello world: 42!
ff.Add(1, 2): 3
```

## 相关链接

- [Releases · llvm/llvm-project](https://github.com/llvm/llvm-project/releases)
- [All releases - The Go Programming Language](https://go.dev/dl/)
- [Archive - Flutter](https://docs.flutter.dev/release/archive)