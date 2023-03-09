上期张敏同学带我们走了一遍TypeScript的基础类型、类、函数以及接口，相信大家对TypeScript已经有了相对完整的概念，那么本期我们一起来看看TypeScript的一些高级类型以及泛型，文章不会详尽列举所有的高级类型，只是列举一些常用类型，希望能激发同学们多多去探索TypeScript的更多玩法。文章中我们也会通过对比Interface与type的异同，来详细了解这两者之间的区别，最后我会推荐一些关于TypeScript的工具,如果大家有更多好用工具，也欢迎留言到评论区，一起交流学习哦。
下面我们开始吧，以下例子都可以粘贴到[TypeScript演练厂](https://www.typescriptlang.org/zh/play)，实时看到输出结果。



# 高级类型
日常开发中，我们除了了解一些常用的基本类型，还应该了解一些类型定义的高级类型，这样在遇到一些稍微复杂的类型定义时也会提升我们的开发效率。下面我们简单了解下几种常见的高级类型。

## 字符字面量类型
字符串字面量类型允许我们指定字符串必须的固定值。 在日常实际应用中，字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合。 通过结合使用这些特性，我们可以实现类似枚举类型的字符串。举例如下:
```typescript
type Name = "Coconut" | "Latte";
class GetInfo {
  animate(dx: number, easing: Name) {
    if (easing === "Coconut") {
      // ...
    } else if (easing === "Latte") {
    }
  }
}
let button = new GetInfo();
button.animate(0, "Coconut");
button.animate(0, "oops"); // error: "oops" is not allowed here
```
但代码最后一行运行报错：
![image.png](https://pan.udolphin.com/files/image/2021/9/d4410d2713771fc776d404da97fdfe17.png)
可以看出，这里我们只能从两种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。

字符串字面量类型还可以用于区分函数重载：
```typescript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;

// ... more overloads ...
function createElement(tagName: string): Element {
  // ... code goes here ...
}
```
## 数字字面量类型
举例如下:
```typescript
let count: 1 | 2 | 3 | 4 | 5 | 6 
```
但我们其实很少直接用到数字字面量类型,官网有给出一个使用的小场景,即在缩小范围调试bug时:
```typescript
function foo(x: number) {
  if (x !== 1 || x !== 2) {
    //         ~~~~~~~
    // Operator '!==' cannot be applied to types '1' and '2'.
  }
}
```
即当 x与 2进行比较的时候，它的值必须为 1，这就意味着上面的比较检查是非法的。
字面量联合类型的形式其实与枚举类型有些类似，所以，如果我们仅是使用数字，可以考虑使用更具有表达性的枚举类型。
在上一期说到枚举的内容时，我们看到当每个枚举成员都是用字面量初始化的时候，枚举成员是具有类型的。
在我们谈及“单例类型”的时候，多数是指枚举成员类型和数字/字符串字面量类型，日常使用中经常会互换使用“单例类型”和“字面量类型”。
## 交叉类型（Intersection Types）

交叉类型的语法规则和"逻辑与"的符号一致,意义也类似，即将多个类型合并成一个类型。
举例如下:
```Typescript
//交叉类型是将多个类型合并为一个类型
type Pointx = { x: number };
type Point = pointx & { y: number };

let point: Point = {
  x: 1,
  y: 1,
};
```

可以看出这个例子中将’Pointx’类型合并到了’Point’类型里。
那么如果在合并多个类型的过程中，刚好出现某些类型存在相同的成员，但对应的类型又不一致，此时合并会出现什么结果呢？
我们先看同名基础类型属性的合并:
- 同名基础属性的合并
```typescript
//同名基础类型属性的合并

interface X {
  c: string;
  d: string;
}

interface Y {
  c: number;
  e: string;
}

type XY = X & Y;

let p: XY;

p = { c: 6, d: "d", e: "e" };//这里会报类型错误
```

 将该段代码复制到TypeScript演练场,可以看到打印结果如下图所示:
![image.png](https://pan.udolphin.com/files/image/2021/9/a6851614f0701d8649fb855a14cb3fca.png)

我们看到代码报错，这里’never’又是哪里来的呢?
这里交叉类型后，成员’c’的类型是’string&number’，这样的类型是不存在的，所以成员’c’的类型就成了’never’。
接下来我们看看同名非基础类型是不是也不可以合并呢?
- 同名非基础类型的合并
```typescript
interface D { d: boolean; }
interface E { e: string; }

interface A { x: D; }
interface B { x: E; }

type AB = A & B ;

const ab: AB = {
  x: {
    d: true,
    e: 'bulabula',
  }
};
console.log('ab:', ab);
```

在演练场中，这段代码不会报错的，所以,我们可以得出，在合并多个类型时，若存在相同的成员，且成员类型为非基本数据类型，那么是可以成功合并的，但如果成员类型为基本类型，那么将会合并失败。
## 联合类型（Union Types）
联合类型表示一个值可以是几种类型之一，用竖线（|）分隔每个类型，与"逻辑或"的意义类似。
举例如下:
```typescript
//通常与 null 或 undefined 一起使用

const sayHello = (name: string | undefined) => {
  /* ... */
};

let num: 1 | 2 = 1;

type EventNames = "click" | "scroll" | "mousemove";
```
## 类型别名
我们可以注意到上面提到的交叉类型与联合类型使用了"type"，即"类型别名"。
类型别名会给一个类型起个新名字。 类型别名有时和接口很像，后面我们会谈及这两者之间的具体区别。
起别名不会新建一个类型 ，它只是创建了一个新名字来引用那个类型。
同接口一样，类型别名也可以是泛型，举例如下:
```typescript
type Container<T> = { value: T };
```
我们也可以使用类型别名来在属性里引用自己：
```typescript
type Tree<T> = {
  value: T,
  left: Tree<T>,
  right: Tree<T>,
};
````
## 索引类型
- ’keyof’：类似于Object.keys，用于获取某种类型的所有键，它返回类型是联合类型，举例说明如下:
```typescript
interface Button {
  type: string
  text: string
}

type ButtonKeys = keyof Button
// 等效于
type ButtonKeys = "type" | "text"
```
- ‘T[k]’：像索引类型查询一样，我们可以在普通的上下文里使用 T[K]，只要确保类型变量 K extends keyof T就可以了,举例说明如下：
```typescript
interface Button {
  type: string
  text: string
}

type ButtonKeys =Button["type"]
// 等效于
type ButtonKeys = string
```
## 映射类型
在说映射之前我们先考虑这样一个场景：
将一个已知的类型每个属性都变为只读的：
```typescript
interface IInfo {
  readonly name: string;
  readonly age: number;
}
```
首先 keyof Obj 得到一个联合类型 'name' | 'age'。
```typescript
interface Obj { 
  name: string; 
  age: number;
}
type ObjKeys = 'name' | 'age' 
type ReadOnlyObj = { readonly [P in ObjKeys]: Obj[P]; }
```
这里" P in ObjKeys "相当于执行了一次 forEach 的逻辑，遍历 'name' | 'age'：
```typescript
type ReadOnlyObj = {
  readonly name: Obj['name'];
  readonly age: Obj['age'];
}
```
最后就可以得到一个新的接口。
```typescript
interface ReadOnlyObj {
  readonly name: string; 
  readonly age: number; 
}
```
可以看到,映射类型提供了从旧类型中创建新类型的一种方式。
其实上面的过程TypeScript提供了很方便的泛型函数工具--Readonly
接下来借此机会我们来看几个使用映射类型的泛型函数工具，日常会很有用的哦
- ReadOnly

不管是从字面意思，还是定义上都很好理解：将所有属性定义为自读。
```typescript
type Coord = Readonly<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
  readonly x: number;
  readonly x: number;
}
```
- Partial
将类型定义的所有属性都修改为可选。
```typescript
type Coord = Partial<Record<'x' | 'y', number>>;

// 等同于
type Coord = {
  x?: number;
  y?: number;
}
```
- Record

以 typeof 格式快速创建一个类型，此类型包含一组指定的属性且都是必填。
```typescript
type Coord = Record<'x' | 'y', number>;

// 等同于
type Coord = {
  x: number;
  y: number;
}
```
- Pick

从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。
```typescript
type Coord = Record<'x' | 'y', number>;
type CoordX = Pick<Coord, 'x'>;

// 等用于
type CoordX = {
  x: number;
}
```
# 泛型

## 什么是泛型

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，使用时再去指定类型的一种特性。
举个例子,我们可以考虑这样一种情况，如果我们想要一个函数可以传入不同类型的参数，并根据传入参数的类型返回不同的类型，该怎么做?
首先最笨的方法就是，每种类型都写一个函数，但此时如果你看过上期文章，相信你已经想到了函数重载，这里我们拿来上期函数重载的写法:
```typescript
//重载签名(函数类型定义)
function getInfo(name:string):string;
function getInfo(age:number):number;

//实现签名(函数具体实现)
function getInfo(str: any): any {
  if (typeof str == "string") {
    console.log("名字:", str);
  }
  if (typeof str == "number") {
    console.log("年龄", str);
  }
  return str;
}

getInfo("zhang"); //名字:zhang
```
我们会发现这种写法有点麻烦，当然我们不能每个参数及返回类型都用'any'吧，我们这里是TypeScript编程，不是any编程哦😏
接下来我们试试泛型：
```typescript
//我们先将所有类型不明确的地方换成T
function getInfo<T>(str: T): T {
  if (typeof str == "string") {
    console.log("名字:", str);
  }
  if (typeof str == "number") {
    console.log("年龄", str);
  }
  return str;
}

// 使用的时候再指定类型
getInfo<string>('zhang')//名字:张
```
这样我们就完成了一次泛型的使用。
这个过程中，我们会发现，泛型就像一个关于类型的参数一样，在函数被调用的时候被传入，并在函数内部传递这个类型，如下图所示：
![image.png](https://pan.udolphin.com/files/image/2021/9/35fdd91b4bb155d95af87e129f843875.png)
其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但其实T 可以用任何有效名称代替。以下是除了 T 之外，其他常见泛型变量代表的意思：

- ’K（Key）’：表示对象中的键类型；
- ‘V（Value）’：表示对象中的值类型；
- ’E（Element）’：表示元素类型。

现在我们知道泛型可以使函数接受你传递给它的任何类型，从而使函数可以方便地处理不同类型的传参。接着上面的函数,我们思考另一个问题，如果想要返回两种类型的对象怎么办呢?
这里应该有同学想到了用元组：
```typescript
function getInfo <T, U>(name: T, age: U) : [T, U] {
  return [name, age];
}
```
但这里我们其实有更好的解决方案，即泛型接口。

## 泛型接口
我们先创建一个泛型接口IGetInfo：
```typescript
interface IGetInfo<N, A> {
  name: N,
  age: A
}
```
接着，我们将接口IGetInfo作为函数的返回类型：
```typescript
function getInfo <T, U>(name: T, age: U): IGetInfo<T,U>{
  let info: IGetInfo<T, U> = {
    name,
    age
  };
  return info;
}

console.log(getInfo(18,"Coconut Latte"))//{name: "Coconut Latte",age: 18}
```


## 泛型工具函数
前面我们说到高级类型中的映射类型时，提到"泛型工具函数"，那么接下来我们一起来看看这几个泛型工具函数的源码，加深对泛型使用熟练度的同时复习下这几个工具函数。
[源码地址](https://github.com/microsoft/TypeScript/blob/8da3eff7b0dbb68c17a950c006edf143456b28cc/src/lib/es5.d.ts#L1442)

首先我们定义一个接口：
```typescript
interface Person {
  name: string;
  age?: number;
}
```
- Record
用于构建一个对象类型，将一种类型的属性映射到另一种类型。
```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type Person = Record<"name" | "age", string>;
```
这段代码的运行结果是：
```typescript
Person === {name: string; age: string}
```
- Readonly

   将类型定义的所有属性都修改为只读。
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type Person = Readonly<Person>;
```
这段代码的运行结果是：
```typescript
Person === {readonly name: string; readonly age?: number}
```
- Partial
   将类型定义的所有属性都修改为可选。
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type Person = Partial<Person>;
```
这段代码的运行结果是：
```typescript
type Coord = {
  x?: number;
  y?: number;
}
```
- Pick

从一个类型中选取部分属性构成一个新的类型。
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Person = Pick<Person, "name">;
```
这段代码的运行结果是：
```typescript
Person === {name: string}
```

## 泛型类
在类中，我们也可以通过使用泛型来确保在整个类中一致地使用指定的数据类型。
举例如下：

```typescript
interface Info<U> {
  value: U
  getValue: () => U
}

class getInfo<T> implements Info<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }

}

const myNumberClass = new getInfo<Number>(68);
console.log(myNumberClass.getValue());

const myStringClass = new getInfo<string>("zhang!");
console.log(myStringClass.getValue());
````

这里我们可以看到，类型值在getInfo实例化过程中，传递了'number'和'string'两个类型变量,而泛型保证了在整个类中一致地使用指定的数据类型。

再比如，在react项目中，我们有时会这样使用泛型：
```typescript
type Props = {
  name?: string;
  age?: number
   ...
};

class MyComponent extends React.Component<Props> {
   ...
}
````

这里我们将泛型与 React 组件一起使用，以确保组件的 props 类型安全。

那么在日常开发中，我们在什么时候需要使用泛型呢？
通常在决定是否使用泛型时，我们有以下两个参考标准：
> 当你的函数、接口或类将处理多种数据类型时；
> 当函数、接口或类在多个地方使用该数据类型时。

很有可能我们没有办法保证在项目早期就使用泛型的组件，但是随着项目的发展，组件的功能通常会被扩展。这种增加的可扩展性最终很可能会满足上述两个条件，在这种情况下，引入泛型将比复制组件来满足一系列数据类型更干净。
# interface和type的异同

之前我们说到TypeScript中定义类型的两种方式,type和interface.
那么这两种定义方式到底有什么区别呢?
要想找其不同之处,我们先来看其相同之处：
## 相同点
1、都可以描述一个对象或者函数
```typescript
//interface
interface User {
  name: string;
  age: number;
}

interface SetUser {
  (name: string, age: number): void;
}

//type
type User1 = {
  name: string,
  age: number,
};
```
2、 都允许拓展（extends）
```typescript
//interface extends interface

type Name3 = {
  name: string,
};

type User3 = Name3 & { age: number };

//interface extends type

type Name4 = {
  name: string,
};

interface User4 extends Name4 {
  age: number;
}

//type extends interface

interface Name5 {
  name: string;
}

type User5 = Name5 & {
  age: number,
};
```

## 不同点
1、type可以声明基本类型别名、联合类型、元祖等类型

```typescript
// 基本类型别名
type Name = string;

// 联合类型
interface Dog {
  wong(): void;
}
interface Cat {
  miao(): void;
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];
```

2、type语句中还可以使用typeof获取实例的类型进行赋值

```typescript
// 当你想要获取一个变量的类型时，使用typeof
let div = document.createElement("div");
type B = typeof div;
```

3、与类型别名不同，接口可以定义多次，会被自动合并为单个接口

```typescript
interface Point {
  x: number;
}
interface Point {
  y: number;
}

const point: Point = { x: 1, y: 2 };
```

# 编译上下文
编译上下文是用于TypeScript文件分组的术语，它会分析和确定什么是有效的、什么是无效的，它包含有关正在使用的编译器选项的信息，我们可以使用tsconfig.json文件来定义TypeScript文件的这种逻辑选项。

- tsconfig.json 的作用

用于标识 TypeScript 项目的根路径；
用于配置 TypeScript 编译器；
用于指定编译的文件。

- tsconfig.json 的重要字段

files - 设置要编译的文件的名称；
include - 设置需要进行编译的文件，支持路径模式匹配；
exclude - 设置无需进行编译的文件，支持路径模式匹配；
compilerOptions - 设置与编译流程相关的选项。

- compilerOptions 选项

compilerOptions 支持很多选项，常见的有 baseUrl、 target、baseUrl、 moduleResolution 和 lib 等。
compilerOptions 每个选项的详细说明摘录如下，我们可以大致看看：
```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}

```


# TypeScript工具推荐
## [TypeScript Playground](www.typescriptlang.org/play/)

> TypeScript 官方提供的在线 TypeScript 运行环境，利用它你可以方便地学习 TypeScript 相关知识与不同版本的功能特性。

在线地址：[www.typescriptlang.org/play/](www.typescriptlang.org/play/)

![image.png](https://pan.udolphin.com/files/image/2021/9/3e53c4807eb1e277fe25024d8889c618.png)

## [JSON TO JS](http://www.json2ts.com/)
> 一款 TypeScript 在线工具，利用它你可以为指定的 JSON 数据生成对应的 TypeScript 接口定义。

在线地址：[http://www.json2ts.com](http://www.json2ts.com/)

![image.png](https://pan.udolphin.com/files/image/2021/9/2f4b282f9e82a2d500516a6740eeb071.png)

## [Schemats](https://github.com/SweetIQ/schemats)
>利用 Schemats，你可以基于（Postgres，MySQL）SQL 数据库中的 schema 自动生成 TypeScript 接口定义。

在线地址：[https://github.com/SweetIQ/schemats](https://github.com/SweetIQ/schemats)

![image.png](https://pan.udolphin.com/files/image/2021/9/c22d56a0c68d69d73708da1f6894a7a5.png)


好啦，以上就是本期TypeScript的全部内容了，如有错误之处，欢迎指正😉
感谢您的阅读，我是数字办的郭亦奇，期待与您共同成长！！！