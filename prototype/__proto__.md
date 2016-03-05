### __proto__(原型链)

> \_\_proto\_\_是指向其原型对象的引用!  
 每个对象都有一个__proto__属性,当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去__proto__里找这个属性，这个__proto__又会有自己的__proto__，于是就这样一直找下去，也就是我们平时所说的**原型链的概念**。  
 ***因为对象都继承于Object,所有原型链的顶端就是Object.prototype;***  
 
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

> ![__proto__是指向其原型对象的引用][1]




[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/i.png
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/ii.png
[3]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/iii.png
