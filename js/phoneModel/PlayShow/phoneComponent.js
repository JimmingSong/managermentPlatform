//let updateNum = 0;
//let updateObj = {};
//容器自定义标签声明
Vue.component("container1", {
    render:function (createElement) {
        var _cthis=this;
        //当前容器数据
        var cur_data = this.data;
        //数据索引 数据树解析生成
        var dex = phoneShow.ds.tdi;
        //当前容器索引
        var cur_index = this.index;
        //不记得
        // var cur_num = this.num;
        var c_vNode;
        //父容器数据
        // console.log(cur_index);
        var cur_pd = this.pd;
        var i_comDatas,i_pDatas;
        var vm=this;
        if (cur_data.index && !cur_data.index.di) {
            if (phoneShow.ds.tdi) {
                var i_datas = phoneShow.ds.tdi[cur_index];
                if (i_datas) {
                    if (i_datas.c && i_datas.c.length > 0) {
                        i_comDatas = i_datas.c;
                        Vue.set(cur_data.index, "di", i_comDatas);
                    } else {
                        Vue.set(cur_data.index, "di", []);
                    }
                    if (i_datas.p && i_datas.p.length > 0) {
                        Vue.set(cur_data, "es", i_datas.p[0].es)
                    }
                } else {
                    Vue.set(cur_data.index, "di", []);
                }
            }
        } else if (cur_data.index) {
            i_comDatas = cur_data.index.di;
        }
        // 判断容器类型
        c_vNode = createElement("div", {
            class: cur_data.sty.cls,
            on:{
                mousedown:function (e) {
                    componentsClick(e,cur_data,cur_index,cur_pd);
                    if (cur_data.es && cur_data.es.length > 0) {
                        eventManagement(cur_data)
                    }
                },
                click: function (e) {
                    e.stopPropagation();
                    phoneShow.play_data = cur_data;
                    phoneShow.play_index = cur_index;
                },
                dragenter:function(e){
                    e.target.style.backgroundColor="rgba(255,206,68,0.5)"
                },
                dragover:function (e) {
                    e.preventDefault();
                },
                dragleave:function(e){
                    e.target.style.backgroundColor = ""
                },
                // 处理将目标拖拽到容器的行为
                drop:function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.target.style.backgroundColor = "";
                    if (!comAndLayout.dragTemnpData) {
                        return;
                    }
                    if(comAndLayout.dragTemnpData.tp) {
                        var data = comAndLayout.dragTemnpData.d;
                        var render = comAndLayout.dragTemnpData.v;
                        data.l = cur_index;
                        var comTp = data.tp;
                        if (!cur_data.index.ri[comTp]) {
                            Vue.set(cur_data.index.ri,comTp,{});
                            Vue.set(cur_data.index.ri[comTp], "d", []);
                        }
                        var id = addRenderObjInRS(render);
                        cur_data.index.ri[comTp].d.push(id);
                        Vue.set(cur_data.index.ri[comTp],"rls",[]);
                        cur_data.index.ri[comTp].rls.push({
                            "tp": "order2",
                            "isLoop": 1,
                            "isReciprocate": 0
                        });
                        var parAdd, comAdd;
                        if (!phoneShow.ds.values) {
                            Vue.set(phoneShow.ds, "values", []);
                        }
                        if (phoneShow.ds.values.length === 0) {
                            var obj = {};
                            Vue.set(obj, "values", []);
                            Vue.set(phoneShow.ds.values, phoneShow.ds.values.length - 1, obj);
                            parAdd = 0;
                            comAdd = 0;
                        } else {
                            if (comAndLayout.comPop.parValue === null) {
                                if (comAndLayout.comPop.couValue === null) {
                                    parAdd = phoneShow.ds.values.length - 1;
                                    if (!phoneShow.ds.values[parAdd]) {
                                        comAdd = 0;
                                    } else {
                                        comAdd = phoneShow.ds.values[parAdd].values.length;
                                    }
                                } else {
                                    parAdd = phoneShow.ds.values.length - 1;
                                    comAdd = comAndLayout.comPop.couValue;
                                }
                            } else {
                                if (comAndLayout.comPop.couValue === null) {
                                    parAdd = comAndLayout.comPop.parValue - 1;
                                    comAdd = phoneShow.ds.values[comAndLayout.comPop.parValue].values.length;
                                } else {
                                    parAdd = comAndLayout.comPop.parValue - 1;
                                    comAdd = comAndLayout.comPop.couValue;
                                }
                            }
                        }
                        //将组件插入到指定的段中 如没有指定就放到最后一个
                        // var dsDealObj = new dsDeal(phoneShow.ds);
                        // dsDealObj.addcData(comAndLayout.dragTemnpData.d, phoneShow.ds.values[parAdd], comAdd);
                        // console.log(phoneShow);
                        phoneShow.ds.values[parAdd].values.splice(comAdd, 0, comAndLayout.dragTemnpData.d);
                        if (!phoneShow.ds.tdi[index]) {
                            phoneShow.ds.tdi[index] = {};
                        }
                        phoneShow.ds.tdi[index].c = cur_data.index.di;
                        cur_data.index.di.push(phoneShow.ds.values[parAdd].values[comAdd]);
                        console.log(phoneShow.ds);
                        parseRenderObj(render.sty);
                    }else{
                        console.log(comAndLayout.dragTemnpData);
                        var con = getLayoutData("con");
                        if(comAndLayout.dragTemnpData.t){
                            var layout = getLayoutData(comAndLayout.dragTemnpData.t);
                            con.ilm = layout;
                        }
                        if (con.sty.cls !== "") {
                            parseClsStr(con.sty.cls);
                        }
                        cur_data.chr.push(con)
                    }
                    console.log(treeData.pState);
                },
                // dblclick: function (e) {
                // //    给每个容器添加双击事件 需要展示区div的dom对象
                //     moveAndStretch(e, cur_data.sty)
                // }
            }
        }, []);
        //this.$children.length = 0;
        //点击布局选择tp改变容器样式
        if (cur_data.hasOwnProperty('ilm') && cur_data.ilm.hasOwnProperty('atr') && cur_data.ilm.t !== "") {
            var cur_layout = getLayoutBaseData(cur_data,cur_data.chr,cur_data.index.di);
            if(cur_layout!==undefined){
                c_vNode.data.class = cur_layout.p_cls;
            }
        }
        //创建子容器
        if(cur_data.chr && (cur_data.chr.length>0)){
            var childs = getChildContainers1(createElement, cur_data, cur_index);
            c_vNode.children = c_vNode.children.concat(childs);
            treeData.pState = true;
        } else {
            treeData.pState = true;
            //var conAra = [];
            //c_vNode.children = c_vNode.children.concat();
        }
        //创建子组件
        if (i_comDatas&& (i_comDatas.length>0)){
            dealCountNum(cur_data);
            var childs = getChildComponents1(createElement, i_comDatas, cur_data, cur_index);
            c_vNode.children = c_vNode.children.concat(childs);
            treeData.pState = true;
        } else {
            treeData.pState = true;
        }
         //设置布局模型
        if (cur_data.hasOwnProperty('ilm') && cur_data.ilm.hasOwnProperty('atr') && cur_data.ilm.t !== "") {
            var layoutDatas = settingLayoutModel1(cur_data.ilm, c_vNode.children);
            if (layoutDatas.p_cls && layoutDatas.p_cls !== "") {
                var fusionCls = mixStyleStr(cur_data.sty.cls, layoutDatas.p_cls);
                c_vNode.data.class = fusionCls;
            }

            for(var n = 0;n<c_vNode.children.length;n++){
                var fusionChildCls = mixStyleStr(c_vNode.children[n].data.class, layoutDatas.c_cls);
                if (cur_data.ilm.t === "tr") {
                    if (n > 0) {
                        c_vNode.children[n].data.class = fusionChildCls;
                    }
                } else {
                    c_vNode.children[n].data.class = fusionChildCls;
                }
            }
        }
        //构建页面树
        var index=cur_index.toString();
        if(index.indexOf(",")===-1&&treeData.pageTree.vmTree.indexOf(this)===-1){
            treeData.pageTree.vmTree.push(this);
        }
        return c_vNode;
    },
    props: ["data", "index", "pd"]
});

