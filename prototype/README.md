# prototype
### 原型法设计模式
>原型法的主要思想是，现在有1个类A,我想要创建一个类B,这个类是以A为原型的,并且能进行扩展。我们称B的原型为A。

### javascript的方法可以分为三类：
> * 类方法
  People.Run=function(){
  alert("I can run");
  }
*  对象方法
    function People(name){
    this.name=name;
    //对象方法
    this.Introduce=function(){
      alert("My name is "+this.name);
    }
  }
* 原型方法
  //原型方法
  People.prototype.IntroduceChinese=function(){
    alert("我的名字是"+this.name);
  }
