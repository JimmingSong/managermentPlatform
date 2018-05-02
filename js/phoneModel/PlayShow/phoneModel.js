// cssTreeDomBind(getCssData(),getData());
/**
 * 阻止浏览器右键事件
 * @param a
 */
function prevent(a) {
    a.oncontextmenu = function () {
        return false;
    };
}

/**
 * 属性样式修改
 * @param domData
 * @returns {{}}
 */
var classParse = new attributeParse();

function domDataParsing(domData) {
    if(complete === undefined){
        var complete = {};
    }
    if("r" in domData){
        if(!complete.hasOwnProperty(domData.r)){
            complete[domData.r] = [];
        }
        complete[domData.r].push(domData.es)
    }
    for(var i = 0;i < domData.values.length; i++){
        var para = domData.values[i];
        if("r" in para){
            if(!complete.hasOwnProperty(para.r)){
                complete[para.r] = [];
            }
            complete[para.r].push(para.es);
            for(var k = 0;k < para.values.length;k++){
                var comp = para.values[k];
                if("r" in comp){
                    if(!complete.hasOwnProperty(comp.r)){
                        complete[comp.r] = [];
                    }
                    complete[comp.r].push(comp);
                }
            }
        }
    }
    return complete;
}

/**
 * 生成渲染对象的ID
 * @param renderObj
 * @returns {*}
 */
function addRenderObjInRS(renderObj) {
    var lastId = Object.keys(phoneShow.rs)[Object.keys(phoneShow.rs).length - 1];
    var id;
    if (lastId !== undefined) {
        let idNum = parseInt(lastId.slice(1)) + 1;
        id = "d" + idNum;
    } else {
        id = "d" + 1
    }
    Vue.set(phoneShow.rs, id, renderObj);
    return id;
}
function cssTreeCons(vNode){
    var node = {tag:"",children:[]};
    for(var i = 0;i<vNode.length;i++){
        if(vNode[i].children&&vNode[i].children.length>0){
            node = cssTreeChildren(vNode[i].children,node);
        }
        node.tag = vNode[i]?vNode[i].tag:"";
        return node
    }
}
function cssTreeChildren(vNodes,node){
    vNodes.forEach(function(e,index){
        node.children[index] = {tag:""};
        var n = node.children[index];
        n.tag=e.tag;
        if(e.children && e.children.length>0){
            n.children=[];
            cssTreeChildren(e.children,n);
        }
    });
    return node;
}

/**
 * 右键点击事件
 * @param e
 * @param conData
 * @param index
 * @param cur_pd
 * @param c_Node
 */
function componentsClick(e, conData, index, cur_pd, c_Node) {
    var phone = document.getElementById("phone");
    var phoneW = phone.offsetWidth;
    var phoneH= phone.offsetHeight;
    stopPropagation(e);
    prevent(e.target);
    //设置高亮,交互数据，清掉数据数据
    setCurElementStyle(e.target);
    if (treeData.treeTarEle !== null) {
        treeData.treeTarEle.style.backgroundColor = "";
    }
    if(e.button === 2) {
        var datas = [
            {name: "重选", icon: "", values: [{
                key: "click", value: function (event) {
                }
            }], children: []},
            {name:"剪切",icon:"",values:[{key:"click",value:function(event){cutCurParag(cur_pd,conData,index)}}], children:[]},
            {name:"克隆",icon:"",values:[{key:"click",value:function(event){copyCurParagToLast(cur_pd,conData,index)}}], children:[]},
            {
                name: "上移一层", icon: "", values: [{
                    key: "click", value: function (event) {
                        moveUpALayer(conData, cur_pd, index)
                    }
                }], children: []
            },
            {
                name: "下移一层", icon: "", values: [{
                    key: "click", value: function (event) {
                        moveDownALayer(conData, cur_pd, index)
                    }
                }], children: []
            },
            // {name:"置顶",icon:"",values:[{key:"click",value:function(event){}}], children:[]},
            // {name:"置地",icon:"",values:[{key:"click",value:function(event){}}], children:[]},
        ];
        if (conData.r) {
            var deletObj = {
                name: "删除", icon: "", values: [{
                    key: "click", value: function (event) {
                        deleteComData(cur_pd, conData, index)
                    }
                }], children: [
                    //{
                    //    name: "删除数据", icon: "", values: [{
                    //    key: "click", value: function () {
                    //        deleteComData(cur_pd, conData, index)
                    //    }
                    //}]
                    //},
                    //{
                    //    name: "删除数据及渲染对象", icon: "", values: [{
                    //        key: "click", value: function () {
                    //            deleteComDataAndRs(cur_pd, conData, index)
                    //        }
                    //    }]
                    //}
                ]
            };
            var copyComObj = {
                name: "复制", icon: "", values: [{
                    key: "click", value: function (event) {
                    }
                }], children: [
                    {
                        name: "深复制", icon: "", values: [{
                        key: "click", value: function (event) {
                            deepCopyCom(conData, index)
                        }
                    }], children: []
                    },
                    {
                        name: "浅复制", icon: "", values: [{
                        key: "click", value: function (event) {
                            shallowCopyCom(conData, index)
                        }
                    }], children: []
                    }
                ]
            };
            var pasteComObj = {
                name: "粘贴", icon: "", values: [{
                    key: "click", value: function (event) {
                    }
                }], children: [
                    {
                        name: "粘贴样式", icon: "", values: [{
                        key: "click", value: function (event) {
                            pasteComRs(conData, cur_pd)
                        }
                    }], children: []
                    },
                    {
                        name: "替换", icon: "", values: [{
                        key: "click", value: function (event) {
                            replaceCom(conData, cur_pd)
                        }
                    }], children: []
                    },
                ]
            };
            datas.splice(1, 0, copyComObj);
            datas.push(pasteComObj);
            datas.push({
                name: "渲染规则", icon: "", values: [{
                    key: "click", value: function (event) {
                        disEditRen(conData, index, cur_pd)
                    }
                }], children: []
            });
            datas.push({
                name: "约束规则", icon: "", values: [{
                    key: "click", value: function (event) {
                        conRuleManager(conData)
                    }
                }], children: []
            });
            datas.splice(1, 0, deletObj)
        } else {
            var deleteObj = {
                name: "删除", icon: "", values: [{
                    key: "click", value: function (event) {
                        deleteConData(cur_pd, conData, index)
                    }
                }], children: []
            };
            var copyConObj = {
                name: "复制", icon: "", values: [{
                    key: "click", value: function (event) {
                        deepCopyCon(conData)
                    }
                }], children: []
            };
            var pasteObj = {
                name: "粘贴", icon: "", values: [{
                    key: "click", value: function (event) {
                        pasteCurParagToLast(conData, index)
                    }
                }], children: []
            };
            datas.splice(2, 0, copyConObj);
            datas.splice(3, 0, pasteObj);
            datas.splice(4, 0, deleteObj);
        }
        var phoneShow = document.getElementById("data-middle");
        dialog.createDialog(phoneShow, datas, {
            x: phoneW * (1 / 2) + phone.offsetLeft - 50,
            y: phoneH * (1 / 2) + phone.offsetTop - 50
        }, index);
        window.onclick=function(){
            $("#menu_1").remove();
        }
    }else {
        clearAttributeParse();
        var obj = {};
        let ren;
        if (conData.id) {
            if (classAndData.eventObj.isSelRender) {
                obj.tg = conData.id;
                //拿到组件的虚拟DOM 给到css树
                classAndData.eventObj.x_Node = c_Node;
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                if (!ren.es || JSON.stringify(ren.es) === "{}") {
                    ren.es = {};
                    ren.es[classAndData.eventObj.curWay] = [];
                }
                ren.es[classAndData.eventObj.curWay].push(obj);
                classAndData.eventObj.target.push(conData.id);
                classAndData.eventObj.isSelRender = false;
                document.getElementById("show-screen").children[1].style.cursor = "default"
            } else {
                //将组件数据展示到数据模块中
                classAndData.b_data.comV = null;
                classAndData.b_data.comV = conData;
                modifyComponent(conData.d, conData.r, c_Node);
            }
        }else{
            if (classAndData.eventObj.isSelRender) {
                obj.tg = index;
                // classAndData.eventObj.x_Node = c_Node;
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                if (!ren.es || ren.es instanceof Object) {
                    ren.es = {};
                    ren.es[classAndData.eventObj.curWay] = [];
                }
                ren.es[classAndData.eventObj.curWay].push(obj);
                classAndData.eventObj.target.push("容器(" + index + ")");
                classAndData.eventObj.containerObj[index] = conData;
                // classAndData.eventObj.selRenderObj = conData.sty;
                console.log(classAndData.eventObj.containerObj);
                classAndData.eventObj.isSelRender = false;
                document.getElementById("show-screen").children[1].style.cursor = "default"
            } else {
                modifyContainer(conData);
            }
        }
    }
}

