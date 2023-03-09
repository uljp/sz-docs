(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{295:function(n,e,t){"use strict";t.r(e);var a=t(14),o=Object(a.a)({},(function(){var n=this,e=n._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"前言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[n._v("#")]),n._v(" 前言")]),n._v(" "),e("p",[n._v("一直都是React用的比较多，对于Vue3没有深入了解过，所以今天想从源码的角度深入了解一下。")]),n._v(" "),e("p",[n._v("Vue.js 3.0 (以下简称Vue3)，正式发布在 2020 年 09 月 18 日")]),n._v(" "),e("ul",[e("li",[n._v("vue3源码地址："),e("a",{attrs:{href:"https://github.com/vuejs/core",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://github.com/vuejs/core"),e("OutboundLink")],1)])]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pic1.zhimg.com/v2-5f4e219c7356cf7f2efd5c07a22dd520_720w.jpg?source=172ae18b",alt:"查看源图像"}})]),n._v(" "),e("h1",{attrs:{id:"源码目录"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#源码目录"}},[n._v("#")]),n._v(" 源码目录")]),n._v(" "),e("p",[n._v("学习源码之前，我们首先对它的目录结构了解一下，在这里我们只重点关注package目录，整个结构如下：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/11/b1afaf64edfa84b772259bdb82a1debb.png",alt:""}})]),n._v(" "),e("p",[n._v("Vue3采用 monorepo 管理项目代码的方式。这些模块拆分到不同的package中，每个package有各自的API、类型定义和测试。这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确。")]),n._v(" "),e("ul",[e("li",[n._v("compiler-core: 与平台无关的编译模块，例如基础的 baseCompile 编译模版文件, baseParse生成AST")]),n._v(" "),e("li",[n._v("compiler-dom: 基于compiler-core，专为浏览器的编译模块，可以看到它基于baseCompile，baseParse，重写了complie、parse")]),n._v(" "),e("li",[n._v("compiler-sfc: 用来编译vue单文件组件")]),n._v(" "),e("li",[n._v("compiler-ssr: 服务端渲染相关的")]),n._v(" "),e("li",[n._v("reactivity: vue独立的响应式模块")]),n._v(" "),e("li",[n._v("runtime-core: 也是与平台无关的基础模块，有vue的各类API，虚拟dom的渲染器")]),n._v(" "),e("li",[n._v("runtime-dom: 基于runtime-core，针对浏览器的运行时")]),n._v(" "),e("li",[n._v("vue: 引入导出 runtime-core，还有编译方法")])]),n._v(" "),e("p",[n._v("除掉服务端渲染相关代码、开发调试、测试相关代码，我们可以看到package中重要的模块有5个将它们的依赖关系体现出来，则大致是这样的")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/11/4ad786efc8ecc58eb5863bf8fa98c05a.png",alt:""}})]),n._v(" "),e("p",[n._v("我们从模块关系图中可以看到Vuejs3有两个阶段：编译时和运行时。")]),n._v(" "),e("p",[e("strong",[n._v("编译时")])]),n._v(" "),e("p",[n._v("我们平常开发时写的.vue文件是无法直接运行在浏览器中的，所以在"),e("strong",[n._v("编译阶段")]),n._v("，需要将.vue文件编译生成对应的js代码，vue组件对应的template模板会被"),e("strong",[n._v("编译器")]),n._v("转化为render函数。")]),n._v(" "),e("p",[e("strong",[n._v("运行时")])]),n._v(" "),e("p",[n._v("接下来，当编译后的代码真正运行在浏览器时，便会"),e("strong",[n._v("执行render函数")]),n._v("并返回VNode，也就是所谓的虚拟DOM，最后将VNode渲染成真实的DOM节点。")]),n._v(" "),e("blockquote",[e("p",[e("strong",[n._v("思考")]),n._v("： vue文件是如何转换成DOM节点，并渲染到浏览器上的？")])]),n._v(" "),e("p",[n._v("了解完Vue组件渲染的思路后，接下来让我们从源码的角度深入了解一下"),e("strong",[n._v("Vue组件的整个渲染流程")]),n._v("是怎么样的？")]),n._v(" "),e("h1",{attrs:{id:"createapp入口"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#createapp入口"}},[n._v("#")]),n._v(" createApp入口")]),n._v(" "),e("p",[n._v("在Vue3中，每个Vue应用都是通过createApp函数创建一个新的应用实例开始的：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("import { createApp } from 'vue'\nimport App from './App.vue'\n \ncreateApp(App).mount('#app') \n")])])]),e("p",[n._v("这里的App是根组件，作为渲染组件的起点")]),n._v(" "),e("p",[n._v("mount('#app') 表示要被挂载的DOM节点")]),n._v(" "),e("p",[n._v("由此可见，初始化渲染共分为两步：")]),n._v(" "),e("p",[n._v("1、创建app")]),n._v(" "),e("p",[n._v("2、挂载app")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("export const createApp = ((...args) => {\n  // 第一步：创建了app实例\n  const app = ensureRenderer().createApp(...args)\n  // 第二步：重写了app.mount方法\n  const { mount } = app\n  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {\n    ...\n  }\n  //第三步：返回app实例\n  return app\n})\n")])])]),e("h1",{attrs:{id:"创建app"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建app"}},[n._v("#")]),n._v(" 创建app")]),n._v(" "),e("h3",{attrs:{id:"ensurerenderer"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ensurerenderer"}},[n._v("#")]),n._v(" ensureRenderer")]),n._v(" "),e("p",[n._v("首先通过"),e("code",[n._v("ensureRenderer")]),n._v("创建web端的渲染器")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("// 渲染时使用的一些配置方法，如果在浏览器环境就是会传入很多 DOM API\nlet rendererOptions = {\n  patchProp,\n  forcePatchProp,\n  insert,\n  remove,\n  createElement,\n  cloneNode,\n  ...\n}\n// lazy create the renderer - this makes core renderer logic tree-shakable\n// in case the user only imports reactivity utilities from Vue.\nlet renderer\n\nfunction ensureRenderer () {\n  return renderer || (renderer = createRenderer(rendererOptions))\n}\n")])])]),e("h3",{attrs:{id:"createrenderer-basecreaterenderer"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#createrenderer-basecreaterenderer"}},[n._v("#")]),n._v(" createRenderer&baseCreateRenderer")]),n._v(" "),e("p",[n._v("接下来进入"),e("code",[n._v("createRenderer")]),n._v("方法，会返回一个"),e("code",[n._v("baseCreateRenderer")]),n._v("方法。这里是为了跨平台做准备的，可以根据不同的平台传入不同的 "),e("code",[n._v("options")]),n._v("去生成不同的渲染器。 在最后"),e("code",[n._v("baseCreateRenderer")]),n._v("会返回一个"),e("code",[n._v("render")]),n._v("方法和最终的"),e("code",[n._v("createApp")]),n._v("(也就是"),e("code",[n._v("createAppAPI")]),n._v(") 方法。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("export function createRenderer< HostNode = RendererNode, HostElement = RendererElement>(options: RendererOptions<HostNode, HostElement>) {\n  return baseCreateRenderer<HostNode, HostElement>(options)\n}\n\nfunction baseCreateRenderer(\n  options: RendererOptions,  //跨平台设计，不同平台传入不同的options\n  createHydrationFns?: typeof createHydrationFunctions\n) {\n  \n  // 第一步：各平台传入的options中的API方法 重新统一命名\n  const {\n    insert: hostInsert,\n    remove: hostRemove,\n    patchProp: hostPatchProp,\n    ...\n  } = options\n \n  // 第二步：定义各种渲染需要的方法\n  const patch = (n1, n2,container...)=>{...}\n  const render = (vnode, container, isSVG) => {...}\n  const mountComponent = (initialVNode, container...) => {...}\n  ....\n  \n  // 第三步：返回一个含有 {render, hydrate, createApp} 属性的对象\n  return {\n    render,\n    hydrate,//服务器端渲染相关\n    createApp: createAppAPI(render, hydrate)\n  }\n}\n")])])]),e("h3",{attrs:{id:"createappapi"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#createappapi"}},[n._v("#")]),n._v(" createAppAPI")]),n._v(" "),e("p",[e("code",[n._v("createAppAPI")]),n._v(" 方法通过闭包返回createApp方法，并把render方法保留下来供内部使用，接受了 rootComponent 和 rootProps 两个参数，我们在应用层面执行 "),e("code",[n._v("createApp(App)")]),n._v(" 方法时，会把 App 组件对象作为根组件传递给 rootComponent。这样，createApp 内部就创建了一个 app 对象，它会提供 mount 方法，这个方法是用来挂载组件的。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v(" export function createAppAPI<HostElement>(\n render: RootRenderFunction,  // 在baseCreateRenderer中传入的render\n  hydrate?: RootHydrateFunction\n){  \n  // 真正创建app的入口\n  return function createApp(rootComponent, rootProps = null) {\n    if (rootProps != null && !isObject(rootProps)) {\n      __DEV__ && warn(`root props passed to app.mount() must be an object.`)\n      rootProps = null\n    }\n    // 创建vue应用上下文\n    const context = createAppContext()\n    const installedPlugins = new Set()\n \n    let isMounted = false\n    // 创建了app实例，并返回\n    const app: App = (context.app = {\n      _uid: uid++,\n      _component: rootComponent as ConcreteComponent,\n      _props: rootProps,\n      _container: null,\n      _context: context,\n      version,\n      get config() {return context.config},\n      set config(v) {},\n \n      use(plugin: Plugin, ...options: any[]) {...},\n      mixin(mixin: ComponentOptions) {...},\n      component(name: string, component?: Component): any {...},\n      directive(name: string, directive?: Directive) {...},\n      mount(rootContainer: HostElement,isHydrate?: boolean,isSVG?: boolean): any {...},\n      unmount() {...},\n      provide(key, value) {...}\n    })\n    //返回app\n    return app\n  }\n}\n")])])]),e("p",[n._v("到这里为止，我们的 app 实例就创建好了。我们可以看出来，vue3 的设计方式是将平台相关的操作抽离出去，这样对多平台框架开发者及其友好，只需要关注对应平台的节点操作，创建渲染器即可。")]),n._v(" "),e("h1",{attrs:{id:"重写app-mount方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#重写app-mount方法"}},[n._v("#")]),n._v(" 重写app.mount方法")]),n._v(" "),e("p",[n._v("我们回到入口，获取到app实例后，vue把实例中的mount方法缓存一下，并且重写mount方法。"),e("strong",[n._v("为什么要重写mount方法呢？")]),e("code",[n._v("为了支持跨平台渲染")]),n._v("，不同平台具有不同的渲染器，不同渲染器中会调用标准的baseCreateRenderer来保证核心的渲染流程是一致的。而createApp函数内部的"),e("code",[n._v("app.mount方法是标准的可跨平台的组件渲染流程")]),n._v("。所以在这段代码中不应该包含特定平台相关的逻辑，因此需要在外部重写这个方法，来完善Web平台下的渲染逻辑。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("export const createApp = ((...args) => {\n   ...\n  // 缓存已有的mount方法\n  const { mount } = app\n  // 重写mount\n  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {\n    // 处理containerOrSelector，获取真实的DOM元素\n    const container = normalizeContainer(containerOrSelector)\n    if (!container) return\n    \n    // 获取定义的 Vue app 对象, 之前的 rootComponent\n    const component = app._component\n    // 如果不是函数、没有 render 方法、没有 template 使用 DOM 元素内的 innerHTML 作为内容\n    if (!isFunction(component) && !component.render && !component.template) {\n      component.template = container.innerHTML\n    }\n    \n    // 挂载之前清空内容\n    container.innerHTML = ''\n    // 真正的挂载，调用上面缓存原定义的mount方法\n    const proxy = mount(container, false, container instanceof SVGElement)\n    if (container instanceof Element) {\n      container.removeAttribute('v-cloak')\n      container.setAttribute('data-v-app', '')\n    }\n    return proxy\n  }\n  return app\n }\n")])])]),e("h3",{attrs:{id:"createappapi-中的mount"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#createappapi-中的mount"}},[n._v("#")]),n._v(" createAppAPI 中的mount")]),n._v(" "),e("p",[n._v("在上面createAppAPI创建app实例方法中，定义了mount：")]),n._v(" "),e("p",[n._v("mount方法内部的流程也比较清晰，首先是创建vnode，之后是渲染vnode，并将其挂载到rootContainer上。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function createAppAPI(render, hydrate) {\n  // 真正创建app的入口\n  return function createApp(rootComponent, rootProps = null) {\n    // ...\n    const app = (context.app = {\n      // 挂载根组件\n      mount(rootContainer, isHydrate, isSVG) {\n        if (!isMounted) {\n          // 创建根组件对应的vnode\n          const vnode = createVNode(rootComponent, rootProps);\n          // 根级vnode存在应用上下文\n          vnode.appContext = context;\n          if (isHydrate && hydrate) {  // 服务端渲染相关\n            hydrate(vnode as VNode<Node, Element>, rootContainer as any)\n          } else {\n          // 将虚拟vnode节点渲染成真实节点，并挂载\n            render(vnode, rootContainer, isSVG)\n          }\n          isMounted = true;\n          // 记录应用的根组件容器\n          app._container = rootContainer;\n          rootContainer.__vue_app__ = app;\n          app._instance = vnode.component;\n          return vnode.component.proxy;\n        }\n      }\n    });\n    return app;\n  };\n}\n")])])]),e("p",[n._v("到目前为止可以做一个小的总结:")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/11/dca4f08dc3b7264bd4d78f079651e141.png",alt:""}})]),n._v(" "),e("p",[n._v("接下来就是创建vnode和渲染vnode")]),n._v(" "),e("h2",{attrs:{id:"创建vnode"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建vnode"}},[n._v("#")]),n._v(" 创建vnode")]),n._v(" "),e("p",[n._v("vnode 本质上是 JavaScript 对象，用来描述各个节点的信息。例如当前节点的类型，当前节点的class,style等属性以及子元素的节点信息。")]),n._v(" "),e("h3",{attrs:{id:"createvnode"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#createvnode"}},[n._v("#")]),n._v(" createVNode")]),n._v(" "),e("p",[n._v("createVNode方法就是创建一个对象并初始化各个属性。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function createVNode(type, props, children) {\n  // ...\n  // class & style normalization\n  if (props) {\n    let { class: klass, style }= props \n    props.class = normalizeClass(klass)\n    props.style = normalizeStyle(style)\n  }\n  \n  // vnode 类型\n  const shapeFlag =isString(type)\n    ? ShapeFlags.ELEMENTc\n    : __FEATURE_SUSPENSE__ && isSuspense(type)\n      ? ShapeFlags.SUSPENSE\n      : isTeleport(type)\n        ? ShapeFlags.TELEPORT\n        : isObject(type)\n          ? ShapeFlags.STATEFUL_COMPONENT\n          : isFunction(type)\n            ? ShapeFlags.FUNCTIONAL_COMPONENT\n            : 0 \n    const vnode: VNode = {\n      __v_isVNode: true,\n      [ReactiveFlags.SKIP]: true,\n      type,\n      props,\n      key: props && normalizeKey(props),\n      ref: props && normalizeRef(props),\n      scopeId: currentScopeId,\n      children: null,\n      component: null,\n      suspense: null,\n      ssContent: null,\n      ssFallback: null,\n      dirs: null,\n      transition: null,\n      el: null,\n      anchor: null,\n      target: null,\n      targetAnchor: null,\n      staticCount: 0,\n      shapeFlag,\n      patchFlag,\n      dynamicProps,\n      dynamicChildren: null,\n      appContext: null\n    }\n    // 处理 children 子节点\n    normalizeChildren(vnode, children)    \n}\n")])])]),e("p",[e("strong",[n._v("shapeFlag属性")]),n._v("是vnode在patch阶段过程中用到的信息标识，它主要用来定义描述组件的分类，依据不同的组件类型执行对应的处理逻辑。使用二进制的方式描述了组件的类型。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v(" export const enum ShapeFlags {\n  ELEMENT = 1, // 表示一个普通的HTML元素\n  FUNCTIONAL_COMPONENT = 1 << 1, // 函数式组件\n  STATEFUL_COMPONENT = 1 << 2,  // 有状态组件\n  TEXT_CHILDREN = 1 << 3, // 子节点是文本\n  ARRAY_CHILDREN = 1 << 4, // 子节点是数组\n  SLOTS_CHILDREN = 1 << 5, // 子节点是插槽\n  TELEPORT = 1 << 6, // 表示vnode描述的是个teleport组件\n  SUSPENSE = 1 << 7, // 表示vnode描述的是个suspense组件\n  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 表示需要被keep-live的有状态组件\n  COMPONENT_KEPT_ALIVE = 1 << 9, // 已经被keep-live的有状态组件\n  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT \n  // 组件，有状态组件和函数式组件的统称\n}\n")])])]),e("h2",{attrs:{id:"渲染vnode"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#渲染vnode"}},[n._v("#")]),n._v(" 渲染vnode")]),n._v(" "),e("h3",{attrs:{id:"render"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#render"}},[n._v("#")]),n._v(" render")]),n._v(" "),e("p",[n._v("通过createVNode获取到根组件对应的vnode，然后执行render方法。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("// 实际调用的render方法即为baseCreateRenderer方法中缓存的render方法\nfunction baseCreateRenderer() {\n  const render = (vnode, container) => {\n    if (vnode == null) {\n      if (container._vnode) {\n        // 卸载组件\n        unmount()\n      }\n    } else {\n      // 正常挂载\n      patch(container._vnode || null, vnode, container)\n    }\n    container._vnode = vnode\n  }\n}\n")])])]),e("ul",[e("li",[n._v("当传入的vnode为null&存在老的vnode，则进行卸载组件")]),n._v(" "),e("li",[n._v("否则，正常挂载")])]),n._v(" "),e("h3",{attrs:{id:"patch"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#patch"}},[n._v("#")]),n._v(" patch")]),n._v(" "),e("p",[n._v("接下来，我们来看下render过程中的patch函数的实现：")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const patch: PatchFn = (\n    n1, // 老 VNODE\n    n2, // 新 VNODE\n    container, // 挂载的节点\n    anchor = null,\n    parentComponent = null,\n    parentSuspense = null,\n    isSVG = false,\n    slotScopeIds = null,\n    optimized = false\n  ) => {\n    // 如果 老节点存在  并且 n1 n2 的类型不同\n    // 卸载 老vnode\n    if (n1 && !isSameVNodeType(n1, n2)) {\n      anchor = getNextHostNode(n1)\n      unmount(n1, parentComponent, parentSuspense, true)\n      n1 = null\n    }\n\n    // 从 新vnode 中获取 type , ref , shapeFlag\n去匹配\n    const { type, ref, shapeFlag } = n2\n    switch (type) {\n      case Text:\n        processText(n1, n2, container, anchor)\n        break\n      case Comment:\n        processCommentNode(n1, n2, container, anchor)\n        break\n      case Static:\n        if (n1 == null) {\n          mountStaticNode(n2, container, anchor, isSVG)\n        } else if (__DEV__) {\n          patchStaticNode(n1, n2, container, isSVG)\n        }\n        break\n      case Fragment:\n        processFragment(\n          n1,\n          n2,\n          container,\n          anchor,\n          parentComponent,\n          parentSuspense,\n          isSVG,\n          slotScopeIds,\n          optimized\n        )\n        break\n      default:\n        if (shapeFlag & ShapeFlags.ELEMENT) {\n          // match element\n          processElement(\n            n1,\n            n2,\n            container,\n            anchor,\n            parentComponent,\n            parentSuspense,\n            isSVG,\n            slotScopeIds,\n            optimized\n          )\n        } else if (shapeFlag & ShapeFlags.COMPONENT) {\n          // match component\n          // 此时的 shapeFlag 会进入这个条件\n          processComponent(\n            n1,\n            n2,\n            container,\n            anchor,\n            parentComponent,\n            parentSuspense,\n            isSVG,\n            slotScopeIds,\n            optimized\n          )\n        } else if (shapeFlag & ShapeFlags.TELEPORT) {\n          // match teleport\n          ...\n        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {\n          // match suspense\n         ...\n        }\n    }\n\n   ...\n  }\n")])])]),e("p",[n._v("可以看到, patch 方法核心目标就是 比较 新老 vnode 节点 并对其进行差异的操作. 在初始化渲染时 , 会先 patch 我们的根组件 . 于是会走到 processComponent 这个逻辑分支, 看一下他具体的实现")]),n._v(" "),e("h3",{attrs:{id:"processcomponent"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#processcomponent"}},[n._v("#")]),n._v(" processComponent")]),n._v(" "),e("p",[n._v("处理 component")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const processComponent = (\n  n1: VNode | null,\n  n2: VNode,\n  container: RendererElement,\n  anchor: RendererNode | null,\n  parentComponent: ComponentInternalInstance | null,\n  parentSuspense: SuspenseBoundary | null,\n  isSVG: boolean,\n  slotScopeIds: string[] | null,\n  optimized: boolean\n) => {\n  n2.slotScopeIds = slotScopeIds\n  // 如果 老vnode 是空的\n  if (n1 == null) {\n    // 如果 新vnode 是 KEPT_ALIVE\n    if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {\n      // more\n    } else {\n      // 挂载节点\n      mountComponent(\n        n2,\n        container,\n        anchor,\n        parentComponent,\n        parentSuspense,\n        isSVG,\n        optimized\n      )\n    }\n  }\n  else {\n   // 对比更新\n    updateComponent(n1, n2, optimized)\n  }\n}\n")])])]),e("h3",{attrs:{id:"mountcomponent"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mountcomponent"}},[n._v("#")]),n._v(" mountComponent")]),n._v(" "),e("p",[n._v("我们编写的一个个component,在HTML中是不存在标签的，所以Vue需要为每一个组件创建实例并去构建组件间的关系。那么拿到一个组件vnode挂载时。首先就是要创建当前组件的实例。然后对创建好的实例进行设置。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const mountComponent: MountComponentFn = (\n    initialVNode, // 初始化的 vnode\n    container, // 挂载目标\n    anchor,\n    parentComponent,\n    parentSuspense,\n    isSVG,\n    optimized\n  ) => {\n    // 创建组件实例\n    // createComponentInstance 初始化一个组件实例模型\n    const compatMountInstance =\n      __COMPAT__ && initialVNode.isCompatRoot && initialVNode.component\n    // 这个时候就把组件实例挂载到了组件vnode的component属性上了\n    const instance: ComponentInternalInstance =\n      compatMountInstance ||\n      (initialVNode.component = createComponentInstance(\n        initialVNode,\n        parentComponent,\n        parentSuspense\n      ))\n\n\n    // 处理 prop slot 和 setup\n    // 设置组件实例\n    if (!(__COMPAT__ && compatMountInstance)) {\n      setupComponent(instance)\n    }\n\n\n    // 设置并运行带有副作用的渲染函数\n    setupRenderEffect(\n      instance,\n      initialVNode,\n      container,\n      anchor,\n      parentSuspense,\n      isSVG,\n      optimized\n    )\n  }\n")])])]),e("h3",{attrs:{id:"setupcomponent"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#setupcomponent"}},[n._v("#")]),n._v(" setupComponent")]),n._v(" "),e("p",[n._v("调用setupComponent方法后会对如prop,slots,生命周期函数等进行初始化")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("export function isStatefulComponent(instance: ComponentInternalInstance) {\n  return instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT\n}\n\nexport let isInSSRComponentSetup = false\n\nexport function setupComponent(\n  instance: ComponentInternalInstance,\n  isSSR = false\n) {\n  isInSSRComponentSetup = isSSR\n\n  const { props, children } = instance.vnode\n  //是否有状态组件，非函数式组件\n  const isStateful = isStatefulComponent(instance)\n  //初始化props和slots\n  initProps(instance, props, isStateful, isSSR)\n  initSlots(instance, children)\n  //如果组件有状态，挂载setup信息\n  const setupResult = isStateful\n    ? setupStatefulComponent(instance, isSSR)\n    : undefined\n  isInSSRComponentSetup = false\n  return setupResult\n}\n")])])]),e("p",[n._v("setupComponent会返回一个setupResult=setupStatefulComponent的返回值， 就是用户配置setup函数中return的值")]),n._v(" "),e("h3",{attrs:{id:"setupstatefulcomponent"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#setupstatefulcomponent"}},[n._v("#")]),n._v(" setupStatefulComponent")]),n._v(" "),e("p",[n._v("开始处理注册的 setup")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("function setupStatefulComponent(\n  instance: ComponentInternalInstance,\n  isSSR: boolean\n) {\n   ...\n\n  // 给实例添加一个缓存对象\n  instance.accessCache = Object.create(null)\n  // 创建渲染上下文代理\n  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers))\n  // 调用 setup 获得return的东西\n  const { setup } = Component\n  // 判断组件是否存在setup\n  if (setup) {\n    ...\n  } else {\n    finishComponentSetup(instance, isSSR)\n  }\n}\n")])])]),e("h3",{attrs:{id:"finishcomponentsetup"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#finishcomponentsetup"}},[n._v("#")]),n._v(" finishComponentSetup")]),n._v(" "),e("p",[n._v("获取 render function && 兼容 vue2.x optionAPI")]),n._v(" "),e("p",[n._v("设置组件实例的render方法:")]),n._v(" "),e("ul",[e("li",[n._v("若组件存在render方法，则instance.render = component.render")]),n._v(" "),e("li",[n._v("若组件存在template模板，则instance.render = compile(template）")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("export function finishComponentSetup(\n  instance: ComponentInternalInstance,\n  isSSR: boolean,\n  skipOptions?: boolean\n) {\n  ...\n\n\n  // 如果实例没有 render 函数\n   if (!instance.render) {\n    // 检查 用户如果没在 其他位置注册 render function\n    if (compile && !Component.render) {\n      // 拿到 Component.template\n      // 即容器下的 innerHTML\n      const template =\n        (__COMPAT__ &&\n          instance.vnode.props &&\n          instance.vnode.props['inline-template']) ||\n        Component.template\n\n      if (template) {\n        ...\n        // 执行 compile 方法 \n        // 获得 render function 挂载在component上\n        Component.render = compile(template, finalCompilerOptions)\n      }\n    }\n    // 拿到 render function 之后\n    // 给 整个实例挂载 render\n    instance.render = (Component.render || NOOP) as InternalRenderFunction\n  }\n\n  // 开始兼容 2.x的API\n  // 所以 setup 解析完成才开始兼容2.x的API\n  // support for 2.x options\n  if (__FEATURE_OPTIONS_API__ && !(__COMPAT__ && skipOptions)) {\n    currentInstance = instance\n    applyOptions(instance)\n    currentInstance = null\n  }\n}\n")])])]),e("p",[n._v("当我们执行完这个方法后, 我们回到 mountComponent 这个方法. 他执行了 setupRenderEffect")]),n._v(" "),e("h3",{attrs:{id:"setuprendereffect"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#setuprendereffect"}},[n._v("#")]),n._v(" setupRenderEffect")]),n._v(" "),e("p",[n._v("核心方法 , 依赖收集 , 初始化渲染 , 后续的更新 , 都是通过这个方法进行的 。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const setupRenderEffect = (instance, initialVNode, container, ...) => {\n  // 创建响应式的副作用函数\n  const componentUpdateFn = () => {\n    // 首次渲染\n    if (!instance.isMounted) {\n      // 渲染组件生成子树vnode\n      const subTree = (instance.subTree = renderComponentRoot(instance));\n      patch(null, subTree, container, ...);\n      initialVNode.el = subTree.el;\n      instance.isMounted = true;\n    }\n    else {\n      // 更新\n    }\n  };\n \t// 创建渲染effcet\n  const effect = new ReactiveEffect(\n    componentUpdateFn, \n    () => queueJob(instance.update), \n    instance.scope // track it in component's effect scope\n \t);\n  const update = (instance.update = effect.run.bind(effect));\n  update.id = instance.uid;\n  update();\n};\n")])])]),e("p",[n._v("首先会创建渲染effect,并绑定副作用执行函数到组件实例的update属性上（更新流程会再次触发update函数），并立即执行update函数，触发首次更新。")]),n._v(" "),e("h3",{attrs:{id:"rendercomponentroot"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#rendercomponentroot"}},[n._v("#")]),n._v(" renderComponentRoot")]),n._v(" "),e("p",[n._v("构建 subTree")]),n._v(" "),e("p",[n._v("所有的 template 模板最终都会被编译成渲染函数。")]),n._v(" "),e("p",[n._v("而 renderComponentRoot 所做的工作就是"),e("code",[n._v("去执行编译后的渲染函数，最终得到的 subTree")]),n._v("。")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("export function renderComponentRoot(\n  instance: ComponentInternalInstance\n): VNode {\n  const {\n    type: Component,\n    vnode,\n    proxy,\n    withProxy,\n    props,\n    propsOptions: [propsOptions],\n    slots,\n    attrs,\n    emit,\n    render, // 通过 compile 获取的 render function\n    renderCache,\n    data,\n    setupState,\n    ctx,\n    inheritAttrs\n  } = instance\n  let result\n  try {\n    let fallthroughAttrs\n    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {\n      // 这里调用了render\n      // 调用之后我们会拿到容器下节点的vnode tree\n      // 之后校验 vnode tree 是否是合法的 vnode\n      // 如果拿到的是合法的 vnode 就赋值给 result\n\n      result = normalizeVNode(\n        render!.call(\n          proxyToUse,\n          proxyToUse!,\n          renderCache,\n          props,\n          setupState,\n          data,\n          ctx\n        )\n      )\n      fallthroughAttrs = attrs\n    } else {\n      // 如果是无状态组件\n       ...\n    }\n    let root = result\n    ...\n   \n  } catch (err) {\n    blockStack.length = 0\n    handleError(err, instance, ErrorCodes.RENDER_FUNCTION)\n    result = createVNode(Comment)\n  }\n  return result\n}\n")])])]),e("p",[n._v("可以看到这个方法把我们容器下的所有节点变成了 vnode .验证完 vnode 的合法性之后, 会合并和继承一些属性. 最终把 vnode 返回.")]),n._v(" "),e("p",[n._v("生成subtree后，接下来就继续通过patch方法，把subTree节点挂载到container上。我们又回到了 patch 方法.")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const patch: PatchFn = (\n    n1, // null\n    n2, // subTree\n    container, // 挂载的节点\n    anchor = null,\n    parentComponent = null,\n    parentSuspense = null,\n    isSVG = false,\n    slotScopeIds = null,\n    optimized = false\n  ) => {\n    ...\n    // shapeFlag 依然是组件类型标记\n    const { type, ref, shapeFlag } = n2\n    switch (type) {\n      case Text:\n        ...\n        break\n      case Comment:\n         ...\n        break\n      case Static:\n        ...\n        break\n      case Fragment:\n        ...\n        break\n      default:\n        if (shapeFlag & ShapeFlags.ELEMENT) {\n          // 此时我们会进入这个条件\n          processElement(\n            n1,\n            n2,\n            container,\n            anchor,\n            parentComponent,\n            parentSuspense,\n            isSVG,\n            slotScopeIds,\n            optimized\n          )\n        } else if (shapeFlag & ShapeFlags.COMPONENT) {\n          ...\n        } else if (shapeFlag & ShapeFlags.TELEPORT) {\n         ...\n        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {\n          ...\n        }\n    }\n \n  }\n")])])]),e("p",[n._v("以上就是component类型的vnode节点首次渲染挂载的流程，接下来我们来看看对于element类型的vnode节点又有什么不一样")]),n._v(" "),e("h3",{attrs:{id:"processelement"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#processelement"}},[n._v("#")]),n._v(" processElement")]),n._v(" "),e("p",[n._v("处理 element")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const processElement = (\n    n1: VNode | null,\n    n2: VNode,\n    container: RendererElement,\n    anchor: RendererNode | null,\n    parentComponent: ComponentInternalInstance | null,\n    parentSuspense: SuspenseBoundary | null,\n    isSVG: boolean,\n    slotScopeIds: string[] | null,\n    optimized: boolean\n  ) => {\n    isSVG = isSVG || (n2.type as string) === 'svg'\n    // 老节点不存在 直接挂载\n    if (n1 == null) {\n      mountElement(\n        n2,\n        container,\n        anchor,\n        parentComponent,\n        parentSuspense,\n        isSVG,\n        slotScopeIds,\n        optimized\n      )\n    }\n    // 存在 对比更新\n    else {\n      patchElement(\n        n1,\n        n2,\n        parentComponent,\n        parentSuspense,\n        isSVG,\n        slotScopeIds,\n        optimized\n      )\n    }\n")])])]),e("h3",{attrs:{id:"mountelement"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mountelement"}},[n._v("#")]),n._v(" mountElement")]),n._v(" "),e("p",[n._v("处理子元素 插入到目标节点")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const mountElement = (\n    vnode: VNode,\n    container: RendererElement,\n    anchor: RendererNode | null,\n    parentComponent: ComponentInternalInstance | null,\n    parentSuspense: SuspenseBoundary | null,\n    isSVG: boolean,\n    slotScopeIds: string[] | null,\n    optimized: boolean\n  ) => {\n    let el: RendererElement\n    let vnodeHook: VNodeHook | undefined | null\n    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode\n    ...\n    // 调用 hostCreateElement 创建真实 DOM\n    el = vnode.el = hostCreateElement(\n      vnode.type as string,\n      isSVG,\n      props && props.is,\n      props\n    )\n    // 子节点如果是 文本\n    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {\n      // 操作 dom 赋值 text\n      hostSetElementText(el, vnode.children as string)\n    }\n    // 子节点如果是 数组\n    else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {\n      // 挂载子节点\n      mountChildren(\n        vnode.children as VNodeArrayChildren,\n        el,\n        null,\n        parentComponent,\n        parentSuspense,\n        isSVG && type !== 'foreignObject',\n        slotScopeIds,\n        optimized || !!vnode.dynamicChildren\n      )\n    }\n\n    // 如果当前元素有 props\n    if (props) {\n      // 遍历 props\n      for (const key in props) {\n        if (!isReservedProp(key)) {\n          // 对props进行处理\n          hostPatchProp(\n            el,\n            key,\n            null,\n            props[key],\n            isSVG,\n            vnode.children as VNode[],\n            parentComponent,\n            parentSuspense,\n            unmountChildren\n          )\n        }\n      }\n    }\n    // 将当前操作节点 插入到对应容器下\n    hostInsert(el, container, anchor)\n  }\n")])])]),e("h3",{attrs:{id:"mountchildren"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mountchildren"}},[n._v("#")]),n._v(" mountChildren")]),n._v(" "),e("p",[n._v("挂载子节点")]),n._v(" "),e("p",[n._v("对 children 数组进行深度优先遍历，递归的调用 patch 方法依次将子节点 child 挂载到父节点上")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("const mountChildren: MountChildrenFn = (\n    children,\n    container,\n    anchor,\n    parentComponent,\n    parentSuspense,\n    isSVG,\n    slotScopeIds,\n    optimized,\n    start = 0\n  ) => {\n    for (let i = start; i < children.length; i++) {\n      const child = (children[i] = optimized\n        ? cloneIfMounted(children[i] as VNode)\n        : normalizeVNode(children[i]))\n      // 递归 patch 子元素\n      patch(\n        null,\n        child,\n        container,\n        anchor,\n        parentComponent,\n        parentSuspense,\n        isSVG,\n        slotScopeIds,\n        optimized\n      )\n    }\n  }\n")])])]),e("p",[n._v("由于是递归，所以先分析的节点后被挂载，当最外层节点被挂载时，所有的节点就都被挂载了。")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://pan.udolphin.com/files/image/2022/11/35b0ccf38f089ca96c7a4238c20ff09e.png",alt:""}})]),n._v(" "),e("h1",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[n._v("#")]),n._v(" 总结")]),n._v(" "),e("ul",[e("li",[n._v("从组件到渲染生成 DOM 需要经历 3 个过程：创建 vnode - 渲染 vnode - 生成 DOM。")]),n._v(" "),e("li",[n._v("组件是如何转变为 DOM 的：先把组件转化为 vnode，针对特定类型的 vnode 执行不同的渲染逻辑，最终调用 document 上的方法将 vnode 渲染成 DOM。")]),n._v(" "),e("li",[n._v("渲染器是一个包含了平台渲染核心逻辑的 JavaScript 对象，可以用于跨平台渲染。")]),n._v(" "),e("li",[n._v("渲染器对象中的 createApp 方法，创建了一个具有 mount 方法的 app 实例。app.mount 方法中先是用根组件创建了 vnode，然后调用渲染器对象中的 render 方法去渲染 vnode，最终通过 DOM API 将 vnode 转化为 DOM。")])])])}),[],!1,null,null,null);e.default=o.exports}}]);