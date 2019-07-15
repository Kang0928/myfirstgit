var goodsList = null;
// 楼层的容器
var eAside = document.getElementById("aside");
var eAsideLis = eAside.getElementsByTagName("li");
// 页面的容器
var eContent = document.getElementById("content");
var eContentLis = eContent.getElementsByTagName("li");
//导航栏
var eIndex = document.getElementById("index");
var eIndexLis = eIndex.getElementsByTagName("li");
// 排序a标签
var aGoodstop = document.getElementById("goodstop");
var aGoodstops = aGoodstop.getElementsByTagName("a");
//商品分类按钮
var xPull=document.getElementById("l1").getElementsByTagName("span")[0];
var xPullDownX=document.getElementById("l1").getElementsByTagName("ul")[0];

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

//商品分类下拉框
xPull.onmouseover=function(){
    xPullDownX.className="pull-downX";
}
xPull.onmouseout=function(){
    xPullDownX.className="pull-downY";
}
//2.数据渲染
var str = "";
for (var i = 0; i < goodsList.length; i++) {


    str += `<li time=${goodsList[i].time} hot=${goodsList[i].hot} price=${goodsList[i].price}>
    <img src="./img/default.jpg" data-src="${goodsList[i].img}" alt="">
    <p>${goodsList[i].title}</p>
    <p>上架时间：${goodsList[i].time}</p>
    <p>热度：${goodsList[i].hot}</p>
    <p>价格：${goodsList[i].price}</p>
            </li>`;

}
eContent.innerHTML = str;

var eLis = utils.toArray(eContentLis);
var eImgs = eContent.getElementsByTagName("img");//获取图片

// 【排序】给选项添加点击事件
// 1、给每个元素添加点击事件（事件函数中不能用this）
// 2、在点击事件中做一些事情（让当前（this）添加class名）
// 3、选项的按钮（可能朝上也可能朝下），通过flag标志来记录下一次点击的时候，该朝上还是朝下，（1朝上、-1朝下）
// 4、点击事件中先判断this.flag,对象改变class名，同hi改变this.flag值
// 5、我点击元素时，需要把另外两个元素的class名清空
for (var i = 0; i < aGoodstops.length; i++) {
    aGoodstops[i].index = i;
    aGoodstops[i].flag = 1;
    aGoodstops[i].onclick = function () {
        var that = this;
        for (var j = 0; j < aGoodstops.length; j++) {
            if (j !== this.index) {
                aGoodstops[j].className = "";
                aGoodstops[j].flag = 1;
            }
        }
        if (this.flag === 1) {
            this.classList.add("on");
            this.classList.remove("under");
        } else {
            this.classList.add("under");
            this.classList.remove("on");
        }
        this.flag *= -1;
        eLis.sort(function (a, b) {
            var ary = ["time", "hot", "price"];
            return that.flag * (a.getAttribute(ary[that.index]) - b.getAttribute(ary[that.index]));
        });
        eLis.forEach(function (v) {
            eContent.appendChild(v);
        });
    }
}

//3.导航栏点击事件
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
//选项卡+自动轮播图片
var eTab=document.getElementById("TabControl");
var eTabLis=eTab.getElementsByTagName("li");
var eTabImgs=eTab.getElementsByTagName("img");
for(var i=0;i<eTabLis.length;i++){
    eTabLis[i].index = i;
    eTabLis[i].onclick=function(){ 
        clearInterval(time1);
        for(var j=0;j<eTabLis.length;j++){     
            eTabLis[j].classList.remove("tab");
            eTabImgs[j].classList.remove("active");
        }
        this.classList.add("tab");
        eTabImgs[this.index].classList.add("active");
    }
}
    var s=0
    var time1=setInterval(function(){
        if(s==eTabLis.length){
            s=0;
        }
        for(var j=0;j<eTabLis.length;j++) {
            eTabLis[j].classList.remove("tab");
            eTabImgs[j].classList.remove("active");
        }  
        eTabLis[s].classList.add("tab");
        eTabImgs[s].classList.add("active");
        s++;
    },1000);


//4.通过左侧导航跳转
for (var i = 0; i < eAsideLis.length; i++) {
    eAsideLis[i].index = i;
    eAsideLis[i].onclick = function () {
        var curTop = eContentLis[(this.index + 1) * 4].offsetTop;
        var nWinT = utils.win("scrollTop");
        clearInterval(timer);
        if (curTop > nWinT) {
            var timer = setInterval(function () {
                nWinT += 30;
                if (nWinT >= curTop) {
                    utils.win("scrollTop", curTop);
                    clearInterval(timer);
                    return;
                }
                utils.win("scrollTop", nWinT);
            }, 30)
        } else {
            var timer = setInterval(function () {
                nWinT -= 30;
                if (nWinT < curTop) {
                    utils.win("scrollTop", curTop);
                    clearInterval(timer);
                    return;
                }
                utils.win("scrollTop", nWinT);
            }, 30)
        }

    }
}
//网页滚动事件 返回顶部+图片懒加载
var up = eAsideLis[eAsideLis.length - 1];
window.onscroll = function () {
    LazyLoad();
    var winScrollTop = utils.win("scrollTop");
    if (winScrollTop > 800) {
        up.style.display = "block";
    } else {
        up.style.display = "none";
    }
}
up.timer = null;
up.onclick = function () {
    clearInterval(this.timer);
    var that = this;
    this.timer = setInterval(function () {
        var nWinT = utils.win("scrollTop");
        nWinT -= 80;
        if (nWinT <= 0) {
            clearInterval(that.timer);
        }
        utils.win("scrollTop", nWinT);
    }, 30)

}
//倒计时
var eTime = document.getElementById("time");
setInterval(function () {
    var endDate = new Date("2020-12-31 13:0:0");
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
// 倒计时小于10加0
function formateTime(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
};
// 图片懒加载
function LazyLoad() {
    var nWclientTop = utils.win("clientHeight");//可视区域高度
    var nWscorllTop = utils.win("scrollTop");//卷起的高度

    for (var i = 0; i < eImgs.length; i++) {
        var nCurImgT = utils.offset(eImgs[i]).top;
        var nCurImgH = eImgs[i].clientHeight;

        if (nWclientTop + nWscorllTop >= nCurImgT + nCurImgH) {
            var strCurImgPath = eImgs[i].getAttribute("data-src");
            var eImg = document.createElement("img");
            eImg.src = strCurImgPath;
            var ky = i;
            eImg.onload = function () {
                eImgs[ky].src = strCurImgPath;
            }
        }
    }
}