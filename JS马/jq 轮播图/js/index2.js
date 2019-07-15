//获取元素
let $container = $('.container');
let $wrapper = $('.wrapper');
let $slideList = null;
let $focus = $('.focus');
let $focusList = null;
let $arrowLeft = $('.arrowLeft');
let $arrowRight = $('.arrowRight');
//设置轮播参数
let stepIndex = 0;
let autoTime = null;
let intavel = 2000;
//1ajax
$.ajax({
    url: 'json/banner.json',
    method: 'GET',
    dataType: 'json',
    async: false,
    error(err) {
        console.log(err);
    },
    success(data) {
        console.log(data);
        bindHTML(data);
    }
})
//2数据渲染
function bindHTML(data) {
    let slideStr = '';
    let focusStr = '';
    data.forEach(({ img, desc }, index) => {
        slideStr += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
        focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
    })
    slideStr += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}"></div>`;
    $wrapper.html(slideStr);
    $focus.html(focusStr);
    $slideList = $('.slide');
    $focusList = $('.focus > li');
    $wrapper.css({
        width: $slideList.length * 1000
    })
}
//3轮播
function autoMove() {
    stepIndex++;
    if (stepIndex >= $slideList.length) {
        $wrapper.css('left', 0);
        stepIndex = 1;
    }
    $wrapper.stop().animate({
        left: -1 * stepIndex * 1000
    }, 500)
    changeFocus() 
}
//4鼠标悬停鼠标离开事件
function handelContain() {
    $container.on('mouseenter', function () {
        clearInterval(autoTime);
        $arrowLeft.css({ display: 'block' });
        $arrowRight.css({ display: 'block' });
    })
    $container.on('mouseleave', function () {
        autoTime = setInterval(autoMove, intavel);
        $arrowLeft.css({ display: 'none' });
        $arrowRight.css({ display: 'none' });
    })
}
handelContain();
//5焦点跟随
function changeFocus() {
    let tempIndex = stepIndex;
    if (tempIndex === $slideList.length - 1) {
        tempIndex = 0;
    }
    $focusList.eq(tempIndex).addClass('active').siblings().removeClass('active');
}
//6点击按钮
function handelArrow() {
    $arrowRight.click(autoMove);
    $arrowLeft.click(function () {
        stepIndex--;
        if (stepIndex < 0) {
            stepIndex = $slideList.length - 2;
        }
        $wrapper.stop().animate({
            left: -1 * stepIndex * 1000
        }, 500)
        changeFocus();
    })   
}
handelArrow();
//7点击焦点
function clickFocus(){
    $focusList.click(function(){
        stepIndex=$(this).index();
        $wrapper.stop().animate({
            left: -1 * stepIndex * 1000
        }, 500)
        changeFocus();
    })
}
clickFocus()
//8定时器
autoTime = setInterval(autoMove, intavel);