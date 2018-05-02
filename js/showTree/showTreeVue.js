
/*
树展示区
 */
new Vue({
    el:"#tree-show",
    data:treeData,
    methods:{
        cssTreeClick:function (e) {
            treeData.treeShow = 1;
        },
        pageTreeClick:function (e) {
            treeData.treeShow = 0;
        }
    },
    updated: function () {
        clearClass("model-t2");
        var curEl = document.querySelectorAll(".model-t2");
        if (treeData.treeShow === 0) {
            curEl[1].className = "model-show model-t2";
        } else if (treeData.treeShow === 1) {
            curEl[0].className = "model-show model-t2";
        }
    },
    renderLevel: 0
});
