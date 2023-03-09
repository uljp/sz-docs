## 前言 

前端技术发展日新月异，各种技术框架让人眼花缭乱，大多数时间我们只需要关注业务，如何使用是我们的主要任务，但是如果我们深入学习，就会发现永远绕不开一个专业名词 抽象语法树（Abstract Syntax Tree），简称AST，那么我们今天就来盘一盘它。

阅读文章之前，不妨打开手头项目中的 `package.json` ，我们会发现众多工具已经占据了我们开发日常的各个角落，例如 JavaScript 转译、CSS 预处理、代码压缩、ESLint、Prettier等等。这些工具模块大都不会交付到生产环境中，但它们的存在于我们的开发而言是不可或缺的。

有没有想过这些工具的功能是如何实现的呢？没错，抽象语法树 (Abstract Syntax Tree) 就是上述工具的基石。

在JavaScript世界中，你可以认为抽象语法树（AST）是最底层。 再往下，就是关于转换和编译的“黑魔法”领域了。

## 抽象语法树的用途
* 代码语法的检查、代码风格的检查、代码格式化、代码高亮、代码错误提示、代码自动补全等
      如JSLint、JSHint对代码错误或风格的检查，发现一些潜在错误
      IDE的错误提示、格式化、高亮、自动补全等

* 代码混淆压缩
       UglifyJS2等

* 优化变更代码，改变代码结构使其达到想要的结构
       代码打包工具Webpack、Rollup等
       CommonJS、AMD、CMD、UMD等代码规范之间的转化
       CoffeeScript、TypeScript、JSX等转化为原生JavaScript

## 抽象语法树何许东西也

官方的解释：
> 在计算机科学中，抽象语法树（abstract syntax tree 或者缩写为 AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。

维基百科的定义：
> 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 if-condition-then 这样的条件跳转语句，可以使用带有三个分支的节点来表示。

根据以上我们可以看到AST其实就是计算机语言语法结构的描述，那也就是说你所熟知的语言JavaScript、Java、python、Html甚至Css都需要到AST这里走一遭，所以足以看出AST的重要性。讲这么多只是让大家对AST的重要性有个足够的认识，那它具体是什么东西我们还需要来看一下。

AST其实是对我们来讲只是一个对象，它无关乎语法结构，不会记录源语言真实语法中的每个细节（比如省略分隔符），这也是名字中抽象一词的由来，与之相对应的其实还有另一种树，具象语法树（Concret Syntax Tree），简称CST，它由代码直接翻译解析而来，因而保留了原语法的所有信息，也被称之为解析树。

为什么要去解析源代码成一个通用对象呢？各种语言语法种类繁多，但是计算机是无法识别我们写的代码的，所以就需要一种通用的数据结构来描述，那AST其实就是那个东西。同时，因为AST是真实存在且存在一定逻辑的，那我们也就可以在AST上做点文章，搞点花活：）

