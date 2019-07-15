// 1、获取数据（ajax）
// 2、转成对象（JSON.parse()）
// 3、渲染数据（不能用拼接字符串，通过创建元素的方式将每条数据渲染到页面中）
// 4、渲染每条数据时，需要判断一下，那一列比较矮，往哪个里面加（比较ul的clientHeight，排序）
// 5、分页，初始情况下加载一页（前4步从新执行一遍，把前四步封装成方法，执行）
// 6、判断滚动到最底部， 滚动卷起的高度+可视区域的高度 >= win("scrollHeight") - 100
var newList = null;
var eLists = document.getElementById("container").getElementsByTagName("ul");
var eImgs =document.getElementById("container").getElementsByTagName("img");
var loadFlag = true; //true时滚动到底部允许请求下一页数据，(让标志位)
eLists = utils.toArray(eLists);
getNewsList();

window.onscroll = function () {
    var nWinT = utils.win("scrollTop");
    var nWinH = utils.win("clientHeight");
    var nPageH = utils.win("scrollHeight");
    if (nWinT + nWinH >= nPageH - 50) {
        if (loadFlag) {
            getNewsList();
            loadFlag = false;
        }
    }
    imgLoad();

}
imgLoad();
function imgLoad(){
    //图片懒加载
    // 滚动卷起的高度
    var nWinT = utils.win("scrollTop");
    // 可视区域的高度
    var nWinH = utils.win("clientHeight");
    for (var i = 0; i < eImgs.length; i++) {
        ; (function (i) {
            // eImgs[i]; // 每一项
            var nCurImgT = utils.offset(eImgs[i]).top;
            var nCurImgH = eImgs[i].clientHeight;

            if (nWinT + nWinH > nCurImgT + nCurImgH) {
                var strCurImgPath = eImgs[i].getAttribute("data-src");
                // eImgs[i].src = strCurImgPath;

                var eImg = document.createElement("img");
                eImg.src = strCurImgPath;
                eImg.onload = function () {
                    eImgs[i].src = strCurImgPath;
                }
            }
        })(i);
    }

}
function getNewsList() {
    // 获取数据
    var xhr = new XMLHttpRequest;
    xhr.open("get", "newList.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            newList = JSON.parse(xhr.response);
        }
    };
    xhr.send();

    console.log(newList);

    // 渲染
    newList.forEach(function (v, i, ary) {
        // 添之前排序
        eLists.sort(function (a, b) {
            // a,b数组相邻的两项
            return a.clientHeight - b.clientHeight
        });

        // v; // 数组的每一项
        var eLi = document.createElement("li");
        eLi.innerHTML = `<img src="./img/default.jpg" data-src="${v.img}" alt="">
        <p>${v.desc}</p>`;
        eLists[0].appendChild(eLi);
        loadFlag = true;
    });
}
