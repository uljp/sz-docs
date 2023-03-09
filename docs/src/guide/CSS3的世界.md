# 前言

相信大家对CSS3并不陌生，是一个非常有趣，神奇的东西！有了CSS3，之前需要通过JS才能实现的效果，CSS3都会轻松解决。自CSS3流行以来，虽然在实际项目中偶尔会用到其中的属性，但没有形成系统性的认识，没有看到效果立马就能想到解决方案的能力。所以这次会带大家了解CSS3的一些新特性，以及基础的用法，感受CSS3的魅力！

## background

background是一个简写属性，其中包含以下属性：

1. backgroun-image：设置背景图像, 可以是真实的图片路径, 也可以是创建的渐变背景;
2. background-position: 设置背景图像的位置;
3. background-size: 设置背景图像的大小;
4. background-repeat: 指定背景图像的铺排方式;
5. background-attachment: 指定背景图像是滚动还是固定;
6. background-origin: 设置背景图像显示的原点;
7. background-clip: 设置背景图像向外剪裁的区域;
8. background-color: 指定背景颜色。
    简写的顺序如下:

> bg-color || bg-image || bg-position \[ / bg-size\]? || bg-repeat || bg-attachment || bg-origin || bg-clip

顺序并非固定, 但是要注意:

1. background-position 和 background-size 属性, 之间需使用/分隔, 且position值在前, size值在后。
2. 同时使用 background-origin 和 background-clip 属性, origin属性值需在clip属性值之前, 如果origin与clip属性值相同, 则可只设置一个值。

background可以指定多层背景，这个时候我们使用逗号分隔每个背景层。

### background-origin

background-origin 属性指定了背景图像的位置区域。 content-box, padding-box,和 border-box区域内可以放置背景图像。

