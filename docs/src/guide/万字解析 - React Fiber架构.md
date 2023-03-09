## 前言

> React 16 is the first version of React built on top of a new core architecture, codenamed “Fiber.” You can read all about this project over on Facebook’s engineering blog. (Spoiler: we rewrote React!)

  `这是React官方在2017年9月26日发布的一篇名为《React v16.0》的博客中的一段文字，从这一版本开始React引入了一个新的核心架构叫做“Fiber”，从此开启了一个新的属于Fiber的纪元。
       虽然我看到这段文字已经是接近4年之后，但是在看到那句“we rewrote React!”的时候，依旧可以感受到一丝震撼与澎湃，宛若一剂强心针不偏不倚的刺在了我不知其所以然且不以为然的心脏上。整理此文章以做长征路上的马前一卒，目前全文10814字，预计阅读35分钟，文中如有不到不正之处，望请斧正！`

> 7月12日：
>   注意：并不是标题党，目前只完成目标总题量的45%，会在后续3天内（15号晚12点前）完成全部内容更新！
> Flag：不到1万字，少一个字请来薅掉我1根头发。

> 7月14日：
>    目前已经完成总题量的75%，明天将会完成全部内容！

> 7月15日：
>    今天已完成全部内容更新。


---

## 虚拟DOM与调和

### DOM 与 虚拟DOM

**什么是DOM？**

就英文单词的解释是Document Object Model，直译过来就是文档对象模型。在前端开发中通常指的就是HTML中的渲染树，广义上也可以指安卓开发中的空间树。


**什么是虚拟DOM？**

   简单地说，虚拟DOM就是一个用来表示真实DOM的数据结构。React作为第一个引入了虚拟DOM的主流框架，它的设计思想是：每个组件在每次渲染时会创建一个新的Virtual DOM，React会把新的Virtual DOM树与现有的相比较，然后将一系列转变应用于真实DOM。

这样做带来的好处是显而易见的，从此我们只需要去描述组件的状态和DOM之间的关系，就可以将状态渲染成视图。

> 事实上任何应用都有状态，并不是因为我们使用现代比较流行的框架之后才有了状态，现代框架只是为我们揭露了一个事实，那就是我们的关注点应该始终聚焦在状态维护上，而不是在DOM操作上，DOM操作其实完全是可以忽略掉的。

这段话出自刘博文老师的《深入浅出Vuejs》，他很清晰的指出了状态与DOM之间的关系，我们只需要去维护状态，框架会帮助我们把状态渲染成视图。

### 为什么要使用虚拟DOM？直接操作DOM存在什么问题？

我们为什么要使用虚拟DOM？让我们先来看一下在使用虚拟DOM之前，我们是怎么进行工作的。

**上古时代的Web前端**

那时候盛行的技术是前端三剑客，也称前端三板斧，即HTML、CSS和JS，掌握了这三样，就可以进行前端开发了，后面又出现了JQuery这样好用的库和CSS3的动画帧加持，让前端开发彻底花里胡哨起来。

但是这里存在着两方面的问题，一方面是耦合严重，另一方面是性能消耗。

**耦合严重**

还记得那时经常在网上可以下到各种各样或是炫酷或是新奇的网页，但是当打开源码的时候发现，一个index.html文件动辄几千行，css、js、html标签，所有的代码都放在这里，即便是把js拆成几个文件，把css拆成几个文件，你也不知道这几百行js都是在干什么。

因为没有做model和view层的抽离设计，它的表现逻辑和业务逻辑是完全耦合在一起的，就像是一家里爸爸负责赚钱，妈妈负责做家务，这样家庭是可以正常运行的，但是现在爸爸又做家务又转起，妈妈又赚钱又做家务，从编程设计的角度上说这样设计是很不清晰的。

**性能消耗**

性能消耗方面其实分为两点，第一是跨界交流引发的性能消耗，第二是修改DOM引发的重排重绘。

