# prototype 和 \_\_proto\_\_(原型链)

### prototype
> * prototype是通过调用构造函数创建的那个对象的原型对象,实现原型链调用;只有函数对象才有(除了Function.prototype没有)，其他类型的对象没有，一个函数如果当做构造函数来使用，它的对象不仅包含本身的对象和方法，还有个\_\_proto\_\_属性，\_\_proto\_\_ 指向这个函数的prototype。除了prototype自定义的属性和方法，还包含构造函数和父对象的\_\_proto\_\_;
* 使用原型的好处是可以让所有对象实例共享它所包含的属性和方法;

### \_\_proto\_\_是指向其原型对象的引用!  
> 每个对象(函数也是对象)都有一个\_\_proto\_\_属性,当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去\_\_proto\_\_里找这个属性，这个\_\_proto\_\_又会有自己的\_\_proto\_\_，于是就这样一直找下去，也就是我们平时所说的**原型链的概念**。  
 ***因为对象都继承于Object方法,所有原型链的顶端就是Object.prototype;***  
 ***是谁的类型实例它的\_\_proto\_\_就是谁，反之亦然！***  
　　\_\_proto\_\_成员严格的说这个成员不应该叫这个名字，\_\_proto\_\_是Firefox中的称呼，\_\_proto\_\_只有在Firefox浏览器中才能被访问到。

### 构造器/函数
> * 使自己的对象多次复制，同时实例根据设置的访问等级可以访问其内部的属性和方法
* 当对象被实例化后，构造函数会立即执行它所包含的任何代码
* 原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

    function myObject(msg){
        //特权属性(公有属性)
        this.myMsg = msg; //只在被实例化后的实例中可调用
        this.address = '上海';
    
          //私有属性
          var name = '豪情';
          var age = 29;
          var that = this;
         
          //私有方法
          function sayName(){
             alert(that.name);
          }
          //公有方法,能被外部公开访问
          //这个方法每次实例化都要重新构造,因而实例越多占用的内存越多,而prototype是原型共享，所有实例化后，都共同引用同一个
          this.sayAge = function(){
             alert(name); //在公有方法中可以访问私有成员
          }
    }
     var obj = new myObject("浪漫");
     //静态属性
      myObject.name = 'china';
    //静态方法
    myObject.alertname = function(){
        alert(this.name);
    }
    console.log(obj);  
     

* 所有构造器/函数的\_\_proto\_\_都指向Function.prototype，它是一个空函数（Empty function）  
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

![prototyoe图][2]
> 1. 构造函数Foo()
构造函数的原型属性Foo.prototype指向了原型对象，在原型对象里有共有的方法，所有构造函数声明的实例（这里是f1，f2）都可以共享这个方法。
2. 原型对象Foo.prototype
Foo.prototype保存着实例共享的方法，有一个指针constructor指回构造函数。
3. 实例
f1和f2是Foo这个对象的两个实例，这两个对象也有属性__proto__，指向构造函数的原型对象，这样子就可以像上面1所说的访问原型对象的所有方法啦。
4. 另外：
构造函数Foo()除了是方法，也是对象啊，它也有__proto__属性，指向谁呢？
指向它的构造函数的原型对象呗。函数的构造函数不就是Function嘛，因此这里的__proto__指向了Function.prototype。
其实除了Foo()，Function(), Object()也是一样的道理。
5. 原型对象也是对象啊，它的__proto__属性，又指向谁呢？
同理，指向它的构造函数的原型对象呗。这里是Object.prototype.
6. 最后，Object.prototype的__proto__属性指向null。



[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/i.png
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/e83bca5f1d1e6bf359d1f75727968c11_b.jpg
[3]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/iii.png
