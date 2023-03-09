<a name="Y2KtW"></a>
# 前言
假设一个场景，有一个空房间，我们要不断的往里面放一些东西。最简单的办法是把这些东西直接扔进去，bu分种类，但是时间久了，就会发现很难从这个房子里找到自己想要的东西，要调整某几样东西的位置也不容易。所以在房间里做一些柜子也许是个更好的选择，虽然柜子会增加我们的成本，但它可以在维护阶段为我们带来好处。这样也方便我们去找到相对应的东西。使用这些柜子存放东西的规则，或许就是一种模式。
<a name="SDF7g"></a>
# 定义
在面向对象软件设计过程中针对特定问题的简洁而优雅的解决方案。
<a name="ZEBku"></a>
# 作用
设计模式的作用是让人们写出可复用和可维护性高的程序。
<a name="dEx0O"></a>
# 遵循的原则
所有设计模式的实现都遵循一条原则，即“找出程序中变化的地方，并将变化封装起来”。<br />复用不变和稳定的部分。<br />​

下面讲一下两种常用的设计模式
* 策略模式
* 发布订阅模式

# 策略模式
<a name="kQfCs"></a>
## 前言
再举个例子哇。比如我们要去某个地方旅游，可以根据具体的实际情况来选择出行的线路。
* 坐飞机。
* 坐大巴或者火车。
* 骑自行车。

