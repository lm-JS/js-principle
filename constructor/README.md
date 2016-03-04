# js Constructor

### 构造函数
> * 使自己的对象多次复制，同时实例根据设置的访问等级可以访问其内部的属性和方法
* 当对象被实例化后，构造函数会立即执行它所包含的任何代码

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
          //特权方法(公有方法)
          //能被外部公开访问
          //这个方法每次实例化都要重新构造而prototype是原型共享，所有实例化后，都共同引用同一个
          this.sayAge = function(){
             alert(name); //在公有方法中可以访问私有成员
          }
          //私有和特权成员在函数的内部，在构造函数创建的每个实例中都会包含同样的私有和特权成员的副本，
          //因而实例越多占用的内存越多
    }
     var obj = new myObject("浪漫");
     console.log(obj);//输出
     ![对象实例结果][1]

[1]:　
