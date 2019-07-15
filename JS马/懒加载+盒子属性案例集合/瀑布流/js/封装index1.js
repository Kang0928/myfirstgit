let waterfallFlow = (function () {
    let { toJSON, win, arrLikeToAry, offset } = window.utils;

    let flowBox = document.getElementById('flowBox');
    let eLists = flowBox.getElementsByTagName('li');
    let eListsAry = arrLikeToAry(eLists);

    let eImgsData = null;
    let page = 0;
    //ajax
    function queryXTML() {
        if (page >= 4) {
            console.log('没有更多数据了');
            return;
        }
        let xhr = new XMLHttpRequest();
        page++;
        xhr.open('Get', `json/data.json?page=${page}`, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                eImgsData = toJSON(xhr.responseText);
            }
        }
        xhr.send();
    }
    //数据渲染
    function bindHTML() {
        for (let i = 0; i < eImgsData.length; i += 3) {
            let eImgsAry = [eImgsData[i], eImgsData[i + 1], eImgsData[i + 2]];
            eListsAry.sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            });
            eImgsAry.forEach((item, index) => {
                item ? eListsAry[index].innerHTML += innerEimg(item) : null;
            })
        }
    }
    function innerEimg(item) {
        let { link, pic, title } = item;
        return `<a href="${link}">
        <div><img data-src="${pic}" alt=""></div>
        <span>${title}</span>
    </a>`;
    }
    //加载更多
    window.onscroll = () => {
        LazyLoad();
        //窗口的真实高度scrollHeight - 卷起高度 - 窗口可视区域
        let winScrollH = win('scrollHeight');
        let winScrollTop = win('scrollTop');
        let winClientHeight = win('clientHeight');
        if (winScrollH <= winScrollTop + winClientHeight) {
            queryXTML();
            bindHTML();
        }
    }
    //图片懒加载
    function LazyLoad() {
        let Imgs = flowBox.getElementsByTagName('img');
        //图片上偏移量<=卷起高度+窗口可视区域
        let winST = win('scrollTop');
        let winH = win('clientHeight');
        for (let i = 0; i < Imgs.length; i++) {
            let imgOffsetT = offset(Imgs[i]).top;
            if (imgOffsetT <= winST + winH + 100) {
                let newImg = document.createElement('img');
                let datasrc = Imgs[i].getAttribute('data-src');
                newImg.src = datasrc;
                newImg.onload = () => {
                    Imgs[i].src = datasrc;
                }
                newImg = null;
            }
        }
    }
    return{
        init() {
            queryXTML();
            bindHTML();
            LazyLoad();
        }
    }
}) ();
    
waterfallFlow.init();