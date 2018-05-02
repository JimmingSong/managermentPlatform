/**
 *展示区放大缩小
 */
new Vue({
    el:"#bigAndSmall",
    data:bigAndSmall,
    methods:{
        changeSize:function () {
            console.log(bigAndSmall.size);
        },
        changesSize:function () {
            // showSize.phoneType = bigAndSmall.size;
            var phone = document.getElementById("phone-show");
            var s = Math.round(parseInt(bigAndSmall.size))/100;
            phone.style.width = parseInt(bigAndSmall.baseWdSize) * s +"px";
            phone.style.height = parseInt(bigAndSmall.baseHgSize) * s +"px";
            console.log(phone.style.width);
            console.log(phone.style.height);
        }
    },
    watch:{
        "size":"changesSize"
    },
    renderLevel: 0
});
