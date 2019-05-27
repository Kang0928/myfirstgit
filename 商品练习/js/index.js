var goodsList = null;
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
// <li>
//<img src="./img/1.jpg" alt="">
//    <p>华为手机</p>
//    <p>上架时间：20290423</p>
//    <p>热度：100</p>
//    <p>价格：2200</p>
//</li>
// for(var i=0;i<goodsList.length;i++){
//     var str = `<li>
//             <img src="${}" alt="">
//             <p>${}</p>
//             <p>上架时间：${}</p>
//             <p>热度：${}</p>
//             <p>价格：${}</p>
//           </li>`;
// }

//3.给选项添加点击事件
// 1、给每个元素添加点击事件（事件函数中不能用this）
// 2、在点击事件中做一些事情（让当前（this）添加class名）
// 3、选项的按钮（可能朝上也可能朝下），通过flag标志来记录下一次点击的时候，该朝上还是朝下，（1朝上、-1朝下）
// 4、点击事件中先判断this.flag,对象改变class名，同hi改变this.flag值
// 5、我点击元素时，需要把另外两个元素的class名清空
//排序