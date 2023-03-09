## 前言

如今TypesScript已经越来越火，不管是服务端（Node.js）,还是前端框架（React、Vue、Angular），都有越来越多的项目使用TS进行开发，作为前端程序员，TS已经成为一项必不可少的技能。本文主要介绍一些TS的基础知识，带大家入门TS。

## TypeScript是什么？

1、TypeScript是由微软开发的以JavaScript为基础的编程语言。
2、它是JavaScript的一个超集，js是ts的子集；
3、TS可以在任何支持JS的平台上执行；
4、TS不能被JS解析器直接执行，需要编译成JS才可以执行；
5、TS在原先JS基础扩展了JS,并新增了许多变量类型，比如元组、枚举类型等等。
![](https://pan.udolphin.com/files/image/2021/9/2acb0b7cfd7a7488b1b6ceb537df172e.png)

#### TypeScript与JavaScript的区别

| TypeScript | JavaScript |
| ---------- | ---------- |
| JavaScript 的超集用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页 |
| 可以在编译期间发现并纠正错误 | 作为一种解释型语言，只能在运行时发现错误 |
| 强类型，支持静态和动态类型 | 弱类型，没有静态类型选项 |
| 最终被编译成 JavaScript 代码，使浏览器可以理解 | 可以直接在浏览器中使用 |
| 支持模块、泛型和接口 | 不支持模块，泛型或接口 |

#### TypeScript工作流程

* 将`TypeScript`代码编译为 `TypeScript-AST`
* 检查`AST`代码上类型检查
* 类型检查后，编译为`JavaScript`代码
* `JavaScript`代码转换为`JavaScript-AST`
* 将`AST`代码转换为字节码
* 运算时计算字节码

## 基础类型
![](https://pan.udolphin.com/files/image/2021/9/eea41df605058c43a99472236258ca89.png)
上图列举了TypeScript的所有基础类型，下面将详细向大家介绍具体的基础类型：
#### Boolean类型

```typescript
let isOK:boolean = false;
```

#### Number类型

```typescript
let num:number = 10;
```

#### String类型

```typescript
let name:string = "ts";
```

#### Array类型

```typescript
let list:number[] = [1,2,3];

let list:Array<number> = [1,2,3];
```

#### Any类型

any表示任何类型,`any` 类型本质上是类型系统的一个逃逸舱。作为开发者，这给了我们很大的自由：TypeScript 允许我们对 `any` 类型的值执行任何操作，而无需事先执行任何形式的检查。比如：

```typescript
let value: any = "";//ok

value = null; // OK
value = {}; // OK
value = undefined; // OK
```

>需要注意：（隐式any）如果声明变量的时候不指定变量类型，TS解析器会自动判断成any。

一个变量设置了any相当于对该变量关闭了TS类型检测。为了解决any带来的问题，TypeScript 3.0 引入了 `unknown` 类型。

#### Unknown类型

它表示未知的类型，这样看来它貌似和any很像，但是还是有区别的，也就是所谓的“**unknown相对于any是安全的**”。下面我们来看一下 `unknown` 类型的使用示例：

```typescript
let value: unknown = "";

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

对 `value` 变量的所有赋值都被认为是类型正确的。但是，当我们尝试将类型为 `unknown` 的值赋值给其他类型的变量时会发生什么？any和unknown有什么区别呢？

```typescript
let value: unknown;
let valueAny:any;

let value1: unknown = value; // OK
let value2: any = value; // OK

let value3: null = value;//Error
let value4: null = valueAny;//ok

let value5: boolean = value; // Error
let value6: number = value; // Error
let value7: string = value; // Error
```

为什么`any`类型就能被赋值成功，而`unknown`类型不行呢？`any`任何的，任意的，`unknown`未知的。所以你给`unknown`类型赋值任何类型都没有关系，因为他本来就是未知类型。`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身，但是如果把`unknown`类型去被赋值一个`null`类型，这时`null`不干了，我不接受`unknown`类型。

> 直观的说，别人不接受`unknown`类型，而`unknown`类型接受别人。

#### Tuple元组类型

**众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组**。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子：

```typescript
let tupleType: [string, boolean];
tupleType = ["ts", true];
```

在上面代码中，我们定义了一个名为 `tupleType` 的变量，它的类型是一个类型数组 `[string, boolean]`，然后我们按照正确的类型依次初始化 tupleType 变量。与数组一样，我们可以通过下标来访问元组中的元素：

```typescript
console.log(tupleType[0]); // ts
console.log(tupleType[1]); // true
```

在元组初始化的时候，如果出现类型不匹配的话，比如：

```typescript
tupleType = [true, "ts"];
```

此时，TypeScript 编译器会提示以下错误信息：

```
[0]: Type 'true' is not assignable to type 'string'.
[1]: Type 'string' is not assignable to type 'boolean'.
```

很明显是因为类型不匹配导致的。在元组初始化的时候，我们还必须提供每个属性的值，不然也会出现错误，比如：

```typescript
tupleType = ["ts"];
```

此时，TypeScript 编译器会提示以下错误信息：

```typescript
Property '1' is missing in type '[string]' but required in type '[string, boolean]'.
```

#### Void类型

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```

声明一个`void`类型的变量没有什么大用，因为你只能为它赋予`undefined`和`null`：

```ts
let unusable: void = undefined;
```

#### Null 和 Undefined

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。 和 `void`相似，它们的本身的类型用处不是很大：

```ts
let u: undefined = undefined;
let n: null = null;
```

#### 枚举

使用枚举我们可以定义一些带名字的常量。 可以清晰地表达意图或创建一组有区别的用例。 TypeScript 支持数字的和基于字符串的枚举。

##### 1.数字枚举

```typescript
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
```

默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3。

以上的枚举示例经编译后，对应的 ES5 代码如下：

```javascript
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
```

当然我们也可以设置 NORTH 的初始值，比如：

```typescript
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}
```

##### 2.字符串枚举

在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```typescript
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```

以上代码对应的 ES5 代码如下：

```typescript
"use strict";
var Direction;
(function (Direction) {
  Direction["NORTH"] = "NORTH";
  Direction["SOUTH"] = "SOUTH";
  Direction["EAST"] = "EAST";
  Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```

通过观察数字枚举和字符串枚举的编译结果，我们可以知道数字枚举除了支持 **从成员名称到成员值** 的普通映射之外，它还支持 **从成员值到成员名称** 的反向映射：

```typescript
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dirName = Direction[0]; // NORTH
let dirVal = Direction["NORTH"]; // 0
```

另外，对于纯字符串枚举，我们不能省略任何初始化程序。而数字枚举如果没有显式设置值时，则会使用默认规则进行初始化。

##### 3.常量枚举

除了数字枚举和字符串枚举之外，还有一种特殊的枚举 —— 常量枚举。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 `const`枚举。它是使用 `const` 关键字修饰的枚举，常量枚举不能包含计算属性，它们在编译阶段会被删除,不会为枚举类型编译生成任何 JavaScript。

```typescript
const enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
```

以上代码对应的 ES5 代码如下：

```javascript
"use strict";
var dir = 0 /* NORTH */;
```

##### 4.异构枚举

异构枚举的成员值是数字和字符串的混合：

```typescript
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```

以上代码对于的 ES5 代码如下：

```typescript
"use strict";
var Enum;
(function (Enum) {
  Enum[Enum["A"] = 0] = "A";
  Enum[Enum["B"] = 1] = "B";
  Enum["C"] = "C";
  Enum["D"] = "D";
  Enum[Enum["E"] = 8] = "E";
  Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```


#### Never类型

`never` 类型表示的是那些永不存在的值的类型。 例如，`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。一般这个类型就不会用到，也不用。大家知道这个类型就行。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {//正确，代码报错了，执行不下去
  throw new Error(message);
}

function infiniteLoop(): never {//正确，因为死循环了，一直执行不完
  while (true) {}
}
```

## TypeScript断言

###  类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

类型断言有两种形式：

#### 1.“尖括号” 语法

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

#### 2.as 语法

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

###  非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非 undefined 类型。**具体而言，x! 将从 x 值域中排除 null 和 undefined 。**

那么非空断言操作符到底有什么用呢？下面我们先来看一下非空断言操作符的一些使用场景。

##### 忽略 undefined 和 null 类型

```typescript
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

因为 `!` 非空断言操作符会从编译生成的 JavaScript 代码中移除，所以在实际使用的过程中，要特别注意。比如下面这个例子：

```typescript
const a: number | undefined = undefined;
const b: number = a!;
console.log(b); 
```

以上 TS 代码会编译生成以下 ES5 代码：

```javascript
"use strict";
const a = undefined;
const b = a;
console.log(b);
```

虽然在 TS 代码中，我们使用了非空断言，使得 `const b: number = a!;` 语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，`!` 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 `undefined`。

###  可选链运算符 ?.

用来判断左侧的表达式是否是null | undefined，如果是则会停止表达式运行，并返回undefined。

> 【注意】这里只针对null和undefined，对于0  false  ‘’ 等逻辑空值不起作用。这一点和&&不同。

这个运算符其实他是有条件判断的。即是一个三元运算符（？ ：）

```typescript
a?.b
```

以上 TS 代码会编译生成以下 ES5 代码：

```typescript
"use strict";
a === null || a === void 0 ? void 0 : a.b;
```

> **tip:** undefined这个值在非严格模式下会被重新赋值，使用void 0 必定会返回真正的undefined

```typescript
interface IFoo {a : number}

function fn(obj: IFoo | null | undefined): number | undefined {
  const a = obj?.a;
  //如果a时IFoo类型，则打印100；
  //如果a是null或者undfined，则打印undefined
  console.log("a", a);
  return a;
}
fn({ a: 100 })
```

### 空值合并运算符 ??

??与||的功能是相识的，区别在于：??在左侧的表达式结果为null或undefined时，才会返回右侧表达式。当我们写

```typescript
let b = a ?? 10;
```

编译器生成以下ES5代码：

```typescript
"use strict";
let b = a !== null && a !== void 0 ?  a : 10;
```

## TypeScript 函数

###  函数定义

```typescript
//函数声明式
function getInfo() {
   return "info";
 }
//函数表达式
 const getInfo1 = function() {
   return 'info1'
 }
```

###  参数类型和返回类型

```typescript
 function getInfo2(name:string, age:number):string{
   return `${name}---${age}`;
 }
```

### 可选参数及默认参数

```typescript
// 可选参数
function getInfo2(name: string, age?: number): string {
  if (age) {
    return `${name}---${age}`;
  } else {
    return `${name}---年龄保密`;
  }
}

// 默认参数
function getInfo2(name: string, age = 20): string {
  if (age) {
    return `${name}---${age}`;
  } else {
    return `${name}---年龄保密`;
  }
}
```

在声明函数时，可以通过 `?` 号来定义可选参数，比如 `age?: number` 这种形式。**在实际使用时，需要注意的是可选参数要放在普通参数的后面，不然会导致编译错误**。

###  剩余参数

```typescript
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

###  函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。

```typescript
//重载签名（函数类型定义）
function reverse(x: number): number;
function reverse(x: string): string;
//实现签名（函数具体实现）
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```

在以上代码中，我们为 reverse函数提供了多个函数类型定义，从而实现函数的重载。实现签名必须兼容重载签名，重载签名的类型不会合并

## TypeScript 类

###  类的属性与方法

在面向对象语言中，类是对象具体事物的一个抽象，描述了所创建的对象共同的属性和方法。

在 TypeScript 中，我们可以通过 `Class` 关键字来定义一个类：

```typescript
class Person {
  // 成员属性
  name: string;
  // 构造函数 - 执行初始化操作
  constructor(name: string) {
    this.name = name;
  }
  // 成员方法
  run(): string {
    return `${this.name}在跑步`;
  }
}

let p = new Person("lisi");
p.run();
```

###  类的修饰符

在 TypeScript里面定义属性的时候提供了三种修饰符

- **public**：共有类型，在当前类里面、子类、类外面都可以访问

  ```typescript
  class Person {
   public name: string = "Lucy";
  }
  
  let p = new Person();
  console.log(p.name);//Lucy
  ```

  

- **protected**: 保护类型，在当前类里面、子类里面可以访问，在类外部没法访问

```typescript
  class Person {
    name: string = "Lucy";
    protected age: number = 20;
  }
  let p = new Person();
  console.log(p.name);//Lucy
  console.log(p.age);//Property 'age' is protected and only accessible within       class 'Person' and its 	subclasses.当前属性为私有属性，只能在类内部访问

  class Student extends Person {
    getInfo() {
      return this.name + "," + this.age;
    }
  }
  let s = new Student();
  console.log(s.getInfo());//Lucy，20.可以正常访问父类的属性
````

- **private**：私有类型，只能在当前类里面可以访问，其他类都不可以访问。

  ```typescript
  class Person {
    private name: string = "Lucy";
    private age: number = 20;
  }
  let p = new Person();
  console.log(p.name);//error
  console.log(p.age);//Property 'age' is private and only accessible within class 'Person'.当前属性为私有属性，只能在类内部访问

  class Student extends Person {
    getInfo() {
      return this.name + "," + this.age;//error,虽然继承了Person类，但是private定义是只能在当前类访问，子类也不能访问。
    }
  }
  let s = new Student();
  console.log(s.getInfo());
  ```
  
  
  
  > 注意：如果属性不加修饰符，默认就是公有(public)


###  访问器

在 TypeScript 中，我们可以通过 `getter` 和 `setter` 方法来实现数据的封装和有效性校验，防止出现异常数据。

```typescript
class Person {
  // 成员属性
  private _name: string;
  get name(): string {//存取器
    return this._name;
  }
  set name(name: string): void {
    this._name = name;
  }
}

let p = new Person("lisi");
p.name = "Lucy";
console.log(p.name);//Lucy
```

###  类的静态属性、静态方法

**静态属性**：被静态修饰符`static`修饰的属性就是静态属性，静态属性可以通过类名直接调用。

**静态方法**：被静态修饰符`static`修饰的方法就是静态方法，静态方法可以通过类名直接调用，但是在静态方法内部，不能直接调用当前类的非静态属性、非静态方法。

```typescript
class Person {
  // 成员属性
  name: string;
  // 静态属性
  static sex: string = "male";
  // 构造函数 - 执行初始化操作
  constructor(name: string) {
    this.name = name;
  }

  // 静态方法
  static print(): void {
    // console.log('姓名：' + this.name);//错误
    console.log('print' + Persons.sex);
    // this.run();//错误
  }
  // 成员方法
  run(): string {
    return `${this.name}在跑步`;
  }
}
let p = new Person("lisi");
p.run();
Person.print();
```

###  类的继承

继承（Inheritance）指的是一个类（称为子类、子接口）继承另外的一个类（称为父类、父接口）的功能，并可以增加它自己的新功能的能力。一旦实现了继承关系，那么子类中便拥有了父类的属性和方法，而在执行方法过程中，首先从子类开始找，如果有，就使用，如果没有，就去父类中找。类的继承只能单向继承。

在 TypeScript 中，我们可以通过 `extends` 关键字来实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。：

```typescript
class Person {
  name: string;//父类属性
  
  constructor(theName: string) {//构造函数，实例化父类的时候触发的方法
    this.name = theName;//使用this关键字为当前类的name属性赋值
  }
  
  run(): string {//父类方法
    return `${this.name}在跑步`;
  }
}

class Student extends Person {
  age: number;//子类属性
  constructor(n: string，a: number) {//构造函数，实例化子类的时候触发的方法
    super(n);//使用super关键字调用父类中的构造函数
    this.age = a;//使用this关键字为当前类的age属性赋值
  }
  speak(): void {//子类方法
    super.run();//使用super关键字调用父类中的方法
    console.log(this.name + "说中文");
  }
}

let s = new Student('张三', 20);
s.speak();
```

### 抽象类

抽象类是做为其它派生类的基类使用， 它们一般不会直接被实例化。

用`abstract`关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。`abstract`抽象方法只能放在抽象类里面。

我们常常使用抽象类和抽象方法用来定义标准。

```typescript
//动物抽象类，所有动物都会睡觉，但是吃的东西不一样，所以把吃的方法定义成抽象方法
abstract class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract eat(): void;//抽象方法不包含具体实现并且必须在派生类中实现
  sleep() {
    console.log(this.name + "在睡觉")
  }
}
class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat(): void {//抽象类的子类必须实现抽象类里面的抽象方法
    console.log(this.name + "吃骨头");
  }
}

var d: Dog = new Dog("小狼狗");
d.eat();

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }
  eat(): void {//抽象类的子类必须实现抽象类里面的抽象方法
    console.log(this.name + "吃老鼠");
  }
}

var c: Cat = new Cat("小花猫");
c.eat();
```


## TypeScript 接口

在面向对象语言中，接口(Interface)是一种规范的定义，它是对行为的抽象，而具体如何行动需要由类去实现。跟抽象类有点像，但是，接口中不能有方法体，只允许有方法定义。

TypeScript 中的接口，除了常用于对 \[ 对象的形状（Shape）\]进行描述以外，也可用于\[对类的一部分行为进行抽象\]。

### 对象的形状

```typescript
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: "张三",
  age: 20,
};
```

###  可选 | 只读属性

```typescript
interface Person {
  readonly name: string;
  age?: number;
}
```

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。

只读属性用于限制只能在对象刚刚创建的时候修改其值。

做为变量使用的话用 `const`，若做为属性则使用`readonly`。

###  任意属性

有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 **索引签名** 的形式来满足上述要求。

```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

const p1: Person = { name: "zhangsan" };
const p2: Person = { name: "lolo", age: 5 };
const p3: Person = { name: "kakuqo", sex: 1 }
```

> 注意：一旦定义了任意属性，name确定属性和可选属性的类型都必须是它的类型的子集

###  类实现接口

一般来讲，一个类只能继承另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interface），用`implements`来实现。

举例来说，门是一个类，防盗门是门的子类。假设防盗门有一个报警器的功能，这时候有一个车，车也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现他：

```typescript
interface Alarm {
  alert(): void;
}
class Door {
   
}
class SecurityDoor extends Door implements Alarm{
  alert() {
    console.log('SecurityDoor alert');
  }
}
class Car implements Alarm {
  alert() {
    console.log('Car alert');
  }
}
```

一个类可以实现多个接口：

```typescript
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}
```

### 接口继承接口

```typescript
interface Alarm {
  alert(): void;
}

interface LightableAlarm extends Alarm {
  lightOn(): void;
  lightOff(): void;
}
```

###  接口继承类

```typescript
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3};
```

接口竟然还可以继承类，这是什么操作？在常见的面向对象语言中，我们知道接口只可以继承接口，因为它们是同一类别的。但是在 TypeScript 中却是可以的。

为什么 TypeScript 会支持接口继承类呢？官方解释是：

> 在TS中声明一个类的时候，同时也声明了一个类的实例的类型。

所以，当我们在声明 `class Point` 时，除了会创建一个名为 `Point` 的类之外，同时也创建了一个名为 `Point` 的类型（实例的类型）。

我们既可以将 `Point` 当做一个类来用（使用 `new Point` 创建它的实例）;也可以将 `Point` 当做一个类型来用（使用 `: Point` 表示参数的类型）。

我们可以简单了解一下接口继承类，因为在实践中应该不会用到。

## 总结

TypeScript 除了智能提示、拼写检查、类型错误提示外，还有其他很多优点：用 ts 写的组件库，类型就是最好的文档；鼠标悬停就能看到类型解释和说明，通过类型就能知道整体代码设计；重构 ts 代码也不会像重构 js 代码一样瞻前顾后，忧心忡忡；多人维护、代码量多、代码结构复杂的大型项目，类型系统能在编译期间帮大忙，合理使用 ts 能很大程度的提高工程质量和工作效率。对开发者来说十分友好！

感谢您的阅读，我是数字办的张敏，期待与您共同成长！！！