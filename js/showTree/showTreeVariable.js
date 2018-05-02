/*
    树展示区 数据
 */
var treeData = {
    treeShow: 0,//树展示区 0：展示页面树 1：展示css树
    pageTree:{
        vmTree:[],//接收页面树的虚拟dom
    },
    cssTree:{
        renderObj:null,//组件树的渲染对象
        vNodeTree:null//组件树的虚拟Dom
    },
    pState:true,
    //记录当前点击的dom标签,添加样式,以便用于下次点击的时候清除样式
    targetElement: null,
    treeTarEle: null,
};