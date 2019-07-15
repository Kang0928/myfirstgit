$lis=$('.header > li');
$divs=$('.tabBox > div');
$lis.click(function(){
    $(this).addClass('active').siblings().removeClass('active');
    let i=$(this).index();
    $divs.eq(i).addClass('active').siblings().removeClass('active');
})