/**
 * 约束规则管理
 * @param conData
 */
function conRuleManager(conData) {
    classAndData.con_rul.con_obj = phoneShow.ds.con;
    classAndData.con_rul.componentData = conData;
    classAndData.rtShow = 3;
}

/**
 * 删除组件数据
 * @param cur_pd
 * @param conData
 * @param index
 */
function deleteComData(cur_pd, conData, index) {
    console.log(phoneShow.rs[conData.id]);
    //获取组件的渲染ID
    let renderObj = phoneShow.rs[conData.id];
    //声明处理ds数据的对象函数
    var dsDealObj = new dsDeal(phoneShow.ds);
    // phoneShow.ds.values[addrArr[0]].values.splice(addrArr[1], 1);
    //删除组件数据
    dsDealObj.deletecData(conData.d || conData);
    cur_pd.index.di.splice(cur_pd.index.di.indexOf(conData.d), 1);
    cur_pd.index.ri[conData.d.tp].d.forEach(function (item, index) {
        if (phoneShow.rs[item] === conData.r) {
            cur_pd.index.ri[conData.d.tp].d.splice(index, 1)
        }
    });
    let classSta = false;
    for (let item of renderObj.__ob__.dep.subs) {
        if (item.vm.$el === document.getElementById("data-class")) {
            classSta = true
        }
    }
    if (classSta) {
        if (renderObj.__ob__.dep.subs.length <= 4) {
            delete phoneShow.rs[conData.id]
        }
    } else {
        if (renderObj.__ob__.dep.subs.length <= 2) {
            delete phoneShow.rs[conData.id]
        }
    }
    treeData.cssTree.renderObj = null;
    treeData.cssTree.vNodeTree = null;
}

/**
 *删除组件及渲染区的渲染对象数据
 * @param cur_pd
 * @param conData
 * @param index
 */
function deleteComDataAndRs(cur_pd, conData, index) {
    $.layer.confirm("强制删除此渲染对象可能会影响其他组件,确定删除吗?", function () {
        var dsDealObj = new dsDeal(phoneShow.ds);
        // phoneShow.ds.values[addrArr[0]].values.splice(addrArr[1], 1);
        dsDealObj.deletecData(conData.d);
        cur_pd.index.di.splice(cur_pd.index.di.indexOf(conData.d), 1);
        treeData.cssTree.renderObj = null;
        treeData.cssTree.vNodeTree = null;
        cur_pd.index.ri[conData.d.tp].d.forEach(function (item, index) {
            if (phoneShow.rs[item] === conData.r) {
                cur_pd.index.ri[conData.d.tp].d.splice(index, 1)
            }
        });
        delete phoneShow.rs[conData.id]
    })
}

/**
 * 删除容器事件
 * @param cur_pd
 * @param conData
 * @param index
 */
function deleteConData(cur_pd, conData, index) {
    if (index === 0) {
        $.layer.alert("最后一个容器不允许删除")
    } else {
        let indexArr;
        let c_index;
        let extendC_index;
        let e_index;
        if (index.toString().indexOf(",") === -1) {
            cur_pd.chr.splice(index, 1)
        } else {
            console.log(phoneShow.ds);
            indexArr = index.split(",");
            extendC_index = indexArr.slice(0);
            e_index = extendC_index[extendC_index.length - 1];
            c_index = indexArr[indexArr.length - 1];
            //删除当前容器中的所有组件数据
            deleteConRecursive(conData);
            cur_pd.chr.splice(e_index, 1)
        }
        if (phoneShow.ds.values && phoneShow.ds.values.length > 0) {
            //删除容器后，将此容器后的，所有容器的组件数据的l字段都往前挪一位
            phoneShow.ds.values[0].values.forEach(function (item) {
                let dataDeal = new dsDeal(phoneShow.ds);
                let comL = item.l.split(",");
                let pre = [], next = [];
                pre = extendC_index.slice(0, -1);
                next = comL.slice(0, extendC_index.length - 1);
                if (pre.join(",") === next.join(",") && parseInt(comL[extendC_index.length - 1]) > parseInt(e_index) - 1) {
                    console.log(phoneShow.ds);
                    let nowLLast = parseInt(comL[extendC_index.length - 1]) - 1;
                    comL.splice(extendC_index.length - 1, 1, nowLLast);
                    item.l = comL.join(",");
                }
            });
        }
    }
}

/**
 * 克隆事件
 * @param cur_pd
 * @param conData
 * @param index
 */
function copyCurParagToLast(cur_pd,conData,index){
    copyDatas = copyData(conData);
    // var index=index.split(",")[1];
    if (conData.hasOwnProperty("r")) {
        cur_pd.index.di.push(copyDatas.d);
    }else{
        cur_pd.chr.push(copyDatas);
    }

}

/**
 * 剪切事件
 * @param cur_pd
 * @param conData
 * @param index
 */
function cutCurParag(cur_pd,conData,index){
    copyDatas.data = extendDeep(conData);
    copyDatas.copyType = 0;
    var dsDealObj = new dsDeal(phoneShow.ds);
    //判断是容器还是组件
    if (conData.d) {
        // phoneShow.ds.values[addrArr[0]].values.splice(addrArr[1], 1);
        dsDealObj.deletecData(conData.d);
        cur_pd.index.di.splice(cur_pd.index.di.indexOf(conData.d), 1);
        treeData.cssTree.renderObj = null;
        treeData.cssTree.vNodeTree = null;
        cur_pd.index.ri[conData.d.tp].d.forEach(function (item, index) {
            if (phoneShow.rs[item] === conData.r) {
                cur_pd.index.ri[conData.d.tp].d.splice(index, 1)
            }
        });
        delete phoneShow.rs[conData.id]
    }else{
        // copyDatas.copyType = 2;
        //存储容器中对应组件的渲染ID
        saveRsData(conData);
        deleteConData(cur_pd, conData, index);
    }
    console.log(copyDatas.data)
}

/**
 * 组件 深复制事件
 * @param data
 * @param index
 */
