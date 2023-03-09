相信大家都听过或者用过Webpack，尤其是react,vue开发者。[Vue CLI](https://cli.vuejs.org/zh/)，[create-react-app](https://create-react-app.dev/)等脚手架都基于Webpack进行项目构建。简单来说，Webpack是一个用于处理依赖的打包工具。
> 思考：如果Webpack只是一个简单的打包工具的话，明明大部分浏览器都已经支持ES6的模块化了，为什么还需要Webpack进行打包呢？

# 认识Webpack
正如上文所说，Webpack是一种前端资源构建工具，是一个静态模块打包器。

所谓前端资源构建工具，其目的是为了满足前端开发者对于TypeScript和Sass,Less等语言扩展的使用需求。浏览器并不认识这些语法，我们需要使用相应的工具来将他们编译成标准的js，css，但每种不同的语法都需要不同的编译工具，而且需要我们每次都手动执行编译，非常不方便，我们可以通过Webpack Loader来解决这个问题。


所谓静态模块打包器，正如[中文官网](https://Webpack.docschina.org/)上的一张图所表达的：它会追随入口文件，处理所有相关依赖，并将其处理打包。如果用到的依赖就会进行打包，没有用到的就不会打包，大大降低了代码的体积。
![image.png](https://pan.udolphin.com/files/image/2021/8/c56898ad15aae912834cbcfabebd57dd.png)


# 体验Webpack

本章节我们将会从零开始一步一步的使用Webpack搭建react环境，一边搭建，一边介绍配置。


## 核心概念
首先介绍一下七个核心概念：`入口(entry),输出(output),loader,插件(plugin),模式(mode),浏览器兼容性(browser compatibility),环境(environment)`。 以下内容来自官网：

### 入口(entry)
**入口起点(entry point)** 指示 Webpack 应该使用哪个模块，来作为构建其内部 [依赖图\(dependency graph\)](https://Webpack.docschina.org/concepts/dependency-graph/) 的开始。进入入口起点后，Webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
默认值为`./src/index.js`


### 输出(output)
**output** 属性告诉 Webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。


### loader
Webpack 只能理解 JavaScript 和 JSON 文件，这是 Webpack 开箱可用的自带能力。**loader** 让 Webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块](https://Webpack.docschina.org/concepts/module/)，以供应用程序使用，以及被添加到依赖图中。

### 插件(plugin)
loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

### 模式(mode)
通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 Webpack 内置在相应环境下的优化。其默认值为 `production`。


### 浏览器兼容性(browser compatibility)
Webpack 支持所有符合 [ES5](https://kangax.github.io/compat-table/es5/) 标准 的浏览器（不支持 IE8 及以下版本）。Webpack 的 `import()` 和 `require.ensure()` 需要 `Promise`。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 [提前加载 polyfill](https://Webpack.docschina.org/guides/shimming/)。

### 环境(environment)
Webpack 5 运行于 Node.js v10.13.0+ 的版本。

## 初始化项目

首先新建一个文件夹test，在其中执行命令

```
npm init -y
```

因为是使用Webpack进行项目的构建，所以Webpack的安装必不可少
```
npm install Webpack Webpack-cli -D
```

修改package.json，在script里面加入：

```
"scripts": {
    "build":"Webpack"
  },
```

安装完成后，新建一个index.js，里面写入我们想写的代码。

``` javascript
document.getElementById("root").innerHTML = "js代码可以运行"
```

现在，我们的目录结构如下：

![image.png](https://pan.udolphin.com/files/image/2021/8/7baaec29f44e9dc63702c9b7a526b918.png)

运行一下Webpack，看看会发生什么

```
npm run build
```

很显然，报错了

![image.png](https://pan.udolphin.com/files/image/2021/8/32c5d1ac437e3ecd35ae34e88c6133ae.png)

看看错误原因，说是找不到test目录下的src。
为什么会去找src？如果刚刚有认真看过核心概念介绍的小伙伴肯定已经心里清楚了。因为即使我们没有配置Webpack.config.js，Webpack也会为我们默认提供一份默认的配置，所以会默认会去寻找项目目录下src文件夹中的index.js。

那我们来配置一下Webpack.config.js,设置一下入口文件：
``` javascript
Webpack.config.js

const path = require('path');
module.exports = {
    entry: path.join(__dirname, './src/index.js'),
};

```

那现在我们暂时先将index.js放入src文件夹中。
再次运行build。
![image.png](https://pan.udolphin.com/files/image/2021/8/6634f9636b06c9ba311b7dbb68c171a7.png)
成功了，但是有一条警告，说我们并没有设定mode，并且给我们默认设置了生产环境，我们之后再管。
现在会发现我们的项目根目录下多出了一个叫dist的文件夹，文件夹下有一个main.js，因为我们写入index.js中的内容太简单又普通了，所以main.js中的内容和我们写好的index.js一模一样。
叫main.js太难听了，我们改一下输出：
``` javascript

const path = require('path');
module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output:{
      path:path.resolve(__dirname,"dist"),
      filename:"hello.js"
    }
};

```


现在我们来更改一下index.js里面的内容：
``` javascript

import a from "./a.js"
document.getElementById("root").innerHTML = a
```
再添加一个a.js：
``` javascript

const a = "代码成功执行了"
export default a
```
然后再尝试一下npm run build。不出意外成功了，看我们现在打包出的main.js：
``` javascript
(()=>{"use strict";document.getElementById("root").innerHTML="代码成功执行了"})();
```
代码被压缩了！是因为Webpack v5版本 内置了TerserPlugin用于压缩js文件，在生产环境下会默认开启，但在开发环境就不会。


我们来设置一下mode，让之前那条碍眼的警告消失：

``` javascript

const path = require('path');
module.exports = {
  entry: path.join(__dirname, './src/index.js'),
    output:{
      path:path.resolve(__dirname,"dist"),
      filename:"hello.js"
    },
    mode:"production"
};

```
> 试一下：将mode设置为"development"，再进行打包，看看未压缩的代码。

好了，现在我们已经搞清楚了Webpack的入口，输出和模式，可以正式开始写react代码了。
首先：npm install react react-dom
更改index.js为index.jsx，同时别忘了改入口文件：

``` javascript

import A from "./A.jsx"
import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(
    <A></A>
,document.getElementById("root"))

```



将a.js变为一个组件 A.jsx：
``` javascript
import React from "react"
export default function A(){
    return <div>这是组件A</div>
  }

```

现在，我们来运行一下npm run build：

![image.png](https://pan.udolphin.com/files/image/2021/8/bdf46230701b592057f2a0104f582703.png)

不出所料，肯定报错了，错误信息里面说当前没有loader来处理这个文件。
刚刚有认真读过核心概念中loader部分的小伙伴肯定已经知道了，Webpack在开箱即用的情况下只能识别js,json文件。所以jsx文件需要一点小小的手段才能让Webpack识别。这个时候就要用到babel了。
```
npm i babel-loader @babel/core @babel/preset-react -D
```
再创建一个.babelrc文件，里面放好配置信息：
``` json

{
    "presets": [
        "@babel/preset-react"
     ],
}
```
接下来就是添加loader的时间了，修改Webpack.config.js：
``` javascript
const path = require('path');
module.exports = {
    entry: path.join(__dirname, './src/index.jsx'),
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"hello.js"
    },
    mode:"production",
    module: {
        rules: [
            {test: /\.jsx$/, use: 'babel-loader'}
        ]
    },
};
```
加入module字段，对模块相关进行配置，在rules中配置loader，loader的test属性可以使用一个正则表达式，对所有符合正则表达式的文件使用loader处理，在use中表明具体的loader，如果使用数组则表示从**右**到**左**顺序执行loader。同时也可以通过include属性和exclude属性来包含或者排除部分文件。

那么我们已经添加完loader了，来试试看npm run build：
![image.png](https://pan.udolphin.com/files/image/2021/8/e04c1747dcc973505b2c70fe584f3b00.png)
成功了，来看看我们输出的文件hello.js：
![image.png](https://pan.udolphin.com/files/image/2021/8/ec3d0f6e0be7831a379521afae232bf3.png)
已经不是人类可以理解的东西了，那我们新建一个index.html放入dist目录下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <script src="./hello.js"></script>
</body>
</html>

```
用浏览器打开，会发现我们写好的组件正常运行了，但每次我们更改代码后都需要自己创建一个html模板吗？那多费劲，有没有一种东西能对打包的资源进行更改呢？
Webpack为我们提供了一个插件 html-Webpack-plugin，它可以为我们每次打包的时候根据目录里的模板来自动创建html文件。

```
npm install html-Webpack-plugin -D
```

更改Webpack.config.js：
``` javascript
const path = require('path');
const htmlWebpackPlugin = require('html-Webpack-plugin');
module.exports = {
    entry: path.join(__dirname, './src/index.jsx'),
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"hello.js"
    },
    mode:"production",
    module: {
        rules: [
            {test: /\.jsx$/, use: 'babel-loader'}
        ]
    },
    plugins: [
    new htmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
        filename: 'index.html'
    })
    ],
};
```
html-Webpack-plugin的两个参数，template是说明模板所在的位置，filename是说明打包后html的名字。
好了，至此，我们已经了解了Webpack基础的核心配置了。
接下来开始写一个自定义loader吧。
## 神奇的Loader
### Loader的原理

Loader本质上就是一个特别普通的函数，webpack会当遇见符合条件的文件时，将文件的内容通过参数传入该函数，并返回一个内容
试猜想：有这么一个文件 a.css
``` javascript
const a = "你好"
export default a
```
和这么一个入口文件index.js
``` javascript
import a from "./a.css"
document.getElementById("root").innerHTML = a
```
此时我们的目录结构是这样的
![image.png](https://pan.udolphin.com/files/image/2021/8/e2e50f29f07a5ba0f978e148588ee9bf.png)

执行npm run build 会报错吗？

答案是不仅没报错，css文件中的js代码还正常执行了，Webpack把css文件认成js文件了。

实际上，Webpack会将所有遇到的文件当成js或json代码，遇到他不懂的地方就去寻找loader的帮助，所以在我们没有配置loader的时候一切相关的依赖都会被当成js或者json。
### 写一种自定义“语言”
突发奇想，创建一种语言，叫yu语言怎么样？
在我们的yu语言中，通过fish定义一个变量，通过crab来导出变量
新建hello.yu
``` javascript
    fish a = "你好"
    crab a
```
在index.js中导入：
``` js
import a from "./hello.yu"
document.getElementById("root").innerHTML = a

```



我们创建一个yuLoader.js
``` javascript
module.exports = function loader(source){
    console.log(source);
    return source
}
```


配置Webpack.config.js
``` javascript
const path = require('path');
const htmlWebpackPlugin = require('html-Webpack-plugin');
module.exports = {
    mode:"production",
    module: {
        rules: [
            {test: /\.yu$/, use: path.resolve(__dirname,"src","yuLoader.js")}//我们所写的loader的路径
        ]
    },
    plugins: [
    new htmlWebpackPlugin({
        template: path.join(__dirname, './index.html'),
        filename: 'index.html'
    })
    ],
};
```
执行打包，看看会发生什么：
![image.png](https://pan.udolphin.com/files/image/2021/8/a228b6273478751d342b6e90a248c1ca.png)
a.yu里面的内容原封不动的被打印出来了。
所以，我们可以通过对source的修改来让我们的代码可以被Webpack识别。
修改yuLoader.js：
``` javascript

module.exports = function loader(source){
    const text = source.replace(/fish/g,"const").replace(/crab/g,"export default")
    return text
}

```

执行打包 成功了，我们写的loader成功作用了。
但是其实我们实际应用中不会遇到这么离谱的需求，这里只是作为演示。
### 选修：AST语法树
我们更可能遇到什么样的需求呢？需要修改我们现有的js代码，比如删去所有console，这时直接替换字符串就非常危险了，可能会把我们所不想替换的替换掉。这时就需要用到AST语法树了。AST语法树可以将js代码拆分为树形结构，可以更安全的对代码进行修改。如果想要了解AST语法树，大家可以参考[华为云](https://bbs.huaweicloud.com/blogs/detail/159390)中的一篇文章。

## 强大的plugin
我们已经初步了解过了HTML-Webpack-Plugin，也发现了它的loader不同的地方：plugin在Webpack的事件流中可以对Webpack打包的整体资源进行操作，而loader只是对文件进行操作。
在Webpack运行的生命周期中会广播出许多事件，Plugin可以对这些事件进行监听，并且在合适的时机通过API进行操作。
### 一个简单的Plugin

一个基础的Plugin由构造函数和apply方法组成：

``` js
//伪代码
class EasyPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }
  
  // Webpack 会自己调用 EasyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler){
    //如果想对compilation进行操作，就调用compiler的这个钩子
    compiler.plugin('事件名称',"回调函数")
  }
}

module.exports = EasyPlugin;

```
在Webpack.config.js中配置的代码如下：
``` js
//伪代码
const EasyPlugin = ("./EastPlugin");
module.exports = {
    plugins: [
    new EasyPlugin(options)
    ],
};

```

在Webpack启动后，在配置过程中会先初始化一个Plugin实例，获取options，再调用Plugin的apply方法给实例传入complier对象，之后通过compiler.plugin中监听到Webpack广播出来的事件去操作Webpack。
### compiler和compilation
那么，什么是compiler？什么是compilation？
compiler对象包含了Webpack环境所有的信息，如options,loaders,plugins等Webpack.config信息，这个对象在Webpack启动时被实例化，它是全局唯一的，可以理解为Webpack实例本身。
compilation对象包含了当前模块的资源，当Webpack以开发模式运行时，每次进行热更新都会创建一个新的compilation。
### Tapable
那么了解了compiler和compilation后就可以了解Webpack的事件流了，它是通过[Tapable](https://github.com/webpack/tapable)来广播和监听事件的。[compiler钩子](https://webpack.docschina.org/api/compiler-hooks/)和[compilation钩子](https://webpack.docschina.org/api/compilation-hooks/)暴露了Webpack中不同的事件流生命周期。
### 注意

需要注意的是，compiler和compilation都是引用，如果在一个插件中修改了他们的属性，那么将会对后续所有插件产生影响。如果有些事件是异步的，那么这个事件会有两个参数，第二个参数为回调函数，我们需要在处理完任务后调用回调函数来通知Webpack，不然就会一直卡住不执行。

# 总结
本文介绍了Webpack的基本配置，核心概念和自定义loader和plugin的原理和配置方法。

Webpack不仅仅只是静态模块打包器，更是一个资源构建工具，我们不仅可以对项目代码进行压缩，也可以更清楚的对项目资源进行操作，比如通过babel，scss，ts编译器进行转译，让前端代码更加丰富多彩，让前端开发者更便利的进行开发。

感谢您的阅读，我是数字办的于济铭，期待与您共同成长！！！