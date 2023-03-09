# 为什么要讲Promise


Promise是JavaScript异步编程一个里程碑氏的优秀解决方案，即使现在async/await大行其道，仍免不了要使用它，而且后者只是前者的语法糖而已。
​

下面先从异步解决方案的变迁开始，带你了解它到底是解决了什么问题，又是怎么解决的。
# 异步解决方案的变迁
## callback
在JavaScript的世界中，所有代码都是单线程执行的。所以JavaScript的所有网络操作、浏览器事件，都必须是异步执行（虽然Ajax请求可以同步，但因为会阻塞主线程，造成页面卡顿，不推荐使用）。例：
```javascript
function callback() {
    console.log('Done');
}
console.log('before setTimeout()');
setTimeout(callback, 1000); // 1秒钟后调用callback函数
console.log('after setTimeout()');
```
或者我们以前常用的Ajax：
```javascript
function ajax(success, fail) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      return success(xmlhttp.responseText);
    } else {
      return fail(xmlhttp.status);
    }
  }
  xmlhttp.open("GET", "/try/ajax/ajax_info.txt", true);
  xmlhttp.send();
}
```


或者浏览器事件：
```javascript
document.getElementById("demo").addEventListener('click', function(){
  console.log('ok');
});
```
或者常见的发布订阅模式：
```typescript
var event = new Event() 
function load (params) {
  console.log('load', params)
}
event.addEventListener('load', load)

function load2 (params) {
  console.log('load2', params)
}
event.addEventListener('load', load2)
// 触发该事件
event.dispatchEvent('load', 'load事件触发')
```
> 回调函数（callback）是一段可执行的代码段，它以参数的形式传递给其它代码，在其合适的时间执行这段**回调函数**的代码。它的执行本身是同步的，但因为注册时间与执行时机的解耦，整个过程看起来就是异步的了。
> 优点：相比于同步，不会阻塞主线程，提高整体代码运行效率。
> 缺点：回调地狱，代码可读性、可维护性差，剥夺了回调函数返回结果的能力。

比如下面代码：
```javascript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

```
这样的代码显然非常丑陋。
## 链式调用
为解决回调地狱的问题，开发者想出以**链式调用**的方式来组装代码逻辑，这样把执行代码和处理代码分离开，使异步操作逻辑更加清晰。
社区方案很多，这里简单提两个我曾经用过的。
### thenjs
看个官方的例子：
```javascript
Thenjs(function (cont) {
  task(10, cont);
})
.then(function (cont, arg) {
  console.log(arg);
  cont(new Error('error!'), 123);
})
.fin(function (cont, error, result) {
  console.log(error, result);
  cont();
})
.each([0, 1, 2], function (cont, value) {
  task(value * 2, cont); // 并行执行队列任务，把队列 list 中的每一个值输入到 task 中运行
})
.then(function (cont, result) {
  console.log(result);
  cont();
})
.series([ // 串行执行队列任务
  function (cont) { task(88, cont); }, // 队列第一个是异步任务
  function (cont) { cont(null, 99); } // 第二个是同步任务
])
.then(function (cont, result) {
  console.log(result);
  cont(new Error('error!!'));
})
.fail(function (cont, error) { // 通常应该在链的最后放置一个 `fail` 方法收集异常
  console.log(error);
  console.log('DEMO END!');
});
```
> 优点：实现了链式调用，即代码逻辑的隔离。
> 缺点：第一个参数必须是cont函数，下一步仍需要手动调用cont，不够优雅。

### jQuery.Deferred
首先，回顾一下jQuery的ajax操作的传统写法：
```javascript
$.ajax({
  url: "test.html",
  success: function () {
    alert("哈哈，成功了！");
  },
  error: function () {
    alert("出错啦！");
  },
});
```
$.ajax()操作完成后，如果使用的是低于1.5.0版本的jQuery，返回的是XHR对象，你没法进行链式操作；如果高于1.5.0版本，返回的是deferred对象，可以进行链式操作。
以上例子就可以改写为：
```typescript
$.ajax('test.html')
 .then(function () {
   alert("哈哈，成功了！");
 })
 .fail(function () {
   alert("出错啦！");
 });
```
对于普通业务，可以直接使用$.Deferred()：
```javascript
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function (dtd) {
  setTimeout(function () {
    alert('执行完毕！');
    dtd.resolve(); // 改变Deferred对象的执行状态
    // dtd.reject('error');
  }, 1000);
  return dtd.promise(); // 返回promise对象
};
var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作
d.then(function () {
  alert('then');
}).then(function () {
  alert('then2');
}).fail(function (err) {
  alert(err);
})
```
> 优点：从上面可以看出来，它的写法与现代的Promise比较类似了。比thenjs看起来优雅些，不需要在then中手动触发到下一步。
> ​

