let flow = (function () {
    let { toJSON, arrLikeToAry, win, offset } = window.utils;
    //获取元素
    let flowBox = document.getElementById('flowBox');
    let eLis = flowBox.getElementsByTagName('li');
    //ajax
    let page = 0;
    function queryData() {
        page++;
        if (page >= 4) {
            console.log('到底了');
            return;
        }
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `json/data.json?page=${page}`, false);
        xhr.onreadystatechange = function () {
            let eImgsData = toJSON(xhr.responseText);
            bindHTML(eImgsData);
        }
        xhr.send();
    }

    //绑定数据
    function bindHTML(eImgsData) {
        for (let i = 0; i < eImgsData.length; i += 3) {
            let eImgsAry = [eImgsData[i], eImgsData[i + 1], eImgsData[i + 2]];
            let eLisAry = arrLikeToAry(eLis);
            eLisAry.sort(function (a, b) {
                    return a.offsetHeight - b.offsetHeight;
            })
            eImgsAry.forEach((item, i) => {
                if(item){
                    eLisAry[i].innerHTML += innerH(item);
                }
            })
        }
    }
    function innerH(item) {
        let { link, pic, title } = item;
        return `<a href="${link}">
    <div><img data-src="${pic}"></div>
    <span>${title}</span>
</a>`;
    }
    //加载更多
    function MoreLoad(){
        let winScrollH=win('scrollHeight');
        let winScrollT=win('scrollTop');
        let winClientHeight=win('clientHeight');
        //窗口真实高度-卷起高度-窗口可视区域
        if(winScrollH - winScrollT - winClientHeight <=50 ){
             queryData();
             LazyLoad()
        }
    }
    //图片懒加载
    function LazyLoad(){
        let eImg=document.getElementsByTagName('img');
        let winClientHeight=win('clientHeight');
        //图片上偏移量 - 卷起高度-可视区域-50<=0
        for(let i=0;i<eImg.length;i++){
            let eImgOffsetT=offset(eImg[i]).top;
        let winScrollT=win('scrollTop');
        if(eImgOffsetT - winClientHeight - winScrollT - 10 <=0){
            let newimg=document.createElement('img');
            let datasrc=eImg[i].getAttribute('data-src');
            newimg.src=datasrc;
            newimg.onload=function(){
                eImg[i].src=datasrc;
                newimg=null;
            }
        }
        }
    }
    //滚动事件
    let timer=null;
    function handleScroll(){
        window.onscroll=function(){
            timer && clearTimeout(timer);
            timer=setTimeout(()=>{
                LazyLoad();
                MoreLoad();
            
            },300);
            
        }
    }

    return {
        init(){
            queryData();
            LazyLoad();
            handleScroll();
        }
    }
})();
flow.init();