# Javascript 预编译
　　javascript代码在运行前有一个过程就是：预加载，预加载的目的是要事先构造运行环境例如全局环境，函数运行环境，还要构造作用域链，而环境和作用域的构造的核心内容就是指定好变量属于哪个范畴，因此在javascript语言里变量的定义是在预加载完成而非在运行时期。
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



[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/stack.jpg
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/heap.jpg
