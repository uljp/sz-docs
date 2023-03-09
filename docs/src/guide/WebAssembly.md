## 一、WebAssembly的出生
常有人说WebAssembly（后面简称 Wasm ）是web的第四种语言，如果你不了解 Wasm ，你可能会问：“新冒出来个语言干嘛的？跟JavaScript有什么关系？”

嗯好问题，众所周知，JavaScript是一个十天就完成了的语言，十天就上线，而且意外走红，JavaScript留下的坑慢慢演变为天坑，反观这些年JS的发展史，可以说是一个填坑史，其中最大的坑，就是性能。

1、JavaScript由慢到快

我们知道，JavaScript是一门解释型语言，解释型语言每次执行程序都需要一边转换一边执行，用到哪些源代码就将哪些源代码转换成机器码，用不到的不进行任何处理。

而在计算机语言种，相对应的编译型语言，开发完成以后需要将所有的源代码都转换成可执行程序，只要我们拥有可执行程序，就可以随时运行，不用再重新编译了。

因为每次执行程序都需要重新转换源代码，所以解释型语言的执行效率天生就低于编译型语言，甚至存在数量级的差距。

于是一些高质量人类想到一个办法：既然解释型语言每次执行程序都需要重新转换源代码，那我在程序运行前的瞬间，偷偷编译好即将运行的代码不就好了？

于是，2009年Goolgle在V8种引入了JIT技术(Just in time compiling），即时编译。有了这个buff, Javascript 瞬间提升了 20 － 40 倍的速度。直接导致一大波大型网页应用的出现。

再说回来JIT，它除了会在实际执行代码之前进行编译，他还有很多优化代码的组件，比如说其中的监视器。

这里提一下监视器干啥了：如果同一行代码运行了几次，这个代码段就被标记成了 “warm”，如果运行了很多次，则被标记成 “hot”。之后其他JIT组件基于这些数据进行优化，比如如果一个代码段变得 “very hot”，监视器会把它发送到优化编译器中。生成一个更快速和高效的代码版本出来（机器码），并且存储之，之后再运行类似代码可无需编译，直接运行，又可以提速了哈哈。

但是！我们还知道，JavaScript是一个动态类型的语言啊，这对JIT来说，意味着一旦类型改变，可能刚刚编好的机器码，因为你数据类型改了，又得推翻重来。

举个简单例子：

```
function add (a, b)
{
    return a + b
}
var c = add(1, 2);
```

如果这个函数运行多次，JIT一看觉得，嗯是时候优化了，于是把 `add` 编译成

```
function add (int a, int b)
{
    return a + b
}
```

但是，如果后面又来了段

```
var c = add("hello", "world");
```

JIT：

![0890ed1f-ff90-4c17-ade3-0b7208af7b63.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c8478c52ded4b2bb09f380e8e8f8e8d~tplv-k3u1fbpfcp-watermark.image?)


怎么办， 已经编译成机器码了啊。这种情况下，JIT 编译器只能推倒重来。JIT 带来的性能提升，有时候还没有这个重编的开销大。

从这么一个小例子可以看出来，JIT其实提升的性能其实是有限的。

这个时候，聪明的小伙伴可能已经想到，既然是类型不确定带来的问题，那我们把类型确定下来不就好了？

对的，由此催生出了多种实现路径：

* 一种是 Typescript, Dart, JSX 为代表的，基本思想是， 我先写成强类型语言，然后我把它编译成 Javacript 不就行了。

* 一种是火狐的 Asm.js 为代表的， 做一个 javascript 子集， 同时试图利用标注的方法，加上变量类型， 如果觉得不好理解，下面来一个小小的例子：

asm.js 的类型声明有固定写法，`变量 | 0`表示整数，`+变量`表示浮点数。

 ```
 var a = 1;
 var x = a | 0;  // x 是32位整数
var y = +a;  // y 是64位浮点数
```


上面代码中，变量`x`声明为整数，`y`声明为浮点数。支持 asm.js 的引擎一看到`x = a | 0`，就知道`x`是整数，然后采用 asm.js 的机制处理。如果引擎不支持 asm.js 也没关系，这段代码照样可以运行，最后得到的还是同样的结果。

如果我们采用第二种提速方式，想想它的变量一律都是静态类型，`JavaScript`引擎可以跳过语法分析这一步，将其转成汇编语言执行。那这个提速能力第一种方案的JIT可就比不了了，第二种那可直接就编译了啊（AOT）。

各大厂商觉得这个方法很有前途，那就商量着标准化一下吧，于是，便诞生了我们今天的主角WebAssembly。

有了巨佬们的支持，`WebAssembly`比 `asm.js` 要激进很多。 `WebAssembly` 连编译 `JS` 这种事情都懒得做了，不是要 `AOT` 吗？ 那就直接给字节码吧！（后来改成 AST 树）。对于不支持 `WebAssembly` 的浏览器， 会有一段`JavaScript` 把 `Web Assembly` 重新翻译为 `JavaScript`运行。

目前js提升性能的发展史，我画张图可能更直观一点：


![mmexport1640044275026_edit_233548345513320.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6454fba4410d4ab98cf705c020efcde8~tplv-k3u1fbpfcp-watermark.image?)




## 二、WebAssembly

进入到官网首页，可以看到官网对其定义及特性描述：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ccc336b275e41dfb2659d5b43e5ba91~tplv-k3u1fbpfcp-zoom-1.image)