先说跨界交流，DOM属于渲染引擎，而JS属于JS引擎，在浏览器内核中他们彼此独立，单独来看两者都是很快的，但当我们用JS去操作dom的时候，引擎之间进行了“跨界交流”，这个“跨界交流”的实现并不简单，它依赖了桥接接口作为“桥梁”，每一次的通信都要收取一定费用。
![](https://pan.udolphin.com/files/image/2021/7/bfdd08113c7ce4c6b38a50fab145c867.png)
既然是收费桥梁，过桥就要交过桥费，我们每一次操作DOM，不管是为了修改还是仅仅用于访问，都要过一次桥，次数一多就会产生比较明显的性能问题。

并且修改DOM属性的代价是很昂贵的，他会导致渲染引擎重新计算几何变化（重排和重绘）。如下图所示：

![](https://pan.udolphin.com/files/image/2021/7/acd24baee8a43a9a9057a5cbac3c8e0a.png)

### 不使用虚拟DOM的解决办法

虚拟DOM的出现当然不只是为了解决这两个问题，如果只是这两个问题完全没必要引入虚拟DOM。那我们来看看在使用虚拟DOM解决方案之前，是如何进行性能优化的。

**减少跨界操作次数，合并操作**

JS在每次访问DOM的时候都要经过这座桥，并缴纳“过桥费”，访问的次数越多，费用也就越高。因此我们可以采用的办法就是尽量的减少过桥的次数，合并我们的操作，用最少的次数去完成JS与DOM之间的通信。

比如说我们有这样一个场景，我们要给一个列表街上一些数据，那么最坏的方式就是这样：

``` js
for(let i = 0; i < arr.length; i++){
	const li = document.createElement('li');
         li.innerHTML = arr[i];
         ul.appendChild(li);
}	
```

如果是这种方式，那么数组的长度是多少，我们就需要操作多少次DOM，就会引发多少次重绘。如果我们换一种方式，将所有的更新都放到一个js对象里，最后一次性更新到DOM上，那么无论多么复杂的DOM操作，最终都会只出发一次渲染流程。

但是优化DOM的方式有很多，不一定非要依赖虚拟DOM，所以这并不是我们需要虚拟DOM的根本原因，根本原因还是响应式需求。

**响应式**

如果我们通过js直接操作DOM的话，那势必会造成视图数据与模型数据不匹配，我们希望能不能只让开发者关系状态的变化，而无需关心控件操作呢？当然可以，React中提出的一个重要思想就是：`状态改变则UI随之自动改变！`每次状态有变动就重构用户界面，重新渲染整个view。如果没有虚拟DOM，简单粗暴的做法就是直接重置innerHTML，在大部分数据都变动的情况下重置innerHTML还算合理，但是如果只有一行数据变了，那么这样重置显然就会有大量的资源浪费。

所以最终我们为了实现这两件事，第一通过数据驱动视图，第二最大程度的降低对最终视图的修改，从而提高页面渲染效率，开始使用虚拟DOM。

### 虚拟DOM的优势

虚拟DOM的优势在于，第一可以保证性能下限，框架的虚拟DOM需要适配任何上层API 可能产生的操作，所以它带来的并不是超高的性能，而是数据不管怎么变化，都可以使用最小的代价来更新DOM，保证你不进行任何手动优化的情况下，依然可以提供稳定的还不错的性能，保证性能的下限。

第二就是掩盖了底层的DOM操作，让我们可以用更加声明式的方式来描述目的，我们只需要管好代码逻辑，管理好状态，最终虚拟DOM会通过他们的数据规则和调和，帮助我们以可预期的方式更新视图，极大提高开发效率的同时又让代码更易于维护。

第三是它的跨平台性，虚拟DOM是DOM在内存中的一种轻量级表达方式，是一种统一约定，也就是说可以通过不同的渲染引擎生成不同平台下的UI。就像在RN中与React不同的是，React中虚拟DOM最终会映射为浏览器DOM，而RN中虚拟DOM会通过JavaScriptCore映射为原生控件树。

### Reconciliation - 调和

> The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

这是React在解释Virtual DOM的时候写道的一段话，这里提到了一个关键词叫做**Reconciliation**，这里译为**调和**。调和的目的是在用户无感知的情况下将数据的更新同步到UI上，上文有提到React会把新的Virtual DOM树与现有的相比较，然后将一系列转变应用于真实DOM，这个过程就是一次调和的过程。

### 小结

![](https://pan.udolphin.com/files/image/2021/7/438b3955c9e1f8a8f1b2f3f7f938ce89.png)

---

## React Fiber 解决了什么问题？

### 同步更新的局限

一次调和的过程包含很多事情，比如调用各个组件的生命周期函数、计算和比对虚拟DOM树、最后更新DOM树。这整个过程是同步进行的，也就是说只要一个挂载或者更新过程开始，那么React就会携带着一腔孤勇，以不破楼兰终不还的气概，一鼓作气莽到底，中途全不停歇。

表面上看，这样的设计倒也是挺合理的，因为更新过程不会有任何I/O操作，完全是CPU计算，所以无需异步操作，的确只需要一路狂奔就可以了，但是，当组件树比较庞大的时候，那么问题就来了。

假如说更新一个组件需要1毫秒，如果有200个组件就是200毫秒。众所周知现在的浏览器都有很多进程和线程，但是分给JS用的只有那一根线程，同步更新就要求这唯一的一根线程要专心致志工作，无暇顾及其他任何事情。想象这样一个场景，用户想在一个input标签中输入点什么，但此时恰逢React正在进行一次调和，那么此时敲击键盘不会获得任何响应。因为此时这跟线程正在被React占着呢，分身乏术，最后导致的结果就是，用户敲了按键，但看不到反应，等React这次调和结束之后，咔咔咔刚才按键的操作一下子都出现在了input标签里。这也就是造成界面卡顿的一个主要原因，会造成非常不好的用户体验。

那在react15版本的时候，如果组件树很大，就会出现这样的问题，因为调和的过程是同步的一层组件套一层组件逐渐深入的过程，在更新完所有组件更新之前它是不会停的，函数的调用栈就会像下图这样，调用的很深，而且很长时间不会返回。

![](https://pan.udolphin.com/files/image/2021/7/7ced119243604c1c141559a79e59d74f.png)

因为JavaScript单线程的特点，每个同步任务不能耗时太长，不然就会让程序对其他的输入无法做出响应。那么为了解决这个问题，FB团队花了近两年的时间近乎重写了React，引入了我们开篇提到的Fiber架构。

### React Fiber 思想

在说Fiber架构之前，我们先思考这样一个场景，我们有一块铁板，我们要烤饼、烤肉、蔬菜。同一时间我们只能烤一类食物，现在有一块很大块儿的牛肉，我们要将它烤熟，在烤这块牛肉的时候我们不能烤其他任何东西。我们当然可以等十几分钟把一整块肉都烤熟，然后再烤其他的东西，但是我相信没人会这样做。出于对食物的渴望以及一定程度的本能，我们大概率会将肉先切成片儿，然后烤饼，烤肉，烤菜，卷起来吃掉，然后继续。

解决同步更新耗时过长的办法也是切片，把一个耗时长的任务分成很多个小片，每一个小片的运行时间很短，虽然总时长依然会很长，但是每个小片执行完之后，都会给其他任务一个执行机会，这样唯一的线程就不会被独占，其他任务依然会有运行的机会。

基于这个原理，React Fiber把一次更新过程碎片化，执行过程就会如下图所示：

![](https://pan.udolphin.com/files/image/2021/7/1db6fc6a87212e31f55c9a05dfd93f10.png)
每执行完一段更新，就会把控制权交还给react负责任务协调的模块，看看有没有其他更紧急的任务要去做，如果没有就继续更新，如果有，那就去做更紧急的任务。这幅图里面的每一个波谷就是深入执行一个小分片的过程，每一个波峰就是一个分片执行结束交换控制权的场景，这就是React Fiber思想。

除了进程（Process）和线程（Thread）的概念，在计算机科学中还有一个概念，叫做Fiber，英文含义是纤维。意思就是指比Thread更细的线，也就是比线程控制的更精密的并发处理机制。要注意这里的计算机科学里面的Fiber和React Fiber不是同一个概念，但是React团队把这个功能命名为React Fiber，其寓意也是更加紧密的处理机制，比Thread更细。

### Fiber 对于现有代码的影响

在经过Fiber架构处理之后，一次调和的过程中分为两个阶段，分别是render阶段和commit阶段，需要注意的是，这里的render并不是渲染的意思，而是一次对于Virtual DOM与真实DOM进行Diff的过程，在这个过程中会收集变化，在随后的commit的阶段一股脑的更新到真实DOM上去。

也就是说在render的过程中，是可以被打断的，被更高优先级的任务打断后，刚才的render过程不管执行到哪一步了，都会重头再来。那么这时候问题就出现了，在React15版本的生命周期中，存在着三个生命周期会打断render的过程，造成意想不到的结果。

比如说有一个低优先级的任务A正在执行，已经调用了某个组件的componentWillUpdate钩子，然后发现自己当前的时间分片已经用完了，只能申请下一个时间分片，然后交还控制权。这时候发现了一个更紧急的任务B，那么接下来就会去执行这个优先级更高的任务B，虽然任务A已经走到一半了，但也没有办法，只能放弃重头再来。那么这就会导致老版本生命周期在render之前的钩子有可能会**被多次调用执行**。

![](https://pan.udolphin.com/files/image/2021/7/41b6dd4e262fd7d2a7d5c1d0f9553d81.png)

如上图所示，我们不难发现，在render之前有四个生命周期会被调用执行，分别是componentWillMount、componentWillreceiveprops、shouldComponentUpdate和componentWillUpdate。

对于shouldComponentUpdate这个钩子而言即便多次调用也不会产生意想不到的结果，毕竟只是用来控制是否需要调用diff算法执行更新，它的返回值是可以预料的。但是对于其他三个生命周期，开发者会在这三个钩子中做什么操作就是完全不可预料的了，极可能会产生副作用。

所以在半年后的16.3版本中，React大刀阔斧的废弃了三个不安全的生命周期，同时还添加了两个新的更安全也更符合Fiber运行机制的生命周期。至此React 的新版生命周期图就变成了这个样子。

![](https://pan.udolphin.com/files/image/2021/7/beb06eb4b9dc485c2b081cd0bce61958.png)

---

## Fiber 的运行时机

### 浏览器在一帧中都做了什么？

我们知道浏览器中的画面都是一帧一帧渲染出来的，通常来说渲染的帧率与设备的刷新率保持一致。一般情况下，设备的屏幕刷新率为1秒钟60次，当每秒绘制的帧数（FPS）超过60时，页面渲染时流畅的；当小于60时，会出现一定程度的卡顿现象。

**浏览器中的进程与线程**

我们知道浏览器（以chrome为例）是多进程多线程的，我们先从进程开始看：

- **渲染进程**：包含了很多根线程，这些线程一起负责了页面显示到屏幕上的各个方面。这些线程有合成线程（Compositor）、图块栅格化线程（Tile Worker）和主线程。
- **GPU进程**：这是一个单一的进程，为所有标签页和浏览器周边进程服务。当帧被提交时，GPU 进程会将分为图块的位图和其他数据（比如四边形顶点和矩阵）上传到 GPU 中，真正将像素显示到屏幕上。GPU 进程只有一个的线程，叫 GPU 线程，实际上是它做了这些工作。

**一个完整的帧**

接下来让我们一起来看看一帧内发生的事情：

![](https://pan.udolphin.com/files/image/2021/7/79ae0f05d8e3258048a379ac49cf27de.png)

这里虽然我的标题叫做一个完整的帧，但是严格意义上说只能是一定程度上的完整的帧，如果继续往下细致的说，还有`垂直同步信号`等等知识点我没有列在其中，因为这些对于本文要分享的Fiber架构并没有帮助，如果有兴趣可以移步这篇文章[浏览器帧原理剖析](https://juejin.cn/post/6844903808762380296#commentÏ)继续了解有关帧的更底层的知识。

我们可以看到他的流程是这样的：

- 首先需要处理输入事件，能够让用户得到最早的反馈
- 接下来是处理定时器，需要检查定时器是否到时间，并执行对应的回调
- 接下来处理 Begin Frame（开始帧），即每一帧的事件，包括 window.resize、scroll、media query change 等
- 接下来执行请求动画帧 requestAnimationFrame（rAF），即在每次绘制之前，会执行 rAF 回调
- 紧接着进行 Layout 操作，包括计算布局和更新布局，即这个元素的样式是怎样的，它应该在页面如何展示
- 接着进行 Paint 操作，得到树中每个节点的尺寸与位置等信息，浏览器针对每个元素进行内容填充
- 到这时以上的六个阶段都已经完成了，接下来处于空闲阶段（Idle Peroid），可以在这时执行 requestIdleCallback 里注册的任务

这里要注意一件事情，浏览器**并不需要执行所有步骤**，具体情况取决于哪些步骤是必需的。例如，如果没有新的 HTML 要解析，那么解析 HTML 的步骤就不会触发。事实上，通常[提升性能的最佳方法](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fperformance%2Frendering%2F%23the-pixel-pipeline)，只是简单地移除流程中部分步骤被触发的需要！

### requestAnimationFrame

在刚刚的过程中提到了一个函数叫做`requestAnimationFrame` ，它是浏览器为我们提供的绘制动画的api，它要求浏览器在下次重绘之前（下一帧之前）调用指定的回调函数更新动画。

我们可以看这样一个例子，我希望在浏览器的每一帧中，将页面div元素的宽度变长1px，直到宽度达到100px后停止，这时就可以采用`requestAnimationFrame`来实现这个功能。

```html
<div id="div" class="progress-bar "></div>
<button id="start">开始动画</button>

<script>
  const btn = document.getElementById('start');
  const div = document.getElementById('div');
  let start = 0;
  const allInterval = [];

  const progress = () => {
    div.style.width = div.offsetWidth + 1 + 'px'
    div.innerHTML = (div.offsetWidth) + '%'
    if (div.offsetWidth < 100) {
      const current = Date.now()
      allInterval.push(current - start)
      start = current
      requestAnimationFrame(progress)
    } else {
      console.log(allInterval) // 打印requestAnimationFrame的全部时间间隔
    }
  }

  btn.addEventListener('click', () => {
    div.style.width = 0
    const currrent = Date.now()
    start = currrent
    requestAnimationFrame(progress)
    console.log(allInterval)
  })
</script>
```

我们可以看到这个小例子的运行效果：

![](https://pan.udolphin.com/files/image/2021/7/b4ef556e0ffdc0d326b9415a1ac33562.gif)

这其实是一个很简单的小例子，HTML部分是一个`div`作为一个滚动条，一个`button`作为开启动画的开关。JS部分，先声明了两个变量`start`和`allInterval`，一个用作存储每一帧开始的时间，一个用作存储每一帧的时间间隔；`progress`方法中每次执行会将div的宽度+1，同时会将div展示的内容更换到当前进度的百分比，然后进行判断，如果宽度小于100，那么在完成一帧时间差的计算之后，继续注册下一帧中`requestAnimationFrame`；如果已经到了100，那么就打印全部的时间间隔。最后监听`button`的点击事件完成第一帧`requestAnimationFrame`的注册，开启动画。

对于渲染来说，`requestAimationFrame`这个方法调用时间，是更新屏幕显示内容的最佳时机，其他的可视化任务，比如说样式计算，因为是在本次任务之后执行，所以现在是变更元素的理想位置。比如说你在这里改变了100个类的样式，这样并不会引起100次样式的重新计算；他们会在稍后被批量处理。所以在这一帧进行样式的更新是一个非常好的选择。

### requestIdleCallback

刚刚有提到另一个方法，也是React Fiber 实现的基础api。我们希望能够快速响应用户，让用户觉得够快，不能阻塞用户的交互，`requestIdleCallback`能使开发者在主事件循环上执行后台和低优先级的工作，而不影响延迟关键事件，如动画和输入响应。正常帧任务完成后没超过16ms，说明有多余的空闲时间，此时就会执行`requestIdleCallback`里注册的任务。

具体的执行流程如下，开发者采用`requestIdleCallback`方法注册对应的任务，告诉浏览器我的这个任务优先级不高，如果每一帧内存在空闲时间，就可以执行注册的这个任务。另外，开发者是可以传入`timeout`参数去定义超时时间的，如果到了超时时间了，浏览器必须立即执行，使用方法如下：

>  window.requestIdleCallback(callback, { timeout: 1000 })

浏览器执行完这个方法后，如果没有剩余时间了，或者已经没有下一个可执行的任务了，React应该归还控制权，并同样使用`requestIdleCallback`去申请下一个时间片。

同样这里我也准备了一个小例子：

```js
const taskQueue = [
  () => {
    console.log('task1 start')
    console.log('task1 end')
  },
  () => {
    console.log('task2 start')
    console.log('task2 end')
  },
  () => {
    console.log('task3 start')
    console.log('task3 end')
  }
]

const performUnitWork = () => {
  // 取出第一个队列中的第一个任务并执行
  taskQueue.shift()()
}

const workloop = (deadline) => {
  console.log(`此帧的剩余时间为: ${deadline.timeRemaining()}`)
  // 如果此帧剩余时间大于0或者已经到了定义的超时时间（上文定义了timeout时间为1000，到达时间时必须强制执行），且当时存在任务，则直接执行这个任务
  // 如果没有剩余时间，则应该放弃执行任务控制权，把执行权交还给浏览器
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskQueue.length > 0) {
    performUnitWork()
  }

  // 如果还有未完成的任务，继续调用requestIdleCallback申请下一个时间片
  if (taskQueue.length > 0) {
    window.requestIdleCallback(workloop, { timeout: 1000 })
  }
}

requestIdleCallback(workloop, { timeout: 1000 })
```

我们可以看一下这段代码的执行效果：

![](https://pan.udolphin.com/files/image/2021/7/a68ce8588d9d4cc6515db65c08b00f42.gif)

我们可以看到，在我连续几次刷新页面之后的效果，每次刷新页面都可以在一帧之内将三个任务都完成。

那么如果我们将代码部分稍做修改，加入一个`sleep`函数，让每一个任务都不能在一秒之内完成，那样会发生什么呢？我们加入代码：

```js
const sleep = (delay) => {
  for (let start = Date.now(); Date.now() - start <= delay;) { }
};

const sleepTaskQueue = [
  () => {
    console.log("task1 start");
    sleep(20); // 已经超过一帧的时间（16.6ms），需要把控制权交给浏览器
    console.log("task1 end");
  },
  () => {
    console.log("task2 start");
    sleep(20); // 已经超过一帧的时间（16.6ms），需要把控制权交给浏览器
    console.log("task2 end");
  },
  () => {
    console.log("task3 start");
    sleep(20); // 已经超过一帧的时间（16.6ms），需要把控制权交给浏览器
    console.log("task3 end");
  },
];
```

我们加入了一个`sleep`函数，可以让JS的主线程被困在里面一段时间，随后我们又对刚才的任务队列加了一点点的修改，因为浏览器平均一帧是16ms，所以我们让每一个任务都超过16ms，让他们的执行时间至少为20ms，让我们再来看看会发生什么：

![](https://pan.udolphin.com/files/image/2021/7/26b4ce180b1ce84ab888b42acb29c6b2.gif)

我们不难观察到，这时已经不可能在一帧内完成整一个任务，需要注册三次`requestIdleCallback`方法才可以完成这一系列任务。

那么如果我们这时候再加加码，让这个sleep的时间更长一点，之前我们举过一个React更新一个组件要1ms的话，那么更新200个组件就需要200ms，那么这时候用户体验会是什么样子呢？让我们来看一看：

![](https://pan.udolphin.com/files/image/2021/7/15ec3f8eae90e796b530bcf44f079b71.gif)

这时我们不难看出，页面上已经有了明显的卡顿效果，这种体验对于用户来说是非常差的。那么Fiber架构做了什么事情呢？它的实现机制就是将一个大的更新任务拆成一个个小任务，然后在每一帧的空闲时间执行这些小任务，用以保证在每一帧执行之后JS还有拿回控制权的机会，而不是一旦开始更新了，就一定要更新完，导致用户的输入等事件无法被响应。

### 当我们引入了一个Hook函数之后，发生了什么？

> With React 16.8, [React Hooks](https://reactjs.org/docs/hooks-intro.html) are available in a stable release!

2019年2月6日，React Hooks正式发布，为React开发者们带来了新的可能。

**什么是Hooks？**

我们知道React把组件分成了几种类型，分别是**无状态组件、受控与非受控组件和高阶组件**，其中的无状态组件也就是UI组件，一种函数式组件，会返回一段JSX。hooks其实就是在函数式组件的基础上，让函数也可以管理一些状态。

之前class式的组件一直是react的核心，在声明一个组件的时候要先`extends React.Component`，去继承`React Component`的基类，然后你才可以在这个组件中使用React的特性，像是生命周期钩子、状态管理等等。而函数式组件是不能这样的，因为他没有继承React的基类，所以不能使用react很多很好用的特性，那时的函数式组件的几个痛点是：没有state，生命周期，逻辑不能复用。这其实也从一定程度上揭示了React中Function组件和Class组件之间的区别。

所以为了解决这些痛点，React在16.8版本发布了一个新特性叫做Hook，React的原文对于Hook的介绍是，它可以让你在不编写class的情况下使用state以及其他的React特性。

![image.png](https://pan.udolphin.com/files/image/2021/7/5145c7ef0435c47ab6c4b993afafec1f.png)

**Function组件和class组件的本质区别**

让我们先来看两端代码，对于同样的一个场景，看看class和function都是怎么处理的：

```js
export default class ClassApp extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleClick = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.setState({ count: this.state.count + 1 })
                console.log(this.state.count)
            }, 1000)
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>class app +++</button>
            </div>
        )
    }
}
```

这是一段class组件风格的React代码，我们在点击页面上的`button`之后触发handleClick`方法，在for循环中创建了5个定时器，在时间结束之后让`this.state.count + 1`。

```js
export default function HooksApp() {
    const [num, setNumber] = useState(0);
    const handleClick = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                setNumber(num + 1)
                console.log(num)
            }, 1000)
        }
    }
    return <button onClick={handleClick} >{num}</button>
}
```

这就是一段function风格的React代码，做了和刚刚class组件同样的事情，大家可以猜测一一下运行结果是什么。

公布答案：class组件的运行结果是：`1 2 3 4 5`，function组件的运行结果是：`0 0 0 0 0`。这个例子其实很唬人，但是从某种程度上又很直接的表明了class组件和function组件的区别。

我们来分析一下，首先在类组件中，在`setTimeout`里，`setState`是同步的，所以我们可以立刻获取到更新之后的值，这里for循环挂载了5个宏任务，每次都去更新`this.state.count`，更新完从`this.state`中获取到最新的值。

但是在函数式组件中，仿佛没有生效。原因其实很简单，在class状态中，通过一个实例化的class去维护组件中的各种变化。而在function组件中，没有一个状态去管理保存这些信息，每一次执行函数更新就是重新调用一遍这个hooks函数，重新执行一边函数上下文，所有变量和常量都会重新声明，执行完毕，再进行垃圾机制回收。所以无论执行多少次的setTimeout，对于当前函数的上下文，num都是等于0，之后执行一次setNumber后，函数组件再次重新执行，num才会变为1。

那么接下来我们来看一下，当我们在function组件中引入了setState之后发生了什么？

**当我们引入了setState之后发生了什么？**

当我们引入hooks的时候，发生了什么？我们先从这句代码来看

````js
import {useState} from 'react'   // /packages/react/src/ReactHooks.js
````

这个文件中包含了所有React为我们提供的Hooks钩子，我们找到这个useState方法：

```js
export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

不难发现我们使用的`useState`就是来源自这里，接受一个参数`initialState`，也就是我们传入的初始化参数，返回值的数组里面第一个值就是我们传入的初始值，第二个值是一个`dispatch`。我们可以看到这个`dispatch`是来自于一个叫做`resolveDispatcher`方法的返回值`dispatcher.useState`。接下来我们来看看这个`resolveDispatcher`方法做了什么。

```js
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current;
  return ((dispatcher: any): Dispatcher);
}
```

我们可以看到还是没有找到源头，现在目标是这个ReactCurrentDispatcher.current。继续！

```js
// /packages/react/src/ReactCurrentDispatcher.js
const ReactCurrentDispatcher = {
  current: (null: null | Dispatcher),
};
```

到这里我们发现走到尽头了，难道第一次探索React源码就这样结束了么？绝无可能！我们暂且记下这个`ReactCurrentDispatcher`，青山不老，露水长流，后文再见。

**当我们写下一个function组件发生了什么？**

在讲解function组件开始执行之前，我们要先简单了解两件事儿。第一件事儿，React的一次更新渲染分为两个阶段，分别是`render`和`commit`。第二件事儿，就是React会在内存中维护两颗内存数，分别叫做`current`树和`workInProgress`树。

**render 和 commit**

`render`就是`Fiber`构建的过程，现阶段简单说就是会在这个阶段对比虚拟DOM和真实DOM之间的差异也就是Diff的过程，对比之后会将所有的变更收集到`RootFiber`的 `updateQueue`里。

在`commit`阶段就是更新真实DOM的阶段，会按照之前收集的`updateQueue`里的`effectList`上的标记，对于真实DOM进行修改，最后完成更新。

**current树 和 workInProgress树**

在react中维护着两颗树，一颗是current fiber tree，一颗是workInprogress fiber tree。

对于current树，就是渲染树，也可以理解为是当前的真实DOM树，会在刚才说的commit阶段完成更新操作之后，替换成真实DOM树。

对于workInProgress树，是即将被调和的fiber树。在更新的时候，会从current树复制一份，进行预调和，更新完毕之后将当前的带着最新状态的workInProgress树赋值给current树，最后再commit阶段将current树替换为真实DOM树。

**renderWithHooks方法**

然后咱们接下来看看renderWithHooks这个函数都做了什么：

```js
// /packages/react-reconciler/src/ReactFiberHooks.js
export function renderWithHooks<Props, SecondArg>(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: (p: Props, arg: SecondArg) => any,
  props: Props,
  secondArg: SecondArg,
  nextRenderLanes: Lanes,
): any {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber = workInProgress;

  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;

  let children = Component(props, secondArg);

  ReactCurrentDispatcher.current = ContextOnlyDispatcher;
  
  const didRenderTooFewHooks =
    currentHook !== null && currentHook.next !== null;

  renderLanes = NoLanes;
  currentlyRenderingFiber = (null: any);

  currentHook = null;
  workInProgressHook = null;
  
  return children;
}
```

这是我在React源码中的`renderWithHooks`方法节选了一部分。

```js
current: Fiber | null,
workInProgress: Fiber,
Component: (p: Props, arg: SecondArg) => any,
props: Props,
secondArg: SecondArg,
nextRenderLanes: Lanes
```

这个方法接收了6个参数，第一个是`current树`，我们看到这个current是可以为null的，后面咱们解释为什么，第二参数就是刚才说的`workInProgress树`，第三个参数是`Component`，也就是咱们真正写的函数组件，props就是咱们的函数组件需要传入的参数，然后是`secondArg`，其他参数，其实就是我们用到的`context`上下文，最后是`ExpirationTime`，也就是终结时间，这个`Fiber`任务什么时候被停止。

```js
renderLanes = nextRenderLanes;
currentlyRenderingFiber = workInProgress;

workInProgress.memoizedState = null;
workInProgress.updateQueue = null;
workInProgress.lanes = NoLanes;
```

继续往下看他都做了什么，首先给`renderLanes`设置了截止时间，将当前的`workInProgress树`赋值给`currentlyRenderingFiber`。因为我们说过`current`相当于是现在正在渲染的树，每次更新都会使用`workInProgress树`，最后在`commit`阶段将`workInProgress树`赋值给`current树`，再将`current树`替换真实DOM节点。`

继续往下，我们看到他用到了`workInProgress树`上的几个属性，分别是`memoizedState`，`updateQueue`，和`lanes`。`lanes`暂且不管，把目光放到`memoizedState`和`updateQueue`上，先说这两个属性是做什么的，`memoizedState`在class组件中是用来从存放state的信息的，在function组件中用来存放hooks信息，这里提前剧透一下，这个属性是以链表的形式存放hooks信息的。第二个属性`upateQueue`，字面意思就是更新队列，用来存放即将更新的状态信息。这里上来就把这两个属性置空了，是为了把最新的状态信息挂在到这两个属性上，等待`commit`进行更新渲染。

```js
ReactCurrentDispatcher.current =
  current === null || current.memoizedState === null
    ? HooksDispatcherOnMount
    : HooksDispatcherOnUpdate;
```

这时候我们终于可以回收一个老朋友了，`ReactCurrentDispatcher`大家还记得吗，我们最开始的时候，跟着useState的步伐，一直走下去，最后止步在一个地方，就是这个`ReactCurrentDispatcher`，我们可以看到在这里，他的`current`终于有了下文了，原来使用做区分是首次渲染还是后续更新的，如果`current树`为空，说明框架是实打实的第一次渲染，如果是`memoizedState`为空，也证明目前这颗树上没有挂载任何的hooks信息，所以要走`OnMount`，不然就走`OnUpdate`。这里先暂时放在这里，咱们继续往下看。

```js
let children = Component(props, secondArg);
```

下面终于调用了咱们写的函数组件了，调用了这个`Componet`传入参数，`props`和`secondArg`，我们在这个函数组件中用到的所有hooks，都会在这时候按顺序执行，最后将返回的JSX收集到了`children`里面。

```js
ReactCurrentDispatcher.current = ContextOnlyDispatcher;
```

他又对我们的老朋友动手了，把`current `属性赋值为了`ContextOnlyDispatcher`。我们来看看这个`Dispatcher`到底是个什么东西，我们可以看到这个`Dispather`里面放了所有React 为我们提供的可用的hooks。

```js
export const ContextOnlyDispatcher: Dispatcher = {
  readContext,

  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useMutableSource: throwInvalidHookError,
  useOpaqueIdentifier: throwInvalidHookError,

  unstable_isNewReconciler: enableNewReconciler,
};
```

每一个hook后面统一有一个`throwInvalidHookError`，我们来看看这个东西是什么。

```js
function throwInvalidHookError () {
  invariant(
    false,
    'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
    ' one of the following reasons:\n' +
    '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
    '2. You might be breaking the Rules of Hooks\n' +
    '3. You might have more than one copy of React in the same app\n' +
    'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
  );
}
```

诶，大家有没有人看这个东西非常眼熟，在新手没有熟悉hooks使用规则的时候，就会经常在F12的console里看到这种报错，告诉你，hook不能这样用。这里其实就是通过函数组件执行赋值不同的hooks对象，判断hooks是否执行在里函数组件的内部，如果不符合规则就抛出异常。

所以我们可以理解为，在`renderWithHooks`的开始，会判断当下是不是第一次渲染，是走`mount`还是走`update`，判断完之后执行我们的`component`，用刚才提供的`dispatcher`支持我们的`component`运行，最后将`dispatcher`变为`contextOnlyDispatcher`用于检查我们是否有hooks用错了。

**小结**

这个函数看完了我们翻回头来看咱们刚刚忽略的两个对象，`HooksDispatcherOnMount`和`HooksDispatcherOnUpdate`。

```js
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
  useDebugValue: mountDebugValue,
  useDeferredValue: mountDeferredValue,
  useTransition: mountTransition,
  useMutableSource: mountMutableSource,
  useOpaqueIdentifier: mountOpaqueIdentifier,

  unstable_isNewReconciler: enableNewReconciler,
};
```

```js
const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,

  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
  useDebugValue: updateDebugValue,
  useDeferredValue: updateDeferredValue,
  useTransition: updateTransition,
  useMutableSource: updateMutableSource,
  useOpaqueIdentifier: updateOpaqueIdentifier,

  unstable_isNewReconciler: enableNewReconciler,
};
```

我们可以发现这两个对象中，里面都放着React为我们提供的Hooks，不同的是后面的一个是mountxxx一个是updatexxx，我们不难发现对于第一次渲染的组件和更新的组件，react-hooks使用了两套API。

---

## 总结

本文介绍了React的虚拟DOM解决方案，一定程度上的梳理了在引用Fiber架构之前，React 15版本一次调和过程中的痛点，以及Fiber架构从原理上是如何解决这个问题的，最后我们看到了Fiber架构对于现有代码的影响。

我们回看虚拟DOM，可以发现虚拟DOM带来的从来不是性能，而是数据不管怎么变化，都可以使用最小的代价来更新DOM。而且掩盖了底层的DOM操作，让你用更声明式的方式来描述的目的，从而让代码更易于维护。

虚拟DOM解决方案的痛点是同步执行更新，导致用户在使用时的体感下降，应运而生的React Fiber优雅而精准的攻克了这一难题，让我们可以更加轻松舒适的去开发，让页面真正做到用户无感知更新。
随后我们看了Fiber的运行时机在哪里，是在一帧中的`requestIdleCallback`和`requestAnimationFrame`两个API支持Fiber的实现，随后我们看到了当我们引入一个Hook函数之后发生了什么事情，React是通过`ReactCurrentDispatcher`去控制我们使用Hooks的走向，如果是Mount阶段就走`HooksDispatcherOnMount`，如果是Update阶段就走`HooksDispatcherOnUpdate`，之后执行我们写的函数组件，依次执行Hooks，最后使用`ContextOnlyDispatcher`来检查我们使用的Hooks有没有错误，最后整个`renderWithHook`执行完毕。

到这里，这一问题已经告一段落，但是对于React来说，React Fiber仅仅只是一个开始，React17也只是一个垫脚石版本，接下来马上到来的React 18才是FaceBook团队对于React的极致追求，让我们翘首以盼React 18盛世的到来！



感谢您的阅读，我是数字办的王子炀，期待与您共同成长！！