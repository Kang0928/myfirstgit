//封装一个动画库:匀速动画

// 1.获取动画运动的总时长duration
// 2. 求终点坐标(目标值，如opacity的最终值是1)
// 3. 求起点坐标（起点初始值）
// 4. 求路程：终点坐标 - 起点坐标
// 5. 设置计时curT，记录从开始运动经过的时间
// 6. 设置定时器，累加curT，计算经过curT时间后元素所处的位置，并且把这个位置设置给元素；
// 7. 做过界判断

//效果
let {css}=window.utils;
const Effects = {
    // Linear:function(...){....} 对象的简洁语法↓ 箭头函数要写全
    // Linear是Effects对象的一个属性,Linear不是变量
    Linear(curT, begin, change, durstion) {
        return (change / durstion) * curT + begin;
    }
};
function animate({ele,target={},duration=2000,after}){
    //从实参结构 ele,target,duration,after
    //1.参数的合法性校验,如果不合法抛出异常
    //通过id获取元素时,没有获取到为null,typeof ele == object;
    if(typeof ele !== 'object') {
        throw TypeError('ele is not a DOM-Element')
    }
    //2.求动画需要的参数:target 和 duration 以及通过参数的形式传进来了
    //2.1求起始位置和路程
    let begin={};  
    let change={}; //因为target不止一个属性,每一个属性都有一个路程,所以我们需要一个对象
    for(let attr in target){ //遍历target 把target中的属性取出来
        if(target.hasOwnProperty(attr)){
            begin[attr]=css(ele,attr); //把target中属性的初始值计算出来,并且保存在begin对象中
            change[attr]=target[attr]-begin[attr]; //根据终点和起点的值计算该属性路程
        }
    }
    //2.2设置计时器变量
    let curT=0;
    //3.利用定时器启动动画:通过元素对象自定义属性记录定时器id
    if(ele.timerID)clearInterval(ele.timerID); //开启下一次动画之前把前面的动画清除掉
    ele.timerID=setInterval(()=>{
        //3.1累加时间
        curT += 10;
        //3.2过界判断
        if(curT >= duration){
            clearInterval(ele.timerID);
            css(ele,target); //批量设置元素到终点
            if(typeof after === 'function' /*&&after.call(ele)*/){
                after.call(ele); //业内通用做法:把钩子中的this处理成元素对象
            }
            return;
        }
        //3.3求经过curT时间后元素各个属性所处的位置
        let curState={}; //因为target中有多个属性,所以需要把所有的属性经过curT时间后走过的路程计算出来
        for(let prop in target){
            if(target.hasOwnProperty(prop)){
                curState[prop] = Effects.Linear(curT,begin[prop],change[prop],duration);
            }
        }
        //3.4把上一步求出来的位置设置给元素
        css(ele,curState);
    },10);
}
let box=document.getElementById('box');
console.log(box);
animate({
    ele:box, // 元素对象
    target:{ // 多方向终点位置坐标集合
        left:850,
        top:500
    },
    durstion:2000, // 过度时间
    after:function(){ //动画执行结束后执行的函数(【钩子hook】:现在不执行,未来某个时刻会执行的函数)
        console.log('终于执行完了');
    }
});
