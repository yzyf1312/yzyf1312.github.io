# Ubuntu 镜像源更换指南

## 前言

这篇文章将详细介绍如何在 Ubuntu 系统中更换软件源，以提高软件包的下载速度和更新效率。这是一个非常实用的技巧，尤其适合那些经常需要更新系统和软件包的用户。

> Tips
>
> 本文使用 Ubuntu 20.04 进行演示，关于 Ubuntu 各版本的系统代号会在文末给出。

## 镜像源更换

### 备份原镜像源文件

首先，备份当前的镜像源文件。这样做的目的是保证在更换过程中遇到问题时，可以快速恢复到原始状态。

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

### 编辑镜像源文件

接下来，编辑 `/etc/apt/sources.list` 文件，将其中的镜像源地址更换为更快的镜像源。这里推荐使用阿里云镜像源。

```bash
sudo vim /etc/apt/sources.list
```

在打开的编辑器中，将原有的内容替换为以下内容：

```plaintext
# Ubuntu 20.04 LTS (Focal Fossa) 镜像源
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

# 清华大学镜像源（可选）
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse multiverse
```

### 更新软件包列表

完成编辑后，更新软件包列表，以确保系统能够识别新的镜像源。

```bash
sudo apt update
```

## Ubuntu 系统代号

| Version | Code name       | Version | Code name          | Version | Code name         | Version | Code name        |
| ------- | --------------- | ------- | ------------------ | ------- | ----------------- | ------- | ---------------- |
| 24.10   | Oracular Oriole | 19.04   | Disco Dingo        | 14.04   | Trusty Tahr       | 9.04    | Jaunty Jackalope |
| 24.04   | Noble Numbat    | 18.10   | Cosmic  Cuttlefish | 13.10   | Saucy  Salamander | 8.10    | Intrepid Ibex    |
| 23.10   | Mantic Minotaur | 18.04   | Bionic  Beaver     | 13.04   | Raring Ringtail   | 8.04    | Hardy Heron      |
| 23.04   | Lunar Lobster   | 17.10   | Artful  Aardvark   | 12.10   | Quantal Quetzal   | 7.10    | Gutsy Gibbon     |
| 22.10   | Kinetic Kudu    | 17.04   | Zesty  Zapus       | 12.04   | Precise Pangolin  | 7.04    | Feisty Fawn      |
| 22.04   | Jammy Jellyfish | 16.10   | Yakkety Yak        | 11.10   | Oneiric Ocelot    | 6.10    | Edgy Eft         |
| 21.10   | Impish Indri    | 16.04   | Xenial Xerus       | 11.04   | Natty Narwhal     | 6.06    | Dapper Drake     |
| 21.04   | Hirsute Hippo   | 15.10   | Wily Werewolf      | 10.10   | Maverick Meerkat  | 5.10    | Breezy  Badger   |
| 20.10   | Groovy Gorilla  | 15.04   | Vivid Vervet       | 10.04   | Lucid Lynx        | 5.04    | Hoary  Hedgehog  |
| 20.04   | Focal Fossa     | 14.10   | Utopic Unicorn     | 9.10    | Karmic Koala      | 4.10    | Warty Warthog    |
| 19.10   | Eoan  Ermine    |         |                    |         |                   |         |                  |