接下来，我们将通过具体描述官网介绍的主要特性，迅速认识Webassembly

### 1、更快的速度


我们首先复现一个网上比较火的小例子（[源码地址](https://github.com/Becavalier/geektime-wasm-tutorial)），实际感受下 Wasm 带来的性能提升，爱动手的小伙伴也可以去clone下源码自己看看，

在这个例子中，我们将在页面中插入`<video>`和`<video>`标签，其中`<video>`标签用于重新绘制视频中的图片，通过名为 “CanvasRenderingContext2D.drawImage()” 的 Web API,将`<video>`标签所加载的视频资源，实时渲染到`<canvas>`标签所代表的画布对象上。之后我们会对画面每一个像素进行计算处理，相当于加一层滤镜，这里对执行程序性能的考验也主要体现在：加了滤镜后，在 1s 时间所内能够渲染的画面次数。

对应代码：
```js

// 获取相关的 HTML 元素；
let video = document.querySelector('.video');
let canvas = document.querySelector('.canvas');

// 使用 getContext 方法获取 <canvas> 标签对应的一个 CanvasRenderingContext2D 接口；
let context = canvas.getContext('2d');
 
// 自动播放 <video> 载入的视频；
let promise = video.play();
if (promise !== undefined) {
  promise.catch(error => {
    console.error("The video can not autoplay!")
  });
}
// 定义绘制函数；
function draw() {
  // 调用 drawImage 函数绘制图像到 <canvas>；
  context.drawImage(video, 0, 0);
  // 获得 <canvas> 上当前帧对应画面的像素数组；
  pixels = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
  // ...    
  // 更新下一帧画面；
  requestAnimationFrame(draw);
}
// <video> 视频资源加载完毕后执行；
video.addEventListener("loadeddata", () => {
  // 根据 <video> 载入视频大小调整对应的 <canvas> 尺寸；
  canvas.setAttribute('height', video.videoHeight);
  canvas.setAttribute('width', video.videoWidth);
  // 绘制函数入口；
  draw(context);
});
```

之后我们简单实现下帧率的计算逻辑：首先，把每一次从对画面像素开始进行处理，直到真正绘制到`<canvas>`这整个流程所耗费的时间，以毫秒为单位进行计算；然后用 1000 除以这个数值，即可得到一个估计的，在 1s 时间所内能够渲染的画面次数，也就是帧率。

对应代码：

```js

function calcFPS (vector) {
  // 提取容器中的前 20 个元素来计算平均值；
  const AVERAGE_RECORDS_COUNT = 20;  
  if (vector.length > AVERAGE_RECORDS_COUNT) {
    vector.shift(-1);  // 维护容器大小；
  } else {
    return 'NaN';
  }
  // 计算平均每帧在绘制过程中所消耗的时间；
  let averageTime = (vector.reduce((pre, item) => { 
    return pre + item;
  }, 0) / Math.abs(AVERAGE_RECORDS_COUNT));
  // 估算出 1s 内能够绘制的帧数；
  return (1000 / averageTime).toFixed(2);
}
```

JavaScript的滤镜代码：

```js

// 矩阵翻转函数；
function flipKernel(kernel) {
  const h = kernel.length;
  const half = Math.floor(h / 2);
  // 按中心对称的方式将矩阵中的数字上下、左右进行互换；
  for (let i = 0; i < half; ++i) {
    for (let j = 0; j < h; ++j) {
      let _t = kernel[i][j];
      kernel[i][j] = kernel[h - i - 1][h - j - 1];
      kernel[h - i - 1][h - j - 1] = _t;
    }
  }
  // 处理矩阵行数为奇数的情况；
  if (h & 1) {
    // 将中间行左右两侧对称位置的数进行互换；
    for (let j = 0; j < half; ++j) {
      let _t = kernel[half][j];
      kernel[half][j] = kernel[half][h - j - 1];
      kernel[half][h - j - 1] = _t;
    } 
  }
  return kernel;
}
// 得到经过翻转 180 度后的卷积核矩阵；
const kernel = flipKernel([
  [-1, -1, 1], 
  [-1, 14, -1], 
  [1, -1, -1]
]);
```

接着，为了能够得到对应 Wasm 字节码格式的函数实现，我们用C/C++实现相同的逻辑：

```c
// 引入必要的头文件；
#include <emscripten.h>
#include <cmath>
// 宏常量定义，表示卷积核矩阵的高和宽；
#define KH 3
#define KW 3
// 声明两个数组，分别用于存放卷积核数据与每一帧对应的像素点数据；
char kernel[KH][KW];
unsigned char data[921600];
// 将被导出的函数，放置在 extern "C" 中防止 Name Mangling；
extern "C" {
  // 获取卷积核数组的首地址；
  EMSCRIPTEN_KEEPALIVE auto* cppGetkernelPtr() { return kernel; }
  // 获取帧像素数组的首地址；
  EMSCRIPTEN_KEEPALIVE auto* cppGetDataPtr() { return data; }
  // 滤镜函数；
  EMSCRIPTEN_KEEPALIVE void cppConvFilter(
    int width, 
    int height,
    int divisor) {
    const int half = std::floor(KH / 2);
    for (int y = half; y < height - half; ++y) {
      for (int x = half; x < width - half; ++x) {
        int px = (y * width + x) * 4;
        int r = 0, g = 0, b = 0;
        for (int cy = 0; cy < KH; ++cy) {
          for (int cx = 0; cx < KW; ++cx) {
            const int cpx = ((y + (cy - half)) * width + (x + (cx - half))) * 4;
            r += data[cpx + 0] * kernel[cy][cx];
            g += data[cpx + 1] * kernel[cy][cx];
            b += data[cpx + 2] * kernel[cy][cx];
          }
        }                 
        data[px + 0] = ((r / divisor) > 255) ? 255 : ((r / divisor) < 0) ? 0 : r / divisor;
        data[px + 1] = ((g / divisor) > 255) ? 255 : ((g / divisor) < 0) ? 0 : g / divisor;
        data[px + 2] = ((b / divisor) > 255) ? 255 : ((b / divisor) < 0) ? 0 : b / divisor;
      }
    }
  }
}
```

接着我们便可以使用 Emscripten 来进行编译，（Emscripten安装方法见官网，推荐使用官方推荐方式emsdk命令行安装）

```
emcc dip.cc -s WASM=1 -O3 --no-entry -o dip.wasm
```

到这里，我们便可以将这个 Wasm 模块文件，整合到现阶段项目的 JavaScript 代码中。这里我们将使用 “WebAssembly.instantiate” 的方式来加载这个模块文件。对应的代码如下所示：

```js
let bytes = await (await fetch('./dip.wasm')).arrayBuffer();
let { instance, module } = await WebAssembly.instantiate(bytes);
let { 
  cppConvFilter, 
  cppGetkernelPtr, 
  cppGetDataPtr, 
  memory } = instance.exports;
```

通过 fetch 方法返回的 Respose 对象上的 arrayBuffer 函数，会将请求返回的内容解析为对应的 ArrayBuffer 形式。而这个 ArrayBuffer ，随后便会作为 WebAssembly.instantiate 方法的实际调用参数。函数返回的 Promise 对象在被 resolve 之后，我们可以得到对应的 WebAssembly.Instance 实例对象和 WebAssembly.Module 模块对象（这里分别对应到名为 instance 和 module 的属性上）。然后在名为 instance 的变量中，我们便可以获得从 Wasm 模块导出的所有方法。

最后，我们使用chrome浏览器测量这个 DIP Web 应用在 JavaScript 滤镜和 Wasm 滤镜这两个选项下的视频播放帧率。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7661f5be64a24776bd20d7d870653fa2~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cac694f714514af0a0b4b7787c3a0aba~tplv-k3u1fbpfcp-watermark.image?)

