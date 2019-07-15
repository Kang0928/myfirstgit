let bannerRender = (function () {
    //获取元素
    let $container = $('.container');
    let $wrapper = $('.wrapper');
    let $slideList = null;
    let $focus = $('.focus');
    let $focusList = null;
    let $arrowLeft = $('.arrowLeft');
    let $arrowRight = $('.arrowRight');
    //设置参数
    let stepIndex = 0;
    let moveTime = null;
    let intavel = 2000;
    //ajax
    function queryData() {
        $.ajax({
            url: './json/banner.json',
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
        });
    }
    //数据渲染
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
    //轮播事件
    function autoMove() {
        stepIndex++;
        if (stepIndex >= $slideList.length) {
            $wrapper.css('left', 0);
            stepIndex = 1;
        }
        $wrapper.stop().animate({
            left: -1 * stepIndex * 1000
        });
        handleFocus();
    }
    //鼠标放置和鼠标离开
    function handleMouse() {
        $container.mouseenter(function () {
            clearTimeout(moveTime);
            $arrowLeft.css('display', 'block');
            $arrowRight.css('display', 'block');
        }).mouseleave(function () {
            moveTime = setInterval(autoMove, intavel);
            $arrowLeft.css('display', 'none');
            $arrowRight.css('display', 'none');
        });
    }
    //焦点跟随事件
    function handleFocus() {
        let focusIndex = stepIndex;
        if (focusIndex === 4) {
            focusIndex = 0;
        }
        $focusList.eq(focusIndex).addClass('active').siblings().removeClass('active');
    }
    //鼠标点击事件
    function mouseClick() {
        $arrowLeft.click(function () {
            stepIndex--;
            if (stepIndex < 0) {
                stepIndex = $slideList.length - 2;
            }
            $wrapper.stop().animate({
                left: -1 * stepIndex * 1000
            })
            handleFocus();
        })
        $arrowRight.click(autoMove);
    }
    //焦点点击事件
    function focusClick() {
        $focusList.click(function () {
            stepIndex = $(this).index();
            $wrapper.stop().animate({
                left: -1 * stepIndex * 1000
            })
            handleFocus();
        })  
    }
    return {
        init() {
            queryData();
            handleMouse();
            mouseClick();
            focusClick();
            moveTime = setInterval(autoMove, intavel);
        }
    }
})();
bannerRender.init();