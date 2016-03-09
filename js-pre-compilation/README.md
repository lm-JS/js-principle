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

堆是存放数据的基于散列算法的数据结构，在javascript中，引用值是存放在堆中的。
![堆结构][2]




[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/stack.jpg
[2]: https://github.com/lm-JS/js-propotype-this-new-apply-call/blob/master/js-pre-compilation/heap.jpg
