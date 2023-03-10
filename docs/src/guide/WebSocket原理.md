## 什么是Socket?

在说WebSocket之前，我们先简单了解一下Socket。

### Socket概念

Socket也被称为套接字，socket不是协议，它是支持TCP/IP协议的网络通信的基本操作单元。

它是在程序层面上对传输层协议（可以主要理解为TCP/IP）的接口封装。可以理解为一个能够提供端对端的通信的调用接口（API）。

![](https://pan.udolphin.com/files/image/2022/6/bc3634c6b8f7c5c99ad66d13a101982e.png)

从上图我们可以看到，Socket其实是介于传输层与应用层之间的一个抽象层，为什么要整出这么一个抽象层出来呢？

原因是因为应用层通过传输层进行数据通信时，TCP会遇到同时为多个应用程序进程提供并发服务的问题。多个TCP连接或多个应用程序进程可能需要通过同一个TCP协议端口传输数据。 为了区别不同的应用程序进程和连接，许多计算机操作系统为应用程序与TCP/IP协议交互提供了套接字(Socket)接口。应用层可以和传输层通过Socket接口，区分来自不同应用程序进程或网络连接的通信，实现数据传输的并发服务。

对于程序员来讲，他只需要在某个应用程序的一端（暂且称之为客户端）创建一个Socket实例并且提供它所要连接一端（暂且称之为服务端）的IP地址和端口，而另外一端（服务端）创建另一个Socket并绑定本地端口进行监听，然后客户端进行连接服务端，服务端接受连接之后双方建立了一个端对端的TCP连接，在该连接上就可以双向通讯了，而且一旦建立这个连接之后，通信双方就没有客户端服务端之分了，提供的就是端对端通信了。我们可以采取这种方式构建一个桌面版的im程序，让不同主机上的用户发送消息。从本质上来说，Socket并不是一个新的协议，它只是为了便于程序员进行网络编程而对TCP/IP协议族通信机制的一种封装。

## 为什么要有WebSocket?

我们已经有了HTTP协议，那为什么还需要另一个协议呢？

![](https://pan.udolphin.com/files/image/2022/6/857d928282d282b3e33df563e07b746d.png)

可以看到，HTTP 协议有一个缺陷：通信只能由客户端发起（One-way）。

客户端发起请求，服务端收到请求后进行响应，一次请求就完成了。

HTTP/1.0 每通信一次，都要经历“三步走”的过程：`TCP连接 -> HTTP通信 -> 断开TCP连接`,所以每次请求都是独立的。

HTTP/1.1对请求过程做了优化，TCP连接建立之后，我们可以进行多次HTTP通信，等到一个时间段无HTTP请求发起TCP才会断开连接，这就是HTTP/1.1带来的长连接技术（keep-alive）。

但是即便如此，通信方式依然是客户端发起，服务端响应，这个逻辑不会变。

比如即时聊天，比如消息推送，用户并不会主动发起请求，但是当服务器有了新消息，客户端需要立刻知道并且反馈给用户。

HTTP不支持服务端主动推送，但是这些场景又急需解决方案，于是早期就出现了轮询（polling）。轮询是客户端定时向服务器端发起请求，检测服务端是否有更新，如果有则返回新数据。

### 短轮询

![](https://pan.udolphin.com/files/image/2022/6/bdb8b25969a4d2bbca0e64a562ed980b.png)

短轮询的实现思路就是浏览器端每隔几秒钟向服务器端发送 HTTP 请求，服务端在收到请求后，不论是否有数据更新，都直接进行响应。在服务端响应完成，就会关闭这个 TCP 连接，代码实现也最简单，就是利用 XHR，通过 setInterval定时向后端发送请求，以获取最新的数据。

伪代码：

```
setInterval(() => {
	fetch(url).then(res => {

		//success code

	})
},3000)
```

### 长轮询

![](https://pan.udolphin.com/files/image/2022/6/a8c1fcad85e8a083b5c6d2794f1e544b.png)

长轮询一般是由客户端向服务端发出一个设置较长网络超时时间的 HTTP 请求，并在Http连接超时前，不主动断开连接；待客户端超时或有数据返回后，再次建立一个同样的Http请求，重复以上过程。

例如： 客户端向服务端发起HTTP请求，并且设置了超时时间为30秒；如果30秒内服务端有数据变化，则将数据传递给客户端，并主动断开连接；如果没有数据更新，待客户端超时后会主动断开连接，此后客户端将重新建立一个新的HTTP连接，并重复上述过程。

伪代码：

```
function async(){
	fetch(url).then(res => {
		async();
		//success code
	}).catch(() => {
		//超时
		async();
	})
}
```

所以，无论是短轮询还是长轮询，客户端都需要不断的向服务器发出请求，在消耗较多客户端资源的情况下，服务端并不一定有新的数据下发； 其次，HTTP协议请求与回复消息中，需包含较长的头部信息，其中真正有效的数据有可能只占较小的一部分，带来较多的带宽资源消耗。 另外，若服务端在同一时间存在连续频繁的数据变化（例如：聊天室场景中），客户端获知数据更新相对较慢（可能存在时间的滞后性）无法保证客户端的用户体验。

轮询的效率低，非常浪费资源。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。

## 什么是WebSocket?

### 简单介绍

WebSocket是html5规范中的一个部分，它借鉴了socket这种思想，为web应用程序客户端和服务端之间（注意是客户端服务端）提供了一种全双工通信机制。同时，它又是一种新的持久化的网络通信协议。

### 连接方式

```
## 普通连接
ws://localhost:80/test

## 安全连接
wss://localhost:80/test
```

### 特点

* 建立在 TCP 协议之上，服务器端的实现比较容易。
* 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
* 数据格式比较轻量，性能开销小，通信高效。
* 可以发送文本，也可以发送二进制数据。 没有同源限制，客户端可以与任意服务器通信。
* 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

### 优点

在上面简单的介绍WebSocket之后，想必大家也都可以总结出一些WebSocket的优点，下面相较于HTTP再做进一步的总结。

* **较少的控制开销**：在连接创建后，服务器和客户端之间交换数据时，用于协议控制的数据包头部相对较小。在不包含扩展的情况下，对于服务器到客户端的内容，此头部大小只有2至10字节（和数据包长度有关）；对于客户端到服务器的内容，此头部还需要加上额外的4字节的掩码。**相对于HTTP请求每次都要携带完整的头部，此项开销显著减少了。**
* **更强的实时性**：由于协议是全双工的，所以服务器可以随时主动给客户端下发数据。**相对于HTTP请求需要等待客户端发起请求服务端才能响应，延迟明显更少**
* **保持连接状态**：Websocket需要先创建连接，这就使得其成为一种有状态的协议，之后通信时可以省略部分状态信息。**而HTTP请求可能需要在每个请求都携带状态信息（如身份认证等）。**
* **更好的二进制支持**：Websocket定义了二进制帧，**相对HTTP，可以更轻松地处理二进制内容**。

## WebSocket协议的原理

![](https://pan.udolphin.com/files/image/2022/6/b662f381eeb3fb940649e8e0956e168e.png)

与HTTP协议一样，WebSocket协议也需要通过已建立的TCP连接来传输数据，具体实现上是通过HTTP协议建立通道，然后在此基础上用真正的WebSocket协议进行通信，所以WebSocket协议和HTTP协议是有一定的交叉关系的。

### 客户端：升级协议

首先，客户端发起协议升级请求，从下图可以看到，采用的是标准的HTTP报文格式，且只支持 `GET`方法。

![](https://pan.udolphin.com/files/image/2022/6/3be820deb2aa1108d3a3f023825deb66.png)

重点说明一下上面四处的意义：

* `Connection：Upgrade`：表示要升级协议。
* `Upgrade：WebSocket`：表示要升级到WebSocket协议。
* `Sec-WebSocket-Key`：是一个 Base64 encode 的值，这个是浏览器随机生成的，与后面服务器端响应首部的`Sec-WebSocket-Accept`是配套的，提供基本的防护，比如恶意的链接，或者无意的连接。
* `Sec-WebSocket-Version: 13`：表示WebSocket的版本。如果服务器不支持该版本，需要返回一个`Sec-WebSocket-Version`的`header`，里面包含服务端支持的版本号。

**注意**，上面请求省略了部分非重点请求首部。由于是标准的HTTP请求，类似Host、Origin、Cookie等请求首部会照常发送。在握手阶段，可以通过相关请求首部进行 安全限制、权限校验等。

### 服务端：响应协议升级

服务端返回内容如下，状态码`101`表示协议切换。到此完成协议升级，后序的数据交互都按照新的协议进行。

![](https://pan.udolphin.com/files/image/2022/6/3ec3daff8c99194e4bea2656ddbc7a6f.png)

这里开始就是HTTP最后负责的区域了，告诉客户端，我已经成功切换协议了。然后， Sec-WebSocket-Accept 这个则是经过服务器确认，并且加密过后的 Sec-WebSocket-Key。至此，HTTP已经完成它所有工作了，接下来就是完全按照WebSocket协议进行了。

### Sec-WebSocket-Accept 值计算

Sec-WebSocket-Accept根据客户端请求首部的Sec-WebSocket-Key计算出来。 计算公式为：

1. 将Sec-WebSocket-Key跟258EAFA5-E914-47DA-95CA-C5AB0DC85B11拼接。
2. 通过SHA1计算出摘要，并转成base64字符串。

验证：这里我们使用node的内置包crypto

![](https://pan.udolphin.com/files/image/2022/6/71b4ae5df93e0b99e3c9734d372f9822.png)

可以看到，控制台输出的内容，和上一节截图里的Sec-WebSocket-Accept值一致。

### 小节

1. 首先，客户端发起HTTP请求，经过三次握手后，建立tcp连接，HTTP请求里存放WebSocket支持的版本号等信息，如：Upgrade、Connection、WebSocket-Version等；
2. 然后，服务器收到客户端的握手请求后，同样采用HTTP协议回馈数据；
3. 最后，客户端收到连接成功的消息后，开始借助于TCP传输信道进行全双工通信。

## 数据传输

一旦WebSocket客户端、服务端建立连接后，后续的操作都是基于**数据帧**的传递。

### 数据帧格式

WebSocket客户端、服务端通信的最小单位是帧（frame），由1个或多个帧组成一条完整的消息（message）。

* **发送端**：将消息切割成多个帧，并发送给服务端；
* **接收端**：接收消息帧，并将关联的帧重新组装成完整的消息；

**1、数据帧格式概览**

下面给出了WebSocket数据帧的统一格式。

从左到右，单位是比特。比如`FIN、RSV1`各占据1比特，`opcode`占据4比特。 内容包括了标识、操作代码、掩码、数据、数据长度等。

![](https://pan.udolphin.com/files/image/2022/8/f20f0db80d57894228107102b8085d19.png)

每一列代表一个字节，一个字节8位，每一位又代表一个二进制数。

**fin****：** 标识这一帧数据是否是该分块的最后一帧。

* 1 为最后一帧
* 0 不是最后一帧。需要分为多个帧传输

**RSV1, RSV2, RSV3**：各占1个比特。

一般情况下全为0。当客户端、服务端协商采用WebSocket扩展时，这三个标志位可以非0，且值的含义由扩展进行定义。如果出现非零的值，且并没有采用WebSocket扩展，连接出错。

**Opcode**: 4个比特。

操作代码，Opcode的值决定了应该如何解析后续的数据载荷（data payload）。如果操作代码是不认识的，那么接收端应该断开连接（fail the connection）。可选的操作代码如下：

* %x0：表示一个延续帧。当Opcode为0时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片。
* %x1：表示这是一个文本帧（frame）
* %x2：表示这是一个二进制帧（frame）
* %x3-7：保留的操作代码，用于后续定义的非控制帧。
* %x8：表示连接断开。
* %x9：表示这是一个ping操作。
* %xA：表示这是一个pong操作。
* %xB-F：保留的操作代码，用于后续定义的控制帧。

**Mask**: 1个比特。  
表示是否要对数据载荷进行掩码操作。从客户端向服务端发送数据时，需要对数据进行掩码操作；从服务端向客户端发送数据时，不需要对数据进行掩码操作。

如果服务端接收到的数据没有进行过掩码操作，服务端需要断开连接。

如果Mask是1，那么在Masking-key中会定义一个掩码键（masking key），并用这个掩码键来对数据载荷进行反掩码。所有客户端发送到服务端的数据帧，Mask都是1。

**Payload length**：数据载荷的长度，单位是字节。为7位，或7+16位，或7+64位。  
假设数Payload length === x，如果

* x为0~126：数据的长度为x字节。
* x为126：后续2个字节代表一个16位的无符号整数，该无符号整数的值为数据的长度。
* x为127：后续8个字节代表一个64位的无符号整数（最高位为0），该无符号整数的值为数据的长度。

此外，如果payload length占用了多个字节的话，payload length的二进制表达采用网络序（big endian，重要的位在前）。

**Masking-key**：0或4字节（32位）

所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask为1，且携带了4字节的Masking-key。如果Mask为0，则没有Masking-key。

备注：载荷数据的长度，不包括masking key的长度。

**Payload data**：(x+y) 字节

载荷数据：包括了扩展数据、应用数据。其中，扩展数据x字节，应用数据y字节。

扩展数据：如果没有协商使用扩展的话，扩展数据数据为0字节。所有的扩展都必须声明扩展数据的长度，或者可以如何计算出扩展数据的长度。此外，扩展如何使用必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内。

应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度 减去 扩展数据长度，就得到应用数据的长度。

### 动手算一下

![](https://pan.udolphin.com/files/image/2022/6/93c673adf90700a03133f7888b2d44fc.png)

* fin为 1
* srv1 srv2 srv3 都为0
* opcode为0001，0x1表示一个Text frame
* payload len为0000100，0x4表示长度为4字节
* mask为1
* masking-key是 00111010 10100110 10101101 11100100
* payload是 01010001 11010011 11010111 10000001

## 数据分片

WebSocket的每条消息可能被切分成多个数据帧。当WebSocket的接收方收到一个数据帧时，会根据FIN的值来判断，是否已经收到消息的最后一个数据帧。 FIN=1表示当前数据帧为消息的最后一个数据帧，此时接收方已经收到完整的消息，可以对消息进行处理。FIN=0，则接收方还需要继续监听接收其余的数据帧。 此外，opcode在数据交换的场景下，表示的是数据的类型。0x01表示文本，0x02表示二进制。而0x00比较特殊，表示延续帧（continuation frame），顾名思义，就是完整消息对应的数据帧还没接收完。

我们来通过下面一张图简单演示一下数据分片

![](https://pan.udolphin.com/files/image/2022/6/06f3a27b0ddbdf432d222706740618f9.png)

第一条消息

FIN=1, 表示是当前消息的最后一个数据帧。服务端收到当前数据帧后，可以处理消息。opcode=0x1，表示客户端发送的是文本类型。

第二条消息

FIN=0，opcode=0x1，表示发送的是文本类型，且消息还没发送完成，还有后续的数据帧。

FIN=0，opcode=0x0，表示消息还没发送完成，还有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。

FIN=1，opcode=0x0，表示消息已经发送完成，没有后续的数据帧，当前的数据帧需要接在上一条数据帧之后。服务端可以将关联的数据帧组装成完整的消息。

## WebSocket Api使用

WebSocket的api使用也是非常简单，就不当搬运工了。主要会用到一下api：

```
var wsUri = " ws://echo.websocket.org/";
websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) { onOpen(evt) };
websocket.onmessage = function(evt) { onMessage(evt) };
websocket.onclose = function(evt) { onClose(evt) };
websocket.onerror = function(evt) { onError(evt) };

var message = "Cutting Edge test: " +
 new Date().toString();
websocket.send(message);
```

这里只简单放出一个自己写的小demo，详细还请移步MDN：[https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)查看。

首先，利用node的websocket包，创建一个用于websocket的server端。

```
//代码如下：
const websocket = require("websocket").server;
const http = require("http");

//因为 websocket 是一个实时通信的，服务器与客户端之间的通信是有来有回的，
//需要将这些通信的数据进行存储。
const conArr = [];

const httpServer = http.createServer().listen(8080, () => {
  console.log("hello: ", "http://localhost:8080");
});

const websocketServer = new websocket({
  httpServer: httpServer,
  autoAcceptConnections: false,
});

websocketServer.on("request", function (request) {
  // 这就是一次客户端发送的消息
  // websocket 需要将这个链接保存起来
  // 只要客户端和服务器没有断开，这个链接必须在
  // 客户端与服务端的通信都是从这个链接上通信
  const connection = request.accept();

  // 每次接收一个链接，将它存放在数组里面
  conArr.push(connection);

  // 监听客户端发送的消息
  connection.on("message", function (message) {
    console.log(message);
    // 发送消息给客户端（广播到各个客户端）
    // 后面加上 utf8Data 编码
    // 要将所有的链接全部发出去，才可以让每个客户端接收到其他传来的数据
    for (let i = 0; i < conArr.length; i++) {
      conArr[i].send(message.utf8Data);
    }
  });
});
```

然后在client端，通过new WebSockek一个实例，然后使用onopen获取当前链接的状态，onmessage接收服务器返回的消息，send向服务器发送消息。

```
//代码如下：
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 需要一进来如浏览器就要建立链接 -->
    <!-- 点击按钮发送消息给服务器 -->
    输入姓名：<input type="text" id="uName">
    <br>
    输入消息：<input type="text" id="context">

    <button id="btn"> 点击发送消息 </button>

    <div id="charRoom"></div>
</body>
<script>
    // 用户名
    const uName = document.getElementById('uName')
    // 文本框内容
    const context = document.getElementById('context')
    // 点击按钮
    const btn = document.getElementById('btn')
    // 要显示聊天室的区域
    const charRoom = document.getElementById('charRoom')


    // 实例化 websocket
    // 必须加 'ws://localhost:8080' ws 协议，后面是开启的服务端接口
    const websocket = new WebSocket('ws://localhost:8080')
    // 打开事件
    websocket.onopen = function () {
        // 获取当前链接的状态
        // 1 是建立了链接
        console.log(websocket.readyState);
    }

    // 点击发送消息的事件
    btn.onclick = function () {
        // 将用户名和要发送的内容放在一个对象中，一起传送给后端
        const values = {
            uName: uName.value,
            context: context.value
        }

        // 清空文本框的内容
        uName.value = ''
        context.value = ''

        // 通过 websockte 发送消息
        websocket.send(JSON.stringify(values))
    }

    // 接收服务器返回的消息
    websocket.onmessage = function (data) {
        // 服务器返回过来的聊天信息
        const chatS = JSON.parse(data.data)

        // 添加到页面上
        charRoom.innerHTML += `
        <strong>${chatS.uName}：</strong>
        <span>${chatS.context}</span>
        <br />
        `
    }
</script>
</html>
```

最后附一张效果图

![](https://pan.udolphin.com/files/image/2022/6/838aa055e6967c572416a74cfa051fae.gif)

## 总结

本文主要介绍了WebSocket的特点、原理、数据传输，并且对比了一下与传统轮询相比具有的优势。其实WebSocket还有很多的话题可以探讨，例如：webSocket扩展，心跳检测，数据加密，身份认证等等。感兴趣的小伙伴可以和我一起探究探究。