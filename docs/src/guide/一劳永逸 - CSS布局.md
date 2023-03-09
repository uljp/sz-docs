
> 一切都始于这样一个问题：怎样通过CSS简单而优雅的实现水平、垂直同时居中。这么一个普通的问题，引发了大家很多的疑问，那到底什么样的布局能够满足这种需求呢？

在网页布局没有进入CSS的时代，排版几乎是通过table元素来实现的，在 table 的单元格里可以方便的使用 align、valign 来实现水平和垂直方向的对齐。随着Web语义化的流行，这些写法逐渐消失在我们的视野中，CSS标准为我们提供了五种布局方式：标准文档流布局、浮动布局、定位布局、圣杯布局和双飞翼布局。这几种方式的搭配使用可以满足pc端页面常见的需求。

然而，这些写法都存在一定的缺陷，缺少语义且不能灵活运用，我们需要的是能够通过一个属性就能优雅的实现子元素居中或均匀分布，甚至可以随着窗口的大小实现自适应，在这样的需求下，CSS的另一种布局方式诞生了，这就是我们今天重点介绍的flex布局。

# 常见的布局
* 文档流布局
* 浮动布局
* 定位布局
* 圣杯布局和双飞翼布局
* flex布局

想要实现下图的效果，我们可以采用多种不同的方式去实现，下面我们来详细讲解一下：
![](https://pan.udolphin.com/files/image/2021/8/805bc370b70dfa9cb2740908c78e53b8.png)

# 文档流布局
**文档流布局**是 `CSS` 当中最基本的布局方式，就是按照文档的顺序一个一个显示出来，块元素独占一行，行内元素共享一行

#### DOM结构
```html
  <div class="layout">
    <header>Header</header>
    <div class="content">
      <aside>Aside</aside><article>Article</article>
    </div>
    <footer>Footer</footer>
  </div>
```

#### 核心CSS样式

```css
  .layout {
    width: 1000px;
    margin: 0 auto;
    text-align: center;
    font-size: 32px;
    color: #fff;
    padding: 20px;
  }

  header {
    width: 100%;
    height: 100px;
    background-color: #C1FFC1;
  }

  .content {
    width: 100%;
    height: 300px;
  }

  aside {
    width: 30%;
    height: 100%;
    display: inline-block;
    background-color: #FFF68F;
  }

  article {
    width: 70%;
    height: 100%;
    background-color: #BBFFFF;
    display: inline-block;
  }

  footer {
    width: 100%;
    height: 100px;
    background-color: #D15FEE;
  }
```


# 浮动布局
**浮动布局**也是比较常见的布局方式，不过在 `flex` 流行以后，这种方式已经使用的比较少了，原理是使用 `float` 属性，使元素脱离文档流，浮动起来，不过需要注意在使用该属性时引起的其他问题（譬如高度崩塌），子盒子浮动，父盒子添加`overflow:hidden`属性。

#### DOM结构
```html
  <div class="layout">
    <header>header</header>
    <div class="content">
      <aside>aside</aside>
      <article>article</article>
    </div>
    <footer>footer</footer>
  </div>
```

####  核心CSS样式

```css
  .layout {
    text-align: center;
    font-size: 32px;
    color: #fff;
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    width: 100%;
    height: 100px;
    background-color: #C1FFC1;
  }

  .content {
    width: 100%;
    height: 300px;
    float: left;
    /* 子盒子浮动，父盒子添加overflow: hidden; 属性 */
    overflow: hidden;
  }

  aside {
    width: 30%;
    height: 100%;
    float: left;
    background-color: #FFF68F;
  }

  article {
    width: 70%;
    height: 100%;
    float: left;
    background-color: #BBFFFF;
  }

  footer {
    width: 100%;
    height: 100px;
    margin-top: 300px;
    background-color: #D15FEE;
  }
```

# 定位布局

**定位布局**与浮动布局类似，也是使元素脱离文档流，浮动起来，不过使用的是 `position` 属性，结果与浮动布局是一致的，两者各有各的优缺点，在布局的过程中，大家可根据自己的喜好进行使用

#### DOM结构

```html
  <div class="layout">
    <header>header</header>
    <div class="content">
      <aside>aside</aside>
      <article>article</article>
    </div>
    <footer>footer</footer>
  </div>
```

#### 核心css样式
```css
  .layout {
    width: 100%;
    text-align: center;
    font-size: 32px;
    color: #fff;
    position: relative;
  }

  header {
    width: 100%;
    height: 100px;
    background-color: #C1FFC1;
    position: absolute;
    top: 0;
  }

  .content {
    width: 100%;
    height: 300px;
  }

  aside {
    width: 30%;
    height: 100%;
    position: absolute;
    top: 100px;
    left: 0;
    background-color: #FFF68F;
  }

  article {
    width: 70%;
    height: 100%;
    position: absolute;
    top: 100px;
    right: 0;
    background-color: #BBFFFF;
  }

  footer {
    position: absolute;
    top: 400px;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #D15FEE;
  }
```
# 圣杯布局和双飞翼布局
**圣杯布局和双飞翼布局**两者的本质其实是差不多的，**就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。**

##### 下面我们来说一下它们之间的相同点与不同点：

**相同点：** 三栏全部 `float` 浮动，左右两栏加上负 `margin` 让其跟中间栏 `div` 并排，以形成三栏布局。
**不同点：** 解决中间栏 `div` 内容不被遮挡问题的思路不一样

## 圣杯布局
#### DOM结构
```html
  <div class="layout">
    <div class="content">content</div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
```

#### 核心css样式
```css
  .layout {
    height: 300px;
    padding: 0 200px;
    text-align: center;
    font-size: 32px;
    color: #fff;
  }

  .left,
  .content,
  .right {
    float: left;
  }

  .content {
    width: 100%;
    height: 300px;
    background: #C1FFC1;
  }

  .left {
    width: 200px;
    height: 300px;
    background: #FFF68F;
    position: relative;
    margin-left: -100%;
    left: -200px;
  }

  .right {
    width: 200px;
    height: 300px;
    background: #BBFFFF;
    position: relative;
    margin-left: -200px;
    left: 200px;
  }
```

1. 三者都设置向左浮动。
2. 设置content宽度为100%。
3. 设置负边距，left设置负左边距为100%，right设置负左边距为负的自身宽度。
4. 设置content的`padding`值给左右两个盒子留出空间。
5. 设置左右两个盒子为相对定位，left的`left`值为负的left宽度，right的`right`值为负的right盒子的宽度。

#### 实现效果

![](https://pan.udolphin.com/files/image/2021/8/e6e1fa3e54b631061b8f69adbc2d864e.gif)

## 双飞翼布局
#### DOM结构：
 ```html
  <div class="layout">
    <div class="middle">
      <div class="content">content</div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
```

#### 核心css样式
```css
  .layout {
    text-align: center;
    font-size: 32px;
    color: #fff;
    height: 300px;
  }

  .middle {
    width: 100%;
    height: 100%;
    float: left;
    background: #C1FFC1;
  }

  .content {
    height: 100%;
    margin-left: 200px;
    margin-right: 200px;
  }

  .left {
    width: 200px;
    height: 300px;
    background: #FFF68F;
    float: left;
    margin-left: -100%;
  }

  .right {
    width: 200px;
    height: 300px;
    background: #BBFFFF;
    float: left;
    margin-left: -200px;
  }
```

1. 三者都设置向左浮动。
2. 设置content宽度为100%。
3. 设置负边距，left设置负左边距为100%，right设置负左边距为负的自身宽度。
4. 设置content的`margin `值给左右两个盒留出空间。

#### 实现效果

![](https://pan.udolphin.com/files/image/2021/8/f21296919674664615d0bbe15b79086a.gif)

## 小结
**圣杯布局**是有一定的弊端的，在浏览器缩短到一定程度的时候，会使得中间子元素的宽度比左右两边子元素宽度小的时候，此时的布局是会出现问题的。
**双飞翼布局**的出现就是为了解决这个问题的。这个布局其实就是在刚才布局的基础上，给中间的盒子添加了一个父盒子。

由此看来双飞翼布局比圣杯布局更简洁一些。

###

**讲述了以上五种布局，大家是不是在想，这些布局早就已经被flex布局给取代了，为什么还要用这种呢？这些普通的布局逐渐被人遗忘，所以在这里给大家复习一下。那么大家最期待的flex布局的讲述就要开始啦，它可以快速的构建出你想要的所有布局，下面我们一起来看一下flex布局是如何实现上述的效果~**

# flex布局

>2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

flex是一种目前比较流行的布局方式，使用这种布局方式，可以实现几乎所有你想要的效果，但是在使用的过程中是需要注意浏览器的兼容性，flex只支持IE 10以上。

![](https://pan.udolphin.com/files/image/2021/8/ba530dbfac44181fd454166204ff659c.jpg)

Flexible Box 模型，通常被称为 flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。flex的使用方法很简单，只需要将元素的display属性设置为flex即可，也可以设置行内的flex（inline-flex）。

#### DOM结构
```html
  <div class="layout">
    <header>header</header>
    <div class="content">
      <aside>aside</aside>
      <article>article</article>
    </div>
    <footer>footer</footer>
  </div>
```

#### 核心css样式

```css
  .layout {
    width: 1000px;
    padding: 20px;
    margin: 0 auto;
    height: 500px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    display: flex;
    flex-direction: column;
  }

  header {
    width: 100%;
    flex: 1;
    background-color: #C1FFC1;
  }

  .content {
    width: 100%;
    flex: 3;
    display: flex;
  }

  aside {
    flex: 3;
    height: 100%;
    background-color: #FFF68F;
  }

  article {
    flex: 7;
    height: 100%;
    background-color: #BBFFFF;
  }

  footer {
    width: 100%;
    flex: 1;
    background-color: #D15FEE;
  }
```


**需要注意的是：当时设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**

谈到flex布局，不知道有多少人跟我一样，在本能的想到`justify-content:center`与`align-items:center`两条属性之后，除此之外的其它属性居然显得格外陌生。所以在这里我整理了一下flex的所有的属性，以方便大家学习，同时也让自己加深一下印象。大家想要真正学习flex，那么[阮一峰大神的flex教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)才是首选。

## flexbox的两根轴线

在 `flex` 中，最核心的概念就是容器和轴，所有的属性都是围绕容器和轴设置的，其中容器分为父容器和子容器，轴分为主轴和交叉轴。

- 水平的主轴（`main axis`）
  - 主轴开始的位置称为 `main start`
  - 结束的位置称为 `main end`
- 垂直的交叉轴（`cross axis`）
  - 交叉轴开始的位置称为 `cross start`
  - 结束的位置称为 `cross end`

在使用 `flex` 的子元素中，占据的主轴空间叫做 `main size`，占据的交叉轴空间叫做 `cross size`，如图所示：

![](https://pan.udolphin.com/files/image/2021/8/8b402883445b842ca38727fc09f60d00.png)

## 父容器

想要实现 flex 布局需要先指定一个容器，任何一个容器都可以被指定为 flex 布局，这样容器内部的元素就可以使用 flex 来进行布局。

父容器可以统一设置子容器的排列方式，子容器也可以单独设置自身的排列方式，如果两者同时设置，以子容器的设置为准。

**可以设置在父容器上的六个属性为：**
- `flex-direction`：主轴的方向
- `flex-wrap`：超出父容器子容器的排列样式
- `flex-flow`：`flex-direction` 属性和 `flex-wrap` 属性的简写形式
- `justify-content`：子容器在主轴的排列方向
- `align-items`：子容器在交叉轴的排列方向
- `align-content`：多根轴线的对齐方式

### flex-direction

flex-direction：决定主轴的方向（即项目的排列方向），但是主轴的方向不一定是水平的，这个属性就是设置主轴的方向，默认是水平方向，从左至右，如果主轴方向设置完毕，那么交叉轴就不需要设置，交叉轴永远是主轴顺时针旋转 90°


```
row：默认值，主轴为水平方向，起点在左端
```

![](https://pan.udolphin.com/files/image/2021/8/bfbf07a9dbfa4904e0651256c3a7e92e.png)

```
row-reverse：主轴为水平方向，起点在右端
```

![](https://pan.udolphin.com/files/image/2021/8/0a903f74adb8022fc6f4b163e673bcad.png)

```
column：主轴为垂直方向，起点在上
```

![](https://pan.udolphin.com/files/image/2021/8/6f4976eac2a65d01335447ddd28b221a.png)

```
column-reverse：主轴为垂直方向，起点在下
```

![](https://pan.udolphin.com/files/image/2021/8/50b657c4b42fe5d9a36b68d6c9670084.png)

### flex-wrap

flex-wrap：属性决定子容器是否换行排列，默认情况下，项目都排在主轴线上，使用 `flex-wrap` 可实现项目的换行，不但可以顺序换行而且支持逆序换行

```
nowrap：默认，不换行。即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。
```

![](https://pan.udolphin.com/files/image/2021/8/605e10476126caa128bbad6dc529dd69.png)

```
wrap：主轴总尺寸超出容器时换行，第一行在上方
```

![](https://pan.udolphin.com/files/image/2021/8/1720decaa71ea9c0ba99c80cc0217a27.png)

```
wrap-reverse：换行，第一行在下方，也就是逆序换行
```

![](https://pan.udolphin.com/files/image/2021/8/a7a80eed3e7f657f92a41ce5cc0bab44.png)

### justify-content
justify-content：主要用于定义如何沿着主轴方向排列子容器

```
flex-start：默认，左对齐
```

![](https://pan.udolphin.com/files/image/2021/8/1ccd08cd5b06465e2163b4d0e7fe001d.png)

```
flex-end：右对齐
```

![](https://pan.udolphin.com/files/image/2021/8/d05099bd0e00a95ebdc390420073c67c.png)

```
center：居中
```

![](https://pan.udolphin.com/files/image/2021/8/f85a315be68c9edc95d95024df7a91bd.png)

```
space-between：两端对齐，项目之间的间隔都相等
```

![](https://pan.udolphin.com/files/image/2021/8/8372ccf370768463dbf614f691373b2a.png)

```
space-around：每个项目两侧的间隔相等，项目之间的间隔比项目与边框的间隔大一倍
```

![](https://pan.udolphin.com/files/image/2021/8/ea888a038e11aaec3faccaf8cd985be6.png)

### flex-flow

`flow `即流向，也就是子容器沿着哪个方向流动，流动到终点是否允许换行，比如 `flex-flow: row wrap`，`flex-flow`属性是`flex-deriction`与`flex-wrap`属性的简写集合，默认属性为`row` `nowrap`，即横向排列，且不换行，如果需要控制项目排列与换行，推荐使用此属性，而非单独写两个。

```html
flex-flow: <flex-direction> || <flex-wrap>;
```


### align-items

`align-items`属性用于控制项目在纵轴排列方式，默认stretch即如果项目没设置高度，或高度为auto，则占满整个容器。
```
stretch：默认，如果项目未设置高度或设为 auto，将占满整个容器的高度
```

![](https://pan.udolphin.com/files/image/2021/8/b319e47b5a0e0e903c9567be1c5bf2c8.png)

```
flex-start：交叉轴的起点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/387b84e3aadf98c989f03d0c9ee80bfe.png)

```
flex-end：交叉轴的终点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/379c4ce38be2221d5c4727ac6b1f4e1e.png)

```
center：交叉轴的中点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/91b2798570c92d6942d3bb0dc38c6350.png)

```
baseline：项目的第一行文字的基线对齐
```

![](https://pan.udolphin.com/files/image/2021/8/57a07e2bd388453536cbbd68205049e7.png)

### align-content


`align-content`用于控制多根轴线的对齐方式，如果项目只有一行则不会起作用；默认stretch，即在项目没设置高度，或高度为auto情况下让项目填满整个容器，与align-items类似。但是需要注意：如果只有一根轴线时，此时这个属性不起作用。

>条件：必须对父元素设置属性display:flex，并且设置flex-wrap:wrap， align-content这样这个属性的设置才会起作用。
```
flex-start：与交叉轴的起点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/306d1b3e797780e4e79f9c9faa4f205a.png)

```
flex-end：与交叉轴的终点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/e09a28f09d117eca89a8e4f6c9a44ac0.png)

```
center：与交叉轴的中点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/de7786134da6dffd814e0d3ad2505556.png)

```
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
```

![](https://pan.udolphin.com/files/image/2021/8/55f96243ba316d238048cc5c43d319bc.png)

```
space-around：每根轴线两侧的间隔都相等，所以，轴线之间的间隔比轴线与边框的间隔大一倍
```

![](https://pan.udolphin.com/files/image/2021/8/735f4738a3b5fea214be21f29371db77.png)

```
stretch：默认 轴线占满整个交叉轴
```

![](https://pan.udolphin.com/files/image/2021/8/91290b5fc4a2b61cc04b3e714e93449e.png)

####

到这里关于父容器上的所有属性都讲完了，接下来就来讲讲关于在子容器上的属性。

## 子容器

**子容器也有六个属性，它们分别是：**

- `order`：子容器的排列顺序
- `flex-grow`：子容器剩余空间的拉伸比例
- `flex-shrink`：子容器超出空间的压缩比例
- `flex-basis`：子容器在不伸缩情况下的原始尺寸
- `flex`：`flex-grow`，`flex-shrink` 和 `flex-basis` 的简写
- `align-self`：允许子容器与其他项目采用不一样的对齐方式


### order

`order ` 属性定义项目的排列顺序，可以为负值，数值越小，排列越靠前，默认为 `0`


```html
order: <number>;
```

![](https://pan.udolphin.com/files/image/2021/8/4db23f0d016ae1e21fb59a622a08d3fe.png)

在 HTML 结构中，虽然 -3，-1 的 item 排在后面，但是由于分别设置了 order，使之能够排到最前面。

### flex-grow

`flex-grow` 属性定义子容器的伸缩比例，按照该比例给子容器分配空间，默认值为`0`

>该属性如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

```html
flex-grow: <number>;
```

![](https://pan.udolphin.com/files/image/2021/8/5b262e11e44f33495f012a1775f7efe0.png)

当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。

当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了，这时候就需要接下来的这个属性。

### flex-shrink

`flex-shrink`属性定义了子容器弹性收缩的比例，默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。

>该属性用来设置，当父元素的宽度小于所有子元素的宽度的和时（即子元素会超出父元素），子元素如何缩小自己的宽度的。 `flex-shrink`的默认值为1，当父元素的宽度小于所有子元素的宽度的和时，子元素的宽度会减小。值越大，减小的越厉害。如果值为0，表示不减小。

```html
flex-shrink: <number>
```

![](https://pan.udolphin.com/files/image/2021/8/388e4c7ca11f29aea1dce38a28ce356b.png)

### flex-basis

`flex-basis`定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间。当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。

>该属性用来设置元素的宽度，其实，width也可以设置宽度。如果元素上同时设置了width和flex-basis，那么width 的值就会被flex-basis覆盖掉。

```html
flex-basis: <length> | auto
```

![](https://pan.udolphin.com/files/image/2021/8/d5c949d8a980e633804de88041d0f49d.png)

### align-self

子容器的` align-self `属性允许单个项目有与其他项目不一样的对齐方式，它会覆盖父容器 `align-items` 属性，如果两者同时设置则以子容器的 `align-self `属性为准，默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`


```
auto：继承父元素的 align-items 属性
```

![](https://pan.udolphin.com/files/image/2021/8/5ad2ffc3e25eb9a763c3c3ce773265a4.png)
此时父元素的align-items属性为：center，因此align-self:auto 继承父元素的center属性。

```
flex-start：交叉轴的起点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/332e5a8a120c466fb40fe3949621bcd8.png)

```
flex-end：交叉轴的终点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/acc75d953052775f97e34ff28b352b6a.png)

```
center：交叉轴的中点对齐
```

![](https://pan.udolphin.com/files/image/2021/8/1465178095b484ab19b29e900b9300f0.png)

```
baseline：项目的第一行文字的基线对齐
```

![](https://pan.udolphin.com/files/image/2021/8/9fb3b2f0b18d3d6f2ed0ab01b1abbf5c.png)

```
stretch： 默认，如果项目未设置高度或设为 auto，将占满整个容器的高度
```

![](https://pan.udolphin.com/files/image/2021/8/44a19380911bfbe0c4ad57389e69ff7a.png)

### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0` `1` `auto`。后两个属性可选。

```html
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
```


该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

##### 它的全部写法可参考下图：
![](https://pan.udolphin.com/files/image/2021/8/901c4a30714a08b4c05bd4f3a5cc153d.png)

##### 针对flex的所有属性，我做了一下整理，可参考下图：
[点击可查看大图](https://note.youdao.com/s/Egs7ewAX)
![](https://pan.udolphin.com/files/image/2021/8/e935049fbb37a41a7c68e30dc6bf7d53.png)

学习完有关flex布局的所有属性之后，分享一些常见的案例供大家参考，如果有更好的布局方式，欢迎大家提出建议~

# 常见flex布局案例
## 案例一

实现效果：两边定宽，中间自适应；移动端改变布局

![](https://pan.udolphin.com/files/image/2021/8/1535640a6dfa3f2e6f565946f7d11fc4.gif)

#### DOM结构

```html
  <div class="container">
    <header class="bg">Header</header>
    <div class="center">
      <nav class="nav bg">Nav</nav>
      <main class="content bg">Content</main>
      <aside class="aside bg">Aside</aside>
    </div>
    <footer class="bg">Footer</footer>
  </div>
```

#### 核心css样式

```css
  .container {
    display: flex;
    flex-direction: column;
    min-height: 50vh;
  }
  header,
  footer {
    flex: 0 0 100px;
  }

  .center {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    height: 200px;
  }
  .aside,
  .nav {
    flex: 0 0 100px;
  }

  .bg {
    background: #C1FFC1;
    margin: 10px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  @media (max-width: 768px) {
    .center {
      flex-direction: column;
      flex: 1;
    }

    .nav,
    .aside,
    .content {
      flex: auto;
    }
  }
```
## 案例二

实现效果：左侧定宽，右侧自适应

![](https://pan.udolphin.com/files/image/2021/8/f10f61f0e887450b11e63f588021a786.gif)

#### DOM结构

```html
  <div class="container">
    <div class="aside bg">aside</div>
    <div class="body">
      <div class="header bg">header</div>
      <div class="content bg">
        <div class="box">content1</div>
        <div class="box">content2</div>
        <div class="box">content3</div>
      </div>
      <div class="footer bg">footer</div>
    </div>
  </div>
```

#### 核心CSS样式

```css
    .container {
      min-height: 400px;
      display: flex;
    }

    .aside {
      flex: 0 0 200px;
      display: flex;
      align-items: center;
    }

    .body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .content {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
    }

    .box {
      width: 100%;
      height: 30px;
      font-size: 26px;
    }

    .header,
    .footer {
      flex: 0 0 20%;
      display: flex;
      align-items: center;
    }

    .bg {
      background: #C1FFC1;
      margin: 10px;
      font-size: 30px;
      color: #fff;
    }
```

## 案例三

实现效果：基本网格布局

![](https://pan.udolphin.com/files/image/2021/8/07b42a53078ee9b4aef917006b48f439.png)

#### DOM结构

```html
  <div class="box-title">基本网格布局一</div>
  <div class="layout">
    <div class="flex-box">
      <div class="article"></div>
    </div>
    <div class="flex-box">
      <div class="article"></div>
    </div>
    <div class="flex-box">
      <div class="article"></div>
    </div>
    <div class="flex-box">
      <div class="article"></div>
    </div>
    <div class="flex-box">
      <div class="article"></div>
    </div>
    <div class="flex-box">
      <div class="article"></div>
    </div>
  </div>

  <div class="box-title">基本网格布局二</div>
  <div class="layout">
    <div class="flex-cell"></div>
    <div class="flex-cell"></div>
  </div>
  <div class="layout">
    <div class="flex-cell"></div>
    <div class="flex-cell"></div>
    <div class="flex-cell"></div>
  </div>
  <div class="layout">
    <div class="flex-cell"></div>
    <div class="flex-cell"></div>
    <div class="flex-cell"></div>
    <div class="flex-cell"></div>
  </div>
```

#### 核心CSS样式

```css
  .box-title {
    font-size: 32px;
    text-align: center;
    color: #333;
  }
  .layout {
    padding: 0 10%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .flex-box {
    width: 20%;
    height: 100px;
    margin: 20px 0;
  }

  .article {
    width: 90%;
    height: 100%;
    background-color: #C1FFC1;
    margin: 0 auto;
  }

  .flex-cell {
    flex: 1;
    height: 100px;
    background: #C1FFC1;
    margin: 10px;
  }
```

# 总结
本文介绍了六种常见的css布局方法，通过不同的方式可以实现同样的布局，但实际开发的过程中，我们首先想到的就是flex布局，在使用的过程中，我们只需注意浏览器的兼容性，就可以实现几乎所有你想要的效果，这么神奇的布局，有谁会不爱呢？

希望可以让各位读者对css布局有一个更清楚的了解，能够快速实现自己想要的效果。

感谢您的阅读，我是数字办的许晓妍，期待与您共同成长！！！