let $freeBtnOne=$('.input-one > .input-main > .free');
let $errorOne=$('.input-one > .error');
let $freeBtnTwo=$('.input-two > .input-main > .free');
let $errorTwo=$('.input-two > .error');
$freeBtnOne.click(function(){
    $errorOne.css({
        display:'block'
    });
});
$freeBtnTwo.click(function(){
    $errorTwo.css({
        display:'block'
    });
});