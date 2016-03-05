### __proto__

> __proto__是指向其原型对象的引用!  
 每个对象都有一个__proto__属性,原型链上的对象正是依靠这个__proto__属性连结在一起的!

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
