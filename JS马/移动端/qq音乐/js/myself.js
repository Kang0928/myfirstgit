/*
qq音乐的功能:  1.响应式布局 采用rem布局解决方案
              2.音乐自动播放(audio videw标签)
              3.音符按钮用来控制播放 根据播放状态有不同的操作;如果当前是播放的,就暂停播放.如果是暂停的状态,触摸后就是播放;处于播放状态下,这个按钮是旋转的,暂停的状态下是不转的.
              4.歌词是跟随播放进度走的,会有高亮样式
              5.随着播放进度条也要更新
              6.随着播放,已经播放的时长也要更新
*/

// zepto是和jq很相似的一款类库,它的特点是轻量,专门给移动端用的.
// 常用的方法如获取元素 css addclass removeclass 等方法都有
// 用法和jq一样

//1.获取元素(用zepto获取元素和jq元素一样)
let musicAudio = $('#audio')[0];  //获取来的是jq对象,需要通过[0]来转成原生
let $header = $('.header');
let $musicBtn = $('.musicBtn'); //音符按钮
let $main = $('.main'); //装歌词的容器元素
let $wrapper = $('.wrapper'); //$wrapper是相对于main定位的
let $footer = $('.footer');
let $current = $('.currtent');
let $duration = $('.duration');
let $already = $('.already');

let autoTime = null;

// 2.动态的设置main部分的高度
// main部分的高度 = 视口的高度 - header的高 - footer的高 - 0.6rem的padding的值
function computedMain() {
    let winH = document.documentElement.clientHeight; //视口的高度 单位是px
    let headerH = $header[0].offsetHeight; //header的高 单位是px
    let footer = $footer[0].offsetHeight; //footer的高 单位是px
    //如何换把px算成rem? 获取html的fontSize,然后把这些以px为单位除以fontsize就得到rem数
    let fontSize = parseFloat(document.documentElement.style.fontSize);
    let curH = (winH - headerH - footer) / fontSize - 0.6 - .3;
    //多减.3是给footer留一点距离
    $main.css({
        height: curH + 'rem'
    })
}
computedMain();
// 当页面大小发生改变时 监听size
window.addEventListener('resize', computedMain);
window.addEventListener('orientationchange', computedMain);

//3.动态获取歌词
$.ajax({
    url: './json/lyric.json',
    type: 'GET', //type是http method:get post put delete options
    async: false,
    error(err) {
        console.log(err);
    },
    success({ lyric }) {
        console.log(lyric);
        bindHtml(lyric);
    }
})

//4.绑定数据
function bindHtml(data) {
    //4.1分析歌词,解决歌词第一行
    //我的梦 (华为手机主题曲) 张靓颖
    //[00&#58;01&#46;36]我的梦&#32;&#40;华为手机主题曲&#41;&#32;&#45;&#32;张靓颖&#10;
    // &#32; → ' '
    // &#40; → '('
    // &#41; → ')'
    // &#45; → '-'
    let d1 = data.replace(/&#(\d+);/g, function (res, a) {
        //正则结合replace执行替换,回调函数中的参数:第一个参数res是整个正则捕获到的内容,从第二个开始就是分组捕获到的内容
        //正则结合replace替换,正则能够捕获多少次回调函数就会执行多少次,很像遍历,项目中常用这种方式来遍历字符串;
        // replace写回调函数时,用回调函数的返回值替换匹配的内容

        //根据分组捕获的数字不同 返回不同的内容
        switch (parseFloat(a)) {
            case 32:
                return ' ';
            case 40:
                return '(';
            case 41:
                return ')';
            case 45:
                return '-';
        }
        return res; //注意,replace使用回调的返回值替换匹配到的内容,现阶段我们只处理32 41 40 45 其他的不处理,所以须要原模原样的返回;
    })
    //4.2 接着处理每一秒的歌词
    // [01&#58;16&#46;75]执着地勇敢地不回头&#10;
    // 写在&#58;前的是分钟数
    // 写在&#46;前的是秒数
    // 写在方括号后 &#10;前 的是歌词

    // 用正则把分钟数 秒数 及对应的歌词抠下来
    let reg = /\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)&#10;/g;
    let ary = [];
    //用正则+replace遍历字符串:正则能捕获到多少次回调就执行多少次
    d1.replace(reg, function (res, minute, seconds, value) {
        ary.push({
            minute,
            seconds,
            value
        });
    });
    console.log(ary);

    //遍历ary 把数据绑定到页面中
    let str = '';
    ary.forEach(({ minute, seconds, value }, index) => {
        str += `<p data-min="${minute} data-sec="${seconds}">${value}</p>`;
    })
    $wrapper.html(str);

    //歌词就绪后播放音乐 
    musicAudio.play(); //audio元素自带的方法 播放:pause

    //叫音符按钮转起来
    $musicBtn.addClass('select');

    //开启定时器,计算时间更新播放进度,高亮歌词
    autoTime = setInterval(computedTime, 1000);

    //auto 标签有一个ontimeupdata事件,当currentTime发生变更时,会触发这个事件,但是currentTime特敏感,事件触发的特别频繁,如果要用注意使用防抖和节流处理
}

