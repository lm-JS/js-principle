# prototype 和 \_\_proto\_\_(原型链)

### prototype
> * prototype是通过调用构造函数创建的那个对象的原型对象(\_\_proto\_\_),实现原型链调用;只有函数对象才有(除了Function.prototype没有)，其他类型的对象没有。一个函数如果当做构造函数来使用，它的对象不仅包含本身的对象和方法，还有个\_\_proto\_\_属性，\_\_proto\_\_ 指向这个函数的prototype。
* 使用原型的好处是可以让所有对象实例共享它所包含的属性和方法;
* 基于类的语言中，类就像一个模具；对象由这个模具浇注产生，而基于原型的语言中，原型中有公共的资源，对象可以一直向上一级原型中获得资源。

### \_\_proto\_\_是指向其原型对象的引用!  
> 每个对象(函数也是对象)都有一个\_\_proto\_\_属性,当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去\_\_proto\_\_里找这个属性，这个\_\_proto\_\_又会有自己的\_\_proto\_\_，于是就这样一直找下去，也就是我们平时所说的**原型链的概念**。  
 ***因为对象都继承于Object方法,所有原型链的顶端就是Object.prototype;***  
 ***是谁的类型实例它的\_\_proto\_\_就指向谁的prototype对象，反之亦然！***  
　　\_\_proto\_\_成员严格的说这个成员不应该叫这个名字，\_\_proto\_\_是Firefox中的称呼，\_\_proto\_\_只有在Firefox浏览器中才能被访问到。

	    function A() {
        this.name = 'aaaa';
        this.age = 11;
        this.fun = function(){
            return this.name;
        }
        this.funm = function(){
            return this.sex;
        }
    }
    function B() {
        this.name = "bbbb";
        this.age = 22;
        this.sex = "男";
        this.fun = function(){
            return this.name;
        }
        this.funp = function(){
            return this.age;
        }
    }
    B.prototype = new A();
    A.prototype = new B();
    var a = new A();
    var b = new B();
    console.log(a); //a实例的__proto__指向A.prototype,即B的实例
    console.log(b); //b实例的__proto__指向B.prototype,即A的实例
    console.log(a.fun());//先去a对象内部找fun方法，找到了，所以调用本对象内部的fun方法； 运行结果：aaaa
    console.log(b.fun());//先去b对象内部找fun方法，找到了，所以调用本对象内部的fun方法； 运行结果：bbbb
    console.log(b.funp());//先去b对象内部找funp方法，找到了，所以调用本对象内部的funp方法； 运行结果：22
    console.log(a.funp());//先去a对象内部找funp方法，没找到，所以从本对象的__proto__对象找，找到了，本对象也有age属性 运行结果：11
    console.log(a.funm());//先去a对象内部找funm方法，找到了，但是a对象本身没有sex属性，所以从__proto__对象找，找到了; 运行结果：男
![prototyoe图][4]![prototyoe图][5]
　　理解prototype不应把它和继承混淆。B的prototype为A的一个实例，可以理解B将A中的方法和属性全部克隆了一遍。B能使用A的方法和属性。 这里强调的是克隆而不是继承。可以出现这种情况：A的prototype是B的实例，同时B的prototype也是A的实例。  
  如果B中本身包含有一个与A的方法同名的方法,函数运行时会先去本体的函数中去找，如果找到则运行，找不到则去prototype中寻找函数。或者可以理解为prototype不会克隆同名函数。 

