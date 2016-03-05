### __proto__

> __proto__是指向其原型对象的引用!  
 每个对象都有一个__proto__属性,当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去__proto__里找这个属性，这个__proto__又会有自己的__proto__，于是就这样一直找下去，也就是我们平时所说的*原型链的概念*。

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
    var dog = new Animal("小黄");
    console.log(dog);
    console.log(Animal.prototype);
    console.log(dog.__proto__);
    console.log(Animal.prototype===dog.__proto__); //判断__proto__是否引用 Animal.prototype,  true;

> ![__proto__是指向其原型对象的引用][1]




[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/i.png
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/ii.png
[3]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/iii.png