可以看到，同样逻辑的滤镜函数，在 JavaScript 实现版本和 Wasm 实现版本下有着极大的性能差异。Wasm 版本函数的帧画面实时处理效率几乎是对应 JavaScript 版本函数的一倍之多。

通过性能对比中，我们可以清楚地看到 Wasm 所带来的 Web 应用的性能提升。

### 2、稳稳的安全感

通过上面的描述，我们知道其高效的特性，那么接下来我们顺便说说其安全是如何保证的。



首先我们稍微引入一个在“计算机安全”领域中十分重要的概念 —— “Capability-based Security”，翻译过来为“基于能力的安全”。

Capability-based Security 是一种常用的安全模型。通常在计算机领域中，这个capability 可以指代如 Token、令牌等概念。capability 是一种用于表示某种权限的标记，它可以在用户之间进行传递，而且无法被伪造。在一个使用了 Capability-based Security 安全模型的操作系统中，任何用户对计算机资源的访问，都需要通过一个具体的 capability 来进行。

我们通过简单对比另一个常用的安全模型“安全保护域”来加强理解：

安全保护域：


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e6b2b0be4a049ecac9a3d82cb668d02~tplv-k3u1fbpfcp-watermark.image?)

如上图所示，在传统意义上，Ring0 层拥有着最高权限，一般用于内核模式；而 Ring3 层的权限则会被稍加限制，一般用于运行用户程序。当一个运行在 Ring3 层的用户程序，试图去调用只有 Ring0 层进程才有权限使用的指令时，操作系统会阻止调用。这就是“分级保护域”的大致概念。

