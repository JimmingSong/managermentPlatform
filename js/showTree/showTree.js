//css树展示
function cssTreeView(h,data,render){
    var tag;
    if(data!==undefined){
        if(data===null){
            tag="";
        }else{
            tag=data.tag || data.localName;
        }
    }
    var li_views = [];
    if (data !== undefined) {
        var name = h("span", {
            domProps: {
                innerHTML:tag
            }
        });
        var divs = h("div", {
            class: "tree-top",
            on: {
                mousedown: function (e) {
                    cssTreeMouseRight(e, data, tag, render);
                }
            }
        }, []);
        [name].forEach(function (item) {
            if (item !== null && item !== undefined) {
                divs.children.push(item);
            }
        });
        li_views.push(divs);
        if (data !== null && data.children !== undefined) {
            if ('chr' in render && render.chr.length > 0) {
                var itemChildren = render.chr.map(function (item, index) {
                    if ("children" in data) {
                        var domChild = data.children;
                        return cssTreeView(h, domChild[index], item);
                    }
                });
            }
        }
        var _ul = h("ul", {
            class: "tree-border",
            style: {
                paddingLeft: "1rem"
            }
        }, itemChildren);
        li_views.push(_ul);
    }
    return h("li",
        {
            style:{
                listStyle:"none"
            }
        },
        li_views);
}

//页面树展示
function domTreeView(h,data) {
    var li_views = [];
    var tag;
    if(data !== undefined){
        if (data.$vnode.componentOptions.tag === "container1") {
            tag="容器"+"("+data.index+")";
        }else{

            var tp=data.data.tp;
            var n=data.data.n;
            if(n!==undefined){
                tag=tp+"组件"+"("+"n:"+n+")";
            }else{
                tag=tp+"组件"+"(没有n字段)";
            }
        }
    }
    var name = h("span", {
        domProps: {
            innerHTML:tag
        }
    });
    var divs = h("div", {
        style:{
            marginTop: "3px",
        },
        on: {
            mousedown: function (e) {
                var vm = data;
                mouseRightMenu(e, vm.data, vm.index, vm.pd,data);
            }
            // click: function (e) {
            //     var vm=data;
            //     var tar = e.target;
            //     if (tar.nodeName === "SPAN") {
            //         tar = e.target.parentNode;
            //     }
            //     setTreeElementStyle(tar);
            //     if(vm !== undefined){
            //         if (vm.$vnode.componentOptions.tag === "container1") {
            //             modifyContainer(vm.data);
            //             setCurElementStyle(vm.$vnode.elm);
            //         } else if (vm.$vnode.componentOptions.tag === "component1") {
            //             setCurElementStyle(vm.$vnode.elm);
            //             modifyComponent(vm.data, vm.rd, vm._vnode);
            //             clearClass("model-t2");
            //             treeData.treeShow = 1
            //         }
            //     }
            // }
        }
    }, []);
    [name].forEach(function (item) {
        if (item !== null && item !== undefined) {
            divs.children.push(item);
        }
    });
    li_views.push(divs);
    if(data!==undefined){
        if (data.$children.length > 0) {
            var itemChildren = data.$children.map(function (item, index) {
                var domChild = item;
                return domTreeView(h, domChild);
            });
        }
    }
    li_views.push(itemChildren);
    return h("div",
        {
            style:{
                paddingLeft: "20px"
            }
        },
        li_views);
}

/**
 * cssTree 右键点击事件
 * @param e
 * @param data
 * @param tag
 * @param render
 */