//5.给音符按钮绑定事件,根据播放状态采取不同的操作
//zepto 中有一个 tap方法,给元素绑定触摸事件
$musicBtn.tap(function () {
    //?如何知道音频是在播放还是暂停? 
    // audio元素上有一个paused属性,是否暂停,是一个布尔值,为true表示暂停.false表示正在播放
    if (musicAudio.paused) {
        //处于暂停
        musicAudio.play();
        //this是绑定事件的元素 是原生对象
        $(this).addClass('select');
        autoTime=setInterval(computedTime,1000);
    } else {
        //处于播放
        musicAudio.pause();
        clearInterval(autoTime); //暂停后要停止定时器
        $(this).removeClass('select');

    }
});

//6.根据播放进度,更新进度条,高连歌词,已经播放的时间
function computedTime() {
    let step=0; //记录走过多少行
    let curTop=0; //wrapper的初始top值


    //1.更新当前的播放进度
    //获取当前音频的播放进度以及总时长:audio自带
    //currentTime 是当前已经播放的时间  duration 总时长 (单位:秒)
    let { currentTime, duration } = musicAudio;
    let curTime = formatTime(currentTime); //格式化后的当前时间
    let durTime = formatTime(duration); //格式化后的总时间

    //插入到页面元素中
    $current.html(curTime);
    $duration.html(durTime);

    //更新进度条
    $already.css({
        width: (curTime / durTime) * 100 + '%'
    });

    //高亮歌词:从wrapper下的p标签中找到行内属性存储的分钟数和秒数和当前播放进度的时间相同的p元素,设置它为选中(添加select类名),还要移出其兄弟们的选中样式
    let [min, sec] = curTime.split(':');
    //找data-min=min并且data-sec=sec的p标签

    // 复杂方法↓
    // let ps = document.querySelectorAll('.wrapper > p');
    // let right = null;
    // for (let i = 0; i < ps.length; i++) {
    //     let m = ps[i].getAttribute('data-min');
    //     let s = ps[i].getAttribute('data-sec');
    //     if (+m === +min && +s === +sec) right = ps[i];
    // }
    // +字符串 : 把字符串转成数字

    //简易方法↓
    //用filter方法
    let $highLight=$('.wrapper p').filter(`[data-min="${min}"]`).filter(`[data-sec="${sec}"]`);
    console.log($highLight[0]);

    if($highLight.length){
        $highLight.addClass('select').siblings().removeClass('select');
        step++; //找到一次和当前事件对应的歌词就给step++
        if(step>5){ //前四行不动
            curTop -= 0.84; //0.84rem是p标签的高度
            $wrapper.css({
                top:curTop + 'rem'
            });
        }
    }

    //当当前的播放进度大于等于总时间时,就应该清除定时器
    if(currentTime >= duration){
        clearInterval(autoTime);
        curTop=0;
        step=0;
    }
}
function formatTime(time) {
    //格式化时间 xx:xx
    let min = Math.floor(time / 60); //获取分钟
    let sec = Math.round(time - min * 60); //获取秒数
    //判断 补零
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    return `${min}:${sec}`;
}