反观 Capability-based Security，capability 通过替换在分级保护域中使用的“引用”，来达到提升系统安全性的目的。这里的“引用”是说用于访问资源的一类“定位符”，举个栗子: 用于访问某个文件资源的“文件路径字符串”便是一个引用。

"引用"本身并没有指定资源的权限信息，以及哪些用户程序可以拥有这个引用。

因此，每一次尝试通过该引用来访问实际资源的操作，都会经由操作系统来进行权限验证。比如验证发起访问的用户是否有权限持有该资源。在具有 capability 概念的操作系统中，只要用户程序拥有了这个 capability，那它就拥有足够的权限去访问对应的资源。

实际上，基础设施在真正实现 WASI 标准时，便会采用 “Capability-based Security” 的方式来控制每一个 Wasm 模块实例所拥有的 capability。

通过这种方式，基础设施掌握了主动权。它可以决定是否要将某个 capability 提供给 Wasm 模块进行使用。要是某个 Wasm 模块偷偷使用了一些开发者不知情的系统调用，那么当该模块在虚拟机中进行实例化时，便会露出马脚。对于没有经过基础设施授权的 capability 调用过程，将会被基础设施拦截。通过相应的日志系统进行收集，这些“隐藏的小伎俩”便会在第一时间被开发者或用户感知，并进行相应的处理。

基于 Capability-based Security 模型，WASI 得以在最大程度上保证 Wasm 模块的运行时安全。



### 3、开放、标准的发展环境



其实对于 Wasm 的 MVP（Minimum Viable Product） 版本标准来说，其实它并不在于想要一次性提供一个大而完整的新技术体系。相反，它希望能够在我们的实际生产实践中，去逐渐验证 Wasm 这项新技术是否真的有效，是否真的可以解决现阶段开发者遇到的问题，然后再同时根据这些来自实际生产实践的反馈，与开发者共同制定 Wasm 的未来发展方向。

所以Wasm CG（Community Group）社区是完全开放和透明的，只要你有合适的想法，能够提升或改善 Wasm 在某一方面的能力，那就可以加入到提案的流程中来哦。

自 Wasm 成为 W3C 的一项“官方”标准之后，核心团队对 Wasm Post-MVP 提案的发布也有了标准化流程。

一项新的 Wasm 提案从想法的诞生到最后被正式加入标准，一共需要经历如下的六个阶段：
1. Pre-Proposal [Individual Contributor]
1. Feature Proposal [Community Group]
2. Proposed Spec Text Available [Community + Woking Group]
3. Implementation Phase [Community + Working Group]
4. Standardize the Feature [Working Group]
5. The Feature is Standardized [Working Group]

这里可以对比下，相比于ECMAScript的提案只有TC39成员可以提交，Wasm的社区更加开放哦。

## 三、现阶段的webassembly能为前端做什么

我们可以用最精简的方式来概括一下 Wasm ：“Wasm 是一种基于堆栈式虚拟机的二进制指令集，它被设计成为编程语言的可移植编译目标。借助 Web 平台提供的相关接口，我们可以在 Web 浏览器中高效地调用从 Wasm 模块中导出的函数”。
那么根据上述 Wasm 现阶段所具有的这些能力， Wasm 对现代 Web 前端开发框架可以产生怎样的影响呢？目前有如下四种方案