let bool;
function cssTreeMouseRight(e, data, tag, render) {
    let phone = document.querySelector(".model-con1");
    let phoneW = phone.offsetWidth;
    let phoneH = phone.offsetHeight;
    stopPropagation(e);
    prevent(e.target);
    if (e.button === 2) {
        rightMouse(data.context);
        if (bool) {
            let datas = [
                {
                    name: "触发者", icon: "", values: [{
                    key: "click", value: function (event) {
                    }
                }], children: [
                    {
                        name: "单击", icon: "", values: [
                        {
                            key: "click", value: function (event) {
                            addOpenTreeChild(render, 'click')
                        }
                        }
                    ]
                    },
                    {
                        name: "双击", icon: "", values: [
                        {
                            key: "click", value: function (event) {
                            addOpenTreeChild(render, 'dblclick')
                        }
                        }
                    ]
                    },
                    {
                        name: "长按", icon: "", values: [
                        {
                            key: "click", value: function (event) {
                            addOpenTreeChild(render, 'mousedown')
                        }
                        }
                    ]
                    }
                ]
                }
            ];
            var phoneShow = document.querySelector(".model-con1");
            dialog.createDialog(phoneShow, datas, {
                x: phoneW * (1 / 4),
                y: phoneH * (1 / 3)
            }, index);
            window.onclick = function () {
                $("#menu_1").remove();
            };
            bool = false;
        }
    } else {
        classAndData.b_data.comValue = data.context.data;
        if (!classAndData.clsobj) {
            classAndData.clsobj = {};
        }
        classAndData.clsobj.tag = tag;
        classAndData.clsobj.obj = render;
        clearAttributeParse();
        if (classAndData.event.setTagCssControl) {
            classAndData.interactiveDatas = render;
        }
        classParse.renderStyParse1(render);
        //设置高亮,交互数据，清掉数据数据
        setCurElementStyle(data);
    }
}

/**
 * 给指定的标签设置触发者
 * @param render
 * @param eType
 */
function addOpenTreeChild(render, eType) {
    Vue.set(render, "es", {});
    render.es[eType] = [];
    var obj = {};
    obj.v = 'openTree(e,vNode)';
    Vue.set(render.es[eType], render.es[eType].length, obj)
}

var showScreen = document.getElementById("phone");
/**
 * 判断是否有目录树布局的容器
 * @param vNode
 */
function rightMouse(vNode) {
    if (vNode.data && vNode.data.ilm && vNode.data.ilm.t === "tr") {
        bool = true;
    } else if (vNode.$el != showScreen) {
        if (vNode.$el === showScreen) {
            bool = false
        } else {
            rightMouse(vNode.$parent)
        }
    }
}

/**
 * 页面树 右击事件
 * @param e
 * @param conData
 * @param index
 * @param cur_pd
 * @param data
 */