//组件自定义标签声明
Vue.component("component1", {
    render: function (createElement) {
        var cur_data = this.data;
        var renderObj = this.rd;
        var cur_index = this.index;
        var cur_pd = this.pd;
        var cur_con = this.con;
        var r_id = this.r_id;
        var vm = this;
        var c_Node;
        //对渲染对象进行处理，针对组件的修改
        modifyComDataAndCssData(cur_data, renderObj, r_id);
        var conData = {d: cur_data, r: renderObj, id: r_id};
        var temporaryDom = getBaseView(createElement, cur_data, renderObj);
        // c_Node = getBaseView(createElement,cur_data,cur_rs[r_id]);
        // console.log(JSON.stringify(renderObj, null, 4))
        c_Node = AllCssDomBind1(temporaryDom, renderObj, conData);
        c_Node.data.on = {
            mousedown: function (e) {
                e.stopPropagation();
                componentsClick(e, conData, cur_index, cur_pd, c_Node);
            },
            // dblclick: function (e) {
            // //    给每个容器添加双击事件 需要展示区div的dom对象
            //     moveAndStretch(e, renderObj.sty);
            // },
            click: function (e) {
                e.preventDefault();
                e.stopPropagation();
                phoneShow.play_data = conData;
            }
        };
        return c_Node
    },
    props: ["data", "rd", "pd", "index", "r_id"]
});

