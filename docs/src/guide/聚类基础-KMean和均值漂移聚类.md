## 聚类

`聚类`是`机器学习`中一类基础算法。借用百度百科的定义：将物理或抽象`对象`的`集合`分成由类似的对象组成的多个`类`的过程被称为`聚类`。由聚类所生成的`簇`是一组数据对象的集合，这些对象与同一个簇中的对象彼此相似，与其他簇中的对象相异。

典型问题：把一堆二维点集，按聚集程度区分为若干子集。在下图例子中，这些点被分成了四堆。

![](https://pan.udolphin.com/files/image/2022/1/e196d8da9d17c3b91e116df3ef2cd337.jpg)

![](https://pan.udolphin.com/files/image/2022/1/4b2d6c415b4eb0f48c39dfb17469d24f.jpg)

## K-Mean算法

那么如何设计一个算法让计算机来做到`分堆`呢？本章介绍最基础、最简单的`K-Mean算法`。

### 算法过程

步骤1：假设上图中的点大概可以被分为4堆，那么我们首先确定了类数，在上图中放入4个`种子点(seed)`，它们的坐标是随机的。

![](https://pan.udolphin.com/files/image/2022/1/32bc9e72b28c12ca6cfc0babd812db72.jpg)

步骤2：对于每个`样本点`来说，计算它到这4个`种子点`的`距离`（这里选取`欧几里得距离`，即根号下(x0-x1)平方+(y0-y1)平方），那么`样本点`属于离它最近的`种子点`。

![](https://pan.udolphin.com/files/image/2022/1/1d601b0ee6fbbe5e197532929c5e7087.jpg)

步骤3：对于每个`种子点`来说，移动它到属于它的`样本点`集合的重心处（样本点x和y的均值）。

![](https://pan.udolphin.com/files/image/2022/1/44119ed3c34060ab085219e8fead590e.jpg)

步骤4：重复步骤2和步骤3，直到`种子点`几乎不再移动（设置一个较小的阈值作为迭代终止条件）。最后各`种子点`下属的`样本点子集`，即为区分出的若干类。

![](https://pan.udolphin.com/files/image/2022/1/5b103f6deeda4ef45e808f1ca455d979.gif)

### 算法缺陷

从算法过程中，我们能看出使用`K-Mean算法`需要预先知道总类数，这样才能确定`种子点`的数量，如果样本数据与预想的总类数之间有出入，会造成“多个子类被聚成一类”或者“本来是一类样本却被分成若干子类”这样的问题。

![](https://pan.udolphin.com/files/image/2022/1/6da025478f21a44c97813bf25092913b.gif)

![](https://pan.udolphin.com/files/image/2022/1/cee654b5b04f607998a721349366680a.gif)

## 均值漂移聚类

针对K-Mean算法的缺陷，本章介绍`均值漂移聚类算法`。该算法不需要预先知道类的数量，会通过样本数据本身的特征计算出类的数量。

### 算法过程

步骤1：绘制一定半径的圆作为`窗口`覆盖若干个`样本点`，在图上绘制若干个`窗口`覆盖所有`样本点`。

![](https://pan.udolphin.com/files/image/2022/1/e39423dab228f9162850b9974a73bec4.jpg)

![](https://pan.udolphin.com/files/image/2022/1/dc7482af942393e3a4cec253c527e36d.jpg)

![](https://pan.udolphin.com/files/image/2022/1/60b35a790b447f7faa1c990d264e1e5f.jpg)

步骤2：对于每个`窗口`来说，圆心坐标设置为它覆盖的`样本点集`的重心，若新覆盖的`样本点`数量多于上次覆盖数量，重复这个操作，反之停止移动该窗口。直到所有`窗口`停止移动，结束该步骤。本步骤本质上是让每个`窗口`朝着覆盖`样本点密度`高的方向移动。

![](https://pan.udolphin.com/files/image/2022/1/60b35a790b447f7faa1c990d264e1e5f.jpg)

![](https://pan.udolphin.com/files/image/2022/1/f87b4d2c68394e3be74b7e88b3232d12.jpg)

![](https://pan.udolphin.com/files/image/2022/1/92ed5bb173fdcb7fc95ff3383300f832.jpg)

![](https://pan.udolphin.com/files/image/2022/1/4c9a8cba8097e64e1ed75b7b1d04fe8b.jpg)

...

![](https://pan.udolphin.com/files/image/2022/1/a04a07037bf20210e637d7b7d3591e9c.jpg)

步骤3：在所有`样本点`中，找到某个`样本点`被最多的`窗口`覆盖。在覆盖该`样本点`的`窗口`中，找到某个`窗口`覆盖的`样本点`最多，该`窗口`作为这些`窗口`的`主窗口`，同时删除`其他窗口`。重复该步骤，直到只剩下`主窗口`。

![](https://pan.udolphin.com/files/image/2022/1/1823952d590508b935bc6aa979dde5e8.jpg)

![](https://pan.udolphin.com/files/image/2022/1/6993b29d3dfc5e27a0d6005b619477a6.jpg)

...

![](https://pan.udolphin.com/files/image/2022/1/f627051856b307b4a3ab52c3c518b474.jpg)

![](https://pan.udolphin.com/files/image/2022/1/4f9d02e3602a84dc5ff581a9a9bc3677.jpg)

步骤4：以`主窗口`的圆心作为`种子点`，使用`K-Mean算法`，最终对`样本点`分堆。

![](https://pan.udolphin.com/files/image/2022/1/fac5dca92d1a9bd12e2902c249eedc6a.gif)

### 改良

`均值漂移聚类算法`是在`K-Mean算法`的基础上，使用`窗口漂移`的方式来决定`种子点`的个数和初始位置。这样做到了用样本数据本身的特征来决定类的数量，使聚类效果更佳精准。

## 实际应用

`聚类`作为机器学习领域中最基本的一类算法，广泛应用于`推荐系统`（电商的商品推荐、听歌平台的歌曲推荐。。。各种对象的推荐）中。

这里举一个`CMDB`中的真实例子。传统CMDB中的`CI（孪生体）`往往是靠运维人员手工维护的，它的弊端有更新不及时、维护数据错误等。人们思考是否有不依赖人工的方式来保证CI的准确性，一个简单的逻辑被提出来，线上运行的系统会产生大量日志，这些日志一定反应当前系统或环境的真实情况，所以这些日志一定隐含着当前CI的真实信息，那么是否可以从这些日志中提取隐含的信息来维护CI数据，从而保证CMDB数据的及时性和准确性。

下面我们来回答上面的问题。先思考日志是长什么样的，日志一定包含`常量`部分（如`|net_device.dev_name`、`|net_device.dc_name`、`|net_device.in_ip`等）和`变量`部分（如`XXX-X1X1-YYY2-ZZ01`、`哈哈区域`、`11.2.33.4`等）。常量一般没什么实际意义，变量往往包含了CI属性的一些信息，那么如何从日志中提取变量信息是一个突破点。

```
859		XXX-X1X1-YYY2-ZZ01|net_device.dev_name	哈哈区域|net_device.dc_name	XXX-Y1Y1|net_device.room	99.8.77.6|net_device.in_ip
1718	PPP-Q1Q3-RRR-SS05|net_device.dev_name	PPP-Q1Q|net_device.room
2147	AAA-B1B3-CCC-DD04|net_device.dev_name	AAA-B1B|net_device.room
2577	EEE-F1F2-GGG2-GG02|net_device.dev_name	哈哈区域|net_device.dc_name	EEE-F1F2|net_device.room	11.2.33.4|net_device.in_ip
3006	HHH-I1I2-JJJ2-KK02|net_device.dev_name	哈哈区域|net_device.dc_name	HHH-I1I2|net_device.room	55.6.77.8|net_device.in_ip
3435	LLL-M3-NNN-OO01|net_device.dev_name		嘿嘿区域|net_device.dc_name	LLL-M3|net_device.room	55.44.33.2|net_device.in_ip
...

日志中敏感信息已被涂鸦
```

想要取得变量信息，我们需要把同类型的日志放到一起才能找出规律。这一步操作便用到了本文介绍的`聚类算法`。

```
类型1
859		XXX-X1X1-YYY2-ZZ01|net_device.dev_name	哈哈区域|net_device.dc_name	XXX-Y1Y1|net_device.room	99.8.77.6|net_device.in_ip
2577	EEE-F1F2-GGG2-GG02|net_device.dev_name	哈哈区域|net_device.dc_name	EEE-F1F2|net_device.room	11.2.33.4|net_device.in_ip
3006	HHH-I1I2-JJJ2-KK02|net_device.dev_name	哈哈区域|net_device.dc_name	HHH-I1I2|net_device.room	55.6.77.8|net_device.in_ip
3435	LLL-M3-NNN-OO01|net_device.dev_name		嘿嘿区域|net_device.dc_name	LLL-M3|net_device.room	55.44.33.2|net_device.in_ip

类型2
1718	PPP-Q1Q3-RRR-SS05|net_device.dev_name	PPP-Q1Q|net_device.room
2147	AAA-B1B3-CCC-DD04|net_device.dev_name	AAA-B1B|net_device.room

...

类型N
```

对于某类日志，我们只需要通过日志数据本身反推出对应的正则表达式。这一步可以使用[《序列比对-Smith–Waterman算法》](https://wiki.uino.com/d/614db4310f0474bf5e735068.html)文章中介绍的算法完成。

最后，把各类日志的正则表达式适用到各类日志数据本身，便可以提取出真实有效的CI属性信息了。