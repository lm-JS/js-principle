# Javascript 预编译

### JavaScript变量
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



[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/stack.jpg
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/heap.jpg
