# css网格简介

CSS 网格布局（又名“网格”或“CSS 网格”），是一个基于栅格的二维布局系统，旨在彻底改变基于网格用户界面的设计。CSS 一直以来并没有把布局做的足够好。刚开始，我们使用 `table` ，后来是 `float, position` 和 `inline-block` ，这些本质上是一些 [`hacks`](https://baike.baidu.com/item/css%20hack/7026361?fr=aladdin) ,而且许多重要功能尚未解决（例如垂直居中）。虽然[flex 弹性布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)可以做到这些，但是flex布局实际上是一维布局，而grid布局是二维的，它远比flex布局要强大。以下是grid布局的浏览器兼容性，支持`Chrome57+`、`Edge16+`、`Firefox52+`、`Safari10.1+`等

兼容性

![](https://pan.udolphin.com/files/image/2022/10/c40f80840379d194cbcf4b46d361fadc.png)

下面这张图体现的更直观清晰：

![](https://pan.udolphin.com/files/image/2022/10/85316810c7cf54bfd021437c3a8423eb.png)

# 概述

网格布局（grid）是最强大的 CSS 布局方案之一。

它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。

# 基本概念

## 容器与项目

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。

```

<div class="container">
  <div class="item item-1">
    <p class="sub-item"></p>
  </div>
  <div class="item item-2"> </div>
  <div class="item item-3"> </div>
</div>
```

上面代码中，最外层的`<div>`元素就是容器，第二层的三个`<div>`元素就是项目。

**注意**：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的`<p>`元素就不是项目。grid 布局只对项目生效。

![](https://pan.udolphin.com/files/image/2022/10/7918c9574cd9472e5d9d29e327289b92.png)

图1

## 关键点（见图1）

**容器：** 需通过`display：grid`设置为grid容器,容器中包含所有item  
**行：** 容器里面的水平区域称为"行"（row），横向为行，对应颜色块123  
**行距：** 上下两个item的间距为行距  
**列：** 垂直区域称为"列"（column），纵向为列，对应颜色块147  
**列距：** 左右两个item的间距为列距  
**项目：（item（子元素））：** 也就是上图对应的123456789颜色块  
**边：** 每个item共有 上 下 左 右 四条边

## **网格线**

#### 构成网格结构的分割线。它们可以是垂直的（“列网格线”）或水平的（“行网格线”），并且位于行或列的任一侧。这里的黄线是列网格线的示例（见图2箭头指向的数字1）。

正常情况下，`n`行有`n + 1`根水平网格线，`m`列有`m + 1`根垂直网格线，比如一行就有两根水平网格线。

一般而言，是从左到右，从上到下，1，2，3，4... 进行编号排序。当然也可以从右到左，从下到上，按照 -1，-2，-3...顺序进行编号排序（以图3为例）

![](https://pan.udolphin.com/files/image/2022/10/04d6adfabe741f09f8ecf21ff520a63e.png)

图3

但是可以选择明确命名这些行。注意行名的括号语法(见图4)：

```
.container {
  grid-template-columns: [first] 40px [line2] auto [line3] 50px [line4];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] 100px [last-line];
}
```

![](https://pan.udolphin.com/files/image/2022/10/842a0b1e3d577da2879e4a0b784b834f.png)

图4

请注意，一行可以有多个名称。例如，这里的第二行将有两个名称：row1-end 和 row2-start：

```
 .container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 100px [third-line] 100px [last-line];
}
```

如果定义包含重复部分，可以使用`repeat()`符号来简化事情：

**repeat() 函数**：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。

```
.container {
  grid-template-columns: repeat(3, 100px [col-start]);
}
```

这相当于：

```
.container {
  grid-template-columns: 100px [col-start] 100px [col-start] 100px [col-start];
}
```

如果多行共享相同的名称，则可以通过行名和行数来引用它们。

```
.item {
  grid-column-start: col-start 2;
}
```

该`fr`单元允许将轨道的大小设置为网格容器可用空间的一小部分。例如，这会将每个项目设置为网格容器宽度的三分之一：

```
.container {
  grid-template-columns: 1fr 1fr 1fr;
}
```

![](https://pan.udolphin.com/files/image/2022/10/a8467eb295023b9a103f41b1e344af90.png)

可用空间是在任何非灵活项*之后计算的。*在此示例中，单元可用的可用空间总量`fr`不包括 50 像素：

```
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

![](https://pan.udolphin.com/files/image/2022/10/9752665755af11aa2faa1f2503052961.png)

## **网格单元（单元格）**

两个相邻行和两个相邻列网格线之间的空间。它是网格的一个“单元”。这是行网格线 1 和 2 以及列网格线 3 和 4 之间的网格单元（见图2箭头指向的数字2）。

行和列的交叉区域，称为"单元格"（cell）。

正常情况下，`n`行和`m`列会产生`n x m`个单元格。比如，2行4列会产生8个单元格（见图2）。

## **网格轨道**

两条相邻网格线之间的空间。您可以将它们视为网格的列或行。这是第二行和第三行网格线之间的网格轨迹（见图2箭头指向的数字3）。

## **网格区域**

由四条网格线包围的总空间。一个网格区域可以由任意数量的网格单元组成。这是行网格线 1 和 3 以及列网格线 3 和 5 之间的网格区域（见图2箭头指向的数字4）。

![](https://pan.udolphin.com/files/image/2022/10/00a4857a11a92efd0a2d5161862a2463.png)

图2

## display

* **display属性规定是否/如何显示元素。我们需要使用grid布局，就要把容器设置为grid或者inline-grid**
* `**grid**`– 生成块级网格
* `**inline-grid**`– 生成内联级网格

```
.container {
  display: grid | inline-grid;
}
```

效果对比

display:grid;

![](https://pan.udolphin.com/files/image/2022/10/e8efae041d85fa460426db4ec1140500.png)

display:inline-grid;

![](https://pan.udolphin.com/files/image/2022/10/0bd6ac286c5e27636cc78625bb0d3211.png)

## 容器属性

grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。这部分先介绍容器属性。

![](https://pan.udolphin.com/files/image/2022/10/484d64929ea44fe81a11e59c6d4b7932.png)

## 项目属性

下面这些属性定义在项目上面。

![](https://pan.udolphin.com/files/image/2022/10/d22c13314543b3abc3acaff91d4a1000.png)

**下面让我们再用表格表示一下这些属性吧**

## grid相关属性

|属性名|属性说明|可选值|
|---|---|---|
|**display**|属性规定是否/如何显示元素|
|**grid-template-columns**|定义每一列的列宽（这里可以定义网格线名称）|
|**grid-template-rows**|定义每一列的行高|
|**grid-template-areas**|划分指定区域，一个区域由单个或多个单元格组成|
|**grid-template**|属性是`grid-template-columns`、`grid-template-rows`和`grid-template-areas`这三个属性的合并简写形式|
|**grid-row-gap**|定义行与行的间距|
|**grid-column-gap**|定义列与列间距|
|**grid-gap**|定义行和列的间距|
|**grid-auto-flow**|设置放置顺序|`默认:row`、`column`、`row dense`、`column dense`|
|**justify-items**|属性设置单元格内容的水平位置|`start`、`end`、`center`、 `stretch`|
|**align-items**|属性设置单元格内容的垂直位置|`start`、`end`、`center`、 `stretch`|
|**place-items**|属性是`align-items`属性和`justify-items`属性的合并简写形式。若省略第二个值，则认为第二个值等于第一个值|`start`、`end`、`center`、 `stretch`|
|**justify-content**|属性设置grid容器内容的水平位置|`start`、`end`、`center`、 `stretch`、`space-around`、`space-between`、`space-evenly`|
|**align-content**|属性设置grid容器内容的垂直位置 `start`、`end`、`center`、 `stretch`、`space-around`、`space-between`、`space-evenly`|
|**place-content**|属性是`align-content`属性和`justify-content`属性的合并简写形式。若省略第二个值，则认为第二个值等于第一个值|`start`、`end`、`center`、 `stretch`、`space-around`、`space-between`、`space-evenly`|
|**grid-auto-columns**|设置多余列的列宽|
|**grid-auto-rows**|设置多余行的行高|
|**grid**|属性是`grid-template-rows`、`grid-template-columns`、`grid-template-areas`、`grid-auto-rows`、`grid-auto-columns`、`grid-auto-flow`这六个属性的合并简写形式。|

## grid-item相关属性（这是写在子元素的属性）

|属性名|属性说明|可选值|
|---|---|---|
|**grid-column-start**|设置子元素位置的左边框所在的垂直网格线|
|**grid-column-end**|设置子元素位置的右边框所在的垂直网格线|
|**grid-row-start**|设置子元素位置的上边框所在的水平网格线|
|**grid-row-end**|设置子元素位置的下边框所在的水平网格线|
|**grid-column**|`grid-column-start` 和 `grid-column-end` 的简写|
|**grid-row**|`grid-row-start` 和 `grid-row-end` 的简写|
|**justify-self**|属性设置单元格内容的水平位置（左中右）|`start`、`end`、`center`、 `stretch`、|
|**align-self**|属性设置单元格内容的垂直位置|`start`、`end`、`center`、 `stretch`、|
|**place-self**|属性是`align-self`属性和`justify-self`属性的合并简写形式。（忽略第二个值，则认为第二个值等于第一个值）|
|**grid-area**|属性指定子元素放在哪一个区域|

## grid相关函数

|属性名|属性说明|例子|例子说明|
|---|---|---|---|
|**repeat()**|设置重复的值|
|**minmax()**|函数产生一个长度范围，不小于参数1，不大于参数2|grid-template-columns: 1fr minmax(100px, 1fr);|`minmax(100px, 1fr)`表示列宽不小于`100px`，不大于`1fr`|

## grid相关函数可使用的关键字

|属性名|属性说明|例子|例子说明|
|---|---|---|---|
|**auto-fill**|自动填充|grid-template-columns: repeat(auto-fill, 100px);|以100px的宽度一列填充容器，可自动换行|
|**fr**|比例属性，根据比例分配宽高|grid-template-columns: 2fr 8fr;|（2+8=10） 第一列2/10（20%），第二列8/10（80%）|
|**auto**|自适应宽度|grid-template-columns: 100px auto 100px;|左右宽度100px，中间宽度自适应|

# grid 实战——实现响应式布局

## fr 实现等分响应式

`fr` 等分单位，可以将容器的可用空间分成想要的多个等分空间。利用这个特性，我们能够轻易实现一个等分响应式。`grid-template-columns: 1fr 1fr 1fr` 表示容器分为三等分

```
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/b5597702ae39f07f5bf5a083b9c44b75.gif)

## repeat + auto-fit——固定列宽，改变列数量

等分布局并不只有 `grid` 布局才有，像 `flex` 布局也能轻松实现，接下来看看更高级的响应式

上面例子的始终都是三列的，但是需求往往希望我们的网格能够固定列宽，并根据容器的宽度来改变列的数量。这个时候，我们可以用到上面提到 `repeat()` 函数以及 `auto-fit` 关键字。`grid-template-columns: repeat(auto-fit, 200px)` 表示固定列宽为 200px，数量是自适应的，只要容纳得下，就会往上排列，代码以及效果实现如下：

```
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/fe18c809e8dbb0d6320b7790c15c2ea3.gif)

## repeat+auto-fit+minmax 去掉右侧空白

上面看到的效果中，右侧通常会留下空白，这是我们不希望看到的。如果列的宽度也能在某个范围内自适应就好了。`minmax()` 函数就帮助我们做到了这点。将 `grid-template-columns: repeat(auto-fit, 200px)` 改成 `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` 表示列宽至少 200px，如果还有空余则一起等分。代码以及效果如下所示：

```
.wrapper {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/1b619fa8ac0930aded0da821100e8945.gif)

## repeat+auto-fit+minmax-span-dense 解决空缺问题

似乎一切进行得很顺利，但是某天 UI 来说，每个网格元素的长度可能不相同，这也简单，通过 `span` 关键字进行设置网格项目的跨度，`grid-column-start: span 3`，表示这个网格项目跨度为 3。具体的代码与效果如下所示：

```
.item-3 {
  grid-column-start: span 3;
}
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/e853afeb57a44ac9dde8043efa8404f7.gif)

不对，怎么右侧又有空白了？原来是有一些长度太长了，放不下，这个时候就到我们的 `dense` 关键字出场了。`grid-auto-flow: row dense` 表示尽可能填充，而不留空白，代码以及效果如下所示：

```
.wrapper, .wrapper-1 {
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 20px;
  grid-auto-rows: 50px;
}
.wrapper-1 {
  grid-auto-flow: row dense;
}
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/5a763e890294a565b11d8bb8200541c2.gif)

# 只要一行grid代码，实现五种 css 经典布局

## 空间居中布局

空间居中布局指的是，不管容器的大小，项目总是占据中心点。

一行代码为：

```
 place-items: center;
```

样式代码如下

```
// 空间居中布局
// place-items: <align-items> <justify-items>;
.wrapper {
  display: grid;
  // 居中
  place-items: center;
  // 左上
  // place-items: start;
  // 右下
  // place-items: end;
  background: lightblue;
  width: 500px;
  height: 500px;

  .child {
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid red;
    background: lightpink;
    font-size: 2rem;
    text-align: center;
  }
}
```

结构代码

```
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <link rel="stylesheet" type="text/css" href="<%= cdn_css %>/css/index/index2.css" />
</head>

<body>
  <div class="wrapper">
    <div class="child">😊</div>
  </div>
</body>

</html>
```

效果：

![](https://pan.udolphin.com/files/image/2022/10/63a230a0b100765293bba37d0bfa9e30.png)

## 两栏式布局

两栏式布局就是一个边栏，一个主栏。

下面的实现是，边栏始终存在，主栏根据设备宽度，变宽或者变窄。

一行代码为：

```

grid-template-columns: minmax(150px, 25%) 1fr;
```

上面代码中，`grid-template-columns`指定页面分成两列。第一列的宽度是`minmax(150px, 25%)`，即最小宽度为`150px`>，最大宽度为总宽度的25%；第二列为`1fr`，即所有剩余宽度。

效果：

样式代码

```
// 两栏式布局
.wrapper {
  display: grid;
  grid-template-columns: minmax(150px, 25%) 1fr;
  grid-template-rows: 500px;

  .child {
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid red;
    background: lightpink;
    font-size: 2rem;
    text-align: center;
  }

  .child1 {
    background-color: orchid;
  }
}
```

结构代码

```
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <link rel="stylesheet" type="text/css" href="<%= cdn_css %>/css/index/index2.css" />
</head>

<body>

  <div class="wrapper">
    <div class="child">边栏</div>
    <div class="child child1">主栏</div>
  </div>
</body>

</html>
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/a1ce13847f934a0ca44721516a64b253.gif)

## 三明治布局

三明治布局指的是，页面在垂直方向上，分成三部分：页眉、内容区、页脚。

这个布局会根据设备宽度，自动适应，并且不管内容区有多少内容，页脚始终在容器底部（粘性页脚）。也就是说，这个布局总是会占满整个页面高度。

![](https://pan.udolphin.com/files/image/2022/10/c6b51dfa04987e34d3cee1cb2256573f.png)  
一行代码

```
 grid-template-rows: auto 1fr auto;
```

上面代码写在容器上面，指定采用 grid 布局。核心代码是`grid-template-rows`那一行，指定垂直高度怎么划分，这里是从上到下分成三部分。第一部分（页眉）和第三部分（页脚）的高度都为`auto`，即本来的内容高度；第二部分（内容区）的高度为`1fr`，即剩余的所有高度，这可以保证页脚始终在容器的底部。

![](https://pan.udolphin.com/files/image/2022/10/8d56f9086dc09525126821791ad641c2.png)

样式代码

```
// 三明治布局 
.wrapper {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr auto;

  h1 {
    padding: 2rem;
  }

  header {
    background: lightpink;

  }

  main {
    background: coral;
  }

  footer {
    background: wheat;
  }
}
```

结构代码

```
    <!-- 三明治布局 -->
    <div class="wrapper">
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <h1>Main</h1>
      </main>
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
```

效果如下

![](https://pan.udolphin.com/files/image/2022/10/e8c290da340bacb75fcd0f13da572a7b.gif)

## 圣杯布局

圣杯布局是最常用的布局，所以被比喻为圣杯。它将页面分成五个部分，除了页眉和页脚，内容区分成左边栏、主栏、右边栏。

一行代码

```
grid-template: auto 1fr auto / auto 1fr auto;
```

上面代码要写在容器上面，指定采用 grid 布局。核心代码是`grid-template`属性那一行，它是两个属性`grid-template-rows`（垂直方向）和`grid-template-columns`（水平方向）的简写形式。

![](https://pan.udolphin.com/files/image/2022/10/0ebe2602f401058ae09319fbae7de0e4.png)

这里的实现是，不管页面宽度，内容区始终分成三栏。如果宽度太窄，主栏和右边栏会看不到。

![](https://pan.udolphin.com/files/image/2022/10/47840b6656b9d324aa8d5a84bae14154.png)

`grid-template-rows`和`grid-template-columns`都是`auto 1fr auto`，就表示页面在垂直方向和水平方向上，都分成三个部分。第一部分（页眉和左边栏）和第三部分（页脚和右边栏）都是本来的内容高度（或宽度），第二部分（内容区和主栏）占满剩余的高度（或宽度）。

样式代码

```
// 圣杯布局
.wrapper {
  display: grid;
  height: 100vh;
  grid-template: auto 1fr auto / auto 1fr auto;

  header {
    background: lightpink;
    padding: 2rem;
    grid-column: 1 / 4;
  }

  .left-sidebar {
    background: lightblue;
    grid-column: 1 / 2;
  }

  main {
    background: coral;
    grid-column: 2 / 3;
  }

  .right-sidebar {
    background: yellow;
    grid-column: 3 / 4;
  }

  footer {
    background: wheat;
    padding: 2rem;
    text-align: center;
    grid-column: 1 / 4;
  }

  .left-sidebar,
  .right-sidebar,
  main {
    padding: 1rem;
  }
}
```

结构代码

```
    <!-- 圣杯布局 -->
    <div class="wrapper">
      <header>
        <h1>Header</h1>
      </header>
      <div class="left-sidebar">Left Sidebar</div>
      <main>Main</main>
      <div class="right-sidebar">Right Sidebar</div>
      <footer>Footer</footer>
    </div>
```

动图效果如下

![](https://pan.udolphin.com/files/image/2022/10/af24137ce5e2f61fe6022252ede3d4ba.gif)

# grid布局制作3D骰子

## 1.实现筛子的基本结构样式

根据日常观察骰子，先来定义骰子六个面及每个面上的点的结构

```
    <div class="dice-box">
      <div class="dice first-face">
        <span class="dot"></span>
      </div>
      <div class="dice second-face">
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="dice third-face">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="dice fourth-face">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="fifth-face dice">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="dice sixth-face">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
```

骰子每个面其实可以想象成一个 3 x 3 的网格，其中每个单元格代表一个点的位置：

> +---+---+---+  
> | a | b | c |  
> +---+---+---+  
> | d | e | f |  
> +---+---+---+  
> | g | h | i |  
> +---+---+---+

要创建一个 3 x 3 的网格，只需要设置一个容器元素，并且设置三个大小相同的行和列：

```
.dice {
 display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}
```

![](https://pan.udolphin.com/files/image/2022/10/4950364708bdc9a7c1e68496af273cdf.png)

经过分析布局不是单元格上的每个点都能用到，把不用的点的位置用.代替

> +---+---+---+  
> | a | . | c |  
> +---+---+---+  
> | d | e | f |  
> +---+---+---+  
> | g | . | i |  
> +---+---+---+

我们可以使用grid-template-areas属性将此布局转换为 CSS：

```
grid-template-areas:
    "a . c"
    "d e f"
    "g . i";
```

因此，我们可以不使用传统的单位来调整行和列的大小，而只需使用名称来引用每个单元格。其语法本身提供了网格结构的可视化，名称由网格项的网格区域属性定义。中间列中的点表示一个空单元格。

下面来使用grid-area属性为网格项命名，然后，网格模板可以通过其名称引用该项目，以将其放置在网格中的特定区域中。:nth-child()伪选择器允许单独定位每个点。

```
.dot:nth-child(1) {
  grid-area: a;
}

.dot:nth-child(2) {
  grid-area: i;
  
}

.dot:nth-child(3) {
  grid-area: c;
}

.dot:nth-child(4) {
  grid-area: g;
  
}

.dot:nth-child(5) {
  grid-area: d;
  
}

.dot:nth-child(6) {
  grid-area: f;
}
```

现在六个面的样式如下：

![](https://pan.udolphin.com/files/image/2022/10/a5ce821419aef4d7ab1d6d0a5f020b4f.png)

可以看到，1、3、5的布局仍然是不正确的，只需要重新定位每个骰子的最后一个点即可：

```
.dot:nth-child(odd):last-child {
  //奇数行的最后一个元素
  grid-area: e;

}
```

这时所有点的位置都正确了：

为了更明显，把最后摆正的点用黄色填充背景

![](https://pan.udolphin.com/files/image/2022/10/c7a2877932b3ccfdd0c1da979bad99c1.png)

然后下面为每个面和点的基本样式

```

.dice {
  width: 200px;
  height: 200px;
  padding: 20px;
  background-color: lightskyblue;
  box-sizing: border-box;
  opacity: 0.7;
 
 display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-template-areas:
    "a . c"
    "d e f"
    "g . i";

}

.dot {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}
.dot:nth-child(1) {
  grid-area: a;
}

.dot:nth-child(2) {
  grid-area: i;
  
}

.dot:nth-child(3) {
  grid-area: c;
}

.dot:nth-child(4) {
  grid-area: g;
  
}

.dot:nth-child(5) {
  grid-area: d;
  
}

.dot:nth-child(6) {
  grid-area: f;
}
```

## **​2. 实现 3d 骰子**

上面我们使用了grid 布局实现了骰子的六个面，下面来这将六个面组合成一个正方体。

首先对六个面进行一些样式修改：

```
.dice {
  width: 200px; 
  height: 200px; 
  padding: 20px;
  box-sizing: border-box;
  opacity: 0.7;
  background-color: lightskyblue;
  position: absolute;
}
```

定义它们的父元素：

```
.dice-box {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(185deg) rotateX(150deg) rotateZ(315deg);
}
```

其中，transform-style: preserve-3d;表示所有子元素在3D空间中呈现。这里的transform 的角度不重要，主要是便于后面查看。

此时效果为：

![](https://pan.udolphin.com/files/image/2022/10/f14de8ff4e730ed92b48cfea6653e987.png)

看起来有点奇怪，所有面都叠加在一起。不要急，我们来一个个调整位置。

首先将第一个面在 Z 轴移动 100px：

```
  .first-face {
  transform: translateZ(100px);
}
```

第一面就到了所有面的上方：

![](https://pan.udolphin.com/files/image/2022/10/01e98c02da489e78f291aa4b2cfb8925.png)

因为每个面的宽高都是 200px，所以将第六面沿 Z 轴向下调整 100px：

```
.sixth-face {
  transform: translateZ(-100px);
}
```

第六面就到了所有面的下方：

![](https://pan.udolphin.com/files/image/2022/10/db76282abf9087626d62354063d271cf.png)

下面来调整第二面，将其在X轴向后移动 100px，并沿着 Y 轴旋转 -90 度：

```

.second-face {
  transform: translateX(-100px) rotateY(-90deg);
}
```

此时六个面是这样的：

![](https://pan.udolphin.com/files/image/2022/10/2e37d2b94e9396b1f0d9b2314cdb5488.png)  
下面来调整第二面的对面：第五面，将其沿 X 轴的正方向移动 100px，并沿着 Y 轴方向选择 90 度：

```
.fifth-face {
  transform: translateX(100px) rotateY(90deg);
}
```

![](https://pan.udolphin.com/files/image/2022/10/d934fdc24819c7f6c5e1879a240e48c5.png)

下面来调整第三面，道理同上：

```
third-face {
  transform: translateY(100px) rotateX(90deg);
}
```

此时六个面是这样的：

![](https://pan.udolphin.com/files/image/2022/10/6ecdc84dde8ca76aec62937c91b9a035.png)  
最后来调整第四面：

```
.fourth-face {
  transform: translateY(-100px) rotateX(90deg);
}
```

此时六个面为

![](https://pan.udolphin.com/files/image/2022/10/65966317f61d20b234656c1559ca94cb.png)

下面来为这个骰子设置一个动画，让它转起来：

```
@keyframes rotate {
  from {
    transform: rotateY(0) rotateX(45deg) rotateZ(45deg);
  }
  to {
    transform: rotateY(360deg) rotateX(45deg) rotateZ(45deg);
  }
}
 
.dice-box {
  animation: rotate 5s linear infinite;
}
```

最终的效果如下：

![](https://pan.udolphin.com/files/image/2022/10/528af40756925aba4fc65e4e0260bd22.gif)

# 与flex布局的区别

grid 布局与 [<u>Flex 布局</u>](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。

* grid 主要是**在父元素上**定义的。在 flexbox 中，大部分布局（除了最基本的）都发生**在 children 上**。

* Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。grid 布局远比 Flex 布局强大。
* grid 可以做Flexbox做不了的事，Flexbox 可以做 grid 做不了的事，他们可以共同工作。grid item可以成为flexbox容器，flex item可以成为grid 容器。

综上所述，可以根据业务场景需要选择相应布局。

`grid布局` 和 `flex弹性布局` 一样，都是当下最流行的CSS布局方案之一。它的优点是可以实现多行多列的布局，属于 `二维布局` ，基本可以满足任何的布局页面。

# grid布局总结

## 优点

* 固定和灵活的轨道尺寸
* 可以使用行号、名称或通过定位网格区域将项目放置在网格上的精确位置
* 可以将多个项目放入网格单元格或区域中，它们可以彼此部分重叠

## 缺点

* 浏览器兼容性较差
* 学习成本较高

`grid布局` 可以说是目前最强大的CSS布局方案之一，在实际开发过程中，往往 `grid布局` 和 `flex布局` 一起结合使用

# 网站推荐

1. 前端grid网格布局小游戏网址[https://cssgridgarden.com/](https://cssgridgarden.com/)
2. grid布局的一些例子[https://gridbyexample.com/examples/](https://gridbyexample.com/examples/)
3. flex布局与grid布局对比实现的布局样式：[https://www.gridtoflex.com/](https://www.gridtoflex.com/)
4. 网格布局生成器[https://grid.layoutit.com/](https://grid.layoutit.com/)