function mouseRightMenu(e, conData, index, cur_pd,data) {
    //var phone = document.querySelector(".model-con1");
    var phone = e.currentTarget;
    var phoneW = phone.offsetWidth;
    var phoneH = phone.offsetHeight;
    stopPropagation(e);
    prevent(e.target);
    //设置高亮,交互数据，清掉数据数据
    var tar = e.currentTarget;
    tar.style.position = 'relative';
    //if (tar.nodeName === "SPAN") {
    //    tar = e.target.parentNode;
    //}
    setTreeElementStyle(tar);
    if (e.button === 2) {
        var comData = {};
        comData.d = data.data;
        comData.id = data.r_id;
        comData.r = data.rd;
        var datas = [
            {
                name: "重选", icon: "", values: [{
                    key: "click", value: function (event) {
                    event.stopPropagation();
                    }
                }], children: []
            },
            {
                name: "剪切", icon: "", values: [{
                    key: "click", value: function (event) {
                    }
                }], children: []
            }
        ];
        rightMouse(data);
        if (bool) {
            datas.push({
                name: "触发者", icon: "", values: [{
                    key: "click", value: function (event) {
                    }
                }], children: [
                    {
                        name: "单击", icon: "", values: [
                        {
                            key: "click", value: function (event) {
                            addOpenTreeChild(conData.sty || data.rd.sty, 'click')
                        }
                        }
                    ]
                    },
                    {
                        name: "双击", icon: "", values: [
                        {
                            key: "click", value: function (event) {
                            addOpenTreeChild(conData.sty || data.rd.sty, 'dblclick')
                        }
                        }
                    ]
                    },
                    {
                        name: "长按", icon: "", values: [
                        {
                            key: "click", value: function (event) {
                            addOpenTreeChild(conData.sty || data.rd.sty, 'mousedown')
                        }
                        }
                    ]
                    }
                ]
            });
            bool = false;
        }
        if (conData.tp) {
            var deletObj = {
                name: "删除", icon: "", values: [{
                    key: "click", value: function (event) {
                    }
                }], children: [
                    {
                        name: "删除数据", icon: "", values: [{
                            key: "click", value: function () {
                            deleteComData(cur_pd, comData, index)
                            }
                        }]
                    },
                    {
                        name: "删除数据及渲染对象", icon: "", values: [{
                            key: "click", value: function () {
                            deleteComDataAndRs(cur_pd, comData, index)
                            }
                        }]
                    }
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
                            deepCopyCom(comData, index)
                            }
                        }], children: []
                    },
                    {
                        name: "浅复制", icon: "", values: [{
                            key: "click", value: function (event) {
                            shallowCopyCom(comData, index)
                            }
                        }], children: []
                    }
                ]
            };
            datas.splice(1, 0, copyComObj);
            datas.push({
                name: "渲染规则", icon: "", values: [{
                    key: "click", value: function (event) {
                        disEditRen(comData, index, cur_pd)
                    }
                }], children: []
            });
            datas.push({
                name: "约束规则", icon: "", values: [{
                    key: "click", value: function (event) {
                        conRuleManager(comData)
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
            let moveUp = {
                name: "上移一层", icon: "", values: [{
                    key: "click", value: function (event) {
                        moveUpALayer(conData, cur_pd, index)
                    }
                }], children: []
            };
            let moveDown = {
                name: "下移一层", icon: "", values: [{
                    key: "click", value: function (event) {
                        moveDownALayer(conData, cur_pd, index)
                    }
                }], children: []
            };
            datas.splice(2, 0, copyConObj);
            datas.splice(3, 0, pasteObj);
            datas.splice(4, 0, deleteObj);
            datas.push(moveUp);
            datas.push(moveDown);
        }
        //var phoneShow = document.querySelector(".model-con1");
        dialog.createDialog(tar, datas, {
            x: phoneW * (1 / 4),
            y: phoneH * (1 / 3)
        }, index);
        window.onclick = function () {
            $("#menu_1").remove();
        }
    }else{
        clearAttributeParse();
        var obj = {}, ren;
        if (classAndData.interactiveDatas.sty) {
            ren = classAndData.interactiveDatas.sty
        } else {
            ren = classAndData.interactiveDatas
        }
        if (conData.tp) {
            if (classAndData.eventObj.isSelRender) {
                obj.tg = conData.id;
                //拿到组件的虚拟DOM 给到css树
                //classAndData.eventObj.x_Node = c_Node;
                if (!ren.es || ren.es instanceof Object) {
                    ren.es = {};
                    ren.es[classAndData.eventObj.curWay] = [];
                }
                ren.es[classAndData.eventObj.curWay].push(obj);
                classAndData.eventObj.target.push(conData.id);
                classAndData.eventObj.isSelRender = false;
                document.getElementById("show-screen").children[1].style.cursor = "default"
            }else{
                var vm=data;
                var tar = e.target;
                if (tar.nodeName === "SPAN") {
                    tar = e.target.parentNode;
                }
                setTreeElementStyle(tar);
                if(vm !== undefined){
                    if (vm.$vnode.componentOptions.tag === "container1") {
                        modifyContainer(vm.data);
                        setCurElementStyle(vm.$vnode.elm);
                    } else if (vm.$vnode.componentOptions.tag === "component1") {
                        setCurElementStyle(vm.$vnode.elm);
                        modifyComponent(vm.data, vm.rd, vm._vnode);
                        clearClass("model-t2");
                        treeData.treeShow = 1
                    }
                }
            }
            // else {
            //     //将组件数据展示到数据模块中
            //     classAndData.b_data.comV = null;
            //     classAndData.b_data.comV = conData;
            //     modifyComponent(conData.d, conData.r, c_Node);
            // }
        }else{
            if (classAndData.eventObj.isSelRender) {
                obj.tg = index;
                // classAndData.eventObj.x_Node = c_Node;
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
            }else{
                var vm=data;
                var tar = e.target;
                if (tar.nodeName === "SPAN") {
                    tar = e.target.parentNode;
                }
                setTreeElementStyle(tar);
                if(vm !== undefined){
                    if (vm.$vnode.componentOptions.tag === "container1") {
                        modifyContainer(vm.data);
                        setCurElementStyle(vm.$vnode.elm);
                    } else if (vm.$vnode.componentOptions.tag === "component1") {
                        setCurElementStyle(vm.$vnode.elm);
                        modifyComponent(vm.data, vm.rd, vm._vnode);
                        clearClass("model-t2");
                        treeData.treeShow = 1
                    }
                }
            }
            // else {
            //     modifyContainer(conData);
            // }
        }
    }

}



