# prototype 和 \_\_proto\_\_(原型链)

### prototype
> * prototype属性只有函数对象才有(除了Function.prototype没有)，其他类型的对象没有，一个函数如果当做构造函数来使用，它的对象不仅包含本身的对象和方法，还有个\_\_proto\_\_属性，\_\_proto\_\_ 指向这个函数的prototype。除了prototype自定义的属性和方法，还包含构造函数和父对象的\_\_proto\_\_;

### \_\_proto\_\_是指向其原型对象的引用!  
> 每个对象(函数也是对象)都有一个\_\_proto\_\_属性,当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去\_\_proto\_\_里找这个属性，这个\_\_proto\_\_又会有自己的\_\_proto\_\_，于是就这样一直找下去，也就是我们平时所说的**原型链的概念**。  
 ***因为对象都继承于Object方法,所有原型链的顶端就是Object.prototype;***  
 ***是谁的类型实例它的\_\_proto\_\_就是谁，反之亦然！***  
　　\_\_proto\_\_成员严格的说这个成员不应该叫这个名字，\_\_proto\_\_是Firefox中的称呼，\_\_proto\_\_只有在Firefox浏览器中才能被访问到。

### 构造器/函数
> * 所有构造器/函数的\_\_proto\_\_都指向Function.prototype，它是一个空函数（Empty function）  
　　console.log(Function.prototype);  //function Empty();  
　　console.log(Animal.\_\_proto\_\_);    //function Empty();  
　　console.log(Function.prototype===Animal.\_\_proto\_\_)// true  
　　console.log(String.\_\_proto\_\_ === Function.prototype)// ture  
　　console.log(Object.\_\_proto\_\_ === Function.prototype)//true  
　　*说明了自定义/String等一些内置的构造器其实是Function的一个对象。 也就是说相当于 var String = new Function();所有的构造器都来自于Function.prototype，所有构造器都继承了Function.prototype的属性及方法*  
　　Math，JSON是以对象形式存在的，无需new。它们\_\_proto\_\_是Object.prototype  
　　console.log(Math.\_\_proto\_\_ === Object.prototype)// true  
　　console.log(JSON.\_\_proto\_\_ === Object.prototype)// true  
　　Function.prototype也是唯一一个typeof XXX.prototype为 “function”的prototype。其它的构造器的prototype都是一个对象  
　　console.log(typeof Function.prototype)//function  
　　console.log(typeof Number.prototype)// object  
* Function.prototype的\_\_proto\_\_是谁呢？  
　　console.log(Function.prototype.\_\_proto\_\_ === Object.prototype)//true  
　　这说明所有的构造器也都是一个普通JS对象，可以给构造器添加/删除属性等。同时它也继承了Object.prototype上的所有方法：toString、valueOf、hasOwnProperty等。
* Object.prototype的\_\_proto\_\_是谁?  
　　Object.prototype.\_\_proto\_\_ === null //true已经到顶了，为null。  

### Function 与 Object 
> * Function是所有函数对象的基础，而Object则是所有对象（包括函数对象）的基础
* 在JavaScript中，任何一个对象都是Object的实例，可以修改Object这个类型来让所有的对象具有一些通用的属性和方法
* 用 typeof得到一个函数对象的类型,返回字符串“function”的对象叫函数对象
* 函数对象与普通对象的区别是：它不仅是对象，同时也是对象构造器，可以new一个函数来返回一个对象，这样的对象也叫构造器。
* arguments对象存储的是实际传递给函数的参数，而不局限于函数声明所定义的参数列表
 
 
### new操作符

    /*******************************
     * new操作符的操作是
     * var dog = {} //初始化一个对象p
     * p.__proto__ =  Animal.prototype //将Animal方法（也是一个对象）的prototype属性给__proto__
     * Animal.call(p) //用p对象引用Animal方法中的this对象;
     * ***********************************************/
### 例子1：
    //定义类方法
    function Animal(name) {
        var age = 10;
        this.name = name;
    }
    //Animal.prototype 是一个仅含一个方法的对象
    Animal.prototype.getInfo = function() {
        alert("rname: "+this.name);
    };
    //建一个Animal实例
    var dog = new Animal("小黄");//可以得出dog.__proto__=Animal.prototype
    dog.getInfo();//调用dog.getInfo()时，首先dog中没有getInfo这个属性，于是，他就需要到他的__proto__中去找，也就是Animal.prototype，而 我们在上面定义了Animal.prototype.getInfo=function(){}; 于是，就找到了这个方法。
    console.log(dog);
    console.log(Animal.prototype);
    console.log(dog.__proto__);
    console.log(Animal.prototype===dog.__proto__); //判断__proto__是否引用 Animal.prototype,  true;

> ![\_\_proto\_\_是指向其原型对象的引用][1]

### prototype 与 \_\_proto\_\_的区别：
> * \_\_proto\_\_是JS内部使用寻找原型链的属性。 
* prototype是显式修改对象的原型的属性。 


[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/i.png
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/ii.png
[3]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/iii.png
