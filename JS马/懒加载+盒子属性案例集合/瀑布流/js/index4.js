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
        if (xhr.readyState === 4 && /^2\d+$/.test(xhr.status)) {
            eImgsData = toJSON(xhr.responseText);
        }
    }
    xhr.send();
}
queryData();
bindHTML();
LazyLoad();

//数据渲染
function bindHTML() {
    for (let i = 0; i < eImgsData.length; i += 3) {
        let eImgs = [eImgsData[i], eImgsData[i + 1], eImgsData[i + 2]];
        let eLisAry = arrLikeToAry(eLis);
        eLisAry.sort((a, b) => {
            return a.offsetHeight - b.offsetHeight;
        })
        eImgs.forEach((item, i) => {
            if (item) {
                eLisAry[i].innerHTML += addInnerHTML(item);
            }
        });
    }
}
function addInnerHTML(item) {
    let { link, pic, title } = item;
    return `<a href="${link}">
    <div><img data-src="${pic}" alt=""></div>
    <span>${title}</span>
</a>`;
}

//加载更多
window.onscroll = function () {
    LazyLoad();
    //窗口可视区域+卷起高度=scrollHeight
    let winH = win('clientHeight');
    let winScrollT = win('scrollTop');
    let winScrollH = win('scrollHeight');
    if (winScrollH - winScrollT - winH <= 0) {
        queryData();
        bindHTML();
    }
}

//懒加载
function LazyLoad() {
    let eImgs = document.getElementsByTagName('img');
    let winH = win('clientHeight');

    for (let i = 0; i < eImgs.length; i++) {
        //图片高度+图片上偏移量=卷起高度+窗口可视区域
        let eImgsH = eImgs[i].offsetHeight;
        let eImgsT = offset(eImgs[i]).top;
        let winScrollT = win('scrollTop');
        if (eImgsH + eImgsT <= winScrollT + winH) {
            let newImg = document.createElement('img');
            let datasrc = eImgs[i].getAttribute('data-src');
            newImg.src = datasrc;
            newImg.onload = function () {
                eImgs[i].src = datasrc;
            }
        }

    }
}