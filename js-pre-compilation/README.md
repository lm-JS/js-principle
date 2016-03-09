# Javascript 预编译
　　javascript代码在运行前有一个过程就是：预加载，预加载的目的是要事先构造运行环境例如全局环境，函数运行环境，还要构造作用域链，而环境和作用域的构造的核心内容就是指定好变量属于哪个范畴，因此在javascript语言里变量的定义是在预加载完成而非在运行时期。

    var a = 1;
    function hehe(){
        console.log(a);//undefined
        var a = 2;
        console.log(a);// 2
    }
    hehe();
　　上述代码在函数的局部作用域下变量a被重新定义了，在预加载时候a的作用域范围也就被框定了，a变量不再属于全局变量，而是属于函数作用域，只不过赋值操作是在运行期执行（这就是为什么javascript语言在运行时候会改变变量的类型，因为赋值操作是在运行期进行的），所以第一次使用a变量时候，a变量在局部作用域里没有被赋值，只有栈区的标示名称，因此结果就是undefined了。
### JavaScript变量
　　javascript的变量是一个松散的类型，松散类型变量的特点是变量定义时候不需要指定变量的类型，变量在运行时候可以随便改变数据的类型，但是这种特性并不代表javascript变量没有类型，当变量类型被确定后javascript的变量也是有类型的。但是在现实中，很多程序员把javascript松散类型理解为了javascript变量是可以随意定义即你可以不用var定义，也可以使用var定义，其实在javascript语言里变量定义没有使用var，变量必须有赋值操作，只有赋值操作的变量是赋予给window，这其实是javascript语言设计者提升javascript安全性的一个做法。
> **分为基本类型和引用类型**
* 基本数据类型代表原始数据类型的值，即Undefined,Null,Number,String,Boolean类型所表示的值
* 引用值指的就是复合数据类型的值，即Object,Function,Array,以及自定义对象,等等
* 区别：基本数据类型无法为这个变量添加属性和方法


### 变量内存分配
  **与原始值与引用值对应存在两种结构的内存即栈和堆**
> * 栈是一种后进先出的数据结构  
![栈结构][1]  
* 堆是存放数据的基于散列算法的数据结构，在javascript中，引用值是存放在堆中的。  
![堆结构][2]
* 为什么引用值要放在堆中，而原始值要放在栈中  
    堆比栈大，栈比堆的运算速度快,对象是一个复杂的结构，并且可以自由扩展，如：数组可以无限扩充，对象可以自由添加属性。将他们放在堆中是为了不影响栈的效率。而是通过引用的方式查找到堆中的实际对象再进行操作。相对于简单数据类型而言，简单数据类型就比较稳定，并且它只占据很小的内存。不将简单数据类型放在堆是因为通过引用到堆中查找实际对象是要花费时间的，而这个综合成本远大于直接从栈中取得实际值的成本。所以简单数据类型的值直接存放在栈中。
* 在javascript里变量的存储包含三个部分：
  1. 栈区的变量标示符；
  2. 栈区变量的值；
  3. 堆区存储的对象。 
  
>  变量不同的定义，这三个部分也会随之发生变化  
   var qqq;  
   console.log(qqq);  
   // 运行结果：undefined,因为变量被命名了，但是还未初始化，此时在变量存储的内存里只拥有栈区的变量标示符而没有栈区的变量值，当    然更没有堆区存储的对象。  
   console.log(xxx);  
   //运行时会报错，xxx is not defined!虽然JavaScript中可以不用var 定义变量，但是必须赋值，此时变量属于window对象，否则会报错

### undefined 和 null
> 当变量的值为undefined时候，那么该变量只有栈区的标示符，如果我们对undefined的变量进行赋值操作，如果值是基本类型，那么栈区的值就有值了，如果栈区是对象那么堆区会有一个对象，而栈区的值则是堆区对象的地址，如果变量值是null的话，我们很自然认为这个变量是对象，而且是个空对象，按照我前面讲到的变量存储的三部分考虑：当变量为null时候，栈区的标示符和值都会有值，堆区应该也有，只不过堆区是个空对象，这么说来null其实比undefined更耗内存了!  
    console.lo(null == undefined);// 运行结果：true  
    console.lo(null === undefined);// 运行结果：false  
    javascript里undefined类型源自于null即null是undefined的父类，本质上null和undefined除了名字这个马甲不同，其他都是一样的，不过要让一个变量是null时候必须使用等号“=”进行赋值了。

### 赋值变量的值和函数参数传递
> 在javascript里变量的复制（函数传参也是变量赋值）本质是传值，这个值就是栈区的值，而基本类型的内容是存放在栈区的值里，所以复制基本变量后，两个变量是独立的互不影响，但是当复制的是引用类型时候，复制操作还是复制栈区的值，但是这个时候值是堆区对象的地址，因为javascript语言是不允许操作堆内存，因此堆内存的变量并没有被复制，所以复制引用对象复制的值就是堆内存的地址，而复制双方的两个变量使用的对象是相同的，因此复制的变量其中一个修改了对象，另一个变量也会受到影响。例：

    var ftn1 = function(){
            console.log("test:ftn1");
        };
    var ftn2 = function(){
             console.log("test:ftn2");
    };
    function ftn(f){
           f();
           f = ftn2;
    }
    ftn(ftn1); // 运行结果：test:ftn1
    ftn1(); // 运行结果：test:ftn1

[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/stack.jpg
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/heap.jpg
