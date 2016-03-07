### prototype 和 \_\_proto\_\_(原型链)
　　\_\_proto\_\_成员严格的说这个成员不应该叫这个名字，\_\_proto\_\_是Firefox中的称呼，\_\_proto\_\_只有在Firefox浏览器中才能被访问到。
　
> * prototype属性只有函数才有，其他类型的对象没有，一个函数如果当做构造函数来使用，它的对象不仅包含本身的对象和方法，还有个\_\_proto\_\_属性，\_\_proto\_\_ 指向这个函数的prototype。除了prototype自定义的属性和方法，还包含构造函数和父对象的\_\_proto\_\_;
* \_\_proto\_\_是指向其原型对象的引用!  
 每个对象都有一个\_\_proto\_\_属性,当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去\_\_proto\_\_里找这个属性，这个\_\_proto\_\_又会有自己的\_\_proto\_\_，于是就这样一直找下去，也就是我们平时所说的**原型链的概念**。  
 ***因为对象都继承于Object方法,所有原型链的顶端就是Object.prototype;***  
 ***是谁的类型实例它的\_\_proto\_\_就是谁，反之亦然！***
 * 所有构造器/函数的__proto__都指向Function.prototype，它是一个空函数（Empty function）
 
 
 
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
