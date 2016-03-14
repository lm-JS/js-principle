# 闭包

### 什么是闭包？
 
**　　函数调用返回了一个内嵌函数，而内嵌函数引用了外部函数的局部变量、参数等这些应当被关闭(Close)了的资源**

	var increment = (function(){
		var i = 0;
		return function(){
			return ++i;
		}
	})()

	alert(increment());//1
	alert(increment());//2
　　**例：**外层匿名函数返回的是一个内嵌函数，内嵌函数使用了外层匿名函数的局部变量id。照理外层匿名函数的局部变量在返回时就超出了[作用域][1]因此increment()调用无法使用才对。这是怎么一回事呢？让我们来寻找答案
![closure图][2]  
　　根据Scope Chain的理解可以解释，返回的内嵌函数已经持有了构造它时的Scope Chain，虽然返回导致这些对象超出了作用域、生存期范围，但JavaScript使用自动垃圾回收来释放对象内存: 按照规则定期检查，对象没有任何引用才被释放。因此上面的代码能够正确运行。

 > 闭包是可以包含自由变（未绑定到特定对象）量的代码块；这些变量不是在这个代码块内或者任何全局上下文中定义的，而是在代码块的环境中定义。“闭包”一词来源于以下两者的结合：要执行的代码块和自由变量提供绑定的计算环境。

[1]: https://github.com/lm-JS/js-propotype-this-new-apply-call/tree/master/executionContext_scopeChain 
[2]: closure.png