//获取元素
let $container = $('.container');
let $wrapper = $('.wrapper');
let $slistList = null;
let $focus = $('.focus');
let $focusList = null;
let $arrowLeft = $('.arrowLeft');
let $arrowRight = $('.arrowRight');
//配置轮播图参数
let stepIndex=0;
let autoTime=null;
let interval=2000;
//ajax
$.ajax({
    url:'json/banner.json',
    method:'GET',
    dataType:'json',
    async:false,
    error(err){
        console.log(err);
    },
    success(data){
        console.log(data);
        bindHTML(data);
    }
});
//绑定数据
function bindHTML(data){
    //拼接图片和小点
    let slideStr='';
    let focusStr='';
    data.forEach(({img,desc},index)=>{
        slideStr += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
        focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
    })
    slideStr += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}"></div>`;

    $wrapper.html(slideStr);
    $focus.html(focusStr);

    $slistList=$('.slide');
    $focusList=$('.focus > li');

    //动态设置wrapper的宽度
    $wrapper.css({
        width:$slistList.length * 1000
    })
}
//3实现轮播
function autoMove(){
    stepIndex++;
    if(stepIndex >= $slistList.length){
        $wrapper.css('left',0);
        stepIndex=1;
    }
    $wrapper.stop().animate({
        left: -1 * stepIndex * 1000
    },500);
changeFocus();

}


// 4. 鼠标划入container停止轮播，叫左右两个箭头显示出来；鼠标划出时，重自动轮播，把两个小箭头隐藏掉
function handleContainer(){
    $container.on('mouseenter',function(){
        //停止轮播
        clearInterval(autoTime);
        //箭头展出
        $arrowLeft.css({display:'block'});
        $arrowRight.css({display:'block'});
    }).on('mouseleave',function(){
        autoTime=setInterval(autoMove,interval);
        $arrowLeft.css({display:'none'});
        $arrowRight.css({display:'none'});
    })
}
handleContainer();

// 5. 实现焦点跟随
// 焦点跟随：播第一张图片，第一个焦点选中，播第二个图片，第二个选中，而stepIndex控制着播哪个图片；焦点跟随就是把索引和stepIndex相同的焦点设置为选中样式，其他的小点清除选中样式；
function changeFocus(){
    let timpIndex=stepIndex;
    if(timpIndex >= $slistList.length -1 ){
        timpIndex=0;
    }
    $focusList.eq(timpIndex).addClass('active').siblings().removeClass('active');
}

// 6. 处理小箭头的点击事件
function handleArrow(){
    $arrowRight.click(autoMove);
    $arrowLeft.click(function(){
        stepIndex--;
        if(stepIndex<0){
        stepIndex = $slistList.length-2;
    }
    $wrapper.stop().animate({
        left: -1 * stepIndex * 1000
    },500);
changeFocus();
})
}
handleArrow();
// 7. 处理焦点的点击事件
function handleFocus(){
    $focusList.click(function(e){
        let index=$(this).index();
        stepIndex=index;
        $wrapper.stop().animate({
            left:-1*stepIndex*1000
        })
        changeFocus();
    })
}
handleFocus();
autoTime=setInterval(autoMove,interval);