function deepCopyCom(data, index) {
    copyDatas.data = data;
    copyDatas.copyType = 0;
}

/**
 * 浅复制事件
 * @param data
 * @param index
 */
function shallowCopyCom(data, index) {
    copyDatas.data = data;
    copyDatas.copyType = 1;
    // phoneData.insertParPopIsShow = true;
}

/**
 * 复制容器数据
 * @param data
 */
function deepCopyCon(data) {
    copyDatas.data = data;
    saveRsData(data);
    idList.copyPara = data;
    copyDatas.copyType = 0;
}

/**
 * 将剪切的容器中的渲染对象 存起来 准备粘贴的时候用
 * @param conData
 */
function saveRsData(conData) {
    for (var i in conData.index.ri) {
        if (conData.index.ri[i].d) {
            conData.index.ri[i].d.forEach(function (item) {
                idList.oldRs[item] = extendDeep(phoneShow.rs[item])
            })
        }
    }
    if(conData.chr && conData.chr.length > 0){
        for (var j = 0; j < conData.chr.length; j++) {
            saveRsData(conData.chr[j])
        }
    }
}

/**
 * 容器粘贴事件
 * @param conData 容器数据
 * @param index 容器位置
 */
//var writeUnit1 = 0;
function pasteCurParagToLast(conData,index){
    if (!phoneShow.ds.values || phoneShow.ds.values.length === 0) {
        phoneData.addToParag.parLength = "0"
    } else {
        phoneData.addToParag.parLength = phoneShow.ds.values.length;
        phoneData.addToParag.usePar = phoneShow.ds.values.length;
    }
    var newData = copyData(copyDatas.data);
    switch (copyDatas.copyType) {
        //深复制
        case 0: {
            if (newData) {
                if (!newData.r) {
                    //复制渲染对象并重新设id加入池子中
                    // copyContainerRender(newData);
                    //修改容器数据中的l值
                    var datas = dealContainerDi(newData, index + "," + conData.chr.length);
                    //跨页面粘贴
                    //if (idList.oldPageId !== "" && idList.oldPageId !== idList.curPageId) {
                        //writeUnit1 = 0;
                        //存储上个页面复制的容器的组件用到的渲染对象
                        recursivePaste(conData, newData, index, conData.chr.length);
                        conData.chr.push(newData);
                    //} else {
                    //    recursivePaste(conData, newData, index, conData.chr.length);
                    //    conData.chr.push(newData);
                    //}
                } else {
                    var id = addRenderObjInRS(newData.r);
                    if (conData.index.ri[newData.d.tp]) {
                        if (conData.index.ri[newData.d.tp].d) {
                            conData.index.ri[newData.d.tp].d.push(id);
                        } else {
                            Vue.set(conData.index.ri[newData.d.tp], "d", [id]);
                        }
                    } else {
                        Vue.set(conData.index.ri, newData.d.tp, {});
                        Vue.set(conData.index.ri[newData.d.tp], "d", [id]);
                    }
                    newData.d.l = index;
                    conData.index.di.push(newData.d);
                    phoneShow.ds.values[0].values.push(newData.d)
                }
            }
            break;
        }
        case 1: {
            if (!newData.r) {
                //修改数据中的l值
                var datas = dealContainerDi(newData, index + "," + conData.chr.length);
                conData.chr.push(newData);
                //弹出提示框问数据加到哪个段中
                //  0-phoneShow.ds.values.length-1;
                phoneData.addToParag.callback = function (paragindex) {
                    phoneShow.ds.values[paragindex].values = phoneShow.ds.values[paragindex].values.concat(datas);
                };
                phoneData.addToParag.isShow = true;
            } else {
                if (conData.index) {
                    conData.index.ri[newData.d.tp].d.push(newData.id);
                    conData.index.di.push(newData.d);
                    //弹出提示框问数据加到哪个段中
                    phoneData.addToParag.callback = function (paragindex) {
                        phoneShow.ds.values[paragindex].values.push(newData.d);
                    }
                }
                newData.d.l = index;
                //弹出提示框问数据加到哪个段中
                phoneData.addToParag.isShow = true;
            }
            break;
        }
        case 2:{
            if (newData) {
                if (!newData.r) {
                    //复制渲染对象并重新设id加入池子中
                    // copyContainerRender(newData);
                    //修改容器数据中的l值
                    // var datas = dealContainerDi(newData, index + "," + conData.chr.length);
                    recursivePaste(conData, newData, index);
                    //存储上个页面复制的容器的组件用到的渲染对象
                    conData.chr.push(newData);
                    // dataTreeParse.parseTDI(phoneShow.ds);
                    console.log(phoneShow)
                }
            }
            break;
        }

    }
}

/**
 * 跨页面粘贴
 * @param conData
 * @param newData
 * @param index
 */

//function recursivePaste1(conData, newData, index, i) {
//    var dsDealObj = new dsDeal(phoneShow.ds);
//    var len;
//    if (writeUnit1 !== 0) {
//        len = index + "," + i
//    } else {
//        len = index + "," + (conData.chr.length - 1);
//        writeUnit1++
//    }
//    if (newData.index.di && newData.index.di.length > 0) {
//        var datas = dealContainerDi(newData, len);
//        datas.forEach(function (item) {
//            if(!phoneShow.ds.values){
//                Vue.set(phoneShow.ds,"values",[]);
//                var obj = {};
//                Vue.set(phoneShow.ds.values,phoneShow.ds.values.length,{});
//                Vue.set(phoneShow.ds.values[0],"values",[])
//            }else {
//                if(phoneShow.ds.values.length <= 0){
//                    var obj = {};
//                    Vue.set(phoneShow.ds.values,phoneShow.ds.values.length,{});
//                    Vue.set(phoneShow.ds.values[0],"values",[])
//                }
//            }
//            var len = phoneShow.ds.values[0].values.length;
//            dsDealObj.addcData(item, phoneShow.ds.values[0], len)
//        });
//        newData.index.di = datas;
//        for (var n in newData.index.ri) {
//            var curCon = newData.index.ri[n];
//            curCon.d.forEach(function (item, index) {
//                var newRsId = addRenderObjInRS(idList.oldRs[item]);
//                curCon.d.splice(index,1,newRsId)
//            });
//            if (curCon.rls && curCon.rls.length > 0) {
//                curCon.rls.forEach(function (item) {
//                    delete item.count;
//                })
//            }
//        }
//    }
//    if (newData.chr && newData.chr.length > 0) {
//        for (var i = 0; i < newData.chr.length; i++) {
//            // var deepD = copyData(newData.chr[i]);
//            recursivePaste1(newData, newData.chr[i], len, i);
//        }
//    }
//}

/**
 * 复制容器时,修改容器中组件的索引和渲染对象ID
 * @param conData 将要放的容器
 * @param newData 复制的容器数据
 * @param index 将要放的容器的索引
 */