背景从边框开始`background-origin:border-box;`
![](https://pan.udolphin.com/files/image/2021/11/477cfbe543e6be1fce767645514810cc.png)
背景从padding开始，默认值也是这个`background-origin:padding-box;`
![](https://pan.udolphin.com/files/image/2021/11/7d64b1bc392c08d0585bb70beee344a5.png)
背景从内容开始`background-origin:content-box;`
![](https://pan.udolphin.com/files/image/2021/11/5ec76fe6821d807a4da07283d89d3802.png)

### background-size

background-size指定背景图像的大小。CSS3以前，背景图像大小由图像的实际大小决定。 CSS3中可以指定背景图片，让我们重新在不同的环境中指定背景图片的大小。

将背景图像等比缩放到宽度或高度与容器的宽度或高度相等, 背景图像始终被包含在容器内。`background-size:contain;`
![](https://pan.udolphin.com/files/image/2021/11/ea37e050fea996eca803479923b71805.png)

将背景图像等比缩放到完全覆盖容器, 背景图像有可能超出容器。(即当较短的边等于容器的边时, 停止缩放)`background-size:cover;`

![](https://pan.udolphin.com/files/image/2021/11/9023c1f418190858cd439aa665e410af.png)
背景高度自适应，并背景循环`background-size:auto 100%;background-repeat:repeat;`
![](https://pan.udolphin.com/files/image/2021/11/610a7b77f9d0bb519eb1d0b8841151d7.png)

背景宽度固定200，高度自适应`background-size:200px;background-position:center;`
![](https://pan.udolphin.com/files/image/2021/11/90578d2b4a0a277ee1967a9ee6cc295b.png)

### background-clip

CSS3中background-clip其作用就是设置元素的背景（背景图片或颜色）的填充规则。

与 box-sizing 的取值非常类似，通常而言，它有 3 个取值，border-box，padding-box，content-box，后面规范新增了一个 background-clip。时至今日，部分浏览器仍需要添加前缀 webkit 进行使用 -webkit-background-clip。

使用了这个属性的意思是，以区块内的文字作为裁剪区域向外裁剪，文字的背景即为区块的背景，文字之外的区域都将被裁剪掉。

没有定义，默认从边框开始显示`background-clip:border-box`
![](https://pan.udolphin.com/files/image/2021/11/32a07ffa11f3f302ed6fcbd622afc0c1.png)
从padding开始显示，不算border，相当于把border那里的背景给裁减掉`background-clip: padding-box;`
![](https://pan.udolphin.com/files/image/2021/11/6dcbb17a50393e2bf04fd34d52569665.png)
只在内容区显示，不算padding和border，相当于把padding和border那里的背景给裁剪掉`background-clip:content-box;`
![](https://pan.udolphin.com/files/image/2021/11/46719e85c94510787ba6da4dda70ee58.png)
背景被裁剪成文字的前景色,`background-clip:text;`
![](https://pan.udolphin.com/files/image/2021/11/9fa6816b4e7ae757fde412bc5ac63bb9.png)
实现上图代码如下：

```css
.clip {
   margin: auto;
   width: 400px;
   height: 300px;
   line-height: 300px;
   text-align: center;
   font-size: 180px;
   color: transparent;
   background: url(./sun.png) no-repeat center center;
   background-size: cover;
   -webkit-background-clip: text;
}
```

## 渐变

CSS3 渐变可以让你在两个或多个指定的颜色之间显示平稳的过渡。 以前，你必须使用图像来实现这些效果，现在通过使用 CSS3 的渐变即可实现。

### linear-gradient线性渐变

background：linear-gradient(directon/angle,color-stop1,color-stop2,...);由两部分组成：发生渐变的方向和色标（一个颜色值和一个位置）。
第一个参数：可不写，默认值为to bottom(即180%)，用来指定渐变的方向，可以是具体的角度值，也可以直接指定方位to left/to right/to top/ to bottom。
为实现渐变，还需要至少定义两个颜色结点，每个颜色节点可由两个参数组成，\[颜色值 位置值，颜色值 位置值，...\],其中颜色值为必填项，位置值可为长度，也可以是百分比，非必填项。

`background: linear-gradient(blue 20%,green 40%,red 80%);`
表示0\~20%之间是蓝色，20%\~40%之间是蓝到绿的渐变，40%\~80%之间是绿到蓝的渐变，80%\~100%之间是红色。
![](https://pan.udolphin.com/files/image/2021/11/d4f76fb0e9ee19a09565fabf432485d0.png)

> CSS图像(第三版)规范: 如果某个色标的位置值比整个列表中在它之前的色标的位置值都要小, 则该色标的位置值会被设置为它前面所有色标位置值的最大值。

**实现条纹背景**
需要借助`background-size`来控制每一块条纹背景的大小。
![](https://pan.udolphin.com/files/image/2021/11/d0a1f35e33d5e13db26b2e44f3a91ce4.png)

```css
background: linear-gradient(#58a 50%, #fb3 0);
background-size: 100% 40px;
```

第二个颜色的位置值0即表示50%。

**斜条纹背景的实现**
如果想要实现各种角度的斜条纹背景linear-gradient有局限性，所以css3提供了`repeating-linear-gradient`
![](https://pan.udolphin.com/files/image/2021/11/c4d31b4a8e290e7deb35f42c7f644c8d.png)

```css
background: repeating-linear-gradient(45deg, #58a, #58a 10px, #fb3 0, #fb3 20px);
```

使用`repeat-linear-gradient`的好处是，不需要借助`background-size`控制大小，而且角度随意设置。
**注意：** 使用repeat-linear-gradient()实现渐变时，必须明确指定每一个颜色的范围值

### radial-gradient径向渐变

从一个点向四周的颜色渐变。background：radial-gradient(center,shape,size，start-color,...,end-color);

center:渐变起点的位置;

shape：ellipse（默认），circle;

size:渐变大小，closest-side:最近边；farthest-side：最远边；closest-side:最近角；farthest-corner：最远角
注意：当渐变类型为circle时，值只能指定一个size值，即直径；当渐变类型为ellipse时，需要指定两个size值，即水平直径，垂直直径。

![](https://pan.udolphin.com/files/image/2021/11/0ca5e7540d898bbed9abfdffeb854dac.png)

```css
.chrome {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #999, 0 0 2px #ddd inset;
  background: radial-gradient(circle, #4FACF5 0, #2196F3 28%, transparent 28%),
  radial-gradient(circle, #fff 34%, transparent 34%),
  linear-gradient(-50deg, #FFEB3B 34%, transparent 34%),
  linear-gradient(60deg, #4CAF50 33%, transparent 33%),
  linear-gradient(180deg, #F44336 30%, transparent 30%),
  linear-gradient(-120deg, #FFEB3B 40%, transparent 40%),
  linear-gradient(0deg, #4CAF50 45%, transparent 45%),
  linear-gradient(120deg, #F44336 50%, transparent 50%);
}
```

## word

### 换行

文字换行
语法：`word-break:normal | break-all | keep-all;`

CSS 属性 word-break 指定了怎样在单词内断行。

默认情况，word-break:normal;浏览器默认换行规则
![](https://pan.udolphin.com/files/image/2021/11/b36babaa6ebd30b64f8dd3a5eb853dac.png)

word-break:keep-all;只能在半角空格或连字符处换行
![](https://pan.udolphin.com/files/image/2021/11/e0a4f8980e527c8645ec94b372b708eb.png)
word-break:break-all;可在任意字符间换行
![](https://pan.udolphin.com/files/image/2021/11/a6c3e4529e7785de2338e84dcb89c278.png)

语法：`word-wrap:normal | break-word;`

CSS 属性 overflow-wrap 是用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。

word-wrap属性原本属于微软的一个私有属性，在css3中被重命名为overflow-wrap

overflow-wrap:break-word; 允许在长单词或URL地址内部进行换行
![](https://pan.udolphin.com/files/image/2021/11/eccda98d695a1b9b6c8109daad19b563.png)
overflow-wrap：normal，只在允许的断字点换行
![](https://pan.udolphin.com/files/image/2021/11/4ec1c2435b17ac448d320a4b60d89dd9.png)
文字不换行
语法：`white-space:nowrap;`

**异同：** word-wrap 是用来决定允不允许单词内断句的，如果不允许的话长单词就会溢出。最重要的一点是它还是会首先尝试挪到下一行，看看下一行的宽度够不够，不够的话就进行单词内的断句。
而word-break:break-all断句的方式非常粗暴，它不会尝试把长单词挪到下一行，而是直接进行单词内的断句。

overflow-wrap:break-word与word-break:break-all共同点是都能把长单词强行断句，不同点是word-wrap:break-word会首先起一个新行来放置长单词，新的行还是放不下这个长单词则会对长单词进行强制断句；而word-break:break-all则不会把长单词放在一个新行里，当这一行放不下的时候就直接强制断句了。

### 超出省略号

这个其实三行代码：禁止换行，超出隐藏，超出省略号

```html
<div class="text-overflow">This is some long text that will not fit in the box</div>
```

```css
.text-overflow {
   width: 200px;
   border: 1px solid #fff;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
}
```

运行结果
![](https://pan.udolphin.com/files/image/2021/11/e1d1dad04c0164a63afb7cd06cdd8de7.png)

### 多行超出省略号

在以前如果是多行超出省略号，就只能用js实现，现在css3提供了多行省略号的方法。但是这个暂时只支持webkit浏览器

```html
    <div class="text-overflow1">
      这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏这里将会超出隐藏
    </div>
```

```css
.text-overflow1 {
   width: 400px;
   overflow: hidden;
   border: 1px solid #ccc;
   text-overflow: ellipsis;
   padding: 0 10px;
   /* 将对象作为弹性伸缩盒子模型显示  *必须结合的属性* */
   display: -webkit-box;
   /* 用来限制在一个块元素中显示的文本的行数 */
   -webkit-line-clamp: 2;
   /* 设置伸缩盒对象的子元素的排列方式  *必须结合的属性* */
   -webkit-box-orient: vertical;
   line-height: 30px;
   height: 60px;
}
```

效果图：![](https://pan.udolphin.com/files/image/2021/11/fdc243b6d676bd6c4b06f96fa3d3d7be.png)
但这种方法只适用于webkit内核的浏览器，若要兼容性好的方法，可以利用绝对定位实现：

```
.text-overflow1 {
  position: relative;
  /*line-height和height要相互配合，显示多少行就省略，就是line-height多少倍数*/
  line-height: 1.2em;
  max-height: 3.6em;
  /*此属性看需求来判断是否设置，因为设置了padding-right，多腾出了点位置，该值一般为padding-right的值的负值*/
  /*margin-left: -1em;*/
  /*此值写死成1em就好，因为省略号大概就是占用1em的空间*/
  padding-right: 1em;
  text-align: justify;
  overflow: hidden;
}

.text-overflow1:before {
  position: absolute;
  right: 0;
  bottom: 0;
  content: '...';
}

.text-overflow1:after {
  position: absolute;
  right: 0;
  /*宽高写死1em就好，因为省略号大概就是占用1em的空间，用来遮挡住省略号，也基本上跟wrap的padding-right一致*/
  width: 1em;
  /*与wrap的行高实际值保持一致*/
  height: 1.2em;
  content: '';
  /*要跟所在背景颜色一致才能遮挡住省略号后觉得没异样*/
  background-color: #fff;
}
```

### 文字阴影

语法：`text-shadow:水平阴影，垂直阴影，模糊距离，阴影的颜色`
![](https://pan.udolphin.com/files/image/2021/11/c389a3ba800a84144c5c039a31f84890.png)

```
.text-shadow {
   font-size: 100px;
   color: #b1b1b1;
   text-shadow: 0 -1px 0 #ffffff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212;
}
```

### text-stroke

text-stroke是复合属性，对文字边框进行设置
text-stroke: text-stroke-width text-stroke-color
1\.text-stroke-color:设置文字边界填充颜色
2\.text-stroke-width:设置文字边界宽度

配合color: transparent;可以做到字体镂空的效果
![](https://pan.udolphin.com/files/image/2021/11/1b2908de77dca0df817a2bab572229d5.png)

```
.strokecolor {
  font-size: 40px;
  color: transparent;
  -webkit-text-stroke: 0.3px yellow;
}
```

## transform变形

通过css3变形属性，我们能够对元素进行移动translate、缩放scale、转动rotate、扭曲skew。
在学习变形之前，先了解一下变形中的坐标系。

* x轴（横轴）
* y轴（纵轴）
* z轴（深度轴）

> 2D变形只需要关注x轴和y轴

x轴的正值在右侧，负值在左侧。y轴的正值沿纵轴向下，负值沿纵轴向上

> 3D变形不仅需要关注x轴和y轴，还要加上z轴

z轴从显示器上跃出，指向你的眼前。z轴上的正值离你较近，负值离你较远。

### translate移动

* 一个参数：translate(x),代表沿x轴位移x像素，y轴默认为0
* 两个参数：translate(x,y),代表沿x轴和y轴位移的距离
* 单独写法：translateX(x)  translateY(y) translateZ(z)
* 三个参数：translate3d(x,y,z), 同时指定x轴，y轴，z轴的平移量。与translate()不同，如果translate3d()的值少于3个，没有假定的默认值。因此类似translate3d(100px,20px)操作是无效的。
* 位移的参考原点为元素左上角
    ![](https://pan.udolphin.com/files/image/2021/11/8d34e66628d9a333448ad5f3a496189d.gif)

### rotate旋转

* rotate(angle):参数只有一个
* 四个函数：rotate(),rotateX().rotetaY(),rotateZ()
* rotate()函数实施的是2D旋转，它的效果等同于rotateZ()，因为都是绕Z轴旋转的
* rotate3d(x,y,z,angle),rotate(45deg)用3D旋转表示是rotate3d(0,0,1,45deg)。这个向量在x轴和y轴上的大小是0，在z轴上的大小是1。也就是说，旋转中心是z轴。元素将绕指定的向量旋转45度。
    ![](https://pan.udolphin.com/files/image/2021/11/fa5f025650a08648cf3b1a1883f00aef.gif)

### scale缩放

* 一个参数：scale(num)，代表同时在x轴和y轴两个方向缩放相同的倍数
* 两个参数：scale(x, y) ，分别代表x和y轴方向缩放相应的倍数
* 三个参数：scale3d(x,y,z), 分别代表x、y和z轴方向缩放相应的倍数，和translate3d()一样，三个参数必须都有效，不然将导致所属的整个变形值都失效
* 参数为数字，始终为正数，无单位
* 默认值为1倍，就是不缩放
* 默认为围绕元素中心为原点进行缩放

![](https://pan.udolphin.com/files/image/2021/11/e8e0a087b18363d182142a866f60918f.gif)

### skew倾斜

* 一个参数：skew(x)，代表沿x轴变形x角度，y轴默认为0
* 两个参数：skew(x, y)，代表沿x轴变形x的角度，沿y轴变形y的角度
* 参数为变形的角度，单位为deg
* x值：为正则向左变形，为负则向右变形
* y值：为正则向上变形，为负则向下变形
* 单独写法：skewX(x)  skewY(y)
* 默认为围绕元素中心为原点进行变形
    ![](https://pan.udolphin.com/files/image/2021/11/b044a5d436a08ee820c0aed5f68a074e.gif)
    下面用上面四个属性实现“hamburger”的变形
    ![](https://pan.udolphin.com/files/image/2021/11/3f613d415e8d5117e3b012042ad715bf.gif)

```css
.container {
  width: 100%;
  margin: 50px auto;
  position: relative;
  text-align: center;
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col {
  width: 20%;
  margin: 1% 0 1% 1.6%;
}
.row .three {
  padding: 80px 30px;
  box-sizing: border-box;
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
}
.hamburger .line {
  width: 40px;
  height: 5px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  transition: all 0.3s ease-in-out;
}
.hamburger:hover {
  cursor: pointer;
}
/* 1 */
#hamburger-1.is-active .line:nth-child(2) {
  opacity: 0;
}
#hamburger-1.is-active .line:nth-child(1) {
  transform: translateY(13px) rotate(45deg);
}
#hamburger-1.is-active .line:nth-child(3) {
  transform: translateY(-13px) rotate(-45deg);
}
/* 2 */
#hamburger-2.is-active .line:nth-child(1) {
  transform: translateY(13px);
}
#hamburger-2.is-active .line:nth-child(3) {
  transform: translateY(-13px);
}
/* 3 */
#hamburger-3.is-active .line:nth-child(1) {
  transform: translateX(-10px) rotate(-45deg);
}
#hamburger-3.is-active .line:nth-child(3) {
   transform: translateX(-10px) rotate(45deg);
}
/* 4 */
#hamburger-4.is-active .line:nth-child(1) {
  transform: translateX(10px) rotate(45deg);
}
#hamburger-4.is-active .line:nth-child(3) {
   transform: translateX(10px) rotate(-45deg);
}
```

```html
<div class="container">
  <div class="row">
    <div class="three col">
      <div class="hamburger" id="hamburger-1">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </div>
    <div class="three col">
      <div class="hamburger" id="hamburger-2">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </div>
    <div class="three col">
      <div class="hamburger" id="hamburger-3">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </div>
    <div class="three col">
      <div class="hamburger" id="hamburger-4">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </div>
  </div>
</div>
```

```js
const hamburger = document.querySelectorAll(".hamburger");
 hamburger.forEach(v => {
  v.addEventListener("click", () => {
    v.classList.toggle("is-active");
  })
})
```

### perspective透视

* 透视原理：近大远小
* 浏览器坐标：浏览器平面为Z=0的平面，坐标原点默认为图片的中心，可以通过更改透视原点进行更改。
* perspective:视距，表示视点距离屏幕的长短。视点，用于模拟透视效果时人眼的位置。
* perspective-origin： 在三维中确定视点的唯一位置。

> 当元素沿着Z轴向前移动时，与视点的距离越小，放大倍数越大。总结：视距越小放大效果越明显，translateZ越大放大效果越明显。
> 当元素沿着Z轴移动的距离大于视距后，元素移动到视点后方，故无法投影在屏幕上，所以屏幕上没有呈现。tranlateZ>perspective屏幕上无法呈现图像。

透视属性必须添加到需要呈现近大远小效果的元素的父元素上面

可以通过 该网址更加理解视距：[https://yun.dui88.com/tuia/junhehe/demo/3d-translateZ.html](https://yun.dui88.com/tuia/junhehe/demo/3d-translateZ.html)

> transform-style: preserve-3d | flat；表示该元素的子元素是（看起来）位于三维空间内，还是在该元素所在的平面内被扁平化。

![](https://pan.udolphin.com/files/image/2021/11/cc627a991b5535117b9a408d4f6bf441.gif)

```html
<section id="slideshow">
  <div class="entire-content">
    <div class="content-carrousel">
      <div class="shadow"><img src="./sun.png" />
      </div>
      <div class="shadow"><img src="./sun1.png" />
      </div>
      <div class="shadow"><img src="./tree.png" />
      </div>
      <div class="shadow"><img src="./deng.png" />
      </div>
      <div class="shadow"><img src="./deng2.png" />
      </div>
      <div class="shadow"><img src="./sun2.png" />
      </div>
      <div class="shadow"><img src="./tree1.png" />
      </div>
      <div class="shadow"><img src="./deng.png" />
      </div>
      <div class="shadow"><img src="./tree.png" />
      </div>
    </div>
  </div>
</section>
```

```css
#slideshow {
  margin: 0 auto;
  padding-top: 50px;
  height: 600px;
  width: 100%;
  box-sizing: border-box;
}

.entire-content {
  margin: auto;
  width: 190px;
  perspective: 1000px;
  position: relative;
  padding-top: 80px;
}

.content-carrousel {
  width: 100%;
  position: absolute;
  float: right;
  animation: rotar 15s infinite linear;
  transform-style: preserve-3d;
}

.content-carrousel:hover {
  animation-play-state: paused;
  cursor: pointer;
}

.content-carrousel div {
  width: 100%;
  height: 120px;
  border: 1px solid #3b444b;
  overflow: hidden;
  position: absolute;
}

.content-carrousel div:nth-child(1) {
  transform: rotateY(0deg) translateZ(300px);
}

.content-carrousel div:nth-child(2) {
  transform: rotateY(40deg) translateZ(300px);
}

.content-carrousel div:nth-child(3) {
  transform: rotateY(80deg) translateZ(300px);
}

.content-carrousel div:nth-child(4) {
   transform: rotateY(120deg) translateZ(300px);
}

.content-carrousel div:nth-child(5) {
  transform: rotateY(160deg) translateZ(300px);
}

.content-carrousel div:nth-child(6) {
  transform: rotateY(200deg) translateZ(300px);
}

.content-carrousel div:nth-child(7) {
  transform: rotateY(240deg) translateZ(300px);
}

.content-carrousel div:nth-child(8) {
  transform: rotateY(280deg) translateZ(300px);
}

.content-carrousel div:nth-child(9) {
  transform: rotateY(320deg) translateZ(300px);
}

.content-carrousel div:nth-child(10) {
  transform: rotateY(360deg) translateZ(300px);
}

.shadow {
  position: absolute;
  box-shadow: 0px 0px 20px 0px #000;
  border-radius: 1px;
}

.content-carrousel img {
  transition: all 300ms;
  width: 100%;
  height: 100%;
}

.content-carrousel img:hover {
  transform: scale(1.2);
  transition: all 300ms;
}

@keyframes rotar {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}
```

## transition过渡

css过渡在一段时间内把css属性的初始值变为另一个值，即逐渐变化，不那么突兀。属性如下：

1. transition-property:指定哪个或哪些css属性用于过渡;
2. transiton-duraton:指定过渡的时长;
3. transition-timing-function:告诉系统过渡动画的运动的速度;
    * ease - 规定过渡效果，先缓慢地开始，然后加速，然后缓慢地结束（默认）
    * linear - 规定从开始到结束具有相同速度的过渡效果
    * ease-in - 规定缓慢开始的过渡效果
    * ease-out - 规定缓慢结束的过渡效果
    * ease-in-out - 规定开始和结束较慢的过渡效果
    * cubic-bezier(n,n,n,n) - 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
4. transition-delay:指定延迟，即告诉系统延迟多少秒之后才开始过渡动画。
5. transition：all 5s linear .2s;//其中只有transition-duration是必填属性.

![](https://pan.udolphin.com/files/image/2021/11/242b15201c0f26382596672ad439a528.gif)

```html
<a href="#" class="btn4">
  Button 4
</a>
<!-- <h2> Button style 5</h2> -->
<a href="#" class="btn5">
  <span>button 5</span>
  <div class="transition"></div>
</a>
<!-- <h2> Button style 6</h2> -->
<a href="#" class="btn6">
  <span>button 6</span>
  <div class="transition2"></div>
</a>
<!-- <h2> Button style 7</h2> -->
<a href="#" class="btn7">
  <span>button 7</span>
  <div class="transition"></div>
</a>
```

```css
/*=======Button 4============= */
.btn4 {
  border: 1px solid transparent;
  transition: all 0.4s ease-out;
}

.btn4::before {
  content: '';
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: -1;
  width: 0%;
  height: 1px;
  background: #6098FF;
  transition: all 0.4s ease-out;
}

.btn4:hover::before {
  width: 100%;
}

.btn4::after {
  content: '';
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: -1;
  width: 0%;
  height: 1px;
  background: #6098FF;
  transition: all 0.4s ease-out;
}

.btn4:hover::after {
  width: 100%;
}

.btn4:hover {
  border-left: 1px solid #6098FF;
  border-right: 1px solid #6098FF;
}

/* Button 5 */
.btn5 {
  padding: 20px 10px;
  margin: 10px 4px;
  color: #fff;
  text-align: center;
  position: relative;
  text-decoration: none;
  overflow: hidden;
}

.btn5 span {
  background: #00002E;
  width: 100%;
  position: relative;
  padding: 10px 70px;
  transition: all .65s ease;
}

.transition {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 0%;
  background: #80ffd3;
  z-index: -1;
}

.btn5:hover span {
  color: #80ffd3 !important;
}

.btn5:hover .transition {
  height: 100%;
  top: 100%;
  transition: all .7s ease;
}

/* Button 6 */
.btn6 {
  padding: 20px 10px;
  margin: 10px 4px;
  color: #fff;
  text-align: center;
  position: relative;
  text-decoration: none;
  overflow: hidden;
}

.btn6 span {
  background: #00002E;
  width: 100%;
  position: relative;
  padding: 10px 70px;
  transition: all .65s ease;
}

.transition2 {
  position: absolute;
  top: 0;
  left: 0%;
  width: 0;
  height: 100%;
  background: #80ffd3;
  z-index: -1;
}

.btn6:hover span {
  color: #80ffd3 !important;
}

.btn6:hover .transition2 {
  width: 100%;
  left: 100%;
  transition: all .7s ease;
}


/* Btn 7  */
.btn7 {
  color: #fff;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 50px;
  position: relative;
  overflow: hidden !important;
  transition: all .3s ease-in-out;
}


.btn7:hover {
  border: 1px solid #071982;
  color: #80ffd3 !important;
}

.btn7::before {
  content: '';
  width: 0%;
  height: 100%;
  background: #071982;
  position: absolute;
  transform: skewX(-20deg);
  left: -10%;
  opacity: 1;
  top: 0;
  z-index: -12;
  transition: all .7s ease-out;
  box-shadow: 2px 0px 14px rgba(0, 0, 0, .6);
}

.btn7::after {
  content: '';
  width: 0%;
  height: 100%;
  background: #80ffd3;
  position: absolute;
  transform: skewX(-20deg);
  left: -10%;
  opacity: 0;
  top: 0;
  z-index: -15;
  transition: all .4s ease-out;
  box-shadow: 2px 0px 14px rgba(0, 0, 0, .6);
}

.btn7:hover::before,
.btn7:hover::after {
  opacity: 1;
  width: 110%;
}
```

## animation动画

transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。而动画可以是多个状态间的变化。

分两部：先定义动画，再使用动画

@keyframes 动画名{
from{开始状态}
to{结束状态}
}
@keyframes:定义一个动画，@keyframes定义的动画名称用来被animation-name所使用;

| 名称 | 含义 |  |
| --- | --- | --- |
| animation-name | 规定对象所应用的动画名称 ,必须与规则@keyframes配合使用，因为动画名称由@keyframes定义; |  |
| animation-duration | 规定动画的持续时间; |  |
| animation-timing-function | 规定动画的速度曲线，与transition中属性相同; |  |
| animation-delay | 规定动画何时开始，默认是0。 |  |
| animaticon-iteration-count | 规定动画被播放的次数，默认是1,还有infinite |  |
| animation-direction | 规定动画是否在下一个周期逆向播放，默认是"normal","alternate"逆向播放 |  |
| animation-fill-mode | 可以定义元素在动画结束或开始前的状态。默认"backwards"回到起始状态,"forwards"停留在结束状态 |  |
| animation-play-state | 规定动画是否正在运行或暂停。默认是'running' |  |

animation:动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画起始或者结束的状态
animation:myfirstt 5s linear 2s infinite ;


```css
.shining {
   font-size: 2rem;
   font-family: sans-serif;
   letter-spacing: 4px;
   text-transform: uppercase;
   background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(0, 0, 0, 1) 100%);
   background-size: 80%;
   background-repeat: no-repeat;
   color: transparent;
   -webkit-background-clip: text;
   animation: shining 3s linear infinite;
}

@keyframes shining {
   from {
     background-position: -300%;
   }

   to {
     background-position: 300%;
   }
}

<p class="shining">fushigi no monogatari</p>
```

![](https://pan.udolphin.com/files/image/2021/11/37e18618fc7e6cfee8bbc71ec3746992.gif)

```html
<div class="reflect">
  <div class="scene">
    <div class="card">
      <div class="card-face">
        <img src="./transform/tree.png" />
      </div>
      <div class="card-face card-face--back">
        <div class="font">-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片</div>
      </div>
    </div>
    <div class="card">
      <div class="card-face">
        <img src="./transform/tree1.png" />
      </div>
      <div class="card-face card-face--back">
        <div class="font">css3</div>
      </div>
    </div>
    <div class="card">
      <div class="card-face">
        <img src="./transform/sun1.png" />
      </div>
      <div class="card-face card-face--back">
        <div class="font">css3</div>
      </div>
    </div>
  </div>
</div>
```

```css
.reflect {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black;
}

.scene {
  width: 1000px;
  display: flex;
  justify-content: space-between;
  perspective: 800px;
}

.card {
  position: relative;
  width: 240px;
  height: 300px;
  color: white;
  cursor: pointer;
  transition: 1s ease-in-out;
  transform-style: preserve-3d;
}

.card:hover {
  transform: rotateY(180deg);
}

.font {
  background-color: #111;
  color: #fff;
  font-size: 20px;
  height: 100%;
}

.card-face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 1s ease-in-out;
  -webkit-box-reflect: below 0 linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
}

img {
  width: 240px;
  height: 300px;
  object-fit: cover;
}

.card-face--back {
  transform: rotateY(180deg);
}
```

![](https://pan.udolphin.com/files/image/2021/11/53ed997e1abc3a25131abe64ef4d3ec5.gif)

```html
<div class="button">
  <h1 style="color:#000;">share button</h1>
  <button class="btn-share">
    <span class="btn-overlay">
      <svg t="1636428980168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2430" width="28" height="28">
        <path
          d="M763.84 896c-47.128 0-85.333-38.205-85.333-85.333s38.205-85.333 85.333-85.333c47.128 0 85.333 38.205 85.333 85.333 0 47.128-38.205 85.333-85.333 85.333M329.92 558.848c-14.895 26.231-42.641 43.638-74.453 43.638-47.128 0-85.333-38.205-85.333-85.333 0-16.097 4.457-31.152 12.204-44 14.935-24.769 42.098-41.333 73.13-41.333 47.128 0 85.333 38.205 85.333 85.333 0 15.317-4.035 29.691-11.101 42.117M763.84 128c47.128 0 85.333 38.205 85.333 85.333s-38.205 85.333-85.333 85.333c-47.128 0-85.333-38.205-85.333-85.333 0-47.128 38.205-85.333 85.333-85.333M763.84 682.667c-0.021 0-0.047 0-0.072 0-39.16 0-74.203 17.626-97.628 45.378l-289.885-167.063c4.932-13.101 7.787-28.245 7.787-44.055 0-0.105 0-0.209 0-0.314 0-0.072 0-0.177 0-0.281 0-15.81-2.855-30.953-8.077-44.942l295.544-169.566c23.265 24.363 56.001 39.509 92.275 39.509 0.020 0 0.039 0 0.059 0 70.689 0 127.997-57.308 127.997-128 0-70.692-57.308-128-128-128-70.692 0-128 57.308-128 128 0 18.965 4.224 36.907 11.627 53.099l-292.288 168.747c-23.653-28.833-59.285-47.084-99.18-47.084-70.692 0-128 57.308-128 128 0 0.188 0 0.376 0.001 0.564-0.001 0.123-0.001 0.304-0.001 0.484 0 70.692 57.308 128 128 128 39.895 0 75.526-18.251 99.001-46.86l289.373 166.752c-5.397 13.568-8.529 29.29-8.533 45.743 0 70.582 57.308 127.889 128 127.889 70.692 0 128-57.308 128-128 0-70.692-57.308-128-128-128z"
          fill="#ffffff" p-id="2431"></path>
      </svg>
      &nbsp;Share</span>
    <a href="#">
      <svg t="1580195767061" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="2759" width="28" height="28">
        <path d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"
          p-id="2760" fill="currentColor"></path>
      </svg>
    </a>
    <a href="#">
      <svg t="1636429211504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="7037" width="32" height="32">
        <path d="M512 0C229.003636 0 0 229.003636 0 512s229.003636 512 512 512 512-229.003636 512-512S794.996364 0 512 0z m210.385455 641.396364c-7.447273 9.309091-26.996364-1.861818-41.89091-32.581819-3.723636 13.963636-13.032727 36.305455-34.443636 64.232728 35.374545 8.378182 44.683636 42.821818 33.512727 61.44-8.378182 13.032727-26.996364 24.203636-59.578181 24.203636-58.647273 0-83.781818-15.825455-95.883637-26.996364-1.861818-2.792727-5.585455-3.723636-10.24-3.723636-4.654545 0-7.447273 0.930909-10.24 3.723636-11.170909 11.170909-37.236364 26.996364-95.883636 26.996364-32.581818 0-52.130909-11.170909-59.578182-24.203636-12.101818-18.618182-1.861818-53.061818 33.512727-61.44-20.48-27.927273-29.789091-50.269091-34.443636-64.232728-13.963636 30.72-34.443636 42.821818-41.890909 32.581819-5.585455-8.378182-8.378182-26.065455-7.447273-38.167273 3.723636-46.545455 34.443636-85.643636 53.061818-106.123636-2.792727-5.585455-8.378182-40.029091 14.894546-63.301819v-1.861818c0-92.16 65.163636-158.254545 148.014545-158.254545 81.92 0 148.014545 66.094545 148.014546 158.254545v1.861818c23.272727 23.272727 17.687273 57.716364 14.894545 63.301819 17.687273 20.48 49.338182 59.578182 53.061818 106.123636 0.930909 12.101818-0.930909 29.789091-7.447272 38.167273z" fill="#30A5DD" p-id="7038"></path>
      </svg>
    </a>
    <a href="#">
      <svg t="1636429093715" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4602" width="32" height="32">
        <path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z" fill="#28C445" p-id="4603"></path>
        <path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
          fill="#28C445" p-id="4604"></path>
      </svg>
    </a>
    <a href="#">
      <svg t="1636429139540" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4865" width="32" height="32">
        <path d="M512 2c281.7 0 510 228.3 510 510s-228.3 510-510 510S2 793.7 2 512 230.3 2 512 2z m159.8 680.3c-4 3.9-4 10.2-0.2 14.1 0.4 0.5 0.9 0.9 1.5 1.2 22.1 20.4 36.4 47.9 40.4 77.7 6.2 22.4 29.7 35.7 52.4 29.5 22.5-5.9 35.9-28.9 30-51.3 0-0.1-0.1-0.2-0.1-0.4-4.7-16.8-19.3-29.1-36.7-30.8-28-5.1-53.5-19.2-72.8-40.1-4.1-3.8-10.5-3.8-14.5 0.1z m-225.7-483c-76.4 8.3-145.8 40.6-195.6 91-19.4 19.4-35.5 41.8-47.8 66.3-37.7 74.9-31.4 164.4 16.5 233.2 13.5 20.2 35.8 45.4 56.1 63.3l-9.2 71.3-1 3c-0.3 0.9-0.3 1.9-0.4 2.8l-0.2 2.3 0.2 2.3c1.2 12.7 12.5 22 25.2 20.9 3.5-0.3 6.8-1.4 9.8-3.1h0.4l1.4-1 22-10.8 65.5-32.5c31.1 8.8 63.4 13.2 95.8 13 40 0.1 79.8-6.7 117.5-20.2-18.8-6-30.9-24.3-29-44-39 12.4-80.2 16.4-120.8 11.9l-6.5-0.9c-14.7-1.9-29.2-4.9-43.4-8.9-7.8-2.4-16.1-1.5-23.3 2.4l-1.8 0.9-53.9 31.3-2.3 1.4c-1.3 0.7-1.9 1-2.6 1-2-0.1-3.5-1.8-3.4-3.8l2-8.2 2.4-8.9 3.9-14.7 4.5-16.4c3-9.2-0.3-19.2-8.2-24.8-21.1-15.5-39.5-34.4-54.4-56-37.9-54.2-43-124.8-13.3-183.8 9.9-19.5 22.9-37.4 38.4-52.9 40.9-41.6 98.3-68.1 161.9-74.9 22-2.4 44.2-2.4 66.2 0 63.2 7.2 120.4 34 161.1 75.4 15.4 15.7 28.2 33.6 37.9 53.2 12.5 24.8 19 52.3 19.1 80.1 0 2.9-0.3 5.8-0.4 8.6 16.8-10.2 38.4-7.7 52.4 6.1l1.9 2.3c3.3-41.2-4.8-82.5-23.3-119.5-12.1-24.5-28.1-46.8-47.3-66.3-52.5-52-121.4-84.3-194.9-91.7-26.4-3.4-52.9-3.5-79.1-0.7z m418.2 405.4c-7.2 1.9-13.8 5.7-19.2 11h-0.1c-6.9 6.8-11.2 15.7-12.2 25.3-5.2 27.8-19.5 53.1-40.5 72-4 3.8-4.1 10.1-0.3 14.1l0.1 0.1c4 4 10.5 4.1 14.6 0.1 0.5-0.5 0.9-0.9 1.2-1.5 20.9-21.9 48.7-36 78.7-39.8 22.8-6.1 36.2-29.2 30.1-51.6-6.2-22.5-29.6-35.8-52.4-29.7z m-160.4-42l-0.7 0.7c-20.9 22.7-49.2 37.3-79.9 41.2-22.6 5.9-36.2 28.7-30.2 51.1 1.9 7.3 5.9 14 11.3 19.3 16.7 16.4 43.7 16.4 60.4-0.1 6.8-6.8 11.1-15.7 12.2-25.2 5.3-27.8 19.6-53.1 40.7-72 4.1-3.7 4.5-10 0.9-14.1l-0.1-0.1c-4-4.2-10.4-4.5-14.6-0.8z m39.6-76.6c-7.1 1.9-13.6 5.7-18.7 10.8-16.4 16.2-16.6 42.6-0.4 59l0.5 0.5c6.9 6.8 15.9 11 25.5 12.1 28 5.1 53.6 19.1 72.9 39.9 4 4 10.4 4 14.4 0.1 4-3.8 4.1-10.1 0.3-14.1-0.5-0.5-1.1-1-1.7-1.4-22.1-20.4-36.4-47.8-40.4-77.6-6.1-22.4-29.6-35.5-52.4-29.3z"
          fill="#0082EF" p-id="4866"></path>
      </svg>
    </a>
  </button>
</div>
```

```css
.button {
  height: 200px;
  background-color: #fff;
}

.btn-share {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 100%;
  color: white;
  letter-spacing: 2px;
  background: #E6E9ED;
  border-radius: 80px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  transform: rotate(0);
  transition: 0.2s ease-in-out;
  margin: 10px 50px;
}

.btn-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #1F1E1E;
  border-radius: inherit;
  transition: 0.6s linear;
}

.button a {
  padding: 14px;
  color: #1c1d2a;
  opacity: 0;
  transform: translateX(-100%);
  transition: 0.3s;
}

a:nth-child(1) {
  transition-delay: 1s;
}

a:nth-child(2) {
  transition-delay: 0.8s;
}

a:nth-child(3) {
  transition-delay: 0.6s;
}

a:nth-child(4) {
  transition-delay: 0.4s;
}

.btn-share:hover {
  transform: scale(1.1);
}

.btn-share:hover .btn-overlay {
  transform: translateX(-100%);
  transition-delay: 0.25s;
}

.btn-share:hover a {
  opacity: 1;
  transform: translateX(0);
}
```

![](https://pan.udolphin.com/files/image/2021/11/0a891fa129831d06fac886afd9878b4c.gif)

```html
<div>
  <span class='T'>T</span>
  <span class='h'>h</span>
  <span class='a'>a</span>
  <span class='n'>n</span>
  <span class='k'>k</span>
  <span class='s'>s</span>
  <span class='！'>！</span>
</div>
```

```css
div {
  margin: auto;
  perspective: 2000px;
  transform-style: preserve-3d;
  font-size: 10vw;
  animation: fade 8s forwards;
}

span {
  position: relative;
  display: inline-block;
  min-width: .5rem;
  text-align: center;
  transform-style: preserve-3d;
  transform: rotateY(25deg);
  animation: rotate 8s ease-in forwards;
  color: black;
}

span:after,
span:before {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  content: attr(class);
  color: #867862;
  z-index: -1;
}

span:before {
  transform: translateZ(-14px);
}

span:after {
  transform: translateZ(-7px);
}

@keyframes fade {
  from {
    opacity: 0;
    transform: scale(1.2);
  }

  25% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotateY(60deg);
  }

  50%,
  100% {
    color: #746853;
    transform: rotateY(0deg);
  }

  100% {
    color: #867862;
  }
}
```

## 总结

上面说的都是对CSS3特性的基础认识和用法，CSS3的新特性还有好多，如果想要使用好这些特性，就必须多了解和多练习。用好CSS3，在项目开发上，会有很大帮助。希望大家在对CSS3有了深入了解之后，可以让自己的页面变得更加炫酷，更加好看。

感谢您的阅读，我是数字办的张敏，期待与您共同成长！！！