![image.png](https://pan.udolphin.com/files/image/2021/12/049748f1986726e51fe52f52798ba6f5.png)
这些方法（算法）灵活多样，而且可以因为实际情况随意互相替换。这也是接下来要讲的策略模式的思想。
<a name="MfEZ6"></a>
## 定义
定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
<a name="aW3wB"></a>
## 构成
策略模式由两部分构成：一部分是封装不同策略的策略组，另一部分是 Context。通过组合和委托来让 Context 拥有执行策略的能力，从而实现可复用、可扩展和可维护，并且避免大量复制粘贴的工作。
<a name="bKDHl"></a>
## 举例
<a name="Oc4CL"></a>
## 使用策略模式计算奖金
假设公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为C的人年终奖有4倍工资，绩效为A的人年终奖有3倍工资，而绩效为B的人年终奖是2倍工资。假设财务部要求我们提供一段代码，来方便他们计算员工的年终奖。
<a name="tgqR4"></a>
## 最开始的代码
我们可以编写一个名为calculateBonus的函数来计算每个人的奖金数额。很显然，calculateBonus函数要正确工作，就需要接收两个参数：员工的工资数额和他的绩效考核等级。
<a name="giQ8u"></a>
代码如下
```javascript
// 计算奖金 最开始想到的办法
let calculateBonus = function (performanceLevel, salary) {

  if (performanceLevel === "A") {
    return salary * 3;
  }else if(performanceLevel === "B") {
    return salary * 2;
  }else if (performanceLevel === "C") {
    return salary * 4;
  }
};
calculateBonus('B', 3000);   //输出 6000
calculateBonus('C', 2000);   //输出 8000
```
<a name="vpD5Q"></a>
### 缺点


-  calculateBonus函数比较庞大，包含了很多if-else语句，这些语句需要覆盖所有的逻辑分支。
- calculateBonus函数缺乏弹性，如果增加了一种新的绩效等级S，或者想把绩效C的奖金系数改为5，只能深入calculateBonus函数的内部实现，违反开放-封闭原则。
-  算法的复用性差。
<a name="VzBwd"></a>
## 使用组合函数重构代码
把各种算法封装到一个个的小函数里面，根据命名，可以一目了然地知道它对应着哪种算法，它们也可以被复用在程序的其他地方。<br />代码如下
```javascript
// 计算奖金 使用组合函数重构代码
const performanceC = function (salary) {
  return salary * 4
}

const performanceA = function (salary) {
  return salary * 3
}

const performanceB = function (salary) {
  return salary * 2
}
let calculateBonus = function (performanceLevel, salary) {

  if (performanceLevel === "A") {
    return performanceA(salary);
  }else if (performanceLevel === "B") {
    return performanceB(salary);
  }else if (performanceLevel === "C") {
    return performanceC(salary);
  }
};
calculateBonus('B', 3000);   //输出 6000
calculateBonus('C', 2000);   //输出 8000
```
<a name="J6nV3"></a>
### 缺点
仍然没有解决问题。calculateBonus函数有可能越来越庞大，而且在系统变化的时候缺乏弹性。
<a name="Qktgv"></a>
## 使用策略模式重构代码
策略模式指的是定义一系列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式也不例外，策略模式的目的就是<span style="color: #f29999">将算法的使用与算法的实现分离开来</span>。
<a name="Tvkph"></a>
### 两种方法
### 模仿传统面向对象语言中的实现
<a name="Sjc1J"></a>
方法：
我们先把每种绩效的计算规则都封装在对应的策略类里面
```javascript
// 计算奖金 策略模式 第一个版本 模仿面向对象语言中的实现
let performanceC = function () { };
performanceC.prototype.calculate = function () {
  return salary * 4;
}
let performanceA = function () { };
performanceA.prototype.calculate = function () {
  return salary * 3;
}
let performanceB = function () { };
performanceB.prototype.calculate = function () {
  return salary * 2;
}
// 接下来定义奖金类
let Bonus = function () {
  this.salary = null;    //原始工资
  this.strategy = null; //绩效等级对应的策略对象

}
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary; //设置员工的原始工资

}
Bonus.prototype.setStrategy = function (salary) {
  this.strategy = strategy; //设置员工的绩效等级对应的策略对象


}
Bonus.prototype.getBonus = function () {
  //取得的奖金数额
  return this.strategy.calculate(this.salary); //把计算奖金的操作委托给
  //对应的策略对象等级对应的策略对象
}
```
先创建一个bonus对象，并且给bonus对象设置一些原始的数据，比如员工的原始工资数额。接下来把某个计算奖金的策略对象也传入bonus对象内部保存起来。当调用bonus.getBonus()来计算奖金的时候，bonus对象本身并没有能力进行计算，而是把请求委托给了之前保存好的策略对象
```javascript
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceC()); //设置策略对象
console.log(bonus.getBonus()); //输出40000
bonus.setStrategy(new performanceA()); //设置策略对象
console.log(bonus.getBonus()); //输出30000
```
刚刚我们用策略模式重构了这段计算年终奖的代码，可以看到通过策略模式重构之后，代码变得更加清晰，各个类的职责更加鲜明。但这段代码是基于传统面向对象语言的模仿，下一节我们将了解用JavaScript实现的策略模式。
<a name="DK3xy"></a>

### 用JavaScript实现的策略模式
我们让strategy对象从各个策略类中创建而来，这是模拟一些传统面向对象语言的实现。实际上在JavaScript语言中，函数也是对象，所以更简单和直接的做法是把strategy直接定义为函数
```javascript

// 计算奖金 策略模式 第二个版本 JavaScript版本的策略模式
/*策略类*/
var strategies = {
  "C": function (salary) {
    return salary * 4;
  },
  "A": function (salary) {
    return salary * 3;
  },
  "B": function (salary) {
    return salary * 2;
  },
```
同样，Context也没有必要必须用Bonus类来表示，我们依然用calculateBonus函数充当Context来接受用户的请求。经过改造，代码的结构变得更加简洁：
```javascript
/*环境类*/
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
}
console.log(calculateBonus('C', 20000)); //输出80000
console.log(calculateBonus('A', 10000)); //输出30000
```
策略模式的典型应用场景是<span style="color: #f29999">表单校验</span>中，对于校验规则的封装。接下来我们就通过一个简单的例子具体了解一下
<a name="aFMK8"></a>
## 举例
### 表单校验
注册表单，需要进行校验。下面进行三个简单的校验。

- 用户名不能为空。
- 密码长度不能少于6位。
- 手机号码必须符合格式。

### 无所考虑的解法
<br />一个常见的登录表单代码如下：
```javascript
<form id='login-form' action="" method="post">
 <label for="account">手机号</label>
 <input type="number" id="account" name="account">
 <label for="password">密码</label>
 <input type="password" id="password" name="password">
 <button id='login'>登录</button>
</form>
<script>
  var loginForm = document.getElementById('login-form');
  loginForm.onsubmit = function (e) {
   e.preventDefault();
   var account = document.getElementById("account").value;
   var pwd = document.getElementById("password").value;

   if (account === null || account === '') {
     alert('手机号不能为空');
     return false;
    }
   if (pwd === null || pwd === '') {
     alert('密码不能为空');
     return false;
    }
   if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(account)) {
     alert('手机号格式错误');
     return false;
    }
   if (pwd.length < 6) {
    alert('密码不能小于六位');
    return false;
    }
  }
</script>
```
这是一种很常见的代码编写方式，它的缺点跟计算奖金的最初版本一样显而易见。
* `'loginForm.onsubmit'`函数比较庞大，包含了很多if-else语句，这些语句需要覆盖所有的校验规则。
* `'loginForm.onsubmit'`函数缺乏弹性，如果增加了一种新的校验规则，或者想把密码的长度校验从6改成8，我们只能深入`'loginForm.onsubmit'`函数的内部实现。
* 算法的复用性差。
<a name="ld2xr"></a>
### 策略模式思想实现
<br />首先抽离并封装校验逻辑为策略组,接下来修改 Context
```javascript
//首先抽离并封装校验逻辑为策略组
<form id='login-form' action="" method="post">
  <label for="account">手机号</label>
  <input type="number" id="account" name="account">
  <label for="password">密码</label>
  <input type="password" id="password" name="password">
  <button id='login'>登录</button>
</form>
<script>
  var account = document.getElementById("account").value;
  var pwd = document.getElementById("password").value;
  var strategies = {
    isNonEmpty: function (value, errorMsg) {
      if (value === '' || value === null) {
        return errorMsg;
      }
    },
    isMobile: function (value, errorMsg) { // 手机号码格式
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(value)) {
        return errorMsg;
      }
    },
    minLength: function (value, length, errorMsg) {
      if (value.length < length) {
        return errorMsg;
      }
    }
  };

</script>
```
<a name="LCmSE"></a>

接下来我们准备实现Validator类。Validator类在这里作为Context，负责接收用户的请求并委托给strategy对象。<br />在给出Validator类的代码之前，有必要提前了解用户是如何向Validator类发送请求的，这有助于我们知道如何去编写Validator类的代码。
### 用户是如何向Validator类发送请求
代码如下：
```javascript
// 用户是如何向Validator类发送请求
var validataFunc = function () {
var validator = new Validator(); //创建一个validator对象

  // 添加一些校验规则
 validator.add(loginForm.userName, 'isNonEmpty', '用户名不能为空');
 validator.add(loginForm.password, 'minLength:6', '密码长度不能小于8位');
 validator.add(loginForm.phoneNumber, 'isMobile', '手机号码格式不正确');
 var errorMsg = validator.start(); //获得校验结果
 return errorMsg; //返回校验结果
}
var loginForm = document.getElementById('loginForm ');
loginForm.onsubmit = function () {
 var errorMsg = validataFunc(); //如果errorMsg有确切的返回值，说明未通过校验
 if (errorMsg) {
   alert(errorMsg);
   return false; //阻止表单提交
 }
}
```
从这段代码中可以看到，我们先创建了一个validator对象，然后通过validator.add方法，往validator对象中添加一些校验规则。validator.add方法接受3个参数，以下面这句代码说明：
```javascript
 validator.add(loginForm.password, 'minLength:6', '密码长度不能小于8位');
```

<a name="M861f"></a>
### Validator类的实现
```javascript
// 最后是Validator类的实现
var Validator = function () {
  this.cache = []; //保存校验规则 
};

Validator.prototype.add = function (dom, rule, errorMsg) {
  var ary = rule.split(':');  //把strategy和参数分开
  this.cache.push(function () { //把校验的步骤用空函数包装起来，并且放入cache
    var strategy = ary.shift();    //用户挑选的strategy 
    ary.unshift(dom.value);         //把input的value添加进参数
    列表
    ary.push(errorMsg);//把errorMsg添加进参数列表
    return strategies[ strategy ].apply(dom,ary);
  });
};
    Validator.prototype.start = function () {
      for (var i = 0, validatorFunc; validatorFunc = this.cache
      [i++];
      ) {
      var msg = validatorFunc(); //开始校验，并取得校验后的返回信息

      if (msg) {//如果有确切的返回值，说明校验没有通过
        return msg;
       }
     }
   };
```
使用策略模式重构代码之后，我们仅仅通过“配置”的方式就可以完成一个表单的校验，这些校验规则也可以复用在程序的任何地方，还能作为插件的形式，方便地被移植到其他项目中。在修改某个校验规则的时候，只需要编写或者改写少量的代码。比如我们想将用户名输入框的校验规则改成用户名不能少于4个字符。可以看到，这时候的修改是毫不费力的。代码如下
```javascript
validator.add(loginForm.password, 'minLength:8', '密码长度不能小于8位');
```
<a name="wSAM1"></a>
### 优点
​

分离了校验逻辑的代码如果需要扩展校验类型，在策略组中新增定义即可使用；如果需要修改某个校验的实现，直接修改相应策略即可全局生效。对于开发和维护都有明显的效率提升。

<a name="Mu7by"></a>

### 给文本输入框添加多种校验规则
我们再举个例子

<br />如果我们既想校验它是否为空，又想校验它输入文本的长度不小于9呢？我们期望以这样的形式进行校验：
```javascript
validator.add( registerForm.userName， [{
strategy:'isNonEmpty',
errorMsg:’用户名不能为空’}，{
strategy:'minLength:9’,
errorMsg:’用户名长度不能小于9位}]);
```
下面提供的代码可用于一个文本输入框对应多种校验规则
```javascript
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>给某个文本输入框添加多种校验规则</title>
  </head>

  <body>
    <!-- http://xxx.com/register -->
    <form action="http://baidu.com" id="registerForm" method="post">
      请输入用户名:<input type="text" name="userName" />
      请输入密码:<input type="text" name="password" />
      请输入手机号码:<input type="text" name="phoneNumber" />
      <button>提交</button>
    </form>
  </body>

  </html>
  <script>
    /* 策略对象 */
    var strategies = {
     isNonEmpty: function (value, errorMsg) {
      if (value === '') {
        return errorMsg;
       }
     },
     minLength: function (value, length, errorMsg) {
       if (value.length < length) {
         return errorMsg;
       }
     },
     isMobile: function (value, errorMsg) {
       if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
        return errorMsg;
       }
     }
   };  
     /**********Validator类*******/

   var Validator = function () {
    this.cache = [];
   };

   Validator.prototype.add = function (dom, rules) {
    var self = this;

    for (var i = 0, rule; rule = rules[i++];) {
      (function (rule) {
        var strategyAry = rule.strategy.split(':');
        var errorMsg = rule.errorMsg;
        self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(
         dom, strategyAry);
       });
    })(rule)
  }   
 };
   Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc =
    this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
     return errorMsg;
      }
    }
  }
     /**************客户调用代码*************/

   var registerForm = document.getElementById('registerForm');
   var validatorFunc = function () {

   var validator = new Validator();
   validator.add(registerForm.userName, [{
     strategy: 'isNonEmpty',
     errorMsg: '用户名不能为空'
    },
    {
     strategy: 'minLength:9',
     errorMsg: '用户名长度不能小于9位',
    }
   ]);
   validator.add(registerForm.password, [{
     strategy: 'minLength:6',
     errorMsg: '密码长度不能小于6位'
    }]);
    validator.add(registerForm.phoneNumber, [{
     strategy: 'isMobile',
     errorMsg: '手机号码格式不正确'
    }]);
    var errorMsg = validator.start();
    return errorMsg;
    }
    registerForm.onsubmit = function () {
    var errorMsg = validatorFunc();
     if (errorMsg) {
      alert(errorMsg);
      return false;
    }
  }
</script>
```
<a name="AJUZb"></a>
## 优点

- 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
-  策略模式将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。
-  策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
- 在策略模式中利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的替代方案。
## 缺点
-  首先，使用策略模式会在程序中增加许多策略类或者策略对象，但实际上这比把它们负责的逻辑堆砌在Context中要好。
-  要使用策略模式，必须了解所有的strategy，必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy。比如，我们要选择一种合适的旅游出行路线，必须先了解选择飞机、火车、自行车等方案的细节。此时strategy要向客户暴露它的所有实现，这是违反最少知识原则的。
<a name="GwSKm"></a>
# 发布—订阅模式
## 定义
发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在JavaScript开发中，我们一般用事件模型来替代传统的发布—订阅模式。
<a name="LS1nu"></a>
## 现实中的发布-订阅模式
假设小明想买房子，到了售楼处发现想要的那套已经售罄。售楼人员告诉小明如果有合适的会微信告知小明。再有别人相中房子，售楼人员也会通过这种方式告知他们。
在刚刚的例子中，发送微信通知就是一个典型的发布—订阅模式，小明等购买者都是订阅者，他们订阅了房子开售的消息。售楼处作为发布者，会在合适的时候遍历花名册上的电话号码，依次给购房者发布消息。
<a name="piBO9"></a>

##  DOM事件
曾经使用过的发布订阅模式<br />只要我们曾经在DOM节点上面绑定过事件函数，那我们就曾经使用过发布—订阅模式，来看看下面这两句简单的代码发生了什么事情：
```javascript
 document.body.addEventListener('click', function () {
  alert(2);
 }, false);
 document.body.click(); //模拟用户点击
```
在这里需要监控用户点击document.body的动作，但是我们没办法预知用户将在什么时候点击。所以我们订阅document.body上的click事件，当body节点被点击时，body节点便会向订阅者发布这个消息。这很像购房的例子，购房者不知道房子什么时候开售，于是他在订阅消息后等待售楼处发布消息。
<a name="hz9X4"></a>
##  自定义事件
除了DOM事件，我们还会经常实现一些自定义的事件，这种依靠自定义事件完成的发布—订阅模式可以用于任何JavaScript代码中。现在看看如何一步步实现发布—订阅模式。<br />❏ 首先要指定好谁充当发布者（比如售楼处）；<br />❏ 然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）；<br />❏ 最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，挨个发短信）。另外，我们还可以往回调函数里填入一些参数，订阅者可以接收这些参数。比如售楼处可以在发给订阅者的短信里加上房子的单价、面积、容积率等信息，订阅者接收到这些信息之后可以进行各自的处理
```javascript
var sales0ffices = {}; //定义售楼处

salesOffices.clientList =[];
//存列表，存放订阅者的回调函数

salesOffices.listen=function( fn
){ //增加者 
this.clientList.push(fn);
//消息添加进缓存表
} ;
salesOffices.trigger =function(){
//发布消息
for(var i=0,fn;fn =this.
clientList[i++];){
fn.apply(this,arguments);
//(2)//arguments是发布消息时带上的参数
};
```
<a name="UwYGK"></a>
下面我们来进行一些简单的测试
```javascript
 // 下面我们来进行一些简单的测试
  salesOffices.listen(function (price, squareMeter) { // 小明订阅消息
   console.log('价格=' + price);
   console.log('squareMeter=' +
     squareMeter);
  });
  salesOffices.listen(function (price, squareMeter) { //小红订阅消息
   console.log('价格=' + price);
   console.log('squareMeter=' +
   squareMeter);
  });
}
  salesOffices.trigger(2000000, 88); //输出:200万，88平方米
  salesOffices.trigger(3000000, 110); //输出:300万，110平方米
```
至此，我们已经实现了一个最简单的发布—订阅模式，但这里还存在一些问题。我们看到订阅者接收到了发布者发布的每个消息，虽然小明只想买88平方米的房子，但是发布者把110平方米的信息也推送给了小明，这对小明来说是不必要的困扰。所以我们有必要增加一个<span style="color: #ee9090">标示key</span>，让订阅者只订阅自己感兴趣的消息。改写后的代码如下
```javascript
 // 改写后的代码
var salesOffices = {}; //定义售楼处
    salesOffices.clientList = {};
    //缓存列表，存放订阅者的回调函数
    salesOffices.listen = function (key, fn) {
      if (!this.clientList[key]) { //如
        // 如果还没有订阅过此类消息， 给该类消息创建一个缓存列表
        this.clientList[key] = [];
      }
      this.clientList[key].push(fn); //
      // 订阅的消息添加进消息缓存列表
    };
    salesOffices.trigger = function () { //发布消息
      var key = Array.prototype.shift.call(arguments), //取出消息类型
        fns = this.clientList[key]; // 取出该消息对应的回调函数集合
      if (!fns || fns.length === 0) { //如果没有订阅该消息， 则返回
        return false;
      }
      for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments); //(2) //arguments是发布消息时附送的参数
      }
    };

    salesOffices.listen('squareMeter88', function (price) {
      //小明订阅88平方米房子的消息
      console.log('价格 = ' + price); //
      // 输出: 2000000
    });

    salesOffices.listen('squareMeter110', function (price) { //小红订阅110平方米房子的消息
      console.log('价格=' + price); // 输出: 3000000
    });
    salesOffices.trigger('squareMeter88', 2000000); //发布88平方米房子的价格
    salesOffices.trigger('squareMeter110', 3000000); //发布110平方米房子的价格    
```
很明显，现在订阅者可以只订阅自己感兴趣的事件了。
![image.png](https://pan.udolphin.com/files/image/2021/12/aef35c7b631e1d6b46c6399b4c9f81b5.png)
## 发布-订阅模式的通用实现
现在我们已经看到了如何让售楼处拥有接受订阅和发布事件的功能。假设现在小明又去另一个售楼处买房子，那么这段代码是否必须在另一个售楼处对象上重写一次呢，有没有办法可以让所有对象都拥有发布—订阅功能呢？答案显然是有的，JavaScript作为一门解释执行的语言，给对象动态添加职责是理所当然的事情。所以我们把发布—订阅的功能提取出来，放在一个单独的对象内
```javascript
 var event = {
      clientList: [],
      listen: function (key, fn) {
        if (!this.clientList[key]) {
          this.clientList[key] = [];
        }
        this.clientList[key].push(fn); //订阅的消息添加进缓存列表
      },
      trigger: function () {
        var key = Array.prototype.shift.call(arguments), //(1);
          fns = this.clientList[key];
        if (!fns || fns.length === 0) {
          //如果没有绑定对应的消息
          return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
          fn.apply(this, arguments) //(2) arguments是trigger时带上的参数
        }
      }
    }
```
再定义一个installEvent函数，这个函数可以给所有的对象都动态安装发布—订阅功能：
```javascript
//  再定义一个installEvent函数，这个函数可以给所有的对象都动态安装发布—订阅功能
var installEvent = function (obj) {
  for (var i in event) {
  abj[i] = event[i];
 }
};    
```
再来测试一番，我们给售楼处对象salesOffices动态增加发布—订阅功能：
```javascript
 var salesOffices = {};
  installEvent(salesOffices);
  salesOffices.listen('squareMeter88', function (price) {
  //小明订阅消息 
  console.log('价格=' + price);
  });
  salesOffices.listen('squareMeter110', function (price) {
  //小红订阅消息
  console.log('价格=' + price);

  });
  salesOffices.trigger('squareMeter88', 2000000); //发布88平方米房子的价格
  salesOffices.trigger('squareMeter110', 3000000); //发布110平方米房子的价格
```
<a name="ZLqO0"></a>
## 取消订阅的事件
有时候，我们也许需要取消订阅事件的功能。比如小明突然不想买房子了，为了避免继续接收到售楼处推送过来的短信，小明需要取消之前订阅的事件。现在我们给event对象增加remove方法：
```javascript
  event.remove = function (key, fn) {
    var fns = this.clientList[key];
      if (!fns) { //如果key对应的消息没有被人订阅，则直接返回

        return false;
      }
      if (!fn) { //如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅

        fns && (fns.length = 0);
      } else {
        for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
          var _fn = fns[l];
          if (_fn === fn) {
            fns.splice(l, 1) //删除订阅者的回调函数
          }
        }
      }
    };
    var salesOffices = {};
    var installEvent = function (obj) {
      for (var i in event) {
        obj[i] = event[i];
      }
    }  

    installEvent(salesOffices);
    salesOffices.listen('squareMeter88', fn1 = function (price) { //小明订阅消息
      console.log('价格 = ' + price);
    });
    salesOffices.listen('squareMeter88', fn2 = function (price) { //小红订阅消息
      console.log('价格=' + price);
    });
    salesOffices.remove('squareMeter88', fn1); //发布88平方米房子的价格
    salesOffices.trigger('squareMeter110', 2000000); //发布110平方米房子的价格
```
<a name="N7HLb"></a>
##  网站登录
假设小明负责某个商城网站的登录模块。网站里有header头部、nav导航、消息列表、购物车等模块。
```javascript 
    login.succ(function (data) {
      header.setAvatar(data.avatar); //设置header模块头像
      nav.setAvatar(data.avatar); //设置导航模块头像
      message.refresh(); //刷新消息列表
      cart.refresh(); //刷新购物车列表
    })
```
现在登录模块是小明负责编写的
这样的代码存在一定的缺点
**缺点**
* header模块不能随意再改变setAvatar的方法名，它自身的名字也不能被改为header1、header2。这是针对具体实现编程的典型例子，针对具体实现编程是不被赞同的。
* 等到有一天，项目中又新增了一个收货地址管理的模块，你只能再翻开之前的登录模块，在登陆模块上加入刷新购物车的列表代码。
```javascript
    login.succ(function (data) {
      header.setAvatar(data.avatar); //设置header模块头像
      nav.setAvatar(data.avatar); //设置导航模块头像
      message.refresh(); //刷新消息列表
      cart.refresh(); //刷新购物车列表
      address.refresh(); //新增这行代码
    })
```
这样就需要代码重构，改变成好维护的，可复用的，提升性能效率的代码。
所以用到发布-订阅模式设计思想。用发布—订阅模式重写之后，对用户信息感兴趣的业务模块将自行订阅登录成功的消息事件。当登录成功时，登录模块只需要发布登录成功的消息，而业务方接受到消息之后，就会开始进行各自的业务处理，登录模块并不关心业务方究竟要做什么，也不想去了解它们的内部细节。改善后的代码如下
```javascript
$.ajax('http://xxx.com? login',function(data){ // 登录成功
login.trigger('loginSucc',data);//
发布登录成功的消息
});
```
<a name="YYym8"></a>
### 各模块监听登录成功的消息
```javascript
var header=(function(){//header模块

login.listen('loginSucc',function( data){

header.setAvatar(data.avatar);
});
return {
setAvatar:function(data){
console.log('设置header模块的头像');
  }
 }
})();

var nav=(function(){//nav模块
login.listen('loginSucc',function( data){

nav.setAvatar(data.avatar);
});
return {
setAvatar:function(avatar){
console.log('设置nav模块的头像');
  }
 }
})();

```
如上所述，我们随时可以改变setAvatar的方法名。如果有一天在登录完成之后，又增加一个刷新收货地址列表的行为，那么只要在收货地址模块里加上监听消息的方法即可，而这可以让开发该模块的同事自己完成，你作为登录模块的开发者，永远不用再关心这些行为了。代码如下
```javascript
var address =(function(){ // nav模块
login.listen('loginSucc', function( obj
) {
address.refresh(obj);
});
return {
refresh: function( avatar){
console.log('刷新收货地址列表');
  }
 }
})();
```
<a name="W9dTV"></a>
## 全局的发布-订阅对象
回想下刚刚实现的发布—订阅模式，我们给售楼处对象和登录对象都添加了订阅和发布的功能，这里还存在两个小问题。<br />❏ 我们给每个发布者对象都添加了listen和trigger方法，以及一个缓存列表clientList，这其实是一种资源浪费。<br />❏ 小明跟售楼处对象还是存在一定的耦合性，小明至少要知道售楼处对象的名字是salesOffices，才能顺利的订阅到事件。见如下代码：
```javascript
  salesOffices.listen('squareMeters100', function (price) {
    console.log('价格=' + price); //小明订阅消息
  })
```
如果小明还关心300平方米的房子，而这套房子的卖家是salesOffices2，这意味着小明要开始订阅salesOffices2对象。见如下代码：
```javascript
  salesOffices2.listen('squareMeters300', function (price) {
    console.log('价格=' + price); //小明订阅消息
  })
```
其实我们只要把订阅的请求交给中介公司，而各大房产公司也只需要通过中介公司来发布房子信息。这样一来，我们不用关心消息是来自哪个房产公司，我们在意的是能否顺利收到消息。当然，为了保证订阅者和发布者能顺利通信，订阅者和发布者都必须知道这个中介公司。同样在程序中，发布—订阅模式可以用一个全局的Event对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者，Event作为一个类似“中介者”的角色，把订阅者和发布者联系起来。见如下代码：
```javascript
var Event=(function(){
var clientList= {}, 
    listen, 
    trigger, 
    renove;
listen=function(key,fn){ 
if(!clientList[ key]){
clientList[ key ]=[];
}                      
clientList[ key ].push(fn);
};
trigger =function(){
var key=Array.prototype.shift.call(arguments),
fns=clientList[ key ];
if(!fns || fns.length===0){
return false;
}
for(var i=0,fn;fn=fns[i++ ];)
fn.apply(this,argunents);
}
};
remove = function(key,fn){
var fns =clientList[ key ];
if(!fns ){
return false;
}
if(!fn){
fns &&(fns.length===0);
}else{
for(var l=fns.length-1:l>=0;l--){
var _fn=fns[l];
if(_fn===fn ){
fns.splice(l，1);
    }
   }
  }
};
return {
listen: listen,
trigger: trigger,
remove:remove
}
})();
Event.listen('squareMeter88',function( price ){ // 小红订阅消息

console.log('价格='+price); //输出:价格=2000000 

});
Event.trigger('squareMeter88',2000000); //售楼处发布消息

```
<a name="fFhDj"></a>
## 模块间通信
上一节中实现的发布—订阅模式的实现，是基于一个全局的Event对象，我们利用它可以在两个封装良好的模块中进行通信，这两个模块可以完全不知道对方的存在。就如同有了中介公司之后，我们不再需要知道房子开售的消息来自哪个售楼处。<br />比如现在有两个模块，a模块里面有一个按钮，每次点击按钮之后，b模块里的div中会显示按钮的总点击次数，我们用全局发布—订阅模式完成下面的代码，使得a模块和b模块可以在保持封装性的前提下进行通信。
```javascript
 var Event = (function () {
  var clientList = {},
      listen,
      trigger,
      renove;
     listen = function (key, fn) {
      if (!clientList[key]) {
       clientList[key] = [];
       }
       clientList[key].push(fn);
     };
     trigger = function () {
      var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
      if (!fns || fns.length === 0) {
       return false;
     }
     for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
      }
     };
     remove = function (key, fn) {
      var fns = clientList[key];
      if (!fns) {
       return false;
      }
      if (!fn) {
        fns && (fns.length === 0);
      } else {
       for (var l = fns.length - 1; l >= 0; l--) {
          var _fn = fns[l];
          if (_fn === fn) {
           fns.splice(l, 1);
          }
       }
      }
   };
    return {
     listen: listen,
     trigger: trigger,
     remove: remove
    }
  })();
  Event.listen('squareMeter88', function (price) { // 小红订阅消息

  console.log('价格=' + price); //输出:价格=2000000

 });
 Event.trigger('squareMeter88', 2000000); //售楼处发布消息
```
### 需要注意的问题
模块之间如果用了太多的全局发布—订阅模式来通信，那么模块与模块之间的联系就被隐藏到了背后。我们最终会搞不清楚消息来自哪个模块，或者消息会流向哪些模块，这又会给我们的维护带来一些麻烦，也许某个模块的作用就是暴露一些接口给其他模块调用。<br />​<br />
<a name="hRHuy"></a>

## 优点
* 发布—订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。
* 它的应用非常广泛，既可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。
* 发布—订阅模式还可以用来帮助实现一些别的设计模式，比如中介者模式。从架构上来看，无论是MVC还是MVVM，都少不了发布—订阅模式的参与，而且JavaScript本身也是一门基于事件驱动的语言。
## 缺点
* 创建订阅者本身要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。
* 发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一起的时候，要跟踪一个bug不是件轻松的事情。
# 鸣谢
本文鸣谢《javascript设计模式与开发者实践》一书。

# 总结
本文介绍了策略模式与发布-订阅模式两种设计模式。

希望可以让各位读者对这两种设计模式思想有一个更清楚的了解，能够在代码中可应用的地方应用上这两种思想，提高代码的可维护性与可复用性。

感谢您的阅读，我是数字办的祁文杰，期待与您共同成长！！！