### 构造器/函数
> * 使自己的对象多次复制，同时实例根据设置的访问等级可以访问其内部的属性和方法
* 当对象被实例化后，构造函数会立即执行它所包含的任何代码
* 原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。
*  除非必须用构造函数闭包，否则尽量用原型定义成员函数，因为这样可以减少开支
* 尽量在构造函数定义一般成员，尤其是对象或者数组，因为用原型定义的成员是多个实例共享的

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
          this.sayAge = function(){//有闭包开销
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
 	//实例不能调用类型的静态属性或方法，否则发生对象未定义的错误。
	console.log(obj.alertname);//error 实例不能调用类型的静态属性和方法
    //obj 想访问类的静态属性，先访问该实例的构造函数，然后在访问该类静态属性
    console.log(obj.constructor.name);  
### new操作符

    /*******************************
     * new操作符的操作是
     * var obj = {} //初始化一个对象obj
     * obj.__proto__ =  myObject.prototype //将myObject方法（也是一个对象）的prototype属性给__proto__
     * myObject.call(obj) //用obj对象引用myObject方法中的this对象;
     * ***********************************************/

### Function 与 Object 
> * Function是所有函数对象的基础，而Object则是所有对象（包括函数对象）的基础
* 在JavaScript中，任何一个对象都是Object的实例，可以修改Object这个类型来让所有的对象具有一些通用的属性和方法  
>> JS中对象被创建的三种方式：  
  1. 对象字面量的方式  
  2. new 的方式  
  3. ES5中的Object.create()  
　　但是我认为本质上只有一种方式，也就是通过new来创建。为什么这么说呢，首先字面量的方式是一种为了开发人员更方便创建对象的一个语法糖，本质就是 var o = new Object(); o.xx = xx;o.yy=yy; 再来看看Object.create(),这是ES5中新增的方法，在这之前这被称为原型式继承，

* 用 typeof得到一个函数对象的类型,返回字符串“function”的对象叫函数对象
* 函数对象与普通对象的区别是：它不仅是对象，同时也是对象构造器，可以new一个函数来返回一个对象，这样的对象也叫构造器。
* arguments对象存储的是实际传递给函数的参数，而不局限于函数声明所定义的参数列表  
    **//扩展Object的原型**  
    Object.prototype.extend="123";  
    console.log("Function:"+Function.extend);//在Function中出现了extend属性  
    console.log("Object:"+Object.extend);//在Object中出现了extend属性，此时Object还是个Function  
    var obj=new Object;  
    console.log("Object instance:"+obj.extend);//在obj中扩展了extend，此时的obj是object  
    function Foo(){}  
    var foo = new Foo;  
    console.log("foo object:"+foo.extend);//foo对象上扩展上了extend属性  
    console.log("Foo Function:"+Foo.extend);//函数上也扩展上了extend属性  
    **//扩展Function的原型性**  
    Function.prototype.extend="123";  
    console.log("Function:"+Function.extend);//在Function中出现了extend属  
    console.log("Object:"+Object.extend);//在Object中出现了extend属性，注意此时Object是个Function  
    var obj=new Object;  
    console.log("Object instance:"+obj.extend);//在obj中没有扩展上extend，此时的obj是object  
    function Foo(){}  
    var foo = new Foo;  
    console.log("foo object:"+foo.extend);//foo对象上没有扩展上extend  
    console.log("Foo Function:"+Foo.extend);//Function扩展上了extend属性  
**说明Function只管没有被实例化得，被实例化的，他是没有办法管的。与Object不同，Object是无论是否实例化都管的。** 

### prototype 与 \_\_proto\_\_的关系：
    function定义的对象有一个prototype属性，使用new生成的对象就没有这个prototype属性
> * \_\_proto\_\_是JS内部使用寻找原型链的属性。 
* prototype是显式修改对象的原型的属性。
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

![prototyoe图][2]
> 1. 构造函数Foo()
构造函数的原型属性Foo.prototype指向了原型对象，在原型对象里有共有的方法，所有构造函数声明的实例（这里是f1，f2）都可以共享这个方法。
2. 原型对象Foo.prototype
Foo.prototype保存着实例共享的方法，有一个指针constructor指回构造函数。
3. 实例
f1和f2是Foo这个对象的两个实例，这两个对象也有属性\_\_proto\_\_，指向构造函数的原型对象，这样子就可以像上面1所说的访问原型对象的所有方法啦。
4. 另外：
构造函数Foo()除了是方法，也是对象啊，它也有\_\_proto\_\_属性，指向谁呢？
指向它的构造函数的原型对象呗。函数的构造函数不就是Function嘛，因此这里的\_\_proto\_\_指向了Function.prototype。
其实除了Foo()，Function(), Object()也是一样的道理。
5. 原型对象也是对象啊，它的\_\_proto\_\_属性，又指向谁呢？
同理，指向它的构造函数的原型对象呗。这里是Object.prototype.
6. 最后，Object.prototype的\_\_proto\_\_属性指向null。  
参考：  
http://anykoro.sinaapp.com/2012/01/31/javascript%E4%B8%ADfunctionobjectprototypes__proto__%E7%AD%89%E6%A6%82%E5%BF%B5%E8%AF%A6%E8%A7%A3/

### prototye 与 constructor
>使用原型与构造函数的不同

>1. 构造函数内定义的属性继承方式与原型不同，子对象需要显式调用父对象才能继承构造函数内定义的属性；
2. 构造函数内定义的任何属性，包括函数在内都会被充分创建，同一个构造函数产生的两个对象不共享实例；
3. 构造函数内定义的函数，有运行时的闭包开销，因为构造函数内的局部变量对其中定义的函数来说也是可见的。

	function Animal(){}
	var anim = new Animal();
	console.log(anim.constructor===Animal); //true
	console.log(Animal.prototype.constructor===Animal); //true
    console.log(Function.prototype.constructor===Animal.constructor); //true
	console.log(Function.prototype.constructor===Function); //true		    console.log(Function.constructor===Function.prototype.constructor); //true
	console.log(Object.prototype.constructor===Object); //true
	console.log(Object.constructor===Function); //true
![prototype_constructo的关系图][7]  
　　上图中，红色箭头表示函数对象的原型的constructor所指向的对象。
注意Object.constructor===Function；本身Object就是Function函数构造出来的
如何查找一个对象的constructor，就是在该对象的原型链上寻找碰到的第一个constructor属性所指向的对象。

[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/i.png
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/e83bca5f1d1e6bf359d1f75727968c11_b.jpg
[3]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/iii.png
[4]: a.png
[5]: b.png
[6]: c.png
[7]: prototype_constructo.png
