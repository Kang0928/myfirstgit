let { css }=window.utils;

let Effect={
    Linear(curT,change,time,begin){
        return (change / time) * curT + begin;
    }
}
function animate({ele,target={},time=2000,after}){
    if(typeof ele !== 'object' ){
        throw TypeError('ele is not DOM-Element'); 
    }
    //起始位置 行驶距离
    let begin={}; //起始位置
    let change={}; //行驶距离
    for(let attr in target){
        if(target.hasOwnProperty(attr)){
            begin[attr]=css(ele,attr);
            change[attr]=target[attr]-begin[attr];
        }
    }
    //设置定时器
    let curT=0;
    let timer=setInterval(()=>{
        curT += 10;
        if(curT >= time){
            clearInterval(timer);
            css(ele,target);
            if(typeof after == 'function'){
                after.call(ele);
            }
            return;
        }
        let a={};
        for(let attr in target){
            a[attr]=Effect.Linear(curT,change[attr],time,begin[attr]);
        }
        css(ele,a);
    },10);
}

let box=document.getElementById('box');
animate({
    ele:box,
    target:{
        left:800,
        top:500
    },
    time:2000,
    after:function(){
        console.log('YES');
    }
})
let box2=document.getElementById('box2');
animate({
    ele:box2,
    target:{
        left:500,
        top:300
    },
    time:2000,
    after:function(){
        console.log('OK');
    }
})