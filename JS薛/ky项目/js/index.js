var olis = document.getElementsByTagName("li");
var ospan = document.getElementsByClassName("spans");
var ouls = document.getElementsByClassName("uls");
var oliss1 = ouls[0].getElementsByTagName("li")[0];
var obox2 = document.getElementById("box2");
for (var i = 0; i < ospan.length; i++) {
    ospan[i].onclick = function () {
        var oshow = this.getAttribute("show");
        var caidan = this.nextElementSibling;
        if (oshow == "false") {
            caidan.style.display = "none";
            this.setAttribute("show", "true");
            this.classList.remove("active");
        } else {
            caidan.style.display = "block";
            this.setAttribute("show", "false");
            this.classList.add("active");
        }

    }
}
for (var i = 0; i < olis.length; i++) {

    olis[i].onmouseover = function () {
        this.style.background = " rgba(255,255,255,.1)";
    }
    olis[i].onmouseout = function () {
        this.style.background = "";
    }
}
//查看图表 table事件
oliss1.onclick = function () {
    obox2.style.display = "block";
}

var otds = document.getElementsByTagName("td");
// var oths = document.getElementsByTagName("th");
// for (var i = 0; i < oths.length; i++) {
//     oths[i].onmouseover = function () {
//         this.style.background = "#9aa5b425";
//     }
//     oths[i].onmouseout = function () {
//         this.style.background = "white";
//     }
// }
for (var i = 0; i < otds.length; i++) {
    otds[i].onmouseover = function () {
        this.style.background = "#9aa5b425";
    }
    otds[i].onmouseout = function () {
        this.style.background = "white";
    }
}