var writeUnit = 0;
function recursivePaste(conData, newData, index, i) {
    var dsDealObj = new dsDeal(phoneShow.ds);
    var len;
    //if(writeUnit > 0 && conData.chr.length > 0){
    //len = index + "," + conData.chr.length
    //}else{
    len = index + "," + i;
    //}
    if (newData.index.di && newData.index.di.length > 0) {
        var datas = dealContainerDi(newData, len);
        datas.forEach(function (item) {
            if (!phoneShow.ds.values) {
                Vue.set(phoneShow.ds, "values", [])
            }
            if (!phoneShow.ds.values[0]) {
                Vue.set(phoneShow.ds.values, phoneShow.ds.values.length, {})
            }
            if (!phoneShow.ds.values) {
                Vue.set(phoneShow.ds, "values", []);
                Vue.set(phoneShow.ds.values, 0, {});
                Vue.set(phoneShow.ds.values[0], "values", []);
            } else if (!phoneShow.ds.values[0]) {
                Vue.set(phoneShow.ds.values, 0, []);
                Vue.set(phoneShow.ds.values[0], 'values', [])
            } else if (!phoneShow.ds.values[0].values) {
                Vue.set(phoneShow.ds.values[0], 'values', [])
            }
            var len = phoneShow.ds.values[0].values.length;
            dsDealObj.addcData(item, phoneShow.ds.values[0], len)
        });
        newData.index.di = datas;
        for (var n in newData.index.ri) {
            var curCon = newData.index.ri[n];
            curCon.d.map(function (item, index) {
                var newRsId = addRenderObjInRS(extendDeep(idList.oldRs[item]));
                curCon.d.splice(index,1,newRsId)
            });
            if (curCon.rls) {
                curCon.rls.forEach(function (item) {
                    delete item.count;
                })
            }
        }
    }
    //writeUnit++;
    if (newData.chr && newData.chr.length > 0) {
        for (var j = 0; j < newData.chr.length; j++) {
            //var deepD = copyData(newData.chr[j]);
            recursivePaste(newData, newData.chr[j], len, j);
        }
    }
}

/**
 * 删除容器中删除ds数据的递归函数
 * @param conData
 */
function deleteConRecursive(conData) {
    var dsDealObj = new dsDeal(phoneShow.ds);
    conData.index.di.forEach(function (item) {
        dsDealObj.deletecData(item);
    });
    for (var i in conData.index.ri) {
        var rsTp = conData.index.ri[i];
        rsTp.d.forEach(function (item) {
            delete phoneShow.rs[item]
        })
    }
    conData.index.di.length = 0;
    if (conData.chr && conData.chr.length > 0) {
        conData.chr.forEach(function (item) {
            deleteConRecursive(item)
        })
    }
}
/**
 * 粘贴样式
 * @param comData
 * @param cur_pd
 */
function pasteComRs(comData, cur_pd) {
    var newData = comData.d;
    if (copyDatas.data.d.tp === comData.d.tp) {
        comData.r = copyDatas.data.r;
        var li = cur_pd.index.ri[comData.d.tp].d.indexOf(comData.id);
        cur_pd.index.ri[comData.d.tp].d.splice(li, 1, copyDatas.data.id);
        phoneShow.rs[comData.id] = comData.r;
        console.log(cur_pd);
    } else {
        $.layer.alert("不是同一个类型的数据不能粘贴")
    }
}

/**
 * 替换组件
 * @param comData
 * @param cur_pd
 * @param index
 */
function replaceCom(comData, cur_pd, index) {
    var newData = comData.d;
    if (copyDatas.data.d.tp === comData.d.tp) {
        comData.r = copyDatas.data.r;
        var li = cur_pd.index.ri[comData.d.tp].d.indexOf(comData.id);
        var comLi = cur_pd.index.di.indexOf(comData.d);
        copyDatas.data.d.l = index;
        cur_pd.index.di.splice(comLi, 1, copyDatas.data.d);
        cur_pd.index.ri[comData.d.tp].d.splice(li, 1, copyDatas.data.id);
        phoneShow.rs[comData.id] = comData.r;
        console.log(comLi);
    } else {
        $.layer.alert("不是同一个类型的数据不能替换")
    }
}

/**
 * 复制容器中已有的渲染对象
 * @param conData
 */
function copyContainerRender(conData) {
    for (var tp in conData.index.ri) {
        var data = conData.index.ri[tp];
        data.d.forEach(function (item, index) {
            var old_id = item;
            var renderObj = phoneShow.rs[old_id];
            var newObj = copyData(renderObj);
            var new_id = addRenderObjInRS(newObj);
            data.d[index] = new_id;
        })
    }
}

/**
 * 处理容器中的di中组件的l
 * @param conData 当前容器数据
 * @param l  位置
 * @returns {*}
 */
function dealContainerDi(conData, l) {
    conData.index.di.forEach(function (item) {
        item.l = l;
    });
    return conData.index.di;
}

/**
 * 右键菜单-编辑规则 处理函数
 * 将dom对应容器的 渲染数据等拼接到 classAndData.pageRenData 用于在 cssClassVue 中展示
 * @param conData 组件数据
 * @param index 当前组件在容器中的索引
 * @param cur_pd 组件所在容器的数据
 */
function disEditRen(conData, index, cur_pd) {
    if (conData.r) {
        var data = conData.d;
        classAndData.rtShow = 2;
        var renData = classAndData.pageRenData;
        // 在模拟测试时 传入的 rls 中四个数据 前两个正常 后两个为 __ob__: Observer
        renData.rls = cur_pd.index.ri[data.tp].rls
        renData.data = data
        // 根据当前使用的 渲染规则.tp 给展示数据设置值
        var currRenObj = renData.rls;
        var tempData = renData.tempData;
        renData.isShowEdit = false
        conversionRenRuleFromDateToTemp(currRenObj, renData.data.rl, tempData);
    }
}

/**
 * 渲染规则管理 编辑状态 选择 or 修改
 * @param e event对象
 */
function stateRenRule(e) {
    classAndData.pageRenData.choiceOrUpdate = !classAndData.pageRenData.choiceOrUpdate;
    // classAndData.pageRenData.isModify = !classAndData.pageRenData.isModify;
    /*
    if (classAndData.pageRenData.choiceOrUpdate) {
        e.target.innerHTML = "&#xe617;";
    } else {
        e.target.innerHTML = "&#xe66a;";
        // classAndData.pageRenData.isShowEdit = false;
    }*/
}

/**
 * 添加规则 按钮绑定的函数
 */
function addRenRule() {
    var pageRenData = classAndData.pageRenData;
    var index = pageRenData.rls.length;
    Vue.set(pageRenData.rls, index, {tp: "order1"});
    conversionRenRuleFromDateToTemp(pageRenData.rls, index, pageRenData.tempData);
    pageRenData.isShowEdit = true;
    pageRenData.choiceOrUpdate = true
}

/**
 * 规则展示列表 各个规则项 span click事件绑定函数 用于展示点击规则的详情
 * @param e
 * @param index 当前点击的 规则 在规则数组中的索引
 */
function editRenRule(e, index) {
    var tar = e.target;
    if (tar.nodeName === "SPAN") {
        tar = tar.parentNode;
    }
    $(tar).addClass("ruler-show");
    $(tar).siblings().removeClass("ruler-show");

    if(classAndData.pageRenData.choiceOrUpdate) {
        var renData = classAndData.pageRenData;
        conversionRenRuleFromDateToTemp(renData.rls, index, renData.tempData);
        renData.isShowEdit = true;
    }
}

