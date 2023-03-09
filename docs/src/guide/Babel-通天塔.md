# 前言

在学习babel之前，一直只知道它是一个JS编译器，大概功能是帮助我们在旧的浏览器环境中将ES6+代码转换成向后兼容版本的JS代码，但其中重要的转换功能是靠什么实现，以及里面到底有什么学问?今天就带大家了解一下Babel，在学习Babel之前，我们先来了解一下它的历史

# 历史

Babel 的作者是 FaceBook 的工程师 Sebastian McKenzie（澳大利亚）。他在 2014 年发布了一款 JavaScript 的编译器 6to5。从名字就能看出来，它主要的作用就是将 ES6 转化为 ES5。

但是后来随着 es 标准的演进，有了 es7、es8 等， 6to5 的名字已经不合适了，所以改名为了 Babel。

![](https://pan.udolphin.com/files/image/2022/4/b23c01264f0e9ea6d66ae3ba20441f72.png)

Babel 是[巴别塔](https://link.juejin.cn/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E5%25B7%25B4%25E5%2588%25AB%25E5%25A1%2594%2F67557%3Ffr%3Daladdin)的意思，来自圣经中的典故：

> 当时地上的人们都说同一种语言，当人们离开东方之后，他们来到了示拿之地。在那里，人们想方设法烧砖好让他们能够造出一座城和一座高耸入云的塔来传播自己的名声，以免他们分散到世界各地。上帝来到人间后看到了这座城和这座塔，说一群只说一种语言的人以后便没有他们做不成的事了；于是上帝将他们的语言打乱，这样他们就不能听懂对方说什么了，还把他们分散到了世界各地，这座城市也停止了修建。这座城市就被称为“巴别城”。 -- 《创世记》

这很符合 Babel 的转译器的定位。

# 介绍

看一下[官网](https://babel.docschina.org/docs/en)定义：**Babel是一个JavaScript compiler**

Babel 可以做的主要事情：

* 转换语法
* Polyfill 目标环境中缺少的功能（通过如[core-js](https://github.com/zloirock/core-js)的第三方polyfill）
* 源代码转换(codemods)

**转译 esnext、typescript、flow 等到目标环境支持的 js**

这个是最常用的功能，用来把代码中的 esnext 的新的语法、typescript 和 flow 的语法转成基于目标环境支持的语法的实现。并且还可以把目标环境不支持的 api 进行 polyfill。它支持语法扩展，能支持像 React 所用的 JSX 语法，同时还支持用于静态类型检查的流式语法（Flow Syntax）。

**一些特定用途的代码转换**

Babel 是一个转译器，暴露了很多 api，用这些 api 可以完成代码到 AST 的 parse，AST 的转换，以及目标代码的生成。

开发者可以用它来来完成一些特定用途的转换，比如函数插桩（函数中自动插入一些代码，例如埋点代码）、default import 转 named import 等。

更重要的是，Babel 的一切都是简单的插件，谁都可以创建自己的插件，利用 Babel 的全部威力去做任何事情。

再进一步，Babel 自身被分解成了数个核心模块，任何人都可以利用它们来创建下一代的 JavaScript 工具。

此外它还拥有众多模块可用于不同形式的静态分析。

**代码的静态分析**

静态分析是在不需要执行代码的前提下对代码进行分析的处理过程 （执行代码的同时进行代码分析即是动态分析）。 静态分析的目的是多种多样的， 它可用于语法检查，编译，代码高亮，代码转换，优化，压缩等等场景。

# Babel如何工作的？

首先我们回顾一下AST,Babel本质上就是在操作AST来完成代码的转译。

我们来看一个例子

```
// es2015 的 const 和 arrow function
const add = (a, b) => a + b;


// Babel 转译后
var add = function add(a, b) {
  return a + b;
};
```

JS代码会生成一个怎样的AST,Babel又是怎么去操作AST的?

我们在[ASTexplorer](https://astexplorer.net/)来看看它生成的AST是怎么样的：

```
{
  "type": "Program",
  "start": 0,
  "end": 206,
  "body": [
    {
      "type": "VariableDeclaration",//变量声明
      "start": 179,
      "end": 206,
      "declarations": [//具体声明
        {
          "type": "VariableDeclarator",//变量声明
          "start": 185,
          "end": 205,
          "id": {
            "type": "Identifier",//标识符
            "start": 185,
            "end": 188,
            "name": "add"//函数名
          },
          "init": {
            "type": "ArrowFunctionExpression",//箭头函数
            "start": 191,
            "end": 205,
            "id": null,
            "expression": true,
            "generator": false,
            "async": false,
            "params": [//参数
              {
                "type": "Identifier",
                "start": 192,
                "end": 193,
                "name": "a"
              },
              {
                "type": "Identifier",
                "start": 194,
                "end": 195,
                "name": "b"
              }
            ],
            "body": {//函数体
              "type": "BinaryExpression",//二项式
              "start": 200,
              "end": 205,
              "left": {//二项式左边
                "type": "Identifier",
                "start": 200,
                "end": 201,
                "name": "a"
              },
              "operator": "+",
              "right": {//二项式右边
                "type": "Identifier",
                "start": 204,
                "end": 205,
                "name": "b"
              }
            }
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```

![](https://pan.udolphin.com/files/image/2022/4/a03abc648c046ab7b0195788726644a3.png)

一个AST的根节点始终都是Program，上面的例子我们从declarations开始往下读：

一个VariableDeclaration(变量声明)：声明了一个name为addArrowFunctionExpression(箭头函数)：

* params(函数入参)：a和b
* 函数体：函数主体是一个BinaryExpression(二项式)，一个标准的二项式分为三部分：

- left(左边)：a

- operator(运算符)：加号 +

- right(右边)：b

这样就拆解了这一行代码。

若想深入了解AST,可前往[编译原理 - 抽象语法树（Abstract Syntax Tree，AST）](https://wiki.uino.com/book/60fea4b11fc2c4022f4f0b25/618389aba079648bcdace026.html)

# 编译流程

了解了AST是什么样的，就可以了解Babel的工作流程了。

Babel整体编译流程分为三步：

* parse（解析）：通过parse把源码转成抽象语法树（AST）
* transform（转换）: 遍历AST,调用各种transform插件对AST进行增删改
* generate（代码生成）：把转换后的AST打印成目标代码，并生成sourcemap

![](https://pan.udolphin.com/files/image/2022/4/c098417db117a1b50ed985df6be040e5.png)

**为什么会分为这三步**

源码是一串按照语法格式来组织的字符串，人能够认识，但是计算机并不认识，想让计算机认识就要转成一种数据结构，通过不同的对象来保存不同的数据，并且按照依赖关系组织起来，这种数据结构就是抽象语法树。之所以叫抽象语法树是因为数据结构中省略了一些无具体意义的分隔符如；{}等。有了AST,计算机就能理解源码字符串的意思，所以编译的第一步需要把源码parse成AST。

转成AST之后就可以通过修改AST的方式来修改代码，这一步会遍历AST并进行各种增删改，这一步也是babel最核心的部分。

经过转换以后的AST就是符合要求的代码，就可以再转回字符串，转回字符串的过程中把之前删掉的一些分隔符再加回来。

简单总结**：为了让计算机理解代码需要先对源码字符串进行parse，生成AST，把对代码的修改转为对AST的增删改，转换完AST之后再打印成目标字符串。**

**这三步都做了什么？**

![](https://pan.udolphin.com/files/image/2022/4/c9b5c824a67f3e1cf99b484199d4ff1b.png)

**parse**

parse阶段的目的是把源码字符串转换成机器能理解的AST,这个过程分为词法分析、语法分析。

比如const add = (a, b) => a + b;这样一段源码，我们要先把它分为一个个不能细分的单词（token），也就是"const", "add", "=", "(", "a", "," , "b", ")", "=>", "a", “+”, “b”\]，这个过程是词法分析，按照单词的构成规则来拆分字符串单词。

之后要把token进行递归的组装，生成AST，这个过程是语法分析，按照不同的语法结构，来把一组单词组合成对象。

**transform**

transform阶段是对parse生成的AST的处理，会进行AST的遍历，遍历的过程处理到不同的AST节点会调用注册的相应的visitor函数，visitor函数里可以对AST节点进行增删改，返回新的AST(可以指定是否继续遍历新生成的AST）。这样遍历完一遍AST之后就完成了对代码的修改。

**generate**

generate阶段会把AST打印成目标代码字符串，并且会生成sourcemap。不同的AST对应的不同结构的字符串。这样从AST根节点进行递归打印，就可以生成目标代码的字符串。

## Parse(解析)

parse 这个阶段将原始代码字符串转为 AST 树

> parse(sourceCode) => AST

parse 阶段，主要通过@babel/parser这个包进行转换，之前叫 babylon，是基于 acorn 实现的，扩展了很多语法，可以支持 esnext（现在支持到 es2020）、jsx、flow、typescript 等语法的解析，其中 jsx、flow、typescript 这些非标准的语法的解析需要指定语法插件。

我们可以手动调用下 parser 的方法进行转换，便会得到一份 AST：

我们看[https://astexplorer.net/](https://astexplorer.net/)

```
const parser = require("@babel/parser");

const code = `const add = (a, b) => a + b;`
const result = parser.parse(code)
console.log(result);
```

我们可以看到AST中有很多相似的元素，它们都有一个type属性，这样的元素被称作**节点**。一个节点通常含有若干属性，可以用于描述AST的部分信息。

比如这是一个最常见的Identifier节点：

{

type: 'Identifier',

name: 'add'

}

表示这是一个标识符。

所以，操作AST也就是操作其中的节点，可以增删改这些节点，从而转换成实际需要的AST。

那么操作AST就是Transform（转换）阶段了。

更多的节点规范可以在[https://github.com/estree/estree](https://link.zhihu.com/?target=https%3A//github.com/estree/estree)中查看。

## Transform(转换)

transform 阶段主要是对上一步 parse 生成的 AST 进行深度优先遍历，从而对于匹配节点进行增删改查来修改树形结构。在 Babel 中会用所配置的 plugin 或 presets 对 AST 进行修改后，得到新的 AST，我们的 Babel 插件大部分用于这个阶段。

> transform(AST, BabelPlugins) => newAST

Babel 中通过@babel/traverse这个包来对 AST 进行深度优先遍历， 对于AST上的每一个分支Babel都会先向下遍历走到尽头，然后再向上遍历退出刚遍历过的节点，然后寻找下一个分支。

这一阶段使用了**访问者模式**，对 AST 进行遍历，遍历过程中处理不同的AST会调用不同的visitor函数来实现遍历。

### 访问者模式

**当被操作的对象结构比较稳定，而操作对象的逻辑经常变化的时候，通过分离逻辑和对象结构，使得他们能独立扩展。这就是 visitor 模式的思想。**

AST就是操作对象，visitor就是操作逻辑，两者可以独立扩展，在traverse里组合两者，在traverse(遍历)AST的时候，调用注册的visitor来对其进行处理。

这样使得AST的结构和遍历算法固定，visitor可以通过插件独立扩展。

![](https://pan.udolphin.com/files/image/2022/4/6964d9c6d2cfa50a261eaf338c0a8d1c.png)

想象一下，Babel 有那么多插件，如果每个插件自己去遍历AST，对不同的节点进行不同的操作，维护自己的状态。这样子不仅低效，它们的逻辑分散在各处，会让整个系统变得难以理解和调试， 最后插件之间关系就纠缠不清，乱成一锅粥。

**所以转换器操作 AST 一般都是使用访问器模式，由这个访问者(Visitor)来 ① 进行统一的遍历操作，② 提供节点的操作方法，③ 响应式维护节点之间的关系；而插件(设计模式中称为‘具体访问者’)只需要定义自己感兴趣的节点类型，当访问者访问到对应节点时，就调用插件的访问(visit)方法。**

### Visitor

visitor 是一个由各种type或者是enter和exit组成的对象，这个对象定义了用于**AST**中获取具体节点的方法。在其中可以定义在遍历 AST 的过程中匹配到某种类型的节点后该如何操作 ,写法如下：

```
visitor: {
    Identifier (path, state) {},
    StringLiteral: {
        enter (path, state) {},
        exit (path, state) {}
    }
}
```

比如我们拿这个visitor来遍历这样一个AST：

```
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default


const code = `const add = (a, b) => a + b;`
const ast = parser.parse(code)


traverse(ast, {
  enter(path) {
    if (path.isIdentifier({
        name: "a"
      })) {
      path.node.name = "x";
    }
  },
  VariableDeclaration: {
    enter() {
      console.log('enter declaration')
    },
    exit() {
      console.log('exit declaration')
    }
  }
})
```

输出

```
enter function declaration
exit function declaration
```

#### Path路径

其中**path（路径）**提供了访问/操作AST 节点的方法。path本身表示两个节点之间连接的对象。例如path.node可以访问当前节点，path.parent可以访问父节点等。path.remove()可以移除当前节点。

![](https://pan.udolphin.com/files/image/2022/4/6245ed2648b4c0c6351f873f35457cd3.png)

#### 作用域 path.scope

scope 是作用域信息，javascript 中能生成作用域的就是模块、函数、块等，而且作用域之间会形成嵌套关系，也就是作用域链。babel 在遍历的过程中会生成作用域链保存在 path.scope 中。

![](https://pan.udolphin.com/files/image/2022/4/78723508c5fa8de5486551095245de9d.png)

#### scope.bindings

作用域中保存的是声明的变量和对应的值，每一个声明叫做一个binding（绑定）。

比如这样一段代码

```
const a = 1;
```

它的 path.scope.bindings 是这样的

```
bindings: {
    a: {
        constant: true,
        constantViolations: [],
        identifier: {type: 'Identifier', ...}
        kind:'const',
        path: {node,...}
        referenced: false
        referencePaths: [],
        references: 0,
        scope: ...
    }
}
```

因为我们在当前 scope 中声明了 a 这个变量，所以 bindings 中有 a 的 binding，每一个 binding 都有 kind，这代表绑定的类型：

* var、let、const 分别代表 var、let、const 形式声明的变量
* param 代表参数的声明
* module 代表 import 的变量的声明

binding 有多种 kind，代表不同的声明方式。

binding.identifier 和 binding.path，分别代表标识符的 AST、整个声明语句的 AST。

声明之后的变量会被引用和修改，binding.referenced 代表声明的变量是否被引用，binding.constant 代表变量是否被修改过。如果被引用了，就可以通过 binding.referencePaths 拿到所有引用的语句的 path。如果被修改了，可以通过 binding.constViolations 拿到所有修改的语句的 path。

path 的 api 还是比较多的，这也是 babel 最强大的地方。主要是操作当前节点、当前节点的父节点、兄弟节点，作用域，以及增删改的方法。

### state（状态）

第二个参数 state 则是遍历过程中在不同节点之间传递数据的机制，插件会通过 state 传递 options 和 file 信息，我们也可以通过 state 存储一些遍历过程中的共享数据。

当然，Babel中的Visitor模式远远比这复杂…

有了@babel/traverse我们可以在 tranform 阶段做很多自定义的事情，例如删除console.log语句，在特定的地方插入一些表达式，语法检查，代码高亮等等，从而影响输出结果

## Generate(代码生成)

经过上面两个阶段，需要转译的代码已经经过转换，生成新的AST了，最后一个阶段理所应当就是根据这个AST来输出代码。

AST 转换完之后就要输出目标代码字符串，这个阶段是个逆向操作，用新的 AST 来生成我们所需要的代码，在生成阶段本质上也是遍历抽象语法树，根据抽象语法树上每个节点的类型和属性递归调用从而生成对应的字符串代码，在 Babel 中通过@babel/generator包的 api 来实现。

> generate(newAST) => newSourceCode

```
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;


const code = `const add = (a, b) => a + b;`
const ast = parser.parse(code)


traverse(ast, {
  enter(path) {
    if (path.isIdentifier({
      name: "a"
    })) {
    path.node.name = "x";
    }
  },
});
const output = generate(ast, {}, code);
console.log(output) 


//{
//  code: 'const add = (x, b) => x + b;',
//  map: null,
//  rawMappings: undefined
//}
```

回到上面的 ，箭头函数是ES5不支持的语法，所以Babel得把它转换成普通函数，

在这之前我们先来了解一下其他的api：

* 遍历 AST 的过程中需要创建一些 AST 和判断 AST 的类型，这时候就需要@babel/types包。
* 当有错误信息要打印的时候，需要打印错误位置的代码，可以使用@babel/code-frame。当然，也可以直接使用path.buildCodeFrameError(path, options)来创建这种错误信息。
* babel 的整体功能通过@babel/core提供，基于上面的包完成 babel 整体的编译流程，并实现插件功能。

```
transformSync(code, options); // => { code, map, ast }
transformFileSync(filename, options); // => { code, map, ast }
transformFromAstSync(parsedAst,sourceCode,options); // => { code, map, ast }
```

前三个 transformXxx 的 api 分别是从源代码、源代码文件、源代码 AST 开始处理，最终生成目标代码和 sourcemap。

options 主要配置 plugins 和 presets，指定具体要做什么转换。

这些 api 也同样提供了异步的版本，异步地进行编译，返回一个 promise

```
transformAsync("code();", options).then(result => {})
transformFileAsync("filename.js", options).then(result => {})
transformFromAstAsync(parsedAst, sourceCode, options).then(result => {})
```

现在我们来实现一下将箭头函数转换为普通函数，

首先找到了ArrowFunctionExpression节点，这时候就需要把它替换成FunctionDeclaration节点。所以，箭头函数是这样处理的：

```
import * as t from "@babel/types";
 
var visitor = {
   ArrowFunctionExpression(path) {
     let id = path.parent.id;
     let node = path.node;
     let params = node.params;
     let body = type.blockStatement([
         type.returnStatement(node.body)
     ]);
     path.replaceWith(type.FunctionExpression(id,params,body));
   }
};
```

经过这三个阶段，代码就被Babel转译成功了。

# 插件

前面我们学习了 Babel 的编译流程，也深入了下原理，知道了怎么用 Babel 的 api 来完成一些代码转换功能。但平时我们很少单独使用 Babel 的 api，更多是封装成插件，现在我们学习一下 Babel 插件的格式以及 preset。

## plugin

Babel 的 plugin 是在配置文件里面通过 plugins 选项配置，值为字符串或者数组。

```
{
  "plugins": ["pluginA", ["pluginB"], ["pluginC", {/* options */}]]
}
```

如果需要传参就用数组格式，第二个元素为参数。

### plugin的格式

babel plugin 有两种格式：

#### **返回对象的函数**

第一种是一个函数返回一个对象的格式，对象里有 visitor、pre、post、inherits、manipulateOptions 等属性。

```
export default function(api, options, dirname) {
  return {
    inherits: parentPlugin,
    manipulateOptions(options, parserOptions) {
        options.xxx = '';
    },
    pre(file) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path, state) {
        this.cache.set(path.node.value, 1);
      }
    },
    post(file) {
      console.log(this.cache);
    }
  };
} 
```

首先，插件函数有 3 个参数，api、options、dirname。

* options 就是外面传入的参数
* dirname 是目录名（不常用）
* api 里包含了各种 babel 的 api，比如 types、template 等，这些包就不用在插件里单独单独引入了，直接取来用就行。

返回的对象有 inherits、manipulateOptions、pre、visitor、post 等属性。

* inherits 指定继承某个插件，和当前插件的 options 合并，通过 Object.assign 的方式。
* visitor 指定 traverse 时调用的函数。
* pre 和 post 分别在遍历前后调用，可以做一些插件调用前后的逻辑，比如可以往 file（表示文件的对象，在插件里面通过 state.file 拿到）中放一些东西，在遍历的过程中取出来。
* manipulateOptions 用于修改 options，是在插件里面修改配置的方式，比如 syntaxt plugin一般都会修改 parser options：

插件做的事情就是通过 api 拿到 types、template 等，通过 state.opts 拿到参数，然后通过 path 来修改 AST。可以通过 state 放一些遍历过程中共享的数据，通过 file 放一些整个插件都能访问到的一些数据，除了这两种之外，还可以通过 this 来传递本对象共享的数据。

#### **对象**

插件的第二种格式就是直接写一个对象，不用函数包裹，这种方式用于不需要处理参数的情况。

```
export default plugin =  {
    pre(state) {
      this.cache = new Map();
    },
    visitor: {
      StringLiteral(path, state) {
        this.cache.set(path.node.value, 1);
      }
    },
    post(state) {
      console.log(this.cache);
    }
};
```

## preset

plugin 是单个转换功能的实现，当 plugin 比较多或者 plugin 的 options 比较多的时候就会导致使用成本升高。这时候可以封装成一个 preset，用户可以通过 preset 来批量引入 plugin 并进行一些配置。preset 就是对 babel 配置的一层封装。

比如如果使用 plugin 是这样的，开发者需要了解每个插件是干什么的。

![](https://pan.udolphin.com/files/image/2022/4/d024f8e0f06b1ad211d907d7c08caa1e.png)

而有了 preset 之后就不再需要知道用到了什么插件，只需要选择合适的 preset，然后配置一下，就会引入需要的插件，这就是 preset 的意义。

![](https://pan.udolphin.com/files/image/2022/4/3acce58302d91e36553ae0f560078e95.png)

preset 格式和 plugin 一样，也是可以是一个对象，或者是一个函数，函数的参数也是一样的 api 和 options，区别只是 preset 返回的是配置对象，包含 plugins、presets 等配置。

```
export default function(api, options) {
  return {
      plugins: ['pluginA'],
      presets: [['presetsB', { options: 'bbb'}]]
  }
}
```

或者

```
export default obj = {
      plugins: ['pluginA'],
      presets: [['presetsB', { options: 'bbb'}]]
}
```

**顺序**

preset 和 plugin 从形式上差不多，但是应用顺序不同。

Babel 会按照如下顺序处理插件和 preset：

1. 先应用 plugin，再应用 preset
2. plugin 从前到后，preset 从后到前

这个顺序是 babel 的规定。

下面我们来看一下如何编写一个插件

# 例子

## 插入函数

> 我们经常会打印一些日志来辅助调试，但是有的时候会不知道日志是在哪个地方打印的。希望通过babel能够自动在console.log等api中插入文件名和行列号的参数，方便定位到代码。

### 实现思路

需要做的是在遍历 AST 的时候对 console.log、console.info 等 api 自动插入一些参数，也就是要通过 visitor 指定对函数调用表达式 CallExpression 做一些处理。CallExrpession 节点有两个属性，callee 和 arguments，分别对应调用的函数名和参数， 所以我们要判断当 callee 是 console.xx 时，在 arguments 的数组中中插入一个 AST 节点。通过 [astexplerer.net](https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F)查看

（因为@babel/parser等包都是通过 es module 导出的，所以通过 commonjs 的方式引入有的时候要取 default 属性。）

```
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');


const sourceCode = `
    console.log(1);


    function func() {
        console.info(2);
    }


    export default class Test {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;


const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',//让它根据内容是否包含import、export来自动设置moduleType。
    plugins: ['jsx']
});


const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);
traverse(ast, {
    CallExpression(path, state) {
        if ( types.isMemberExpression(path.node.callee) 
            && path.node.callee.object.name === 'console' 
            && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name) 
           ) {
            const { line, column } = path.node.loc.start;
            path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
        }
    }
});


const { code } = generate(ast);
console.log(code);
```

## 类型检查

> 我们知道，Babel能解析typescript语法，那能不能基于Babel实现类型检查呢？

> 我们经常用tsc来检查类型，有没有想过，类型检查具体做了什么？

> 现在我们来学习一下类型、类型检查、怎么实现ts的类型检查

### 赋值语句的类型检查

比如这样一段代码，声明的值是一个 string，但是赋值为了 number，明显是有类型错误的，我们怎么检查出它的错误的。

```
let name: string = 111;
```

首先我们使用 babel 把这段代码 parse 成 AST：

```
const  parser = require('@babel/parser'); 
const sourceCode = `let name: string = 111; `;
const ast = parser.parse(sourceCode, {
    plugins: ['typescript']
});
```

使用 Babel parser 来 parse，启用 typescript 语法插件。

可以使用[astexplerer.net](https://link.juejin.cn/?target=https%3A%2F%2Fastexplorer.net%2F)来查看它的 AST：

![](https://pan.udolphin.com/files/image/2022/4/e011af1cb0c86c4a49d41a9282adb092.png)

我们需要检查的是赋值语句左右两边的类型是否匹配。

右边是一个数字字面量 NumericLiteral，很容易拿到类型，而左边返回的类型是 TSTypeAnnotation 的一个对象，我们需要做下处理，转为类型字符串，也就是 string、number 这种。

![](https://pan.udolphin.com/files/image/2022/4/2b9c1dc58d86042b2f0cedd07b6518ff.png)

封装一个方法，传入类型对象，返回 number、string 等类型字符串

```
function resolveType(targetType) {
    const tsTypeAnnotationMap = {
        'TSStringKeyword': 'string'
    }
    switch (targetType.type) {
        case 'TSTypeAnnotation':
            return tsTypeAnnotationMap[targetType.typeAnnotation.type];
        case 'NumberTypeAnnotation': 
            return 'number';
    }
}
```

这样我们拿到了左右两边的类型，接下来就简单了，对比下就知道了类型是否匹配：

```
 VariableDeclarator(path, state) {
	//get(key) 获取某个属性的 path
	//getTypeAnnotation() 推断当前 `NodePath` 的类型
    const leftType = resolveType(path.get('id').getTypeAnnotation());
    const rightType = resolveType(path.get('init').getTypeAnnotation());
    if (leftType !== rightType) {
      console.log(path.get('init').buildCodeFrameError(`${leftType} can not assign to ${rightType}`, Error));
    }
  }
```

错误打印优化

报错信息怎么打印呢？可以使用 @babel/code-frame，它支持打印某一片段的高亮代码。

使用path.buildCodeFrameError(path, options)来创建这种错误信息

path.get('right').buildCodeFrameError(\`${rightType} can not assign to ${leftType}\`, Error)

效果如下：

![](https://pan.udolphin.com/files/image/2022/4/22f0e1094a9e8333c365832ca799deb6.png)

这样，我们就实现了简单的赋值语句的类型检查。

### 函数调用的类型检查

赋值语句的检查比较简单，我们来进阶一下，实现函数调用参数的类型检查

```
function add(a: number, b: number): number{
    return a + b;
}
add(1, '2');
```

这里我们要检查的就是函数调用语句 CallExpression 的参数和它声明的是否一致。

![](https://pan.udolphin.com/files/image/2022/4/84fe5f592ea26908f0031fa334634e97.png)

CallExpression 有 callee 和 arguments 两部分，我们需要根据 callee 从作用域中查找函数声明，然后再把 arguments 的类型和函数声明语句的 params 的类型进行逐一对比，这样就实现了函数调用参数的类型检查。

![](https://pan.udolphin.com/files/image/2022/4/e24930c9235b4c102cc57db4144ca607.png)

```

  visitor: {
    CallExpression(path, state) {
      const argumentsTypes = path.get('arguments').map(item => {
        // console.log(item.getTypeAnnotation())
        return resolveType(item.getTypeAnnotation());
      });
      const calleeName = path.get('callee').toString();
      // 根据 callee 查找函数声明
      const functionDeclarePath = path.scope.getBinding(calleeName).path;
      const declareParamsTypes = functionDeclarePath.get('params').map(item => {
        // console.log(item.getTypeAnnotation())
        return resolveType(item.getTypeAnnotation());
      })

      argumentsTypes.forEach((item, index) => {
        if (item !== declareParamsTypes[index]) {
          console.log(path.get('arguments.' + index ).buildCodeFrameError(`${item} can not assign to ${declareParamsTypes[index]}`,Error));
        }
      });
    }
  }
```

运行一下，效果如下：

![](https://pan.udolphin.com/files/image/2022/4/720e8b312d1016638488f90290fefada.png)

# 总结

这里我们了解了Babel历史，Babel是什么，能做什么，了解了Babel的编译流程，并深入到编译流程中的每一步中，还实践了Babel插件的开发。若想更深入的了解Babel你可以去熟读[Babel手册](https://github.com/jamiebuilds/babel-handbook), 这是目前最好的教程,[ASTExplorer](https://astexplorer.net/)是最好的演练场。 你也可以去看[Babel的官方插件实现](https://github.com/babel/babel/tree/master/packages), 迈向更高的台阶。希望这篇文章能让您有所收获。

感谢您的阅读，我是数字办的张敏，期待与您共同成长！！！

**参考文档**

* babel-handbook
* 深入Babel,这一篇就够了
* 初学Babel工作原理
* Babel插件通关秘籍