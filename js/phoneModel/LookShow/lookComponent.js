//容器自定义标签声明
Vue.component("container", {
    render: function (createElement) {
        var _cthis = this;
        //当前容器数据
        var cur_data = this.data;
        //数据索引 数据树解析生成
        var dex = lookPhone.ds.tdi;
        //当前容器索引
        var cur_index = this.index;
        //不记得
        // var cur_num = this.num;
        var c_vNode;
        //父容器数据
        var cur_pd = this.pd;
        var i_comDatas, i_pDatas;
        var vm = this;
        console.info("正在渲染的容器位置" + cur_index);
        if (cur_data.index && !cur_data.index.di) {
            if (lookPhone.ds.tdi) {
                var i_datas = lookPhone.ds.tdi[cur_index];
                if (i_datas) {
                    if (i_datas.c && i_datas.c.length > 0) {
                        i_comDatas = i_datas.c;
                        Vue.set(cur_data.index, "di", i_comDatas);
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
            style:cur_data.style?cur_data.style:{}
        }, []);
        setDataEvent(cur_data.es, cur_data, c_vNode);
        //设置样式交互事件；
        setStyleEvent(cur_data.sty.es, c_vNode);
        //设置事件交互事件
        if (i_pDatas && i_pDatas.length) {
            i_pDatas.forEach(function (item) {
                setDataEvent(i_pDatas.es, cur_data, c_vNode);
            });
        }

        //创建子容器
        if (cur_data.chr && (cur_data.chr.length > 0)) {
            var childs = getChildContainers(createElement, cur_data, cur_index);
            c_vNode.children = c_vNode.children.concat(childs);
        }
        //创建子组件
        if (i_comDatas && (i_comDatas.length > 0)) {
            var childs = getChildComponents(createElement, i_comDatas, cur_data, cur_index);
            c_vNode.children = c_vNode.children.concat(childs);
        }
        //设置布局模型
        if (cur_data.hasOwnProperty('ilm') && cur_data.ilm.hasOwnProperty('atr') && cur_data.ilm.t !== "") {
            var layoutDatas = settingLayoutModel1(cur_data.ilm, c_vNode.children);
            if (layoutDatas.p_cls && layoutDatas.p_cls !== "") {
                var fusionCls = mixStyleStr(cur_data.sty.cls, layoutDatas.p_cls);
                c_vNode.data.class = fusionCls;
            }

            for (var n = 0; n < c_vNode.children.length; n++) {
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
        return c_vNode;
    },
    props: ["data", "index", "pd"]
});
//组件自定义标签声明
Vue.component("component", {
    render: function (createElement) {
        var cur_data = this.data;
        var renderObj = this.rd;
        var cur_index = this.index;
        var cur_pd = this.pd;
        var cur_con = this.con;
        var vm = this;
        var c_Node;
        // console.info("正在渲染的组件位置" +this._id);
        var temporaryDom = getBaseView(createElement, cur_data, renderObj);
        // c_Node = getBaseView(createElement,cur_data,cur_rs[r_id]);
        c_Node = AllCssDomBind(temporaryDom, renderObj);
        c_Node.data.style = renderObj.style?renderObj.style:{};
        // c_Node.data.attrs = renderObj.attrs?renderObj.attrs:{};
        setDataEvent(cur_data.es, cur_data, c_Node);
        // c_Node.data.on = getEvent(cur_data);
        if (renderObj.attrs && JSON.stringify(renderObj.attrs) !== "{}") {
            setAttrList(c_Node, renderObj)
        }
        return c_Node
    },
    props: ["data", "rd", "pd", "index"]
});

/**
 * 创建容器孩子虚拟dom对象
 * @param h
 * @param p_Data
 * @param p_index
 * @returns {*}
 */
function getChildContainers(h, p_Data, p_index) {
    var new_con = p_Data.chr.map(function (item, index) {
        //创建容器组件
        return h("container", {
            props: {data: item, index: p_index + "," + index, pd: p_Data}
        });
    });
    return new_con
}

function getChildComponents(h, indexDatas, p_Data, p_index) {
    let ri_Datas = p_Data.index.ri;
    // var dataArray=indexDatas.di;
    let new_components = indexDatas.map(function (item, index) {
        //匹配渲染对象
        var r_id = getComRenderObj(item, index, ri_Datas);
        if (r_id && r_id !== "") {
            var cur_rs = lookPhone.rs;
            var renderObj = cur_rs[r_id];
            return h("component", {
                props: {data: item, rd: renderObj, pd: p_Data, index: p_index}
            });
        } else {
            return;
        }
    });
    return new_components;
}

//设置布局模型
function settingLayoutModel(iml, children) {
    if (iml.t !== "") {
        return getLayoutBaseData(iml, children);
    }
}

function setAttrList(vNode, render) {
    if (vNode.tag === "input") {
        if (render.attrs && JSON.stringify(render.attrs) !== "{}") {
            for (var i in render.attrs) {
                if (i === "disabled") {
                    if (render.attrs[i] === "true") {
                        vNode.data.attrs[i] = render.attrs[i]
                    } else {
                        delete vNode.data.attrs[i]
                    }
                } else {
                    vNode.data.attrs[i] = render.attrs[i]
                }
            }
        }
    }
    if (vNode.children && vNode.children.length > 0) {
        for (var j = 0; j < vNode.children.length; j++) {
            setAttrList(vNode.children[j], render)
        }
    }
}