/**
 * 编辑规则框 保存按钮绑定处理函数
*/
function saveRenRule() {
    var renData = classAndData.pageRenData.rls[classAndData.pageRenData.tempData.index]
    var tempData = classAndData.pageRenData.tempData
    renData.tp = tempData.tp
    if (tempData.tp === "order1" || tempData.tp === "order2") {
        renData.isLoop = tempData.isLoop
        renData.isReciprocate = tempData.isReciprocate
        if (typeof tempData.scopeArr === "string") {
            // console.log('按照string解析 成Array')
            var arr = tempData.scopeArr.split(",")
            if (arr[0] === "") {
                arr = []
            } else {
                for (var i = 0; i < arr.length; i++) {
                    if (!isNaN(arr[i])) {
                        arr[i] = Number.parseInt(arr[i])
                    } else {
                        arr.splice(i,1)
                        i--
                    }
                }
            }
            Vue.set(renData, 'scope', arr)
        }
        if (renData.scope.length === 0) {
            // console.log('处理对象')
            if (Number.parseInt(tempData.scopeStart) > -1 && Number.parseInt(tempData.scopeEnd) > -1) {
                Vue.set(renData, "scope", {
                    scopeStart: Number.parseInt(tempData.scopeStart),
                    scopeEnd: Number.parseInt(tempData.scopeEnd)
                })
            } else {
                Vue.set(renData, 'scope', "")
            }
        }
        // console.log('顺序规则处理完毕', renData)
    } else if (tempData.tp === "switchChoice") {
        // 处理 switch条件规则
        renData.other = tempData.other
        var objArr = []
        var valueArr = tempData.valueString.split(" ")
        var indexArr = tempData.indexString.split(" ")
        for(var i=0, l=valueArr.length; i<l; i++) {
            if (valueArr[i] && indexArr[i]) {
                objArr.push({
                    value: valueArr[i],
                    index: indexArr[i]
                })
            }
        }
        Vue.set(renData, "resultMap", objArr)
        // console.log('switch规则处理完毕', renData)
    } else {
        renData.other = tempData.other
        renData.resultTrue = tempData.resultTrue
        renData.resultFalse = tempData.resultFalse
        // console.log('if规则处理完毕', renData)
    }
    classAndData.pageRenData.isShowEdit = false
}

/**
 * 删除按钮处理函数
 * @param index 当前元素索引
 */
function deleteRenRule(index) {
    var renData = classAndData.pageRenData;
    renData.rls.splice(index, 1);
    // renData.isShowEdit = false
}

/**
 * 编辑规则框 取消按钮绑定函数
 */
function cancelRenRule() {
    // 清除背景色
    $(".renrule").children().removeClass("ruler-show")
    classAndData.pageRenData.isShowEdit = false
}

/**
 * 将 渲染规则对象 解析到 pageRenData.tempData 需要将数据展示到页面时使用
 * @param dataArr 渲染规则对象数组
 * @param index 当前元素在其容器中的索引
 * @param temp
 */
function conversionRenRuleFromDateToTemp(dataArr, index, temp) {
    resetRenTemp();
    if(index > dataArr.length) {
        index = 0
    }
    var data = dataArr[index];
    temp.index = index;
    temp.tp = data.tp;
    // console.log(dataArr)
    if (temp.tp === "order1" || temp.tp === "order2") {
        temp.isLoop = data.isLoop;
        temp.isReciprocate = data.isReciprocate;
        if (Array.isArray(data.scope)) {
            temp.scopeArr = data.scope.toString();
            temp.scopeStart = "";
            temp.scopeEnd = ""
            // console.log('array')
        } else if (data.scope instanceof Object) {
            temp.scopeArr = "";
            temp.scopeStart = data.scope.start;
            temp.scopeEnd = data.scope.end
            // console.log('object', temp, data)
        } else {
            // console.log('无效值')
        }
    } else if (temp.tp === "ifChoice") {
        temp.other = data.other;
        temp.resultTrue = data.resultTrue;
        temp.resultFalse = data.resultFalse
    } else {
        temp.other = data.other;
        if(data.resultMap.length > 0) {
            temp.valueString += data.resultMap[0].value;
            temp.indexString += data.resultMap[0].index
        }
        for(var i=1, l=data.resultMap.length; i<l; i++) {
            temp.valueString += " " + data.resultMap[i].value;
            temp.indexString += " " + data.resultMap[i].index
        }
    }
}

/**
 * 重置 classAndData.pageRenData.tempData
 */
function resetRenTemp() {
    var tempData = classAndData.pageRenData.tempData;
    tempData.index = 0;
    tempData.tp = "order1";
    tempData.scope = "";
    tempData.scopeArr = "0,1";
    tempData.scopeStart = "";
    tempData.scopeEnd = "";
    tempData.isLoop = 1;
    tempData.isReciprocate = 0;
    tempData.other = "";
    tempData.resultTrue = 0;
    tempData.resultFalse = 0;
    tempData.resultMap = [];
    tempData.indexString = "";
    tempData.valueString = ""
}


/**
 * 移动 拉伸 相关
 * @param e {Object} event对象
 * @param cur_data {Object} 当前容器对应的数据 修改 cur_data.cls 来改变数据中的 class 字符串
 */
