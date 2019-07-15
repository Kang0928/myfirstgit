//获取元素
let $container = $('.container');
let $wrapper = $('.wrapper');
let $slideList = null; //
let $focus = $('.focus');
let $focusList = null; //焦点
let $arrowLeft = $('.arrowLeft');
let $arrowRight = $('.arrowRight');
//设置参数
let stepIndex = 0; //索引
let moveTime = null; //定时器
let inteval = 2000; //轮播时间
//ajax
function queryData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './json/banner.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let eImgsData = JSON.parse(xhr.responseText);
            bindHTML(eImgsData);
        }
    }
    xhr.send();
}
queryData();
//绑定数据
function bindHTML(data) {
    let eImgsstr = '';
    let focusStr = '';
    data.forEach(({ img, desc }, index) => {
        eImgsstr += `<div class="slide" ><img src="${img}" alt="${desc}"></div>`;
        focusStr += `<li class="${index == 0 ? 'active' : ''}"></li>`;
    })

    eImgsstr += `<div class="slide" ><img src="${data[0].img}" alt="${data[0].desc}"></div>`;
    $wrapper.html(eImgsstr);
    $focus.html(focusStr);
    $slideList = $('.slide');
    $focusList = $('li');
    $wrapper.css({
        width: $slideList.length * 1000
    })
}
//轮播事件
function autoMove() {
    stepIndex++;
    if (stepIndex >= $slideList.length) {
        $wrapper.css('left', 0);
        stepIndex = 1;
    }
    $wrapper.stop().animate({
        left: -1 * stepIndex * 1000
    }, 500)
    focusMove();
}
//鼠标放上和鼠标离开
function handleMouse() {
    $container.mouseenter(function () {
        clearTimeout(moveTime);
        $arrowLeft.css('display', 'block');
        $arrowRight.css('display', 'block');
    });
    $container.mouseleave(function () {
        moveTime = setInterval(autoMove, inteval);
        $arrowLeft.css('display', 'none');
        $arrowRight.css('display', 'none');
    });
}
handleMouse();
//焦点跟随
function focusMove() {
    let focusIndex = stepIndex;
    if (focusIndex == 4) {
        focusIndex = 0;
    }
    $focusList.eq(focusIndex).addClass('active').siblings().removeClass('active');
}
focusMove();
//点击事件
function handleClick() {
    $arrowLeft.click(function () {
        stepIndex--;
        if (stepIndex < 0) {
            stepIndex = $slideList.length - 2;
        }
        $wrapper.stop().animate({
            left: -1 * stepIndex * 1000
        }, 500);
        focusMove();
    });
    $arrowRight.click(autoMove);
}
handleClick();
//焦点点击事件
function focusClick(){
    $focusList.click(function(){
        stepIndex=$(this).index();
        $wrapper.stop().animate({
            left: -1 * stepIndex * 1000
        }, 500);
        focusMove();
    })
}
focusClick()
//定时器
moveTime = setInterval(autoMove, inteval);