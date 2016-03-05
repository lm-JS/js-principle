//定义类方法
    function Animal(name) {
        var age = 10;
        this.name = name;
        this.getAge = function(){
            return age;
        }
    }
//Animal.prototype 是一个仅含一个方法的对象
    Animal.prototype.swimming = function() {
        console.log("I'm '"+this.name+"' from Animal");
    };
    //建一个Animal实例
    var dog = new Animal("小黄");
    /*******************************
     * new操作符的操作是
     * var dog = {} //初始化一个对象p
     * p.__proto__ =  Animal.prototype //将Animal方法（也是一个对象）的prototype属性给__proto__
     * Animal.call(p) //用p对象引用Animal方法中的this对象;
     * ***********************************************/
    function Fish() {
        this.name="鲤鱼";
    }
     var fish1 = new Fish();
    Fish.prototype.swimming = function(){
        console.log("I'm '"+this.name+"' from Fish");
    }
    fish1.swimming();
    Fish.prototype = new Animal("金鱼");
    dog.swimming();
    fish1.swimming();