function moveAndStretch(e, cur_data) {
    e.stopPropagation();
    e.preventDefault();
    var tar = e.target;
    tar.onmousemove = function(event){
        getPoint(event,tar,10);
        cacheMoveDom = tar
    };
    tar.onmousedown = function (e) {
        e.preventDefault();
        var curBox = e.target;
        // 获取指针图标类型
        var curStyle = tar.cursor;
        // 初始时 指针 坐标 相对浏览器窗口
        var pointerLeftStart = event.clientX;
        var pointerTopStart = event.clientY;
        // 初始时 移动目标 margin-left margin-top
        var curMarginLeftStart = Number.parseInt( window.getComputedStyle(curBox,null).getPropertyValue("margin-left") );
        var curMarginTopStart = Number.parseInt( window.getComputedStyle(curBox,null).getPropertyValue("margin-top") );
        // 初始时 移动目标 width height
        var curHeightStart = tar.clientHeight;
        var curWidthStart = tar.clientWidth;
        // 父级 width height
        var parentWidth = tar.parentNode.offsetWidth;
        var parentHeight = tar.parentNode.offsetHeight;

        var oldStr = cur_data.cls;
        /**
         * 回设数据给当前数据
         * @param newStr 新class字符串
         */
        function updateClassStr (newStr) {
            cur_data.cls = newStr;
            classParse.renderStyParse(cur_data);
        }
        switch (curStyle){
            case "nw-resize":
                // 左上角
                tar.parentNode.onmousemove = function (event) {
                    event.stopPropagation()
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart - moveVectorY > 10 ? curHeightStart - moveVectorY : 10
                    var currentWidth = curWidthStart - moveVectorX > 10 ? curWidthStart - moveVectorX : 10
                    tar.style.height = currentHeight + 'px'
                    tar.style.width = currentWidth + 'px'
                    tar.style.marginTop = curMarginTopStart + moveVectorY + 'px'
                    tar.style.marginLeft = curMarginLeftStart + moveVectorX + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    event.target.style.cursor = null
                    tar.parentNode.onmousemove = null
                    tar.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmouseup = null
                    event.target.onmouseup = null
                    event.target.onmousemove = null
                    cacheMoveDom.onmouseup = null
                    removeMouse(event.target)
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentWidth = curWidthStart - moveVectorX > 10 ? curWidthStart - moveVectorX : 10
                    var currentHeight = curHeightStart - moveVectorY > 10 ? curHeightStart - moveVectorY : 10
                    var currentMarginTop = curMarginTopStart + moveVectorY
                    var currentMarginLeft = curMarginLeftStart + moveVectorX
                    var str1 = computeFinalWidth(currentWidth, parentWidth, oldStr)
                    var str2 = computeFinalHeight(currentHeight, parentHeight, str1)
                    var str3 = computeFinalMarginLeft(currentMarginLeft, parentWidth, str2)
                    var str4 = computeFinalMarginTop(currentMarginTop, parentWidth, str3)
                    updateClassStr(str4);
                    // console.log('左上拉伸结束', str4)
                }
                break;
            case "se-resize":
                // 右下角
                tar.parentNode.onmousemove = function (event) {
                    event.stopPropagation()
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart + moveVectorY > 10 ? curHeightStart + moveVectorY : 10
                    var currentWidth = curWidthStart + moveVectorX > 10 ? curWidthStart + moveVectorX : 10
                    tar.style.height = currentHeight + 'px'
                    tar.style.width = currentWidth + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    tar.parentNode.onmousemove = null
                    tar.onmousemove = null
                    tar.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmouseup = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmouseup = null
                    event.target.style.cursor = null
                    removeMouse(event.target)
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart + moveVectorY > 10 ? curHeightStart + moveVectorY : 10
                    var currentWidth = curWidthStart + moveVectorX > 10 ? curWidthStart + moveVectorX : 10
                    var str1 = computeFinalWidth(currentWidth, parentWidth, oldStr)
                    var str2 = computeFinalHeight(currentHeight, parentHeight, str1)
                    updateClassStr(str2);
                    // console.log('右下角拉伸结束', str2)
                }
                break;
            case "sw-resize":
                // 左下角
                tar.parentNode.onmousemove = function (event) {
                    event.stopPropagation()
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart + moveVectorY > 10 ? curHeightStart + moveVectorY : 10
                    var currentWidth = curWidthStart - moveVectorX > 10 ? curWidthStart - moveVectorX : 10
                    tar.style.height = currentHeight + 'px'
                    tar.style.marginLeft = curMarginLeftStart + moveVectorX + 'px'
                    tar.style.width = currentWidth + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    tar.parentNode.onmousemove = null
                    tar.parentNode.onmouseup = null
                    event.target.onmousemove  = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmousemove = null
                    cacheMoveDom.onmouseup = null
                    tar.onmousemove = null
                    tar.onmouseup = null
                    event.target.style.cursor = null
                    removeMouse(event.target)
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart + moveVectorY > 10 ? curHeightStart + moveVectorY : 10
                    var currentMarginLeft = curMarginLeftStart + moveVectorX
                    var currentWidth = curWidthStart - moveVectorX > 10 ? curWidthStart - moveVectorX : 10
                    var str1 = computeFinalWidth(currentWidth, parentWidth, oldStr)
                    var str2 = computeFinalHeight(currentHeight, parentHeight, str1)
                    var str3 = computeFinalMarginLeft(currentMarginLeft, parentWidth, str2)
                    updateClassStr(str3)
                    // console.log('左下角拉伸结束', str3)
                }
                break;
            case "ne-resize":
                // 右上角
                tar.parentNode.onmousemove = function (event) {
                    event.stopPropagation()
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart - moveVectorY > 10 ? curHeightStart - moveVectorY : 10
                    var currentWidth = curWidthStart + moveVectorX > 10 ? curWidthStart + moveVectorX : 10
                    tar.style.marginTop = curMarginTopStart + moveVectorY + 'px'
                    tar.style.height = currentHeight + 'px'
                    tar.style.width = currentWidth + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    event.target.onmousemove = null
                    tar.parentNode.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    tar.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmouseup = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmouseup = null
                    event.target.style.cursor = null
                    removeMouse(event.target)
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart - moveVectorY > 10 ? curHeightStart - moveVectorY : 10
                    var currentMarginLeft = curMarginLeftStart + moveVectorX
                    var currentWidth = curWidthStart + moveVectorX > 10 ? curWidthStart + moveVectorX : 10
                    var str1 = computeFinalWidth(currentWidth, parentWidth, oldStr)
                    var str2 = computeFinalHeight(currentHeight, parentHeight, str1)
                    var str3 = computeFinalMarginLeft(currentMarginLeft, parentWidth, str2)
                    updateClassStr(str3)
                    // console.log('右上角拉伸结束', str3)
                }
                break;
            case "n-resize":
                tar.parentNode.onmousemove = function (event) {
                    // 上边框
                    event.stopPropagation()
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart - moveVectorY > 10 ? curHeightStart - moveVectorY : 10
                    tar.style.height = currentHeight + 'px'
                    tar.style.marginTop = curMarginTopStart + moveVectorY + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    // 上边框拉伸结束
                    event.stopPropagation()
                    tar.onmousemove = null
                    tar.parentNode.onmousemove = null
                    event.target.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmouseup = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmouseup = null
                    removeMouse(event.target)
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart - moveVectorY > 10 ? curHeightStart - moveVectorY : 10
                    var currentMarginTop = curMarginTopStart + moveVectorY
                    var str1 = computeFinalHeight(currentHeight, parentHeight, oldStr)
                    var str2 = computeFinalMarginTop(currentMarginTop, parentWidth, str1)
                    event.target.style.cursor = null
                    updateClassStr(str2)
                    // console.log('上边框拉伸结束', str2)
                }
                break;
            case "s-resize":
                // 下边框拉伸
                tar.parentNode.onmousemove = function (event) {
                    event.stopPropagation()
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart + moveVectorY > 10 ? curHeightStart + moveVectorY : 10
                    tar.style.height = currentHeight + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    tar.onmousemove = null
                    tar.parentNode.onmousemove = null
                    event.target.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmouseup = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmouseup = null
                    event.target.style.cursor = null
                    removeMouse(event.target)
                    var moveVectorY = event.clientY - pointerTopStart
                    var currentHeight = curHeightStart + moveVectorY > 10 ? curHeightStart + moveVectorY : 10
                    var str1 = computeFinalHeight(currentHeight, parentHeight, oldStr)
                    updateClassStr(str1)
                    // console.log('下边框拉伸结束', str1)
                }
                break;
            case "w-resize":
                tar.parentNode.onmousemove = function (event) {
                    // 左边框
                    event.stopPropagation()
                    // 指针移动向量
                    var moveVectorX = event.clientX - pointerLeftStart
                    // 当前宽度 单位 px
                    var currentWidth = curWidthStart - moveVectorX > 10 ? curWidthStart - moveVectorX : 10
                    // 直接修改dom属性
                    tar.style.width = currentWidth + 'px'
                    tar.style.marginLeft = curMarginLeftStart + moveVectorX + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    tar.parentNode.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmousemove = null
                    tar.onmouseup = null
                    event.target.onmousemove = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmousemove = null
                    cacheMoveDom.onmouseup = null
                    event.target.style.cursor = null
                    removeMouse(event.target)
                    var moveVectorX = event.clientX - pointerLeftStart
                    // 当前宽度 单位 px
                    var currentWidth = curWidthStart - moveVectorX > 10 ? curWidthStart - moveVectorX : 10
                    // 获取原始字符串
                    var str1 = computeFinalWidth(currentWidth, parentWidth, oldStr)
                    var currentMarginLeft = curMarginLeftStart + moveVectorX
                    var str2 = computeFinalMarginLeft(currentMarginLeft, parentWidth, str1)
                    updateClassStr(str2)
                }
                break;
            case "e-resize":
                tar.parentNode.onmousemove = function (event) {
                    // 右边框拉伸
                    event.stopPropagation()
                    var moveVectorX = event.clientX - pointerLeftStart
                    var currentWidth = curWidthStart +  moveVectorX > 10 ? curWidthStart +  moveVectorX : 10
                    tar.style.width = currentWidth + 'px'
                }
                tar.parentNode.onmouseup = function (event) {
                    tar.parentNode.onmousemove = null
                    tar.style.cursor = null
                    tar.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    tar.parentNode.onmouseup = null
                    tar.onmouseup = null
                    event.target.onmouseup = null
                    cacheMoveDom.onmouseup = null
                    event.stopPropagation()
                    removeMouse(event.target)
                    var moveVectorX = event.clientX - pointerLeftStart
                    var currentWidth = curWidthStart + moveVectorX > 10 ? curWidthStart + moveVectorX : 10
                    var str1 = computeFinalWidth(currentWidth, parentWidth, oldStr)
                    updateClassStr(str1)
                    // console.log('右边框拉伸结束', str1)
                }
                break;
            // 由于使用了 flex 布局 所以当父级的 position 为 relative or absolute or fixed 才能使用移动
            case "move":
                tar.parentNode.onmousemove = function (event) {
                    event.stopPropagation()
                    // 计算指针移动向量
                    var moveVectorX = event.clientX - pointerLeftStart
                    var moveVectorY = event.clientY - pointerTopStart
                    tar.style.marginLeft = curMarginLeftStart + moveVectorX + "px"
                    tar.style.marginTop = curMarginTopStart + moveVectorY + "px"
                };
                tar.parentNode.onmouseup = function (event) {
                    // 移动过快时 需要在这里手动解除 tar mousemove 事件处理函数
                    event.target.onmousemove = null
                    tar.parentNode.onmousemove = null
                    tar.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    event.target.onmousemove = null
                    tar.parentNode.onmousemove = null
                    tar.onmousemove = null
                    cacheMoveDom.onmousemove = null
                    event.stopPropagation()
                    removeMouse(event.target)
                    tar.style.cursor = null
                    // 计算 tar 当前的 margin-left margin-top
                    var currentMarginLeft = curMarginLeftStart + event.clientX - pointerLeftStart
                    var currentMarginTop = curMarginTopStart + event.clientY - pointerTopStart
                    var str1 = computeFinalMarginLeft(currentMarginLeft, parentWidth, oldStr)
                    var str2 = computeFinalMarginTop(currentMarginTop, parentWidth, str1)
                    updateClassStr(str2)
                    // console.log('移动结束 修改class字符串', str2)
                };
                break;
            case "pointer":
                // console.log("pointer");
                break;
        }
    }
}

