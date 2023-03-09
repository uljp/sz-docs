# 前言

一直都是React用的比较多，对于Vue3没有深入了解过，所以今天想从源码的角度深入了解一下。

Vue.js 3.0 (以下简称Vue3)，正式发布在 2020 年 09 月 18 日

* vue3源码地址：[https://github.com/vuejs/core](https://github.com/vuejs/core)

![查看源图像](https://pic1.zhimg.com/v2-5f4e219c7356cf7f2efd5c07a22dd520_720w.jpg?source=172ae18b)

# 源码目录

学习源码之前，我们首先对它的目录结构了解一下，在这里我们只重点关注package目录，整个结构如下：

![](https://pan.udolphin.com/files/image/2022/11/b1afaf64edfa84b772259bdb82a1debb.png)

Vue3采用 monorepo 管理项目代码的方式。这些模块拆分到不同的package中，每个package有各自的API、类型定义和测试。这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确。

* compiler-core: 与平台无关的编译模块，例如基础的 baseCompile 编译模版文件, baseParse生成AST
* compiler-dom: 基于compiler-core，专为浏览器的编译模块，可以看到它基于baseCompile，baseParse，重写了complie、parse
* compiler-sfc: 用来编译vue单文件组件
* compiler-ssr: 服务端渲染相关的
* reactivity: vue独立的响应式模块
* runtime-core: 也是与平台无关的基础模块，有vue的各类API，虚拟dom的渲染器
* runtime-dom: 基于runtime-core，针对浏览器的运行时
* vue: 引入导出 runtime-core，还有编译方法

除掉服务端渲染相关代码、开发调试、测试相关代码，我们可以看到package中重要的模块有5个将它们的依赖关系体现出来，则大致是这样的

![](https://pan.udolphin.com/files/image/2022/11/4ad786efc8ecc58eb5863bf8fa98c05a.png)

我们从模块关系图中可以看到Vuejs3有两个阶段：编译时和运行时。

**编译时**

我们平常开发时写的.vue文件是无法直接运行在浏览器中的，所以在**编译阶段**，需要将.vue文件编译生成对应的js代码，vue组件对应的template模板会被**编译器**转化为render函数。

**运行时**

接下来，当编译后的代码真正运行在浏览器时，便会**执行render函数**并返回VNode，也就是所谓的虚拟DOM，最后将VNode渲染成真实的DOM节点。

> **思考**： vue文件是如何转换成DOM节点，并渲染到浏览器上的？

了解完Vue组件渲染的思路后，接下来让我们从源码的角度深入了解一下**Vue组件的整个渲染流程**是怎么样的？

# createApp入口

在Vue3中，每个Vue应用都是通过createApp函数创建一个新的应用实例开始的：

```
import { createApp } from 'vue'
import App from './App.vue'
 
createApp(App).mount('#app') 
```

这里的App是根组件，作为渲染组件的起点

mount('#app') 表示要被挂载的DOM节点

由此可见，初始化渲染共分为两步：

1、创建app

2、挂载app

```
export const createApp = ((...args) => {
  // 第一步：创建了app实例
  const app = ensureRenderer().createApp(...args)
  // 第二步：重写了app.mount方法
  const { mount } = app
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    ...
  }
  //第三步：返回app实例
  return app
})
```

# 创建app

### ensureRenderer

首先通过`ensureRenderer`创建web端的渲染器

```
// 渲染时使用的一些配置方法，如果在浏览器环境就是会传入很多 DOM API
let rendererOptions = {
  patchProp,
  forcePatchProp,
  insert,
  remove,
  createElement,
  cloneNode,
  ...
}
// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer

function ensureRenderer () {
  return renderer || (renderer = createRenderer(rendererOptions))
}
```

### createRenderer&baseCreateRenderer

接下来进入`createRenderer`方法，会返回一个`baseCreateRenderer`方法。这里是为了跨平台做准备的，可以根据不同的平台传入不同的 `options`去生成不同的渲染器。 在最后`baseCreateRenderer`会返回一个`render`方法和最终的`createApp`(也就是`createAppAPI`) 方法。

```
export function createRenderer< HostNode = RendererNode, HostElement = RendererElement>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}

function baseCreateRenderer(
  options: RendererOptions,  //跨平台设计，不同平台传入不同的options
  createHydrationFns?: typeof createHydrationFunctions
) {
  
  // 第一步：各平台传入的options中的API方法 重新统一命名
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    ...
  } = options
 
  // 第二步：定义各种渲染需要的方法
  const patch = (n1, n2,container...)=>{...}
  const render = (vnode, container, isSVG) => {...}
  const mountComponent = (initialVNode, container...) => {...}
  ....
  
  // 第三步：返回一个含有 {render, hydrate, createApp} 属性的对象
  return {
    render,
    hydrate,//服务器端渲染相关
    createApp: createAppAPI(render, hydrate)
  }
}
```

### createAppAPI

`createAppAPI` 方法通过闭包返回createApp方法，并把render方法保留下来供内部使用，接受了 rootComponent 和 rootProps 两个参数，我们在应用层面执行 `createApp(App)` 方法时，会把 App 组件对象作为根组件传递给 rootComponent。这样，createApp 内部就创建了一个 app 对象，它会提供 mount 方法，这个方法是用来挂载组件的。

```
 export function createAppAPI<HostElement>(
 render: RootRenderFunction,  // 在baseCreateRenderer中传入的render
  hydrate?: RootHydrateFunction
){  
  // 真正创建app的入口
  return function createApp(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject(rootProps)) {
      __DEV__ && warn(`root props passed to app.mount() must be an object.`)
      rootProps = null
    }
    // 创建vue应用上下文
    const context = createAppContext()
    const installedPlugins = new Set()
 
    let isMounted = false
    // 创建了app实例，并返回
    const app: App = (context.app = {
      _uid: uid++,
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      version,
      get config() {return context.config},
      set config(v) {},
 
      use(plugin: Plugin, ...options: any[]) {...},
      mixin(mixin: ComponentOptions) {...},
      component(name: string, component?: Component): any {...},
      directive(name: string, directive?: Directive) {...},
      mount(rootContainer: HostElement,isHydrate?: boolean,isSVG?: boolean): any {...},
      unmount() {...},
      provide(key, value) {...}
    })
    //返回app
    return app
  }
}
```

到这里为止，我们的 app 实例就创建好了。我们可以看出来，vue3 的设计方式是将平台相关的操作抽离出去，这样对多平台框架开发者及其友好，只需要关注对应平台的节点操作，创建渲染器即可。

# 重写app.mount方法

我们回到入口，获取到app实例后，vue把实例中的mount方法缓存一下，并且重写mount方法。**为什么要重写mount方法呢？**`为了支持跨平台渲染`，不同平台具有不同的渲染器，不同渲染器中会调用标准的baseCreateRenderer来保证核心的渲染流程是一致的。而createApp函数内部的`app.mount方法是标准的可跨平台的组件渲染流程`。所以在这段代码中不应该包含特定平台相关的逻辑，因此需要在外部重写这个方法，来完善Web平台下的渲染逻辑。

```
export const createApp = ((...args) => {
   ...
  // 缓存已有的mount方法
  const { mount } = app
  // 重写mount
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    // 处理containerOrSelector，获取真实的DOM元素
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    
    // 获取定义的 Vue app 对象, 之前的 rootComponent
    const component = app._component
    // 如果不是函数、没有 render 方法、没有 template 使用 DOM 元素内的 innerHTML 作为内容
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }
    
    // 挂载之前清空内容
    container.innerHTML = ''
    // 真正的挂载，调用上面缓存原定义的mount方法
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }
  return app
 }
```

### createAppAPI 中的mount

在上面createAppAPI创建app实例方法中，定义了mount：

mount方法内部的流程也比较清晰，首先是创建vnode，之后是渲染vnode，并将其挂载到rootContainer上。

```
function createAppAPI(render, hydrate) {
  // 真正创建app的入口
  return function createApp(rootComponent, rootProps = null) {
    // ...
    const app = (context.app = {
      // 挂载根组件
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          // 创建根组件对应的vnode
          const vnode = createVNode(rootComponent, rootProps);
          // 根级vnode存在应用上下文
          vnode.appContext = context;
          if (isHydrate && hydrate) {  // 服务端渲染相关
            hydrate(vnode as VNode<Node, Element>, rootContainer as any)
          } else {
          // 将虚拟vnode节点渲染成真实节点，并挂载
            render(vnode, rootContainer, isSVG)
          }
          isMounted = true;
          // 记录应用的根组件容器
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          app._instance = vnode.component;
          return vnode.component.proxy;
        }
      }
    });
    return app;
  };
}
```

到目前为止可以做一个小的总结:

![](https://pan.udolphin.com/files/image/2022/11/dca4f08dc3b7264bd4d78f079651e141.png)

接下来就是创建vnode和渲染vnode

## 创建vnode

vnode 本质上是 JavaScript 对象，用来描述各个节点的信息。例如当前节点的类型，当前节点的class,style等属性以及子元素的节点信息。

### createVNode

createVNode方法就是创建一个对象并初始化各个属性。

```
function createVNode(type, props, children) {
  // ...
  // class & style normalization
  if (props) {
    let { class: klass, style }= props 
    props.class = normalizeClass(klass)
    props.style = normalizeStyle(style)
  }
  
  // vnode 类型
  const shapeFlag =isString(type)
    ? ShapeFlags.ELEMENTc
    : __FEATURE_SUSPENSE__ && isSuspense(type)
      ? ShapeFlags.SUSPENSE
      : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
          ? ShapeFlags.STATEFUL_COMPONENT
          : isFunction(type)
            ? ShapeFlags.FUNCTIONAL_COMPONENT
            : 0 
    const vnode: VNode = {
      __v_isVNode: true,
      [ReactiveFlags.SKIP]: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      children: null,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null
    }
    // 处理 children 子节点
    normalizeChildren(vnode, children)    
}
```

**shapeFlag属性**是vnode在patch阶段过程中用到的信息标识，它主要用来定义描述组件的分类，依据不同的组件类型执行对应的处理逻辑。使用二进制的方式描述了组件的类型。

```
 export const enum ShapeFlags {
  ELEMENT = 1, // 表示一个普通的HTML元素
  FUNCTIONAL_COMPONENT = 1 << 1, // 函数式组件
  STATEFUL_COMPONENT = 1 << 2,  // 有状态组件
  TEXT_CHILDREN = 1 << 3, // 子节点是文本
  ARRAY_CHILDREN = 1 << 4, // 子节点是数组
  SLOTS_CHILDREN = 1 << 5, // 子节点是插槽
  TELEPORT = 1 << 6, // 表示vnode描述的是个teleport组件
  SUSPENSE = 1 << 7, // 表示vnode描述的是个suspense组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 表示需要被keep-live的有状态组件
  COMPONENT_KEPT_ALIVE = 1 << 9, // 已经被keep-live的有状态组件
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT 
  // 组件，有状态组件和函数式组件的统称
}
```

## 渲染vnode

### render

通过createVNode获取到根组件对应的vnode，然后执行render方法。

```
// 实际调用的render方法即为baseCreateRenderer方法中缓存的render方法
function baseCreateRenderer() {
  const render = (vnode, container) => {
    if (vnode == null) {
      if (container._vnode) {
        // 卸载组件
        unmount()
      }
    } else {
      // 正常挂载
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }
}
```

* 当传入的vnode为null&存在老的vnode，则进行卸载组件
* 否则，正常挂载

### patch

接下来，我们来看下render过程中的patch函数的实现：

```
const patch: PatchFn = (
    n1, // 老 VNODE
    n2, // 新 VNODE
    container, // 挂载的节点
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = false
  ) => {
    // 如果 老节点存在  并且 n1 n2 的类型不同
    // 卸载 老vnode
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1)
      unmount(n1, parentComponent, parentSuspense, true)
      n1 = null
    }

    // 从 新vnode 中获取 type , ref , shapeFlag
去匹配
    const { type, ref, shapeFlag } = n2
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor)
        break
      case Comment:
        processCommentNode(n1, n2, container, anchor)
        break
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG)
        } else if (__DEV__) {
          patchStaticNode(n1, n2, container, isSVG)
        }
        break
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // match element
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          // match component
          // 此时的 shapeFlag 会进入这个条件
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (shapeFlag & ShapeFlags.TELEPORT) {
          // match teleport
          ...
        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
          // match suspense
         ...
        }
    }

   ...
  }
```

可以看到, patch 方法核心目标就是 比较 新老 vnode 节点 并对其进行差异的操作. 在初始化渲染时 , 会先 patch 我们的根组件 . 于是会走到 processComponent 这个逻辑分支, 看一下他具体的实现

### processComponent

处理 component

```
const processComponent = (
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  n2.slotScopeIds = slotScopeIds
  // 如果 老vnode 是空的
  if (n1 == null) {
    // 如果 新vnode 是 KEPT_ALIVE
    if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
      // more
    } else {
      // 挂载节点
      mountComponent(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        optimized
      )
    }
  }
  else {
   // 对比更新
    updateComponent(n1, n2, optimized)
  }
}
```

### mountComponent

我们编写的一个个component,在HTML中是不存在标签的，所以Vue需要为每一个组件创建实例并去构建组件间的关系。那么拿到一个组件vnode挂载时。首先就是要创建当前组件的实例。然后对创建好的实例进行设置。

```
const mountComponent: MountComponentFn = (
    initialVNode, // 初始化的 vnode
    container, // 挂载目标
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // 创建组件实例
    // createComponentInstance 初始化一个组件实例模型
    const compatMountInstance =
      __COMPAT__ && initialVNode.isCompatRoot && initialVNode.component
    // 这个时候就把组件实例挂载到了组件vnode的component属性上了
    const instance: ComponentInternalInstance =
      compatMountInstance ||
      (initialVNode.component = createComponentInstance(
        initialVNode,
        parentComponent,
        parentSuspense
      ))


    // 处理 prop slot 和 setup
    // 设置组件实例
    if (!(__COMPAT__ && compatMountInstance)) {
      setupComponent(instance)
    }


    // 设置并运行带有副作用的渲染函数
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    )
  }
```

### setupComponent

调用setupComponent方法后会对如prop,slots,生命周期函数等进行初始化

```
export function isStatefulComponent(instance: ComponentInternalInstance) {
  return instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
}

export let isInSSRComponentSetup = false

export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  isInSSRComponentSetup = isSSR

  const { props, children } = instance.vnode
  //是否有状态组件，非函数式组件
  const isStateful = isStatefulComponent(instance)
  //初始化props和slots
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)
  //如果组件有状态，挂载setup信息
  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined
  isInSSRComponentSetup = false
  return setupResult
}
```

setupComponent会返回一个setupResult=setupStatefulComponent的返回值， 就是用户配置setup函数中return的值

### setupStatefulComponent

开始处理注册的 setup

```
function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
   ...

  // 给实例添加一个缓存对象
  instance.accessCache = Object.create(null)
  // 创建渲染上下文代理
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers))
  // 调用 setup 获得return的东西
  const { setup } = Component
  // 判断组件是否存在setup
  if (setup) {
    ...
  } else {
    finishComponentSetup(instance, isSSR)
  }
}
```

### finishComponentSetup

获取 render function && 兼容 vue2.x optionAPI

设置组件实例的render方法:

* 若组件存在render方法，则instance.render = component.render
* 若组件存在template模板，则instance.render = compile(template）

```
export function finishComponentSetup(
  instance: ComponentInternalInstance,
  isSSR: boolean,
  skipOptions?: boolean
) {
  ...


  // 如果实例没有 render 函数
   if (!instance.render) {
    // 检查 用户如果没在 其他位置注册 render function
    if (compile && !Component.render) {
      // 拿到 Component.template
      // 即容器下的 innerHTML
      const template =
        (__COMPAT__ &&
          instance.vnode.props &&
          instance.vnode.props['inline-template']) ||
        Component.template

      if (template) {
        ...
        // 执行 compile 方法 
        // 获得 render function 挂载在component上
        Component.render = compile(template, finalCompilerOptions)
      }
    }
    // 拿到 render function 之后
    // 给 整个实例挂载 render
    instance.render = (Component.render || NOOP) as InternalRenderFunction
  }

  // 开始兼容 2.x的API
  // 所以 setup 解析完成才开始兼容2.x的API
  // support for 2.x options
  if (__FEATURE_OPTIONS_API__ && !(__COMPAT__ && skipOptions)) {
    currentInstance = instance
    applyOptions(instance)
    currentInstance = null
  }
}
```

当我们执行完这个方法后, 我们回到 mountComponent 这个方法. 他执行了 setupRenderEffect

### setupRenderEffect

核心方法 , 依赖收集 , 初始化渲染 , 后续的更新 , 都是通过这个方法进行的 。

```
const setupRenderEffect = (instance, initialVNode, container, ...) => {
  // 创建响应式的副作用函数
  const componentUpdateFn = () => {
    // 首次渲染
    if (!instance.isMounted) {
      // 渲染组件生成子树vnode
      const subTree = (instance.subTree = renderComponentRoot(instance));
      patch(null, subTree, container, ...);
      initialVNode.el = subTree.el;
      instance.isMounted = true;
    }
    else {
      // 更新
    }
  };
 	// 创建渲染effcet
  const effect = new ReactiveEffect(
    componentUpdateFn, 
    () => queueJob(instance.update), 
    instance.scope // track it in component's effect scope
 	);
  const update = (instance.update = effect.run.bind(effect));
  update.id = instance.uid;
  update();
};
```

首先会创建渲染effect,并绑定副作用执行函数到组件实例的update属性上（更新流程会再次触发update函数），并立即执行update函数，触发首次更新。

### renderComponentRoot

构建 subTree

所有的 template 模板最终都会被编译成渲染函数。

而 renderComponentRoot 所做的工作就是`去执行编译后的渲染函数，最终得到的 subTree`。

```
export function renderComponentRoot(
  instance: ComponentInternalInstance
): VNode {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render, // 通过 compile 获取的 render function
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance
  let result
  try {
    let fallthroughAttrs
    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      // 这里调用了render
      // 调用之后我们会拿到容器下节点的vnode tree
      // 之后校验 vnode tree 是否是合法的 vnode
      // 如果拿到的是合法的 vnode 就赋值给 result

      result = normalizeVNode(
        render!.call(
          proxyToUse,
          proxyToUse!,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      )
      fallthroughAttrs = attrs
    } else {
      // 如果是无状态组件
       ...
    }
    let root = result
    ...
   
  } catch (err) {
    blockStack.length = 0
    handleError(err, instance, ErrorCodes.RENDER_FUNCTION)
    result = createVNode(Comment)
  }
  return result
}
```

可以看到这个方法把我们容器下的所有节点变成了 vnode .验证完 vnode 的合法性之后, 会合并和继承一些属性. 最终把 vnode 返回.

生成subtree后，接下来就继续通过patch方法，把subTree节点挂载到container上。我们又回到了 patch 方法.

```
const patch: PatchFn = (
    n1, // null
    n2, // subTree
    container, // 挂载的节点
    anchor = null,
    parentComponent = null,
    parentSuspense = null,
    isSVG = false,
    slotScopeIds = null,
    optimized = false
  ) => {
    ...
    // shapeFlag 依然是组件类型标记
    const { type, ref, shapeFlag } = n2
    switch (type) {
      case Text:
        ...
        break
      case Comment:
         ...
        break
      case Static:
        ...
        break
      case Fragment:
        ...
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          // 此时我们会进入这个条件
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          )
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          ...
        } else if (shapeFlag & ShapeFlags.TELEPORT) {
         ...
        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
          ...
        }
    }
 
  }
```

以上就是component类型的vnode节点首次渲染挂载的流程，接下来我们来看看对于element类型的vnode节点又有什么不一样

### processElement

处理 element

```
const processElement = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    isSVG = isSVG || (n2.type as string) === 'svg'
    // 老节点不存在 直接挂载
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    }
    // 存在 对比更新
    else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    }
```

### mountElement

处理子元素 插入到目标节点

```
const mountElement = (
    vnode: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    let el: RendererElement
    let vnodeHook: VNodeHook | undefined | null
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode
    ...
    // 调用 hostCreateElement 创建真实 DOM
    el = vnode.el = hostCreateElement(
      vnode.type as string,
      isSVG,
      props && props.is,
      props
    )
    // 子节点如果是 文本
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 操作 dom 赋值 text
      hostSetElementText(el, vnode.children as string)
    }
    // 子节点如果是 数组
    else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 挂载子节点
      mountChildren(
        vnode.children as VNodeArrayChildren,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== 'foreignObject',
        slotScopeIds,
        optimized || !!vnode.dynamicChildren
      )
    }

    // 如果当前元素有 props
    if (props) {
      // 遍历 props
      for (const key in props) {
        if (!isReservedProp(key)) {
          // 对props进行处理
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children as VNode[],
            parentComponent,
            parentSuspense,
            unmountChildren
          )
        }
      }
    }
    // 将当前操作节点 插入到对应容器下
    hostInsert(el, container, anchor)
  }
```

### mountChildren

挂载子节点

对 children 数组进行深度优先遍历，递归的调用 patch 方法依次将子节点 child 挂载到父节点上

```
const mountChildren: MountChildrenFn = (
    children,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    slotScopeIds,
    optimized,
    start = 0
  ) => {
    for (let i = start; i < children.length; i++) {
      const child = (children[i] = optimized
        ? cloneIfMounted(children[i] as VNode)
        : normalizeVNode(children[i]))
      // 递归 patch 子元素
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    }
  }
```

由于是递归，所以先分析的节点后被挂载，当最外层节点被挂载时，所有的节点就都被挂载了。

![](https://pan.udolphin.com/files/image/2022/11/35b0ccf38f089ca96c7a4238c20ff09e.png)

# 总结

* 从组件到渲染生成 DOM 需要经历 3 个过程：创建 vnode - 渲染 vnode - 生成 DOM。
* 组件是如何转变为 DOM 的：先把组件转化为 vnode，针对特定类型的 vnode 执行不同的渲染逻辑，最终调用 document 上的方法将 vnode 渲染成 DOM。
* 渲染器是一个包含了平台渲染核心逻辑的 JavaScript 对象，可以用于跨平台渲染。
* 渲染器对象中的 createApp 方法，创建了一个具有 mount 方法的 app 实例。app.mount 方法中先是用根组件创建了 vnode，然后调用渲染器对象中的 render 方法去渲染 vnode，最终通过 DOM API 将 vnode 转化为 DOM。