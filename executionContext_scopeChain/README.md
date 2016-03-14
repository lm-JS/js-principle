# Javascript 执行环境 与 作用域
> javascript代码在运行前有一个过程就是：预加载，预加载的目的是要事先构造运行环境例如全局环境，函数运行环境，还要构造作用域链，而**执行环境和作用域的构造的核心内容就是明确变量定义，指定好变量属于哪个范畴**，因此在javascript语言里变量的定义是在预加载完成而非在运行时期。

# JS 作用域
> 通常来说，一段程序代码中所用到的名字并不总是有效/可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。 作用域的使用提高了程序逻辑的局部性，增强程序的可靠性，减少名字冲突。

### 执行环境
> * javascript里作用域有一个专门的定义execution context，有的书里把这个名字翻译成执行上下文，有的书籍里把它翻译成执行环境，我更倾向于后者执行环境。执行环境在javascript语言里并非是一个抽象的概念，而是有具体的实现，这个实现其实是个对象，这个对象也有个名字叫做variable object，这个变量有的书里翻译为变量对象，这是直译，有的书里把它称为上下文变量，这里我还是倾向于后者上下文变量，下文里提到的上下文变量就是指代variable object。**上下文变量存储的是上下文变量所处执行环境里定义的所有的变量和函数。**
* javascript里的执行环境有两类一类是**全局执行环境**，即window对象代表的全局环境，一类是函数代表的**函数执行环境**，这也就是我们常说的局部作用域。全局执行环境的上下文变量是可以访问到的，它就是window对象，所以我们说window能代表全局作用域是有道理的，但是局部作用域即函数的执行环境里的上下文变量是代码不能访问到的，不过javascript引擎在处理数据时候会使用到它。

### 函数执行环境
> 在javascript语言通过声明式function 和 表达式函数（变量接收了定义匿名函数时它返回的内存地址）方式定义函数，**在全局作用域构造或者说全局变量预处理时候对于声明函数有些不同，声明函数会将变量定义和赋值操作同时完成**，因此我们看到下面代码的运行结果。

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
        
### 执行环境栈
> 每个要被执行的函数都会先把函数的执行环境压入到执行环境栈里，函数执行完毕后，这个函数的执行环境就会被执行环境栈弹出。如：函数执行时候函数的执行环境会被压入到执行环境栈后，函数就要执行了，函数执行的第一步不是执行函数里的第一行代码而是在上下文变量里构造一个作用域链，作用域链的英文名字叫做scope chain，**作用域链的变量只能向上访问，变量访问到window对象即被终止,作用域链的作用是保证执行环境里有权访问的变量和函数是有序的**，这个概念里有两个关键意思：有权访问和有序。函数执行完毕，执行环境栈会把这个环境弹出，执行环境栈的控制权就会交由全局环境，如果函数后面还有代码，那么代码就是接着执行。如果函数里嵌套了函数，那么嵌套函数执行完毕后，执行环境栈的控制权就交由了外部函数，然后依次类推，最后就是全局执行环境了。

    var b1 = "b1";
    function ftn1(){
        var b2 = "b2";
        var b1 = "bbb";
        function ftn2(){
            var b3 = "b3";
            b2 = b1;
            b1 = b3;
            console.log("b1:" + b1 + ";b2:" + b2 + ";b3:" + b3);// 运行结果：b1:b3;b2:bbb;b3:b3
        }
        ftn2();
    }
    ftn1();
    console.log(b1);// 运行结果：b1

　　这个例子我们发现，ftn2函数可以访问变量b1，b2，这个体现了有权访问的概念，当ftn1作用域里改变了b1的值并且把b1变量重新定义为ftn1的局部变量，那么ftn2访问到的b1就是ftn1的，ftn2访问到b1后就不会在全局作用域里查找b1了，这个体现了有序性。

![scope][3]

　　每个函数对象执行环境都有一个内部的 [[scope]] 属性，这个属性也由对象列表（链）组成。这个内部的[[scope]] 属性引用的就是创建它们的执行环境的作用域链，同时，当前执行环境的活动对象被添加到该对象列表的顶部。当我们在函数内部访问变量时，其实就是在作用域链上寻找变量的过程。

1. 载入代码，创建全局执行环境，此时会在可变对象(window)中添加b1和ftn1变量，ftn1指向于函数对象ftn1,此时作用域链中只有window对象.
2. 执行代码，当程序执行到b1时，会在全局对象中寻找b1变量，赋值"b1";当程序执行到ftn1()时，会在全局对象中寻找ftn1变量，成功调用。
3. 创建ftn1的执行环境，此时会新创建一个活动对象，添加变量b2、b1，添加变量ftn2，指向于函数对象ftn2.并将活动对象压入作用域链中.并将函数对象ftn1执行环境的[[scope]]属性指向活动对象ftn1。此时作用域链为ftn1的活动对象 + window.
4. 执行代码，为 b2,b1 设置值为"b2"和"bbb"。当程序执行到ftn2()时，会在函数对象ftn1执行环境的[[scope]]中寻找ftn2变量。找到后成功调用。
5. 创建ftn2的执行环境，新建一个活动对象，添加变量b3，赋值为"b3",并将该活动对象压入作用域链中，并函数对象ftn2执行环境的[[scope]]属性指向活动对象ftn2.此时作用域链为:ftn2的活动对象+ftn1的活动对象+全局对象.
6. 执行代码为b3赋值，当访问b1、b2、b3时成功在作用域中找到对应的值并输出。

    var a = 1;
    function hehe(){
        console.log(a);//undefined
        var a = 2;
        console.log(a);// 2
    }
    hehe();
　　上述代码在函数的局部作用域下变量a被重新定义了，在预加载时候a的作用域范围也就被框定了，a变量不再属于全局变量，而是属于函数作用域，只不过赋值操作是在运行期执行（这就是为什么javascript语言在运行时候会改变变量的类型，因为赋值操作是在运行期进行的），所以第一次使用a变量时候，a变量在局部作用域里没有被赋值，只有栈区的标示名称，因此结果就是undefined了。　　

### window(全局执行环境)
> * window是被实例化的对象，这个实例化的过程是在页面加载时候由javascript引擎完成的，整个页面里的要素都被浓缩到这个window对象，因为程序员无法通过编程语言来控制和操作这个实例化过程，所以开发时候我们就没有构建这个this指针的感觉，常常会忽视它，这就是干扰我们在代码里理解this指针指向window的情形。
* this指针构造是和作用域链同时发生的，也就是说在上文变量构建作用域链的同时还会构造一个this对象，this对象也是属于上下文变量，而this变量的值就是当前执行环境外部的上下文变量的一份拷贝，这个拷贝里是没有作用域链变量的

    <script type="text/javascript">
    this.a = "aaa";
    console.log(a);//aaa
    console.log(this.a);//aaa
    console.log(window.a);//aaa
    console.log(this === window);// true
    </script>
　
    if (true){
        var a = "aaaa";
    }
    console.log(a);// 运行结果：aaaa
    **属于window作用域**

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
    Object对象的本质也是个function，所以当我们调用对象里的函数时候，函数的外部执行环境就是obj本身，即外部执行环境上下文变量代表的就是obj，那么this指针也是指向了obj。

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


[1]: k.png
[2]: kk.png
[3]: scope.png
