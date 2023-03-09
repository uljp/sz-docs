`背景介绍：当我们项目越来越庞大的时，我们经常会发现我们写的代码，凌乱、难以阅读并且难以扩展。尤其是当一段时候后我们回头再看自己的代码，必须回想起当初自己写的时候的思路才能看懂。 `

因此，人们尝试在代码风格上保持统一，然而，最大的困难是：**修改一个较小的问题，都可能创建更多丑陋的代码，也可能 CSS 的小改变会影响 JavaScript 的功能。** 但是这些问题能在我们的项目开始的时候精心规划，就能很大程度上避免这些问题。今天就来说一下如何写一份不错的CSS代码

# 一个好的css代码是什么样

* 保持样式表可维护
* 保持代码可读性
* 保持样式表的可扩展性

和我们平时的项目结构一样。要保持良好的CSS代码，就需要制定一致的 CSS 规范，这样项目才能越来越健壮。


# CSS架构

目前CSS主要有以下五种设计架构

## <span style="color: #ba8baf">1. OOCSS</span>

面向对象的CSS，是由Nicole Sullivan提出的css理论，虽然说是理论，实则更像一种约定的规范：

* 结构和主题分离 - 减少对 HTML 结构的依赖
* 主题和主题分离 - 增加样式的复用性

### 减少对 HTML 结构的依赖

```html
<div class="container-list">
    <ul>
        <li><a href="#">...</a></li>
        <li><a href="#">...</a></li>
        <li><a href="#">...</a></li>
    </ul>
</div>
```

一般我们在书写列表的时候结构大概会像上面的结构一样写，这种时候我们如果要对a修改样式可能经常会用.container-list ul li a这种方式来选择，一方面这种写法在比较低效。

另一方面一旦我们在项目后期过程中对列表中的html结构进行了重构，这意味着我们同时也需要对css进行重构，使html与css的耦合性变得十分强，造成维护上的困难，也要避免没必要的嵌套地狱。

而OOCSS推荐的写法是在a标签内加上list-item样式,此时便能通过.container-list .list-item的方式来控制解耦。

### 增加样式的复用性

要有容器和内容独立，就是所把内容从容器中分离出来，换过句话说任何对象（容器），应该适应接受任何形式的内容。


在OOCSS的基础上，出现了另一种设计模式


## <span style="color: #86c1b9">2. BEM</span>


**BEM即为块级元素修饰字符（Block Element Modifier）**。

在BEM中，一个块，例如一个按钮、菜单或者标志，就是独立的实体。一个元素就像一个列表项或者标题一样，被绑定到它所在的块。

修饰字符是标记到一个块或者元素的标识，能够改变样式或者行为。你能认出使用BEM的代码，因为代码中在CSS的类里使用了多余的一个下划线和连字符。

例如看看这个来自关于BEM命名常规的页面里面的HTML所应用的类：也可以被当成一种命名规范，本质上使页面结构清晰

块（Block）、元素（Element__）、修饰符（Modifier--）

```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
```


**有以下几个规则**

* Block元素应该以元素本身的属性为主
* Element则以元素位置和形状为主
* Modifier则修饰当前的状态和主题
* Element一定是在Block之中，而不能独立于Block之外
* Modifier则更多的表示当前组件的形状和状态


可以明显发现它的一些优点：**结构清晰**，**定位迅速**，**功能明确**。

在面对组件化的场景时，Block 代表逻辑上和功能上独立的页面组件。Element封装了行为(JavaScript)、模板、样式(CSS)和其他实现技术。

