function Tab(options){
    if (!(this instanceof Tab)) {
        console.error('Tab is a constructor which should be called by new');
        return;
      }
    if(!options || !options.el){
        console.error('缺少options或者options.el属性');
        return;
    }
    this.options=options;
    this.queryEle();
    this.bindEvent();
};

//1.获取元素
Tab.prototype.queryEle=function(){
    let eBox=document.querySelector(this.options.el);
    this.eLis=eBox.querySelectorAll('.active > li');
    this.eDivs=eBox.querySelectorAll('div');
    
};
//2.绑定事件 并添加点击事件
Tab.prototype.bindEvent=function(){
    let eLis=this.eLis;
    for(let i=0;i<eLis.length;i++){
        let that=this;
        this.eLis[i].onclick=function(){
            var o=i;
            
            for(let j=0;j<eLis.length;j++){
                that.clearClass(j);
            }
            that.addClass(o);
        }
    }
};
//3.清除class
Tab.prototype.clearClass=function(index){
    let eLis=this.eLis;
    let eDivs=this.eDivs;
    eLis[index].className=" ";
    eDivs[index].className=" ";
};
//4.添加class
Tab.prototype.addClass=function(index){
    let eLis=this.eLis;
    let eDivs=this.eDivs;
    eLis[index].className="up";
    eDivs[index].className="on";
};

var t1=new Tab({el:'#box'});
var t1=new Tab({el:'#box1'});