# **为什么要做性能优化？**

看下Google在开发者文档[《为什么速度如此重要》](https://links.jianshu.com/go?to=https%3A%2F%2Fweb.dev%2Fwhy-speed-matters%2F)怎么说的。

## **用户留存**

性能在任何在线企业的成功中都起着至关重要的作用。高性能网站比低性能网站更能吸引和留住用户。

Pinterest 将感知等待时间减少了 40%，这将搜索引擎流量和注册量增加了 15% 。

COOK 将页面平均加载时间减少了 850 毫秒，从而将转化次数提高了 7%，将跳出率降低了 7%，并将每个会话的页面增加了 10% 。

研究还表明，性能不佳会对业务目标产生负面影响。例如， BBC 发现他们的网站加载时间每增加一秒，他们就会失去 10% 的用户。

![](https://pan.udolphin.com/files/image/2022/3/73b7899cd523bbd403a0c67a5af129e5.png)

## **提高转化率**

留住用户对于提高转化率至关重要。慢速网站对收入有负面影响，而快速网站显示可以提高转化率。

## **用户体验**

在用户体验方面，速度至关重要。一项消费者研究表明，对移动速度延迟的压力反应类似于看恐怖电影或解决数学问题，而且比在零售店结账时排队等候的压力更大。

当网站开始加载时，用户需要等待一定的时间出现内容。在此之前，没有用户体验可言。这种缺乏体验在快速连接上是短暂的。然而，在较慢的连接上，用户被迫等待。随着页面资源慢慢载入，用户可能会遇到更多问题。

## **以人为本**

至少自 2011 年以来，总页面大小一直在稳步增加，而且这种趋势似乎还在继续。高性能意味着节省公司、客户的流量与资金。

如果医院、诊所和危机中心等公共资源拥有在线资源，可为用户提供他们在危机期间所需的重要和具体信息。

# **影响性能的因素**

我们先从web服务本身看，一是客户端，二是服务端。

## **客户端**

对于客户端，用户使用不同的浏览器、不同的版本，可能对性能有不同程度的影响。抛开IE不谈，绝大多数情况下现代浏览器一般网页的性能差距不大。

而用户网络方面，相较于10年前的3G网络或者4M宽带，到现在4/5G或者百M甚至千M宽带的普及，好了太多了。随着网络技术的发展，10年后可能我们现在做的所有网络层面的优化都将失去意义，但现阶段，我们还是需要为客户节省点儿流量。

## **服务端**

我们就是服务方，也就是乙方。

硬件层面，我们的服务也要受网卡、带宽及至运营商的限制。所在服务器的CPU、内存、磁盘、操作系统以及我们程序的开发语言、框架、软件选择，任何一个环节，都可能对服务性能产生影响。

当然，这些多数是运营团队的职责。我们要做的，就是把自己力所能及的一摊子做到最好。

## **性能指标**

我们性能优化的核心是让我们的网页有更快的加载速度。怎么衡量快呢？每个人的感觉可能不太一样。

一般来说，有以下指标，这些名词在[https://web.dev/](https://web.dev/)都有解释。

|||
|---|---|
|FP（First Paint）首次绘制，也就是白屏时间|标记浏览器渲染任何在视觉上不同于导航前屏幕内容之内容的时间点。一般来说，如果给body设置非默认背景色，它可能会比FCP要早。|
|FCP（First Contentful Paint）首次内容绘制，也就是首屏时间|标记浏览器渲染来自 DOM 第一位内容的时间点，该内容可能是文本、图像、SVG 甚至元素。|
|LCP（Largest Contentful Paint）最大内容渲染|显示最⼤内容元素所需时间 (衡量⽹站初次载⼊速度)。|
|DCL（DOMContentLoaded Event）|当 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载。|
|L (onLoad)|当依赖的资源，全部加载完毕之后才会触发|
|FPS（Frames Per Second）|表示每秒传输帧数，是速度单位，用来分析动画的一个主要性能指标。3D开发比较关注此项指标。|
|[FID（First input delay ）首次输入延迟](https://web.dev/fid/)|测量从用户第一次与网站交互直到浏览器实际能够对交互做出响应所经过的时间。良好的用户体验，最好控制在100 毫秒或以内。|
|TTI（Time to Interactive ）可交互时间|测量页面从开始加载到视觉上完成渲染、初始脚本（如果有的话）完成加载，并能够快速、可靠地响应用户输入所需的时间。|
|TBT（Total blocking time） 总阻塞时间|测量 FCP 与 TTI 之间的总时间，这期间，主线程被阻塞的时间过长，无法作出输入响应。|
|[CLS (Cumulative Layout Shift) 累积布局偏移](https://web.dev/cls/)|测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数，主要在量化用户经历意外布局偏移的频率。|

## **查看指标**

最简单的办法，使用chrome的开发工具，打开F12。

### **lighthouse**

![](https://pan.udolphin.com/files/image/2022/3/010e94aa90e00a63b4568a0ab79b3fbc.png)

点击生成报告：

![](https://pan.udolphin.com/files/image/2022/3/6a7531a219e2c9b4362a81e4162cf3aa.png)

就能看到当前网站的得分，以及chrome提出的优化建议。

### **performance**

还是控制台，找到performance，也可以生成记录。

![](https://pan.udolphin.com/files/image/2022/3/4f17548552836d74300c58a2dfe67b49.png)

如果要从头开始，就点击reload按钮：

![](https://pan.udolphin.com/files/image/2022/3/a48bfa549bae011b62d6e2e0ab1909b4.png)

这些指标就会出现在这里，下面还有各种系统堆栈调用、图层绘制等，是深度优化网站性能的必备良药。

### **web-vitals**

Google 于 2020 年 5 年 5 ⽇提出了新的使⽤者体验量化⽅式，推出 Web Vitals 是简化大家学习的曲线，只要关注 Web Vitals 指标表现即可。

它有个[chrome插件](https://gitcode.net/mirrors/GoogleChrome/web-vitals-extension?utm_source=csdn_github_accelerator)，可以自行下载（也有[github地址](https://github.com/GoogleChrome/web-vitals-extension)）安装，效果如下：

![](https://pan.udolphin.com/files/image/2022/3/de13b8c17b3a21c66b0d8d8f09c08dd8.png)

也可以使用这个[js库](https://www.npmjs.com/package/web-vitals)，可以得到这几个常用的指标。比如：

```
import {getFID} from 'web-vitals';

// 当 FID 可用时立即进行测量和记录。

getFID(console.log);
```

如果不用这个库，就需要你自己根据指标的规则，自己计算了。当然，浏览器的performance这个全局变量中也记录了一些性能信息，具体就不赘述了。

![](https://pan.udolphin.com/files/image/2022/3/643effe714b764df7e429095f079ae96.png)

# **性能优化方案**

上面提到指标那么多，我们这次只考虑常用的白屏（FP）、首屏（FCL）、DCL（DOMContentLoaded Event）和LCP（Largest Contentful Paint）四个指标。

我们先从一个简单的例子来看下这几个指标。

## **最纯正的html页面**

我们看一个最原始纯正的hello world页面，没有js、css、图片这些现代网页常客。

```
<!DOCTYPE html>

<html>

<head>

<meta charset="utf-8">

</head>

<body>

<h1>hello world</h1>

</body>

</html>
```

用本地启动一个服务，比如[http://localhost:1000/](http://localhost:1000/)，打开页面后，再在chrome的performance运行分析，能看到FP、FCP、LCP都在同一时间，DCL和L依次紧随其后，与你预想的是不是一致？

![](https://pan.udolphin.com/files/image/2022/3/5730167ea105b3514e3137052321c50e.png)

可能你还是不太明白FP、FCP、LCP的区别，没关系，先搁置下来，后面会有个明显的例子。

我们试图分析下，就这样一个原始的页面，有什么值得我们优化的点呢？分析清楚了它，世间再复杂的页面也是万变不离其宗。

![](https://pan.udolphin.com/files/image/2022/3/d8e5210aa351a0555fa1bda2ec50061e.png)

这么普通的页面，可能还能优化的是不是只有网络了呢？因为客户即使用IE6和window98，也可以很好地展现出来。而服务器如果不考虑高并发，应该都能满足需求。

### **CDN**

我们的服务是在本地，还是在目前战火连天的乌克兰，你看到的响应时间是不是会有差别？

![](https://pan.udolphin.com/files/image/2022/3/4476cb2b4660bd10f1dcc117ae0acc05.png)

在chrome的网络面板里，找到Timing（时序）选项卡，能看到以下信息，被称为**时序故障阶段**，以下是名词解释：

* **排队（Queueing）**。浏览器在以下情况下将请求排队：
  * 有更高优先级的请求。
  * 已经为此源打开了六个 TCP 连接，这是限制。仅适用于 HTTP/1.0 和 HTTP/1.1。
  * 浏览器在磁盘缓存中短暂分配空间
* **停滞不前（Stalled）**。请求可能因**排队**中描述的任何原因而停止。
* **DNS 查找**。浏览器正在解析请求的 IP 地址。
* **初始连接（Initial connection）**。浏览器正在建立连接，包括 TCP 握手/重试和协商 SSL。
* **代理协商（Proxy negotiation）**。[浏览器正在与代理服务器](https://en.wikipedia.org/wiki/Proxy_server)协商请求。
* **请求发送（Request sent）**。正在发送请求。
* **服务工作者准备（ServiceWorker Preparation）**。浏览器正在启动 service worker。
* **对 ServiceWorker 的请求（Request to ServiceWorker）**。请求正在发送给服务人员。
* **等待（TTFB）**。浏览器正在等待响应的第一个字节。TTFB（Time To First Byte） 代表第一个字节的时间。此时间包括 1 次往返延迟和服务器准备响应所用的时间。
* **内容下载（Content Download）**。浏览器直接从网络或服务工作者接收响应。该值是读取响应正文所花费的总时间。大于预期值可能表示网络速度较慢，或者浏览器正忙于执行其他工作，这会延迟读取响应。
* **接收推送（Receiving Push）**。浏览器正在通过 HTTP/2 服务器推送接收此响应的数据。
* **阅读推送（Reading Push）**。浏览器正在读取之前收到的本地数据。

如果你的网站是https协议，应该能看到SSL。下图是个例子：

![](https://pan.udolphin.com/files/image/2022/3/66e3f425955241f5dc17fbb62ad845f9.png)

从图中可以看出来，DNS询址、初始连接（TCP三次握手、SSL校验）都可能会有耗时，更别说整个阶段都可能发生的丢包、重发。

这种情况，应该怎么优化？

答案是分布式部署。你可以在中国搭上服务器啊，中国用户就访问中国的服务器。那我们搞个网站，岂不是得全世界各个国家买服务器？当然不用。这种事儿早有人帮你干了，可能你已经猜到，所以我们的第一个关键词出来了：**CDN**。

CDN（Content Delivery Network）是指内容分发网络，也称为内容传送网络。由于CDN是为加快网络访问速度而被优化的网络覆盖层，因此被形象地称为“网络加速器”。

你可以简单理解，你人在北京，访问的就是北京的服务器节点，人在成都，访问的就是成都的服务器节点。

CDN最适合部署静态资源，最大限度地减少了互联网因为地域、运营商的差异而带来的网络损耗。

它还有额外的优点，你自己的服务可能得考虑下同时十万个用户访问会不会崩，用它就不用担心了，不用考虑负载均衡，不用考虑高可用，专业的人干专业的事。

![](https://pan.udolphin.com/files/image/2022/3/316dadf1e34be81329e48d1f9c06c1bb.png)

### **压缩**

抛开上面的CDN，我们接着试想下这种情况。如果页面不是只有hello world，而是一篇博客，万字大章。可以想象**内容下载时间**肯定要比现在的大。

我们修改下html的代码，为方便测试，使用deno启动一个服务，将hello world循环上10万次：

```
import { Application, Router } from "https://deno.land/x/oak@v10.4.0/mod.ts";
function getHtml(str: string) {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Understanding the Critical Rendering Path</title>
  </head>
  <body>
      <h1>${str}</h1>
  </body>
  
  </html>`;
}

const router = new Router();
router
  .get("/", (context) => {
    console.log("GET /");
    const str = new Array(100000).fill("Hello World").join("\n");
    const html = getHtml(str);
    context.response.body = html;
    context.response.headers.set("Content-Type", "text/html");
  });
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({
  port: 1000,
});
```

在网络里修改为Fast 3G，来模拟慢速网络。

![](https://pan.udolphin.com/files/image/2022/3/315bb927fc225b5c5191e402bccb02da.png)

刷新页面，能看到传输的Size大小变成了1.2M，耗时变成7.24s。

![](https://pan.udolphin.com/files/image/2022/3/e990e091e2a7767a22011027bf922ee7.png)

再看Content download果然变的很长。

![](https://pan.udolphin.com/files/image/2022/3/9f070c532ed8427995b98af7bffbb125.png)

怎么解决这个问题呢？

很容易就联想出来，体积大了，就让它变小。

所以我们的每二个关键词，就是**压缩**。

压缩通常有两种方式，一种是代码层面，将不影响功能的空格、换行、注释、引号等去除，达到减小体积的目的。这种压缩已经成为现代前端工程的标配，代码经webpack打包构建出来基本上都做了这步操作，可以称为代码丑化。无论是html，还是js，还是css，都可以做到这点。

另一种是网络层面。核心思想是浏览器支持某种压缩算法，如果你的资源以这种算法压缩出来，并响应对应的标头（header），那么浏览器在接收到内容后，就可以进行解压，还原成原本的页面。

还是打开网络窗口，看Request headers中的Accep-Encoding的请求头，显示的是**gzip，deflate，br**。这是chrome支持的三种压缩算法。

![](https://pan.udolphin.com/files/image/2022/3/ef06e15e253d4304e80c1808959dfc68.png)

#### **gzip**

如果你对web性能优化不陌生，可能听说过gzip，甚至在生产中使用过，比如在nginx中很容易就开启了这一项配置。

下面我们修改刚才的代码来看下gzip的效果。

```
import { gzip } from "https://deno.land/x/denoflate@1.2.1/mod.ts";

router
  .get("/gzip", (context) => {
    const str = new Array(100000).fill("Hello World").join("\n");
    const html = getHtml(str);
    const u8 = new TextEncoder().encode(html);
    const gz = gzip(u8, 9);
    context.response.body = gz;
    context.response.headers.set("Content-Encoding", "gzip");
    context.response.headers.set("Content-Type", "text/html");
  })
```

*gzip(u8, 9)*的第二个参数，是压缩比例，越大则压缩效果越好，但越耗CPU。一般是1-9的数，这里选个最大的。

刷新页面，还是刚才的Fast 3G，看网络：

![](https://pan.udolphin.com/files/image/2022/3/86d7e59be83bf30ddc239ed82d073a43.png)

从Size中可以看出，上面是传输的大小，变成了2.6kB，内容下载时间（Time上下相减）也变成11ms。

![](https://pan.udolphin.com/files/image/2022/3/fa35c9782e6b07b44fa5e3ef13e5a93b.png)

效果是不是很明显？所以gzip也基本上变成静态服务的必备。

当然，我们这么大的压缩率，是因为我的例子里是把hello world重复了一万次，如果是随机的字符串，就没这么大的差异了。而且文件太小时，压缩可能还不如不压，所以一般需要设置合适的阀值。

注意：使用webpack打包时，推荐使用对应的插件，直接生成.gz后缀的静态资源文件，这样nginx之类服务器开启gzip后，就不必再动态进行压缩了，能节省部分服务器的CPU运算。勤俭节约是美德。

#### **br**

br的全称是**Brotli**，是一种新的开源压缩算法。虽然Google于2015年9月就宣布了这个算法，但直到最近这两年大多数浏览器才采用它。 HTTP服务器Apache和nginx现在提供Brotli压缩作为选项。

与优良的gzip相比，Brotli将数据压缩了20％到25％，它通过使用词典来实现这一卓越的成就。

我们再来感受下：

```
import { compress } from "https://deno.land/x/brotli@v0.1.4/mod.ts";

router.get("/", (context) => {
    const str = new Array(100000).fill("Hello World").join("\n");
    const html = getHtml(str);
    const u8 = new TextEncoder().encode(html);
    context.response.body = compress(u8);
    context.response.headers.set("Content-Encoding", "br");
    context.response.headers.set("Content-Type", "text/html");
  });
```

再看网络，传输字节变成了311B，比上面的2.6kB要小不少。

![](https://pan.udolphin.com/files/image/2022/3/df0d866b3bfadc12dab3b0986c0efae4.png)

下载时间也小了点儿：

![](https://pan.udolphin.com/files/image/2022/3/53ae42df679478e6b010647d91d0e3aa.png)

所以，推荐br来代替gzip。

### **缓存**

再试想这样一个场景，假设你的网页万年不变，那是不是用户除首次外，接下来的每一次对你服务器的访问都是浪费呢？

针对这种情况，相信你也很容易想出解决方案，也就是我们下一个关键词——**缓存**。

#### **强缓存**

你可以告诉浏览器，我这个资源是不变的，给我缓存一年，于是接下的一年里，用户每次访问你的页面，浏览器都直接从缓存里取出来，又快又好，用户看到页面这么快响应，高兴，你的服务器看到访问自己的压力没那么大，有更充裕的时间做其它事，也高兴。

这种情况，我们称之为**强缓存**。

只需要在响应的header里返回Cache-Control:max-age或Expires这两个字段就可以。前者是现在推荐的设置，http1.1中出现，单位是秒，而后者是http1.0的规范，如果二者同时出现，以前者为准。

我在本地给html设置，刷新页面，在chrome网络中看没起到作用，但加到js中是可以的，效果如下：

![](https://pan.udolphin.com/files/image/2022/3/4744e8aba32582824c5cb6489f0e51df.png)

难道对html不生效？

非也。

其实是浏览器判断用户的意图，一般人什么时候会点击刷新按钮页面呢？肯定是页面有bug或者响应的有问题了啊，浏览器就想是不是缓存引发的，于是点击刷新按钮和F5会禁掉强缓存。

要测试这个也容易，要么使用抓包工具，要么看服务端打印：

```
const router = new Router();
router.get("/", (context) => {
    console.log("GET /");
    const str = new Array(100000).fill("Hello World").join("\n");
    const html = getHtml(str);
    context.response.body = html;
    context.response.headers.set("Content-Type", "text/html");
    context.response.headers.set("Cache-Control", "max-age=3000");
  })
```

使用F5或点击刷新按钮，会打印第3行代码，而新开一个页面，不会打印，说明走的是强缓存。

#### **协商缓存**

大多数情况下，Html修改的概率相比于图片之类还是要大的。如果你更新了版本上线，那么让用户请求到旧的网页那就不符合预期了。

这时，也有解决方案，那就是**协商缓存**。

我们讲开发时写代码要语义化，你看这些专业的名词定义是不是也是如此？让你从名字上就能想到大概意思。

通俗的讲，就是每次资源请求仍是到服务器，只是服务器在响应时判断要不要把响应的内容返回给浏览器，为什么呢？因为浏览器已经有相应的缓存，我只需要告诉浏览器用缓存就可以了，这样节省的就是内容下载阶段。

具体实现也很简单，首次资源访问后，浏览器会返回一个响应头（通常是**etag**，还有一个是Last-Modified，是前者出现前的方案，可以思考下为什么现在成了备胎），并将上面提到的Cache-Control设置为**no-cache**，从名字看不太语义化（应该是有历史原因，没有查），但它确实表示是协商缓存。而如果一项资源彻底不让浏览器缓存，必须实时从服务器读取最新的，那需要把它设置为**no-store**。

![](https://pan.udolphin.com/files/image/2022/3/e7ce34da8ce4944f07af621a8a852747.png)

在下次请求时，浏览器会把这个etag的内容放到请求头的**If-None-Match**字段中，服务器根据它来判断有没有变更，没有的话就返回状态码304。

![](https://pan.udolphin.com/files/image/2022/3/30386f0c465356c72e69ee8155bdd461.png)

代码实现如下：

```
import {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v10.4.0/mod.ts";
import {
  calculate,
  ifNoneMatch,
} from "https://deno.land/x/oak@v10.4.0/etag.ts";
export async function checkEtag(context: Context, val: any) {
  if (!val) {
    context.response.body = val;
    return val;
  }
  const etag = context.request.headers.get("If-None-Match");
  const str = (typeof val === "string" || val instanceof Uint8Array)
    ? val
    : JSON.stringify(val);
  const etagOptions = { weak: true };
  const actual = await calculate(str, etagOptions);
  context.response.headers.set("etag", actual);
  if (!context.response.headers.has("Cache-Control")) {
    context.response.headers.set("Cache-Control", "no-cache");
  }
  if (
    etag && !await ifNoneMatch(etag, str, etagOptions) // if etag is not match, then will return 200
  ) {
    context.response.status = 304;
    context.response.body = undefined;
  } else {
    context.response.body = val;
  }
  return val;
}
const router = new Router();
router
  .get("/", (context) => {
    const str = new Array(100000).fill("Hello World").join("\n");
    const html = getHtml(str);
    await checkEtag(context, html);
    context.response.headers.set("Content-Type", "text/html");
  })
```

从图中可以看出来状态码变了，response headers中也没有了content-length字段。

![](https://pan.udolphin.com/files/image/2022/3/721fb9da9fa13aa035526a1060a465bf.png)

在网络中也能看出这两次size的区别：

![](https://pan.udolphin.com/files/image/2022/3/b1e65a7fb6b35cdcc0310586a2e93117.png)

注意测试此项时应该禁用Disable cache这一项。

![](https://pan.udolphin.com/files/image/2022/3/a0301f5d888a22fa3756c6c4a2e552e1.png)

### **ServiceWorker**

现代浏览器除了强缓存和协商缓存外，还额外提供了一些API可以让你订制控制缓存。

我们熟知的浏览器的存储有哪些呢？最早的cookie，到后面的localStorage、sessionStorage，再到浏览器的数据库indexedDB。直接用它们可以实现对缓存的部分控制，但你没办法拦截网络的加载，比如页面都还没加载，你的代码都没工作，怎么拦截这个js或图片说不再加载了？

而ServiceWorker（简称sw），就是应运而生的一个高级缓存控制器。

一句话描述的话，它就是浏览器提供的代理。网页的所有网络请求，都经它中转（这角色像不像曹公公？）。

![](https://pan.udolphin.com/files/image/2022/3/4ee2f439711c5c8d8cc08f1d9a4abf32.png)

它是基于web worker的，可以访问cache和indexedDB。

sw 是基于 HTTPS 的，因为Service Worker中涉及到请求拦截，所以必须使用HTTPS协议来保障安全。如果是本地调试的话，localhost是可以的。

一般来说，它可以有效提升用户的弱网体验，移动端网页用的多些。

使用上也简单，只是维护起来并不容易，一般需要框架或第三方库来管理。

首先在Html页面加入代码：

```
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
   	navigator.serviceWorker.register('./serviceWorker.js', { scope: './6.html' })
      .then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
      .catch(function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
```

这是serviceWorker.js：

```
/* 监听安装事件，install 事件一般是被用来设置你的浏览器的离线缓存逻辑 */
this.addEventListener('install', function (event) {
    /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
    event.waitUntil(
        /* 创建一个名叫V1的缓存版本 */
        caches.open('v1').then(function (cache) {
            /* 指定要缓存的内容，地址为相对于跟域名的访问路径 */
            return cache.addAll([
                './6.html',
                './fcp.js',
                './10.css',
                './1000.js',
                '/images/100.jpg',
            ]);
        })
    );
});

/* 注册fetch事件，拦截全站的请求 */
this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
```

页面刷新一次后，在浏览器的Application里能看到Service Workers多了一条：

![](https://pan.udolphin.com/files/image/2022/3/69a5293ddc16270d6eb2e9b26ac9aac4.png)

而网络里size多了个标志：

![](https://pan.udolphin.com/files/image/2022/3/043803fdf80b6041520246496daab2d6.png)

而Timing里也多了：

![](https://pan.udolphin.com/files/image/2022/3/45197f7367fa2c4b8e1a3d1cad728cba.png)

需要注意的是，如果你只是做测试，sw开启后最好到Application里把它注销掉，否则说不定会影响你的开发（如果你注册的端口号和网页刚好与现在的一样了）。

### **小结**

我们从一个最普通的hello world入手，引申出性能优化的三个关键词——CDN、压缩、缓存。我们要清楚地记得，它们的目的都是为了减少网络损耗。

## **带图片的页面**

现代页面与90年代网页刚出来时大不一样，很少能看到上面只有纯粹html的页面了，css、js和图片几乎必不可少，而js的比重越来越大。

我们先不上css和js，看下只有图片的情况需要哪些优化。

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Understanding the Critical Rendering Path</title>
</head>

<body>
    <header>
        <h1>只有图片</h1>
    </header>
    <main>
        <h2 id="h2">Introduction</h2>
        <div>
            <img src="/images/3000.jpg" width="500px" height="500px" />
            <img src="/images/3001.jpg" width="500px" height="500px" />
            <img src="/images/3002.jpg" width="500px" height="500px" />
            <img src="/images/3003.jpg" width="500px" height="500px" />
            <img src="/images/3004.jpg" width="500px" height="500px" />
            <img src="/images/3005.jpg" width="500px" height="500px" />
            <img src="/images/3006.jpg" width="500px" height="500px" />
            <img src="/images/3007.jpg" width="500px" height="500px" />
            <img src="/images/3008.jpg" width="500px" height="500px" />
            <img src="/images/3009.jpg" width="500px" height="500px" />
        </div>
    </main>
    <footer>
        <small>Copyright 2022</small>
    </footer>
</body>
</html>
```

我们上10个图片，每个图片都设置为3秒钟之后再响应。

先看下网络情况：

![](https://pan.udolphin.com/files/image/2022/3/f09633e8133628060441f6ee6b00d8ae.png)

> 注意看上面的Waterfall，是不是同时只有6个请求？

打开performance

![](https://pan.udolphin.com/files/image/2022/3/fef83209417882f6cf1aea0a59212abf.png)

可以看到DCL、FP、FCP、LCP这几个指标都在一起。很容易得出结论：**图片并不阻塞页面渲染，不会影响白屏、首屏。**

当我们监听window.onload事件，打印时间，不出意外是6s多。

![](https://pan.udolphin.com/files/image/2022/3/26fc53e09162beb6b668d68f98989f57.png)

目前这种情况，有什么问题呢？

可以看出3个问题。

1. 图片大
2. 图片多
3. 同时只有6个图片请求，剩下4个只能排队，造成带宽的浪费。就像你有千M带宽，仍忍不住想吐嘈百度网盘一样，又像叶问说我要打10个，你偏偏只让他打6个......

![](https://pan.udolphin.com/files/image/2022/3/ad7ec5ce1e71799106b3c093f794382d.png)

### **1、图片大**

#### **CDN**

有的CDN也提供图片尺寸的裁剪，根据不同的参数返回不同质量的图片，不过一般要收费。

#### **压缩**

图片不像html、js、css这种文本，它的压缩不是简单地去除空格注释处理。

早有优秀的工具可以进行压缩，分为**有损压缩**和**无损压缩**，对图片质量要求不高的场景可以考虑有损压缩，比如生成缩略图。

从格式上考虑，同样的图片质量，推荐使用jpg和**WebP**。后者的浏览器兼容性差些，但更小些。假如使用了gif图片，可把它转换mp4或**WebM**（从名字上能看出来跟WebP是一对，都是google推出的）。

上面提到的gzip压缩，对图片适用吗？答案是不一定。**没有银弹**。如果图片没有经过任何优化处理，使用gzip压缩是可能缩小些的；但经过专业的工具压缩后，再可压缩的空间就已经很小了。所以生产环境，我们在nginx中配置文件的gzip压缩时，一般不会加上图片。

#### **缓存**

图片大了，更要缓存复用了。强缓存、协商缓存及至Service Worker，对图片都是有效的。这里就不再赘述了。

顺便一提，浏览器缓存资源是有大小限制的，chrome我记得是50M。假设你有这么牛逼的大文件，建议存储到indexedDB中。

#### **不同设备展示不同的图片**

不同设备需要的图片质量可能不一样，H5的img提供了srcset属性。用法类似这样:

```
<img src="image-128.png"
  srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
  sizes="(max-width: 360px) 340px, 128px" />
```

其中srcset指定图片的地址和对应的图片质量。sizes用来设置图片的尺寸零界点。

上面例子中的sizes就是指默认显示128px, 如果视区宽度大于360px, 则显示340px。

如果这种尺寸的判断满足不了你的需求，可以再看看picture。看我扒的两张图：

![](https://pan.udolphin.com/files/image/2022/3/e5af10c0ee4d51e92d03586bf27ed5d8.png)

![](https://pan.udolphin.com/files/image/2022/3/1e61a4fd55831470d895548501b2d4cb.png)

### **2、图片多**

#### **CDN**

图片多会影响服务器性能，这点CDN表示无所畏惧。

![](https://pan.udolphin.com/files/image/2022/3/e2f28445d8bf532677d68a6662e57fa8.png)

#### **缓存**

细心的朋友能发现，我这里加了10个图片，但地址都不一样。我为什么不写10个一样的图片呢？

答案很简单，浏览器针对一模一样的资源（不只是图片），在同一时间只下载一个，这也算是浏览器层面的防抖了。

#### **合并**

同样的大小，10个图片耗时短，还是1个图片耗时短？答案显而易见。所以早期资源**合并**很常见，它也是我们的关键词常客。当然，不只是图片，js、css更常见。

图片的合并称为Sprite，图片精灵，也叫雪碧图（为什么叫它雪碧呢？）。

![](https://pan.udolphin.com/files/image/2022/3/b0674fe97f7d3cb447fb03c8cd4ec9d1.png)

它需要跟CSS结合使用。

```
background: #ccc url('/icon.png') no-repeat 0 -200px
```

它的优点和缺点一样明显。

优点：

1. 体积小
2. 减小请求数

缺点：

1. 丧失CSS部分灵活性
2. 首屏如果不需要某个子图片，但这张大图里却包含了，那就属于资源浪费了。
3. 变更后缓存收益递减。改动一个子图片，整个图片都要重新生成，那这次的浏览器缓存就失效了。

所以有更合适的方案，下面会说。

#### **base64**

如果你关注你的vue或react工程打包后的文件，有时候会发现原来某个小图片的位置被一串字符串取代了。比如变成这样：

```
<img src="data:image/gif;base64,base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gIcSUNDX1BST0ZJTEUAAQE.....>
```

图片的base64编码就是可以将一张图片数据编码成一串字符串，使用该字符串代替图像地址url。它的优缺点很明显。

优点：

1. 减少http请求次数。
2. 采用base64的图片随着页面一起下载，因此不会存在跨域请求的问题，能节省DNS解析时间。
3. 没有图片更新要上传图片，因此不会造成清理图片缓存的问题。

缺点：

1. 增加html或css或js文件的大小。这是自然的事情，但如果设置阀值不当，可能会比原来图片体积更大。
2. 解析css的时间增长。css文件体积增大意味着CRP的阻塞，会导致白屏时间变长。
3. 跨文档冗余。
4. 变更后缓存收益递减。与第3条都是缓存层面的，不管base64存在哪个文件里，只要发生变更，缓存就失效了。

它和上面的合并属于一类问题。所以再往下看。

### **3、并发限制**

#### **CDN**

你可以考虑多整几个域名。当然，不仅仅是CDN，只要是额外的域名服务就可以。

为什么呢？因为浏览器做了同源并发限制，在http1.x时，一个域名只能发送6个TCP连接，但你整多个就跳过它的限制了。比如6个是cdn1.com，再来6个是cdn2.com。  
优点：

1. 跳出同源并发限制。
2. 因为跨域被禁止携带cookie，所以请求头能小一些。

缺点：

1. 增加DNS解析时间，每加一个域名的解析也是要花时间的，虽然几乎可以忽略不计。
2. 增加维护成本，怎么动态分配域名是需要额外考虑的事情。

#### **HTTP 2/3**

时至今日，网络上仍然有相当数量的网站仍在使用HTTP/1.1。

HTTP/2是一种安全高效的下一代http传输协议。安全是因为HTTP/2建立在https协议的基础上，高效是因为它是通过**二进制分帧**来进行数据传输。

HTTP/3是基于UDP的协议，可以简单理解是为了极致的性能，用UDP把TCP和HTTP/2的功能又实现了一遍，只为了更快一点点。

HTTP/2是个巨大的进步：

1. **对1.x协议语意的完全兼容。**2.0协议是在1.x基础上的升级而不是重写，1.x协议的方法，状态及api在2.0协议里是一样的。
2. **性能的大幅提升。**2.0协议重点是对终端用户的感知延迟、网络及服务器资源的使用等性能的优化。

它最大的特点是**多路复用**，是通过在协议栈中添加**二进制分帧层**来实现的。有了二进制分帧层，还能够实现请求的优先级、**服务器推送**、**头部压缩**等特性，从而大大提升了文件传输效率。

**划重点**：它可以通过一个 TCP 连接来发送多个 URL 请求，能充分利用带宽。在 HTTP/1.1 时代，为了提升并行下载效率，浏览器为每个域名维护了 6 个 TCP 连接；而采用 HTTP/2 之后，浏览器只需要为每个域名维护 1 个 TCP 持久连接，同时还解决了 HTTP/1.1 队头阻塞的问题。一个域名只使用一个 TCP 长连接和消除队头阻塞问题。

所以，你只需要把服务升级为HTTP/2，就可以跳过6个TCP连接的限制。

下面是HTTP/1.1的：

![](https://pan.udolphin.com/files/image/2022/3/6fe923dbf669892878833ade6964544c.png)

这是HTTP/2的：

![](https://pan.udolphin.com/files/image/2022/3/f7792064ab33ae27f4dfc23e23fe2c64.png)

对一些传统优化手段的影响：

1. 不需要合并文件了。
2. 不需要上面为了减少cookie的方式而进行多域名部署，因为有了**头部压缩**，只有第一个请求会大些。
3. **服务器推送**也是个非常有用的特性，如果是服务端渲染的页面，可以很容易推断出来当前页面还需要哪些资源，不必等页面请求就可以直接推送过去。缺点是复杂度高，还需要考虑缓存的情况（用户如果直接用缓存就可以，那你还推送过来，就造成浪费）。如果有合适的工程化方案，就比较理想了。

所以，**HTTP 2/3**也是一个重要的关键词。

#### **按需加载**

我们再回到这个网页本身，加载了10张图片，但页面上只显示了2张，剩下的图片需要滚动才能看到。那么，是不是意味着最少下面6张图片不是必须首屏加载的？世人可能就喜欢看蒙娜丽莎微笑，不喜欢看她的大粗腿呢？

![](https://pan.udolphin.com/files/image/2022/3/300c07e680f9a9418ccb103ae1330353.png)

**按需加载**也是一个很重要的关键词，不只是图片领域，js、css这些资源无一例外。首屏不需要的资源和视窗之外的资源，尽可能不要加载。

你可能对这个样例体会不深，假设这里不是10张图片，而是1000张甚至10000张，你肯定就是另一番感受。长列表的滚动是个很常见的需求，可以想想怎么实现。

一定要把这4个字刻在你的骨子里。吃多少，拿多少，做新时代的好青年。

![](https://pan.udolphin.com/files/image/2022/3/46d1508963a0a3e2d5972fe9c285e8b4.png)

#### **延迟加载**

从某种意义上说，图片的按需加载也是延迟加载。

1. 针对在CSS中的图片，如果没有用到这个class，是不会加载的。可以通过改变class来达到延迟的目的。
2. 将图片的真实地址隐藏在data-src属性里，在合适的时候再将它设置到src中。如果一开始显示是缩略图，再到后面替换成真实的图片，也是一样的处理逻辑。

毫无疑问，**延迟加载**也是个很重要的关键词。计算机的哲学与人生类似，缓存就像经验的积累，而延迟则是以静致动、以慢打快的无上绝学。

### **小结**

通过对多张图片场景的分析，我们发现除CDN、压缩、缓存外，又多了HTTP 2/3、按需加载、延迟加载这几个关键词，它们不只适用于图片，其它的资源也是一样的。

## **带CSS的页面**

CSS让我们的网页丰富多彩。它可能的问题也是大众化的：

1. 大
2. 多
3. 阻塞渲染

### **CSS大**

压缩。

按需加载（移除未引用的）。早些年bootstrap在前端非常流行，后来逐渐没落，这两年又出现原子CSS（比如Tailwind CSS），像绕了一大圈，又回到了原点，不过后者集成在现代脚手架必备的工具webpack里，把未使用的CSS干掉了而已。所以，**没有过时的技术，只有不合时宜的。**

### **CSS多**

HTTP 2/3。

### **阻塞渲染**

为什么CSS会阻塞渲染？从原理上讲很简单，它可以触发**重绘回流**，假设浏览器已经画了一会儿，CSS又轻松给抹掉重画，你说气人不？有同样问题的当然还有JS。所以他们都会阻塞渲染。

所以上面说，延迟是很有用的哲学，慢就是快。

CSS到底放哪里合适呢？CSS总不能说，我怕阻塞渲染，让DOM先来吧，浏览器肯定不愿意啊——把你排在前面自然是有道理的。

![](https://pan.udolphin.com/files/image/2022/3/f35adf86a4d94029a0fe7c0620bbc00d.png)

这里我们再看个小例子：

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Understanding the Critical Rendering Path</title>
    <style>
        html {
            background-color: #f0f0f0;
        }
    </style>
</head>

<body>
    <link href="/1000.css" rel="stylesheet">
    <header>
        <h1>css在body中，设置背景色，这时FP与FCP不一样</h1>
    </header>
    <main>
        <h2>Introduction</h2>
        <div>
            <img src="/images/3000.jpg" width="500px" height="500px" />
        </div>
    </main>
    <footer>
        <small>Copyright 2022</small>
    </footer>
</body>

</html>
```

页面上能看到一闪而过的背景色。再打开网络面板，能看到FP和FCP不一样，也就是说白屏时间变短了，只有166ms，但FCP仍是1136秒。

![](https://pan.udolphin.com/files/image/2022/3/d7b1c9b73ffcc74ebbfa051ee6352ba4.png)

这样变短的白屏时间对我们而言没有意义，用户看到这一闪而过的背景色没什么卵用。

所以CSS只能放在head中，准确说是**关键CSS**只能放head中。

什么是关键CSS？

就是向用户呈现第一屏的内容所需CSS的最少集合（**按需加载**又来了）。而且推荐**内嵌**到html中。什么？你说你的CSS很大？那说明你提取的还不够关键。它应该包含首屏的背景、布局，其它的CSS在加载进来后不应该影响窗口元素抖动。

将关键CSS内嵌后，其它的CSS**延迟加载**。如果是单页应用，那么这里的其它CSS又分为2种，一是当前路由需要的，一是其它路由需要的，它们的加载策略不一样。

谈到加载策略，就不得不提加载优先级了。

![](https://pan.udolphin.com/files/image/2022/3/21107457399ce7992d249f159f65d71e.png)

1. 其中HTML基本骨架结构和CSS的优先级最高
2. preload 使用 as 属性加载的资源将会获得与资源 “type” 属性所拥有的相同的优先级。比如说，preload as="style" 将会获得比 as=“script” 更高的优先级。
3. 不带 as 属性的 preload 的优先级将会等同于异步请求。

既然是延迟加载，就不能阻塞页面。所以要么把它放在body底部，要不使用preload或prefetch，当前路由的当然是preload，其它路由的是prefetch，后者优先级非常低，只在不影响当前页面性能时进行下载。

preload有个onload事件，可以让它下载成功后立即生效。

```
<link rel="preload" href="demo.css" onload="this.rel=stylesheet">
```

**调整资源优先级**，也是一门哲学。

![](https://pan.udolphin.com/files/image/2022/3/08f1e27c3a4047aeb40c24e48478ee96.png)

> 一个常见的优化点是说不要使用@import，思考下为什么呢？

### **避免重绘回流**

重绘：当页面中元素样式的改变并不影响它在文档流中的位置时，也就是说布局没有发生改变时（比如只是改变元素的颜色）。

回流：当渲染树（Render Tree）中的部分（或全部）元素的尺寸、结构、显示隐藏等发生改变时，浏览器重新渲染的过程称为回流。 简而言之，任何会改变元素几何信息（元素的位置和尺寸大小）的操作，都会触发回流。 回流是影响浏览器性能的关键因素。

注意：

* 回流必定会发生重绘，重绘不一定会引发回流。
* 回流比重绘的代价要更高。有时即使仅仅回流一个单一的元素，它的父元素以及任何跟它相关的元素也会产生回流，牵一发动全身。

如何避免呢？这里摘录几条常见的，更多需要大家在工作之中摸索总结：

CSS部分：

* 使用transform代替top
* 使用visibility 替换 display: none，前者引起重绘，后者引发回流
* 尽可能在 DOM 树的最末端改变 class
* 避免使用 CSS表达式，可能会引发回流
* 对具有复杂动画的元素使用绝对定位，使它脱离文档流
* 使用Flex时，比使用inline-block和float时重排更快，所以在布局时可以优先考虑Flex

JS部分：

* 避免频繁操作样式，修改 class最好
* 避免频繁操作 DOM，合并多次修改为一次。虚拟DOM就是如此，延迟哲学的另一处体现。
* 避免频繁读取会引发回流/重绘的属性，将结果缓存

### **性能提升**

#### **GPU加速**

现代GPU的性能越来越强，CSS3有些属性可以触发GPU加速（也称硬件加速）。在开发动画时，根据需要看要不要开启（缺点是增加内存消耗）。

* translate3d
* translateZ
* rotate3d
* scale3d
* will-change

#### **选择器**

* 避免设置多层内联样式，**CSS** 选择符从右往左匹配查找，避免节点层级过多
* 保持简单，不要使用嵌套过多过于复杂的选择器。
* 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。
* 不要使用类选择器和ID选择器修饰元素标签，如h3#markdown-content，这样多此一举，还会降低效率。

### **小结**

本节主要讲了CSS可能阻塞渲染及使用关键CSS的优化方案，顺便提到prefetch、preload一类资源加载优先级，代码层面如何避免重绘回流，利用GPU加速实现特定场景的性能提升。其中，关键CSS的优化方案，其实是**关键资源路径加载**的一条，也就是**按需加载**做到极致，骨架屏大概也是如此。

## **带字体的页面**

通常，如果要用特定的字体文件，也会遇到几个问题：

1. 大
2. 多
3. 闪动

简单分析下：

### **字体大**

常见的字体类型有：EOT、OTF、TTF、SVG、WOFF、WOFF2等。

推荐**WOFF2**，最小。缺点当然是浏览器兼容问题。

### **字体多**

还是上面说的不二法门，按需加载、延迟加载，首屏不需要的，就不要加载。

### **闪动**

什么是字体闪动呢？就是你一段文字，要使用你的特定字体，但这时字体文件还没加载或加载完成，所以先显示的系统字体，直到你的字体加载完了，产生了变化。这个过程有人称闪动，有人称抖动。

通常字体文件是在CSS中使用的，浏览器先下载了CSS，之后才知道有字体文件要下载，所以造成上面的现象。为了解决这个问题，就需要你告诉浏览器，我的页面有个字体文件要下载，赶紧先下载，也就是把它的加载优先级提高。

怎么做呢？还是上面的preload大法：

```
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

有一点需要指明，获取字体时必须加上 **crossorigin** 属性，就如使用 CORS 的匿名模式获取一样。是的，即使你的字体与页面同域......

## **带JS的页面**

JS也不外这些常见的问题：

1. 大
2. 多
3. 阻塞渲染

### **JS大**

1. 压缩
2. 按需加载。
   * 使用ES6的模块化，方便tree shaking。由于历史原因，有些常用的nodejs库并不能按需引用，比如lodash和moment.js，都有相应的解决方案或替代方案。如果你发现打包后一个文件大了，就得考虑用工具分析它的组成要不要优化了。
   * 如果只用到某库很少的功能，比如jQuery，可以找相应的替代品或手写实现。
   * 提取公用代码、组件。做好代码切割，最简单的标志是你当前路由里有没有加载其它路由的代码逻辑，当然，粒度在实际业务中要更细些。
3. 缓存。关于缓存，额外再说几点：
   * 合理使用get请求。get的优缺点都是可以缓存，针对合适的场景判断要不要使用，绝不能因噎废食抛弃get。
   * 传统讲，针对不同的资源，设置不同的缓存策略，比如图片设置长点儿，比如一个月甚至一年以上，js、css短一些。但现在几乎都是工程化开发，打包出来的js、css甚至图片都带有hash值，所以可以设置地更长些。
   * 由于我们是容器化部署，假设用户打开了一个页面没有关闭，这时你的新代码上线了，用户点击路由切换时肯定会报错，因为需要动态加载对应路由的js，而这时这个js已经不存在了。所以需要全局捕获这个错误，遇到这种情况时刷新页面。

### **JS多**

HTTP 2/3

### **阻塞渲染**

我们知道js可以阻塞页面加载，下面是个明显的例子：

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Understanding the Critical Rendering Path</title>
    <link rel="stylesheet" href="/main.css">
</head>

<body>
    <header>
        <h1>Understanding the Critical Rendering Path</h1>
    </header>
    <main>
        <h2>把js放中间</h2>
        <script src="/1000.js"></script> 
        <div>
            <img src="/images/3000.jpg" width="500px" height="500px" />
        </div>
    </main>
    <footer>
        <small>Copyright 2022</small>
    </footer>
</body>

</html>
```

![](https://pan.udolphin.com/files/image/2022/3/db690dceda94903e0e0b1f70566fdc09.png)

所以我们一般把js放在body尾部。放head里行不行呢？答案是可以的。

还是加载优先级的问题，我这里还有张中文的图，重点是**async/defer**这两个属性。

![](https://pan.udolphin.com/files/image/2022/3/de13a1c71029b3ba9b3e06341028d165.png)

看完这张图，思考下你的js应该放在哪里呢？

1. body底部。这是常见的做法，但其实它的加载优先级还是高的。多数情况下没有问题，但比如是一个与页面功能无关统计JS代码，是不是应该调低它的优先级呢？
2. head中defer。
3. body尾部defer。

像上图说的，注意async与defer的区别，前者只是加载级别低，但仍会阻塞渲染。

看一个vue工程打包出来的html文件：

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="icon" href="/favicon.ico">
    <title>研发wiki</title>
    <link href="/js/editor.43d9f8d7.js" rel="prefetch">
    <link href="/js/app.a855ae7f.js" rel="preload" as="script">
    <link href="/js/chunk-vendors.9d9cbaa3.js" rel="preload" as="script">
</head>

<body><noscript><strong>We're sorry but uino-wiki doesn't work properly without JavaScript enabled. Please enable it to
            continue.</strong></noscript>
    <div id="app"></div>
    <script src="https://static.uino.cn/comment.js"></script>
    <script src="https://ckeditor.com/apps/ckfinder/3.5.0/ckfinder.js"></script>
    <script src="/js/chunk-vendors.9d9cbaa3.js"></script>
    <script src="/js/app.a855ae7f.js"></script>
</body>

</html>
```

重点看下prefetch和preload的使用。

### **性能提升**

1. 复杂计算，耗时严重的可以放后端，或考虑web worker，又或考虑webAssembly。
2. react/angluar/vue中，对for循环的节点添加key属性。
3. vue2.x里，尽可能避免data中深层嵌套，或者对于不会修改的内容，使用Object.freeze冻结对象。
4. 动画用requestAnimationFrame来提高性能，能用CSS做到的就不要用JS

### **小结**

JS在各种资源里算是最复杂的，但正像前文说的，万变不离其宗，再复杂也改变不了它也是个资源的本质。所以我们的优化关键词在它身上依然是有效的，CDN、压缩、缓存、按需、延迟、HTTP 2/3、调整优先级，不外如是。剩下的就是些代码层面的技巧了，需知我们常用的框架再怎么牛逼，都只是帮助我们以更细粒度操作DOM，与浏览器交互，仅此而已，不要有畏难情绪，有时间应该多看看源码，最次应该知道基本实现原理。

# **总结**

本文先是简述了性能优化的必要性，再讲了影响性能的因素和一些性能指标及其查看工具，再分别从html、图片、css、字体、JS入手，帮你提炼出来性能优化的几个关键词。

前端框架层出不穷，尤其是各种功能完善的脚手架，让你可以更专注于业务开发。但说到底，React/vue这些框架只能保障你网页性能的下限，如何让你的网站真正健壮高效，还需要大家在前端领域里深耕。以后当你每写一行代码，如果都能意识到它对性能是否有影响，就算是小有所成了。

---

**参考链接**

* [以用户为中心的性能指标](https://web.dev/user-centric-performance-metrics/#important-metrics-to-measure)
* [为什么速度如此重要](https://web.dev/why-speed-matters/)
* [js 开发性能优化](https://zhuanlan.zhihu.com/p/458862721)
* [Web前端最新性能优化：FP、FCP、TTI、FID等](https://www.h5w3.com/32655.html)
* [网站加载性能](https://www.jianshu.com/p/60425ba52457)
* [网络功能参考](https://developer.chrome.com/docs/devtools/network/reference/?utm_source=devtools#timing-explanation)
* [关于srcset，picture，size](https://blog.csdn.net/caimaomaocai/article/details/79799034)
* [preload与prefetch的使用和区别](https://www.jianshu.com/p/8920dc078689)
* [什么是重绘和回流以及如何避免回流](https://blog.csdn.net/piaojiancong/article/details/115682174)