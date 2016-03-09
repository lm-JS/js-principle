# JS this
    this都是指向实例化对象
### window对象与this对象
> 在javascript语言里全局作用域可以理解为window对象，记住window是对象而不是类，也就是说window是被实例化的对象，这个实例化的过程是在页面加载时候由javascript引擎完成的，整个页面里的要素都被浓缩到这个window对象，因为程序员无法通过编程语言来控制和操作这个实例化过程，所以开发时候我们就没有构建这个this指针的感觉，常常会忽视它，这就是干扰我们在代码里理解this指针指向window的情形。

    <script type="text/javascript">
    this.a = "aaa";
    console.log(a);//aaa
    console.log(this.a);//aaa
    console.log(window.a);//aaa
    console.log(this === window);// true
    </script>

### 声明式function和表达式函数（变量接收了定义匿名函数时它返回的内存地址）
> 在javascript语言通过声明函数方式定义函数，javascript引擎在预处理过程里就把函数定义和赋值操作都完成了，预处理是和执行环境相关，执行环境有两大类：全局执行环境和局部执行环境，执行环境是通过上下文变量体现的，其实这个过程都是在函数执行前完成，预处理就是构造执行环境的另一个说法，总而言之预处理和构造执行环境的主要目的就是明确变量定义，分清变量的边界，但是在全局作用域构造或者说全局变量预处理时候对于声明函数有些不同，声明函数会将变量定义和赋值操作同时完成，因此我们看到下面代码的运行结果。由于声明函数都会在全局作用域构造时候完成，因此声明函数都是window对象的属性，这就说明为什么我们不管在哪里声明函数，声明函数最终都是属于window对象的原因了。javascript变量名称不管在那个作用域有效，堆区的存储的函数都是在全局执行环境时候就被固定下来了，变量的名字只是一个指代而已。

    <script type="text/javascript">
    console.log(ftn01);
    //ftn01()  注意：在firebug下这个打印结果是可以点击，点击后会显示函数的定义
    console.log(ftn02); 
    // undefined **在内存的栈区已经有了变量的名称，但是没有栈区的变量值，同时堆区是没有具体的对象,则为undefined**
    function ftn01(){
       console.log("I am ftn01!");
    }
    var ftn02 = function(){
        console.log("I am ftn02!");
    }
    </script>
### this都是指向实例化对象
    在全局执行环境里window就是上下文对象，那么在obj里局部作用域通过obj来代表了
> * Javascript里通过字面量方式定义对象的方式是new Object的简写，二者是等价的。Object就是面向对象的类，{}里就是实例对象了
* function既是函数又可以表示对象，function是函数时候还能当做构造函数，javascript的构造函数我常认为是把类和构造函数合二为一  
     **new操作符的操作是**
     1. 创建一个新对象；
     2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
     3. 执行构造函数中的代码（为这个新对象添加属性）；
     4. 返回新对象

    <script type="text/javascript">
    var obj = {
        name:"sharpxiajun",
        job:"Software",
        show:function(){
            console.log("Name:" + this.name + ";Job:" + this.job);
            console.log(this);
    // Object { name="sharpxiajun", job="Software", show=function()}
        }
    };
    obj.show();//Name:sharpxiajun;Job:Software
    function Person(name,sex,age,job){
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.job = job;
        this.showPerson = function(){
            console.log("姓名:" + this.name);
            console.log("性别:" + this.sex);
            console.log("年龄:" + this.age);
            console.log("工作:" + this.job);
            console.log(this);
            // Person { name="马云", sex="男", age=46, 更多...}
        }
    }
    var person = new Person("马云", "男", 46, "董事长");
    person.showPerson();
</script>

### Call和apply是改变函数的作用域

    var name = "sharpxiajun";
    function ftn(name){
        console.log(name);
        console.log(this.name);
        console.log(this);
    }
    ftn("101");//
    var obj = {
      name:"xtq"
    };
    ftn.call(obj,"102");

![call运行结果][1]

### 对象方法中的this
> * 情形一：传入的参数是函数的别名，那么函数的this就是指向window；
 * 情形二：传入的参数是被new过的构造函数，那么this就是指向实例化的对象本身；
 * 情形三：如果我们想把被传入的函数对象里this的指针指向外部字面量定义的对象，那么我们就是用apply和call
 
    var name = "I am window";
    var obj = {
        name:"sharpxiajun",
        job:"Software",
        ftn01:function(obj){
            obj.show();
        },
        ftn02:function(ftn){
            ftn();
        },
        ftn03:function(ftn){
            ftn.call(this);
        }
    };
    function Person(name){
        this.name = name;
        this.show = function(){
            console.log("姓名:" + this.name);
            console.log(this);
        }
    }
    var p = new Person("Person");
    obj.ftn01(p);
    obj.ftn02(function(){
       console.log(this.name);
       console.log(this);
    });
    obj.ftn03(function(){
        console.log(this.name);
        console.log(this);
    }); 
    
![运行结果][2]
[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/k.png
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/prototype/kk.png
[3]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/constructor/iiii.png
