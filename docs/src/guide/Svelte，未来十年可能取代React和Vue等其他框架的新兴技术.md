在这篇文章中，我将会介绍 Svelte 框架的特性、优缺点和底层原理。 
  
 > 本文尽量不会涉及 Svelte 的语法，大家可以放心食用。因为 Svelte 的语法极其简单，而且官方教程学习曲线平缓[https://www.sveltejs.cn/](https://www.sveltejs.cn/)，相信大家很快就会上手语法的，这里就不做官网搬运工了。 
  
 前端领域迅速发展，各种轮子(框架)层出不穷。最近这些年，随着三大框架React、Vue、Angular版本逐渐稳定，前端技术栈的迭代似乎缓慢下来，React 16版本推出了 Fiber， Vue 3.0 也已经正式发布。如果我们把目光拉伸到未来十年的视角，前端行业会出现哪些框架有可能会挑战React或者Vue呢？ 我认为，崭露头角的 Svelte 应该是其中的选项之一。 
  
 ##  Svelte 简介 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/f276cc1bfaf7c1a33defc235997072b3.png) 
` Svelte`叫法是`[Svelt]`, 本意是苗条纤瘦的，是一个新兴热门的前端框架。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/bf2c7bb8f7187085be0f97da22fa8677.png) 
 ### 作者 
 Svelte 作者是前端轮子哥 Rich Harris，同时也是 Rollup 的作者。Rich Harris 作者本人在介绍 Svelte 时，有一个非常精彩的演讲《Rethinking reactivity》，[油管链接](https://www.youtube.com/watch?v=AdNJ3fydeao&t=1900s) ，感兴趣的同学不要错过。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/6dcc3a4e43fd7a239ddddcf8b4bf6a09.png) 
  
 ### 核心思想 
 他设计 Svelte 的核心思想在于『通过静态编译减少框架运行时的代码量』，也就是说，Vue 和 React 这类传统的框架，都必须引入运行时 (Runtime) 代码，用于虚拟DOM、Diff 算法。Svelte完全溶入JavaScript，应用所有需要的运行时代码都包含在bundle.js里面了，除了引入这个组件本身，你不需要再额外引入一个运行代码。 
  
 Svelte 的使用非常灵活，你可以在整个项目的使用Svelte 整个的构建体系，也可以渐进地将 Svelte添加到您的代码中，还可以将 Svelte 组件作为独立的 npm 包发布。 
  
 ### 特点 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/c8213b82b7f8094f5ed1492e3d40adb9.png) 
 * 用最基本的 HTML,CSS,JavaScript 来写代码
 * 基于Compiler as framework的理念，会在编译的时候将你的应用转换为原生的DOM操作 
 * 没有Virtual DOM 
 * 极其容易的应用全局状态管理，框架本身自带全局状态，类似于React的Redux和Vue的Vuex 
 * 原生支持CSS scope和CSS animate 
 * 支持context，避免组件的props drilling 
  
 在最新的[《State of JS survey of 2020》](https://2020.stateofjs.com/en-US/)中，它被预测为未来十年可能取代React和Vue等其他框架的新兴技术。如果你不确定自己是否该了解 Svelte，可以先看一下 Svelte 的一些发展趋势。 
  
 ## 发展趋势 
 ### 开发者满意度 
 从2019年开始, Svelte出现在榜单中。刚刚过去的2020年，Svelte在满意度排行榜中超越了React，跃升到了第一位。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/11089c63019019ad09848af1bc56f79a.png) 
  
 ### 开发者兴趣度 
 在开发者兴趣度方面，Svelte 蝉联了第一。![image.png](https://pan.udolphin.com/files/image/2021/7/18b389ebf305c57481b52afe60173c2d.png) 
  
 ### 市场占有率 
  
 当然，如果你还没有听说过，也不用紧张，因为Svelte 目前仍是小众的开发框架，在社区里仍然没有流行开来。24.7% 的开发者没有听说过这款框架，有 44.9% 的开发者听说过，并且愿意接下来尝试使用。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/dbf2da341035444812ac0deecfa8c8d1.png) 
 从框架使用的公司规模来看，Svelte 目前在大公司使用率不高，可能和 Svelte 目前生态环境和周边欠缺有关。Svelte 在小公司中使用率比较高，可能和容易上手有关 
  ![image.png](https://pan.udolphin.com/files/image/2021/7/d99de2d63e7077401c13679b328cd26c.png) 
  
 ## Svelte 优势 
 ### No Runtime — 无运行时代码 
 上文说了，React 和 Vue都是基于运行时**Runtime**的框架，框架本身所依赖的代码也会被打包到最终的构建产物中，当用户在你的页面进行各种操作改变组件的状态时，框架的**Runtime**会根据新的组件状态（state）计算（Diff）出哪些DOM节点需要被更新，从而更新视图。 
  
 这就意味着，框架本身所依赖的代码也会被打包到最终的构建产物中。这就不可避免增加了打包后的体积，那么这部分体积大约是多少呢？请看下面的数据： 
 | Name | Size | 
 | --- | --- | 
 | Ember  2.2.0| 435K | 
 |  Ember 1.13.8|486K  | 
 |  Angular 2|  566K | 
 |  Angular 2 + Rx|766K  | 
 | Angular 1.4.5 | 143K | 
 | Vue 2.4.2 | 58.8K  | 
 | Inferno 1.2.2 | 48K  | 
 |  Preact 7.2.0 |  16K | 
 |  React 0.14.5 + React DOM | 133K  | 
 | React 0.14.5 + React DOM  + Redux  |  139K | 
 | React 16.2.0 + React DOM |  97.5K | 
 从上面的表格可以看出，常用的框架中，最小的Vue都有58K，React更有97.5K，这个体积说实话，是有一点大的。假设我们使用React开发一个小型组件SDK，即使里面的逻辑代码很简单，但是打包出来的bundle size轻轻松松都要100K起步。当然100K相对于一些大型的管理系统来说，只是小巫见大巫，但是对于那些首屏加载时间很敏感的应用（例如淘宝，京东），100K在一些网络不好的情况下会影响用户体验，所以想要减少框架的Runtime大小，那就是压根不用Runtime。大家回想一下，早在jQuery和BootStrap大行其道的时代，我们的代码不就是不包含Runtime的吗？当数据变化时，直接通过JS去改变原生DOM节点，没有框架一系列Diff和Fiber。 那Svelte将框架的概念放在了编译时而不是运行时，Svelte编写的代码可以通过webpack或者Rollup等打包工具，在打包的时候直接转换成js对DOM节点的原生操作，从而让bundle不包含框架的Runtime代码。 
  
 因为生成的组件没有Runtime，没有额外的依赖，所以所有组件都可以单独使用，可以无缝地在React、Vue或Angular等其他框架里直接import。 
  
 下面是 Jacek Schae 大神的统计，使用市面上主流的框架，来编写同样的[Realworld](https://realworld.svelte.dev/) 应用： 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/6fd4850f47b2c56699d3b8453a43f6e0.png) 
 从上图的统计，Svelte简直是神奇！竟然只有 9.7 KB ! 
 可以看出，Svelte的bundle size大小是Vue的1/4，是React的1/20。 
  
 但是它并不是说完全没有运行时，对于一些特定的功能，像组件的一些逻辑切换（if/else），循环逻辑等等，它是在运行时的，只是在编译的时候，没有被用到的代码功能不会被打包进最终的bundle里，这就好像你用babel，helper是不会被引入的，用lodash或者RxJS只会选择性的引入对应的代码，所以这就极致的减少了打包后的体积。 
  
 ### Less-Code —写更少的代码 
 在写Svelte组件时，你就会发现，和 Vue 或 React 相比只需要更少的代码。开发者的梦想之一，就是敲更少的代码。更少的源码意味着Bug少，同时也有助于维护，阅读。 
  
 下面的例子，可以看出Svelte和React/Vue的不同： 
 React 的代码 
 ```js 
 const [count, setCount] = useState(0); 
  
 function increment() { 
   setCount(count + 1); 
 } 
 ``` 
 Vue3的代码 
 ```js 
 const count = ref(0); 
  
 const increment = () =>{ 
   count.value += 1 
 } 
 ``` 
 Svelte的代码 
 ```js 
 let count = 0; 
  
 function increment() { 
   count += 1; 
 } 
 ``` 
 在React/Vue中，我们要么使用钩子，要么使用setState设置状态。而在Svelte中，可以直接使用赋值操作符更新状态。 
  
 如果说上面的例子太简单了，可以看下面的统计，分别使用 React /Vue/ Svelte 编写同样的[Realworld](https://realworld.svelte.dev/) 应用，各个框架所需要的行数。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/5b02fdef14f2d266938e5e42d5fe505a.png) 
 Vue 和 React 打了平手，Svelte 遥遥领先，可以少写 1000 行代码 
  
 ### Hight-Performance —高性能 
 在Virtual DOM已经是前端框架标配的今天， Svelte 声称自己是没有Virtual DOM加持的， 怎么还能保证高性能呢？ 
  
 #### 性能测评 
**Jacek Schae **在[《A RealWorld Comparison of Front-End Frameworks with Benchmarks》](https://www.freecodecamp.org/news/a-realworld-comparison-of-front-end-frameworks-with-benchmarks-2019-update-4be0d3c78075/)中用主流的前端框架来编写 [Realworld](https://realworld.svelte.dev/) 应用，使用 Chrome 的Lighthouse Audit测试性能，得出数据是**Svelte** 略逊于**Vue**, 但好于 **React**。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/7c67e6dbf69e340d1fff154de27638ba.png) 
 所以为什么Svelte的性能看上去还不错！！！ 
  
 #### Virtual DOM 真的高效吗 
 Rich Harris 不用 Virtual DOM 是因为觉得Virtual DOM Diff 的过程是非常低效的。 
  
 在他的一文[《Virtual DOM is pure overhead》](https://www.sveltejs.cn/blog/virtual-dom-is-pure-overhead)有介绍，感兴趣的同学可以翻一下。 
  
 首先，Virtual DOM高效是一个误解，React 从来没有说过它的 Virtual DOM 性能很好，有的人会说Virtual DOM高效的一个理由就是它不会直接操作原生的DOM节点，因为这个很消耗性能。 
 当组件状态变化时它会通过某些Diff算法去计算出本次数据更新真实的视图变化，然后只改变“需要改变”的DOM节点。用过React的人可能都会体会到React并没有想象中那么高效，框架有时候会做很多无用功，这体现在很多组件会被“无缘无故”进行重渲染（re-render），特别是在用了 Redux 后，这个现象会愈发明显。 
  
 所谓的re-render是你定义的class Component的render方法被重新执行，或者你的组件函数被重新执行，并不是说原生DOM被重新渲染。组件被重渲染是因为Vitual DOM的高效是建立在Diff算法上的，而如果要有Diff，则一定要将组件重渲染才能知道组件的新状态和旧状态有没有发生改变，从而才能计算出哪些DOM需要被更新。 
  
 可能有的朋友会说React Fiber不是出来了吗？其实Fiber这个架构解决的问题是不让组件的重渲染和reconcile的过程阻塞主线程的执行，组件重渲染的问题依然存在，而且据反馈，React Hooks出来后组件的重渲染更加频繁了。正是因为框架本身很难避免无用的渲染，React才允许你使用一些诸如shouldComponentUpdat、PureComponent和useMemo的API去告诉框架哪些组件不需要被重渲染，可是这会引入了很多模板代码（boilerplate）。 
  
 这里引申讲下Virtual DOM的开销在哪里， 这和它必不可少的3个步骤有关（以更新某个元素的text值为例）： 
 1. 调用render函数生成一颗新的Virtual DOM tree 
 2. 遍历元素上的新属性和旧属性，查看是否需要添加/删除/更新属性 
 3. 访问到此元素，然后发现text值需要被更新，则更新 
  
 具体代码实例如下： 
 ```js 
 function MoreRealisticComponent(props) { 
   const [selected, setSelected] = useState(null); 
  
   return ( 
     <div> 
       <p>Selected {selected ? selected.name : 'nothing'}</p> 
  
       <ul> 
         {props.items.map(item => 
           <li> 
             <button onClick={() => setSelected(item)}> 
               {item.name} 
             </button> 
           </li> 
         )} 
       </ul> 
     </div> 
   ); 
 } 
 ``` 
 这里 props.items 这个数据，只要state发生了变化，我们都会重新生成一堆虚拟的 li ，这是毫无意义的，这些琐屑的操作累加起来，最终对性能会造成影响，如果你想要更快的话，一个比较好的做法就是去除这些多余的操作。 
  
 #### 那么 Svelte 是如何解决这个问题的？ 
 React 采用 JSX 语法本质不理解数据代表的意义，没有办法做出优化。 
  
 Svelte 采用了 **Templates** 语法（类似于 Vue 的写法），更加严格和具有语义性，可以在编译的过程中就进行优化操作。 
  
 那么，为什么 **Templates** 语法可以解决这个问题呢？ 
  
 #### Template 带来的优势 
 关于 JSX 与 Templates ，可以看成是两种不同的前端框架渲染机制，有兴趣的同学可以翻一下尤雨溪的演讲[《在框架设计中寻求平衡》](https://www.bilibili.com/video/av80042358/)。 
   
 ##### JSX 优缺点 
 JSX 具有 JavaScript 的完整表现力，可以构建非常复杂的组件。 
  
 但是灵活的语法，也意味着引擎难以理解，无法预判开发者的用户意图，从而难以优化性能。我们看下下面的代码： 
 ```js 
 function render() { 
     const children = [] 
     for (let i = 0; i < 5; i++) { 
       children.push(h('p', { 
         class: 'text', 
       }, i === 2 ? this.message : 'Lorum ipsum')) 
     } 
     return h('div', { id: 'content' }, children) 
  } 
 ``` 
 在使用 JavaScript 的时候，编译器不可能hold住所有可能发生的事情，因为 JavaScript 太过于动态化。也有人对这块做了很多尝试，但从本质上来说很难提供安全的优化。 
  
 所以，React 选择的优化思路是，引入了运行时调度并发时间切片的概念，不减少渲染的工作量，而是让用户“看上去” 不会卡。 
  
 ##### Template优缺点 
 根据定义，模板是一种非常有约束的语言，你只能以某种方式去编写模板。 
  
 例如，当你写出这样的代码的时候，编译器可以立刻明白：**”哦！这些 p 标签的顺序是不会变的，这个 id 是不会变的，这些 class 也不会变的，唯一会变的就是这个message“**。 
 ```js 
 <template> 
   <div id="content"> 
       <p class="text">Losum Ipsum</p> 
       <p class="text">Losum Ipsum</p> 
       <p class="text">{{ message }}</p> 
       <p class="text">Losum Ipsum</p> 
       <p class="text">Losum Ipsum</p> 
  </div> 
 ``` 
 在编译时，编译器对你的意图可以做更多的预判，从而给它更多的空间去做执行优化。 
  
 我们来看看 Svelte 编译代码时，会把模板编译成直接可执行的JavaScript 代码。 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/8bcb9b866162ce2d21fc4129e10f4719.png) 
 左侧 template 中，其他所有内容都是静态的，只有 name 可能会发生改变。 
  
 右侧 p 函数是编译生成的最终的产物，会在有脏数据时被调用。p 函数唯一做的事情就是，当 name 发生变更的时候，调用原生方法把 t1 这个原生DOM节点更新。 
  
 ##### 小结 
 回到最初的问题， 我们就想知道 Svelte 与 VDOM Diff 算法哪个更快？ 
  
 取决于组件的复杂程度，当组件内元素数量越多时， VDOM Diff 所需要的时间越长，而Svelte 相对性能会更好。 
  
 | 类目 | Svelte  |  Vue | React | 
 | --- | --- | --- | --- | 
 |  创建1000行表格| 132.3ms | 162.3ms | 165.7ms | 
 |  创建10000行表格 | 1212ms |  1252ms| 1594.9ms  | 
 | 在1000行表格中交换2行 | 51.8ms |66.6ms|  429.6ms| 
 | 首屏加载时间 | 19.5ms | 59.6ms | 55.6ms | 
 性能数据来自[JS framework benchmark](https://github.com/krausest/js-framework-benchmark) 
  
 ## Svelte 劣势 
 在构建大型前端项目时，我们在选择框架的时候就需要考虑更多的事情。 
  
 Svelte 目前尚处在起步阶段，对于大型项目必要的**单元测试**并没有完整的方案。目前在大型应用中使用 Svelte , 需要谨慎。 
  ### 和Vue， React框架的对比 
  
 | 类目 |Svelte  | Vue | React  | 
 | --- | --- | --- | --- | 
 |UI 组件库| Material design  | Element UI / AntD |AntD / Material design| 
 | 状态管理 | 官网自带 | Vuex | Redux/MobX | 
 | 路由 | Svelte-router | Vue-router | React-router | 
 | 服务端渲染 | 支持 | 支持 |  支持| 
 |  TypeScript| 支持 | 支持 | 支持 | 
 |  测试工具| 官方网站没有相关内容 | @vue/test-utils | Jest | 
  
 ### 潜在的问题 
  >  虽然在简单的 demo 里面代码量确实非常小，但同样的组件模板，这样的 imperative 操作生成的代码量会比  Virtual DOM 渲染函数要大，多个组件中会有很多重复的代码（虽然 gzip 时候可以缓解，但 parse 和 evaluate 是免不了的）。项目里的组件越多，代码量的差异就会逐渐缩小。同时，并不是真正的如宣传的那样 “没有 Runtime“，而是根据你的代码按需 import 而已。使用的功能越多，Svelte 要包含的运行时代码也越多，最终在实际生产项目中能有多少尺寸优势，其实很难说。 
  
 > Svelte 在大型应用中的性能还有待观察，尤其是在大量动态内容和嵌套组件的情况下。它的更新策略决定了它也需要类似 React 的 shouldComponentUpdate 的机制来防止过度更新。另一方面，其性能优势比起现在的主流框架并不是质的区别，现在大部分主流框架的性能都可以做到 vanilla js 的 1.2~1.5 倍慢，基于 Virtual DOM 的 Inferno 更是接近原生，证明了 Virtual DOM 这个方向理论上的可能性，所以可以预见以后 web 的性能瓶颈更多是 DOM 本身而不是框架。 
  
 > Svelte 的编译策略决定了它跟 Virtual DOM 绝缘（渲染函数由于其动态性，无法像模板那样可以被可靠地静态分析），也就享受不到 Virtual DOM 带来的诸多好处，比如基于 render function 的组件的强大抽象能力，基于  Virtual DOM 做测试，服务端/原生渲染亲和性等等。这一点在我看来比较关键。让我在一点点性能和 Virtual DOM 之间做抉择的话，我还是会选择 Virtual DOM。Vue 3 在保留 Virtual DOM 灵活性的前提下基于模版对渲染函数做 AOT 优化，性能已经做到跟 Svelte 很接近。 
  
 这3点潜在问题出自尤雨溪在知乎对[《如何看待 Svelte 这个前端框架？》](https://www.zhihu.com/question/53150351)的评价，很客观的说明了Svelte在大型项目上可能存在的问题，以及对性能和Virtual DOM之间所做的取舍。 
  
 ## 响应式原理 
 ### 整体更新渲染流程 
 Svelte 是如何更新数据，渲染结果的呢？Svelte 整体的更新渲染流程是怎么样子的呢？ 
  
 接下来，我将编译一个最简单的例子，深入Svelte 的每一行源码。 
  
 例子的代码： 
  
 ```js 
 <main> 
     <div> 
        {count} 
     </div> 
  
     <button on:click={onClick}>click</button> 
 </main> 
  
 <script> 
     let count = 0 
  
     function onClick() { 
       count += 1 
     } 
 </script> 
  
  
 ``` 
  
 上面代码： 当点击按钮时，count 变量会更新，同时渲染到DOM节点上，那么这神奇的一切背后发生了什么？一共经历了哪些阶段？ 
  
 我梳理了 Svelte 打包后代码的整体流程，发现还是比较简单的，用画图表示如下： 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/51014257fae3688ec3e95e94ef82f606.png) 
  
 *  `click` 事件发生之后，会发生两件事情:  
     * count 变量被修改: `count += 1` 
     * 调用`$$invalidate` 方法 
 * `$$invalidate` 方法又调用了 `make_dirty` 方法，`make_dirty` 是记住已经脏的数据，里面做了两件事情，比较复杂，后面会讲到。 
 *  数据弄脏之后，不是立马更新，而是`schedule_update()` 方法把 `flush` 回调推到16ms一帧的最后去执行。 
 *  `flush` 被执行时，遍历所有的`diry_components` 中的组件，调用他们的 `.p()` 方法。`.p() `方法是编译生成的，里面有一个神奇的 if 判断，如果走进判断体，则调用 `setData` 方法更新DOM节点 
  
 看上去一头雾水？没关系，只需要有一个大致的印象，下面会详细的介绍每一个过程。 
  
  ####  click事件发生后 
 首先，我们在浏览器里面执行的并不是我们写的代码，而是 Svelte 编译修改之后的。 
  
 增加了一个instance 方法，如下： 
 ```js 
 function instance($$self, $$props, $$invalidate) { 
  let count = 0; 
  
  let onClick = () => { 
   $$invalidate(0, count = count + 1); 
  }; 
  
  return [count, onClick]; 
 } 
 ``` 
 `onClick `方法里面的逻辑被改写了，先是对 count 重新赋值（`count = count + 1`），然后加入对 `$$invalidate()` 方法的调用。 
  
 #### $$invalidate 
 `$$invalidate`方法也是编译生成，删掉其他无关紧要的逻辑之后，只剩下下面的逻辑： 
 ```js 
 function $$invalidate(i, value) { 
     make_dirty(component, i); 
 } 
 ``` 
 也就是调用 `make_dirty()` 方法 
  #### make_dirty 
 `make_dirty` 方法做了两件事情把当前组件弄脏： 1. 把当前的compoent 推到 dirty_components 数组中 2. 通过二进制的值来记录脏数据，目的是为了节省内存。 
 ```js 
 function make_dirty(component, i) { 
   // 如果 component.$$.dirty[0] 
   if (component.$$.dirty[0] === -1) { 
     // dirty_components 记录了，脏组件 
     dirty_components.push(component); 
     schedule_update(); 
     component.$$.dirty.fill(0); 
   } 
   // 下面代码的原理是，通过二进制的值来记录脏数据 
   // 不要尝试看懂，下面会讲 
   component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31)); 
 } 
 ``` 
 之后，调用了 `schedule_update()` 

#### schedule_update 
 `schedule_update `的作用是，把一个` flush` 的方法放到一个` Promise.then `里面: 
 ```js 
 function schedule_update() { 
   resolved_promise.then(flush); 
 } 
 ``` 
 背后其实是，让 `flush` 方法在这一帧的微任务被执行的时候执行。 
  
  #### 一帧 16ms 之内发生的任务的顺序 
 * 响应用户输入事件(scroll / click / key) 
 * `Javascript`执行 
 * `requestAnimation` / `Intersection Observer cb` 
 * 布局 Layout 
 * 绘制 Paint 
 * 如果 16ms 还有盈余，调用 `requestIdleCallback` ，若没有，通过第二个参数指定一个到时必处理 
 * 宏任务 ( `setTimeout` / `MessageChannel.onMessage` ) 
 * 微任务 (`Promise.then()`/` process.nextTick`(Node)) 
  
 #### flush 
 `flush` 方法里面的逻辑是：遍历所有的`diry_components` 中的组件，调用`update` 方法，`update` 方法里面，最后调用了组件的` .p() `方法。 `.p()` 方法是编译生成的。 
 ```js 
 function flush() { 
   // 如果正在 flushing , 就退出 
   if (flushing) { 
     return; 
   } 
   flushing = true; 
 
   do { 
     for (let i = 0; i < dirty_components.length; i += 1) { 
       const component = dirty_components[i]; 
 
         update(component.$$); 
     } 
  
     flushing = false; 
 } 
  
  
 function update($$) { 
   // 先假设 $$.fragment 都不是 null 
   if ($$.fragment !== null) { 
     $$.update(); 
   
       // ~~~~~~~~~~~~~~~ before_update 生命周期 ~~~~~~~~~~~~~~~ 
     run_all($$.before_update); 
 
     const dirty = $$.dirty; 
         // 所有必须的 更新，必须要更新了，调用 p 方法 
     $$.fragment && $$.fragment.p($$.ctx, dirty); 
  
         // ~~~~~~~~~~~~~ after_update 生命周期 ~~~~~~~~~~~~~~~ 
     $$.after_update.forEach(add_render_callback); 
  } 
 } 
 ``` 
  
 #### `.p `方法 
 .p 方法核心功能，就是用最新的数据来更新DOM节点，大概长下面这样： 
 ```js 
 p(ctx, [dirty]) { 
  // & 是位运算 
  if (dirty & 1) { 
   // set_data 就是把 dom 节点的 data 值更新 
   set_data(t1, ctx[0]) 
  }; 
  if (dirty & 1) { 
   set_data(t3, ctx[0]) 
  }; 
 }, 
 ``` 
 `set_data` 就是封装了 DOM 的原生方法（比如说 `innerHtml`），把 DOM 节点更新。 
  
 上面神奇的 `if` 判断，就是判断脏数据是否会影响到对应的DOM节点，如果是，则精准的更新那一个DOM节点。`p` 方法之所以知道更新哪一个DOM节点，是因为这个方法在编译的过程中，就通过 AST 等手段记录了 DATA 和 DOM 节点的对应关系, 下小节会详细介绍。 
  
 #### 整体流程小结 
 你可能还是一头雾水，最大的困惑在于Svelte 是如何根据脏数据更新DOM节点的。为了彻底理解这块的逻辑，请务必要看下面这一小节。 
  
 ### Svelte 脏数据更新DOM 原理 
 任何一个现代前端框架，都需要记住哪些数据更新了，把更新了的数据视为脏数据，然后根据脏数据计算出最新的DOM状态。 
  
 Svelte使用**位掩码（bitMask）** 的技术来跟踪哪些值是脏的，即自组件最后一次更新以来，哪些数据发生了哪些更改。 
  
 **位掩码是一种将多个布尔值存储在单个整数中的技术，一个比特位存放一个数据是否变化，一般1表示脏数据，0 表示是干净数据。** 
  
 用大白话来讲，你有A、B、C、D 四个值，那么二进制`0000 0001 `表示第一个值`A` 发生了改变，`0000 0010` 表示第二个值 `B` 发生了改变，`0000 0100 `表示第三个值 `C` 发生了改变，`0000 1000 `表示第四个 `D` 发生了改变。 
  
 这种表示法，可以最大程度的利用空间。为啥这么说呢？ 
  
 比如说，十进制数字`3` 就可以表示 A、B是脏数据。先把十进制数字`3`， 转变为二进制 `0000 0011`。 
  
 从左边数第一位、第二位是1，意味着第一个值A 和第二个值B是脏数据；其余位都是0，意味着其余数据都是干净的。 
  
 #### JS 的限制 
 JS 里面无论是小数还是整数，都是按照64位的浮点数形式存储的，而整数的运算会自动转化为32位的有符号整数，减去1位用来存放符号，也就是31位。也就是说，如果 Svelte 采用二进制位存储的方法，那么只能存 31个数据。 
  
 但肯定不能这样，对吧？ 
  
 **Svelte采用数组来存放**，数组中一项是二进制31 位的比特位。假如超出31 个数据了，超出的部分放到数组中的下一项 。 
  
 这个数组就是` component.$$.dirty` 数组，二进制的`1 `位表示该对应的数据发生了变化，是脏数据，需要更新；二进制的`0` 位表示该对应的数据没有发生变化，是干净的。 
  
 #### 一探究竟 `component.$$.dirty` 
 上文中，我们说到 `component.$$.dirty` 是数组，具体这个数组长什么样呢？ 
  
 我们模拟一个 Svelte 组件，这个 Svelte 组件会修改33个数据。 
  
 我们打印出每一次`make_dirty` 之后的`component.$$.dirty` ， 如下面所示： 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/2d75ea012f820669b3a32406069e5a88.png) 
 看上去，貌似根本找不出一些规律。 
  
 Svelte 正是用 component.$$.dirty 的数组中看似无规律的数字来表示有哪些数据需要更新的。 
  
 如果我们把上面数组中的值，都十进制转为二进制来，再来观察一下： 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/ea39827f45d5558e74c7ce545a5bc83b.png) 
 上面数组中的每一项中的每一个比特位，如果是1，则代表着该数据是否是脏数据。如果是脏数据，则意味着更新。 
 * 第一行 [`"0000000000000000000000000000001"`, `"0000000000000000000000000000000"`], 表示第一个数据脏了，需要更新第一个数据对应的dom节点 
 * 第二行 [`"0000000000000000000000000000011"`, `"0000000000000000000000000000000"`], 表示第一个、第二个数据都脏了，需要更新第一个，第二个数据对应的dom节点 
 * ...... 
 当一个组件内，数据的个数，超出了31的数量限制，就数组新增一项来表示。 
  
 #### 如何设置为脏数据 
 原理上，设置为脏数据，比较简单，就是把` component.$$.dirty `数组二进制对应的比特位设置为`1` 
  
 实际上，这段逻辑对应的源码非常精炼和复杂，就下面一行代码： 
 ```js 
 component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31)); 
 ``` 
 上面的代码是啥意思呢？把指定bit位上代表的记为脏数据。 
  
 `i `表示ctx中第几个变量，` 1 `表示第一个变量，`2 `表示第二个变量。 
  
 #### `(i/31)|0` 啥意思？ 
 `i/31 `表示用 `i` 来除`31`, `(i/31) |0 `相当于是对`(i/31)`的结果取整。 
 如果你觉得很不好理解，可以简单的理解为` Math.floor(i/31)` ，也就是对` i/31` 的结果取整。 
  
 #### `component.$$.dirty[(i/31)|0]` 啥意思 ？ 
 `component.$$.dirty[(i / 31) | 0]` 表示`component.$$.dirty` 的第几项，也就是，`i `对应的数组，落在`component.$$.dirty`数组中哪一项。 
  
 还记得我们的`component.$$.dirty` 变为二进制之后长什么样子吗？ 
  
 ```js 
 // component.$$.dirty 
 ["0000000000000000000000000000001", "0000000000000000000000000000000"] 
 ``` 
 `i`如果超出了31个位数限制，会在`component.$$.dirty` 数组中增加一项。 
  
 #### `1 <<（i％31）` 啥意思？ 
 先讨论 `<<` 的计算规则。 `<<`左移的规则就是转为二进制的每一位都向左移动一位，末尾补0。 
 比如说`3 << 2 `计算过程是，把` 3` 变成二级制后，所有位数左移2位。 
 下面是`3 << 2` 具体的计算过程： 
 ``` 
 3 的二进制表示为 0000 0011 
 所有位数左移2位变为 0000 1100 
 转变为十进制后为 12（ 相当于 3 * 4， 也就是变大了 2 的2次方倍 ） 
 ``` 
 可以这么理解，二级制后所有位数左移n位， 其效果相当于` << `左边数 ，会被放大2的n次方 
  
 假设` i `为 `3 `, 也就是ctx 中第4个数据发生了改变，`1 << (3%31)` 计算出的结果是 `8`， 转变为二进制后是 `1000`。 
  
 #### `|=` 啥意思？ 
 ``` 
 Operator: x |= y  
 Meaning:  x  = x | y  
 ``` 
  
 `|= `是按位或赋值运算符， 运算过程是使用两个操作数的二进制，对它们执行按位或运算，并将结果赋值给变量。 
  
 注意哦。 
  
 我们最初的代码是这样的： 
 ```js 
 component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31)) 
 ``` 
 为了好理解，可以改写成下面这个样子： 
  
 ```js 
 let item = component.$$.dirty[(i / 31) | 0] 
 item = item | (1 << (i % 31)); 
 ``` 
  
 上文说过，假设 i 为 3， `1 << (i % 31) `计算为 8， 二进制表示为 
 `0000000000000000000000000001000` 
 假如 item 二进制表示为` 0000000000000000000000000000001`，`| `按位或计算后，从右开始第4位设置为 1。 
 也就是说， 将指定的那一位设置为1，无论其值之前是多少。 
  
 #### 小结 
 这一小节，你只需要了解到，Svelte 通过一顿 JS位操作符的操作, 把脏数据在 `component.$$.dirty` 的二进制上对应的位置设置为`1`。 
  
 ### 更新哪些DOM节点 
 上面一个小节，我们知道了， Svelte会用 `component.$$.dirty `数组存储第几个是脏数据。 
  
 那么，有了脏数据之后，Svelte就会在一帧16ms的微任务调用更新DOM节点的方法。更新DOM节点的方法，最终会调用一个`p` 方法。 在 `p `方法 被调用之前，Svelte 并不知道要具体更新哪些DOM节点。 
  
 `p `方法的作用只有一个，就是判断出需要更新的DOM节点，并且调用DOM原生的方法更新之。 
  
 为了测试，我们模拟一个Svelte 组件，这个Svelte 组件会修改33个数据，通过Svelte 提供的特别好的在线 repl 工具，可以方便的看到编译出来的产物，如下图所示： 
 ![image.png](https://pan.udolphin.com/files/image/2021/7/abf75aaeb58c1f2450de7900a12e8bb5.png) 
  
 编译出来的`p` 方法如下，大概长这个样子, 因为我们没有开启代码压缩，所以看起来代码有很多: 
 ```js 
 p(ctx, dirty) { 
  if (dirty[0] & /*name1*/ 1) set_data(t1, /*name1*/ ctx[0]); 
  if (dirty[0] & /*name2*/ 2) set_data(t3, /*name2*/ ctx[1]); 
  if (dirty[0] & /*name3*/ 4) set_data(t5, /*name3*/ ctx[2]); 
  if (dirty[0] & /*name4*/ 8) set_data(t7, /*name4*/ ctx[3]); 
  if (dirty[0] & /*name5*/ 16) set_data(t9, /*name5*/ ctx[4]); 
  if (dirty[0] & /*name6*/ 32) set_data(t11, /*name6*/ ctx[5]); 
  if (dirty[0] & /*name7*/ 64) set_data(t13, /*name7*/ ctx[6]); 
  if (dirty[0] & /*name8*/ 128) set_data(t15, /*name8*/ ctx[7]); 
  if (dirty[0] & /*name9*/ 256) set_data(t17, /*name9*/ ctx[8]); 
  if (dirty[0] & /*name10*/ 512) set_data(t19, /*name10*/ ctx[9]); 
  if (dirty[0] & /*name11*/ 1024) set_data(t21, /*name11*/ ctx[10]); 
  if (dirty[0] & /*name12*/ 2048) set_data(t23, /*name12*/ ctx[11]); 
  if (dirty[0] & /*name13*/ 4096) set_data(t25, /*name13*/ ctx[12]); 
  if (dirty[0] & /*name14*/ 8192) set_data(t27, /*name14*/ ctx[13]); 
  if (dirty[0] & /*name15*/ 16384) set_data(t29, /*name15*/ ctx[14]); 
  if (dirty[0] & /*name16*/ 32768) set_data(t31, /*name16*/ ctx[15]); 
  if (dirty[0] & /*name17*/ 65536) set_data(t33, /*name17*/ ctx[16]); 
  if (dirty[0] & /*name18*/ 131072) set_data(t35, /*name18*/ ctx[17]); 
  if (dirty[0] & /*name19*/ 262144) set_data(t37, /*name19*/ ctx[18]); 
  if (dirty[0] & /*name20*/ 524288) set_data(t39, /*name20*/ ctx[19]); 
  if (dirty[0] & /*name21*/ 1048576) set_data(t41, /*name21*/ ctx[20]); 
  if (dirty[0] & /*name22*/ 2097152) set_data(t43, /*name22*/ ctx[21]); 
  if (dirty[0] & /*name23*/ 4194304) set_data(t45, /*name23*/ ctx[22]); 
  if (dirty[0] & /*name24*/ 8388608) set_data(t47, /*name24*/ ctx[23]); 
  if (dirty[0] & /*name25*/ 16777216) set_data(t49, /*name25*/ ctx[24]); 
  if (dirty[0] & /*name26*/ 33554432) set_data(t51, /*name26*/ ctx[25]); 
  if (dirty[0] & /*name27*/ 67108864) set_data(t53, /*name27*/ ctx[26]); 
  if (dirty[0] & /*name28*/ 134217728) set_data(t55, /*name28*/ ctx[27]); 
  if (dirty[0] & /*name29*/ 268435456) set_data(t57, /*name29*/ ctx[28]); 
  if (dirty[0] & /*name30*/ 536870912) set_data(t59, /*name30*/ ctx[29]); 
  if (dirty[0] & /*name31*/ 1073741824) set_data(t61, /*name31*/ ctx[30]); 
  if (dirty[1] & /*name32*/ 1) set_data(t63, /*name32*/ ctx[31]); 
  if (dirty[1] & /*name33*/ 2) set_data(t65, /*name33*/ ctx[32]); 
 } 
 ``` 
 我们一起来看，但其实一分析，发现这一坨代码很好理解：有 `33` 个`if` 判断，如果判断为`true`，就调用 `setData`。 
  
 上面代码中的 `dirty` 变量，其实就是`component.$$.dirty` 数组，上文中我们介绍过了，回顾一下二进制大概长这个样子： 
 ```js 
 // dirty === component.$$.dirty 
 ["0000000000000000000000000000001", "0000000000000000000000000000000"] 
 ``` 
 上面代码中的 `ctx` 对象存放了数据，而且都是最新的数据：`ctx[0]` 表示第一个数据，`ctx[1]` 表示第二个数据…… 
  
 上面代码中的`set_data` 方法，封装了更新 DOM 节点的原生方法，把`ctx` 中存放的最新的数据，更新到dom节点上。 
  
 还是一头雾水不要慌，我们拿上面代码里第4行举例子： 
 ```js 
 if (dirty[0] & /*name3*/ 4) set_data(t5, /*name3*/ ctx[2]); 
 ``` 
 `if` 判断值是` dirty[0] & 4` 。`dirty`存放了哪些数据是脏数据，这里的`4` 看似是无规律的数字，转化为二进制之后变成了` 0000 0100`（从右到左第三位是 `1`）， 也就是 表示第三个数据脏数据。 
  
 这里的 `if` 判断条件是：拿 `dirty[0] `( `0000000000000000000000000000001`)和`4` （`4` 转变为二进制是 `0000 0100`）做`按位并`操作。那么我们可以思考一下了，这个`按位并 `操作什么时候会返回 `1`呢？ 
  
 只有当`4` 转变为二进制是` 0000 0100`的第三位是` 1` ，同时` dirty[0]` 的二进制的第三位也是`1` 时, 才会返回 `1`。 换句话来说， `dirty[0]` 的二进制的第三位也是`1` ，意味着第三个数据是脏数据。简单来说，只要第三个数据是脏数据，就会走入到这个if 判断中，执行 `set_data(t5, /*name3*/ ctx[2])`， 更新 `t5` 这个 DOM 节点。 
  
 当我们分析到这里，已经看出了一些眉目，让我们站在更高的一个层次去看待这 30多行代码： 它们其实是保存了这**33个变量和真实DOM 节点**之间的对应关系，哪些变量脏了，Svelte 会走入不同的`if` 体内直接更新对应的DOM节点，而不需要复杂 Virtual DOM Diff 算出更新哪些DOM节点。 
  
 这 30多行代码，是Svelte 编译了我们写的Svelte 组件之后的产物，在Svelte 编译时，就已经分析好了，数据 和 DOM 节点之间的对应关系，在数据发生变化时，可以非常高效的来更新DOM节点。 
  
 #### 小结 
 一个前端框架，不管是Vue还是 React 更新了数据之后，需要考虑更新哪个DOM节点，也就是，需要知道，脏数据和待更新的真实DOM之间的映射。 
 Vue, React 是通过 Virtual DOM  来 Diff 计算出更新哪些DOM节点更划算。 
 而Svelte是把数据和真实DOM之间的映射关系，在编译的时候就通过AST等算出来，保存在`p` 函数中。 
  
 ## 总结 
 本文介绍 了Svelte 框架的特性、优缺点和底层原理。 
  
 Svelte 算是让 Web 页面的工作方式回归到最原始的方法了，当然我说的不是开发方式，这里我指的是浏览器真实在执行的工作。传统的 Web 开发基本都是 jQuery 的天下，$('xxx') 出来一个元素然后直接对它进行操作，但随着应用规模的扩大，这种没有集中状态管理，只靠粗暴操作 DOM 的方式就行不太通了，架构不好的代码维护起来也会很费劲。 
  
 为了解决上述痛点，以 Angular 1.0 为代表的 MVC 框架诞生了，紧接着 React、Vue 等流行框架就如雨后春笋般地出现了。对于我而言，Svelte 实现**响应式**确实特立独行。作为一个最近才火起来的框架，Svelte的生态还远远不及已经普及那么多年的React和Vue，这也是我觉得就目前来说Svelte还撼动不了React和Vue的地位的原因。不过Svelte会不会因为它的先进性而迎来生态大爆发呢？ 
  
 Svelte 为我们提供了  Virtual DOM 之外另一种可能性，通过静态编译减少框架运行时的代码量，让编译打包后的产物在完整实现功能的同时又有极高的性能和很小的体积，未来还将有很大的挖掘空间。 
  
 感谢您的阅读，我是数字办的吴昕，期待与您共同成长！！！