> 缺点：链接处理内部错误捕捉不足。比如以下这种情况，在then中抛出异常，是走不到fail的。

```javascript
var dtd = $.Deferred(); // 新建一个Deferred对象
var wait = function (dtd) {
  setTimeout(function () {
    dtd.resolve(); // 改变Deferred对象的执行状态
  }, 1000);
  return dtd.promise(); // 返回promise对象
};
var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作
d.then(function () {
  throw new Error('error')
}).fail(function (err) {
  alert(err); // 对上一步的error无能为力
});
```
### Promise
今天的主角Promise，借鉴了jQuery.Deferred的设计，算是链式调用的最佳方案。
改造上面的callback的例子：
```typescript
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```
细节且按下不表，我们后面详谈。
> 优点：相较于jQuery，更好地进行错误捕获。
> 缺点：就是链式调用的通用缺点。
> 1. 无法取消。
> 1. 性能损耗。每个Promise都是new了一个新的对象，每个then、catch又返回一个新的Promise，这些都是损耗。而且延时肯定永远不可能比直接执行callback快。
> 1. 内错难抛。有些内部错误无法抛出，比如状态已经变化后再发生的错误。
> 1. 堆栈复杂。当处于 Pending 状态时，无法得知目前进展到哪一个阶段。我们调试代码时也会发现堆栈变得相当复杂。
> 1. 不够优雅。对于追求完美的我们而言，then写多了，看起来仍不够优雅。

## generator
有人这样说：
> 异步编程的语法目标，就是怎样让它更像同步编程。

确实是大实话。于是，generator应运而生。
generator是生成器的意思，熟悉Python的同学应该会了解，被称为协程的关键实现，ES6的generator设计其实就是借鉴的Python。
它需要使用**yield**关键字，代码如下：
```typescript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
const f = foo(0);
console.log(f.next()); // { value: 1, done: false }
console.log(f.next()); // { value: 2, done: false }
console.log(f.next()); // { value: 3, done: true }
```
这个普通的函数还看不出它的威力来，举个ajax的例子：
```typescript
function* main() {
  try {
    r1 = yield ajax('http://url-1', data1);
    r2 = yield ajax('http://url-2', data2);
    r3 = yield ajax('http://url-3', data3);
    success(r3);
  } catch (err) {
    handle(err);
  }
}
```
> 优点：看得出来，写法上已经极像同步编程了。
> 缺点：仍不够优雅，你看到的只是水面上的冰山一角，看不到的地方是丑陋的。