##  抽象语法树如何生成
![image.png](https://pan.udolphin.com/files/image/2021/11/c7f8ebcc1fdd287e890261a466c50f2b.png)

### JS Parser(解析器)
 将JavaScript源码转化为抽象语法树（AST）的工具叫做JS Parser解析器

常见的JS Parser有：
* [UglifyJS](https://github.com/mishoo/UglifyJS2)
* [esprima](https://github.com/jquery/esprima)
* [espree](https://github.com/eslint/espree)
* [acorn](https://github.com/acornjs/acorn)
* [babel-parser](https://github.com/babel/babel/tree/master/packages/babel-parser)

这个步骤分为两个阶段：
[词法分析（Lexical Analysis）](https://en.wikipedia.org/wiki/Lexical_analysis) 和[语法分析（Syntactic Analysis）](https://en.wikipedia.org/wiki/Parsing)

### 词法分析(Lexical Analysis)
![ispanda.gif](https://pan.udolphin.com/files/image/2021/11/f6be2278a8722443e9e3523384c563aa.gif)

解析器会从左到右扫描文本，把文本拆成一些单词。然后，这些单词传入分词器，经过一系列的识别器（关键字识别器、标识符识别器、常量识别器、操作符识别器等），确定这些单词的词性，这一过程的产物是`token`（又叫词法单元）序列。`token`在机内一般用`<type, value>`形似的二元组来表示，`type`表示一个单词种类，`value`为属性值。

你可以把这想象成你把一个文本分成几个词。您可能能够区分标点符号、动词、名词、数字等。

JS中的语法单元（token）主要有以下几种：

* 标识符：
没有被引号括起来的连续字符，可以包含字母、数字、_、$，其中数字不能作为开头。
标识符可能是var，return，function等关键字，也可能是true，false这样的内置常量，或是一个变量。具体是哪种语义，分词阶段不区分，只要正确拆分即可。

* 数字：
十六进制，十进制，八进制以及科学表达式等都是最小单元。

* 运算符： +、-、 *、/ 等。

* 字符串： 对计算机而言，字符串只会参与计算和展示，具体里面细分没必要分析。

* 注释：  不管是行注释还是块注释，对于计算机来说并不关心其内容，所以可以作为不可再拆分的最小单元。

* 空格： 连续的空格，换行，缩进等，只要不在字符串中都没有实际的逻辑意义，所以连续的空格可以作为一个语法单元。

* 其它：大括号，中括号，小括号，冒号 等等。

### 语法分析(Syntax Analysis)
![ast.gif](https://pan.udolphin.com/files/image/2021/11/8e5aaafd5ba3f259cf6c62b390748f71.gif)
分词阶段完成以后，token序列会经过我们的解析器，由解析器识别出代码中的各类短语，会根据语言的文法规则(rules of grammar)输出解析树，这棵树是对代码的树形描述。

文法是什么呢？想想我们学英语的过程中，老师是如何教我们划分句子解构的，比如一个简单的英文自然语言例子：

`Little girl eat apple`

它由【名词短语】和【动词短语】组成, 再往下【名词短语】由【形容词】和【名词构成】，【动词短语】由【动词】和【名词短语】构成。【动词】和【名词】又可以由具体的单词构成。

我们会觉得语言描述冗长，而且并不直观，可以借助一些符号进行描述:

```
<句子> -> <名词短语><动词短语>

<名词短语> -> <形容词><名词>

<动词短语> -> <动词> <名词短语>

<形容词> -> little

<名词> -> girl | apple

<动词> -> eat 
```
用<>包裹起来的部分称为语法规则，未用<>包括起来的部分(如little、girl等)，就是该语言的基本符号。

以前在token序列中我们只有一对()，现在我们知道它是函数调用、函数定义、分组还是其他东西。

需要注意的一件事是没有“单一”AST 格式。它们可能会有所不同，具体取决于您要转换为 AST 的语言以及您用于解析的工具。在 JavaScript 中，一个通用标准是[ESTree](https://github.com/estree/estree)，但您会看到不同的工具可能会添加其他属性。

例如：用`start/end`用于表示`起始/结束`位置
```json
{
 "type": "Program",
 "start": 0,
 "end": 14,
 "body": [
   {
     "type": "ExpressionStatement",
     "start": 0,
     "end": 14,
     "expression": {
       "type": "CallExpression",
       "start": 0,
       "end": 13,
       "callee": {
         "type": "Identifier",
         "start": 0,
         "end": 7,
         "name": "isPanda"
       },
       "arguments": [
         {
           "type": "Literal",
           "start": 8,
           "end": 12,
           "value": "🐼",
           "raw": "'🐼'"
         }
       ]
     }
   }
 ],
 "sourceType": "module"
}

```

一般来说，AST 是一种树结构，其中每个节点至少有一个类型来指定它所代表的内容。例如，类型可以是Literal表示实际值的 a 或CallExpression表示函数调用的 a。该Literal节点可能只包含一个值，而该CallExpression节点包含许多可能相关的附加信息，例如“正在调用什么”（callee）或arguments正在传递的是什么。

### 代码生成(Code Generation)
![code generation.gif](https://pan.udolphin.com/files/image/2021/11/e1c12f4eb0e8e4a201a8935d31b2a4f7.gif)

此步骤本身可以是多个步骤。一旦我们有了抽象语法树，我们就可以操作它，也可以将它“打印”成不同类型的代码。使用 AST 来操作代码比直接在作为文本或标记列表的代码上执行这些操作更安全。

操纵文本总是危险的；它显示了最少的上下文。如果您曾尝试使用字符串替换或正则表达式来操作文本，您可能会注意到它是多么容易出错。

即使操纵tokens也不容易。虽然我们可能知道一个变量是什么，但如果我们想重命名它，我们将无法洞察诸如变量的范围或它可能与之冲突的任何变量之类的东西。

AST 提供了关于代码结构的足够信息，我们可以更有信心地修改它。例如，我们可以确定变量的声明位置，并确切知道由于树结构这会影响程序的哪个部分。

## babel in AST 
![image.png](https://pan.udolphin.com/files/image/2021/11/a1de48dd0871793e2dd0f3a9c1ea5f5d.png)

上面那幅图已经描述了Babel的工作流程，下面我们再详细描述一下。Babel 的三个主要处理步骤分别是： 解析（parse），转换（transform），生成（generate）。

* 解析
将代码解析成抽象语法树（AST），每个js引擎（比如Chrome浏览器中的V8引擎）都有自己的AST解析器，而Babel是通过Babylon实现的。

* 转换
在这个阶段，Babel接受得到AST并通过babel-traverse对其进行深度优先遍历，在此过程中对节点进行添加、更新及移除操作。这部分也是Babel插件介入工作的部分。

* 生成
将经过转换的AST通过babel-generator再转换成js代码，过程就是深度优先遍历整个AST，然后构建可以表示转换后代码的字符串。

## 实战小例子

### 例子1: 去debugger

源代码：
```js
function fn() {
  console.log('debugger')
  debugger;
}
```

根据前面学过的知识点，我们先脑海中想象下如何去掉这个`debugger`

1. 先将源代码转化成AST
2. 遍历`AST`上的节点，找到`debugger`节点，并删除
3. 将转换过的AST再生成JS代码

将源代码拷贝到 [在线 ast 转换器](https://astexplorer.net/) 中，并点击左边区域的`debugger`，可以看到左边的`debugger`节点就被选中了。所以只要把图中选中的`debugger`抽象语法树节点`删除`就行了。

![image.png](https://pan.udolphin.com/files/image/2021/11/bc6fc4a38891b5de3561d314ed1c087e.png)

这个例子比较简单，直接上代码。​
这个例子我使用`@babel/parser`、`@babel/traverse`、`@babel/generator`，它们的作用分别是解析、转换、生成。

```js
const parser = require('@babel/parser');
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");

// 源代码
const code = `
function fn() {
  console.log('debugger')
  debugger;
}
`;

// 1. 源代码解析成 ast
const ast = parser.parse(code);


// 2. 转换
const visitor = {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  DebuggerStatement(path) {
    // 删除该抽象语法树节点
    path.remove();
  }
}
traverse.default(ast, visitor);

// 3. 生成
const result = generator.default(ast, {}, code);

console.log(result.code)

// 4. 日志输出

// function fn() {
//   console.log('debugger');
// }
```

`babel`核心逻辑处理都在`visitor`里。`traverse`会遍历树节点，只要节点的`type`在`visitor`对象中出现，便会调用该`type`对应的方法，在方法中调用`path.remove()`将当前节点删除。demo中使用到的path的一些api可以参考[babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。

### 例子2: 为所有的函数添加错误捕获，并在捕获阶段实现自定义的处理操作

```js
// Before

function add(a, b) {

  console.log('23333')

  throw new Error('233 Error')

  return a + b;

}



// => After

function add(a, b) {

  // 这里只能捕获到同步代码的执行错误

  try {    

    console.log('23333')

    throw new Error('233 Error')

    return a + b;

  } catch (myError) {

    throwMyError(myError); // 自定义处理（eg：函数错误自动上报）

  }

}

```

在编码之前，我们先理清思路，再下手也不迟。这个时候就需要借助 [在线 ast 转换器](https://astexplorer.net/) 来分析了。

转换前：
![image.png](https://pan.udolphin.com/files/image/2021/11/ef68124c07bd07111aed0c465e156661.png)

转换后：
![image.png](https://pan.udolphin.com/files/image/2021/11/de26f09ce9d187f6cc3bac5c614342fe.png)

我们先梳理一下思路：
1.  遍历`函数声明（FunctionDeclaration）`节点。
2.  提取该节点下整个代码块节点，作为 `try` 语句`（tryStatement）`处理块中的内容。
3.  构造一个自定义的` catch `子句`（catchClause）`节点，作为 try 异常处理块的内容。
4.  将整个 try 语句节点作为一个新的函数声明节点的子节点，用`新生成的节点替换原有的函数声明节点
`。

```js  
const babylon = require("babylon");
const traverse = require("babel-traverse").default;
const generator = require("babel-generator").default;
const types = require("babel-types");

// 源代码
const code = `
function add(a, b) {

    console.log('23333')
  
    throw new Error('233 Error')
  
    return a + b;
  
  }  
`;

// 1. 源代码解析成 ast
const ast = babylon.parse(code);

// 2. 转换
const visitor = {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  FunctionDeclaration(path) {
    const node = path.node;

    const { params, id } = node; // 函数的参数和函数体节点

    const blockStatementNode = node.body;

    // 已经有 try-catch 块的停止遍历，防止 circle loop

    if (
      blockStatementNode.body &&
      types.isTryStatement(blockStatementNode.body[0])
    ) {
      return;
    }

    // 构造 cath 块节点
    // 创建函数调用语句，参数是myError
    const catchBlockStatement = types.blockStatement([
      types.expressionStatement(
        types.callExpression(types.identifier("throwMyError"), [
          types.identifier("myError"),
        ])
      ),
    ]);

    // catch 子句节点
    //创建catch分支，形参myError,并传入catchBlockStatement
    const catchClause = types.catchClause(
      types.identifier("myError"),
      catchBlockStatement
    );

    // try 语句节点
    //创建try语句，传入blockStatementNode和catchClause
    const tryStatementNode = types.tryStatement(
      blockStatementNode,
      catchClause
    );

    // try-catch 节点作为新的函数声明节点
    const tryCatchFunctionDeclare = types.functionDeclaration(
      id,
      params,
      types.blockStatement([tryStatementNode])
    );

    path.replaceWith(tryCatchFunctionDeclare);
  },
};
traverse(ast, visitor);

// 3. 生成
const result = generator(ast, {}, code);

console.log(result.code);

```


## 总结

本文介绍了什么是AST、AST是怎么生成的以及AST可以用来做什么。

或许我们的日常工作和 AST 打交道的机会并不多，更不会刻意地去关注语言底层编译器的原理，但了解 AST 可以帮助我们更好地理解日常开发工具的原理，更轻松地上手这些工具暴露的 API。

工作的每一天，我们的喜怒哀乐通过一行又一行的代码向眼前的机器倾诉。它到底是怎么读懂你的情愫，又怎么给予你相应的回应，这是一件非常值得探索的事情😃