/**
 *创建容器孩子虚拟dom对象
 * @param h
 * @param p_Data
 * @param p_index
 * @returns {Array|*}
 */
function getChildContainers1(h, p_Data, p_index) {
    var new_con = p_Data.chr.map(function (item,index) {
            //创建容器组件
        return h("container1", {
                props:{data:item,index:p_index+","+index,pd:p_Data}
            });
    });
    return new_con
}

/**
 * 处理数据 调用组件 component
 * @param h
 * @param indexDatas
 * @param p_Data
 * @param p_index
 * @returns {Array|*}
 */
function getChildComponents1(h, indexDatas, p_Data, p_index) {
    let ri_Datas = p_Data.index.ri;
    let new_components = indexDatas.map(function (item, index) {
        //匹配渲染对象
        var r_id = getComRenderObj(item,index,ri_Datas);
        if (r_id && r_id !== "") {
            var cur_rs = phoneShow.rs;
            var renderObj = cur_rs[r_id];
            if (!renderObj) {
                $.layer.alert("渲染对象池中没有的渲染索引" + r_id);
            }
            return h("component1", {
                props: {data: item, rd: renderObj, pd: p_Data, index: p_index, r_id: r_id}
            });
        } else {
            console.log("未匹配上的渲染索引");

        }
    });
    return new_components;
}

/**
 * 设置布局模型
 * @param iml
 * @param children
 * @returns {*}
 */
function settingLayoutModel1(iml, children) {
    if(iml.t !== ""){
        return getLayoutBaseData(iml,children);
    }
}

/**
 * 采集展示组件的样式改变数据
 * @param render
 */
function eventManagement(render) {
    classAndData.interactiveDatas = render;
}

/**
 * 修改已经删除了的组件
 * @param data
 * @param rs
 * @param rsId
 */
function modifyComDataAndCssData(data, rs, rsId) {
    if (data.tp === "cd" && rs.k === "cd-1") {
        rs.k = "cd-df";
    } else if (data.tp === "cht" && rs.k === "cht-2") {
        rs.k = "cht-1";
    }
}

function dealCountNum(conData) {
    for (var i in conData.index.ri) {
        if (conData.index.ri[i].rls) {
            conData.index.ri[i].rls.forEach(function (item) {
                if (item.count) {
                    delete  item.count;
                }
            })
        }
    }
}