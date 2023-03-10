## 算法简介

图是一种常见的数据结构和表示形式，可视化场景也经常会用到图来展现有关联关系的数据。进行图的可视化时，往往需要将其自动布局。分层布局是最常用的一种自动布局方案。下面用一个例子阐述图论的基本概念以及什么是分层布局。

### 图论

图论是数学的一个分支，它以`图`为研究对象。下面介绍一些图论的基本概念。

`图`由若干个`顶点`和`边`组成，`顶点`由`边`来连接。

若`边`有方向，则它是`有向边`，即有箭头方向，反之它是`无向边`。

若一个`图`中的`边`是`有向边`，则这个`图`是`有向图`，反之它是`无向图`。

若一个`有向图`中不存在若干个`顶点`按`边`的方向形成环路，则它是`有向无环图`。

一个`顶点`上连接的`边`数，称为该`顶点`的`度`。对于`有向图`中的`顶点`来说，由该`顶点`出发的`边`数，称为`出度`，反之称为`入度`。

下图中是两个`有向无环图`，`A`、`B`、`C`...是`顶点`，它们之间的连线是`边`。`J`的`度`为4，`出度`为1，`入度`为3。这两个`图`之间的`顶点`是一致的，并且`有向边`的指向也是一致的，那么称这两个`图`是等价的。
![](https://pan.udolphin.com/files/image/2021/10/1bdf7fb24c894f833af76023b605d62c.jpg)

### 层次布局

由上图可以发现这两个`图`的形状并不一样，换句话说各`顶点`的位置是不一样的，`边`的表现形式也是不一样的（上面的是直线、下面的是折线），但它们却是`等价`的，也就是它们表达的连接逻辑是一致的。所以一个`图`可以有无数种形状，那么哪种形状更容易被人理解它的内在逻辑呢？显然下面的`图`相比上面的`图`更有层次感、更规整。下面的`图`就是从左到右的层次布局方式。

### Sugiyama算法框架

Sugiyama算法框架是由`杉山公造（Kozo Sugiyama）`在1981年提出的一种层次布局算法框架。Sugiyama算法框架的基本思路是，先确定各`顶点`的层级，再通过调整同层中`顶点`的顺序来减少`边`的交叉个数，最后通过前两步确定的各`顶点`的层级和顺序来最终确定该`顶点`的x、y坐标。之所以称它为算法框架，是因为在整个层次布局的过程中不只使用了一个算法，而是在确定层级和减少交叉的过程中使用了多个算法，甚至于在同一个步骤中可以有多个算法互相替代。它只适用于`有向无环图`的层次布局，但对于其他更普遍的情况可以通过`减边`来把各种`图`转化为`有向无环图`从而使用该算法框架来进行层次布局。所以它自提出以来成为了最普遍的一种层次布局方案，几乎所有绘图框架库（mxGraph、GoJS等）均使用该算法来实现。

## 算法过程

Sugiyama算法框架核心步骤分为确定层级和减少交叉，最后通过前两步确定的层级和顺序来最终确定各`顶点`的x、y坐标。

### 确定层级

本步骤有多种算法来实现（`最长路径算法`、`紧致树算法`等），这里选取最简单的`最长路径算法`来实现。`最长路径算法`即一个`顶点`的层级等于要到达它需要走过的最长路径。该算法的优点是速度很快，遍历图即可完成分层。遍历图最基本的有`广度优先遍历`和`深度优先遍历`，这里选取`广度优先遍历`。

`步骤1.1`：找出`入度`为零的所有`顶点`，作为遍历的开始`顶点`。
![](https://pan.udolphin.com/files/image/2021/10/82c251367bd588dc61180d630bc40af9.jpg)
`步骤1.2`：由这些`顶点`开始，按`边`的方向遍历下层`顶点`，当被遍历到的`顶点`的`出度`为零时，这便是一条路径。当`图`中所有`顶点`均被遍历过以后，终止本步骤。这样可以遍历出5条路径：A->F->K、A->I->K、B->E->J->K、A->C->G->J->K、B->D->H->J->K。
![](https://pan.udolphin.com/files/image/2021/10/c5e59f924aea080f9f26e0b6c860e8ee.gif)
`步骤1.3`：在这5条路径中，各`顶点`可能会处于不同的路径深度上，选取最大的路径深度作为该`顶点`的层级数。例如，`A`的层级深度有0，那么`A`的层级为0，`K`的层级深度有2、3、4，那么`K`的层级为4。这样就确定了各层级的`顶点`，第0层有`A`、`B`，第1层有`F`、`I`、`E`、`C`、`D`，第2层有`G`、`H`，第3层有`J`，第4层有`K`。
![](https://pan.udolphin.com/files/image/2021/10/21d52b692e1dcd95c0febf33afc2aa96.jpg)![](https://pan.udolphin.com/files/image/2021/10/7d3c8af166c5f1274d0a01d95714eae3.jpg)![](https://pan.udolphin.com/files/image/2021/10/1bdf7fb24c894f833af76023b605d62c.jpg)

### 减少交叉

确定各`顶点`的层级后，需要调整同层内的`顶点`的先后顺序，以达到`边`的交叉数最少。如何做到这一点，最简单的会想到穷举法，即在各层内排列组合各`顶点`顺序，穷举出交叉数最少的那种顺序。这是一种寻找`全局最优解`的方法。显然这种方法在时间复杂度上是不可接受的，即便对于不太复杂的`图`想穷举出最好的那种情况，也会让计算机算上上万年。

那么我们要转换思路，从寻找`全局最优解`转而寻找`局部最优解`，即我们不需要找到最好的情况，可以找到相对比较好的情况当成最终的解。对于寻找`局部最优解`，有很多被称为`启发式`的算法被提出，比如`质心平衡法`、`中心法`等。这一类的算法都可被视为`爬山算法`的一种。`爬山算法`是一种简单的贪心搜索算法，该算法每次从当前解的临近解空间中选择一个最优解作为当前解，直到达到一个`局部最优解`。爬山算法实现很简单，其主要缺点是会陷入`局部最优解`，而不一定能搜索到`全局最优解`。但好处是算法时间上是有保证的，我们可以尝试有限次数的`爬山算法`，从这些`局部最优解`中选取一个最好的。

`步骤2.1`：对于有跨层指向的`顶点`，需要在被指向`顶点`前逐层放置该`顶点`的替身`顶点`。比如F->K，需要在K前放置K'和K''，以形成新的路径F->K'->K''->K。
![](https://pan.udolphin.com/files/image/2021/10/d62f744a8d4decbdc57accbb8de0619d.jpg)![](https://pan.udolphin.com/files/image/2021/10/b0c83ba1103fe28c38a1df8fd81900d3.jpg)
`步骤2.2`：随机打乱同层内各`顶点`顺序。在这种初始顺序下，交叉数为11。
![](https://pan.udolphin.com/files/image/2021/10/71496217598475c269d181f089c64d5c.jpg)
`步骤2.3`：逐层调整层内`顶点`顺序。这里选取`质心平衡法`。
`步骤2.3.1`：计算层内各`顶点`的重心分数。重心分数是与该`顶点`连接的`顶点`平均顺序值。比如，与`B`连接的`顶点`有`D`、`E`，它们的顺序值是0、4，那么`B`的平均顺序值是(0+4)/2=2。
![](https://pan.udolphin.com/files/image/2021/10/92ab5139f04a5ba3f2b221bad6f4427c.jpg)
`步骤2.3.2`：对层内各`顶点`按平均顺序值从小到大排序，来调整该层内`顶点`顺序（其他各层内`顶点`顺序不变）。
![](https://pan.udolphin.com/files/image/2021/10/165d52778aa20a6f9f36ffcdbcc8354c.jpg)![](https://pan.udolphin.com/files/image/2021/10/ea5d7177eeadeeeaaed969b24c791114.jpg)
`步骤2.4`：按`步骤2.3`逐层调整完顺序后，计算当前情况下交叉数。若交叉数为零，表示找到了`全局最优解`，即当前情况没有任何`边`的交叉，便可以使用当前`顶点`顺序作为最终结果，终止迭代；反之，若交叉数小于上次迭代后的交叉数，则使用当前`顶点`顺序作为临时的`局部最优解`，继续迭代，反之，使用上次迭代后的`顶点`顺序作为最终结果，终止迭代。
![](https://pan.udolphin.com/files/image/2021/10/3353185c71d25645a7e69297df5f7c45.gif)
`步骤2.5`：去掉替身`顶点`。
![](https://pan.udolphin.com/files/image/2021/10/346bc4f3c948f62638786082882b72e1.jpg)![](https://pan.udolphin.com/files/image/2021/10/7bc48ac7052aeefa461137b3de2dee87.jpg)

### 确定坐标

通过前两个步骤，各`顶点`有了`所在层级`、`层内顺序`这两个属性。通过这两个属性我们可以按照一定的顺序来逐步确定`顶点`的坐标。

在水平层次布局中，`所在层级`用来确定x坐标，`层内顺序`用来确定y坐标。

在垂直层次布局中，`所在层级`用来确定y坐标，`层内顺序`用来确定x坐标。

在扇形层次布局中，`所在层级`用来确定极坐标的半径，`层内顺序`用来确定极坐标的弧度。然后再把极坐标转换为对应的笛卡尔坐标系下的x、y。