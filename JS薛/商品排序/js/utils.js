// 工具类库
/* var utils = {
    toArray: function (likeArray){
        var newAry = [];
        try{
            newAry = Array.prototype.slice.call(likeArray);
        }catch(e){
            for(var i = 0; i < likeArray.length; i++){
                newAry.push(likeArray[i]);
            }
        }
        return newAry
    }
}


utils.toArray();
 */

var utils = (function () {
    // 类书组转数组
    function toArray(likeArray) {
        var newAry = [];
        try {
            newAry = Array.prototype.slice.call(likeArray);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                newAry.push(likeArray[i]);
            }
        }
        return newAry
    }
    //通过时间戳格式化时间
    function formatDate(t){
        var date=new Date(t);
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        t=y+"-"+formatNum(m)+"-"+formatNum(d);
    
        return t;
    };
    //时间单位数加0
    function formatNum(num){
        if(num<10){
            return "0"+num;
        }else{
            return num;
        }
    }
    //返回值
    var obj = {
        toArray: toArray,
        formatDate:formatDate
    }
    return obj;
})();

// utils.toArray();

// ;(function(){
//     function toArray(likeArray){
//         var newAry = [];
//         try{
//             newAry = Array.prototype.slice.call(likeArray);
//         }catch(e){
//             for(var i = 0; i < likeArray.length; i++){
//                 newAry.push(likeArray[i]);
//             }
//         }
//         return newAry
//     }


//     window.utils = {
//         toArray: toArray
//     }
// })();

// utils.toArray();



