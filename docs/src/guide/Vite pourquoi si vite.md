Vite，法语，语意为"快速的"，发音是/vit/，发音同"veet"，是一种新型的前端构建工具。目的是显著提升前端的开发体验。它的特点主要由两部分组成：

一是开发服务器，它基于原生ES模块并在其基础上提供了例如预构建，独特的热重载等增强功能。

二是一套构建指令，它使用 Rollup 打包你的代码，并且在你使用 Vite 的时候就已经预配置好了，可输出用于生产环境的高度优化的静态资源。

由于 Vite 的构建目标浏览器是能在 script 标签上支持原生 ESM 和原生 ESM 动态导入的浏览器，所以如果想在传统浏览器上得到支持，需要通过额外的官方插件[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

那么 Vite 到底有多快呢？在 上从零启动一个基于 Vite 的 React 应用，浏览器页面加载完毕的时候，CRA（create-react-app）甚至还没有装完依赖。

## Vite的诞生

Vite的诞生和前端工程化脱不开关系，在浏览器支持ES模块之前，JavaScript并没有提供原生机制供开发者进行开发，所以我们需要进行“打包”——即使用工具抓取，处理我们的源码模块并串联成可以在浏览器中运行的文件。

> 如果想了解更多前端工程化的知识，请看贾伟哥的[前端工程化](https://wiki.uino.com/d/61317e7ea5e0b52b400b0399.html)

时过境迁，我们见证了诸如webpack，Rollup，Parcel等工具的变迁，它们极大的改善了前端开发者的开发体验。

然而，当我们构建越来越大型的应用时，需要处理的模块越来越多，动辄上千。我们开始遇到性能瓶颈——使用 JavaScript 开发的工具通常需要很长时间才能启动开服务器，即使使用 HMR ，文件修改后的效果也需要好几秒才能在浏览器中反应出来。如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

Vite就是为了解决这个问题而生的。

## Vite的解决方案

### 服务器冷启动时

当冷启动开发服务器时，基于打包器的方式启动必须优先抓取并构建你的整个应用，然后才能提供服务。也就是说，每次启动的时候都需要从入口文件一步一步的寻找所需要的依赖，并将它们打包后传给服务器，你才能正式的浏览你的网页。

![image.png](https://pan.udolphin.com/files/image/2021/12/a3d833602a41459f29be766276b297f3.png)

由图可见，在启动的时候就要把整个项目所有的模块都打成一捆后才能启动服务，多少有点不必要了，我们也不是每次开发都要使用所有模块。当我们的项目越大，在启动时等待的时间就会越长，长到我每次下班回家都不想关电脑。

但Vite不一样。Vite通过将应用中的模块区分为**依赖**和**源码**两类，缩减了开发服务器启动的时间。

所谓**依赖**，即大多数在开发时不会变动的纯JavaScript文件(node\_modules)。  
一些比较大的依赖(有些模块可能有上百或者上千依赖，有些组件库可能会有上百个模块)处理的代价很高，建议来也通常会存在多种模块化的格式（如ESM和CommonJS等）

> 如果想了解更多js模块化开发的知识，请看[前端工程化](https://wiki.uino.com/d/61317e7ea5e0b52b400b0399.html)

由于 Vite 是一个基于原生 ESM 的开发服务器，在启动时我们需要通过依赖预打包来达成两个目的：1. 减少模块/请求数量； 2. 支持 CommonJS 依赖。

Vite会使用 Esbuild 来预构建依赖(详见后文)。Esbuild使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖速度快10-100倍。  
可能有人不太清楚10-100倍是什么概念，这里放上一张 Esbuild 官网的对比图：  
![esbuild.gif](https://pan.udolphin.com/files/image/2021/12/c1bba66b23ab68219a520d27e36ff015.gif)

> 如果想了解更多Esbuild开发的知识，请看[Esbuild官网](https://esbuild.github.io/)

所谓**源码**，即一些并非是 JavaScript 的文件，需要被转换，而且会在开发中经常被编辑(例如JSX,CSS或者Vue/Svelte组件)。这些源码并非需要同一时间被全部加载(比如基于路由拆分的代码模块，当你在一条路由上时，其他路由上的源码就不需要再加载了)。

Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

![image.png](https://pan.udolphin.com/files/image/2021/12/90caf3b50871db6a994c6322d0b19ad4.png)

这样一对比，基于打包器的方式相当于什么都做好了，浏览器只需要运行编译好的低版本代码就行，而Vite只处理问题的一部分，剩下的事全都交给浏览器来做，那启动速度必然是快。而且当你的项目越大越复杂，模块越多，Vite的优势就越明显。

但由于Vite将这些事情交给浏览器来做了，所以开发服务器可以瞬间启动，但打开页面等待内容出来的时间就要比打包器编译打包且优化好的代码慢了不少(但依旧很快)。

### 服务器热更新时

基于打包器启动时，重建整个包的效率很低。原因显而易见：因为这样更新速度会随着应用体积增长而直线下降。所以一些流行的打包器支持了 HMR ：允许一个模块“替换”它自己，而不会影响页面其余部分。这大大改进了开发体验 —— 然而，在实践中我们发现，即使采用了 HMR 模式，其热更新速度也会随着应用规模的增长而显著下降。例如 WebPack ，当它修改某个文件过后，会以当前修改的文件为入口重新 build 一次，所有涉及到的依赖会被重新加载一遍，所以反应速度会慢很多。

在 Vite 中，HMR 是在原生 ESM 上执行的。当编辑一个文件时，Vite 只需要精确的编译一个文件，以及依赖到的刚刚编辑过的其他文件(仅需一次)即可，大部分时间都是只有被编译的文件本身，所以速度就起来了

Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。也就是说只有第一次

### 构建生产版本

上文提到过，由于Vite的构建目标浏览器是能在script标签上支持原生ESM和原生ESM动态导入的浏览器，所以如果想在传统浏览器上得到支持，需要通过额外的官方插件[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

Vite 的构建使用了 Rollup 打包，也就是说， Vite 提供了一套默认的 Rollup 配置来帮你构建你的程序。你仍然可以使用仅在构建阶段应用的插件来改变 Rollup 的输出。当你想使用多页面应用模式的时候，只需要指定多个.html作为入口即可。

Vite 会自动的将一个异步 chunk 模块中使用到的 CSS 代码抽取出来并为其生成一个单独的文件。这个 CSS 文件会在该 chunk 加载完成时自动通过一个标签载入，该异步 chunk 会保证只在 CSS 加载完毕后再执行，以保证不会出现 FOUC ( Flash of unstyled content，也就是 html 先于 CSS 加载完所导致的先是没有样式，再是出现样式导致的闪烁 )

有聪明的小朋友可能忽然发现了一个盲点，既然Vite的出现就是因为浏览器支持ESM了，那为什么还需要打包呢？答案是：尽管原生 ESM 现在得到了广泛支持，但由于嵌套导入会导致额外的网络往返，在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。而这些工作也都交由Rollup去做，非必要情况下，用户无需关心。

那么，既然知道了为什么要打包，那么可能会有更聪明的小朋友又发现了一个盲点，那就是既然刚刚被吹上天的 ESBuild 构建速度这么快，为什么不用 ESBuild 也完成打包的工作呢？其实 ESBuild 现在并不是特别完善，一些刚刚提到的重要功能都还在持续开发中，特别是代码分割和 CSS 处理方面，就目前来说， Rollup 在应用打包方面更加成熟和灵活。

## Vite的功能及其简易实现

### NPM依赖解析

虽然浏览器确确实实支持了 ESM ，但浏览器也仅仅是能解析相对路径，例如

```
import Hello from "./Hello.tsx"
```

当你从 node\_modules 里面导入依赖的时候，浏览器可不认识。

```
import clsx from "clsx"
```

而 Vite 可以重写导入为合法的 URL ,例如 `/node_modules/.vite/clsx.js` ，如此便能正确的导入它们。

### 依赖预构建

当你首次启动 Vite 时，你可能会注意到有这样的提示：  
![image.png](https://pan.udolphin.com/files/image/2021/12/6db41533dd663b0905e80de62dc4f451.png)  
这就是依赖预构建。

这个过程有两个目的：

1\. **CommonJS 和 UMD 兼容性**：Vite 的开发服务器将所有代码视为原生 ES 模块。许多模块在编写时还并没有ESM规范，当时所流行的规范也各不相同。因此，Vite 必须先将作为 CommonJS 或 UMD 发布的依赖项转换为 ESM。  
当转换 CommonJS 依赖时，Vite 会执行智能导入分析，这样即使导出是动态分配的（如 React），按名导入也会符合预期效果。

```
// 符合预期
import React, { useState } from 'react' 
```

2\. **性能**： Vite 将拥有许多内部模块的 ESM 依赖关系转换为单个模块，以提高和后续页面加载性能。

一些包将他们的 ES模块构建作为许多单独的文件相互导入。例如`lodash-es`有超过600个内置模块！这意味着什么呢？意味着，当你的一个页面引入了lodash-es时`import { debounce } from "lodash-es"`时，浏览器会同时发出600多个请求。到时候页面的加载速度多可怕可想而知。

但通过预构建`lodash-es`成为一个模块，只需要一个HTTP请求就可以了。

### 模块热重载

`注意：Vite的HMR原理我并未在官方文档找到，也没看明白源码，不过还是了解到了大概，以下仅为个人猜测与实践，可能与事实不符，但大体上来说思路应该是没问题的。`

首先，作为一个开发服务器，肯定是要有一个服务器，随后，当服务成功启动后，如果进行热更新，肯定是会经历`修改代码 -> 页面更新`这一步，再细化一点就是`Node监听文件变化 -> 修改代码 -> Node通知浏览器代码变化了 -> 浏览器收到消息 -> 浏览器重新请求这个文件 -> 通过特殊手段完成页面更新`。因为 Vite 是基于 ESM 的，所以仅到这一步基本就可以了，不需要重新打包相应模块和依赖。

### 简易实现

之后会发布在另一篇文章里，敬请期待！

## 总结

本文介绍了 Vite 的基本信息，以及 Vite 出现的原因，对现在的开发产生了什么样的影响，并介绍了其基本实现原理。相信随着前端技术的不断发展，会出现越来越多诸如此类能大幅提升前端开发者开发体验的工具。

感谢您看完本片文章，小彩蛋：在编写此文章时，我想要了解一下 Vite 的全球热度，于是看了一眼谷歌的搜索趋势，发现 Vite 的热度居然碾压了 WebPack ，着实有点震惊。  
![image.png](https://pan.udolphin.com/files/image/2021/12/4f1335350fca5c5fd4bca32fafa6de4c.png)  
遂详细观察了一下大家都在搜索什么：ma dose vite 翻译了一下，是法语，意思是 快给我打疫苗 ，是法国人自发创建的一个类似国内预约新冠疫苗的平台，所以热度很高。也就代表着每一个波峰都是法国疫情的严重时期，而现在还在上涨……希望疫情尽快过去。