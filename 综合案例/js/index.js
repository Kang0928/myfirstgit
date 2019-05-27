var goodsList = null;
// 楼层的容器
var eAside = document.getElementById("aside");
var eAsideLis = eAside.getElementsByTagName("li");
// 页面的容器
var eContent = document.getElementById("content");
var eContentLis = eContent.getElementsByTagName("li");
//返回顶部按钮 
//eAsideLis[eAsideLis.length-1];
//导航栏
var eIndex = document.getElementById("index");
var eIndexLis = eIndex.getElementsByTagName("li");


//1.获取数据
// （1）创建XMLHttpRequest的实例
var xhr = new XMLHttpRequest();
// （2）创建连接
// xhr.open(请求方式（get、post、put、delete）, 数据存放的地址（后台提供的一个地址）, 设置同异步（同步）);
xhr.open("get", "./json/product.json", false);
// （3）监听readystate状态（0，1，2，3，4）
xhr.onreadystatechange = function () {
    // xhr.readyState === 4; // 表示请求完成
    // xhr.status === 200; // 请求状态码 200表示成功 // 404 403 // 500

    if (xhr.readyState === 4 && xhr.status === 200) {
        // xhr.response; 响应 获取的是一个JSON字符串
        var res = xhr.response;
        goodsList = JSON.parse(res);
        // console.log(goodsList);
    }
};
// （4）发送请求
xhr.send();
// 解析json（JSON.parse()）
console.log(goodsList);

//数据渲染
var str="";
for(var i=0;i<goodsList.length;i++){
    
    
    str += `<li time=${goodsList[i].time} hot=${goodsList[i].hot} price=${goodsList[i].price}>
    <img src="${goodsList[i].img}" alt="">
    <p>${goodsList[i].title}</p>
    <p>上架时间：${goodsList[i].time}</p>
    <p>热度：${goodsList[i].hot}</p>
    <p>价格：${goodsList[i].price}</p>
            </li>`;
    
}
eContent.innerHTML = str;

//导航栏点击事件
for (var i = 0; i < eIndexLis.length; i++) {
    eIndexLis[i].index = i;
    eIndexLis[i].onclick = function () {
        this.style.background = "red";
    }
    eIndexLis[i].onmouseover = function () {
        this.style.background = "#f4f4f4";
    }
    eIndexLis[i].onmouseout = function () {
        this.style.background = "white";
    }
}
//通过左侧导航跳转
for (var i = 0; i < eAsideLis.length; i++) {
    eAsideLis[i].index = i;
    eAsideLis[i].onclick = function () {
        var curTop = goodsList[this.index].offsetTop;
        var nWinT=utils.win("scrollTop");
        clearInterval(timer);
        if(curTop>nWinT){
            var timer=setInterval(function(){
                nWinT+=30;
                if(nWinT>=curTop){
                    utils.win("scrollTop", curTop);
                    clearInterval(timer);
                    return ;
                }
                utils.win("scrollTop", nWinT);
            },30)
        }else{
            var timer=setInterval(function(){
                nWinT-=30;
                if(nWinT<curTop){
                    utils.win("scrollTop", curTop);
                    clearInterval(timer);
                    return ;
                }
                utils.win("scrollTop", nWinT);
            },30)
        }
        
    }
}
//返回顶部
var up = eAsideLis[eAsideLis.length - 1];
window.onscroll = function () {
    var winScrollTop = utils.win("scrollTop");
    if (winScrollTop > 1000) {
        up.style.display = "block";
    } else {
        up.style.display = "none";
    }
}
up.timer=null;
up.onclick = function () {
    clearInterval(this.timer);
    var that=this;
    this.timer=setInterval(function(){
        var nWinT=utils.win("scrollTop");
        nWinT-=80;
        if(nWinT<=0){
            clearInterval(that.timer);
        }
        utils.win("scrollTop",nWinT);
    },30)
    
}
//倒计时
var eTime = document.getElementById("time");

setInterval(function () {
    var endDate = new Date("2019-5-30 13:0:0");
    // 还有多长时间结束
    var tNum = (endDate.getTime() - Date.now()) / 1000;
    if (tNum < 0) {
        clearInterval(1);
        return;
    }
    //秒→时分秒
    var h = Math.floor(tNum / 60 / 60);
    var m = Math.floor((tNum / 60 / 60 - h) * 60);
    var s = Math.floor(((tNum / 60 / 60 - h) * 60 - m) * 60);

    eTime.innerHTML = "距特价抢拍结束还有：" + formateTime(h) + "时:" + formateTime(m) + "分:" + formateTime(s) + "秒";
}, 1000);

// 小于10加0
function formateTime(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};