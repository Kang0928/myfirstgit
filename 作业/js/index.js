var goodsList = null; //商品列表
var eBox=document.getElementById("box");

//1.获取数据
// （1）创建XMLHttpRequest的实例
var xhr = new XMLHttpRequest();
// （2）创建连接
// xhr.open(请求方式（get、post、put、delete）, 数据存放的地址（后台提供的一个地址）, 设置同异步（同步）);
xhr.open("get", "./json/newList.json", false);
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
var str = "";
var lazysrc="./img/default.jpg";
for(var i=0;i<goodsList.length;i++){
    str += `<li title=${goodsList[i].title} desc=${goodsList[i].desc} >
        <img class="lazyimg" src=${lazysrc} data-src="${goodsList[i].img}" alt="">
        <p>${goodsList[i].title}</p>
        <p>内容摘要：${goodsList[i].desc}</p>`
}
eBox.innerHTML = str;
//图片懒加载
var eLazyImg=document.getElementsByClassName("lazyimg");
// lazyLoad(eLazyImg[i]);
window.onscroll=function(){
    for(var i=0;i<eLazyImg.length;i++){
        lazyLoad(eLazyImg[i]);
    };
}
//渐显动画效果

function lazyLoad(ele){
    
        var eBadyST=utils.win("scrollTop");
        var eBadyOT=utils.win("clientHeight");
        var eLazyImgT=utils.offset(ele).top;
        var eLazyImgH=ele.clientHeight;

        console.log(eBadyST,eBadyOT,eLazyImgT,eLazyImgH);
    if(eBadyST+eBadyOT>=eLazyImgT+eLazyImgH){
        var reallyImgSrc=ele.getAttribute("data-src");

        // eLazyImg[i].src=reallyImgSrc;
        //先把真实图片路径请求回来，创建一个新的img标签使用路径，测试路径是否能够加载出来
        var testImg=document.createElement("img");
        testImg.src=`${reallyImgSrc}`;
        testImg.onload=function(){
            ele.src=reallyImgSrc;
            fadeIn(ele);
        }
    }
}
function fadeIn(ele){
    var oPacity=.3;
    ele.style.opacity=oPacity;
    var timer=setInterval(function(){
        oPacity+=.05;
        ele.style.opacity=oPacity;
        if(oPacity>=1){
            ele.style.opacity=1;
            clearInterval(timer);
        }
    },30)
}