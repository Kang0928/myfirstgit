let flowRender = (function () {
    let { toJSON, arrLikeToAry, win, offset } = window.utils;

    let eList = document.querySelectorAll('#flowBox > li');
    let eListAry = arrLikeToAry(eList);

    //ajax
    let eImgsData = null;
    let page = 0;
    function queryData() {
        if (page > 4) {
            return;
        }
        let xhr = new XMLHttpRequest();
        page++;
        xhr.open('GET', `json/data.json?page=${page}`, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status) {
                eImgsData = toJSON(xhr.responseText);
            }
        }
        xhr.send();
    }

    //数据渲染
    function bindHTML() {
        for (let i = 0; i <= eImgsData.length; i += 3) {
            let newData = [eImgsData[i], eImgsData[i + 1], eImgsData[i + 2]];
            eListAry.sort((a, b) => {
                return a.offsetHeight - b.offsetHeight;
            })
            newData.forEach((item, i) => {
                if (item) {
                    eListAry[i].innerHTML += innerH(item);
                }
            })
        }
    }
    function innerH(item) {
        let { link, pic, title } = item;
        return `<a href="${link}">
    <div><img data-src="${pic}" alt=""></div>
    <span>${title}</span>
</a>`;
    }

    //加载更多
    window.onscroll = function () {
        LazyLoad();
        //窗口真实高度-窗口可视区域-卷起高度=0
        let winH = win('scrollHeight');
        let winClientH = win('clientHeight');
        let winScrollT = win('scrollTop');
        if (winH - winClientH - winScrollT <= 50) {
            queryData();
            bindHTML();
        }
    }

    //图片懒加载
    function LazyLoad() {
        let eImgs = document.getElementsByTagName('img');
        let winClientH = win('clientHeight');
        for (let i = 0; i < eImgs.length; i++) {
            //图片上偏移量+图片的高度=窗口可视区域+卷起高度
            let imgH = eImgs[i].scrollHeight;
            let winScrollT = win('scrollTop');
            let eImgsOffsetT = offset(eImgs[i]).top;
            if (eImgsOffsetT + imgH + 50 <= winClientH + winScrollT) {
                let newImg = document.createElement('img');
                let datasrc = eImgs[i].getAttribute('data-src');
                newImg.src = datasrc;
                newImg.onload = function () {
                    eImgs[i].src = datasrc;
                }
                newImg = null;
            }

        }
    }
    return {
        init() {
            queryData();
            bindHTML();
            LazyLoad();

        }
    }
})();
flowRender.init();