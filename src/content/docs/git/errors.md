---
title: Git 错误处理
description: 常见Git错误及解决方案
sidebar:
  order: 3
tags:
  - Git
  - 错误处理
  - 故障排除
category: 开发工具
difficulty: intermediate
---

## 1. 推送大文件错误

### 错误信息

```bash
client_loop: send disconnect: Connection reset by peer
fatal: sha1 file '<stdout>' write error: Broken pipe
fatal: The remote end hung up unexpectedly
```

### 原因分析

1. Git中的"智能HTTP"协议在POST请求中使用"Transfer-Encoding：chunked"，当它包含大小超过1MB的打包对象时。某些代理服务器（如Nginx）默认情况下不支持此传输编码，请求将在到达Bitbucket Server之前被拒绝。

2. 可能的原因是负载均衡器配置错误，即是网速不好的时候。

3. GitHub提交文件的时候，当文件很大的时候，就会提醒；因为GitHub默认不允许提交超过100M的文件。

### 解决方案

```bash
# 将Git缓冲区大小增加到repo的最大单个文件大小
git config --global http.postBuffer 157286400
```

这个命令将Git的HTTP缓冲区大小设置为约157MB，可以有效解决大文件推送问题。

## 2. SSH连接测试

### 现象

```bash
ssh -T git@github.com
# 出现 You've successfully authenticated, but GitHub does not provide shell access.
```

### 解释

在使用ssh加公钥认证时会输入 `ssh -T Github.com`，认证成功后会输出如下Log：

"but GitHub does not provide shell access" 这句话的意思是，GitHub不提供shell（ssh）访问/接入权限。

ssh -T选项的意思为，不分配伪终端。当你在使用ssh协议连接到自己或者其他服务器时，本地终端会显示命令提示符，你可以在上面操作输入命令ls等。

结合上面几点，这句话的意思即为你无法使用ssh协议直接登录github，在github服务器上建立一个伪终端，并进行操作。

所以，这句提示并不是一个错误，而是github输出的一句提示语。同样你可以在本地使用ssh协议进行git相关操作，并提交到github，没有任何影响。

## 3. 常见Git错误及解决方案

### 合并冲突

```bash
# 当合并分支时出现冲突
git merge feature-branch

# 手动解决冲突后
git add .
git commit -m "解决合并冲突"
```

### 误删分支

```bash
# 查看reflog找到被删除分支的最后提交
git reflog

# 恢复被删除的分支
git checkout -b 分支名 提交哈希
```

### 修改最后一次提交

```bash
# 修改最后一次提交的message
git commit --amend -m "新的提交信息"

# 添加忘记的文件到最后一次提交
git add 忘记的文件
git commit --amend --no-edit
```

### 撤销已推送的提交

```bash
# 使用revert而不是reset（更安全）
git revert HEAD
git push
```

### 强制推送（谨慎使用）

```bash
# 当需要覆盖远程分支时
git push --force-with-lease
```

## 4. 预防措施

### 配置Git忽略文件

```bash
# 创建.gitignore文件
touch .gitignore

# 添加需要忽略的文件或目录
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo "*.log" >> .gitignore
```

### 设置Git别名

```bash
# 设置常用命令的别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

### 使用Git钩子

```bash
# 设置pre-commit钩子进行代码检查
git config --global init.templateDir ~/.git-templates
mkdir -p ~/.git-templates/hooks
echo '#!/bin/sh' > ~/.git-templates/hooks/pre-commit
echo 'npm run lint' >> ~/.git-templates/hooks/pre-commit
chmod +x ~/.git-templates/hooks/pre-commit
```

## 5. 故障排除步骤

### 检查Git配置

```bash
# 检查用户信息
git config --global user.name
git config --global user.email

# 检查远程仓库
git remote -v

# 检查分支状态
git branch -a
```

### 检查网络连接

```bash
# 测试与GitHub的连接
ping github.com

# 测试SSH连接
ssh -T git@github.com
```

### 查看详细错误信息

```bash
# 使用verbose模式获取更多信息
git push --verbose

# 查看Git日志
git log --oneline -10
```

## 参考资料

- [Git官方文档](https://git-scm.com/doc)
- [GitHub帮助文档](https://docs.github.com/cn)
- [Pro Git中文版](https://git-scm.com/book/zh/v2)