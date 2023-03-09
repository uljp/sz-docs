**Cascading Stylesheet**，简称**CSS** 。 其基本目标是让浏览器以指定的特性去绘制页面元素，比如颜色，定位，装饰。CSS的语法反映了这个目标，由下面两个部分构建：

* `属性（ property）`是一个标识符，用可读的名称来表示其特性。
* `值（value）`则描述了浏览器引擎如何处理该特性。每个属性都包含一个有效值的集合，它有正式的语法和语义定义，被浏览器引擎实现。
<br/>

**CSS 声明**

CSS的**核心功能**是将CSS属性设定为特定的值。一个属性与值的键值对被称为”声明“（declaration） 。CSS引擎会计算页面上每个元素都有哪些声明，并且会根据结果绘制元素，排布样式。

![属性：值](https://pan.udolphin.com/files/image/2021/8/3586e8cc3a06cb83a144bd11191d41cf.png)


# 跨时代的科技产物-浏览器

浏览器作为一个跨时代的科技产物，为现代网络人机交互的发展提供了强而有力的支持，浏览器发展史并不久远，虽然只有短短的20多年，但却不断在更新迭代，为广大互联网用户提供越来越强大的人机交互功能。

历史的时刻不应该被忘记，以下简单列举一些浏览器的历史时刻。

* 1993年，NCSA组织发布了Mosaic浏览器
* 1994年，网景公司发布了Navigator浏览器
* 1995年，微软公司发布了IExplorer浏览器，并掀起了浏览器之战
* 1996年，Navigator浏览器的市场份额达到86%，微软公司开始将IExplorer浏览器整合到Windows操作系统中
* 1996年，ASA公司发布了Opera浏览器
* 1998年，网景公司启动其开源产品，开始推出Mozilla
* 2001年，为人诟病的IExplorer 6发布，这货霸占国内市场十多年
* 2002年，网景公司发布了Firefox浏览器
* 2003年，苹果公司发布了Safari浏览器
* 2004年，IExplorer浏览器的市场份额达到了历史顶峰92%，自此以后其市场份额开始下滑
* 2006年，Firefox 3的发布创下了吉尼斯世界纪录，一天800万下载量
* 2008年，谷歌公司发布了Chrome浏览器

世界五大浏览器：Chrome、Safari、Firefox、Opera、IExplorer/Edge


# HTML的诞生

在1982年的时候，万维网的发明者Tim Berners-Lee为了让全世界的物理学家能够方便的进行合作与信息共享，创造了**HTML(HyperText Markup Language)** 超文本标记语言。

8年之后的1990年，世界上第一个浏览器WorldWideWeb诞生，也因此推动着互联网高速发展。

在WorldWideWeb问世之后，1993年，NCSA推出了Mosaic浏览器并且迅速火了起来，成为第一个世界级应用的浏览器，推动着互联网发展。

随后跟着的有当时的两大霸主Netscapede Netscape浏览器与MicroSoft的Internet Explorer浏览器，这两个浏览器在当时掀起了一场互联网浏览器大战。这场战争的结果是以Internet Explorer全胜告终。但也因此大大的推动了互联网的发展。

# CSS的诞生

就在承载HTML的浏览器迅猛发展的90年代，CSS (Cascading Style Sheet)也应运而生。不同的浏览器结合各自HTML 语法结构实现了很多不同的外部样式语法。

但随着HTML的发展，为了满足设计师的要求而增加了很多显示功能，随着这些功能的增加，外部样式语法作用越来越没有意义。

在1994年10月10日，CSS之父Håkon Wium Lie提出了 CSS 的最初建议，并且为 HTML 样式在芝加哥的一次会议上正式提出了 CSS 。

在1996 年 12 月，W3C在经过多方的讨论之后，推出了CSS1.0。这一规范一出现就引起了各方的注意，随即 MicroSoft 公司和 Netscape 公司纷纷表示自己的浏览器能够支持 CSS1.0。


## CSS的版本更新

CSS1.0在1997 年 由W3C发布，第一版主要规定了选择器、样式属性、伪类 / 对象几个大的部分；

CSS2.0/2.1在1998 年 由W3C发布，CSS2 规范是基于 CSS1 设计的，扩充和改进了很多更加强大的属性。包括选择器、位置模型、布局、表格样式、媒体类型、伪类、光标样式；

由于CSS2经历了 9 年的时间（从 2002 年 8 月到 2011 年 6 月）才达到 Recommendation（推荐） 状态，此后W3C为了加快那些已经确认没有问题的特性的标准化速度，便作出了一项被称为 Beijing doctrine 的决定，将CSS模块化，并且按照每个模块的进度来标准化。所以从形式上来讲，CSS3已经不存在了。

现在CSS 包括了修订后的 CSS2.1 以及完整模块对它的扩充，模块的 level（级别）数并不一致。可以在每个时间点上为 CSS 标准定义一个 snapshots（快照）。
下图为CSS模块化的发展进程图。

![](https://pan.udolphin.com/files/image/2021/8/ae78d402f289bd06da171b5e2ad62804.jpg)


## 为什么CSS脱颖而出？

**CSS 没有父级选择器**（一种基于子元素的样式给父元素设置样式的方法）。 这个问题在Stack Overflow上被频繁的提问（这是其中一个）。但是事实证明，这个特性缺失是有理由的。特别在互联网早期，让**网页在完全加载完成之前被渲染**，是很重要的。意思就是，大家希望HTML加载完之前，就可以渲染已经加载完的部分。

而当时可选择的其他语言是有父元素选择器的，父选择器意味着样式得在HTML文档一边加载时，一边更新。重复的修改、更新会导致会对渲染造成很大困扰，需要在HTML加载完成之后开始渲染。

在CSS中，一个文件的样式可以从其他的样式表中**继承**。读者在有些地方可以使用他自己更喜欢的样式，在其他地方则继承或“**层叠**”作者的样式。这种层叠的方式使作者和读者都可以灵活地加入自己的设计，混合每个人的爱好。


## CSS在浏览器中的工作流程

![image.png](https://pan.udolphin.com/files/image/2021/8/576a5a657762c7e53bff23f75c23d065.png)
 
### 浏览器渲染流程

* 渲染进程将 HTML 内容转换为能够读懂的 DOM 树结构。
* 渲染引擎将 CSS 样式表转化为浏览器可以理解的 styleSheets，计算出 DOM 节点的样式。
* 创建布局树，并计算元素的布局信息。
* 对布局树进行分层，并生成分层树。
* 为每个图层生成绘制列表，并将其提交到合成线程。
* 合成线程将图层分成图块，并在光栅化线程池中将图块转换成位图。
* 合成线程发送绘制图块命令 DrawQuad 给浏览器进程。
* 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上。

输入URL后，浏览器向服务器发起请求，在接收到第一批HTML页面时，DOM解析器就开始工作了，从上而下进行解析，在解析过程中，如果遇到JS脚本，将控制权交给JS引擎，等到JS执行完毕，浏览器继续从中断的地方开始解析DOM。

如果在JS中访问某个样式，这个时候需要等待这个样式下载完成才能继续往下执行。

在执行过程中，**CSS和JS都可能产生阻塞**。

DOM树、CSSOM树和渲染树三者的构建并无先后条件和先后顺序，并非完全独立而是会有交叉并行构建的情况。因此会形成一边加载，一边解析，一边渲染的工作现象。


### 一个完整的帧做了什么

接下来让我们一起来看看一帧内发生的事情：

![](https://pan.udolphin.com/files/image/2021/7/79ae0f05d8e3258048a379ac49cf27de.png)

回流和重绘和浏览器的事件循环有关（HTML）

* 浏览器刷新频率为60Hz，即每16.6ms更新一次
* 事件循环执行完成微任务
* 判断document是否需更新
* 判断resize/scroll事件是否存在，存在则触发事件
* 判断Media Query是否触发
* 更新动作并发送事件
* 判断document.isFullScreen是否为true(全屏)
* 执行requestAnimationFrame回调
* 执行IntersectionObserver回调
* 更新界面

可以看到媒体查询、动画是在开始帧之后的时候进行，之后重新进行布局，绘制，是浏览器原生特性。而在react项目中react利用最后空余时间去进行js操作。从操作的时机来看，用CSS实现交互性能更好。


### 回流重绘

回流必定引发重绘，重绘不一定引发回流。在优化性能前，需了解什么情况可能产生性能问题，以下罗列一些常见的情况。

* 改变窗口大小
* 修改盒模型
* 增删样式
* 重构布局
* 重设尺寸
* 改变字体
* 改动文字

### 常见的一些优化方法

**使用visibility:hidden替换display:none**

**使用transform代替top**

top是几何属性，操作top会改变节点位置从而引发回流，使用transform:translate3d(x,0,0)代替top，只会引发图层重绘，还会间接启动GPU加速。

**避免使用Table布局**

牵一发而动全身用在Table布局身上就很适合了，可能很小的一个改动就会造成整个回流。子元素回流重绘引起父元素回流重绘是非常浪费的。

**避免规则层级过多**

浏览器的CSS解析器解析css文件时，对CSS规则是从右到左匹配查找，样式层级过多会影响回流重绘效率，建议保持CSS规则在3层左右。

避免节点属性值放在循环里当成循环变量

```js
for (let i = 0; i < 10000; i++) {
  const top = document.getElementById("css").style.top
  console.log(top)
}
```

每次循环操作DOM都会发生回流，应该在循环外使用变量保存一些不会变化的DOM映射值。

```js
const top = document.getElementById("css").style.top
for (let i = 0; i < 10000; i++) {
  console.log(top)
}
```

**动态改变类而不改变样式**

不要尝试每次操作DOM去改变节点样式，这样会频繁触发回流。

更好的方式是使用新的类名预定义节点样式，在执行逻辑操作时收集并确认最终更换的类名集合，在适合时机一次性动态替换原来的类名集合。有点像vue的依赖收集机制，不知这样描述会不会更容易理解。

**将频繁回流重绘的节点设置为图层**

在上面渲染过程最后一步，提到将回流重绘生成的图层逐张合并并显示在屏幕上。可将其理解成Photoshop的图层，若不对图层添加关联，图层间是不会互相影响的。同理，在浏览器中设置频繁回流或重绘的节点为一张新图层，那么新图层就能够阻止节点的渲染行为影响别的节点，这张图层里怎样变化都无法影响到其他图层。

设置新图层有两种方式，将节点设置为或，为节点添加will-change。

**使用requestAnimationFrame作为动画帧**

动画速度越快，回流次数越多，上述有提到浏览器刷新频率为60Hz，即每16.6ms更新一次，而requestAnimationFrame()正是以16.6ms的速度更新一次。所以可用requestAnimationFrame()代替setInterval()。

**属性排序**

在进入属性排序这个话题前，先来看看以下两段CSS代码。

```css
.elem {
  width: 200px;
  background-color: #f66;
  align-items: center;
  color: #fff;
  height: 200px;
  justify-content: center;
  font-size: 20px;
  display: flex;
}
```

```css
.elem {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: #f66;
  font-size: 20px;
  color: #fff;
}
```

若不特别指明，可能各位同学觉得这两段代码无异样，顶多就是属性顺序不同。但仔细观察两段代码，就会发现第一段代码好像无依据地随便排列，而第二段代码好像按照某些规范顺序排列。

属性排序指按照预设规范排列属性。提供一个预设的约定规范，依据该规范以一定的顺序排列所有属性。

随机排列属性顺序，想到什么写什么，反正能实现就行。但反过来看，随意真的好吗，每次维护代码都需反复确认某个属性是否已经存在，混乱的属性排序让人有时无法在脑海里构思出更好的排版。所以了解和认识属性排序，利用一些约定规范合理管理CSS代码是不错的选择。


## 常用的CSS属性

### CSS选择器

CSS选择器是CSS中最基础的内容，它主要分为**基础选择器、层次选择器、
集合选择器、条件选择器、行为选择器、状态选择器、结构选择器、属性选择器**等。

分享一些常用的选择器分类，[CSS选择器分类表](https://wiki.uino.com/d/611c6d98b4132a5c3395fb5b.html)。

下面是分享一些常用的选择器~

**+：相邻同胞选择器**
**\~：通用同胞选择器**

![1629134531(1).png](https://pan.udolphin.com/files/image/2021/8/efad057ce9e9b2a83149285eb5bab709.png)

```html
<div>
   <ul className="list">
   </ul>
   <ul className="list"> 
   </ul>
   <ul className="list">
   </ul>
</div>
```

```css
div {
  box-shadow: 0 0 0 9999px rgba(#000, 0.5);
}
.list {
  width: 200px;
  height: 300px;
  line-height: 2;
  font-weight: bold;
  font-size: 20px;
  color: #f66;
  background-color: #09f;
  & + .list {
    margin-left: 20px;
    background-color: #3c9;
  }
}
```


**empty：当前元素为空时显示**

![](https://pan.udolphin.com/files/image/2021/8/d730e24b839e2df5788d14c93537749b.gif)

**例：当前内容为空**

当当前div内无任何元素时，显示empty设置的样式。
```html
<div>
  <ul className="empty-list">
    {addList.map((res, index) => (
      <li key={index}>{"item" + index}</li>
    ))}
  </ul>
  <div className="buttonCtrl">
    <button onClick={add}>add</button>
    <button onClick={remove}>remove</button>
  </div>
</div>
```

```css
$empty: "https://yangzw.vip/img/empty.svg";
.empty-list {
  overflow-y: auto;
  overflow-x: hidden;
  width: 600px;
  height: 200px;
  margin: 0 auto;
  outline: 1px solid #3c9;
  &:empty {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url($empty) no-repeat center/100px auto;
    &::after {
      margin-top: 90px;
      font-weight: bold;
      content: "没钱就没数据";
    }
  }
  li {
    padding: 0 10px;
    height: 30px;
    width: 100%;
    background-color: #09f;
    line-height: 30px;
    color: #fff;
    &:nth-child(even) {
      background-color: #f90;
    }
  }
}
.buttonCtrl {
  text-align: center;
}
```


**:not()：非指定条件的元素
:hover：鼠标悬浮的元素
:focus：输入聚焦的表单元素
:valid：输入合法的表单元素
:invalid：输入非法的表单元素
:checked：选项选中的表单元素
:placeholder-shown：占位显示的表单元素
:nth-child(n)：元素中指定顺序索引的元素**

**例：表单校验**

![](https://pan.udolphin.com/files/image/2021/8/848a4e9936fe2e240c978b453134b56c.gif)

```html
<div className="auth">
  <input id="login-btn" type="radio" name="auth" checked hidden />
  <input id="logon-btn" type="radio" name="auth" hidden />
  <div className="auth-title">
    <label htmlFor="login-btn">登录</label>
    <label htmlFor="logon-btn">注册</label>
    <em></em>
  </div>
  <div className="auth-form">
    <form>
      <div>
        <input
          type="text"
          placeholder="请输入手机"
          pattern="^1[3456789]\d{9}$"
          required
        />
        <label>手机</label>
      </div>
      <div>
        <input
          type="password"
          placeholder="请输入密码(6到20位字符)"
          pattern="^[\dA-Za-z_]{6,20}$"
          required
        />
        <label>密码</label>
      </div>
      <button type="button">登录</button>
    </form>
    <form>
      <div>
        <input
          type="text"
          placeholder="请输入手机"
          pattern="^1[3456789]\d{9}$"
          required
        />
        <label>手机</label>
      </div>
      <div>
        <input
          type="password"
          placeholder="请输入密码(6到20位字符)"
          pattern="^[\dA-Za-z_]{6,20}$"
          required
        />
        <label>密码</label>
      </div>
      <button type="button">注册</button>
    </form>
  </div>
</div>
```

```css
.auth {
  overflow: hidden;
  border-radius: 2px;
  width: 340px;
  margin: 0 auto;
  background-color: #fff;
  &:hover {
    // box-shadow: offset-x offset-y blur(模糊半径) spread color position(outset，inset)
    box-shadow: 0 0 0 9999px rgba(#000, 0.5);
  }
  .auth-title {
    display: flex;
    position: relative;
    border-bottom: 1px solid #eee;
    height: 40px;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 100%;
      cursor: pointer;
      transition: all 300ms;
      &:hover {
        color: #66f;
      }
    }
    em {
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 1px;
      width: 50%;
      height: 2px;
      background-color: #f66;
      transition: all 300ms cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }
  }
  .auth-form {
    display: flex;
    width: 200%;
    height: 300px;
    transition: all 300ms cubic-bezier(0.4, 0.4, 0.25, 1.35);
    form {
      flex: 1;
      padding: 20px;
    }
    div {
      display: flex;
      flex-direction: column-reverse;
      & + div {
        margin-top: 10px;
      }
    }
    input {
      padding: 5px 10px;
      border: 1px solid #e9e9e9;
      border-radius: 2px;
      height: 40px;
      outline: none;
      transition: all 300ms;
      &:focus:valid {
        border-color: #09f;
      }
      &:focus:invalid {
        border-color: #f66;
      }
      &:not(:placeholder-shown) + label {
        height: 30px;
        opacity: 1;
        font-size: 14px;
      }
    }
    label {
      overflow: hidden;
      padding: 0 10px;
      height: 0;
      opacity: 0;
      line-height: 30px;
      font-weight: bold;
      font-size: 0;
      transition: all 300ms;
    }
    button {
      margin-top: 10px;
      border: none;
      border-radius: 2px;
      width: 100%;
      height: 40px;
      outline: none;
      background-color: #09f;
      cursor: pointer;
      color: #fff;
      transition: all 300ms;
    }
  }
}
#login-btn:checked {
  & ~ .auth-title {
    label:nth-child(1) {
      font-weight: bold;
      color: #f66;
    }
    em {
      transform: translate(0, 0);
    }
  }
  & ~ .auth-form {
    transform: translate(0, 0);
  }
}
#logon-btn:checked {
  & ~ .auth-title {
    label:nth-child(2) {
      font-weight: bold;
      color: #f66;
    }
    em {
      transform: translate(160px, 0);
    }
  }
  & ~ .auth-form {
    transform: translate(-50%, 0);
  }
}
```

### CSS函数

##### 属性函数

**attr()：属性**

![1629136486(1).png](https://pan.udolphin.com/files/image/2021/8/1ddcc71e14c66727be45e49b7a22a6d2.png)

```html
<h1 className="hello" data-name="我是attr()函数"></h1>
```

```css
.hello {
  width: clamp(500px, 25vw, 1000px);
  color: #fff;
  background-color: #66f;
  text-align: center;
  &::before {
    content: attr(class);
  }
  &::after {
    content: attr(data-name);
  }
}
```

**var()：变量**

CSS使用变量有如下好处。增加样式代码的扩复性，提高样式代码的灵活性，
增多一种CSS与JS的通讯方式。不用深层遍历DOM改变某个样式。

**可是为什么不用sass和less再多此一举呢？**变量对比Sass变量和Less变量又有它的过人之处。浏览器原生特性，无需经过任何转译可直接运行，DOM对象一员，极大便利了CSS与JS间的联系。

需要的同学可以通过阮一峰老师的教程了解一下。
[http://www.ruanyifeng.com/blog/2017/05/css-variables.html](CSS变量教程)
```css
/* 不使用变量 */
.title {
  background-color: pink;
}
.desc {
  background-color: pink;
}

/* 使用变量 */
:root {
  --bg-color: pink;
}
.title {
  background-color: var(--bg-color);
}
.desc {
  background-color: var(--bg-color);
}
```


##### 数学函数

**clamp()：区间范围值**

width: clamp(500px, 25vw, 1000px);

```css
width:25vw;
min-width:500px
max-width:1000px
```

**max()：最大值**

width: max(1200px, 50%);

```css
width:50%;
min-width:1200px
```

**min()：最小值**

width: min(1200px, 80%);

```css
width:80%;
max-width:1200px
```

**calc()：计算**

calc()计算最大的特点就是，可以vw，vh，百分比，px 混合进行加减乘除运算。可以动态计算一些宽、高属性值。

例：
```css
width: calc(100% - 20px);
min-width: calc(100vw - 10%);
max-width: calc(1000px - 10vw);
```
<br>  
**counter()：计数器**

**counter-reset：设置某个选择器出现次数的计数器的值。默认为 0。**

**counter-increment：递增一个或多个计数器值。**

**counters()：嵌套计数器**

**例：九宫格**

![](https://pan.udolphin.com/files/image/2021/8/23f405a355a980e5cfb484c65126cef8.gif)
```html
<div className="sectionSel">
  <ul className="list" id="list">
    {addList.map((res, index) => (
      <li className={res} key={index}></li>
    ))}
  </ul>
  <div className="controlBtn">
    <button onClick={add}>add</button>
    <button onClick={remove}>remove</button>
  </div>
</div>
```

```css
$icon: "https://img2.baidu.com/it/u=348010947,1343160071&fm=26&fmt=auto&gp=0.jpg";

.list {
  position: relative;
  margin: 0 auto;
  display: grid;
  width: 300px;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  padding: 0;
  counter-reset: count;
  gap: 2px;
}
.item {
  aspect-ratio: 1;
  background: url($icon) repeat center/100px auto;
  background-color: #9c3;
}
.item:nth-child(9) ~ .item {
  position: absolute;
  width: calc(100% / 3 - 1px);
  counter-increment: count;
  visibility: hidden;
  right: 0;
  bottom: 0;
}
.item:nth-child(8) ~ .item:last-child::before {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.2);
}

.item:nth-child(9) ~ .item::before {
  content: "+" counter(count);
  display: grid;
  height: 100%;
  place-content: center;
  font-size: 30px;
  color: #fff;
}

.controlBtn {
  margin: 20px auto;
  text-align: center;
}
```

```js
function add(){
  const item = document.createElement('li');
  item.className="item";
  list.append(item)
}
function remove(){
  list.removeChild(list.lastElementChild)
}
```

### 阴影

box-shadow

阴影作为一个常用的属性，它无疑是有很多**好处**的：

> 阴影不影响布局，可能会覆盖其他节点及其阴影
> 阴影不触发滚动条，也不会增加滚动区域大小。

而它除了作为点缀视觉元素存在，还可以聚焦区域，作为导航提示存在。区域内部透明，凸显增加内容，而区域外部会带上一层蒙层，兼容其他内容。

![image.png](https://pan.udolphin.com/files/image/2021/8/446779fb97e5946da9319e79f716556c.png)

可以看到设置阴影后我们可以很顺利的把目光聚焦到表单上。这个效果可用box-shadow实现，将spread延长到9999px足以覆盖整个页面了。

有不需要border占位的需求的同学，也可以使用box-shadow设置边框。

```css
box-shadow: 0 0 0 9999px rgba(#000, 0.5);
```
<br>
最后推荐一个网站，[csstriggers](https://csstriggers.com/)，可以看到CSS属性改变影响回流还是重绘。

# 总结

本文介绍了CSS的工作流程以及常用的选择器，函数等CSS属性，通过高效方式实现同样的效果，精确的尺寸计算、合理的布局，可以实现几乎所有你想要的效果！让CSS发挥它应有的作用，让JS回到适合它的位置。这样高效的配合大概是每个人都梦寐以求的吧！！！
<br/>
希望可以让各位读者对css的一些使用技巧有更好的了解，能够快速实现自己想要的效果。
<br/>

感谢您的阅读，我是数字办的鲁璐，期待与您共同成长！！！