// 1.导入工具方法
let { offset, win, toJSON, arrLikeToAry } = window.utils;
// 2.获取元素
let flowBox = document.getElementById("flowBox");
let eList = flowBox.getElementsByTagName('li');
// 3.动态获取数据ajax
let imgData = null;
let page = 0;
function queryData() {
    let xhr = new XMLHttpRequest();
    page++;
    xhr.open('Get', `json/data.json?page=${page}`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (/^2\d{2}$/).test(xhr.status)) {
            imgData = xhr.responseText;
            imgData = toJSON(imgData);
        }
    }
    xhr.send();
}
queryData();
bindHTML();
LazyLoad();
// 4.绑定数据
function bindHTML() {
    //4.1给3个li进行升序
    for (let i = 0; i < imgData.length; i += 3) {
        let item = [imgData[i], imgData[i + 1], imgData[i + 2]];
        eList = arrLikeToAry(eList);
        let sortList = eList.sort((a, b) => a.offsetHeigth - b.offsetHeigth);
        for (let j = 0; j < item.length; j++) {
            if (item[j]) {
                sortList[j].innerHTML += innerHtmlQuery(item[j]);
            }
        }
    }
}
function innerHtmlQuery({ pic, title }) {
    return `<a href="javascript:void 0;">
            <div><img data-src="${pic}" alt=""></div>
            <span>${title}</span>
            </a>`;
}
// 5.加载更多
window.onscroll = function () {
    LazyLoad();
    //窗口的可视区域clientHeight + 卷起的高度scrollTop >= window.scrollHeight -50 
    let winClientHeight = win('clientHeight');
    let winScrollTop = win('scrollTop');
    let winScrollHeight = win('scrollHeight');
    if (winClientHeight + winScrollTop >= winScrollHeight - 50) {
        queryData();
        bindHTML();
    }

}
// 6.图片延时加载lazy-load
function LazyLoad(){
    let eImgs=document.querySelectorAll('img');
    //图片上偏移量 + 100 <= 窗口的可视区域clienHeight + 卷起高度scrollTop
    let winClientHeight = win('clientHeight'); 
    for(let i=0;i<eImgs.length;i++){
        if(eImgs[i].src){
            continue;
        }
        let winScrollTop = win('scrollTop');
        let imgOffsetTop=offset(eImgs[i]).top;
        if(imgOffsetTop + 100 <= winScrollTop + winClientHeight){
                let newImg = document.createElement("img");
                let datasrc=eImgs[i].getAttribute('data-src');
                newImg.src=datasrc;
                newImg.onload=function(){
                    eImgs[i].src=datasrc;
                    
            }
        }
    }
}