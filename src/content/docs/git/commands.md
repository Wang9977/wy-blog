---
title: Git 命令汇总
description: Git常用命令速查，包括配置、分支管理、撤销、合并等操作
sidebar:
  order: 1
tags:
  - Git
  - 命令
  - 版本控制
category: 开发工具
difficulty: intermediate
---

## 配置命令

```bash
# 查看当前配置
git config --list

# 查看全局配置
git config --global --list

# 查看系统配置
git config --system --list

# 查看当前仓库配置信息
git config --local --list

# 配置用户信息
git config --global user.name '用户名'
git config --global user.email '邮箱@example.com'
```

## 分支管理

```bash
# 查看分支
git branch                    # 查看本地分支
git branch -r                 # 查看远程分支
git branch -a                 # 查看本地和远程分支

# 切换分支
git checkout -b 新分支名字    # 创建并切换分支
git checkout 分支名字         # 切换分支

# 删除分支
git branch -d 分支名字        # 删除本地分支
git push origin --d 分支名字  # 删除远程分支

# 重命名分支
git branch -m 老名字 新名字
```

## Git 撤销

### 未执行 git push 的情况

```bash
# 查看提交历史，找到需要撤销的commit_id
git log

# 撤销commit，不删除工作空间改动的代码，撤销commit和add操作
git reset commit_id

# 撤销commit，不删除工作空间改动代码，撤销commit但不撤销add
git reset --soft commit_id

# 删除工作区间改动代码，代码恢复到前一commit_id对应的版本
git reset --hard commit_id
```

### 已执行 git push 的情况

```bash
# 代码回滚，用新的commit回滚之前的commit
git revert commit_id

# 把回滚的代码push到远端
git push
```

### 修改 commit 注释

```bash
git commit --amend
```

## Git 合并

### git merge

```bash
# 强行关闭fast-forward
git merge --no--ff

# 把commit进行压缩
git merge --squash
```

**fast-forward**：当条件允许的时候，git直接把HEAD指针指向合并分支的头，完成合并。没有创建commit，删除分支会丢失分支信息。

## 文件状态变化周期

Git中的文件有两种状态：

- **已跟踪**：工作状态可能是未修改、已修改、已放入暂存区
- **未跟踪**：新添加的文件

## 常用命令对比

### git status 和 git diff

- **git status**：告诉我们当前仓库的状态，有没有被修改过
- **git diff**：告诉我们文件具体修改了什么内容

### git status 输出

```bash
# 初次克隆之后
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean

# 修改文件后
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

    README

nothing added to commit but untracked files present (use "git add" to track)
```

### 简写形式

```bash
$ git status -s
 M README           # 修改过的文件前面有 M 标记
MM Rakefile
A  lib/git.rb       # 新添加到暂存区中的文件前面有 A 标记
M  lib/simplegit.rb
?? LICENSE.txt      # 新添加的未跟踪文件前面有 ?? 标记
```

### git diff 用法

```bash
# 查看已暂存和未暂存的修改
git diff                    # 当前做的更新尚未暂存
git diff --cached          # 查看已经暂存起来的变化
git diff --staged          # 查看已经暂存的将要添加到下次提交里的内容
```

## git add

1. 开始跟踪文件，并且该文件处于暂存状态，把已跟踪的文件放到暂存区
2. 合并时把有冲突的文件标记为已解决状态

## git fetch 与 git pull

### git fetch

将更新git remote中所有的远程仓库所包含分支的最新commit-id，将其记录到.git/FETCH_HEAD文件中。

```bash
# 创建并更新本地远程分支
git fetch

# 手动指定要fetch的remote
git fetch origin

# 指定远程remote和FETCH_HEAD，并且只拉取该分支的提交
git fetch origin dev
```

### git pull = git fetch + git merge

```bash
# 取回远程主机某个分支的更新，再与本地的指定分支合并
git pull 远程 远程分支:本地分支
```

### 总结

1. **git fetch** 是从远程获取最新版本到本地，但不会自动merge
2. **git pull** 则是会获取所有远程索引并合并到本地分支中来