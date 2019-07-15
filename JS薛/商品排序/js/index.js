var goodsList = null; //商品列表
var eGoodsList = document.getElementById("eGoodsList"); //页面中商品列表的容器
var eNav = document.getElementById("nav");
var eA = eNav.getElementsByTagName("a");
var eGoodsItems = eGoodsList.getElementsByTagName("li");
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

//2.页面渲染(数据绑定)
//方法一：
// for(var i=0;i<goodsList.length;i++){
//     var eLi=document.createElement("li");
//     var eImg=document.createElement("img");
//     eImg.src=goodsList[i].img;
//     eLi.appendChild(eImg);
//     var p1=document.createElement("p");
//     p1.innerHTML=goodsList[i].title;
//     eLi.appendChild(p1);
//     var p2=document.createElement("p");
//     p2.innerHTML="上架时间："+goodsList[i].time;
//     eLi.appendChild(p2);
//     var p3=document.createElement("p");
//     p3.innerHTML="热度："+goodsList[i].hot;
//     eLi.appendChild(p3);
//     var p4=document.createElement("p");
//     p4.innerHTML="价格："+goodsList[i].price;
//     eLi.appendChild(p4); 
//     eGoodsList.appendChild(eLi);
// }
// 方法二
var str = "";
for (var i = 0; i < goodsList.length; i++) {
    //获取时间戳的年月日
    var t=utils.formatDate(goodsList[i].time);
    // var date=new Date(goodsList[i].time);
    // var y=date.getFullYear();
    // var m=date.getMonth()+1;
    // var d=date.getDate();
    // var t=y+"-"+m+"-"+d;
    str += `<li time=${goodsList[i].time} hot=${goodsList[i].hot} price=${goodsList[i].price}>
    
    <img src="${goodsList[i].img}" alt="">
        <p>${goodsList[i].title}</p>
        <p>上架时间：${t}</p>
        <p>热度：${goodsList[i].hot}</p>
        <p>价格：${goodsList[i].price}</p>
                </li>`
}
eGoodsList.innerHTML = str;

//3.给选项添加点击事件
// 1、给每个元素添加点击事件（事件函数中不能用this）
// 2、在点击事件中做一些事情（让当前（this）添加class名）
// 3、选项的按钮（可能朝上也可能朝下），通过flag标志来记录下一次点击的时候，该朝上还是朝下，（1朝上、-1朝下）
// 4、点击事件中先判断this.flag,对象改变class名，同hi改变this.flag值
// 5、我点击元素时，需要把另外两个元素的class名清空
for (var i = 0; i < eA.length; i++) {
    eA[i].flag = 1;
    eA[i].index = i;
    eA[i].onclick = function () {
        //类数组转数组
        switchArrow.call(this);
        var that = this;
        var aryGoods = utils.toArray(eGoodsItems);
        aryGoods.sort(function(a,b){
            var ary=["time","hot","price"];
            return that.flag * (a.getAttribute(ary[that.index]) - b.getAttribute(ary[that.index]));
                    
        })
        aryGoods.forEach(function(v,i){
            eGoodsList.appendChild(v);
        });
        
    }
}
function switchArrow() {
    for (var i = 0; i < eA.length; i++) {
        // 判断当前元素的索引和j是否相等，不相等的情况下清楚class名
        if (i !== this.index) {
            eA[i].className = "";
            eA[i].flag = 1;
        }
    }
    if (this.flag == 1) {
        this.classList.add("on");
        this.classList.remove("under");
    } else {
        this.classList.add("under");
        this.classList.remove("on");
    }
    this.flag *= -1;
}
//格式化时间函数
// function formatDate(t){
//     var date=new Date(t);
//     var y=date.getFullYear();
//     var m=date.getMonth()+1;
//     var d=date.getDate();
//     t=y+"-"+m+"-"+d;

//     return t;
// };

//排序