1. 使用 Wasm 完全重写现有框架
2. 使用 Wasm 重写现有框架的核心逻辑
3. 使用 Wasm 配合框架增强应用的部分功能
4. 使用其他语言构建 Web 前端框架

接下来我们简单探讨下各个方案的可用性：

1、尝试将整个 Web 框架的全部功能，使用同样的 Wasm 版本进行代替，而应用代码仍然使用 JavaScript 进行编写。

而当 Glue Code 的代码越来越多时，JavaScript 函数与 Wasm 导出函数之间的相互调用会更加频繁，在某些情况下，这可能会产生严重的性能损耗。
因此结合现实情况来看，整个方案的可用性并不高。

2、在第二种方案中，尝试仅使用 Wasm 来重写框架的核心部分，比如 React Fiber 架构中的 Reconciler 组件。
这类组件通常并不含有过多需要与 Web API 打交道的地方，相对纯粹的计算逻辑更易于 Wasm 能力的发挥。
同时这种方案也是现阶段大多数 Web 框架正在尝试的，与 Wasm 进行交互的“常规”方式。

3、在第三种方案中，我们仅使用 Wasm 来作为 Web 框架的辅助，以优化 Web 应用的某一方面功能。
在这种方案中，框架本身的代码结构不会有任何的变化。实际上，一般的web应用在使用 Wasm 时也是这种方式。

4、在最后一个方案中，我们介绍了一种更为激进的方式。在这种方案下，包括 Web 框架和应用代码本身，都会由除 JavaScript 以外的，如 Rust、C++ 和 Go 等静态语言来编写。但同样受限于现阶段 Wasm MVP 标准的限制，框架本身仍然离不开 JavaScript Glue Code 的帮助。同时考虑到实际的语言使用成本以及 JavaScript 生态的舍弃，这种方案的实际可行性仍有待时间的验证。

无论如何，相信随着 Wasm Post-MVP 标准的不断实现，上述各方案中使用的 Glue Code 代码量将会逐渐减少。随之提升的，便是 Web 框架以及应用的整体运行性能。





## 五、展望

目前， Wasm 已经在众多应用场景发挥作用，下图分享一些实际应用场景：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4ed4496e72746c4b19e34e6fbcafa02~tplv-k3u1fbpfcp-watermark.image?)
上面分享的这些实际应用场景，还仅仅是依赖于 Wasm 的 MVP 版本标准所提供的功能特性实现的。

这里顺便放一点例子，大家有兴趣可以去看看：

1.[谷歌地球](https://www.google.com/earth/)

2017年10月底，谷歌开始支持让 Google Earth 在 Firefox 上运行，其中的关键就是使用了 WebAssembly。

2.[Blazor ](https://github.com/SteveSanderson/Blazor)
— 让 .NET 代码也能在浏览器运行

Razor 会自动检测开发者的浏览器是否支持 WebAssembly，如果不支持，该工具也会自动转换成 Asm.js。不过目前该工具仍然属于实验阶段，尚未支持正式环境的构建、调试功能。

3.  [Walt ](https://github.com/ballercat/walt)

— 用 JavaScript 语法也能快速开发原生的极速应用

目前，在多数网页开发者尚未熟悉使用 Asm.js，WebAssembly 技术的情况下，有一款叫做 Walt 的工具或许可以帮助到他们，目的是让网页开发者可以不用接触 C、C++ 或者 Rust 语言，继续使用 JavaScript 语法，来打造出接近机器码效率的网页应用。此外 Walt 也不需要依靠 LLVM 编译器或者其他二进制转换工具，可以直接将源代码编译成 WebAssembly 格式。


最后，对于未来，绝大多数人都期待 Wasm 的发展，下图是Docker的创始人所罗门·海克斯（Solomon Hykes）在推特上对于 Wasm的讨论截图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35e53d42e1334359a0f3cbc751a3ada2~tplv-k3u1fbpfcp-watermark.image?)

翻译过来的大致意思是：
> 如果 WASM 和 WASI 早在 2008 年就存在，那么我们就不需要创建 Docker。可见 Wasm 是多么重要。服务器上的 WebAssembly 将会是“计算”的未来模式。而现在的问题是缺少标准化的系统接口。希望 WASI 能够胜任这项工作！


说了这么多，相信你能够体会到 Wasm 出现的意义，以及它在未来巨大的可能性。或许在未来某一天， Wasm 将会成为每一个互联网工程师的必备技能。

我是数字办的郭亦奇，期待与你一起成长~




