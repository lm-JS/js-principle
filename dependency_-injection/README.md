# 理解JavaScript中的依赖注入

 　　计算机编程的世界其实就是一个将简单的部分不断抽象，并将这些抽象组织起来的过程。JavaScript也不例外，在我们使用JavaScript编写应用时，我们是不是都会使用到别人编写的代码，例如一些著名的开源库或者框架。随着我们项目的增长，我们需要依赖的模块变得越来越多，这个时候，如何有效的组织这些模块就成了一个非常重要的问题。依赖注入解决的正是如何有效组织代码依赖模块的问题。你可能在一些框架或者库种听说过“依赖注入”这个词，比如说著名的前端框架AngularJS，依赖注入就是其中一个非常重要的特性。但是，依赖注入根本就不是什么新鲜玩意，它在其他的编程语言例如PHP中已经存在已久。同时，依赖注入也没有想象种那样复杂。

### 避免重复修改
	var service = function() {
    	return { name: 'Service' };
	}
	var router = function() {
    	return { name: 'Router' };
	}
	//doSomething 调用service 和 router 两个模块（方法）
	var doSomething = function() {
    	var s = service();
    	var r = router();
	};

	问题分析： 如果我们要改service 这个方法名，dosomething中的service也要修改，造成了多次修改的问题。
	解决方法： 将被调用的模块用参数的形式传入调用方法中
	
	var doSomething = function(service, router, other) {
    	var s = service();
    	var r = router();
	};
	
	问题分析： 


http://www.html-js.com/article/A-day-to-learn-JavaScript-understand-dependency-injection-in-JavaScript
  
