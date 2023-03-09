本文包含四部分内容：

- Linus Torvalds
- Git 是什么
- Git add 和 commit 内部实现原理
- 动画解析 Git 命令

---

先来了解一下是谁创造了Git



## Linus Torvalds

2005 年，一位 Linux 开发成员写了一个可以连接 BitKeeper 仓库的外挂，因此 BitMover 公司认为他反编译了 BitKeeper。BitMover 决定中止 Linux 免费使用 BitKeeper 的授权。最终 Linux 团队与 BitMover 磋商无果，Torvalds 决定开发自己的版本管理系统。

**十天后，git 诞生了。**

是的，没有搞错，就用了10天。~~开发了一个世界上最大的 交友网站~~！！

这个人就是下面这位

![test](https://avatars.githubusercontent.com/u/1024025?v=4)



>  一辈子就做成了两件事，创造了linux和Git

- 1991年 linux 0.01 开源

- 1997 年，《大教堂与集市》第一版发布。书中通过分析 Linux 成功的案例，总结开源开发规律。

- 2005 年，Git诞生



> Talk is cheap. Show me the code.

这句话就是出自Linus Torvards，他还有很多经典的语录，会在本篇文章结尾给出。

同时，他也在用实际行动告诉我们。下图是他最近一年在github上的代码提交，几乎每天都在提交代码。

![image.png](https://pan.udolphin.com/files/image/2021/8/4b7a35b57ffeb3671e36085a816d231d.png)


Q：Git是用什么语言写的？

A：C语言


----

介绍完作者，现在进入正文部分。





## Git是什么

> Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals.

上面这句话源自git仓库readme文件，包含了4个信息：

- fast：快速的，一次拉取获取到远端所有分支，大部分命令可以在本地操作

- scalable：可扩展的，本地切出多分支，推送之前这些分支可以不需要和远端交互

- distribution revision control system：分布式版本控制系统

- unusually rich command set：非常丰富的命令集

---

  Q：git有多少个commands？

  A：142 个 commands， 常用10个

  ``` bash
  $ git help -a|grep "^  "|wc -l
  ```



但是在 Linus 看来，git只不过是 ` A stupid content tracker` ，这一点在分析git内部实现原理的时候会深有其感





### 什么是版本控制？

> 一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。

分为三种类型：

- 本地版本控制系统
- 集中式版本控制系统
- 分布式版本控制系统

##### 本地版本控制系统

​	同系统上开发协同

​	eg：写论文的时候，只要你不是论文一把过，都会改好几次。对于每个版本的论文，许多人习惯用复制整个项目目录的方式来保存不同的版本，或许还会改名加上备份时间以示区别。 这么做唯一的好处就是简单，但是特别容易犯错。 有时候会混淆所在的工作目录，一不小心会写错文件或者覆盖意想外的文件。

`缺点`：有时候会混淆所在的工作目录，一不小心会写错文件或者覆盖意想外的文件。

![本地版本控制系统](https://git-scm.com/book/en/v2/images/local.png)



##### 集中式版本控制系统 SVN

不同系统上的开发者协同工作

有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或者提交更新。

`优点`：管理员也可以轻松掌控每个开发者的权限

`缺点`：中央服务器的单点故障，如果宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作

![集中式版本控制系统](https://git-scm.com/book/en/v2/images/centralized.png)



##### 分布式版本控制系统 Git

​	每一次的克隆操作，实际上都是一次对代码仓库的完整备份

​	eg：每台机器都可以独立作为一个服务器

![分布式版本控制](https://git-scm.com/book/en/v2/images/distributed.png)



既然Git这么强，为什么Google 和 Facebook 不用 git 管理源码？





在美版知乎网站 StackOverflow 上曾经有一个问题《[Why is Git better than Subversion?](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/871/why-is-git-better-than-subversion)》，被采纳的高赞回答是这样说的：

> Git is not better than Subversion. But is also not worse. **It's different**.



## Git 内部原理



![git仓库结构](https://pic2.zhimg.com/v2-3bc9d5f2c49a713c776e69676d7d56c5_r.jpg)





---

- Workspace：工作区

  实际看到的目录和目录里的内容

- Index / Staged： 暂存区

  工作区中有一个隐藏目录 .git   --->  git的版本库。这个版本库里包含：

  - index文件，staged

  - git自动创建的master分支
  - 指向master的第一个指针Head

- Repository： 本地仓库

- Remote： 远程仓库



这里只介绍add和commit的过程



一个git仓库.git 目录下会包含以下内容

``` bash
$ ls -F1

# 得到以下内容
config
description
HEAD
hooks/
info/
objects/
refs/
```

- `config` 文件包含项目特有的配置选项。
- `description` 文件仅供 GitWeb 程序使用，我们无需关心
- `info` 目录包含一个全局性排除（global exclude）文件， 用以放置那些不希望被记录在 `.gitignore` 文件中的忽略模式（ignored patterns）。
- `hooks` 目录包含客户端或服务端的钩子脚本（hook scripts）cat
- `HEAD` 文件：`HEAD` 文件指向目前被检出的分支
- （尚待创建的）`index` 文件：`index` 文件保存暂存区信息
- `objects` 目录：存储所有数据内容
- `refs` 目录：存储指向数据（分支、远程仓库和标签等）的提交对象的指针



### 创建一个新的文件夹

```bash
# 创建 project 文件夹
$ mkdir project
# 打开 project 文件夹
$ cd project
# 初始化
$ git init
```

``` bash
# 查看git目录树结构
$ tree .git/

.git
├── HEAD
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── fsmonitor-watchman.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-merge-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── pre-receive.sample
│   ├── prepare-commit-msg.sample
│   ├── push-to-checkout.sample
│   └── update.sample
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags
```


```bash
# 创建一个新文件
$ echo 'hello demo' > demo1.txt
$ ls -al

drwxr-xr-x   4 panlei  staff  128 Aug  4 22:27 .
drwxr-xr-x   6 panlei  staff  192 Aug  4 22:24 ..
drwxr-xr-x  12 panlei  staff  384 Aug  4 22:46 .git
-rw-r--r--   1 panlei  staff   11 Aug  4 22:27 demo1.txt
```


```bash
# 使用 git add命令
$ git add demo1.txt
```

``` bash
# 这个时候再查看.git目录下的内容
$ tree .git

.git
├── HEAD
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── fsmonitor-watchman.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-merge-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── pre-receive.sample
│   ├── prepare-commit-msg.sample
│   ├── push-to-checkout.sample
│   └── update.sample
├── index
├── info
│   └── exclude
├── objects
│   ├── 90
│   │   └── dd573a597ea266ffd31bb0c2feff9eabdafdac
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags
```



发现在目录下多出了一个 hash 值，这个hash值是什么呢？

会不会是文件内容呢，毕竟前面有说到 git 是 content tracker。打印出来看一下
``` bash
$ echo 'hello demo' | git hash-object --stdin

90dd573a597ea266ffd31bb0c2feff9eabdafdac
```


真的就对应着文件内容。



#### 为什么objects里生成的hash一分为二了？

A：40 个字符串里有2个拎出来做文件夹名，38位做文件名



``` bash
# 查看新文件的hash 值
echo 'hello demo' | git hash-object --stdin

# -w
# Actually write the object into the object database.

# --stdin
# Read the object from standard input instead of from a file.
```

> **SHA-1**
>
> Secure Hash Algorithm 1 安全散列算法1
>
> 散列值通常的呈现形式为40个[十六进制](https://zh.wikipedia.org/wiki/十六进制)数。
>
> 05年密码分析人员发现了对SHA-1的有效攻击方法，这表明该算法可能不够安全，不能继续使用



##### A1 - trie（踹） 树

> 单词查找树，是一种树形结构，用于保存大量的字符串

优点是：检索快，利用字符串的公共前缀来节约存储空间。

##### A2 - 文件数量限制

单目录下的文件在某些文件系统是有限制的，通过这种方式缓解这个问题



Q2：一般来说，存文件会存时间戳，这里没有记录时间戳，文件内容和时间戳都丢失了吗？

A：Git hash的是content，不在乎state是什么。但是Git还是要存这些文件state的，存在stage files里面

``` bash
# 查看 git stage 里的内容
# 显示有关索引和工作树中文件的信息
$ git ls-files --stage

100644 90dd573a597ea266ffd31bb0c2feff9eabdafdac 0	demo1.txt
```



Q：100644 是什么意思？

A：前三位代表了文件类型。100 是普通文件

---
 
     Linux 系统中采用三位十进制数表示权限，如0755， 0644.
     
        A - 0， 十进制
        B - 用户
        C - 组用户
        D - 其他用户

        ---  -> 0  (no execute , no write ,no read)
        --x  -> 1  execute, (no write, no read)
        -w-  -> 2  write 
        -wx  -> 3  write, execute
        r--  -> 4  read
        r-x  -> 5  read, execute
        rw-  -> 6  read, write
        rwx  -> 7  read, write , execute


     一般赋予目录0755权限，文件0644权限




``` bash
# 打印生成的文件里的内容, 只要给hash值前几位
$ git cat-file -p 90dd

hello demo
```

``` bash
# 打印文件的类型
$ git cat-file -t 90dd

blob
```

从这里可以发现，文件内容是以blob（Binary large object）存储的



### Git add 做了什么事情

1、把这个文件写成hash，文件内容是以二进制形式存储为一个Blob, 这个Blob file的名字是文件内容的hash值。

``` bash
$ echo 'hello demo' | git hash-object -w --stdin

90dd573a597ea266ffd31bb0c2feff9eabdafdac
```

2、update-index，即放进stage area

``` bash
$ git update-index --add --cacheinfo

10064 df33e3965574decdfb364081521647a848324280 hello.txt
```



git add 只会对文件做hash，不关心目录。没有commit之前，目录存在index里



###  Git commit 做了什么事情

Q：执行一次 commit 新增了几个文件?

``` bash
.git
├── COMMIT_EDITMSG
├── HEAD
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── fsmonitor-watchman.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-merge-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── pre-receive.sample
│   ├── prepare-commit-msg.sample
│   ├── push-to-checkout.sample
│   └── update.sample
├── index
├── info
│   └── exclude
├── logs
│   ├── HEAD
│   └── refs
│       └── heads
│           └── master
├── objects
│   ├── 83
│   │   └── 250377d70e516ddcd4b0257868c949b04a5562
│   ├── 90
│   │   └── dd573a597ea266ffd31bb0c2feff9eabdafdac
│   ├── 93
│   │   └── 0e4c9864e59861622b5c3252000abff81b0d7b
│   ├── info
│   └── pack
└── refs
    ├── heads
    │   └── master
    └── tags

```

A：生成了两个文件

第一个文件里是一个commit object，这里面带有commit-message、author、tree

> tree 是目录，根结点

第二个文件是一个tree

第三个文件也就是刚才add的那个Blob文件



#### Git log

Q：git log的时候怎么知道从哪个commit开始看？

A：refs

最早创建HEAD的时候，里面有内容，指向refs/heads/master，里面是一个hash，hash指向commit

``` bash
$ cat .git/HEAD
ref: refs/heads/master
$ cat .git/refs/heads/master
sdfafsad2ewadsad -> hash
```



Q：git 文件越来越大怎么办？

A：	

``` bash
# 删除数据库中不需要的文件和将其他文件打包成一种更有效的格式。
# garbage collection
$ git gc
```





## 动画解析 Git 命令

动画的形式能帮助更好地学习和理解git。来自 [Lydia Hallie](https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1)

平常的练习可以通过 [动画学习Git网站](https://learngitbranching.js.org/) 来学习

###  git merge

将两个或多个开发历史连接在一起

#### fast forward

Git 默认使用 fast-forward 这种类型来处理分支合并，当我们成功合并后，不会产生任何提交记录

![fast forward](https://res.cloudinary.com/practicaldev/image/fetch/s--cT4TSe48--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/894znjv4oo9agqiz4dql.gif)



#### no fast forward

在合并分支命令加入 `--no-ff` 后缀的方式运行时，便会生成一个新的提交记录（推荐多人协作开发使用）



![no fast forward](https://res.cloudinary.com/practicaldev/image/fetch/s--zRZ0x2Vc--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/rf1o2b6eduboqwkigg3w.gif)



合并产生冲突的时候可以编辑处理冲突后，再走正常的提交流程

![conflict](https://pic2.zhimg.com/v2-541bb7ef46a76b0be1f055427e7e94e1_b.webp)



 ### git rebase

改变当前分支的基座节点

![git rebase](https://res.cloudinary.com/practicaldev/image/fetch/s--EIY4OOcE--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/dwyukhq8yj2xliq4i50e.gif)



在`rebase`的过程中，也许会出现冲突(conflict)。在这种情况，Git会停止`rebase`并会让你去解决冲突；在解决完冲突后，用”`git add`“命令去更新这些内容的索引(index), 然后，你无需执行 `git commit`,只要执行:

```shell
$ git rebase --continue
```

这样git会继续应用(apply)余下的补丁。

在任何时候，可以用`--abort`参数来终止`rebase`的操作，并且”`mywork`“ 分支会回到`rebase`开始前的状态。

```shell
$ git rebase --abort
```



#### Interactive Rebase

``` bash
$ $ git rebase -i ee9ee598ea2a4bece9b23
```

交互式变基，可以在rebase过程中对改变的commit进行操作

- reword: Change the commit message

  保留该commit，但我需要修改该commit的注释（缩写:r）

- edit: Amend this commit

  保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）

- squash: Meld commit into the previous commit

  将该commit和前一个commit合并（缩写:s）

- fixup: Meld commit into the previous commit, without keeping the commit's log message

  将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）

- exec: Run a command on each commit we want to rebase

  执行shell命令（缩写:x）

- drop: Remove the commit

  我要丢弃该commit（缩写:d）



![git rebase](https://res.cloudinary.com/practicaldev/image/fetch/s--P6jr7igd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/msofpv7k6rcmpaaefscm.gif)





![gi rebase](https://res.cloudinary.com/practicaldev/image/fetch/s--VSQt4g1V--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/bc1r460xx1i0blu0lnnm.gif)



### git reset

#### git reset --mixed

默认mixed

①移动本地库HEAD指针

②重置暂存区

意思就是，回滚后，不仅移动了本地库的指针，同时暂存区的东西也没了，意思就是你上次添加到暂存区的文件没了-



#### git reset --soft

①移动本地库HEAD指针

意思就是，回滚后，仅仅是把本地库的指针移动了，而暂存区和你本地的代码是没有做任何改变的。而你上次改动已提交committed到本地库的代码显示是绿色即未提交

![git reset --soft](https://res.cloudinary.com/practicaldev/image/fetch/s---GveiZe---/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/je5240aqa5uw9d8j3ibb.gif)



#### git reset --hard

①移动本地库HEAD指针

②重置暂存区

③重置工作区

意思就是，回滚后，本地代码就是你回退版本的代码

![git reset --hard](https://res.cloudinary.com/practicaldev/image/fetch/s--GqjwnYkF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/hlh0kowt3hov1xhcku38.gif)



###  git revert

git revert 后多出一条commit ，提醒同事，这里有回撤操作，只能撤回最新的提交

git reset 直接把之前 commit 删掉，非git reset --hard的操作是不会删掉修改代码，如果远程已经有之前代码，需要强推 git push origin 【分支名】 --force



注意： 慎用revert ！！！

多人协同开发时，get revert 会影响到其他人的代码



![git revert](https://res.cloudinary.com/practicaldev/image/fetch/s--eckmvr2M--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/3kkd2ahn41zixs12xgpf.gif)



### git cherry-pick

不是合并内容，只是想把某次提交摘取过来

``` bash
$ git log --oneline --graph --all
```

![git cherry-pick](https://res.cloudinary.com/practicaldev/image/fetch/s--9vWP_K4S--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/2dkjx4yeaal10xyvj29v.gif)



### git fetch





![git fetch](https://res.cloudinary.com/practicaldev/image/fetch/s--38PuARw2--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/bulx1voegfji4vwgndh4.gif)



### git pull

虽然 `git fetch`对于获取分支的远程信息非常有用，但我们也可以执行  `git pull`。`git pull`实际上是两个命令合二为一： `git fetch`和 a `git merge`。当我们从原点拉取更改时，我们首先像使用 `git pull`一样获取所有数据`git fetch`，之后最新的更改会自动合并到本地分支中。

![git pull](https://res.cloudinary.com/practicaldev/image/fetch/s---X5AXldj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/zifpnl1h6a4tk4qdc9sy.gif) 



### git reflog

`功能`：管理 reflog 信息、

git reflog 可以查看所有分支的所有操作记录（包括commit和reset的操作、已被删除的commit记录）
git log则不能察看已经删除了的commit记录

``` bash
$ git reflog -3
$ git reflog -all
```

``` bash
$ git log --oneline -6
```



![git reflog](https://res.cloudinary.com/practicaldev/image/fetch/s--MMUdOS0P--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/1aqek1py1knwl926ele7.gif)





![git reflog](https://res.cloudinary.com/practicaldev/image/fetch/s--A1UMM2AH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/9z9rhtbw7mrigp0miijz.gif)



###  git stash

这个就是把当前开发内容藏起来

比如，现在正在开发一小块新功能（还没写完），突然线上有bug要紧急修复。这时候需要切换分支来修复，可以考虑使用 `git stash` 命令先藏起来。等到修复完bug之后再切回来。然后使用`git stash pop`将刚才没开发完的继续开发

``` bash
# 两种方式去隐藏
# 1、
$ git stash pop
# 2、
$ git stash apply stash@{1}
```



## Linus Torvalds 语录

这个可爱又暴脾气的天才，在[wikiquote](https://en.wikiquote.org/wiki/Linus_Torvalds)上收录了他的很多语录 。这里只摘取一小部分。

> Talk is cheap. Show me the code.

> If you still don’t like it, that’s OK: that’s why I’m boss. I simply know better than you do.

> Nobody actually creates perfect code the first time around, except me. But there’s only one of me.

> Really, I’m not out to destroy Microsoft. That will just be a completely unintentional side effect.

> Real quality means making sure that people are proud of the code they write, that they’re involved and taking it personally.

> Standards are paper. I use paper to wipe my butt every day. That’s how much that paper is worth.

> “Regression testing”? What’s that? If it compiles, it is good; if it boots up, it is perfect.
