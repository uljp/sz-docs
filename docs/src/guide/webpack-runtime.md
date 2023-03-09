在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：

* 团队编写的业务源码
* 源码会依赖的任何第三方的library 或 "vendor" 代码
* webpack 的 runtime 和 manifest，管理所有模块的交互

前面两种大家都很熟悉了，那第三种呢？

> runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

> 一旦你的应用在浏览器中以 index.html 文件的形式被打开，一些 bundle 和应用需要的各种资源都需要用某种方式被加载与链接起来。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack 优化之后，你精心安排的 /src 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

> 当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 \_\_webpack\_require\_\_ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

接下来，我们从代码中看看他们到底长什么样。

# 打包单个文件

```
// demo1.js
console.log('hey');


// webpack.config.js
module.exports = {
  entry: './demo1.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'development'
};
```

执行命令

```
webpack
```

打包之后结果如下：

![](https://pan.udolphin.com/files/image/2022/9/bba58805c99ec344dae9302e5c3b7279.png)

看着有点奇怪，明明就两行代码，那多出来的这一大堆代码是什么？

多出来的这些代码统称为运行时代码。让我们来逐个看一下这些都是干什么的。

```
// 整个文件都是一个自执行函数


(function(modules) { // webpackBootstrap
 // The module cache 用于存储被引用过的模块
  var installedModules = {};


  // The require function 实现模块间引用 (require) 逻辑
  // 重点函数！！这里为我们生成了一个加载函数！
  function __webpack_require__(moduleId) {
    // 先说一下基础知识：作用域。这里 installedModules 定义在函数外面，所以相当于是整个自执行函数内部的全局变量。 
 
   // Check if module is in cache
   // 检查模块是否有缓存（以前加载过），如果加载过，那我们就没必要处理了，因为 installedModules 里面会有 exports 属性来保存读取到的.
   if(installedModules[moduleId]) {
   /** 为什么需要缓存，两点：
     *   1.节省计算性能。
     *   2.防止依赖死循环（重要）。 
     * 举例：A 模块为入口，导入了 B 模块，B 模块反过来又导入了 A 模块。
     * 根据 ESM 规范（可以查看阮一峰 ES6 教程），B 模块内部是会打印出 undefined 。理由很简单：A 模块调用了 B 模块，此刻 A 还未执行完，B 模块此刻访问 A 模块，状态自然是 undefined。
     * 我们可以看到 __webpack_require__ 函数，它如果碰到了这种循环加载的依赖，无限嵌套调用，很快 javascript 调用栈就会爆掉！而当我们使用了缓存，就可以从缓存直接返回结果，而无需再调用 __webpack_require__。避免了爆栈的问题发生！
   */
     return installedModules[moduleId].exports; //如果有的话直接返回暴露出来的对象。
   }


   // Create a new module (and put it into the cache)
   // 上面不符合以后，那我们就开始创建一个模块，并且缓存到 installedModules 里面，同时把它们赋值到变量 module 上面
   var module = installedModules[moduleId] = {
     i: moduleId,
     l: false,
     exports: {}
   };


   // Execute the module function
   /** 第一轮会先执行入口函数，然后传入了三个参数：
     *  module（刚刚生成的缓存对象）。
     *  module.exports（还是这个对象，只不过exports拿来用了）。
     *  __webpack_require__（重要的加载函数，传入了自己，这个函数会被反复执行和调用）。 
   */
   modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);


   // Flag the module as loaded
   // 记录这个module已经被加载了
   module.l = true;


   // Return the exports of the module
   // 整个加载函数最后执行完返回的是 exports ，暴露出来的对象。
   return module.exports;
 }




 // expose the modules object (__webpack_modules__)
 // 所有构建生成的模块
 __webpack_require__.m = modules;


 // expose the module cache 所有被储存的模块
 __webpack_require__.c = installedModules;
 /* 模块缓存,缓存结果类似于： {
   "./src/index.js": {
     exports: 暴露出来的变量, 
     id: 模块id,
     loaded: 是否被我们读取完成
   } 
 } */


 // define getter function for harmony exports ：define 工具函数，实现将模块导出的内容附加到模块对象上
 // 类似这样的调用： __webpack_require__.d(__webpack_exports__, { "a": () => a});
 // 提供Getter给导出的方法、变量。
 __webpack_require__.d = function(exports, name, getter) {
   // 判断 exports 对象身上是不是导出过。
   if(!__webpack_require__.o(exports, name)) {
   /**符合条件以后，对这个 key 值进行改造。当获取属性的时候，调用对应的函数。 
     为什么要这么做呢，我猜测是为了防止被误删除定义的函数。
     经过这一步操作，在定义一遍获取操作，相当于定义了两次key的返回值，即使修改也改不了。
     因为使用Object.defineProperty()定义的属性，默认是不可以被修改，不可以被枚举，不可以被删除的。
   */
     Object.defineProperty(exports, name, { enumerable: true, get: getter });
   }
 };


 // define __esModule on exports 工具函数，在ESM模式下标识该模块为es模块
 __webpack_require__.r = function(exports) {
   if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /** 这段代码本身的意义在于，当需要对它进行 Object.prototype.toString.call(判断对象) 类型分析的时候，是可以得出 [object Module] 类型。原因就在于Symbol.toStringTag属性可以控制最后得出的类型。
      * Q2有对Symbol.toStringTag解释
    */
     Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }); 
     
   }
   Object.defineProperty(exports, '__esModule', { value: true });
 };


 // create a fake namespace object 工具函数，创建一个伪名称空间对象
 // mode & 1: value is a module id, require it
 // mode & 2: merge all properties of value into the ns
 // mode & 4: return value when already ns object
 // mode & 8|1: behave like require
 __webpack_require__.t = function(value, mode) {
   if(mode & 1) value = __webpack_require__(value);
   if(mode & 8) return value;
   if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
   var ns = Object.create(null);
   __webpack_require__.r(ns);
   Object.defineProperty(ns, 'default', { enumerable: true, value: value });
   if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
   return ns;
 };


 // getDefaultExport function for compatibility with non-harmony modules ：non-harmony 工具函数，用于兼容非和谐模块的getDefaultExport函数
 /** 这一步操作主要是给 exports 对象身上打上两个关键标记：
   * __esModule 属性为 true 
   * 当对 exports 使用 Object.prototype.toString.call() 检测出来的结果就是 Module
 */
 __webpack_require__.n = function(module) {
   var getter = module && module.__esModule ?
     function getDefault() { return module['default']; } :
     function getModuleExports() { return module; };  // <-- 兼容处理
   __webpack_require__.d(getter, 'a', getter);
   return getter;
 };


 // Object.prototype.hasOwnProperty.call 工具函数，检测 object 是否具有这个值property。返回一个布尔值
 /**众所周知，in操作符是判断不出来是否某个属性在自己身上的，因为它还会去作用域链上找，直到找到为止。
    所以需要判断是否属于自身属性，就需要用 hasOwnProperty 这个方法，那为什么不直接 XX.hasOwnProperty(属性名) 呢？
    因为传参的方式代码阅读上更容易被理解。
    这里其实相当于给这个方法起了个短名，更方便后面使用。
 */
 __webpack_require__.o = function(object, property) {
   return Object.prototype.hasOwnProperty.call(object, property); 
 };


 // __webpack_public_path__ webpack公共路径。当前文件的完整 URL，可用于计算异步模块的实际 URL
 __webpack_require__.p = ""; 




 // Load entry module and return exports
 // 这里是调用入口开始的地方！
 return __webpack_require__(__webpack_require__.s = "./demo1.js");
})
({ // 这个变量里面储存了打包后的key和对应的代码
 "./demo1.js":
 (function(module, exports) {
    eval("console.log('hey')\n\n//# sourceURL=webpack:///./demo1.js?");
 })
});
```

上述这些协作构建起一个简单的模块化体系从而实现ES Module规范所声明的模块化特性。构成了webpack运行时最基本的能力--模块化

# 打包引入文件

```
// a.js
export default 'aaaaa1';


// demo2.js
import './a.js';
console.log('demo2')


// webpack.config.js
module.exports = {
  entry: './demo2.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'development'
};
```

执行命令

```
webpack
```

打包之后结果如下：

![](https://pan.udolphin.com/files/image/2022/9/20ef0aebf67bb20df4979ef64eb32ff4.png)

看起来除了比单个文件多了个module，其他没有区别

# 打包异步模块

```
// a.js
export default 'aaaaa1';


// demo3.js
import('./a.js').then(() => 
  console.log('demo2')
);


// webpack.config.js
module.exports = {
  entry: './demo3.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'development'
};
```

执行命令

```
webpack
```

打包之后结果如下：

![](https://pan.udolphin.com/files/image/2022/9/d88c3a3738e69edce6027fcdecf4e94c.png)

![](https://pan.udolphin.com/files/image/2022/9/d55121bd4621d31bee75772afb273a58.png)

有变化了，多出来的部分：

```
 (function(modules) { // webpackBootstrap
   // ...(省略已有代码)
  // install a JSONP callback for chunk loading
  // 对这个模块 ID 对应的 Promise 执行 resolve()，同时将缓存对象中的值置为 0，表示已经加载完成了。
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];


    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [];
    for(;i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for(moduleId in moreModules) {
      if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if(parentJsonpFunction) parentJsonpFunction(data);


    while(resolves.length) {
      resolves.shift()();
    }
  };


  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  // 缓存动态模块
  var installedChunks = {
    "main": 0
  };


  // script path function
  // 根据 chunkId 生成 URL
  function jsonpScriptSrc(chunkId) {
    return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
  }
 
  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];


    // JSONP chunk loading for javascript
    var installedChunkData = installedChunks[chunkId];


    // 查看该模块 ID 对应缓存的值是否为 0，0 代表已经加载成功了
    if(installedChunkData !== 0) { // 0 means "already installed".
      // a Promise means "currently loading".
      if(installedChunkData) {
        // 如果不为 0 并且不是 undefined 代表已经是加载中的状态。然后将这个加载中的 Promise 推入 promises 数组
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        // 如果不为 0 并且是 undefined 就新建一个 Promise，用于加载需要动态导入的模块
        var promise = new Promise(function(resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);


        // start chunk loading
        // 生成一个 script 标签
        var script = document.createElement('script');
        // onScriptComplete 用于处理超时错误
        var onScriptComplete;


        script.charset = 'utf-8';
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        // script URL 使用 jsonpScriptSrc(chunkId) 生成，即需要动态导入模块的 URL。
        script.src = jsonpScriptSrc(chunkId);


        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        // 为这个 script 标签设置一个 2 分钟的超时时间，并设置一个 onScriptComplete() 函数，用于处理超时错误。
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if(chunk !== 0) {
            if(chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
              error.name = 'ChunkLoadError';
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function(){
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        // 然后添加到页面中 document.head.appendChild(script)，开始加载模块。
        document.head.appendChild(script);
      }
    }
    
    return Promise.all(promises);
  };
 
  // on error function for async loading
  // 加载异步模块出错时的错误处理函数
  __webpack_require__.oe = function(err) { console.error(err); throw err; };


  // 定义window["webpackJsonp"]  存储需要动态导入的模块
  /** 重写 window["webpackJsonp"] 数组的 push() 方法为 webpackJsonpCallback()。
    * 也就是说 window["webpackJsonp"].push() 其实执行的是 webpackJsonpCallback()。
    * 而从 0.bundle.js 文件可以发现，它正是使用 window["webpackJsonp"].push() 来放入动态模块的。
    * 动态模块数据项有两个值，第一个是 [0]，它是模块的 ID；
    * 第二个值是模块的路径名和模块内容。 
    */
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;




// ...(省略已有代码)
 })
 ({
 "./demo3.js":
   (function(module, exports, __webpack_require__) {
    eval("__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./demo1.js */ \"./demo1.js\")).then((res) => {\n  console.log('demo3');\n});\n\n\n//# sourceURL=webpack:///./demo3.js?");
   })
 });
```

## Q1：关于 webpack\_require​.r 为什么要给module做标记？

Webpack 实现了一套 CommonJS 模块化方案，支持打包 CommonJS 模块，同时也支持打包 ES 模块。但是两种模块格式混用的时候问题就来了，ES 模块和 CommonJS 模块并不完全兼容，CommonJS 的 module.exports 在 ES 模块中没有对应的表达方式，和默认导出 export default 是不一样的。

对于引用 ESM 文件：

```
// ESM mod.js
function foo () {}
export function bar () {}
export default foo
```

* 作为 ESM 引入

```
// ESM index.js
import defaultExport, { bar } from './mod.js'
```

* 作为 CJS 引入

```
// CJS index.js
const { default: defaultExport, bar } = require('./mod.js')
```

对于引用 CJS 文件

```
// CJS mod.js
function foo () {}
function bar () {}
module.exports = foo
module.exports.bar = bar // foo.bar === bar
```

* 作为 ESM 引入

```
// ESM index.js
import { bar } from './mod.js'
import foo from './mod.js'
console.log(bar)
console.log(foo)
console.log(foo())
```

* 作为 CJS 引入

```
// CJS index.js
const foo = require('./mod.js')
const bar = foo.bar
// 或 const { bar } = require('./mod.js')
```

可以发现 CommonJS 的module.exports没法对应 ES 模块。

然后为了解决这个问题，不知道是 JS 圈子里的谁最先提出了 \_\_esModule 这个解决方案，现在市面上的打包器都非常默契地遵守了这个约定。

表面上看就是把一个导出对象标识为一个 ES 模块：

```
exports.__esModule = true
//或者
Object.defineProperty(exports, '__esModule', { value: true })
```

webpack 在这一块的处理是：

![](https://pan.udolphin.com/files/image/2022/9/b17d99cda488785b0f58c44625c3b763.png)

![](https://pan.udolphin.com/files/image/2022/9/46363c3fb6d2cd96dcba943331446d0f.png)

在使用侧导入的默认导出实际上是一个 Getter 函数，读取值的时候访问了其自身的 a 属性，如果\_\_esModule为 true 那么 a 就是 module.exports.default，Getter 调用也返回 module.exports.default，否则 a 的值和 Getter 返回值就是 module.exports。所以在 Webpack 中这样用是没有问题的，Webpack 会根据\_\_esModule标识来自动处理 CommonJS 的模块导出对象，兼容 ES 模块中的导入。

## Q2：Symbol.toStringTag​ 是什么？

Symbol.toStringTag是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的Object.prototype.toString()方法会去读取这个标签并把它包含在自己的返回值里。

> 许多内置的 JavaScript 对象类型即便没有 toStringTag 属性，也能被 toString() 方法识别并返回特定的类型标签，比如：

```
Object.prototype.toString.call('foo');     // "[object String]"
Object.prototype.toString.call([1, 2]);    // "[object Array]"
Object.prototype.toString.call(3);         // "[object Number]"
Object.prototype.toString.call(true);      // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null);      // "[object Null]"
// ... and more
```

> 另外一些对象类型则不然，toString() 方法能识别它们是因为引擎为它们设置好了 toStringTag 标签：

```
Object.prototype.toString.call(new Map());       // "[object Map]"
Object.prototype.toString.call(function* () {}); // "[object GeneratorFunction]"
Object.prototype.toString.call(Promise.resolve()); // "[object Promise]"
// ... and more
```

> 但你自己创建的类不会有这份特殊待遇，toString() 找不到 toStringTag 属性时只好返回默认的 Object 标签：

```
class ValidatorClass {}


Object.prototype.toString.call(new ValidatorClass()); // "[object Object]"
Copy to Clipboard
```

> 加上 toStringTag 属性，你的类也会有自定义的类型标签了：

```
class ValidatorClass {
  get [Symbol.toStringTag]() {
    return "Validator";
  }
}


Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```