# Canvas简介

## 什么是Canvas

在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 中是这样定义 `<canvas>` 的：

> `<canvas>` 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形。例如，它可以用于绘制图形、制作照片、创建动画，甚至可以进行实时视频处理或渲染。

我们大概可以这么理解：

1. `Canvas`是HTML5中的一个新标签，属于h5的新特性。和`audio`、`video`元素类似完全不需要任何外部插件就能够运行？
2. `Canvas`标签是一个图形的容器，简单点来说就是一块画布，你可以在上面画矩形，圆形，三角形，折线等，也可以用来画logo。
3. 它是通过`JavaScript`来画的，即脚本绘制图形

一句话总结`Canvas`是什么？

`Canvas` 是为了解决 `Web` 页面中只能显示静态图片这个问题而提出的，一个可以使用 `JavaScript` 等脚本语言向其中绘制图像的 `HTML` 标签。我们可以认为`<canvas>`标签只是一个矩形的画布。`JavaScript`就是画笔，负责在画布上画画。

## Canvas能够做什么

* 基础图形的绘制
* 文字的绘制
* 图形的变形和图片的合成
* 图片和视频的处理
* 动画的实现
* 小游戏的制作

## Canvas出现的背景

在互联网出现的早期，Web 只不过是静态文本和链接的集合。1993 年，有人提出了 `img` 标签，它可以用来嵌入图像。

由于互联网的发展越来越迅猛，Web 应用已经从 Web 文档发展到 Web 应用程序。但是图像一直是静态的，人们越来越希望在其网站和应用程序中使用动态媒体（如音频、视频和交互式动画等），于是 `Flash` 就出现了。

但是随着 Web 应用的发展，出现了`HTML5`，在 `HTML5` 中，浏览器中的媒体元素大受青睐。包括出现新的 `Audio` 和 `Video` 标签，可以直接将音频和视频资源放在 Web 上，而不需要其他第三方。

其次就是为了解决只能在 Web 页面中显示静态图片的问题，出现了`Canvas`标签。它是一个绘图表面，包含一组丰富的 `JavaScript API`，这些 `API`使你能够动态创建和操作图像及动画。`img` 对静态图形内容起到了哪些作用，`Canvas` 就可能对可编写脚本的动态内容起到哪些作用。

## 支持的浏览器

Canvas 已经受到了主流浏览器的支持，并且支持情况良好，具体支持情况如下：

|Chrome|IE|Firefox|Safari|Opera|
|---|---|---|---|---|
|4.0+|9.0+|2.0+|3.1+|9.0+|

# Canvas的基本用法

## <canvas>元素

```
<canvas id="tutorial" width="150" height="150"></canvas>
```

`canvas`的标签只有两个属性，`width`和`height`，如果没有设置宽度和高度的时候，`canvas`会初始化宽度为`300px`和高度为`150px`。

`canvas`也可以使用`css`来定义大小，但是如果`css`的尺寸与初始画布的比例不一致，它会出现扭曲，因此一般建议使用`canvas`的`width`和`height`属性为`<canvas>`明确规定它的宽高，而不使用`css`。

## 替换内容

`canvas`元素就像`video`和`audio`元素一样，很容易定义一些替代内容。在一些比较老的浏览器（尤其是IE9之前的IE浏览器）或者文本浏览器中不支持HTML元素`<canvas>`，这些浏览器上总是能看到展示替代内容。

我们只是在`<canvas>`标签中提供了替换内容。不支持`<canvas>`的浏览器将会忽略容器并在其中渲染后备内容。而支持`<canvas>`的浏览器将会忽略在容器中包含的内容，并且只是正常渲染`canvas`。

## </ canvas>标签不可省

`<canvas>`元素需要结束标签(`</canvas>`)，如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

## 渲染上下文

`canvas`元素创造了一个固定大小的画布，它公开了一个或者多个渲染上下文，其可以用来绘制和处理要展示的内容。`canvas`起初是个空白的，首先脚本需要找到渲染上下文，然后在它的上面绘制。`canvas`元素有一个叫做`getContext()`的方法，可以用来获得渲染上下文和它的绘画功能。对于2D图像而言，可以使用 `CanvasRenderingContext2D`。

```
var canvas = document.getElementById('tutorial');
// 获得 2d 上下文对象
var ctx = canvas.getContext('2d');
```

## 检查支持性

替换内容是用于在不支持`canvas`标签的浏览器中展示的，可以通过`getContent()`的方法是否存在，脚本可以检查编程支持性，上面的代码可以变成这样：

```
var canvas = document.getElementById('tutorial');
if(canvas.getContext){
	var ctx = canvas.getContext('2d');
  // drawing code here
} else {
	// canvas-unsupported code here
}
```

## 最初的模板骨架

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="text/javascript">
    draw(() => {
      const canvas = document.getElementById('tutorial');
      if (!canvas.getContext) return; //这里是将不支持canvas标签的浏览器 直接return了
      const ctx = canvas.getContext('2d');
    })
  </script>
  <style type="text/css">
    canvas {
      border: 1px solid black;
    }
  </style>
</head>

<body onload="draw();">
  <canvas id="tutorial" width="150px" height="150px"></canvas>
</body>

