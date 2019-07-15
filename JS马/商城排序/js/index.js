let eHeader = document.getElementById('header');
let eHeaderAs = eHeader.getElementsByTagName('a');

let eList = document.getElementById('list');
let eListLis = document.getElementsByTagName('li');

let eGoods = null;
//ajax
let xhr = new XMLHttpRequest();
xhr.open('Get', 'json/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        eGoods = utils.toJSON(xhr.responseText);
    }
}
xhr.send();
console.log(eGoods);

// 数据渲染
let str = '';
for (let i = 0; i < eGoods.length; i++) {
    let { img, title, price, time, hot } = eGoods[i];
    str += `<li data-time='${time}' data-price='${price}' data-hot='${hot}'>
    <a href="javascript:;">
        <img src="${img}" alt="">
        <p${title}</p>
        <span>$${price}</span>
        <span>上架时间:${time}</span>
        <span>热度:${hot}</span>
    </a>
</li>`;
}
eList.innerHTML = str;

//绑定点击事件
for (let i = 0; i < eHeaderAs.length; i++) {
    eHeaderAs[i].flag = -1;
    eHeaderAs[i].onclick = function () {
        
        for(let i=0;i<eHeaderAs.length; i++){
            eHeaderAs[i].classList.remove('on');
            eHeaderAs[i].classList.remove('under');
            this !== eHeaderAs[i] ? eHeaderAs[i].flag = -1 : void 0;
        }
        this.classList.remove('under');
        this.classList.add('on');
        if(this.flag === 1){
            this.classList.remove('on');
            this.classList.add('under');
        }
        this.flag *= -1;
        eGoodsSort(i, this.flag);
    }
}

//商品排序
function eGoodsSort(index, flag) {
    let newLis = utils.arrLikeToAry(eListLis);
    newLis.sort(function (a, b) {
        let aInn, bInn;
        switch (index) {
            case 0:
                aInn = a.getAttribute('data-time').replace(/-/g,'');
                bInn = b.getAttribute('data-time').replace(/-/g,'');
                break;
            case 1:
                aInn = a.getAttribute('data-price');
                bInn = b.getAttribute('data-price');
                break;
            case 2:
                aInn = a.getAttribute('data-hot');
                bInn = b.getAttribute('data-hot');
                break;
        }
        return (aInn-bInn) * flag;
    })
    newLis.forEach(v => {
        eList.appendChild(v);
    });
}