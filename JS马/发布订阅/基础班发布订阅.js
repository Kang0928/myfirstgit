let box = document.getElementById('box');
//1.准备一个数组当做事件池
let ary=[];
//2.提供向事件池中添加订阅的方法
function addEvent(fn){
    //fn 订阅某个时刻到来时要做的事情
    // DOM2事件不能重复绑定同一个时间函数
    if(!ary.includes(fn))ary.push(fn); //表示事件池中不包含fn时再添加
}
//3.取消订阅:把函数从数组中移出
function removeEvent(fn){
    //把fn从ary移除掉(可以使用splice删除,但是会到时数组塌陷)
    // 数组.filter(callback) 过滤
    ary=ary.filter(item=>item !== fn);
}
//4.提供一个发布事件的方法
function fire(){
    ary.forEach(item=>item());
}

//DOM2级事件:
function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
function fn3() {
    console.log(3);
}
addEvent(fn1);
addEvent(fn2);
addEvent(fn3);
removeEvent(fn2);
setTimeout(()=>{
    fire();
},3000);