</html>
```

> **注意：**当页面在加载结束的时候就会执行draw()的函数。

我们看到的页面最初是空白的：

![](https://pan.udolphin.com/files/image/2022/5/dc65e4cd23b2a4e4e0422d3ea1155297.png)

# 使用Canvas绘制图形

## 栅格和坐标空间

![](https://pan.udolphin.com/files/image/2022/5/87caddb115161cb94ff6ba956c5e191a.png)

`canvas`元素默认被网格所覆盖，通常来说网格中的一个单元相当于`canvas`元素中的一像素。

栅格的起点为左上角，坐标为`(0,0)`，所有元素的位置都相对于原点定位。上图中蓝色正方形左上角的坐标为距离左边(X轴)x像素，距离上面(Y轴)y像素，因此坐标为`(x,y)`。

## 绘制矩形

`canvas`只支持一种原生的图形绘制：矩形。所有其他图形都至少需要生成一种路径。不过我们可以通过生成众多路径的方法来绘制复杂图形。

`canvas`提供了三种方法绘制矩形：

* `fillRect(x,y,width,height)`绘制一个填充的矩形。
* `strokeRect(x,y,width,height)`绘制一个矩形的边框。
* `clearRect(x,y,width,height)`清除指定矩形区域，让清除部分完全透明。

下面我们通过代码来展示一下绘制的效果：（学习过程中需要挨个注释掉查看效果）

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="application/javascript">
    function draw() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      // 绘制一个简单的填充矩形
      ctx.fillStyle = 'blue';
      ctx.fillRect(20, 10, 150, 100);

      // 绘制一个简单的边框矩形
      ctx.strokeStyle = 'blue';
      ctx.strokeRect(20, 10, 160, 100);

      // 绘制一个带有阴影和粗斜面轮廓的矩形
      ctx.shadowColor = 'yellow';
      ctx.shadowBlur = 10;
      ctx.lineJoin = 'bevel';
      ctx.lineWidth = 15;
      ctx.strokeStyle = '#38f';
      ctx.strokeRect(30, 30, 200, 100);

      // 清除整个画布（效果未在下图展示）
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 清除一部分画布
      // 绘制黄色背景
      ctx.beginPath();
      ctx.fillStyle = '#ff6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(10, 10, 120, 100);
    }
  </script>
</head>

<body onload="draw();">
  <canvas id="canvas"></canvas>
</body>

</html>
```

我们看到的效果依次是这样的：