/**
 * 在移动or拉伸后 计算最终 width 属性 并保存到一个字符串中
 * @param currentWidth 当前宽度
 * @param parentWidth 父级宽度
 * @param oldStr 待修改的字符串
 * @returns {String} 修完完的字符串
 */
function computeFinalWidth(currentWidth, parentWidth, oldStr) {
    // 计算相对宽度百分比
    var relativelyWidth = new Number(currentWidth / parentWidth * 100).toFixed(1);
    // 拼接 width 的字符串表示形式
    var relativelyWidthString = "w-" + relativelyWidth.toString().replace(/\./, "_") + "--p";
    // 在原字符串中替换 并返回
    return  mixStyleStr(oldStr, relativelyWidthString)
}

/**
 * 在移动or拉伸后 计算最终 height 属性 并保存到一个字符串中
 * @param currentHeight 当前高度
 * @param parentHeight 父级高度
 * @param oldStr 待修改的字符串
 * @return {String} 修完完的字符串
*/
function computeFinalHeight(currentHeight, parentHeight, oldStr) {
    // 计算相对高度百分比
    var relativelyHeight = new Number(currentHeight / parentHeight * 100).toFixed(1)
    // 拼接 width 的字符串表示形式
    var relativelyHieghtString = "h-" + relativelyHeight.toString().replace(/\./, "_") + "--p"
    // 在原字符串中替换 并返回
    return  mixStyleStr(oldStr, relativelyHieghtString)
}

/**
 * 在移动or拉伸后 计算最终 margin-left 属性 并保存到一个字符串中
 * @param currentMarginLeft 当前 margin-left
 * @param parentWidth 父级宽度
 * @param oldStr 待修改的字符串
 * @return {String} 修完完的字符串
*/
function computeFinalMarginLeft(currentMarginLeft, parentWidth, oldStr) {
    var relativelyMarginLeft = new Number(currentMarginLeft / parentWidth * 100).toFixed(1)
    if (relativelyMarginLeft < 0) {
        var tempStr = "d" + Math.abs(relativelyMarginLeft)
    } else {
        var tempStr = relativelyMarginLeft.toString()
    }
    var relativelyMLString = "ml-" + tempStr.replace(/\./, "_") + "--p"
    return  mixStyleStr(oldStr, relativelyMLString)
}

/**
 * 在移动or拉伸后 计算最终 margin-top 属性 并保存到一个字符串中
 * @param currentMarginTop 当前 margin-top
 * @param parentWidth 父级宽度
 * @param oldStr 待修改的字符串
 * @return {String} 修完完的字符串
*/
function computeFinalMarginTop(currentMarginTop, parentWidth, oldStr) {
    var relativelyMT = new Number(currentMarginTop / parentWidth * 100).toFixed(1);
    if (relativelyMT < 0) {
        var tempStr = "d" + Math.abs(relativelyMT)
    } else {
        var tempStr = relativelyMT.toString()
    }
    var relativelyMTString = "mt-" + tempStr.replace(/\./, "_") + "--p";
    return  mixStyleStr(oldStr, relativelyMTString)
}


/**
 * 通过指针相对div的位置 判断触发什么操作 并存储在 div.style.cursor 10 种指针样式
 * @param e  event对象
 * @param div 当前的dom
 * @param parameter 一个参考值
 */
function getPoint(e, div, parameter) {
    var x = e.offsetX,
        y = e.offsetY,
        divW = div.offsetWidth,
        divH = div.offsetHeight;
    if (e.target === div && x >= 0 && y >= 0) {
        if (x >= 0 && x < parameter) {
            if (y >= 0 && y < parameter) {
                // 左上
                div.cursor = "nw-resize"
                div.style.cursor = "nw-resize"
            } else if (y > divH-parameter) {
                // 左下
                div.cursor = "sw-resize"
                div.style.cursor = "sw-resize"
            } else {
                // 左中
                div.cursor = "w-resize"
                div.style.cursor = "w-resize"
            }
        } else if (x > divW-parameter) {
            if (y >= 0 && y < parameter) {
                // 右上
                div.cursor = "ne-resize"
                div.style.cursor = "ne-resize"
            } else if (y > divH-parameter) {
                // 右下
                div.cursor = "se-resize"
                div.style.cursor = "se-resize"
            } else {
                // 右中
                div.cursor = "e-resize"
                div.style.cursor = "e-resize"
            }
        } else if (x > parameter && x < divW-parameter) {
            if (y >= 0 && y < parameter) {
                // 上
                div.cursor = "n-resize"
                div.style.cursor = "n-resize"
            } else if (y > divH-parameter) {
                // 下
                div.cursor = "s-resize"
                div.style.cursor = "s-resize"
            } else if (x < divW/2) {
                // 移动
                div.cursor = "move"
                div.style.cursor = "move"
            } else {
                div.cursor = "pointer"
                div.style.cursor = "pointer"
            }
        }
    }
}

/**
 * 向父级递归清除 mousemove mouseup 事件 直到某个父代没有这两个事件
 */
