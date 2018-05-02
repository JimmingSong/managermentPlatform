Vue.component('pro-id',{
    render:function (createElement) {
        // var _this = this;
        //console.log("aa");
        return createElement("div",{},[
            createElement("span",{
                domProps:{
                    innerHTML:"这是一个组件"
                }
            })
        ])
    },
    renderLevel:1
    // props:['name','data']
});