![](https://pan.udolphin.com/files/image/2022/5/9bbf2fde6f837818f9f4a01ee1c94107.png)

![](https://pan.udolphin.com/files/image/2022/5/6e50bcecae42020a5d0d986d04a359b5.png)

![](https://pan.udolphin.com/files/image/2022/5/0ee6d9ae0773c41c4164916604160d78.png)

![](https://pan.udolphin.com/files/image/2022/5/2cf122757f9f00006d96a0d31fae0933.png)

## 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。

使用路径绘制图形需要一些额外的步骤：

1. 首先，需要创建路径起始点
2. 然后使用画图命令去画出路径
3. 之后你把路径封闭起来
4. 一旦路径生成，就可以通过描边或填充路径区域来渲染图形

在这过程中我们会用到以下函数：

* `beginPath()`：新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
* `closePath()`：闭合路径之后图形绘制命令又重新指向到上下文中。
* `stroke()`：通过线条来绘制图形轮廓。
* `fill()`：通过填充路径的内容区域生成实心的图形。

第一步叫做beginPath()。其实路径是有很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

> **注意：**当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo()，无论实际上是什么，我们都要在设置路径之后专门指定你的起始位置。

第二步就是调用函数指定绘制路径。

第三步就是闭合路径closePath()，不是必需的，这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

> **注意：**当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是会调用stroke()时不会自动闭合。

### 移动笔触

这个函数实际上是不能画出任何东西的，它是属于上面所描述的路径列表的一部分，这个函数就是`moveTo()`。如果不好理解的话，可以自己想象一下，一支钢笔或者钢笔的笔尖从一个点到另一个点的移动过程。

`moveTo(x,y)`：将笔触移动到指定的坐标x以及y上。

当canvas初始化或者`beginPath()`调用后，通常会使用`moveTo()`函数设置起点，也可以使用`moveTo()`绘制一些不连续的路径。

### 绘制直线

绘制直线，我们就会用到`lineTo()`方法。

`lineTo(x,y)`绘制一条从当前位置到指定x以及y位置的直线。

此方法有两个参数，x以及y，代表坐标系中直线结束的点。开始点和之前的绘制路径有关，之前路径的结束点就是接下来的开始点。开始点也可以通过`moveTo()`函数改变。

### 绘制三角形

我们通过绘制两个三角形来对比一下：

```
      // 填充三角形
      ctx.beginPath(); //新建一条路径
      ctx.moveTo(25, 25); //把画笔移动到指定的坐标
      ctx.lineTo(110, 25); //绘制一条从当前位置到指定坐标(110, 25)的直线
      ctx.lineTo(25, 110); //再绘制一条从当前位置到指定坐标(25, 110)的直线
      ctx.fill(); // //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径
```

此时我们看到的效果是这样的：

![](https://pan.udolphin.com/files/image/2022/5/7be94099c0a39886b3f3c551fef093f6.png)

```
      // 描边三角形
      ctx.beginPath(); //新建一条路径
      ctx.moveTo(25, 25); //把画笔移动到指定的坐标
      ctx.lineTo(110, 25); //绘制一条从当前位置到指定坐标(110, 25)的直线
      ctx.lineTo(25, 110); //再绘制一条从当前位置到指定坐标(25, 110)的直线
      ctx.closePath(); // 闭合路径
      ctx.stroke(); // 描边，stroke不会自动closePath()
```

![](https://pan.udolphin.com/files/image/2022/5/222904eb8b16253651e7828ed08454fa.png)

### 绘制圆弧

绘制圆弧的方法有两种：

1. arc(x, y, r, startAngle, endAngle, anticlockwise)

以(x, y)为圆心，以r为半径，从startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)

该方法有六个参数：

`x,y` 为绘制圆弧所在圆上的圆心坐标。

`radius`为半径。

`startAngle`和`endAngle`参数用弧度定义了开始以及结束的弧度。这些都是以x轴为基准。

`anticlockwise`为布尔值。如果为true，是逆时针方向，false为顺时针方向。

> **注意：**`arc()`函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式为：弧度=(Math.PI/180)\*角度。

```
      // 绘制不同弧度的圆弧
      ctx.beginPath();
      ctx.arc(50, 50, 40, 0, Math.PI / 2, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(150, 50, 40, 0, -Math.PI / 2, true);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(50, 250, 40, -Math.PI / 2, Math.PI / 2, false);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(150, 150, 40, 0, Math.PI, false);
      ctx.fill();
```

![](https://pan.udolphin.com/files/image/2022/5/c25a824e616b8163b00462c60da504b8.png)

2.arcTo(x1, y1, x2, y2, radius)

根据给定的控制点和半径画一段圆弧，最后再以直线连接到两个控制点。

```
      ctx.beginPath();
      ctx.moveTo(50, 50);
      //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数5：圆弧半径
      ctx.arcTo(200, 50, 200, 200, 100);
      ctx.lineTo(200, 200)
      ctx.stroke();
      
      ctx.beginPath();
      ctx.rect(40, 40, 10, 10); // 起始点
      ctx.rect(200, 40, 10, 10); //控制点1
      ctx.rect(200, 200, 10, 10); //控制点2
      ctx.fill()
```

![](https://pan.udolphin.com/files/image/2022/5/95b0ab40776c6f35b84de655cd1cdeab.png)

arcTo方法的说明：

* 该方法绘制的弧形是有两条切线所决定的
* 第一条切线：起始点和控制点1决定的直线
* 第二条切线：控制点1和控制点2决定的直线
* 绘制的圆弧就是与这两条直线相切的圆弧

### 绘制贝塞尔曲线

#### 什么是贝塞尔曲线

贝塞尔曲线(Bézier curve)，又称贝兹曲线或贝济埃曲线，是应用于二维图形应用程序的数学曲线。

一般的矢量图形软件通过它来精确画出曲线，贝兹曲线由线段与节点组成，节点是可拖动的支点，线段像可伸缩的皮筋，我们在绘图工具上看到的钢笔工具就是来做这种矢量曲线的。

贝塞尔曲线是计算机图形学中相当重要的参数曲线，在一些比较成熟的位图软件中也有贝塞尔曲线工具和PhotoShop等。在Flash5里面已经提出贝塞尔曲线工具。

贝塞尔曲线于1962年，由法国工程师皮埃尔·贝塞尔（Pierre Bézier）所广泛发表，他运用贝塞尔曲线来为汽车的主体进行设计。贝塞尔曲线最初由Paul de Casteljau于1959年运用de Casteljau演算法开发，以稳定数值的方法求出贝兹曲线。

#### 一次贝塞尔曲线（线性贝塞尔曲线）

一次贝塞尔曲线其实就是一条直线。

#### 二次贝塞尔曲线

quadraticCurveTo(cp1x, cp1y, x, y)：

**说明：**

参数1和2：控制点坐标

参数3和4：结束点坐标

```
      ctx.beginPath();
      ctx.moveTo(10, 200); // 起始点
      var cp1x = 40; cp1y = 100; // 控制点1
      var x = 200; y = 200; // 结束点
      // 绘制二次贝塞尔曲线
      ctx.quadraticCurveTo(cp1x, cp1y, x, y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.rect(10, 200, 10, 10);
      ctx.rect(cp1x, cp1y, 10, 10);
      ctx.rect(x, y, 10, 10);
      ctx.fill();
```

![](https://pan.udolphin.com/files/image/2022/5/f97ceecd559666907909f74734aface8.png)

#### 三次贝塞尔曲线

bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)：

**说明：**

参数1和2：控制点1的坐标

参数3和4：控制点2的坐标

参数5和6：结束点的坐标

```
      ctx.beginPath();
      ctx.moveTo(40, 200); //起始点
      var cp1x = 20, cp1y = 100;  //控制点1
      var cp2x = 100, cp2y = 120;  //控制点2
      var x = 200, y = 200; // 结束点
      //绘制三次贝塞尔曲线
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(40, 200, 10, 10);
      ctx.rect(cp1x, cp1y, 10, 10);
      ctx.rect(cp2x, cp2y, 10, 10);
      ctx.rect(x, y, 10, 10);
      ctx.fill();
```

![](https://pan.udolphin.com/files/image/2022/5/eb91b0f9925b1a708dd08fc433767f4f.png)

# 使用样式和颜色

在前面的绘制矩形章节中，只用到了默认的线条和颜色，如果想要给图形上色，有两个重要的属性：`fillStyle`和`strokeStyle`。

> **注意：**
>
> * `color`可以是表示css颜色值的字符串，渐变对象或者图案对象
> * 默认情况下，线条和填充颜色都是黑色(css颜色值：#000)
> * 一旦您设置了`strokeStyle`或者`fillStyle`的值，那么这个新值就会成为新绘制的图形的默认值。
> * 如果你要给每个图形上不同的颜色，你需要重新设置`fillStyle`或`strokeStyle`的值。
> * globalAlpha属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为使用rgba()设置透明度更加好一些。

## fillStyle

fillStyle = color：设置图形的填充颜色

## strokeStyle

strokeStyle = color：设置图形轮廓的颜色

## Transparency(透明度)

globalAlpha = transparencyValue：这个属性影响到canvas里所有图形的透明度，有效的值范围是0.0（完全透明）到1.0（完全不透明），默认是1.0。

globalAlpha属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为使用rgba()设置透明度更加好一些。

## Line styles(线型)

* lineWidth = value：设置当前绘线的粗细。只能是正值。默认是1.0。

起始点和终点的连线为中心，**上下各占线宽的一半**

* lineCap = type：线条末端样式

该属性共有三个值：

butt：线段末端以方形结束(默认值)

round：线段末端以圆形结束

square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

* lineJoin = type：同一个path内，设定线条与线条间接合处的样式

该属性有三个值：

round：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度。

bevel：在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角。

miter（默认）：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

* miterLimit = type：限制当两条线相交时交接处最大长度；所谓交接处长度(斜接长度)是指线条交接处内角顶点到外角顶点的长度。
* getLineDash()：返回一个包含当前虚线样式，长度为非负偶数的数组。
* setLineDash(segments)：设置当前虚线样式。
* setLineDash：接受一个数组，来指定线段与间隙的交替。
* lineDashOffset = type：设置虚线样式的起始偏移量。

## Gradients(渐变)

* createLinearGradient(x1,y1,x2,y2)：接受4个参数，表示渐变的起点(x1,y1)与终点(x2,y2)。
* createRadialGradient(x1,y1,r1,x2,y2.,r2)：接受6个参数，前三个定义一个以(x1,y1)为原点，半径为r1的圆，后三个参数则定义另一个以(x2,y2)为原点，半径为r2的圆。
* gradient.addColorStop(position, color)：接受2个参数，`position`参数必须是一个0.0与1.0之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。

## Patterns(图案样式)

createPattern(image, type)：接受2个参数，image可以是一个`image`对象的引用，或者另一个canvas对象，`type`必须是下面的字符串值之一：`repeat`，`repeat-x`，`repeat-y`，`no-repeat`。

> **注意：**用canvas对象作为image参数在Firefox 1.5(Geko 1.8)中是无效的。

## Shadows(阴影)

* shadowOffsetX = float
* shadowOffsetY = float

`shadowOffsetX` 和 `shadowOffsetY` 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为`0`。

* shadowBlur = float

`shadowBlur` 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 `0`。

* shadowColor = color

`shadowColor` 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

## Canvas填充规则

canvas的填充规则有两个可能的值：

* `"nonaero"`: non-zero winding rule, 该属性为**默认值。**
* `"evenodd"`: even-odd winding rule。绘制文本

# 绘制文本

## 绘制文本的两种方法

* fillText(text, x, y \[, maxWidth\])：在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的。
* strokeText(text, x, y \[, maxWidth\])：在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的。

```
      ctx.font = "100px Microsoft YaHei"
      ctx.fillText("生椰拿铁", 50, 100);
      ctx.strokeText("生椰拿铁", 50, 230)
```

![](https://pan.udolphin.com/files/image/2022/5/57e82d0bfb474676440c6b24f3b00bf5.png)

## 给文本添加样式

* font = value：该属性我们可以用来绘制文本的样式，这个字符串使用和CSS font属性相同的语法. 默认的字体是10px sans-serif。
* textAlign = value：文本对齐选项，可选的值包括：start,end,left,rightorcenter。默认值是start。
* textBaseline = value：基线对齐选项，可选的值包括：top,hanging,middle,alphabetic,ideographic,bottom。默认值是alphabetic。
* direction = value：文本方向，可选的值包括：ltr,rtl,inherit。默认值是inherit。

> 这和我们最熟悉的css非常相似，上述的选项相信大家也都非常熟悉。

## 预测量文本宽度

measureText()：此方法将返回一个`TextMetrics`对象的宽度、所在像素，这些体现文本特性的属性。

当你需要获得更多的文本细节时，可以通过`measureText()`方法来获取。

我们通过一段代码来展示如何测量文本的宽度：

```
      var text = ctx.measureText("我们是来自数字办的生椰拿铁团队"); // TextMetrics object
      console.log(text.width); // 150
```

# 绘制图片

我们也可以在`canvas`上直接绘制图片。

## 由零开始创建图片

### 创建 <img>元素

```
var img = new Image();  // 创建一个<img>元素
img.src = 'myImage.png';  // 设置图片源地址
```

脚本执行后图片开始装载。

### 绘制img

```
//参数1：要绘制的img  参数2、3：绘制的img在canvas中的坐标
ctx.drawImage(img,0,0); 
```

> **注意：**若调用drawImage的时候图片还没有完全加载完成，那什么都不会发生（在一些旧的浏览器中可能会抛出异常）。因此我们应该用load事件来保证不会再加载完毕之前使用这个图片。

```
var img = new Image();  // 创建img元素
img.onload = function() {
  // 执行drawImage语句
}
img.src = 'myImage.png';  //设置图片源地址
```

如果只用到一张图片的话，这样已经足够了，但是一旦需要不止一张图片，那就需要更加复杂的处理方法：**图片预加载策略，**此处不做详细介绍。

## 绘制 img标签元素中的图片

我们可以使用drawImage方法将它渲染在canvas中，drawImage方法有三种形态，drawImage(image, x, y)是最基础的一种。其中image是image或者canvas对象，x和y是其在目标canvas里的起始坐标。

```
// js
      var canvas = document.getElementById('canvas');
      if (!canvas.getContext) return;
      var ctx = canvas.getContext('2d');
      var img = document.querySelector("img");
      ctx.drawImage(img, 0, 0);
      
// html
	 <img src="./img.png" alt="" width="300" onclick=draw()>
    <canvas id="canvas" width="1200px" height="600px"></canvas>
```

![](https://pan.udolphin.com/files/image/2022/5/66208896cb9c62848d40ad373d98b6a8.gif)

上图中左边的图片就是页面中的<img>标签

## 缩放图片

drawImage ()也可以再添加两个参数：

drawImage (image, x, y, width, height)这个方法多了2个参数：width和height,这两个参数用来控制当向canvas画入时应该缩放的大小。

```
ctx.drawImage(img, 0, 0, 400, 200)
```

> **注意：**图像可能会因为大幅度的缩放而变得起杂点或者模糊，如果您的图像里面有文字，那么最好还是不要进行缩放，因为那样处理之后很可能图像里的文字就会变得无法辨认了。

## 切片

drawImage ()方法的第三个也是最后一个变种有8个新参数，用于控制做切片显示的。

drawImage ( image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight )第一个参数和其它的是相同的，都是一个图像或者另一个canvas的引用。

其他的8个参数：

前4个是定义图像源的切片位置和大小

后4个是定义切片的目标显示位置和大小

![](https://pan.udolphin.com/files/image/2022/5/79a705cb7e3d6335f21b270f6e81a493.jpeg)

# 状态的保存和恢复

## save()

保存画布(canvas)的所有状态。

`Canvas`状态存储在栈中，每当`save()`方法被调用后，当前的状态就被推送到栈中保存，一个绘画状态包括：

* 当前应用的变形（即移动，旋转和缩放）
* strokeStyle,fillStyle,globalAlpha,lineWidth,lineCap,lineJoin,miterLimit,shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor,globalCompositeOperation 的值
* 当前的裁切路径（ clipping path）

> **注意：**可以调用任意多次save方法。（类似数组的push()）

## restore()

`save`和`restore`方法是用来保存和恢复`canvas`状态的，都没有参数。`canvas`的状态就是当前画面应用的所有样式和变形的一个快照。

每一次调用restore()方法，上一个保存的状态就从栈中弹出，所有设定都恢复。（类似数组的pop()）

## save和restore应用示例

* 首先我们使用默认设置画一个大四方形，然后保存一下状态。
* 改变填充颜色画第二个小一点的灰色四方形，然后再保存一下状态。
* 再次改变填充颜色绘制更小一点的白色四方形。
* 我们一旦调用restore,状态栈中最后的状态会弹出，并恢复所有设置。

> **注意：如果之前没有用**save保存状态，那么我们就需要手动改变设置来回到前一个状态，这个对于两三个属性的时候还是适用的，一旦多了，我们的代码将会猛涨。

当第二次调用restore时，已经恢复到最初的状态，因此最后是再一次绘制出一个黑色的四方形。

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById('canvas');
      if (!canvas.getContext) return;
      var ctx = canvas.getContext('2d');
      ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
      ctx.save();                  // 保存默认状态

      ctx.fillStyle = '#B2B2B2'       // 在原有配置基础上对颜色做改变
      ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

      ctx.save();                  // 保存当前状态
      ctx.fillStyle = '#FFF'       // 再次改变颜色配置
      ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

      ctx.restore();               // 重新加载之前的颜色状态
      ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

      ctx.restore();               // 加载默认颜色配置
      ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形
    }

  </script>
</head>

<body onload="draw();">
  <div>
    <canvas id="canvas" width="1200px" height="600px"></canvas>
  </div>
</body>

</html>
```

![](https://pan.udolphin.com/files/image/2022/5/41b7020b52c895599b80013ab022facc.png)

# 变形

## translate

translate(x, y) 用来移动 canvas 的原点到指定的位置

translate方法接受两个参数，x 是左右偏移量，y 是上下偏移量，如下图所示：

![](https://pan.udolphin.com/files/image/2022/5/9ceef3be4da6b0039052772649463a22.jpeg)

> 注意：在做变形之前先保存状态是一个良好的习惯，大多数情况下，调用restore 方法比手动恢复原先的状态要简单的多。又如果你是在一个循环中做位移但没有保存和恢复 canvas 的状态，很可能到最后会发现怎么有些东西不见了，那是因为它很可能已经超出 canvas 范围以外了。
>
> translate 移动的是 canvas 的坐标原点。（坐标变换）

```
      ctx.save(); //保存坐原点平移之前的状态
      ctx.translate(100, 100);
      ctx.strokeRect(0, 0, 100, 100)
      ctx.restore(); //恢复到最初状态 注意：如果不加这句，下面的原点坐标就要从（100，100）算起
      ctx.translate(220, 220);
      ctx.fillRect(0, 0, 100, 100)
```

![](https://pan.udolphin.com/files/image/2022/5/cc27938982374d880b3fe43d5f6e6fd4.png)

## rotate

rotate(angle) 旋转坐标轴

这个方法只接受一个参数：旋转的角度(angle), 它是顺时针方向的，以弧度为单位的值。

旋转的中心是坐标原点。

![](https://pan.udolphin.com/files/image/2022/5/cf6644e976a0f8b0ddd46e4cffcd6980.jpeg)

```
      ctx.fillStyle = "#B2B2B2";
      ctx.save();  //保存坐原点平移之前的状态
      ctx.translate(50, 50);
      ctx.fillRect(0, 0, 50, 50)
      ctx.restore();  //恢复到最初状态

      ctx.save();
      ctx.translate(200, 200);
      ctx.rotate(Math.PI / 180 * 45);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();  
```

![](https://pan.udolphin.com/files/image/2022/5/06ef40f16a66c1fb508d0dcbaf6de2ea.png)

## scale

scale(x, y)

我们用它来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。

scale方法接受两个参数。x, y分别是横轴和纵轴的缩放因子，它们都必须是正值。值比1.0小表示缩小，比1.0大则表示放大，默认值为1.0时，为实际大小。

默认情况下，canvas的 1 单位就是 1 个像素。举例说，如果我们设置缩放因子是 0.5，1 个单位就变成对应 0.5 个像素，这样绘制出来的形状就会是原先的一半。同理，设置为 2.0 时，1 个单位就对应变成了 2 像素，绘制的结果就是图形放大了 2 倍。

## transform

transform(a, b, c, d, e, f)

这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵，如下面的矩阵所示：![](https://pan.udolphin.com/files/image/2022/5/c7e63dc2360fa1d6f650126f229f7f6d.png)

如果任意一个参数是Infinity，变形矩阵也必须被标记为无限大，否则会抛出异常。该方法是取消了当前变形，然后设置为指定的变形，一步完成。

这个函数的参数各自代表如下：

a (m11)

* 水平方向的缩放

b (m12)

* 竖直方向的倾斜偏移

c (m21)

* 水平方向的倾斜偏移

d (m22)

* 竖直方向的缩放

e (dx)

* 水平方向的移动

f (dy)

* 竖直方向的移动

```
      ctx.transform(3, 1, 0, 3, 30, 30);
      ctx.fillRect(0, 0, 100, 100);
```

![](https://pan.udolphin.com/files/image/2022/5/c560f40ad3244fd345ecb8d6d31353ff.png)

# 合成

在前面的示例中，我们总是将一个图形画在另一个之上，对于其他更多的情况，仅仅这样是远远不够的。比如，对合成的图形来说，绘制顺序会有限制，不过我们可以利用globalCompositeOperation属性来改变这种状况。

globalCompositeOperation = type这个属性设定了在画新图形时采用的遮盖策略。

在这里我主要讲几个属性：

* source-over：这个是默认设置，新图像会覆盖在原有图像。
* source-in：仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。（包括其他的老图像区域也会透明）
* source-out：仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。（老图像也不会显示）
* source-atop：新图像仅仅显示与老图像重叠区域，老图像仍然可以显示。
* destination-over：新图像会在老图像的下面
* destination-in：仅仅新老图像重叠部分的老图像被显示，其他区域全部透明。
* destination-out：仅仅老图像与新图像没有重叠的部分。注意显示的是老图像的部分区域。
* destination-atop：老图像仅仅显示重叠部分，新图像会显示在老图像的下面。

# 裁剪路径

剪裁路径和普通的canvas图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。如下图所示，红边五角星就是裁切路径，所有在路径以外的部分都不会在canvas上绘制出来。

![](https://pan.udolphin.com/files/image/2022/5/4f885e7e3a3f4449171f4c22698f1ff2.png)

在上面我们只介绍了stroke和 fill 方法，下面我们再介绍第三个方法clip 。

## clip

把已经创建的路径转换成裁剪路径。

> **注意：**clip()只能遮罩在这个方法调用之后绘制的图像，如果是clip()方法调用之前绘制的图像，则无法实现遮罩。

```
      ctx.beginPath();
      ctx.arc(50,50, 100, 0, Math.PI * 2); //绘制的剪裁路径
      ctx.clip(); //先创建，后调用，隐藏剪掉部分
      
      ctx.fillStyle = "pink";
      ctx.fillRect(50, 50, 200,200);
```

![](https://pan.udolphin.com/files/image/2022/5/54a2ffadb427f575a6193f52172af235.png)

# 动画

## 动画的基本步骤

**1.清空canvas**

再绘制每一帧动画之前，需要清空所有。清空所有最简单的做法就是clearReact()方法。

**2.保存canvas状态**

如果在绘制的过程中会更改canvas的状态（颜色、移动了坐标原点等），又在绘制每一帧时都是原始状态的话，则最好保存一下canvas的状态。

**3.绘制动画图形**

这一步才是真正的绘制动画帧

**4.恢复canvas状态**

如果你前面保存了canvas状态，则应该在绘制完成一帧之后恢复canvas状态，然后重绘下一帧。

## 控制动画

我们可通过canvas的方法或者自定义的方法把图像绘制到canvas上。正常情况，我们能看到绘制的结果是在脚本执行结束后。比如说，在for循环里做完成动画是不太可能的。

也就是说，为了执行动画，我们需要一些可以定时执行重绘的方法。

一般会用到下面三个方法：

* setInterval()
* setTimeout()
* requestAnimationFrame()

## 案例

### 刮刮卡

刮刮卡对于大家来说都不陌生吧，懂的人都懂哈，当我们刮开上面的这层灰皮之后，就能看到下面的答案了。

首先我们先讲解一下思路：

1. 底层答案就是一个普通的div盒子，顶部的灰色遮罩是由canvas制作的。
2. 最开始先将canvas盖住 div
3. 添加鼠标事件，点击并移动时，鼠标经过的路径都画图形，并设置我们上面所讲到的globalCompositeOperation为destination-out，使鼠标经过的路径都变成透明。
4. 此时变成透明之后，自然就会显示下方的答案信息。

下面我们来写代码：

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>刮刮乐</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    #text {
      position: absolute;
      left: 230px;
      top: 125px;
      z-index: -1;
    }
  </style>
  <script type="application/javascript">
    function draw() {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')

      ctx.fillStyle = '#B2B2B2'  // 遮罩层的颜色
      ctx.fillRect(50, 50, 500, 200)  // 填充矩形 fillRect(起始X,起始Y,终点X,终点Y)
      ctx.fillStyle = '#fff' //绘制文字颜色
      ctx.font = '30px Arial';  //绘制文字大小和字体
      ctx.fillText('刮刮卡', 250, 150)  //绘制填充文字

      let isDraw = false;
      canvas.onmousedown = () => {
        isDraw = true;
      }
      canvas.onmousemove = (e) => {
        if (!isDraw) return;
        // 计算鼠标在canvas里的位置
        const x = e.pageX - canvas.offsetLeft
        const y = e.pageY - canvas.offsetTop
        // 设置globalCompositeOperation
        ctx.globalCompositeOperation = 'destination-out'
        // 画圆
        ctx.arc(x, y, 10, 0, 2 * Math.PI)
        // 填充圆形
        ctx.fill()
      }
      canvas.onmouseup = () => {
        isDraw = false;
      }

      // 设置奖品
      const prizes = ['一杯奶茶', '谢谢惠顾', '一次codeReview', '开心一整天', '一次技术分享'];
      function getPrizesVal(prizes) {
        if (prizes.length < 1) return;
        const index = Math.floor((Math.random() * prizes.length));
        return prizes[index];
      }
      const text = document.getElementById('text');
      text.innerHTML = `恭喜您获得${getPrizesVal(prizes)}`;
    }
  </script>
</head>

<body onload="draw();">
  <canvas id="canvas" width="900px" height="600px"></canvas>
  <div id="text"></div>
</body>

</html>
```

![](https://pan.udolphin.com/files/image/2022/5/02100f4651d94edf2ea9dd01d12c0832.gif)

### 模拟时钟

想要实现时钟转动的效果，大概分为以下几个步骤：

1. 找到canvas的中心，画出表心，以及表框
2. 获取当前时间，并根据时间画出时针，分针，还有刻度
3. 使用定时器，每过一秒获取新的时间，并重新绘图，达到时钟转动的效果

#### 表心，表框

画表心，表框需要用到我们前面所讲述的两个知识点：

* 找到canvas的中心位置
* 绘制圆形

```
// js
function draw() {
  var canvas = document.getElementById('canvas');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  // 设置中心点，此时300，300变成了坐标的0，0
  ctx.translate(300, 300)
  // 画圆线使用arc(中心点X,中心点Y,半径,起始角度,结束角度)
  ctx.arc(0, 0, 100, 0, 2 * Math.PI)
  ctx.arc(0, 0, 5, 0, 2 * Math.PI)
  // 执行画线段的操作stroke
  ctx.stroke();
}

//html
<canvas id="canvas" width="600" height="600"></canvas>
```

此时我们看到的效果是这样的：

![](https://pan.udolphin.com/files/image/2022/5/10b604e68d451d42912e25e5c1c3fade.png)

很明显这并不是我们想要的效果，我们原本是想要画两个独立的圆，现在还多出来了一条线段。

其实原因也很简单：上面的代码画两个圆时，是连着画的，所以在画完大圆后，现还没斩断，就接着画小圆了，这样的话，两个圆肯定是会连在一起的，那么我们的解决方法就是：beginPath, closePath。

```
// js
function draw() {
	var canvas = document.getElementById('canvas');
	if (!canvas.getContext) return;
	var ctx = canvas.getContext('2d');
	ctx.translate(300, 300)

	// 开始画大圆
	ctx.beginPath();
	ctx.arc(0, 0, 100, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();

	// 开始画小圆
	ctx.beginPath();
	ctx.arc(0, 0, 5, 0, 2 * Math.PI)
	ctx.stroke();
	ctx.closePath();
}

// html
<canvas id="canvas" width="600" height="600"></canvas>
```

#### 时针，分针，秒针

画这三个指针，需要用到我们前面所讲述的两个知识点：

* 根据当前时，分，秒去计算角度。
* 在计算好的角度上，分别画出时针，分针，秒针

那么我们应该怎么去画这些指针呢？

我们以时针为例：

比如当前是3点，那么时针就应该是以12点为起始点，顺时针旋转2 \* Math.PI / 12 \* 3 = 90°

分针和秒针也是同样的道理，只不过跟时针不同的是比例问题，因为时针在表中有12份，而分针和秒针都是60份。

![](https://pan.udolphin.com/files/image/2022/5/d3c6d678ed8c7bff19daa84b6b2dc1ee.png)

这时候又有一个新问题，还是以上面的例子为例，我算出了90°，那我们怎么画出时针呢？此时我们就可以使用moveTo和lineTo去画线段，至90°，我们只需要将x轴顺时针旋转90°，然后再画出这条线段，那就得到了指定角度的指针了，但是我们上面说了，是要以12点为起始点，我们的默认x轴是水平的，所以我们算出时针秒针的角度之后，还要减去最初的90°。

但此时又会有新的问题了，比如现在我画完了时针，然后想画分针，x轴已经在我画时针的时候偏转了，所以此时是需要让x轴恢复到原来的模样，这样我们才能继续画分针，否则画出来的分针是不准的。此时我们上面讲到的 `save`和 `restore`就派上用场了。

> save是把ctx当前的状态打包压入栈中，restore是取出栈顶的状态并赋值给ctx，save可多次，但是restore取状态的次数必须等于save次数

```
// js 
function draw() {
  var canvas = document.getElementById('canvas');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  ctx.translate(300, 300)
  
  // 把状态保存起来
  + ctx.save();
  
  // 开始画大圆
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
  
  // 开始画小圆
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI)
  ctx.stroke();
  ctx.closePath();
  
  -------- 新加代码 --------
  
  // 获取当前 时，分，秒
  let time = new Date();
  let hour = time.getHours() % 12; // 这里是12小时制
  let min = time.getMinutes();
  let sec = time.getSeconds();
  
  // 时针
  console.log(2 * Math.PI / 12 * 3);
  ctx.rotate(2 * Math.PI / 12 * hour + 2 * Math.PI / 12 * (min / 60) - Math.PI / 2) //计算旋转角度
  ctx.beginPath()
  // moveTo设置画线起点
  ctx.moveTo(-10, 0)
  // lineTo设置画线经过点
  ctx.lineTo(40, 0)
  // 设置线宽
  ctx.lineWidth = 10
  ctx.stroke()
  ctx.closePath()
  // 恢复成上一次save的状态
  ctx.restore()
  // 恢复完再保存一次
  ctx.save()
  
  // 分针
  ctx.rotate(2 * Math.PI / 60 * min + 2 * Math.PI / 60 * (sec / 60) - Math.PI / 2)
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(60, 0)
  ctx.lineWidth = 5
  ctx.strokeStyle = 'gray'
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
  
  //秒针
  ctx.rotate(2 * Math.PI / 60 * sec -  - Math.PI / 2)
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(80, 0)
  ctx.strokeStyle = 'red'
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
  ctx.save()
}
```

此时我们已经成功一半了，效果就是这样的：

![](https://pan.udolphin.com/files/image/2022/5/243a7bc5035f3b703a90696ba459b183.png)

#### 刻度

接下来就是画刻度了，起始刻度的道理跟时分秒针的道理是一样的，只不过刻度是死的，不需要计算，只需要规则的画出60个小刻度，和12个大刻度即可。

```
--------- 在上述代码中新增 js -------------
  
// 画小刻度
ctx.lineWidth = 1
for (let i = 0; i < 60; i++) {
  ctx.rotate(2 * Math.PI / 60)
  ctx.beginPath()
  ctx.moveTo(90, 0)
  ctx.lineTo(100, 0)
  ctx.strokeStyle = 'gray'
  ctx.stroke()
  ctx.closePath()
}
ctx.restore()
ctx.save()

// 画大刻度
ctx.lineWidth = 5
for (let i = 0; i < 12; i++) {
  ctx.rotate(2 * Math.PI / 12)
  ctx.beginPath()
  ctx.moveTo(85, 0)
  ctx.lineTo(100, 0)
  ctx.stroke()
  ctx.closePath()
}
ctx.restore()  
```

![](https://pan.udolphin.com/files/image/2022/5/501af28cdf5099ab9736392ddc6e83c9.png)

#### 更新视图

最后一步就是更新视图了，我们想要时钟转动起来，首先想到的就是定时器setInterval,

但是我们需要注意一个问题：每次更新视图的时候都要把上一次的画布清除，再开始画新的视图，不然就会出现这样的情况：

![](https://pan.udolphin.com/files/image/2022/5/d5559df8a69a455f9dff4cbdd0a6a1f8.png)

最后的完整代码就在这里啦：

```
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById('canvas');
      if (!canvas.getContext) return;
      var ctx = canvas.getContext('2d');
      setInterval(() => {
        ctx.save()
        ctx.clearRect(0, 0, 600, 600)
        ctx.translate(300, 300)
        // 把状态保存起来
        ctx.save()

        // 开始画大圆
        ctx.beginPath();
        ctx.arc(0, 0, 100, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        // 开始画小圆
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.closePath();

        // 获取当前 时，分，秒
        let time = new Date();
        let hour = time.getHours() % 12; // 这里是12小时制
        let min = time.getMinutes();
        let sec = time.getSeconds();

        // 时针
        console.log(2 * Math.PI / 12 * 3);
        ctx.rotate(2 * Math.PI / 12 * hour + 2 * Math.PI / 12 * (min / 60) - Math.PI / 2) //计算旋转角度
        ctx.beginPath()
        // moveTo设置画线起点
        ctx.moveTo(-10, 0)
        // lineTo设置画线经过点
        ctx.lineTo(40, 0)
        // 设置线宽
        ctx.lineWidth = 10
        ctx.stroke()
        ctx.closePath()
        // 恢复成上一次save的状态
        ctx.restore()
        // 恢复完再保存一次
        ctx.save()

        // 分针
        ctx.rotate(2 * Math.PI / 60 * min + 2 * Math.PI / 60 * (sec / 60) - Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(-10, 0)
        ctx.lineTo(60, 0)
        ctx.lineWidth = 5
        ctx.strokeStyle = 'gray'
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        ctx.save()

        //秒针
        ctx.rotate(2 * Math.PI / 60 * sec -  - Math.PI / 2)
        ctx.beginPath()
        ctx.moveTo(-10, 0)
        ctx.lineTo(80, 0)
        ctx.strokeStyle = 'red'
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        ctx.save()

        // 画小刻度
        ctx.lineWidth = 1
        for (let i = 0; i < 60; i++) {
          ctx.rotate(2 * Math.PI / 60)
          ctx.beginPath()
          ctx.moveTo(90, 0)
          ctx.lineTo(100, 0)
          ctx.strokeStyle = 'gray'
          ctx.stroke()
          ctx.closePath()
        }
        ctx.restore()
        ctx.save()

        // 画大刻度
        ctx.lineWidth = 5
        for (let i = 0; i < 12; i++) {
          ctx.rotate(2 * Math.PI / 12)
          ctx.beginPath()
          ctx.moveTo(85, 0)
          ctx.lineTo(100, 0)
          ctx.stroke()
          ctx.closePath()
        }
        ctx.restore()
        ctx.restore()
      },1000)
    }
  </script>
</head>

<body onload="draw();">
  <div>
    <canvas id="canvas" width="600" height="600"></canvas>
  </div>
</body>

</html>
```

![](https://pan.udolphin.com/files/image/2022/5/84084115191172af0cb6452dedf57acd.gif)

这样一个时钟就画好了，效果是不是很奈斯呀～

# 总结

本文主要讲述了关于canvas的一些基础的用法，以及在使用canvas中的一些小技巧，在最后的案例中我们可以使用canvas去实现一些简单的动画效果，希望通过本次的分享能够让大家对canvas有一个基础的了解，并且能够使用canvas绘制出自己想要的动画效果。

---

参考链接：

* [Canvas API](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
* [学习HTML5 Canvas这一篇文章就够了](https://blog.csdn.net/u012468376/article/details/73350998?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165034897416780271542235%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165034897416780271542235&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-73350998.142^v9^pc_search_result_cache,157^v4^new_style&utm_term=canvas&spm=1018.2226.3001.4187)
* [为了让她10分钟入门canvas，我熬夜写了3个小项目和这篇文章](https://juejin.cn/post/6986785259966857247#heading-0)