function removeMouse (element) {
    if (element.onmouseup !== null || element.onmousemove !== null) {
        element.onmouseup = null
        element.onmouseup = null
        removeMouse(element.parentNode)
    }
    return;
}

//去除sty的重复数据
function deleteHadData(first, second) {
    var clsF, clsS, reg;
    if (first instanceof Array) {
        for (var n = 0; n < first.length; n++) {
            clsS = stringToArray(second[n].cls);
            clsF = stringToArray(first[n].cls);
            for (var j = 0; j < clsS.length; j++) {
                if (clsF.indexOf(clsS[i]) > -1) {
                    clsF.splice(clsF.indexOf(clsS[i]), 1)
                }
            }
            if (first[n].chr && first[n].chr.length > 0) {
                deleteHadData(first[n].chr, second[n].chr)
            }
        }
    } else {
        clsS = stringToArray(second.cls);
        clsF = stringToArray(first.cls);
        for (var i = 0; i < clsS.length; i++) {
            if (clsF.indexOf(clsS[i]) > -1) {
                clsF.splice(clsF.indexOf(clsS[i]), 1)
            }
        }
        first.cls = arrayToString(clsF);
        //if(second.es)
        if (first.chr && first.chr.length > 0) {
            deleteHadData(first.chr, second.chr)
        }
    }
}

/**
 * 展示当前点击元素 给当前元素添加样式  清除其他元素的样式
 * @param target
 */
function setCurElementStyle(target) {
    if (target.elm) {
        target = target.elm;
    }
    if (treeData.targetElement !== null && treeData.targetElement.style.outline) {
        treeData.targetElement.style.outline = "none";
    }
    treeData.targetElement = target;
    target.style.outline = "1px solid #0f0";
}

// function setCurElementBcg(target) {
//     if (target.elm) {
//         target = target.elm;
//     }
//     if (treeData.targetElement !== null) {
//         treeData.targetElement.style.outline = "none";
//     }
//     treeData.targetElement = target;
//     target.style.outline = "1px solid #0f0";
// }

/**
 * 设置树的点击
 * @param target
 */
function setTreeElementStyle(target) {
    if (target.elm) {
        target = target.elm;
    }
    if (treeData.treeTarEle !== null) {
        treeData.treeTarEle.style.backgroundColor = "";
    }
    treeData.treeTarEle = target;
    target.style.backgroundColor = "#57f285";
}
/**
 * 根据容器的index 查找到对应容器的数据
 * @param index
 * @returns {phoneShow.st|{chr}|*}
 */
function getContainerData1(index) {
    var array = index.split(",");
    var data = phoneShow.st;
    for (var i in array) {
        data = data.chr[array[i]];
    }
    return data;
}

/**
 * 样式清空
 * @param sty
 */
function clearClsName(sty) {
    sty.cls = "";
    if(sty.chr && sty.chr.length > 0){
        for(var i = 0;i<sty.chr.length;i++){
            clearClsName(sty.chr[i])
        }
    }
}

/**
 * 清除样式交互数据 返回默认值 或者 隐藏
 */
function resetState() {
    classAndData.eventObj.eventWay.length = 0;
    classAndData.eventObj.selEventShow = false;
    classAndData.eventObj.destination = false;
    classAndData.eventObj.isShow = false;
    classAndData.interactiveData.attrs = {}
}

/**
 * 容器上移
 * @param cur_con
 * @param p_con
 * @param index1
 */
function moveUpALayer(cur_con, p_con, index1) {
    //取到当前容器在父容器的位置，改变容器的位置
    let lArr = index1.split(",");
    let extendLArr = lArr.slice(0);
    //判断当前容器是不是第一个，不是第一个 再继续操作
    if (parseInt(lArr[lArr.length - 1]) > 0) {
        //取到当前容器在父容器中的坐标
        let dex = p_con.chr.indexOf(cur_con);
        //将当前容器在父容器中删除
        let delData = p_con.chr.splice(dex, 1);
        //将当前容器在插入到
        p_con.chr.splice(dex - 1, 0, delData[0]);
        //Vue.set(p_con.chr, dex - 1, delData[0]);
        //改变对应容器的组件数据的 l 字段的索引
        for (var i = 0; i < phoneShow.ds.values.length; i++) {
            var para = phoneShow.ds.values[i];
            para.values.forEach(function (item) {
                //判断组件数据是不是在当前容器中，如果不在 判断是不是上一个 直接改变当前容器中组件数据的索引
                if (cur_con.index.di.indexOf(item) === -1) {
                    let itemLArr = item.l.split(",");
                    //如果不在当前容器中，判断是不是上一个容器中，是的话改变上一个容器中的组件数据的索引
                    var curClick = itemLArr.slice(-2);
                    var cirFor = extendLArr.slice(-2);
                    if (itemLArr.length === extendLArr.length && parseInt(itemLArr[lArr.length - 1]) === parseInt(extendLArr[lArr.length - 1]) - 1) {
                        let num = parseInt(itemLArr[lArr.length - 1]) + 1;
                        itemLArr.splice(lArr.length - 1, 1, num);
                        item.l = itemLArr.join(",");
                        //判断是不是子容器中的
                    } else if (parseInt(itemLArr[lArr.length - 1]) === parseInt(extendLArr[lArr.length - 1])) {
                        itemLArr.splice(lArr.length - 1, 1, dex - 1);
                        item.l = itemLArr.join(',');
                    }
                    //判断组件数据是不是在当前容器中，如果在 直接改变当前容器中组件数据的索引
                } else {
                    lArr.splice(-1, 1, (dex - 1).toString());
                    item.l = lArr.join(',');
                }
            });
        }
    }
}

/**
 * 容器下移
 * @param cur_con
 * @param p_con
 * @param index
 */
function moveDownALayer(cur_con, p_con, index) {
    let lArr = index.split(",");
    //深拷贝当前的坐标 避免下面操作改变了当前坐标 后面的判断受影响
    let extendLArr = lArr.slice(0);
    //判断不是最后一个容器才执行操作
    if (parseInt(lArr[lArr.length - 1]) < p_con.chr.length - 1) {
        let dex = p_con.chr.indexOf(cur_con);
        let delData = p_con.chr.splice(dex, 1);
        p_con.chr.splice(dex + 1, 0, delData[0]);
        Vue.set(p_con.chr, dex + 1, delData[0]);
        phoneShow.ds.values[0].values.forEach(function (item) {
            //判断组件数据是不是在当前容器中，如果不在 判断是不是上一个 直接改变当前容器中组件数据的索引
            if (cur_con.index.di.indexOf(item) === -1) {
                let itemLArr = item.l.split(",");
                //判断是不是下一个容器中的组件
                if (itemLArr[lArr.length - 1] === (parseInt(extendLArr[lArr.length - 1]) + 1).toString()) {
                    let num = parseInt(itemLArr[lArr.length - 1]) - 1;
                    itemLArr.splice(lArr.length - 1, 1, num);
                    item.l = itemLArr.join(",");
                    //判断是不是子容器的组件数据
                } else if (parseInt(itemLArr[lArr.length - 1]) === parseInt(extendLArr[lArr.length - 1])) {
                    itemLArr.splice(lArr.length - 1, 1, dex + 1);
                    item.l = itemLArr.join(',');
                }
            } else {
                lArr.splice(-1, 1, (dex + 1).toString());
                item.l = lArr.join(',');
            }
        });
    }
}