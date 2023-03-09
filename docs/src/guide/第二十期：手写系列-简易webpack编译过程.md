## 前言

webpack 5.0 版本之后，Webpack 功能集变得非常庞大，仅注释就有10000+行，70000+行代码。

## Why Webpack ?

* 因为我们需要从某个地方导入一些文件，我们可以使用webpack来解释这些语句。
* 因为我们知道我们需要连接和压缩JavaScript，并且管理加载顺序。
* 因为npm。强大的功能是一个yarn 或npm i，因此我们的项目被加载伴随着导入的填充。
* 因为在这个行业中有一个蜂群思维，它导致我们和大多数人一起跳上一列火车，而人们在webpack火车的窗户外等待。

## 概念

### entry

* 入口起点(entry point)指示 webpack 应该使用哪个模块,来作为构建其内部依赖图的开始。
* 进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的
* 每个依赖项随即被处理,最后输出到称之为 bundles 的文件中

支持三种形式：字符串、数组、对象

数组：webpack会⾃动⽣成另外⼀个⼊⼝模块，并将数组中的每个指定的模块加载进来，并将最后⼀个模块的module.exports作为⼊⼝模块的module.exports导出。

### chunk

代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

1 chunk = 1bundle

chunk是代码块，bundle是资源⽂件

什么是模块？nodeJS⾥ 万物皆模块，即文件

### bundle

资源文件

### Output

output 属性告诉 webpack 在哪里输出它所创建的 bundles,以及如何命名这些文件,默认值为 ./dist。

基本上,整个应用程序结构,都会被编译到你指定的输出路径的文件夹中。

### Loader

* loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
* loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块,然后你就可以利用 webpack 的打包能力，对它们进行处理。
* 本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

### Plugin

loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务。

插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能极其强大,可以用来处理各种各样的任务。

> 当我们会用一样东西的时候，就要适当地去了解一下这个东西是怎么运转的。

## 编译过程

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。


>

创建一个bundle.js文件

```javascript
// bundle.js
const webpack = require('./lib/webpack.js');
const options = require('./webpack.config.js');

new webpack(options).run();
```

执行命令

```javascript
node bundle.js
```

首先 ，定义一个 webpack类

```javascript
module.exports = class webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;    // 入口文件
    this.output = output;  // 输出文件
    this.modules = [];     // 存储各文件信息
  }
  
  run(){}     // 执行编译
  
  parse() {}  // 编译
  
  file() {}   // 输出文件
}
```

接下来编译模块

```javascript
parse(entryFile){
  // 获取模块内容
  const content = fs.readFileSync(entryFile, 'utf-8');
  
  // 分析模块，收集依赖 其实就是将用import语句引入的文件路径收集起来
  // - 将内容转化为 ast 语法树
  const ast = parser.parse(content, { sourceType: 'module' });
  
  // - 定义一个依赖对象，将收集起来的路径放到dependency里
  const dependency = {};
  
  // - 找出 ast 语法树中 导入的文件，并将其相对路径和绝对路径存入依赖中
  traverse(ast, {
    ImportDeclaration({ node }) {
      const newPathName =
            './' + path.join(path.dirname(entryFile), node.source.value);
      dependency[node.source.value] = newPathName;
    }
  });
  
  // 内容处理 将 ast语法树 转换成浏览器认识的代码
  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  
  // 将编译处理过的信息返回
  return {
    entryFile,
    dependency,
    code
  };
}
```

上一步已经找出了从入口文件开始的一系列依赖文件，转换过的代码

接下来，试着去执行编译

```javascript
run() {
  // 得到编译后的信息
  const info = this.parse(this.entry);
  
  // 把信息放入 modules 数组里
  this.modules.push(info);
  
  // 循环数组，根据依赖关系遍历并存入 modules
  for (let i = 0; i < this.modules.length; i++) {
    const item = this.modules[i];
    const { yilai } = item;
    if (dependency) {
      for (const j in dependency) {
        this.modules.push(this.parse(dependency[j]));
      }
    }
  }
  
  // 初始化依赖图对象
  const obj = {};
  
  // 将上面得到的依赖信息放入依赖图中
  this.modules.forEach((item) => {
    obj[item.entryFile] = {
      dependency: item.dependency,
      code: item.code
    };
  });
}
```

至此，已经得到了一个依赖图。

接下来，需要找到输出路径并且输出到相应文件中

```javascript
file(code) {
	// 拼接输出文件路径
  const filePath = path.join(this.output.path, this.output.filename);
  
  let template = fs.readFileSync(path.resolve(__dirname, './template.js'), 'utf8')
  template = template.replace('__entry__', this.entry)
    .replace('__modules_content__', newCode)
  
  // 写入文件
  fs.writeFileSync(filePath, template);
}
```

```javascript
// template.js
(function(modules) {
  // modules就是一个数组，元素就是一个个函数体，就是我们声明的模块

  function require(module) {
    function pathRequire(relativePath) {
      // relativePath: ./a.js -> ./src/a.js
      return require(modules[module].yilai[relativePath])
    }

    const exports = {};
    (function(require, exports, code) {
      eval(code);
    })(pathRequire, exports, modules[module].code)

    return exports;
  }
  require('__entry__');
}
)(__modules_content__);
```

生成bundle文件实质上是拼接出一个bundle.js文件内容的字符串，然后通过`fs.writeFileSync`写入到bundle.js文件。我们就仿照实际webpack的打包文件（webpack输出文件分析）来拼接字符串。整个输出文件是一个自执行函数。

