(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{324:function(n,e,t){"use strict";t.r(e);var s=t(14),a=Object(s.a)({},(function(){var n=this,e=n._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("p",[n._v("chunk是输出产物的基本组织单位，在生成阶段 webpack 按规则将 entry 及其它 module 插入 chunk 中，之后再由 SplitChunksPlugin 插件根据优化规则与 ChunkGraph 对 chunk 做一系列的变化、拆解、合并操作，重新组织成一批性能(可能)更高的 chunks 。运行完毕之后 webpack 继续将 chunk 一一写入物理文件中，完成编译工作。")]),n._v(" "),e("p",[n._v("本文将会介绍webpack 基本的分包规则，以及如何通过配置SplitChunksPlugin、ChunkGraph优化分包")]),n._v(" "),e("h1",{attrs:{id:"默认分包规则"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#默认分包规则"}},[n._v("#")]),n._v(" 默认分包规则")]),n._v(" "),e("p",[n._v("默认有以下规则：(默认规则集中在compilation.seal 函数实现)")]),n._v(" "),e("ul",[e("li",[n._v("同一个entry下触达到的模块组织成一个 chunk")]),n._v(" "),e("li",[n._v("异步模块单独组织为一个 chunk")]),n._v(" "),e("li",[n._v("entry.runtime单独组织成一个 chunk")])]),n._v(" "),e("h2",{attrs:{id:"entry-分包处理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#entry-分包处理"}},[n._v("#")]),n._v(" Entry 分包处理")]),n._v(" "),e("blockquote",[e("p",[n._v("seal 阶段遍历 entry 对象，为每一个 entry 单独生成 chunk，之后再根据模块依赖图将 entry 触达到的所有模块打包进 chunk 中。")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('// 比如对于如下配置：\nmodule.exports = {\n  entry: {\n   entry1: "./src/entry1",\n   entry2: "./src/entry2",\n  }\n};\n')])])]),e("p",[n._v("遍历 entry 对象属性并创建出 chunk[entry1] 、chunk[entry2] 两个对象，最后形成如下两个chunk："),e("br"),n._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/e7b5c2afa326bf9b4c44e87edc87f91d.png",alt:""}})]),n._v(" "),e("p",[n._v("生成的dist目录如下：("),e("em",[n._v("基于 entry 生成的 chunk 通常称之为「Initial chunk」")]),n._v(")")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/992a6f08c5df0b9c7c81f2bbe672bfbb.png",alt:""}})]),n._v(" "),e("h2",{attrs:{id:"异步模块分包处理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#异步模块分包处理"}},[n._v("#")]),n._v(" 异步模块分包处理")]),n._v(" "),e("blockquote",[e("p",[n._v("遇到异步模块则创建单独的 Chunk 对象，单独打包异步模块，其子模块也都加入这个 chunk 中。")])]),n._v(" "),e("p",[n._v("Webpack 4 之后，只需要用异步语句 require.ensure('./a.js') 或 import('./a.js') 方式引入模块，就可以实现模块的动态加载。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("// entry1.js\nrequire('a.js')\nrequire('b.js')\n​\n// entry2.js\nrequire('c.js')\nrequire.ensure([], function(require){\n  require('./async-d.js');\n});\n\n// async-d.js\nrequire('e.js')\n")])])]),e("p",[n._v("在 entry1 中，以同步方式引入 a.js、b.js；entry2以异步方式引入 async-d.js 模块；在async-d.js 中以同步方式引入 e.js 模块。对应的模块依赖如：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/e3d6df65f873eb6fd821b82d89065480.png",alt:""}})]),n._v(" "),e("p",[n._v("生成的dist目录如下：("),e("em",[n._v("基于异步模块的 chunk 通常称之为「Async chunk」")]),n._v(")")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/17f0259df62dd4c206d95f6eb07e91f1.png",alt:""}})]),n._v(" "),e("p",[n._v("异步生成的chunk ，chunk间会形成父子关系。引用者(上例 entry-2)需要在特定场景下使用被引用者(上例 async-d)，两者间存在单向依赖关系，在 webpack 中称引用者为 parent、被引用者为 child。")]),n._v(" "),e("p",[n._v("运行时，webpack 在 entry2 中使用 promise 及 __webpack_require__.e 方法异步载入并运行文件 async-d-chunk.js ，从而实现动态加载。")]),n._v(" "),e("h2",{attrs:{id:"runtime-分包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#runtime-分包"}},[n._v("#")]),n._v(" Runtime 分包")]),n._v(" "),e("blockquote",[e("p",[n._v("Webpack 5 之后支持根据 entry.runtime 配置单独打包运行时代码。")])]),n._v(" "),e("p",[n._v("除业务代码外，Webpack 编译产物中还需要包含一些用于支持 webpack 模块化、异步加载等特性的支撑性代码，这类代码在 webpack 中被统称为 runtime。举个例子，产物中通常会包含如下代码：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('/******/ (() => { // webpackBootstrap\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ "./src/entry1.js":\n/*!***********************!*\\\n  !*** ./src/entry1.js ***!\n  \\***********************/\n/***/ (() => {\n\neval("\\n\\n//# sourceURL=webpack://webpack-make/./src/entry1.js?");\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module can\'t be inlined because the eval devtool is used.\n/******/ \tvar __webpack_exports__ = {};\n/******/ \t__webpack_modules__["./src/entry1.js"]();\n/******/ \t\n/******/ })()\n;\n')])])]),e("p",[n._v("编译时，Webpack 会根据业务代码决定输出那些支撑特性的运行时代码，例如：")]),n._v(" "),e("p",[n._v("需要 __webpack_require__.f 、__webpack_require__.r 等功能实现最起码的模块化支持")]),n._v(" "),e("p",[n._v("如果用到动态加载特性，则需要写入__webpack_require__.e函数")]),n._v(" "),e("p",[n._v("如果用到 Module Federation 特性，则需要写入__webpack_require__.o函数等等")]),n._v(" "),e("p",[n._v("虽然每段运行时代码可能都很小，但随着特性的增加，最终结果会越来越大，特别对于多 entry 应用，在每个入口都重复打包一份相似的运行时代码显得有点浪费，为此 webpack 5 专门提供了 entry.runtime 配置项用于声明如何打包运行时代码。用法上只需在 entry 项中增加字符串形式的 runtime 值，例如：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('module.exports = {\n  entry: {\n   entry1: { import: "./src/entry1", runtime: "solid-runtime" },\n  }\n};\n')])])]),e("p",[n._v("Webpack 执行完 entry、异步模块分包后，开始遍历 entry 配置判断是否带有runtime属性，如果有则创建以runtime值为名的 chunk，生成的dist目录如下：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/61ee4b86cb22fdab72c4764be69fd04f.png",alt:""}})]),n._v(" "),e("p",[n._v("在多 entry 场景中，只要为每个 entry 都设定相同的 runtime 值，webpack 运行时代码最终就会集中写入到同一个 chunk，例如对于如下配置：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("module.exports = {\n  entry: {\n    entry1: { import: './src/entry1', runtime: 'solid-runtime' },\n    entry2: { import: './src/entry2', runtime: 'solid-runtime' }\n  }\n};\n")])])]),e("p",[n._v("生成的dist目录如下："),e("br"),n._v(" "),e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/58d3bc80d7b39b69f55d05a50a86c6c7.png",alt:""}})]),n._v(" "),e("h1",{attrs:{id:"默认分包规则的问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#默认分包规则的问题"}},[n._v("#")]),n._v(" 默认分包规则的问题")]),n._v(" "),e("p",[n._v("默认分包规则最大的问题是无法解决模块重复，如果多个 chunk 同时包含同一个 module，那么这个 module 会被不受限制地重复打包进这些 chunk。对最终产物可能造成不必要的性能损耗。")]),n._v(" "),e("p",[n._v("Webpack 会将所有代码构建成一个单独的包，这在小型项目通常不会有明显的性能问题，但伴随着项目的推进，包体积逐步增长可能会导致应用的响应耗时越来越长。归根结底这种将所有资源打包成一个文件的方式存在两个弊端：")]),n._v(" "),e("p",[n._v("「资源冗余」：客户端必须等待整个应用的代码包都加载完毕才能启动运行，但可能用户当下访问的内容只需要使用其中一部分代码")]),n._v(" "),e("p",[n._v("「缓存失效」：将所有资源达成一个包后，所有改动 —— 即使只是修改了一个字符，客户端都需要重新下载整个代码包，缓存命中率极低")]),n._v(" "),e("p",[n._v("这些问题都可以通过对产物做适当的分解拆包解决，例如 node_mopdules 中的资源通常变动较少，可以抽成一个独立的包，那么业务代码的频繁变动不会导致这部分第三方库资源被无意义地重复加载。为此，Webpack 专门提供了 SplitChunkslugin 插件，用于实现产物分包。")]),n._v(" "),e("h1",{attrs:{id:"splitchunksplugin"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#splitchunksplugin"}},[n._v("#")]),n._v(" SplitChunksPlugin")]),n._v(" "),e("p",[n._v("SplitChunksPlugin 默认只对 Async Chunk 生效，开发者也可以通过 webpack.config.js 调整作用范围，该配置项支持如下值：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("module.exports = {\n  //...\n  optimization: {\n    splitChunks: {\n      chunks: 'all',\n    },\n  },\n}\n")])])]),e("ul",[e("li",[n._v("'all'：对 Initial Chunk 与 Async Chunk 都生效，建议优先使用该值")]),n._v(" "),e("li",[n._v("'initial'：只对 Initial Chunk 生效")]),n._v(" "),e("li",[n._v("'async' ：只对 Async Chunk 生效")]),n._v(" "),e("li",[n._v("(chunk) => boolean：该函数返回 true 时生效")])]),n._v(" "),e("h2",{attrs:{id:"根据-module-使用频率分包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#根据-module-使用频率分包"}},[n._v("#")]),n._v(" 根据 Module 使用频率分包")]),n._v(" "),e("p",[n._v("按 Module 被 Chunk 引用的次数决定是否进行分包，可通过以下方式设定最小引用次数，例如：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("module.exports = {\n //...\n optimization: {\n  splitChunks: {\n    chunks： 'all',\n   minChunks: 2, // 引用次数<=2的模块不进行分包\n   },\n  },\n}\n")])])]),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/eb076814c57b4486ee6d9a9186efa9aa.png",alt:""}})]),n._v(" "),e("p",[n._v("生成的dist目录如下：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/1a6bbc0cf451cc2ed92b370a124ad3ad.png",alt:""}})]),n._v(" "),e("h2",{attrs:{id:"限制分包数量"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#限制分包数量"}},[n._v("#")]),n._v(" 限制分包数量")]),n._v(" "),e("p",[n._v("在满足 minChunks 基础上，还可以通过 maxInitialRequests / maxAsyncRequests 配置项限定分包数量，配置项语义：")]),n._v(" "),e("p",[n._v("maxInitialRequests：用于设置 Initial Chunk 最大并行请求数")]),n._v(" "),e("p",[n._v("maxAsyncRequests：用于设置 Async Chunk 最大并行请求数")]),n._v(" "),e("p",[n._v("这里所说的“请求数”，是指加载一个 Chunk 时所需同步加载的分包数。例如对于一个 Chunk A，如果根据分包规则(如模块引用次数、第三方包)分离出了若干子 Chunk A¡，那么请求 A 时，浏览器需要同时请求所有的 A¡，此时并行请求数等于 ¡ 个分包加 A 主包，即 ¡+1。")]),n._v(" "),e("p",[n._v("而对于下述模块关系：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/4bfd335173a724c2f7b40ad388f47208.png",alt:""}})]),n._v(" "),e("p",[n._v("若 minChunks = 2，则 common-1、common-2 同时命中 minChunks 规则被分别打包，浏览器请求 entry-b 时需要同时请求 comon-1、common-2 两个分包，并行数为 2 + 1 = 3，此时若 maxInitialRequests = 2 ，则分包数超过阈值，SplitChunksPlugin 会放弃 comon-1、common-2 中体积较小的分包。maxAsyncRequests 逻辑与此类似，不在赘述。")]),n._v(" "),e("p",[n._v("并行请求数关键逻辑总结如下：")]),n._v(" "),e("p",[n._v("Initial Chunk 本身算一个请求")]),n._v(" "),e("p",[n._v("Async Chunk 不算并行请求")]),n._v(" "),e("p",[n._v("通过 runtimeChunk 拆分出的 runtime 不算并行请求")]),n._v(" "),e("p",[n._v("如果同时有两个 Chunk 满足拆分规则，但是 maxInitialRequests（或maxAsyncRequestss）的值只能允许再拆分一个模块，那么体积更大的模块会被优先拆解")]),n._v(" "),e("h2",{attrs:{id:"限制分包体积数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#限制分包体积数"}},[n._v("#")]),n._v(" 限制分包体积数")]),n._v(" "),e("p",[n._v("在满足 minChunks 与 maxAsyncRequests 的基础上，SplitChunksPlugin 还会进一步判断 Chunk 包大小决定是否分包，这一规则相关的配置项非常多：")]),n._v(" "),e("ul",[e("li",[n._v("minSize：超过这个尺寸的 Chunk 才会正式被分包")]),n._v(" "),e("li",[n._v("maxSize：超过这个尺寸的 Chunk 会尝试继续做分包")]),n._v(" "),e("li",[n._v("maxAsyncSize：与maxSize 功能类似，但只对异步引入的模块生效")]),n._v(" "),e("li",[n._v("maxInitialSize：与maxSize 类似，但只对entry 配置的入口模块生效")]),n._v(" "),e("li",[n._v("enforceSizeThreshold：超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 size 限制")])]),n._v(" "),e("p",[n._v("结合前面介绍的两种规则，SplitChunksPlugin 的主体流程如下：")]),n._v(" "),e("ol",[e("li",[n._v("SplitChunksPlugin 尝试将命中 minChunks 规则的 Module 统一抽到一个额外的 Chunk 对象；")]),n._v(" "),e("li",[n._v("判断该 Chunk 是否满足 maxInitialRequests 阈值，若满足则进行下一步")]),n._v(" "),e("li",[n._v("判断该 Chunk 资源的体积是否大于上述配置项 minSize 声明的下限阈值；")]),n._v(" "),e("li",[n._v("如果体积「小于」 minSize 则取消这次分包，对应的 Module 依然会被合并入原来的 Chunk")]),n._v(" "),e("li",[n._v("如果 Chunk 体积「大于」minSize 则判断是否超过 maxSize、maxAsyncSize、maxInitialSize 声明的上限阈值，如果超过则尝试将该 Chunk 继续分割成更小的部分")])]),n._v(" "),e("blockquote",[e("p",[n._v("虽然 maxSize 等上限阈值逻辑会产生更多的包体，但缓存粒度会更小，命中率相对也会更高，配合持久缓存与 HTTP 2 的多路复用能力，网络性能反而会有正向收益。")])]),n._v(" "),e("p",[n._v("以上述模块为例")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/3/eb076814c57b4486ee6d9a9186efa9aa.png",alt:""}})]),n._v(" "),e("p",[n._v("若此时 minChunks 大于 2，且 maxInitialRequests 也大于 2，如果 common 模块的体积大于上述说明的 minSize 配置项则分包成功，common 会被分离为单独的 Chunk，否则会被合并入原来的 3 个 Chunk。")]),n._v(" "),e("blockquote",[e("p",[n._v("优先级顺序：maxInitialRequests/maxAsyncSize < maxSize < minSize ，命中 enforceSizeThreshold 阈值的 Chunk 会直接跳过这些属性判断，强制进行分包。")])]),n._v(" "),e("h1",{attrs:{id:"cachegroups"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cachegroups"}},[n._v("#")]),n._v(" CacheGroups")]),n._v(" "),e("h2",{attrs:{id:"缓存组"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#缓存组"}},[n._v("#")]),n._v(" 缓存组")]),n._v(" "),e("p",[n._v("除上述规则外，SplitChunksPlugin 还提供了 cacheGroups 配置项用于为不同文件组设置不同的规则，例如：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("module.exports = {\n //...\n optimization: {\n  splitChunks: {\n   cacheGroups: {\n    vendors: {\n      test: /[\\\\/]node_modules[\\\\/]/,\n      minChunks: 1,\n      minSize: 0\n     }\n    },\n   },\n  },\n};\n")])])]),e("p",[n._v("示例通过 cacheGroups 属性设置 vendors 缓存组，所有命中 vendors.test 规则的模块都会被视作 vendors 分组，优先应用该组下的 minChunks、minSize 等分包配置。")]),n._v(" "),e("p",[n._v("除了 minChunks 等分包基础配置项之外，cacheGroups 还支持一些与分组逻辑强相关的属性，包括：")]),n._v(" "),e("ul",[e("li",[n._v("test：接受正则表达式、函数及字符串，所有符合 test 判断的 Module 或 Chunk 都会被分到该组")]),n._v(" "),e("li",[n._v("type：接受正则表达式、函数及字符串，与 test 类似均用于筛选分组命中的模块，区别是它判断的依据是文件类型而不是文件名，例如 type='json' 会命中所有 JSON 文件")]),n._v(" "),e("li",[n._v("idHint：字符串型，用于设置 Chunk ID，它还会被追加到最终产物文件名中，例如 idHint = 'vendors' 时，输出产物文件名形如 vendors-xxx-xxx.js")]),n._v(" "),e("li",[n._v("priority：数字型，用于设置该分组的优先级，若模块命中多个缓存组，则优先被分到 priority 更大的组")])]),n._v(" "),e("p",[n._v("缓存组的作用在于能为不同类型的资源设置更具适用性的分包规则，一个典型场景是将所有 node_modules 下的模块统一打包到 vendors 产物，从而实现第三方库与业务代码的分离。")]),n._v(" "),e("h2",{attrs:{id:"默认分组"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#默认分组"}},[n._v("#")]),n._v(" 默认分组")]),n._v(" "),e("p",[n._v("Webpack 提供了两个开箱即用的 cacheGroups ，分别命名为 default 与 defaultVendors ，默认配置：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('module.exports = {\n //...\n optimization: {\n  splitChunks: {\n   cacheGroups: {\n    default: {\n     idHint: "",\n     reuseExistingChunk: true,\n     minChunks: 2,\n     priority: -20\n     },\n    defaultVendors: {\n     idHint: "vendors",\n     reuseExistingChunk: true,\n     test: /[\\\\/]node_modules[\\\\/]/i,\n     priority: -10\n     }\n    },\n   },\n  },\n};\n')])])]),e("p",[n._v("这两个配置组能帮助我们：")]),n._v(" "),e("ul",[e("li",[n._v("将所有 node_modules 中的资源单独打包到 vendors-xxx-xxx.js 命名的产物")]),n._v(" "),e("li",[n._v("对引用次数大于等于 2 的模块，也就是被多个 Chunk 引用的模块，单独打包")])]),n._v(" "),e("p",[n._v("开发者也可以将默认分组设置为 false，关闭分组配置，例如：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("module.exports = {\n //...\n optimization: {\n  splitChunks: {\n   cacheGroups: {\n    default: false\n    },\n   },\n  },\n};\n")])])]),e("h1",{attrs:{id:"拆分运行时包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#拆分运行时包"}},[n._v("#")]),n._v(" 拆分运行时包")]),n._v(" "),e("p",[n._v("运行时代码的内容由业务代码所使用到的特性决定，例如当 Webpack 检测到业务代码中使用了异步加载能力，就会将异步加载相关的运行时注入到产物中，因此业务代码用到的特性越多，运行时就会越大，有时甚至可以超过 1M 之多。此时，可以将运行时代码拆分到一个独立的 Chunk，实现分包。配置如下：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("module.exports = {\n  //...\n  optimization: {\n\truntimeChunk: true,\n  }\n}\n")])])]),e("p",[n._v("默认值为false，即每个条目块嵌入运行时。")]),n._v(" "),e("p",[n._v("这一配置用于优化持久化缓存, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更, 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块(通常会被包含在最后一个 bundle 中)缓存失效. optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.")])])}),[],!1,null,null,null);e.default=a.exports}}]);