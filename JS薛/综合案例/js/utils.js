var utils = (function () {
    // 类数组转数组，
    // 参数 likeAry  类数组
    function toArray(likeAry) {
        var newAry = [];
        try {
            newAry = Array.prototype.slice.call(likeAry)
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                newAry.push(obj[i]);
            }
        }
        return newAry;
    }
    // 获取、设置浏览器窗口得某个属性
    // 只有一个实参，获取窗口得某个属性
    // 两个参数，表示设置
    function win(attr, val) {
        if (attr && val === undefined) {
            // 对象得属性名，如果是变量，只能用中括号去使用
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }

    // 获取元素距离body的偏移量
    function offset(ele) {
        var obj = {
            left: ele.offsetLeft,
            top: ele.offsetTop
        };
        var oParent = ele.offsetParent;
        // 如果父级参照物不是body
        while (oParent !== null) {
            // 将父级参照物的左偏移量和左border加到 obj的left值上
            obj.left += (oParent.offsetLeft + oParent.clientLeft);
            // 将父级参照物的上偏移量和上border加到 obj的left值上
            obj.top += (oParent.offsetTop + oParent.clientTop);
            // 取父级参照物的父级参照物，重新判断
            oParent = oParent.offsetParent;
        }
        return obj
    };
    // 在es6中设置对象时，属性名盒属性值如果相等，可以把属性值和冒号一块省略
    return {
        toArray,
        win,
        offset
    }
})();
