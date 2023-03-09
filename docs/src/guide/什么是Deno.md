## 简介

[Deno](https://deno.land/)简单说是Node.js的替代品，是Node.js之父Ryan Dahl 为挽回Node.js的错误而开发的。

Node.js存在的问题有：

1. npm包管理（node\_modules）复杂。
2. 历史原因导致的api维护，比如早期变态的callback设置。
3. 没有安全措施，用户只要下载了外部模块，就只好听任别人的代码在本地运行，进行各种读写操作。
4. 功能不完善，导致各种工具层出不穷，比如webpack、babel等。

由于上面这些原因，Ryan Dahl 决定放弃 Node.js，从头写一个替代品，彻底解决这些问题。  
deno 这个名字就是来自 Node 的字母重新组合（Node = no + de），表示"拆除 Node.js"（de = destroy, no = Node.js）。

跟 Node.js一样，Deno 也是一个服务器运行时，但是支持多种语言，可以直接运行 **JavaScript、TypeScript 和 WebAssembly** 程序。

* 它内置了 V8 引擎，用来解释 JavaScript。同时，也内置了 tsc 引擎，解释 TypeScript。
* 它使用 Rust 语言开发，由于 Rust 原生支持 WebAssembly，所以它也能直接运行 WebAssembly。
* 它的异步操作不使用 libuv 这个库，而是使用 Rust 语言的 Tokio 库，来实现事件循环（event loop）。

它的架构如下图所示：

![](https://pan.udolphin.com/files/image/2021/9/106325a108b0f81ebf4e6ba29bc51031.jpg)

> 说明：  
> 1、Rust 是由 Mozilla 主导开发的通用、编译型编程语言。设计准则为 “安全、并发、实用”，支持函数式、并发式、过程式以及面向对象的编程风格。Deno 使用 Rust 语言来封装 V8 引擎，通过 libdeno 绑定，我们就可以在 JavaScript 中调用隔离的功能。  
> 2、Tokio 是 Rust 编程语言的异步运行时，提供异步事件驱动平台，构建快速，可靠和轻量级网络应用。利用 Rust 的所有权和并发模型确保线程安全。Tokio 构建于 Rust 之上，提供极快的性能，使其成为高性能服务器应用程序的理想选择。在 Deno 中 Tokio 用于并行执行所有的异步 IO 任务。  
> 3、V8 是一个由 Google 开发的开源 JavaScript 引擎，用于 Google Chrome 及 Chromium 中。V8 在运行之前将JavaScript 编译成了机器代码，而非字节码或是解释执行它，以此提升性能。更进一步，使用了如内联缓存（inline caching）等方法来提高性能。有了这些功能，JavaScript 程序与 V8 引擎的速度媲美二进制编译。在 Deno 中，V8 引擎用于执行 JavaScript 代码。  
> 4、Deno与Node.js的核心模型是一致的，都是异步非阻塞I/O。所以Deno与Node.js在使用场景上基本一致，适合I/O密集型，不适用于CPU密集型。开发中要避免使用同步I/O和复杂计算场景。

### 优势

Deno凭什么来吸引开发者改换门庭，转投它的怀抱呢？于我而言，主要有以下几点：

* 天然支持ts。如果用Node.js，需要我们手动将ts编译成js，或者使用ts-node这种第三方工具。Deno不需要配置，开箱即用。
* 内存安全。相较于Node.js，它的性能优势并不明显，因为就是js换了个运行环境而已，Rust并不见得比C++更高效，不过Rust会天然让它的内存安全和核心代码的健壮性更有保障些。
* 安全机制。除非明确启用，否则没有文件，网络或环境访问权限。对于运行权限的划分，能清晰知道你的程序需要拥有哪些权限，对网络资源没有信任的同学可以放心了。
* 没有历史包袱。不像Node.js一开始自定义了commonjs规范，Deno直接支持ES Modules。没有回调地狱，代码结构更清晰，利于tree shaking；也可以直接使用<mark>顶级</mark>await。
* 去中心化。不用每个工程都安装一大堆node\_modules，有个线上的url就能获取代码。
* 内置浏览器API。Deno实现了fetch、FormData、WebSocket等浏览器的API，虽然被某些开发者诟病，但对前端开发者而言是真的友好，比如进行接口调用，与在浏览器里使用几乎没有区别。
* 全家桶似的服务，比如打包、格式化、代码校验，可以让你更专注业务，而不是成为某工具的配置工程师。

​

### 缺点

Deno的缺点也很明显：

* 没有针对Node.js压倒性的性能优势，所以对以上优势不感兴趣的开发者而言，就没有吸引力了。

> Deno 是一个合适的异步服务器，每秒 25k 请求足以满足大多数目的，此外，由于普遍使用 Promise，Deno 有更好的尾部延迟。目前 Deno HTTP 服务器每秒处理约 25 000 个请求，<mark>最大</mark>延迟为 1.3 毫秒，与之相比，Node 程序每秒处理 34 000 个请求，<mark>最大</mark>延迟介于 2 到 300 毫秒之间。  
> 可以看出，Deno的优势在于延迟低，但并没有压倒性优势。

* 无法完全继承Node.js的生态。虽然Deno提供了几款CDN服务，可以将旧的npm包转换为Deno可使用的格式，但并非所有npm包都能转换成功。因为Node.js仍有部分API官方没有实现，如果某个偏底层的包转换失败，所有依赖它的包都无法成功。所以，你很有可能在开发的某个环节需要造轮子。当然，这对于喜欢钻研技术的同学而言反而是个利好。
* 去中心化后，国内就没有办法像npm做镜像，官方搭建deno.land来存储github上各种资源，但目前只支持github上私有资源。想要引用私有文件，就必须自己搭建服务器，在CICD中构建的话，又有额外的技术难点需要解决。

## 安装

1、 Mac/Linux

执行以下命令：

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

2、Windows

```bash
https://github.com/denoland/deno/releases
```

直接在这里下载exe文件吧。  
​

当然，Mac与Linux也可以这样安装，但<mark>新版本</mark>的Mac系统可能会因为安全权限而禁止程序使用，需要参考[这里](https://support.apple.com/zh-cn/HT202491)配置下。

### 设置环境变量

关键要设置两个环境变量，一是deno二进制文件的目录，二是使用deno安装的全局命令的目录。  
以下是Linux命令行操作：

```bash
<code><code>echo 'export DENO_INSTALL="$HOME/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
export DENO_DIR=$HOME/.deno
' >> ~/.bash_profile

source ~/.bash_profile
```

Mac环境，修改文件推荐使用`.zshrc`。如果是使用命令安装的，注意看有提示信息。

而windows环境，我的电脑 -> 属性 -> 高级系统设置 -> 高级 -> 环境变量设置，上面用户变量和系统变量都可以配置。

比如把下载的deno.exe放在C:/bin目录下，在path的环境变量里添加一条C:\\bin。另一个环境变量就是 DENO\_INSTALL了，与Linux一样，通常是$HOME/.deno，比如我的是C:\\Users\\Administrator.deno，把它的bin目录添加到path中。

![](https://pan.udolphin.com/files/image/2022/7/10c4ae1fc0214bb2748476ef85877946.png)

### 测试

```bash
deno --version
```

如果没有生效，有时候需要重启电脑，尤其是windows。

### 升级

```bash
<code>deno upgrade
```

或升级到特定版本，例如`v1.3.0`：

```bash
deno upgrade --version 1.3.0
```

## 安全机制

Deno 具有安全控制，默认情况下脚本不具有读写权限。如果脚本未授权，就读写文件系统或网络，会报错。

必须使用参数，显式打开权限才可以。

```bash
--allow-read：打开读权限，可以指定可读的目录，比如--allow-read=/temp。
--allow-write：打开写权限。
--allow-net=google.com：允许网络通信，可以指定可请求的域，比如--allow-net=google.com。
--allow-env：允许读取环境变量。
--allow-run：允许运行子进程。
```

要使用不稳定的新特性，需要这样：

```bash
--unstable
```

还有新加的`--allow-ffi` 和`--allow-hrtime`，一般用不到，这里不再赘述，请情参考[官方文档](https://deno.land/manual@v1.13.2/getting_started/permissions)。

## 运行

使用deno run来运行程序，当然，一般需要加上上面的安全机制。  
如果你的程序什么权限都没使用，只是下面这种：

```typescript
console.log('app start');
```

那么直接用**deno run main.ts**就可以了。  
注意，我们推荐使用ts，但也可以运行js。  
​

如果需要读取文件，比如

```typescript
<code><code>const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("hello.txt");
console.log(decoder.decode(data));
```

自然得这样：**deno run --allow-read main.ts**  
**​**

如果需要网络，比如开启一个tcp：

```typescript
/**
 * echo_server.ts
 */
import { copy } from "https://deno.land/std@0.106.0/io/util.ts";
const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  copy(conn, conn).finally(() => conn.close());
}
```

你必须：**deno run --allow-net main.ts**

如果懒得管理权限，则使用`-A`（`deno run -A main.ts`），那就后果自负了。

当然，也可以运行远程服务器上的文件，比如官方的`hello world`：

```bash
deno run https://deno.land/std/examples/welcome.ts
```

## 更新模块

默认代码中引用中的ts或js文件，会缓存到本地。如果你引用的文件url中没有带版本号，那么就是<mark>最新</mark>版的代码。这时，你想要更新代码，那么你需要这样操作：

```bash
deno cache --reload my_module.ts
```

更新线上与本地文件：

```bash
deno cache --reload=https://deno.land/std@0.106.0 my_module.ts
```

更新线上某个文件与某文件夹：

```bash
deno cache --reload=https://deno.land/std@0.106.0/fs/copy.ts,https://deno.land/std@0.106
```

## 锁定文件校验

如果你在开发一个底层库或框架供他人使用，那么推荐创建一个`deps.ts`文件，来管理外部引用的文件。其实就是起到类似`package-lock.json`的作用，管理引用的文件与版本。

```typescript
// deps.ts
export { xyz } from "https://unpkg.com/xyz-lib@v0.9.0/lib.ts";
```

​

然后用`deno cache` 生成一个`lock.json`文件：

```bash
# Create/update the lock file "deno.lock".
deno cache --lock=deno.lock --lock-write deps.ts
```

另一台机器克隆下代码，运行后：

```bash
# Download the project's dependencies into the machine's cache, integrity
# checking each resource.
deno cache --reload --lock=deno.lock deps.ts

# Done! You can proceed safely.
deno test --allow-read src
```

## 导入地图

可以使用带有`--import-map=<FILE>CLI` 标志的导入映射，这样开发时使用体验类似于Node.js了。

> 不过如果是发布给别人使用的模块，不建议用它，因为这需要别人也把你的map文件复制过来。

例：import\_map.json

```json
{   
  "imports": {      
    "fmt/": "https://deno.land/std@0.106.0/fmt/"   
  }
}
```

main.ts:

```typescript
import { red } from "fmt/colors.ts"; 
console.log(red("hello world"));
```

然后：

```bash
deno run --import-map=import_map.json main.ts
```

建议在上层应用开发时，所有的第三方引用都在import\_map.json里维护，这样好管理依赖的版本。

## 来自CDN的包

目前，推荐将共享的代码发布在官方搭建的平台[https://deno.land/x/](https://deno.land/x/)上，它的发布也很简单，在你的github仓库里配置一个web hook，就可以了。

![](https://pan.udolphin.com/files/image/2021/9/60d4209186c70101d3e7628b476ddc89.png)

具体详见引导，非常简单，这里不再赘述。  
​

### esm.sh

[https://esm.sh/](https://esm.sh/)是个转换npm包为Deno使用的线上地址，它使用esbuild进行转换，速度很快。比如我们要使用React，可以这样直接使用：

```typescript
import React from "https://esm.sh/react";

export default class A extends React.Component {
  render() {
    return ;
  }
}
```

当然也支持版本号：

```typescript
import React from "https://esm.sh/react@17.0.2";
```

### Skypack

[https://www.skypack.dev/](https://www.skypack.dev/)也是类似：

```typescript
import React from "https://cdn.skypack.dev/react";

export default class A extends React.Component {
  render() {
    return ;
  }
}
```

## 直接使用npm包

Deno从1.28版本起，可以这样直接利用npm的包：

```typescript
import chalk from "npm:chalk@5";

console.log(chalk.green("Hello!"));
```

引用规则：

`npm:<package-name>[@<version-requirement>][/<sub-path>]`

以下是另一个样例：

```typescript
// main.ts
// @deno-types="npm:@types/express@^4.17"
import express from "npm:express@^4.17";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
console.log("listening on http://localhost:3000/");
```

如果在国内下载npm的网速较慢，可以使用环境变量`NPM_CONFIG_REGISTRY`来设置npm的镜像：

`NPM_CONFIG_REGISTRY=https://registry.npmmirror.com/ deno run -A main.ts`

## 安装脚本

使用deno install可以方便地安装一个脚本，类似于`npm i -g xxx`模块。

```bash
$ deno install --allow-net --allow-read https://deno.land/std@0.106.0/http/file_server.ts
[1/1] Compiling https://deno.land/std@0.106.0/http/file_server.ts

✅ Successfully installed file_server.
/Users/deno/.deno/bin/file_server
```

之后就能使用file\_server命令了。当然，需要将打印信息里这个bin目录添加到环境变量里，前文提过，这里不再赘述。

## 打包

### 打包为js

可以打包线上或本地文件为一个js文件：

```bash
deno bundle https://deno.land/std@0.106.0/examples/colors.ts colors.bundle.js
deno bundle main.ts main.js
```

打包后的文件是可以运行的：

```bash
deno run -A bundle.js
```

因为导出的是个ES模块化的代码，甚至可以放到浏览器里使用：

```html
<script type="module" src="website.bundle.js"></script>
```

或者在另一个js里引用：

```typescript
import * as website from "website.bundle.js";
```

### 编译为可执行文件

```bash
deno compile https://deno.land/std/examples/welcome.ts
```

也可以通过添加`--targetCLI`标志为其他平台编译二进制文件，比如在linux服务器上打包一个exe文件供windows使用。详见[此处](https://deno.land/manual@v1.13.2/tools/compiler)。

### 生成文档

**deno doc**后跟一个或多个源文件的列表将打印每个模块导出成员的 JSDoc 文档。  
例如，给定一个add.ts包含以下内容的文件：

```typescript
<code><code><code><code>/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */
export function add(x: number, y: number): number {
  return x + y;
}
```

运行 deno doc命令，将函数的 JSDoc 注释打印到stdout。

使用`--json`标志以 JSON 格式输出文档。这种 JSON 格式由 [deno doc 网站](https://github.com/denoland/doc_website)使用，用于生成模块文档。

## 任务

项目根目录下新建一个deno.json或deno.jsonc文件，内容如下：

```json
{
  "tasks": {
    "dev": "deno run -A main.ts",
  }
}
```

然后就可以使用`deno task dev`来运行命令。

其实就是Node.js的Package.json中script标签的替代品。

## 代码风格

### 格式化

使用`deno fmt`。它会将代码格式化为官方推荐的样子，其实起到的类似`eslint --fix`的效果。

```bash
# format all JS/TS files in the current directory and subdirectories
deno fmt
# format specific files
deno fmt myfile1.ts myfile2.ts
# check if all the JS/TS files in the current directory and subdirectories are formatted
deno fmt --check
# format stdin and write to stdout
cat file.ts | deno fmt -
```

### 代码校验

使用`deno lint`。有了它，就不必再使用`eslint`了。

```bash
# lint all JS/TS files in the current directory and subdirectories
deno lint
# lint specific files
deno lint myfile1.ts myfile2.ts
# print result as JSON
deno lint --json
# read from stdin
cat file.ts | deno lint -
```

### 编码风格指南

参见[官方指南](https://deno.land/manual@v1.13.2/contributing/style_guide)，举几条对我们有用的：

* 使用 TypeScript 而不是 JavaScript
* 在文件名中使用下划线，而不是破折号
* 不要使用文件名index.ts/ index.js。入口文件使用mod.ts/mod.js
* 导出的函数：最多 2 个参数，将其余的放入选项对象中
* <mark>顶级</mark>函数不应使用箭头语法。<mark>顶级</mark>函数应该使用function关键字。箭头语法应该仅限于闭包

## 调试

像Node.js一样，Deno程序也可以在chrome浏览器中调试，具体就不介绍了。  
主要说下vscode中调试。

需要在项目根目录下配置`.vscode/launch.json`文件，内容大概如下：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Deno: Run",
            "request": "launch",
            "type": "pwa-node",
            "program": "src/main.ts", // 具体文件路径
            "cwd": "${workspaceFolder}",
            "runtimeExecutable": "deno",
            "runtimeArgs": [
                "run",
                "--unstable",
                "--inspect",
                "--allow-all"
            ],
            "attachSimplePort": 9229
        }
    ]
}
```

如果你的入口文件有多个，写起来比较麻烦，可以这样：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno",
      "type": "pwa-node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": [
        "run",
        "--inspect-brk",
        "-A",
        "--config",
        "tsconfig.json",
        "--unstable",
        "${file}"
      ],
      "attachSimplePort": 9229
    }
  ]
}
```

详情可以参考[这里](https://deno.land/manual@v1.13.2/vscode_deno#using-the-debugger)。

## 各大主流库替代方案

### Electron

我们知道，现在Electron是个优秀的桌面端解决方案，我们常用的vscode就是用它写的，基于Node.js + Chromium 的 Electron 来依托 Web 技术栈创建桌面应用程序。那么我们可以在 Deno 下使用 Electron 吗？或者还有其它更多选择吗？  
答案是如今的 Electron 还远远不能运行在 Deno 上，我们必须寻找其它的解决方案。自从 Deno 选择用 Rust 语言构建其内核后，我们可以使用 Rust 生态上的 Web View [@Bosop/web-view](https://github.com/Boscop/web-view) 来在 Deno 上运行桌面应用。  
于是 [@eliassjogreen/deno\_webview](https://github.com/eliassjogreen/deno_webview) 应运而生。

```typescript
import { Webview } from "https://deno.land/x/webview/mod.ts";

const html = `
  <html>
  <body>
    <h1>Hello from deno v${Deno.version.deno}</h1>
  </body>
  </html>
`;

const webview = new Webview(
  { url: `data:text/html,${encodeURIComponent(html)}` },
);
await webview.run();
```

### pm2

我们使用`pm2`来守护`Node.js`进程，可以让代码运行在后台。事实上，它也可以运行 `Node.js` 之外的的脚本语言：

```bash
pm2 start --name deno_blog src/main.ts --interpreter='deno' --interpreter-args='run --allow-net --allow-run --allow-env --allow-write --allow-read --importmap import_map.json --unstable'
```

### Express / koa

这俩Node.js祖师爷级别的web框架，在deno里当然少不了，Express不建议使用，推荐用koa的高仿[oak](https://deno.land/x/oak)吧。

```typescript
<code>import { Application } from "https://deno.land/x/oak/mod.ts";
const app = new Application();
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});
await app.listen({ port: 8000 });
```

### nestjs

`nestjs` 是一个用于构建高效、可扩展的Node.js服务器端应用程序的开发框架。它利用 JavaScript 的渐进增强的能力，使用并完全支持 TypeScript（仍然允许开发者使用纯 JavaScript 进行开发），并结合了 OOP （面向对象编程）、FP （函数式编程）和 FRP （函数响应式编程）。从它身上，我们能看到Spring和Angular的影子。

我们可以利用`nestjs`轻松构建一个REST服务，以Controlller的用法为例：

```bash
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

官方目前并没有打算做deno的版本，所以我基于oak实现了一个简版的[`oak_nest`](https://deno.land/x/oak_nest)，包括Controller、安全守卫和各类参数装饰器。感兴趣的同学可以试用，有问题随时可以找我。

### 常用数据库

这里列举俩，其它在[这里](https://deno.land/x)自己搜索。

#### MongoDB

有[deno\_mongo](https://deno.land/x/mongo)，有常用的API。当然，它没有`mongoose`那么丰富，更复杂的功能可能就需要你来自己造轮子了。

#### Redis

有[deno-redis](https://deno.land/x/redis)。

### Nodemon

我们使用`nodemon`来监控Node.js程序，可以自动重启服务，在开发阶段非常方便。  
deno中替代品为[denon](https://deno.land/x/denon)，我们需要维护一个scripts.json，起到Node.js中package.json里script命令的作用。

一个简单的样例体会下：

```yaml
# 使用denon dev启动服务
scripts:
  dev:
    cmd: "deno run example/main.ts"
    desc: "run example main.ts file"
    allow:
      - net
      - env
      - write
    unstable: false
    lock: lock.json
    log: info
    env:
      PORT: "1000"
  build:
    cmd: "deno bundle example/main.ts example/main.js"
    watch: false
```

现在推荐使用上述官网内置的命令deno task。

### 测试工具

在Node.js里，我们有jest、Jasmine等库，而deno可以使用官方测试std库测试：[https://deno.land/std/testing](https://deno.land/std/testing)。

```typescript
import { assertStrictEq } from 'https://deno.land/std/testing/asserts.ts'
Deno.test('My first test', async () => {
  assertStrictEq(true, false)
})
```

运行测试：

```bash
➜  deno test
```

### nvm

我们使用nvm来管理Node.js版本，在Deno中有[dvm](https://deno.land/x/dvm)。

### 在docker中运行

Dockerhub 现已提供 Deno 的官方 Docker 镜像。

* Alpine Linux: denoland/deno:alpine
* Centos: denoland/deno:centos
* Debian: denoland/deno:debian（默认）
* Distroless: denoland/deno:distroless
* Ubuntu: denoland/deno:ubuntu

要在 `Docker` 内部运行 Deno，我们可以创建以下 `Dockerfile`：

```bash
<code>FROM denoland/deno:1.13.2

# The port that your application listens to.
EXPOSE 1993

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["run", "--allow-net", "main.ts"]
```

然后这样使用：

```bash
docker build -t app . && docker run -it -p 1993:1993 app
```

详见[这里](https://github.com/denoland/deno_docker)。

以下是一个我们项目中的样例：

```bash
<code>FROM denoland/deno:alpine-1.30.1

EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
RUN chown -R deno /app
RUN chmod 755 /app

USER deno

COPY . .

ENV DENO_DIR=deno-dir
RUN deno cache --import-map import_map_proxy.json --unstable mod.ts

CMD deno run --allow-net --allow-env --allow-write --allow-read --importmap import_map_proxy.json --unstable mod.ts
```

这里设置了`DENO_DIR`，原因是在前面`CICD`的流水线中，已经缓存了工程的依赖包在`deno-dir`目录下，在这里就不必再下载了。

​

## 总结

本文主要是为了科普Deno，介绍了它的优势与缺点，安装使用与常用Node.js库的替代方案。它相较于Node.js，没有历史包袱，所以可以轻装上阵。

但想要替代Node.js成为前端人员的标配，就不是一年两年可以做到的事情了。除非Deno 真的推出了 Node.js 无法复制的强大功能，那才有可能会改变游戏规则。

Deno现在正在努力做的是兼容Node.js的API，降低后者开发者的迁移难度，这样才有可能将Node.js长达十余年的生态继承过来。

虽然Deno没有达到石破天惊的效果，但仍是个优秀的工具，我看好它。希望大家都有兴趣玩一玩。

​  
参考：

* [20 分钟入门 deno](https://juejin.im/post/5ebcabb2e51d454da74185a9#heading-2)
* [Deno手册【官方】](https://deno.land/manual)
* [从 Node 到 Deno：探索各大主流库替代方案](https://deno-tutorial.js.org/articles/translation/from-node-to-deno.html)
* [了不起的 Deno 入门与实战](https://zhuanlan.zhihu.com/p/141832695)