//ajax
let eGoodsData = null;
let page = 0;
function queryData(ele) {
    let xhr = new XMLHttpRequest();
    xhr.open('Get', `./data.json?keyword=${ele}`, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            eGoodsData = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
}

let input = document.getElementById('input');
let aTag = document.getElementsByClassName('aTag')[0];
let slidelist = document.getElementsByClassName('slide-list')[0];
input.onfocus = function () {
    slidelist.style.display = 'block';
    aTag.style.display = "none";
    input.setAttribute('placeholder', '请输入搜索的商品内容');
}
let originalInnerHTML = slidelist.innerHTML;
input.oninput = function () {
    let inputV = input.value;
    queryData(inputV);
    let str = '';
    let highlightReg = new RegExp(input.value, 'ig');
    eGoodsData.data.forEach((item, index) => {
        //高亮处理 highlight:用正则+replace
        item = item.replace(highlightReg, function (a, b, c) {
            return `<span style="color:red;">${a}</span>`
        });
        str += `<li>${item}</li>`;
    });
    slidelist.innerHTML = str;
    if (input.value === null) {
        slidelist.innerHTML = originalInnerHTML;
    }
}
input.onblur = function () {
    slidelist.style.display = 'none';
    aTag.style.display = "block";
    slidelist.innerHTML = originalInnerHTML;
    input.setAttribute('placeholder', '');
}