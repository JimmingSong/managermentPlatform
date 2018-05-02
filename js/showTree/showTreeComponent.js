/* eslint-disable no-undef */
//css树
Vue.component('csstree',{
        render: function (createElement) {
            var render=this.data.renderObj;
            var vNodeTree=this.data.vNodeTree;
            var cssDom=[];
            if(vNodeTree!==null){
                // 点击交互时传入的是渲染对象中的sty项 内没有sty
                if ("sty" in render) {
                    render = render.sty
                }
                cssDom.push(cssTreeView(createElement, vNodeTree, render));
            }
            treeData.cState = false;
            return createElement("div",{class:"cssTree"},cssDom);
        },
        props:['data']
    }
);
//页面树
Vue.component('pagetree',{
    render: function (createElement) {
         var pageTreeNodes=[];
         var vueObjs=this.data;
         var state = this.state;
         if(state){
             vueObjs.map(function(vueobj,index){
                 pageTreeNodes.push(domTreeView(createElement,vueobj));
             });
         }else {
             vueObjs.map(function(vueobj,index){
                 pageTreeNodes.push(domTreeView(createElement,vueobj));
             });
         }
        treeData.pState = false;
        return createElement("div",{},pageTreeNodes);
    },
    props:['state','data']
});

