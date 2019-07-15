let { toJSON, arrLikeToAry, win,offset } = utils;

//获取html元素
let List = document.getElementById('flowBox');
let Lis = List.getElementsByTagName('li');

// ajax
let eGoods = null;
let page = 0;
function getData() {
    page++;
    let xhr = new XMLHttpRequest();
    xhr.open('Get', `json/data.json?page=${page}`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            eGoods = toJSON(xhr.responseText);
        }
    }
    xhr.send();
}

getData();
dataRendering();
LazyLoad();
//数据渲染
function dataRendering() {
    for (let i = 0; i < eGoods.length; i += 3) {
        let dataAry = [eGoods[i], eGoods[i + 1], eGoods[i + 2]];
        let newLis = arrLikeToAry(Lis);
        // console.log(newLis)
        newLis.sort(function (a, b) {
            return a.offsetHeight - b.offsetHeight;
        })
        if (dataAry[0]) {
            newLis[0].innerHTML += innerData(dataAry[0]);
        }
        if (dataAry[1]) {
            newLis[1].innerHTML += innerData(dataAry[1]);
        }
        if (dataAry[2]) {
            newLis[2].innerHTML += innerData(dataAry[2]);
        }
    }
}
function innerData(item) {
    let { pic, title } = item
    let str = '';
    return str = `<a href="javascript:void 0;">
                <div><img data-src="${pic}" alt=""></div>
                <span>${title}</span>
           </a>`;
}

//加载更多
let timer=null;
window.onscroll = function () {
    LazyLoad();
    let winScrollHeight = win('scrollHeight');
    let winScrollTop = win('scrollTop');
    let winClientHeight = win('clientHeight');
    if (winScrollHeight - winScrollTop - winClientHeight <= 0) {
       if(timer)clearInterval(timer);
       timer=setTimeout(()=>{ 
            getData();
            dataRendering();
        },300)
    }
}

//图片懒加载
function LazyLoad(){
    let img=document.querySelectorAll('img');
    //图片上偏移量 <= 浏览器卷起高度+浏览器可视区域
    let winClientHeight=win('clientHeight');
    for(let i=0;i<img.length;i++){
        let imgOffsetT=offset(img[i]).top;
        let winScrollT=win('scrollTop');
        if(imgOffsetT <= winClientHeight + winScrollT -100 ){
            let newImg=document.createElement('img');
            let dataimg=img[i].getAttribute('data-src');
            newImg.src=dataimg;
            newImg.onload=function(){
                img[i].src=dataimg;
            }
        }
    }
}