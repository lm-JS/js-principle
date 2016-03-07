### instenceof 原理：
    //设 L instanceof R 
    //通过判断
    L.__proto__.__proto__ ..... === R.prototype ？例子：
    Function instanceof Object // true 
    Object instanceof Function // true 
    Function instanceof Function //true
    Object instanceof Object // true
    Number instanceof Number //false

