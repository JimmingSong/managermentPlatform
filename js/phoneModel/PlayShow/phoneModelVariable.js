var dataTreeParse =new DataTreeParse();
var cssDynaCache = new cssDynaCache();
var phoneShow = {
    ds: {},
    rs: {},
    st: {
        "chr": []
    },
    // writeMode:true,
    // p_data:null,

    //页面上正在操作的数据 或组件 或容器
    //标注组件数据格式{d:数据，r：组件数据，id:渲染对象id}
    play_data: null,
    play_index: ""

    // c_layout:null,
};

// cssStAnalysis(phoneShow.st);
//     for(var i in phoneShow.rs){
//         cssRsAnalysis(phoneShow.rs[i])
//     }
// dataTreeParse.init();
// dataTreeParse.parsePage(phoneShow.ds);
var showPageDatas = {data: phoneShow};

// function dex(ds) {
//     var data = ds();
//     return dataTreeParse.parseTDI(data)
// }

// 移动拉伸功能需要 临时保存绑定了 mousemove事件并在处理函数里 调用 getPoint 函数的 DOM
var cacheMoveDom = null;
//复制粘贴临时存放区
var copyDatas = {
    data: null,
    //代表复制类型
    copyType: 0,
    //结局布局解析 问题 只有第一次用布局类名
    doLayout: 0,
    doLayout1: 0,
};
//存放粘贴提示框输入的数据
var parCount = null;
