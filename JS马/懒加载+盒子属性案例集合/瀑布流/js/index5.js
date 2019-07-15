let { toJSON, arrLikeToAry, win, offset } = window.utils;

let flowBox = document.getElementById('flowBox');
let eLis = flowBox.getElementsByTagName('li');

let eImgsData = null;
let page = 0;
//ajax
function queryData() {
    let xhr = new XMLHttpRequest();
    page++;
    xhr.open('Get', `json/data.json?=page=${page}`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            eImgsData = toJSON(xhr.responseText);
        }
    }
    xhr.send();
}
queryData();
bindXTML();
LazyLoad();

//数据渲染
function bindXTML() {
    for (let i = 0; i < eImgsData.length; i += 3) {
        let eImgAry = [eImgsData[i], eImgsData[i + 1], eImgsData[i + 2]];
        let eLisAry = arrLikeToAry(eLis);
        eLisAry.sort((a, b) => {
            return a.offsetHeight - b.offsetHeight;
        });
        eImgAry.forEach((item, index) => {
            if (item) {
                eLisAry[index].innerHTML += innerHTMLData(item);
            }
        });
    }
}

function innerHTMLData(item) {
    return `<a href="${item.link}">
    <div><img data-src="${item.pic}" alt=""></div>
    <span>${item.title}</span>
</a>`;
}

//加载更多
window.onscroll = function () {
    LazyLoad();
    //窗口的真实高度scrollHeight - 窗口的可视区域 - 卷起高度
    let winScrollH = win('scrollHeight');
    let winH = win('clientHeight');
    let winScrollTop = win('scrollTop');
    if (winScrollH - winH - winScrollTop <= 50) {
        queryData();
        bindXTML();
    }
}

//图片懒加载
function LazyLoad(){
    let eImgs=document.getElementsByTagName('img');
    for(let i=0;i<eImgs.length;i++){
        //窗口可视区域 + 卷起高度 >= 图片上偏移量
        let winH=win('clientHeight');
        let winScrollTop=win('scrollTop');
        let eImgOffsetT=offset(eImgs[i]).top;
        if(winH + winScrollTop >= eImgOffsetT +100 ){
            let newImg=document.createElement('img');
            let datasrc=eImgs[i].getAttribute('data-src');
            newImg.src=datasrc;
            newImg.onload=function(){
                eImgs[i].src=datasrc;
            }
        }
    }
}