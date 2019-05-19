个人整理的一些常用的 Git 概念和命令集合，方便速查和快速解决某些场景下的问题，覆盖了日常开发和协同工作下的一部分场景，不只是命令行的介绍

精简入门
1、克隆仓库

克隆仓库会下载仓库完整的文件、分支和历史记录。

```
git clone [<options>] [--] <repo> [<dir>]
```

```
# 克隆完整的仓库到 ./git-learning 目录下
git clone git@github.com:x-cold/git-learning.git
# 只克隆 dev 分支到 ./dev 目录下
git clone -b dev git@github.com:x-cold/git-learning.git dev
```

2、将文件变更记录写入到本地的索引库

```
git add [<options>] [--] <pathspec>...
# 添加当前目录下所有文件
git add .
# 添加部分文件
git add src/ app/ index.js
```
3、提交变更到工作区

```
git commit [<options>] [--] <pathspec>...
# 最普通的提交
git commit -m "feat: support canvas"
# 修改当前的 commit message
git commit --amend
# 重置当前的 commit author 和 message
git commit --amend --reset-author 
```

4、推送代码到远程仓库

```
git push [<options>] [<repository> [<refspec>...]]
# 提交本地仓库当前分支到远程仓库的 master 分支
git push origin master
# 提交本地仓库 dev 分支到远程的 master 分支
git push origin master:dev
```

## 聊聊设计

[href="./public/images/git-workflow.jpg"]

图像来自维基百科

Git 是一个分布式的版本控制工具，因此远程和本地可以视为两个独立的 Git 仓库。上图是一张经典的 Git 中的数据流与存储级别的介绍，其中储存级别主要包含几部分：

工作区 (Working Files)，指的是我们时刻在编辑的文件的目录，通常来说我们修改文件都是在工作区体现的
暂存区（Stage），暂存将本地的修改，然后提交到本地仓库
本地仓库（Local）
远程仓库（Remote）
由此不难看出整体的数据流动，就是一条从：工作区 -> 暂存区 -> 本地仓库 -> 远程仓库 的双向数据流通道。


### 常用命令

#### git init
创建一个空白的 git 仓库

```git init```

#### git add
```git add [<options>] [--] <pathspec>...```

#### git commit
```git commit [<options>] [--] <pathspec>...```

#### git remote
remote 指的是本地的 git 仓库关联的远程 git 仓库。

1、查看远程仓库信息

```git remote```
2、看远程仓库详细信息

```git remote -v```
3、删除远程仓库

```git remote remove <name>```
# 移除名字为 origin 的远程仓库
```git remote remove origin```

4、添加远程仓库

```
git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>

```

```
git remote origin git@github.com:x-cold/git-learning.git
```

#### git branch
1、列出本地存在的分支

```git branch```
2、列出远程分支

```git branch -r```
3、列出本地和远程分支

```git branch -a```
4、创建本地分支

```git branch [branchName] (remoteBranch)```
```# 基于远程仓库的 dev 分支，创建本地仓库的 feature/canvas 分支```
```git branch feature/canvas dev```

5、分支重命名

```git branch [<options>] (-m | -M) [<old-branch>] <new-branch>```
```# 修改 feature/canvas 分支名为 feature/canvas2```
```git branch -M feature/canvas feature/canvas2```
6、删除本地分支

```git branch -d | -D [branchName]```
7、删除远程分支

```git branch [<options>] [-r] (-d | -D) <branch-name>.```
```# 删除 feature/canvas2 分支```
```git branch -d feature/canvas2```
8、设置默认上游及分支

```git branch --set-upstream <localBranch> <remote>/<remoteBranch>```
```# 以后只需要在 dev 分支执行 git push (无需额外的参数) 就可以提交到 origin/dev```
```git branch --set-upstream dev origin/dev```

#### git checkout
检出分支:

```git checkout [<options>] <branch>```
```# 切换当前分支到 dev 分支```
```git checkout dev```
```# 基于当前分支创建 test 分支，并且将当前分支切换到 test 分支```
```git checkout -b test```
```除开用于分支切换，checkout 还可以用于恢复未添加到本地工作区，但是被修改过的文件。```


# 将 index.js 恢复到当前 commit 的内容
```git checkout index.js```

#### git merge
合并分支:

```git merge [<options>] [<commit>...]```
```# 合并远程仓库的 master 分支到当前分支```
```git merge origin/master```

