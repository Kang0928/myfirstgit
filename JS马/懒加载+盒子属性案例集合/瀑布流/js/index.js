//瀑布流:宽度相同的多列不规则排布,这些列宽度相同,列中的每一块宽度相同,但是最终这些列的高度不能相差太大,
//  当滚动条滚动到页面底部时去加载下一页
// 页面中所有图片要延时加载

// 原理:首先数据不能是写死的,是动态获取来的,接着把数据绑成HTML
// 在插入到列之前,先给这些列按照高度进行升序排序
// 在插入数据时先给高度最矮的插,再给第二矮的插,最后给最高的插.(这样能保证最后高度相差不会太大)

// 页面滚到到底去加载下一页: 什么时候计算? onscroll事件触发时即页面滚动时
// 页面的scrollHeight - 页面的scrollTop - 浏览器可视窗口的高度 <= 0 表示已经滚动到底了

// 1.导入工具方法
const { offset, win, arrLikeToAry, toJSON } = window.utils;

// 2.获取元素
let flowBox = document.getElementById('flowBox');
let flowList = flowBox.getElementsByTagName('li'); //集合类数组

// 3.动态获取数据ajax
let imgData = null;
let page = 0;
function queryData() {
    //因为滑动到底还需要去加载第二页,而服务器需要告诉它我需要第几页的数据.
    // 服务器接受到这个页数,它会返回给你想要的页数对应的数据.
    // (这种技术叫做分页)一般get请求通过在url末尾拼接查询参数的方式把这些数据传递给服务器
    page++; //当执行这个方法时page就会++
    let xhr = new XMLHttpRequest(); //创建ajax实例对象
    xhr.open('Get', `json/data.json?page=${page}`, false); //调用open方法配置请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            imgData = toJSON(xhr.responseText); //把获取到的数据解析成对象(把字符串解析成数组或者普通对象)
        }
    }
    xhr.send();
}
queryData();

// 4.绑定数据:因为滑动到底的时候会请求第二页的数据,请求完数据还需要绑定,
// 所以绑定数据这些代码会执行多次,所以需要封装一个方法
function bindHTML() {
    // 4.1遍历获取来的数据
    // 现在有20条数据,每次取3条,第一次取0 1 2这三个,第二次取3 4 5这三个...所以i+=3
    // 最后一次取的时候先判断数据存不存在
    for (let i = 0; i < imgData.length; i += 3) {
        var item1 = imgData[i];
        var item2 = imgData[i + 1];
        var item3 = imgData[i + 2];
        //4.2.插数据之前先给li按照高度进行排序
        let flowListAry = arrLikeToAry(flowList);//把这三个li的集合转成数组
        flowListAry.sort((a, b) => a.offsetHeight - b.offsetHeight);
        // 4.3.绑定数据 按照排好的顺序插入每一列中
        if (item1) {
            flowListAry[0].innerHTML += addInnerHTML(item1);
        }
        if (item2) {
            flowListAry[1].innerHTML += addInnerHTML(item2);
        }
        if (item3) {
            flowListAry[2].innerHTML += addInnerHTML(item3);
        }
    }
}
function addInnerHTML(item) {
    return `<a href="${item.link}">
    <div><img data-src="${item.pic}" alt=""></div>
    <span>${item.title}</span>
</a>`
}

bindHTML();
lazyLoad();

// 5.加载更多
let timer = null;
window.onscroll = function () {
    // 判断页面有没有滚动到底:页面的scrollHeight - 页面的scrollTop - 
    //   浏览器可视窗口的高度 <= 0 时就表示滚动到底了
    lazyLoad();
    let pageH = win('scrollHeight');
    let scrollTop = win('scrollTop');
    let winH = win('clientHeight');
    if (pageH - scrollTop - winH <= 0) {
        // 函数的节流
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            queryData();
            bindHTML();
        }, 300)
    }
}

// 6.图片延时加载lazy-load
function lazyLoad() {
    // 1.获取页面中所有的图片
    let imgList = document.querySelectorAll('img');
    // 2.多张图片延时加载遍历图片集合,看每一张图片是否应该被加载
    for (let i = 0; i < imgList.length; i++) {
        let img = imgList[i];

        if (img.src) {
            continue; //图片src有值,说明它被加载过了,不应该再加载了,跳过.
        }

        // 判断当前图片是否应该出现在当前浏览器可视区域
        let imgOffsetTop = offset(img).top; //图片的上偏移量
        let winScrollTop = win('scrollTop'); //页面卷起的高度
        let winH = win('clientHeight'); //浏览器可视窗口的高度
        if (imgOffsetTop - winScrollTop <= winH - 100) {
            let dataSrc = img.getAttribute('data-src');
            let newImg = new Image(); // let newImg=document.createElement('img');
            newImg.src = dataSrc;
            newImg.onload = function () {
                img.src = dataSrc;
            }
            newImg = null;
        }
    }
}