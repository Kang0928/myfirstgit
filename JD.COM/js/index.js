let JD = (function () {
    //获取元素
    let $suctiontop = $('.suctiontop');//吸顶盒子
    let $advertising = $('.advertising');//置顶广告盒子
    let $advertisingX = $('.x');//关闭按钮
    // let $wdjd = $('.wdjd');//我的京东按钮
    // let $wdjdhovershop = $('.wdjdhovershop');
    let $sjjd = $('.sjjd'); //手机京东按钮
    let $sjjdhovershop = $('.sjjd > .sjjdhovershop');
    let $dogBox = $('.dogBox'); //狗狗礼盒动图

    //设置属性
    let winScrollT = null; //窗口卷起高度

    //置顶广告:关闭操作
    function handleAdvertising() {
        $advertisingX.click(function () {
            $advertising.css({ display: 'none' })
        })
    }
    //吸顶
    function suctionTop() {
        if (winScrollT >= 800) {
            $suctiontop.css('display', "block");
            $suctiontop.css('position', "fixed");
            $suctiontop.css('left', 0);
            $suctiontop.css('top', 0);
            $suctiontop.css('z-index', 100);
        } else {
            $suctiontop.css('display', "none");
        }
    }
    // 导航栏菜单
    function menu() {
        //手机京东
        $sjjd.mouseenter(function () {
            $sjjdhovershop.css({ display: 'block' });
        }).mouseleave(function () {
            $sjjdhovershop.css({ display: 'none' });
        });
    }
    //头部
    function handleDog() {
        let dogsrc1 = "./img/吸顶狗图片.png";
        let dogsrc2 = "./img/狗狗礼盒动图.gif";
        let flag = 0;
        let autoTime = setInterval(function () {
            let dogStr = '';
            dogStr = `<img src="${flag === 0 ? dogsrc1 : dogsrc2}" alt="">`;
            $dogBox.html(dogStr);
            if (flag) {
                flag = 0;
            } else {
                flag = 1;
            }
        }, 4000);
    }
    //轮播图
    let banner = (function () {
        //获取元素
        let $container = $('.container');
        let $wrapper = $('.wrapper');
        let $slideList = null;
        let $focus = $('.focus');
        let $focusList = null;
        let $arrowLeft = $('.arrowLeft');
        let $arrowRight = $('.arrowRight');
        //设置属性
        let stepIndex = 0; //索引
        let intreval = 2000; //定时器时间间隔
        let autoTime = null; //定时器
        //ajax
        function queryData() {
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
        }
        //数据渲染
        function bindHTML(data) {
            let slideStr = '';
            let focusStr = '';
            data.forEach(({ img, desc }, index) => {
                slideStr += `<div class="slide"><img src="${img}" alt="${desc}" ></div>`;
                focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`;
            });
            slideStr += `<div class="slide"><img src="${data[0].img}" alt="${data[0].desc}" ></div>`;
            $wrapper.html(slideStr);
            $focus.html(focusStr);
            $slideList = $('.slide');
            $focusList = $('.focus > li');
            $wrapper.css({
                width: $slideList.length * 590
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
                left: stepIndex * -1 * 590
            })
            handleFocus();
        }
        //鼠标进入和离开
        function handleMouse() {
            $container.mouseenter(function () {
                clearInterval(autoTime);
            });
            $container.mouseleave(function () {
                autoTime = setInterval(autoMove, intreval);
            });
        }
        //焦点跟随
        function handleFocus() {
            let focusIndex = stepIndex;
            if (focusIndex >= $focusList.length) {
                focusIndex = 0;
            }
            $focusList.eq(focusIndex).addClass('active').siblings().removeClass('active');
        }
        //鼠标点击按钮
        function mouseClick() {
            $arrowLeft.click(function () {
                stepIndex--;
                if (stepIndex < 0) {
                    $wrapper.css('left', 0);
                    stepIndex = $slideList.length - 2;
                }
                $wrapper.stop().animate({
                    left: stepIndex * -1 * 590
                })
                handleFocus();
            });
            $arrowRight.click(autoMove);
        }
        //焦点点击事件
        function focusClick() {
            $focusList.click(function () {
                let focusI = $(this).index();
                autoMove();
                $focusList.eq(focusI).addClass('active').siblings().removeClass('active');
            })
        }
        //定时器
        // autoTime = setInterval(autoMove, intreval);

        return {
            init() {
                queryData();
                autoMove();
                handleMouse();
                mouseClick();
                focusClick();
                autoTime = setInterval(autoMove, intreval);
            }
        }
    })();

    //滚动事件
    window.onscroll = function () {
        winScrollT = document.documentElement.scrollTop;
        suctionTop();
    }
    //service-s选项卡
    ; (function () {
            let $services = $('.service-s');
            let $tab = $('.service-s > .tab');
            let $tabDiv = $('.service-s > .tab > div');
            let $tabP = $('.service-s > .tab > p');
            let $endBtn = $('.bottom-entry > .endBtn');
            $tab.mouseenter(function () {
                $services.css({
                    top: -42 + 'px'
                })
                $tabDiv.css({
                    top: 50 + 'px'
                })
                $endBtn.css({
                    top: 25 + 'px'
                })

                let i = $(this).index();
                for (let i = 0; i < $tabDiv.length; i++) {
                    $tabDiv.eq(i).removeClass('active');
                    $tabP.eq(i).css({
                        borderBottom: '0px red solid'
                    })
                }
                $tabDiv.eq(i).addClass('active');
                $tabP.eq(i).css({
                    borderBottom: '2px red solid'
                })
            });
            $endBtn.click(function () {

                $services.css({
                    top: 0 + 'px',
                    transition: 'all 0.3s linear 0.1s'
                })
                $tabDiv.css({
                    top: 200 + 'px',
                    transition: 'none'
                })
                $endBtn.css({
                    top: 200 + 'px',
                    transition: 'none'
                })
                $tabP.css({
                    borderBottom: '0px red solid'
                })
                setTimeout(function () {
                    $services.css({
                        transition: 'all 0.3s linear 0s'
                    })
                    $tabDiv.css({
                        transition: 'all 0.3s linear 0s'
                    })
                    $endBtn.css({
                        transition: 'all 0.3s linear 0s'
                    })
                }, 1000)
            });

    })();
    //wrapper1轮播图1
    let banner1 = (function () {
        //获取元素
        let $wrapper1 = $('.wrapper1');
        let $slideList = null;
        let $arrowLeft = $('.arrowLeft1');
        let $arrowRight = $('.arrowRight1');
        //设置属性
        let stepIndex = 0; //索引
        //ajax
        function queryData() {
            $.ajax({
                url: 'json/banner2.json',
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
        }
        //数据渲染
        function bindHTML(data) {
            let slideStr = '';
            data.forEach(({ img, desc,link,monetone,monettwo }, index) => {
                slideStr += `<a href="${link}" class="slide1">
                <img src="${img}" alt="">
                <p>${desc}</p>
                <div>
                    <span class="sp1">
                        <i>¥</i>
                        <span>${monetone}</span>
                    </span>
                    <span class="sp2">
                        <i>¥</i>
                        <span>${monettwo}</span>
                    </span>
                </div>
            </a>`;
            });
            for(let i=0;i<4;i++){
                slideStr +=`<a href="${data[i].link}" class="slide1">
                <img src="${data[i].img}" alt="">
                <p>${data[i].desc}</p>
                <div>
                    <span class="sp1">
                        <i>¥</i>
                        <span>${data[i].monetone}</span>
                    </span>
                    <span class="sp2">
                        <i>¥</i>
                        <span>${data[i].monettwo}</span>
                    </span>
                </div>
            </a>`;
            }
            
            $wrapper1.html(slideStr);
            $slideList = $('.slide1');
            $wrapper1.css({
                width: $slideList.length * 190
            })
        }
        // //轮播事件
        function autoMove() {
            stepIndex++;
            if (stepIndex >= $slideList.length/4) {
                $wrapper1.css('left', 0);
                stepIndex = 1;
            }         
            $wrapper1.stop().animate({
                left: stepIndex * -1 * 578
            })
        }
        //鼠标点击按钮
        function mouseClick() {
            $arrowLeft.click(function () {
                stepIndex--;
                if (stepIndex < 0) {
                    $wrapper1.css('left', 0);
                    stepIndex = $slideList.length - 2;
                }
                $wrapper1.stop().animate({
                    left: stepIndex * -1 * 590
                })
            });
            $arrowRight.click(autoMove);
        }

        return {
            init() {
                queryData();
                mouseClick();
            }
        }
    })();
    //wrapper2轮播图1
    let banner2 = (function () {
        //获取元素
        let $wrapper = $('.wrapper2');
        let $slideList = $('.wrapper2 > .slide2');
        let $focus = $('.focus2');
        let $focusList =$('.focus2 > li');
        //设置属性
        let stepIndex = 0; //索引
        let intreval = 3000; //定时器时间间隔
        let autoTime = null; //定时器
        //轮播事件
        function autoMove() {
            stepIndex++;
            if (stepIndex >= $slideList.length) {
                $wrapper.css('left', 0);
                stepIndex = 1;
            }
            $wrapper.stop().animate({
                left: stepIndex * -1 * 173
            })
            handleFocus();
        }
        //焦点跟随
        function handleFocus() {
            let focusIndex = stepIndex;
            if (focusIndex >= $focusList.length) {
                focusIndex = 0;
            }
            $focusList.eq(focusIndex).addClass('active').siblings().removeClass('active');
        }
        //焦点点击事件
        function focusClick() {
            $focusList.click(function () {
                let focusI = $(this).index();
                autoMove();
                $focusList.eq(focusI).addClass('active').siblings().removeClass('active');
            })
        }

        return {
            init() {
                autoMove();
                focusClick();
                autoTime = setInterval(autoMove, intreval);
            }
        }
    })();
    //京东倒计时
    ;(function(){
        var $cd_item_txt=$('.cd_item_txt');
        setInterval(function () {
            var endDate = new Date("2019-7-31 13:0:0");
            // 还有多长时间结束
            var tNum = (endDate.getTime() - Date.now()) / 1000;
            if (tNum < 0) {
                clearInterval(1);
                return;
            }
            //秒→时分秒
            var h = Math.floor(tNum / 60 / 60);
            var m = Math.floor((tNum / 60 / 60 - h) * 60);
            var s = Math.floor(((tNum / 60 / 60 - h) * 60 - m) * 60);
        
            $cd_item_txt[0].innerHTML = formateTime(h) ;
            $cd_item_txt[1].innerHTML = formateTime(m) ;
            $cd_item_txt[2].innerHTML = formateTime(s) ;
        }, 1000);
        // 倒计时小于10加0
        function formateTime(num) {
            if (num < 10) {
                num = "0" + num;
            }
            return num;
        };
    })();

    return {
        init() {
            handleAdvertising();
            menu();
            handleDog();
            banner.init();
            banner1.init();
            banner2.init();
        }
    }
})();
JD.init();