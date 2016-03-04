# prototype
### 原型法设计模式
>原型法的主要思想是，现在有1个类A,我想要创建一个类B,这个类是以A为原型的,并且能进行扩展。我们称B的原型为A。

### javascript的方法可以分为三类：
> * 类方法  
* 对象方法
* 原型方法

    function People(name){
        this.name=name;
        //对象方法
        this.Introduce=function(){
            alert("My name is "+this.name);
        }
    }
    //原型方法
    People.prototype.IntroduceChinese=function(){
        alert("我的名字是"+this.name);
    }
    //类方法
    People.Run=function(){
        alert("I can run");
    }    
    //测试
    var p1=new People("Windking");
    p1.Introduce();
    People.Run();
    p1.IntroduceChinese(); 
    
### prototype是什么含义？
> javascript中的每个对象(构造函数)都有prototype属性，Javascript中对象的prototype属性的解释是：返回对象类型原型的引用。例：
 console.log(Test.prototype);
    function A() {
        this.name = 'aaaa';
        this.fun = function(){
            alert(this.name);
        }
    }
    function B() {
        
    }
    B.prototype = new A();
    var instance = new B();
    alert(instance.fun());//aaaa
  理解prototype不应把它和继承混淆。B的prototype为A的一个实例，可以理解B将A中的方法和属性全部克隆了一遍。B能使用A的方法和属性。 这里强调的是克隆而不是继承。可以出现这种情况：A的prototype是B的实例，同时B的prototype也是A的实例。  
  如果B中本身包含有一个与A的方法同名的方法,函数运行时会先去本体的函数中去找，如果找到则运行，找不到则去prototype中寻找函数。或者可以理解为prototype不会克隆同名函数。  
  如果就想要调用A方法中与B同名的函数，可以用instance.__proto__.fun()或者[call,applay bind][]等实现，如：

    function A(name) {
        this.name = name;
        this.fun = function(){
            alert(this.name);
        }
    }
    function B(name) {
        this.name = name;
        this.fun = function(){
            alert(this.name);
        }
    }
    var aobj = new A('aaaa');
    B.prototype = aobj;
    var bobj = new B('bbbb');
    bobj.fun.call(aobj);