![](https://pan.udolphin.com/files/image/2021/11/c46ccaa8787aa720b1c1d9c13ce21ec6.jpg)

**举个例子**

```html
<header class="header">
    <img class="logo">
    <form class="search-form">
        <input class="input">
        <button class="button"></button>
    </form>
    <ul class="lang-switcher">
        <li class="lang-switcher__item">
            <a class="lang-switcher__link" href="url">en</a>
        </li>
        <li class="lang-switcher__item">
            <a class="lang-switcher__link--active" href="url">ru</a>
        </li>
    </ul>
</header>
```

block-name__element-name--modifier-name--modifier-value


**在React当中，也采用了这样的命名方式**

BEMnaming工具[1]，提供BEM命名的检测

然而在面对大型的项目时CSS的凌乱也很难让开发者愿意在茫茫多的代码中寻找可复用的代码


## <span style="color: #ba8baf">3. SMACSS</span>


[什么是SMACSS](https://smacss.com)

`SMACSS` 的架构方法与` Bootstrap` 或 `Foundation` 等 CSS 框架略有不同。相反，它是一组规则，更是一套模板或指南。

**设计的主要规范有三点：**

* Categorizing CSS Rules（为css分类）
* Naming Rules（命名规范）
* Minimizing the Depth of Applicability（最小化适配深度）

其中尤其建议JavaScript解除和样式的耦合

```html
<button class="btn btn--buy js-buy-now"></button>
```

命名规范上出现了一些差异

```markdown
.layout-header
.is-hidden
.theme-nav
```

最小化适配深度，减少html和css的耦合度，避免html的变动增加对css的影响

```css
.sidebar ul h3 {}
.side {}
```


**每个 SMACSS 项目结构分为 5 种规则：**

* Base（基础）
* Layout（布局）
* Modules（模块）
* State（状态）
* Theme（主题）
* Base（基础规则）

在 SMACSS 中，基础样式定义了元素全局的默认样式。如果你用了样式重置代码，那会让你的样式表现在不同浏览器上保持一致，即便这些浏览器内部定义的默认 CSS 有所不同。

在基础规则中，你应该只包含基本元素选择器或者那些伪类选择器，不应包含类选择器或者 ID 选择器。（你应该在理由相当充分时才将类或 ID 放进去，可能也就只有一种情况了：你用了第三方插件的节点又想对特定节点的默认样式进行覆盖。）

**这是一个基础规则的文件单元的例子：**

```css
html {
    margin: 0;
    font-family: sans-serif;
}

a {
    color: #000;
}

button {
    color: #ababab;
    border: 1px solid #f2f2f2;
}
```

它应该包含计划在整个网站上使用的默认的大小、边距、颜色、边框和其他默认值。你的排版和表单元素应该在每个页面上具有统一的样式，给人感觉它们是统一的设计和主题。


**不管你用不用 SMACSS，都强烈建议避免使用 !important，也不要使用深嵌套。**


## <span style="color: #ba8baf">4. ITCSS</span>


倒三角形CSS的新思想是一种基于 CSS属性 的特异性和重要性的分层方法 。


ITCSS并不适合所有人，但它提供了一种专业的方式来在编码过程中清晰地查看样式表。 与SMACSS和OOCSS相比，这是一种鲜为人知的方法-尽管两者都可以与ITCSS结合使用。

![image.png](https://pan.udolphin.com/files/image/2021/11/87f870126b1a66f5656325c7ec1c98e4.png)

从功能的角度上看，ITCSS 将 Base分成了Settings、Tools、Generic和Base，而Objects、Components和Trumps则分别对应Layout、Module、（State、Theme），而这样设计的好处在于可以将代码的复用性进一步提升。

由于ITCSS 主要是专有的 ，因此不存在有关其用法的详细规则手册。 我们只能使用一组特定的原则 。 

默认情况下，ITCSS使用相同的原则OOCSS 但基于特异性更大的分离 。 如果您已经熟悉OOCSS，请考虑尝试使用这种独特的替代CSS体系结构 。


### 使用ITCSS的好处

* 页面对象可以拆分为自己的CSS / SCSS文件，以实现可重用性 。 复制/粘贴并将每个对象扩展到其他项目很简单 。

* 具体的深度取决于您 。

* 没有设置的文件夹结构 ，也不需要使用预处理工具。

* 您可以合并来自其他方法（例如CSS模块）的概念，以创建自己的混合工作流 。



## <span style="color: #ba8baf">5. ACSS</span>

>Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.
译文：原子化 CSS 是一种 CSS 的架构方式，它倾向于小巧且用途单一的 class，并且会以视觉效果进行命名。

其中的典型代表就是TailwindCSS[2]，它优点是CSS文件大小会停止增长，不需要去重复的发明类，担心命名冲突，样式覆盖。缺点则是破坏了语义化，有一定的学习成本，而且框架生成了数 MB 的 CSS，使得加载与更新 CSS 成为了整个应用的性能瓶颈。

当然ACSS 劣处是非常小的，而好处有非常大，没有理由在项目中不适用。


> 市面上有不少 **<span style="color: #a1b56c">**实用至上**</span>** 的 CSS 框架，如 `Tailwind CSS`，`Windi CSS `以及 `Tachyons `等。 同时有些 UI 库也会附带一些 CSS 工具类作为框架的补充，如` Bootstrap`和` Chakra UI`。


```scss
.block{ display: block; }
.hidden { display: none; }
.p-2 { padding: 0.75rem; }
.flex { display: flex; }
.text-base { font-size: 1rem; }
.bg-green-200 { background-color: #123456 }

<div className="m-2 p-2 text-2xl text-gray-500">I am Ok</div>
```

对原子CSS感兴趣可以看一下这篇文章。[重新构想原子化CSS](https://antfu.me/posts/reimagine-atomic-css-zh)



# 其他提升CSS质量的方式


除了上面的架构思想，更多则是需要团队成员的一致性认同，才能实现在代码风格上的统一。

除了这些开发自律性上的代码规范外还有一些提升CSS质量的方法。


## <span style="color: #ba8baf">CSS预处理器</span>


在预处理器中，同样提供了众多的方法来简化与控制CSS代码，以stylus为例

## <span style="color: #a1b56c"> 1\. 变量</span>

```scss
font-size = 14px

body
   font font-size Arial, sans-serif
  
pad(types = padding, n = 5px)
    if padding in types
      padding n
    if margin in types
      margin n

body
    pad()
body
    pad(margin)
body
    pad(padding margin, 10px)
    
// Yields：
body {
    padding: 5px;
}
body {
    margin: 5px;
}
body {
    padding: 10px;
    margin: 10px;
}
```

## <span style="color: #a1b56c"> 2\. 函数</span>

```scss
add(a, b = a)
   a + b


add(10, 5)
// => 15
 
  get(hash, key)
    return pair[1] if pair[0] == key for pair in hash
    
  hash = (one 1) (two 2) (three 3)
  
  get(hash, two)
  // => 2


  get(hash, three)
  // => 3


  get(hash, something)
  // => null
```

## <span style="color: #a1b56c"> 3\. 内建函数</span>

```scss
// 提取颜色分量
red(#c00)
// => 204


red(#000, 255)
// => #f00
```

## <span style="color: #a1b56c"> 4\. 插值</span>
```scss
// 属性插值
vendor(prop, args)
    -webkit-{prop} args
    -moz-{prop} args
    {prop} args

border-radius()
    vendor('border-radius', arguments)

box-shadow()
    vendor('box-shadow', arguments)

button
    border-radius 1px 2px / 3px 4px

// Yields:    

button {
    -webkit-border-radius: 1px 2px / 3px 4px;
    -moz-border-radius: 1px 2px / 3px 4px;
    border-radius: 1px 2px / 3px 4px;
  }

// 选择器插值  
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row
        
// Yields:  
  
table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}    

mySelectors = '#foo,#bar,.baz'

{mySelectors}
  background: #000
  
Yields:

#foo,
#bar,
.baz {
  background: #000;
}  

// 对象插值
foo = {
  width: 10px,
  height: 20px,
  '&:hover': {
    padding: 0
  }
}

.bar
  {foo}

Yields:

// => .bar {
//      width: 10px;
//      height: 20px;
//    }
//    .bar:hover {
//      padding: 0;
//    }
```
  

## <span style="color: #a1b56c"> 5\. @EXTEND</span>

```scss
form
     input[type=text]
       padding: 5px
       border: 1px solid #eee
       color: #ddd

   textarea
     @extends form input[type=text]
     padding: 10px
     
    //Yielding:
    
    form input[type=text],
    textarea {
      padding: 5px;
      border: 1px solid #eee;
      color: #ddd;
    }
    textarea {
      padding: 10px;
    }
```
   
对于维护一份高质量的CSS代码，注释和间隔必不可少
以下是一种比较建议的注释和间隔方式，可以自行取用。

```scss
/*------------------------------------*\
  #A-SECTION
*------------------------------------*/

.selector { }


/*------------------------------------*\
  #ANOTHER-SECTION
*------------------------------------*/


/**
 * Comment
 */


.another-selector { }
```

除了缩进，我们还可以通过在规则集之间自由而明智地使用空格来提供大量信息。我们用：

* 密切相关的规则集之间的一 (1) 条空行。
* 松散相关的规则集之间的两 (2) 条空行。
* 全新部分之间的五 (5) 行空行。

```scss
// good case
/*------------------------------------*\
  #FOO
*------------------------------------*/


.foo { }


.foo__bar { }




.foo--baz { }


// bad case
.foo { }
  .foo__bar { }
.foo--baz { }
```

同理，在html结构中，也可以使用同样的规则。

除了以上这些，还有众多的规范和优化可以继续探索，如选择器性能，CSS嵌套，有兴趣的读者可以继续探索

你会认为 CSS规范是一个有点宏大和不必要的概念：为什么这么简单、这么直接的东西需要像架构一样被设计成非常复杂的东西？！

正是因为CSS 的简单性、松散性和不守规矩的性质意味着在任何合理规模上管理（阅读、驯服）它的最佳方式是通过严格和特定的架构。坚实的架构可以帮助我们控制我们的特殊性，强制执行命名约定，管理我们的源代码顺序，创建一个健全的开发环境，并且通常使我们的 CSS 项目管理更加一致和舒适。

总的来说，可以依照一下几个规则订立团队/个人代码规范，保证代码的一致性


# 建议的几个原则

## 单一职责原则

**每个 CSS 实现都必须有一个单一的责任。**

```scss
Correct:
    .button {
        font-family: Arial, sans-serif;
        border: 1px solid black;
        background: #fff;
    }
    .header__button {
        margin: 30px;
        position: relative;
    }
    
Incorrect:
    .header__button {
        font-family: Arial, sans-serif;
        position: relative;
        border: 1px solid black;
        margin: 30px;
    }
```


## 开闭原则

**元素应该通过修饰符扩展，而不是直接在原有基础上修改。**

```scss
Original:
    <button class="button">...</button>
    .button {
        font-family: Arial, sans-serif;
        text-align: center;
        font-size: 11px;
        line-height: 20px;
    }
    
Extend
    <button class="button button_size_s">...</button>
    .button {
        font-family: Arial, sans-serif;
        text-align: center;
        font-size: 11px;
        line-height: 20px;
    }
    .button_size_s {
        font-size: 13px;
        line-height: 24px;
    }
```


## DRY原则


**将有意义的重复规范化和抽象化**

```scss
巧用mixin和extend
@mixin my-web-font() {
  font-family: "My Web Font", sans-serif;
  font-weight: bold;
}


.btn {
  display: inline-block;
  padding: 1em 2em;
  @include my-web-font();
}


.foo {
  color: red;
}
.bar {
  @extend .foo;
}
```

**组合优于继承和关注点分离**

```html

// 将写js的方式同样适用在css上
<div class="layout">

  <div class="layout__item  two-thirds">
    <section class="content">
      ...
    </section>
  </div>

  <div class="layout__item  one-third">
    <section class="sub-content">
      ...
    </section>
  </div>

</div>
```


#### 参考文献

BEM简介[3]

OOCSS介绍[4]

探索 SMACSS：可扩展的模块化 CSS 框架[5]

编写高效的 CSS 选择器[6]

CSS的单一原则[7]

思考CSS架构[8]


#### 参考资料
[1] 
[https://mp.weixin.qq.com/s/MvlBEbybwmRJAVxQKtaUtw](https://mp.weixin.qq.com/s/MvlBEbybwmRJAVxQKtaUtw)

[2] 
[BEMnaming工具](https://github.com/bem/bem-sdk#naming)

[3] 
[TailwindCSS](https://www.tailwindcss.cn/)

[4] 
[BEM简介]( https://en.bem.info/methodology/quick-start/)

[5] 
[OOCSS介绍](http://oocss.org/)

[6] 
[探索 SMACSS可扩展的模块化 CSS 框架](https://zhuanlan.zhihu.com/p/44851489)

[7] 
[编写高效的 CSS 选择器](https://csswizardry.com/2011/09/writing-efficient-css-selectors/)

[8] 
[CSS的单一原则](https://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/)

[9] 
[思考CSS架构](https://zhuanlan.zhihu.com/p/32952130)