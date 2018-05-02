//修改容器
function modifyContainer(contData) {
    //设置最外层数据在属性中显示
    classAndData.clsobj.obj = contData.sty;
    clearAttributeParse();
    classParse.renderStyParse1(contData.sty);
    //展示渲染对象最外层css交互区数据
    eventManagement(contData);
    resetState();
    if(contData.sty.es){
        if(JSON.stringify(contData.sty.es) !== "{}"){
            for(var i in contData.sty.es){
                classAndData.eventObj.eventWay.push(i)
            }
        }
    }
    classAndData.clsobj.tag = "DIV";
    //将css树的数据置空
    treeData.cssTree.renderObj=null;
    treeData.cssTree.vNodeTree=null;
    treeData.treeShow = 0;
    //展示布局
    classAndData.layIsShow = true;
    // 如果容器有布局 就将容器的布局数据展示到布局模块
    if (contData.ilm !== undefined && classAndData.layoutIlm !== undefined) {
        classAndData.pageLayout = contData.ilm;
        classAndData.layoutIlm.t = contData.ilm.t;
        classAndData.layoutIlm.atr = contData.ilm.atr;
        classAndData.layoutTp = contData.ilm.t;
        //classAndData.saveLayData = contData
    } else {
        classAndData.pageLayout = {};
        classAndData.layoutIlm = {};
    }
    //清除基础数据中的数据
    classAndData.b_data.comValue = {};
    //展示操作区
    classAndData.rtShow = 0;
    //展示操作区属性区展现
    classAndData.playShow = 0;
    classAndData.eventObj.target.length = 0;
}

//修改组件
function modifyComponent(comData, comRender, comVnode) {
    //将组件最外层css展示到属性模块中
    classAndData.clsobj.obj = comRender.sty;
    clearAttributeParse();
    classParse.renderStyParse1(comRender.sty);
    //展示渲染对象最外层css交互区数据
    eventManagement(comRender);
    resetState();
    if(comRender.sty.es){
        if(JSON.stringify(comRender.sty.es) !== "{}"){
            for(var i in comRender.sty.es){
                classAndData.eventObj.eventWay.push(i)
            }
        }
    }
    classAndData.b_data.comValue = comData;
    // Vue.set(classAndData.b_data, "comValue", comData);
    classAndData.b_data.comValue1 = JSON.stringify(comData, null, 4);
    //将组件的css树展示出来
    treeData.cssTree.renderObj=comRender;
    treeData.cssTree.vNodeTree=comVnode;
    // setCurElementStyle(target);
    treeData.treeShow = 1;
    //隐藏布局标签
    classAndData.layIsShow=false;
    //展示操作区
    classAndData.rtShow = 0;
    //展示操作区属性区展现
    classAndData.playShow = 0;
    classAndData.eventObj.target.length = 0;
}