1. 把保存下来的depsGraph，传入一个立即执行函数。
2. 将主模块路径传入require函数执行
3. 执行reuire函数的时候，又立即执行一个立即执行函数，这里是把code的值传进去了
4. 执行eval（code）。也就是执行主模块的code这段代码

`webpack`打包编译的时候，会统一替换成自己的`require`来实现模块的引入和导出，从而实现模块缓存机制，以及抹平不同模块规范之间的一些差异性。

最后

```javascript
run() {
  ...
  ...
  
  this.file(obj);
}
```

## path

### - path.join 

( \[...paths\] )

> * `...paths` string 路径片段的序列
> * 返回: string

`path.join()` 方法使用特定于平台的分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后规范化生成的路径。

零长度的 `path` 片段被忽略。 如果连接的路径字符串是零长度字符串，则将返回 `'.'`，表示当前工作目录。

### - path.resolve 

( \[...paths\] )

> * `...paths` string 路径或路径片段的序列
> * 返回: string

`path.resolve()` 方法将路径或路径片段的序列解析为绝对路径。

给定的路径序列从右到左处理，每个后续的 `path` 会被追加到前面，直到构建绝对路径。 例如，给定路径片段的序列：`/foo`、`/bar`、`baz`，调用 `path.resolve('/foo', '/bar', 'baz')` 将返回 `/bar/baz`，因为 `'baz'` 不是绝对路径，而 `'/bar' + '/' + 'baz'` 是。

如果在处理完所有给定的 `path` 片段之后，还没有生成绝对路径，则使用当前工作目录。

生成的路径被规范化，并删除尾部斜杠（除非路径解析为根目录）。

零长度的 `path` 片段被忽略。

如果没有传入 `path` 片段，则 `path.resolve()` 将返回当前工作目录的绝对路径。

## fs

### - fs.readFileSync

 (path\[,options\])

> * `path` string | Buffer | integer文件名或文件描述符
> * options  Object | string
>     * `encoding` string | null **默认值:** `null`
>     * `flag` string。
> * return string | Buffer

返回 `path` 的内容。如果指定了 `encoding` 选项，则此函数返回字符串。 否则它返回Buffer

> UTF-8 (UCS Transformation Format 8)是万维网上最常用的字符编码
> 
> 字符编码：
> 
> 一套编码系统定义字节与文本间的映射。一连串字节文本能让不同文本解释得以进行。我们指明一套特定编码系统时（如 UTF-8），也就指明了字节得以解释的方式。
> 
> 例如，我们通常在 HTML 里声明 UTF-8 字符编码，使用如下：
>
> ```
> <meta charset="utf-8">
> ```
>
> 这就确保你在 HTML 文档中可以使用几乎任何一种人类语言中的字符，并且会稳定显示。

### - fs.writeFileSync

（file, data\[,options\]）

> * `file`  string | Buffer | URL |  integer 文件名或文件描述符
> * `data`  string | Buffer | TypeArray | DataView | Object
> * `options`  Object |  string
>     * `encoding`   string | null 默认值: `'utf8'`
>     * `mode` integer 默认值: `0o666`
>     * `flag` integer 默认值: `'w'`。
> * return undefined

当 `file` 是文件名时，将数据同步地写入文件，如果文件已存在则替换该文件。 `data` 可以是字符串或缓冲区。

当 `file` 是文件描述符时，其行为类似于直接调用 `fs.write()`。

如果 `data` 是缓冲区，则忽略 `encoding` 选项。

`mode` 选项仅影响新创建的文件。 有关详细信息，请参阅 `fs.open()`。

如果 `data` 是普通的对象，则它必须具有自有的（不是继承的）`toString` 函数属性。

## babel

### @babel/parser

(code, \[options\])

```bash
npm i @babel/parser -D
```

Babel 使用的 JavaScript 解析器，将代码转换成 AST 树

此处 options 配置为

```javascript
 const ast = parser.parse(content, { sourceType: 'module' });
```

指明模式的代码应解析。三种模式：`script`，`module`或`unambiguous`。默认为 `script`。 `unambiguous `将使 @babel/parser 尝试根据 ES6或语句的存在来*猜测*。带有 ES6  imports 和 exports 的文件被看作 `module` ，否则看作 `script`。

### @babel/traverse

```bash
npm i @babel/traverse -D
```

可以用它来查找 AST 语法树中特定的节点类型

```javascript
const traverse = require('@babel/traverse').default;

traverse(ast, {
  ImportDeclaration({ node }) {
    const newPathName = './' + path.join(path.dirname(entryFile), node.source.value);
    yilai[node.source.value] = newPathName;
  }
});
```

### @babel/core

```bash
npm i @babel/core -D
```

babel 核心

```javascript
const { transformFromAst } = require('@babel/core');

// 内容处理
const { code } = transformFromAst(ast, null, {
  presets: ['@babel/preset-env']
});
```

这一步可以将 AST语法树 转换成ES5

处理此文件时要激活的一组预设。有关单个条目如何交互的更多信息，尤其是在跨多个嵌套[`"env"`](https://babel.docschina.org/docs/en/options/#env)和 [`"overrides"`](https://babel.docschina.org/docs/en/options/#overrides)配置使用时，请参阅[合并](https://babel.docschina.org/docs/en/options/#merging)。

注意：预设的格式与插件相同，除了名称规范化需要“预设-”而不是“插件-”，并且预设不能是`Plugin`.

### @babel/preset-env

```bash
npm i @babel/core -D
```

是一个智能预设，允许您使用最新的 JavaScript，而无需对目标环境需要哪些语法转换（以及可选的浏览器 polyfill）进行微观管理。这会让  JavaScript 包更小。