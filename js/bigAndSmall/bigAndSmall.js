/*
value 选择的尺寸
 */
function phoneTypeSel(v) {
    v = parseInt(v);
    var phone = document.getElementById("phone-show");
    var widthV,heightV;
    bigAndSmall.size = "100";
    if (v >= 640 && v < 1920) {
        remSetting.setRem(1 / 12);
        widthV = parseInt((v/3)*2);
        heightV = widthV/0.56;
        bigAndSmall.baseWdSize = widthV;
        bigAndSmall.baseHgSize = heightV;
        phone.style.width = widthV + "px";
        phone.style.height = heightV + "px";
        phone.firstElementChild.style.display = "block";
        phone.lastElementChild.className = "phone-btn";
        phone.firstElementChild.nextElementSibling.removeAttribute("style")
    }else{
        remSetting.setRem(1 / 50);
        widthV = parseInt(v/2);
        heightV = widthV * 0.49;
        bigAndSmall.baseWdSize = widthV;
        bigAndSmall.baseHgSize = heightV;
        phone.style.width = widthV + "px";
        phone.style.height = heightV + "px";
        phone.firstElementChild.style.display = "none";
        phone.firstElementChild.nextElementSibling.style.margin = '3% 2%';
        phone.lastElementChild.className = "phone-line"
    }
}
