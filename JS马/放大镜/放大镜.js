/*需求:实现一个电商放大镜的效果(放大3倍):
      1.默认展示原图
      2.当鼠标移入原图盒子时,原图盒子中的遮罩层以及装大图的盒子都要出现
      3.当鼠标在原图当中,遮罩层跟随鼠标移动;但是遮罩层不能越界(带边界线
        制的鼠标跟随);
      4.大图展示的部分正好是遮罩层盖住的原图部分
      5.遮罩层和大图运动方向相反,遮罩层在原图盒子中移动距离x,大图需要移动
        -3x的距离;
      6.当鼠标移出原图时,遮罩层和大图都要消失;
*/
/*思路:放大镜放大3倍
    1.有两个大盒子,一个用来装原图的box1,另一个是用来装大图的box2;
      box1和box2宽高是相等的;
    2.box1下面有一个遮罩层mask,这个遮罩层盖住的box1部分和box2露出的大图的
      部分是相同的,所以有一个比例关系:
                              mask的宽高/box1的宽高=box2/大图片的尺寸
    3.mask要相对于box1绝对定位,大图片相对于box2绝对定位
    4.监听box1的ommouseenter事件,当事件触发时,设置mask和box2的display:block;
    5.鼠标移动时mask要跟随鼠标,所以需要监听box1的onmousemove事件,在事件
      函数中实现鼠标带边界的中心跟随;
    6.在mask在box1中移动的时候,大图bigImg要向相反的方向移动;
      如果mask移动x,bigImg需要移动-3x的距离;
    7.当鼠标移出box1的时候,mask和box2消失,所以需要监听box1的leave事件,
      在事件函数中把mask和box2的display设为none;
*/

//1.获取元素
let $ = selector => document.querySelector(selector);
let box1 = $('.box1');
let mask = $('.mask');
let box2 = $('.box2');
let bigImg = $('.bigImg');
//2.监听box1的进入和移出,让mask和box2消失隐藏
box1.onmouseenter = function () {
  mask.style.display = box2.style.display = 'block';
}
box1.onmouseleave = function () {
  mask.style.display = box2.style.display = 'none';
}
//3.实现在box1中移动鼠标mask中心有边界跟随,并且bigImg相应移动
box1.onmousemove = function (e) {
  //3.1获取鼠标的位置
  left1 = parseFloat(e.clientX) - box1.offsetLeft - mask.offsetWidth / 2;
  top1 = parseFloat(e.clientY) - box1.offsetTop - mask.offsetHeight / 2;
  minL = 0;
  minT = 0;
  maxL = box1.clientWidth - mask.offsetWidth;
  maxT = box1.clientHeight - mask.offsetHeight;
  //3.2对鼠标位置进行修正
  if (left1 < minL) {
    left1 = minL;
  }
  if (left1 > maxL) {
    left1 = maxL;
  }
  if (top1 < minT) {
    top1 = minT;
  }
  if (top1 > maxT) {
    top1 = maxT;
  }
  //3.3把修正后的值设置给元素
  mask.style.left = left1 + 'px';
  mask.style.top = top1 + 'px';
  //3.4按照放大比例,设置bigImg的left和top
  bigImg.style.left=-3*left1+'px';
  bigImg.style.top=-3*top1+'px';
}