#### git rebase
变基，是一种常用且有风险的操作，会改变提交历史，谨慎使用！

```
git rebase 
while(存在冲突) {
    git status
    找到当前冲突文件，编辑解决冲突
    git add -u
    git rebase --continue
    if( git rebase --abort )
        break; 
}
```

```git cherry-pick```
魔法级的命令，cherry-pick 可以提取 N 个的提交记录，合入稳定版本的分支上。

```git cherry-pick [<options>] <commit-ish>...```
```# 挑选 371c2 单个提交记录，合入当前分支```
```git cherry-pick 371c2```
```# 挑选出 371c2 到 971209 的所有提交记录，并合入当前分支```
```git cherry-pick 371c2…971209```

#### git push
推送到远程仓库，同步本地仓库的提交历史到远程仓库

```git push [<options>] [<repository> [<refspec>...]]```
```# 提交本地仓库当前分支到远程仓库的 master 分支```
```git push origin master```
```# 提交本地仓库 dev 分支到远程的 master 分支```
```git push origin master:dev```
```# 提交单个 tag```
```git push origin publish/1.0.0```
```# 提交所有 tag```
```git push origin --tags```

### git pull
拉取远程分支，同步远程仓库的提交历史到本地仓库

```git pull [<options>] [<repository> [<refspec>...]]```
```# 通常来说，默认的 pull 行为等同于 git fetch + git merge```
```# 下面这行命令等同于 git fetch origin master && git merge origin/master```
```git pull origin master```

```# 也可以通过变基的方式来拉取代码，这样分支模型不容易受到影响```
```# 下面这行命令等同于 git fetch origin master && git rebase origin/master```
```git pull --rebase origin master```

### git tag
1、创建 tag

```git tag -a v1.1.0 -m ""```
2、查看 tag

```git tag```
3、推送到远程

```git push origin --tags```
4、删除本地 tag

```git tag -d v1.0.0```
5、删除远程 tag

```git push origin :refs/tags/v1.0.0```

.git 仓库元数据
每一个 git 的代码仓库目录下，都会有一个 .git 的文件夹，其中包含的重要文件包含以下：

文件/文件夹	含义	
config*	配置文件	
description	描述，仅供 Git Web 程序使用	
HEAD	当前被检出的分支	
index	暂存区信息	
hooks/	客户端或服务端的钩子脚本（hook scripts）	
info/	全局性排除（global exclude）文件，不希望被记录在 .gitignore 文件中的忽略模式（ignored patterns）	
objects/	所有数据内容	
refs/	数据（分支）的提交对象的指针	

进阶技巧

修改 commit 历史
使用 git rebase 进行历史修改，假定修改最近 3 条历史，操作步骤如下：

```1、git rebase -i HEAD~3```

运行此命令会提供一个提交列表，如下所示，其中 commit 记录是时间逆序排列的；

```
pick f7f3f6d changed my name a bit
pick 310154e updated README formatting and added blame
pick a5f4a0d added cat-file
```

```# Rebase 710f0f8..a5f4a0d onto 710f0f8
#
# Commands:
#  p, pick = use commit
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#```
2、编辑上述列表文件，在需要更改的 commit 前，将 pick 修改为 edit ，如果需要压缩，可设置为 squash 保存退出，进入到 rebase 流程；

3、通过 git commit --amend --author 对历史记录依次修改和持续进行 rebase；
```

添加指定文件
```git ls-files src/ | grep '\.css$' | xargs git add```

删除所有 commit 中的某些文件
# 删除文件
```git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch -r build' --prune-empty --tag-name-filter cat -- --all```

# 触发 GC
```git reflog expire --expire=now --all && git gc --prune=now --aggressive```

git stash
使用 stash 可以将当工作区更改的临时存放起来，等一番 git 操作（比如 merge / rebase 等）之后，再将这部分更改重新放回工作区。

# 临时存放，临时存放区是一个栈的结构，支持多次临时存放，遵循后入先出的原则
```git stash```
# 重新放回到工作区
```git stash pop```

附录
githug[href="https://github.com/Gazler/githug], 一个专门为 git 学习路径设计的游戏
awesome-git-addons[href="https://github.com/stevemao/awesome-git-addons], git 命令行工具扩展的合集
git-tips[href="https://github.com/git-tips/tips], 常用使用场景和技巧集合
lazygit[href="https://github.com/jesseduffield/lazygit"], 懒人专用的 git 命令行程序