我们看下怎么封装ajax这个函数：
```typescript
let generator: Generator; // 必须在外面定义一个变量

function ajax(url: string) {
  const fetchMock = (url: string, callback: (data: string) => void) => {
    setTimeout(() => {
      callback(url);
    }, 10);
  };
  fetchMock(url, function (result) {
    console.log("result", result);
    generator.next(result); // 执行
  });
}

function* main(): Generator {
  console.log("----main---");
  const data1 = yield ajax("http://url-1");
  const data2 = yield ajax("http://url-2");
  console.log(data1, data2);
}

generator = main(); // 这句不会执行main函数
generator.next(); // 开始执行
```
是不是比较麻烦？
### co
我们看得出来，直接使用generator还是很繁琐的，于是有人开发了一个库[co](https://www.npmjs.com/package/co)，将generator封装成Promise，可以这样使用：
```typescript
const co = require('co');
 
co(function *(){
  const word = yield "abcd";
  console.log(word); // abcd
  
  const result = yield Promise.resolve(true);
  console.log(result); // true
  
  // resolve multiple promises in parallel
  const a = Promise.resolve(1);
  const b = Promise.resolve(2);
  const c = Promise.resolve(3);
  const res = yield [a, b, c];
  console.log(res);  // => [1, 2, 3]
}).catch(console.error);
```
所以，我们只需要把ajax封装为Promise，就能yield调用了。
而co的实现原理也比较简单，我们看个简单的实现：
```typescript
function co(it, ...args) {
    return new Promise((resolve, reject) => {
        function next(data) {
            if (typeof it === "function") {
                it = it.apply(null, args);
            }
            if (!it || typeof it.next !== "function") {
                return resolve(it);
            }
            const { value, done } = it.next(data);
            if (!done) {
                if (Array.isArray(value)) {
                    Promise.all(value).then(data => {
                        next(data);
                    }, reject);
                } else {
                    Promise.resolve(value).then((data) => {
                        next(data);
                    }, reject);
                }
            } else {
                resolve(value);
            }
        }
        next(undefined);
    });
}
```
​

### koa
我们熟悉的Node.js的koa框架一开始就用co和generator封装，曾经一度是这样的代码：
```typescript
const koa = require('koa');
const app = koa();

app.use(function *(next){
    //upstream_A
    console.log('upstream_A');
    var time = new Date;
    yield next;
    //downstream_A
    console.log(`downstream_A time is ${new Date - time}ms`);
});
app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
```
后来随着async/await的出现，改投了后者的怀抱。
### generator 原理
再回头看一遍一开始的例子：
```typescript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
const f = foo(0);
console.log(f.next()); // { value: 1, done: false }
console.log(f.next()); // { value: 2, done: false }
console.log(f.next()); // { value: 3, done: true }
```
从以上代码可以发现，加上`*`的函数执行后拥有了`next`函数，也就是说函数执行后返回了一个对象。每次调用`next`函数可以继续执行被暂停的代码。

以下是 generator 函数的简单实现：

```typescript
function generator(cb) {
  const obj = {
    done: false,
    next: 0,
    rval: undefined,
    stop: function () { },
    abrupt: function (result) {
      this.rval = result;
      this.next = 'end';
    }
  };

  return {
    next() {
      const ret = cb(obj);
      if (ret === undefined) {
        return {
          value: obj.rval,
          done: true
        }
      } else {
        return {
          value: ret,
          done: false,
        };
      }
    },
  };
}
```
如果你使用 babel 编译后，可以发现上面的代码则会被编译为类似这种代码：
```typescript
function foo(x) {
    return generator(function (_context) {
        while (1) {
            switch ((_context.prev = _context.next)) {
                // 可以发现通过 yield 将代码分割成几块
                // 每次执行 next 函数就执行一块代码
                // 并且表明下次需要执行哪块代码
                case 0:
                    _context.next = 4;
                    return x + 1;
                case 4:
                    _context.next = 6;
                    return x + 2;
                case 6:
                    return _context.abrupt(x + 3);
                // 执行完毕
                case "end":
                    return _context.stop();
            }
        }
    });
}
const f = foo(0);
console.log(f.next()); // { value: 1, done: false }
console.log(f.next()); // { value: 2, done: false }
console.log(f.next()); // { value: 3, done: true }
```
## async/await
async/await的出现，算是终极大招。在可见的未来里，应该找不到更优秀的方案了。目前，像C#、Python、Rust、Dart等语言都已经支持这俩关键字。
```typescript
function getSomething() {
    return "something";
}

async function testAsync() {
    return "hello async";
}

async function testAsync2() {
    return Promise.resolve("hello async2");
}

async function test() {
  try {
    const v1 = await getSomething();
    const v2 = await testAsync();
    const v3 = await testAsync2();
    console.log(v1, v2, v3);
  } catch(e) {
    console.error(e);
  }
}

test();
```
加了**async**的函数，返回类型就是一个Promise，即使原来不是Promise。其实相当于执行了Promise.resolve()方法。
而**await**关键字可以等待异步函数，也支持同步的函数。
使用try/catch也可以进行异常或错误的捕获，算是比较完美了。

当然，它只是Promise的语法糖，而Promise的一般缺点，仍然无法避免，虽然说起来有点儿吹毛求疵了。

在计算机行业乃至整个社会生活，从没有完美的方案，想要得到什么，必然要舍弃什么，芸芸众生，概莫能外。
​

# Promise详解
## 释义
承诺。承诺它过一段时间会给你一个结果，成功或失败，又或者仍在进行中。
## 语法
Promise本质上就是一个构造函数，我们一般都是在使用它的实例，也就是一个对象，它可以获取异步操作的消息。
所以不要觉得它有什么神秘的。

唯一的特异之处，可能是它的then方法执行在微任务队列中，会比宏任务（比如常用的setTimeout）运行的早一些。例如下面这个经典考题：

```typescript
setTimeout(() => {
    console.log(4);
});
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```
那么，我们在实现一个Promise之前，先简单介绍下宏任务和微任务，当然，那又不得不提下浏览器的事件循环机制。
## 浏览器事件循环机制
JavaScript 事件循环机制以运行时环境划分，可分为**浏览器**、**Node.js**及**Deno**事件循环机制，三者的实现技术不一样：

- 浏览器 Event Loop 是 HTML 中定义的规范；
- Node.js Event Loop 是由 libuv 库实现；
- Deno Event Loop 是 由 Rust 语言的 Tokio 库实现。

这里只讲浏览器部分。
### 进程、线程
进程是系统分配的独立资源，是 CPU 资源分配的基本单位，进程是由一个或者多个线程组成的。
线程是进程的执行流，是CPU调度和分派的基本单位，同个进程之中的多个线程之间是共享该进程的资源的。
​

### 浏览器进程
![image.png](https://pan.udolphin.com/files/file/2021/10/192917773517b2cda77a4fe7db6c4393.png)

浏览器模式一般有两种，单进程架构和多进程多线程架构。现代浏览器基本上都是后者了。为什么呢？
因为现在网页复杂性非常高，如果整个浏览器是单进程的，有可能某个page界面的抛错就会导致整个浏览器的崩溃。同时多个界面互相可以访问相同的内存和相同的执行环境，安全性也是一个大的问题，所以浏览器需要采用多进程模式。
以chrome为例，浏览器的进程大概分为以下这几种：

- 浏览器主进程(Browser进程)：控制chrome的地址栏，书签栏，返回和前进按钮，同时还有浏览器的不可见部分，例如网络请求和文件访问。
- 第三方插件进程：每种插件一个进程，插件运行时才会创建。
- 浏览器渲染进程（也被称为**浏览器内核**，内部是多线程的）：负责界面渲染，脚本执行，事件处理等。
- GPU进程：最多一个，用于3D绘制。
- 工具进程：比如我们调试的控制台。



### 浏览器内核
浏览器是多进程的，浏览器每一个 tab 标签一般代表一个独立的进程（多个空白 tab 标签会合并成一个进程），浏览器内核（浏览器渲染进程）属于浏览器多进程中的一种。
​

浏览器内核有多种线程在工作。

![](https://pan.udolphin.com/files/file/2021/10/be49c980a92bcfdec95c77e5c89b8633.png)

#### GUI 渲染线程
负责渲染页面，解析 HTML，CSS 构成 DOM 树等，当页面重绘或者由于某种操作引起回流都会调起该线程。
**和 JS 引擎线程是互斥的**，当 JS 引擎线程在工作的时候，GUI 渲染线程会被挂起，GUI 更新被放入在 JS **任务队列**中，等待 JS 引擎线程空闲的时候继续执行。
#### JS 引擎线程
单线程工作，负责解析运行 JavaScript 脚本。它一般就是我们常说的主线程。
**和 GUI 渲染线程互斥**，JS 运行耗时过长就会导致页面阻塞。
#### 事件触发线程
当事件符合触发条件被触发时，该线程会把对应的事件回调函数添加到**任务队列**的队尾，等待 JS 引擎处理。
#### 定时器触发线程
浏览器定时计数器并不是由 JS 引擎计数的，阻塞会导致计时不准确。
开启定时器触发线程来计时并触发计时，计时完成后会被添加到**任务队列**中，等待 JS 引擎处理。
#### http 请求线程
http 请求的时候会开启一条请求线程。
请求完成有结果了之后，将请求的回调函数添加到**任务队列**中，等待 JS 引擎处理。
​

> 从上面可以看出，JS 引擎线程外的其它线程的后续工作都会添加到任务队列中。
> 而JS引擎线程是单线程，每次只能执行一项任务，其它任务都得按照顺序排队等待被执行，只有当前的任务执行完成之后才会往下执行下一个任务。

​

### 同步任务、异步任务
JavaScript 单线程中的任务分为同步任务和异步任务。
同步任务会在调用栈中按照顺序排队等待主线程执行；
异步任务则会在异步有了结果后，将注册的回调函数添加到任务队列中，等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。
### Event Loop
调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。
​

每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环（event loop）。


![](https://pan.udolphin.com/files/file/2021/10/8035372cdcb485196de6f75fcde7c309.png)


### 宏任务(macro-task)、微任务(micro-task)
​

除了广义的同步任务和异步任务，JavaScript 单线程中的任务还可以细分为宏任务和微任务。
​

macro-task包括：**script(整体代码), setTimeout, setInterval, setImmediate, I/O等。**
​

micro-task包括：**process.nextTick, Promise, Object.observe（已废弃）, MutationObserver。**

![](https://pan.udolphin.com/files/file/2021/10/7a5b15afd601962956a12416df01aa9b.png)
​

宏任务本质，是参与了事件循环的任务，就是上面图上的GUI渲染线程、事件触发线程、定时器触发线程、http请求线程传递过来的消息。
微任务本质，是直接在 Javascript 引擎中执行的，没有参与事件循环的任务。它是V8的一个实现，**本质上它和当前的V8调用栈是同步执行的，只是放到了最后面**。类似于hooks，像是一个后门，专门在宏任务执行完成后，执行所有微任务，执行完成后，才会进行下一轮宏任务。
​

以下是个常见的async、Promise与setTimeout结合的考题，以前浏览器不同版本或Node.js不同版本的打印结果可能不太一样，但现在比较一致了。大家可以自己分析下执行顺序，
```typescript
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('asnyc1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
    console.log('promise1');
    reslove();
}).then(function () {
    console.log('promise2');
})
console.log('script end');
```


## Promise实现
Promise需要遵循`[Promise A+](https://promisesaplus.com/)`[规范](https://github.com/promises-aplus/promises-spec)。这个规范细节很多，有兴趣的可以自己看看，这里就不照搬了。
要完整符合规范并不容易，一般来说，知道以下几点，就差不多了。

1. `Promise`构造函数的参数是个函数，这个函数又显式地要求有2个参数`resolve`和`reject`方法，分别对应成功或者失败的函数
1. 每个`Promise`实例是可以用`.then`或者`.catch`链式调用，而每次调用，其实都不是它自己了，都会返回一个新的`Promise`实例
1. `.then`方法有2个函数作为参数，分别对应成功处理和失败处理
1. 一个实例有3种状态（进行中（`pending`）、成功（`fulfilled`）、失败（`rejected`）)，成功或失败后就不能再更改状态了



> 参见以下这种情况，先resolve了，但后面发生异常，依然是成功状态。

```javascript
new Promise((resolve, reject) => {
  resolve('111');       
  throw new Error('err'); // 这句异常其实被吞没了
}).then(function(){
  console.log('--ok--'); //打印此句
}).catch(function(){
  console.log('-------err--')
});
```


我们在这里写个简易版本，方便深入理解Promise的运行机制。


### 难点
在写代码之前，我们需要思考下难点在哪里。


我们知道，`Promise`的出现，是为了解决前端异步回调的痛点，它的每个`.then`，都是异步的操作。但在`js`里，我们`.then`的时候，其实是执行了一个对象的`then`方法，这是个同步的操作。


也就是说，`then`方法中的代码，肯定不能立即执行，必须得缓存起来，在合适的时机再执行它。


而什么时候执行呢？外部代码显式调用`resolve`或`reject`以后，就可以执行了。


一般来说，有2种延时方案：
一种是在`resolve`或者`reject`执行时，进行延时；
一种是在`.then`方法里，执行对应的函数时进行延时。


2种都能实现大致功能，但前者在完全符合规范编写过程中遇坑不少，这里我们选择第二种。


### 步骤一：初始化构造函数


先定义3种状态：


```javascript
const PENDING = 'pending'; //进行中
const FULFILLED = 'fulfilled'; //成功
const REJECTED = 'rejected'; //失败
```


再写构造函数，内置3个属性——状态`status`、成功返回值`value`、失败原因`reason`。把`resolve`和`reject`这两个内置函数作为`fn`的参数执行，它俩的责任就是改变当前`promise`的状态值。


```javascript
class Promise {
    constructor(fn) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        const resolve = (val) => {
            if (this.status !== PENDING) { // 参见第4条，状态变化后就不能再修改了
                return;
            }
            this.status = FULFILLED;
            this.value = val;
            //todo
        };

        const reject = (err) => {
            if (this.status !== PENDING) { // 参见第4条，状态变化后就不能再修改了。
                return;
            }
            this.status = REJECTED;
            this.reason = err;
            //todo
        };
        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
}
```


### 步骤二：实现then方法


从第2条和第3条可知，`then`方法需要返回一个新的`Promise`，且要异步处理。
怎么异步处理呢？上面提到，需要把`then`的这两个参数缓存起来，于是我们把它们分别存到2个数组中。


为什么用数组，而不是普通变量呢？我开始也困惑了好久，后来想到，有这样一种使用场景：


```javascript
a = Promise.resolve(123);
a.then(console.log);
a.then(console.error);
```


上述一个`promise`会在不同的地方`.then`执行，显然，两个回调函数应该一前一后执行，而不是丢失某一个。


所以，我们在构造函数中添加2个数组：


```javascript
 constructor(fn) {
    ...
    this.onFulfilledList = [];
    this.onRejectedList = [];
    ...
 }
```


继而在`then`中，在状态为`pending`时，把需要延时处理的函数推送到这俩数组中。


需要注意的是，对于`then`传递的这俩参数，如果在需要的时候它不是函数，则会忽略不计，把当前`promise`的状态传递到下一个。


```javascript
then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
        const onResolvedFunc = function (val) {
            const cb = function () {
                try {
                    if (typeof onFulfilled !== 'function') { // 如果成功了，它不是个函数，意味着不能处理，则把当前Promise的状态继续向后传递
                        resolve(val);
                        return;
                    }
                    const x = onFulfilled(val);
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            };
            setTimeout(cb, 0);
        };

        const onRejectedFunc = function (err) {
            const cb = function () {
                try {
                    if (typeof onRejected !== 'function') { // 如果失败了，它不是个函数，意味着不能处理，则把当前Promise的状态继续向后传递
                        reject(err);
                        return;
                    }
                    const x = onRejected(err);
                    resolve(x); //处理了失败，则意味着要返回的新的promise状态是成功的
                } catch (e) {
                    reject(e);
                }
            };
            setTimeout(cb, 0);
        };

        if (this.status === PENDING) {
            this.onFulfilledList.push(onResolvedFunc);
            this.onRejectedList.push(onRejectedFunc);
        } else if (this.status === FULFILLED) {
            //todo
        } else {
            //todo
        }
    });
}
```


下来就是在构造函数的`resolve`和`reject`中执行我们缓存的函数。


```javascript
constructor(fn) {
    ...
    const resolve = (val) => {
        ...
        this.onFulfilledList.forEach((cb) => cb && cb.call(this, val));
        this.onFulfilledList = [];
    };

    const reject = (err) => {
        ...
        this.onRejectedList.forEach((cb) => cb && cb.call(this, err));
        this.onRejectedList = [];
    };
    ...
}
```


现在，下面的例子应该可以成功了：


```javascript
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('111');
    }, 0);
}).then(function () {
    console.log('--ok--')
});
```


但去掉延时（`setTimeout`）就会失败。分析下原因就明白了，我们在调用`resolve`时就改变了`status`，走到`then`方法时，状态已经变为成功了。所以我们需要在状态已经变为成功或失败时，直接调用回调函数，而不是依赖`resolve`或`reject`触发：


```javascript
then(onFulfilled, onRejected) {
    ...
    if (this.status === PENDING) {
        ...
    } else if (this.status === FULFILLED) { 
        onResolvedFunc(this.value);
    } else { // if(this.status === REJECTED) { //如果这个Promise已经失败，说明已经reject过了，不能再依赖reject来触发，就直接执行失败处理。
        onRejectedFunc(this.reason);
    }
}
```


这样，下面的代码就`ok`了：


```javascript
new Promise((resolve, reject) => {
    resolve('111');
}).then(function () {
    console.log('--ok--')
});
```


### 步骤三：实现catch


`catch`的实现很简单，就是个`then`的语法糖：


```javascript
catch(onRejected) {
    return this.then(null, onRejected);
}
```


### 步骤四：模拟微任务


按理说`promise`的主要功能已经实现了，但下面的代码就会暴露一个问题：


```javascript
setTimeout(function(){
    console.log('---timeout--')
});
new Promise((resolve, reject) => {
    resolve('111');
}).then(function () {
    console.log('--ok--')
});
console.log('--log--');
```


会先打印`log`，这是正常的，再打印`timeout`，最后打印`ok`。这就违反了微任务优先的原则，毕竟它是**VIP**啊。


怎么做呢？


浏览器中有个`MutationObserver`，`Node.js`中可以使用`process.nextTick`，这俩都没有的时候，再回退到`setTimeout`。这才是正确的实现姿势。


为了图方便，我照抄了`vue`的`nextTick`中的代码，具体可见[这里](../../vue/nextTick)。


```javascript
const isInBrowser = typeof window !== 'undefined';
const nextTick = function(nextTickHandler) {
    if (isInBrowser) {
        if (typeof MutationObserver !== 'undefined') { // 首选 MutationObserver 
            let counter = 1;
            const observer = new MutationObserver(nextTickHandler); // 声明 MO 和回调函数
            const textNode = document.createTextNode(counter);
            observer.observe(textNode, { // 监听 textNode 这个文本节点
                characterData: true // 一旦文本改变则触发回调函数 nextTickHandler
            });
            const start = function () {
                counter = (counter + 1) % 2; // 每次执行 timeFunc 都会让文本在 1 和 0 间切换
                textNode.data = counter;
            };
            start();
        } else {
            setTimeout(nextTickHandler, 0);
        }
    } else {
        process.nextTick(nextTickHandler);
    }
};
```


再把`then`方法中`setTimeout`换成`nextTick`就可以了。


### 完整实现


怎么能完全符合规范呢？有个检查工具：`promises-aplus-tests`， 使用`npm`安装一下，再在`script`标签中使用：


```
"test": "promises-aplus-tests src/promise.js --reporter spec"
```


需要你的`promise.js`用`module.exports`导出，再在内部实现一个`deferred`方法：


```javascript
static deferred() {
    const result = {};
    result.promise = new Promise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
}
```


接下来就能执行所有的测试用例了。


一个完整的实现，详见[这里](https://github.com/jiawei397/promise-polyfill/blob/master/index.js)，就不再赘述了。


# Promise扩展
## Promise.resolve
Promise.resolve提供了一个简写的创建一个Promise的方法。
```typescript
 static resolve(val) {
    if (Promise.isPromise(val)) {
      return val;
    }
    return new Promise((resolve) => {
      if (val && typeof val.then === 'function') { // 如果返回值是个thenable对象，需要处理下
        val.then((res) => {
          resolve(res);
        });
        return;
      }
      resolve(val);
    });
  }
```
## Promise.reject
`Promise.reject`与`resolve`有点儿不同，不论参数是否`Promise`，都会返回一个新的。
```typescript
 static reject(val) {
   //reject不区分是不是Promise
   return new Promise((_, reject) => {
     reject(val);
   });
 }
```
## Promise.all的实现
在有Promise之前，我们要等待多个ajax调用完成后，再进行后续的操作，是这样的：
```typescript
function ajax(url, callback) {
    setTimeout(() => {
        callback(url);
    }, 100 * Math.random());
}

function main() {
    let step = 0;
    let allCount = 0;
    const results = [];
    const cb = function (result) {
        step++;
        results.push(result);
        if (step === allCount) {
            console.log('end', results);
        }
    };

    ajax('url1', cb)
    allCount++;

    ajax('url2', cb)
    allCount++;
}
```
有了`Promise.all`后，就比较方便了，而这种ajax的并发，也是`Promise.all`的一个常用的使用场景。

它的实现，其实与上面类似，也是需要通过计数来判断什么时候结束。
​

`Promise.all`要求所有的`Promise`都成功，有一个失败则返回错误信息。


```javascript
Promise.all = function (arr) {
  const Constructor = this;
  if (!Array.isArray(arr)) {
    return Constructor.reject(new TypeError('You must pass an array to all.'));
  }
  let counter = arr.length;
  if (counter === 0) {
    return Constructor.resolve(arr);
  }
  return new Constructor((resolve, reject) => {
    const result = [];
    arr.forEach((promise, i) => {
      Constructor.resolve(promise) //这是为了防止参数并非Promise处理的
        .then((val) => {
          result[i] = val; // 这里需要保障返回顺序，所以不能用push
          counter--;
          if (counter === 0) {
            resolve(result);
          }
        }, reject);
    });
  });
};
```


以下是测试用例：


```javascript
a = function () {
  return new Promise((resolve => {
    setTimeout(function () {
      resolve(20);
    }, 0);
  }));
};

b = function () {
  return new Promise((resolve => {
    setTimeout(function () {
      resolve(200);
    }, 1000);
  }));
};

c = function () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject('error');
    }, 1000);
  });
};

Promise.all([a(), b(), c()])
 .then(function (arr) {
   console.log(arr);
 })
 .catch(console.error);
```


如果不用Promise.all，而是async/await，那么代码应该这么写：
```typescript
const promise1 =  a();
const promise2 =  b();
const promise3 =  c();

try {
  const arr = [];
  arr.push(await promise1);
  arr.push(await promise2);
  arr.push(await promise3);
} catch(e) {
  console.error(e);
}
```
至于Promise.race、Promise.any、Promise.allSettled等实现，与之类似，这里就不再赘述了。
## promisify
`Node.js`早期的异步`api`，都是以下这种规范，最后一个参数是回调函数，回调函数的第1个参数是错误信息，第2个才是返回值


```javascript
var fs = require('fs');
fs.readFile('readtxt/demo.txt', 'utf-8', function(err, data){
    if (err){
        console.error(err);
    } else{
        console.log(data);
    }
});
```


自从Promise出现后，旧有的这些API已经不能满足大家的需求，但改造成本又有些高，于是有人想出一种实现，那就是`promisify`函数。
它本质是一个高阶函数。其参数是个`function`，结果也是个`function`，执行后可以得到一个`Promise`。
用法如下：


```javascript
var func = promisify(fs.readFile);
func('readtxt/demo.txt','utf-8').then(function(data){
    console.log(data);
}).catch(function(err){
    console.error(err);
});
```
​

怎么实现呢？也很简单：
```javascript
function promisify (original) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      args.push(function (err, ...values) {
        if (err) {
          reject(err);
          return;
        }
        resolve(...values);
      });
      original.apply(this, args);
    });
  };
}
```
​

现在`Node.js`官方已经有`api`，即`util.promisify`，也都提供了旧有API的返回Promise的新版本。
## 异常处理
对于未捕获的Promise异常，浏览器和Node.js都提供了相关相关的全局捕获处理。遗憾的是，deno目前缺席，且未必会实现它。
### 浏览器
```typescript
window.addEventListener("unhandledrejection", (event) => {
  console.log("event", event);
  event.preventDefault();
}, false);

Promise.reject("abcd").then(console.log);
```
### Node.js
```typescript

const process = require('process');

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // 应用程序特定的日志记录，在此处抛出错误或其他逻辑
});
```

随着Node.js高版本处理Promise异常捕获的严格限制（如果未捕获，将停止进程），这段代码将发挥更大的价值。

# 总结
本文先介绍了JavaScript异步解决方案的变迁，又简介了浏览器的事件循环机制以及宏任务和微任务，最后通过一个简单的Promise实现，让你对Promise的特性更加了解。大家在日常的工作中，如果遇到异步场景，应该第一时间想到用Promise来处理，尤其是封装底层工具库给别人使用时。
如果对大家日常的工作能有一丝帮助，那就是我的荣幸。
