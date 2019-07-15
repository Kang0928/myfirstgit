let { css } = window.utils;

const Effects={
    Linear(curT,change,begin,time=2000){
        //执行时间时间*速度(执行距离/时间) + 起始位置
        return (change / time) * curT + begin;
    }
};

function animate({ele,target={},time=2000,after}){
    //校验ele元素是否为null
    if(typeof ele !== 'object'){
        throw TypeError ('ele is not DOM-Element');
    }
    //获取起始位置 执行距离
    let begin={}; //起始位置
    let change={}; //执行距离
    for(let attr in target){
        if(target.hasOwnProperty(attr)){
            begin[attr]=css(ele,attr);
            change[attr]=target[attr] - begin[attr];
        }
    }
    //设置定时器
    let curT=0;
    let timer=setInterval(()=>{
        curT += 10;
        if(curT >= time){
            clearInterval(timer);
            css(ele,target);
            return;
        }
        let curState={};
        for(let attr in target){
            curState[attr]=Effects.Linear(curT,change[attr],begin[attr],time);
        }
        
        css(ele,curState);
    },10);

}
animate({
    ele:box,
    target:{
        left:800,
        top:500
    },
    time:2000,
    after:function(){
        console.log('终于执行完了');
    }
});