/**
 *
 * @param ilm  容器数据
 * @param  children 子容器和组件的数量和
 */
function getLayoutBaseData(ilm,children) {
    switch (ilm.t) {
        case "df":
            return defaultLayout();
        case "ll":
            return createLinearLayoutDom(ilm,children);
        case "gl":
            return createGridLayoutDom(ilm,children);
        case "cl":
            return createColumnLayoutDom(ilm,children);
        case "sl":
            return createSingleLayoutDom(ilm,children);
        case "tr":
            return createTreeDom(ilm, children);
        case "opl":
            // return createOnePlusNLayoutDom(ilm,children);
    }
}

function defaultLayout() {
    var div_p = {};
    div_p.p_cls = "";
    div_p.c_cls = "";
    return div_p;
}
/**
 * 线性布局
 * @param ilm
 * @param children
 * @returns {{}}
 */
function createLinearLayoutDom(ilm,children) {
    var div_p = {};
    var integer,decimal,c_style,result,n_num;
    var count=children.length;
    if(count>12){
        count=12;
    }else if(count<=0){
        count = 1
    }
    result = 100 / count;
    if (String(result).indexOf(".") > -1) {
        result = String(result).slice(0, String(result).indexOf(".") + 2);
    } else {
        result = String(result)
    }
    if (ilm.atr === 'horizontal') {
        div_p.p_cls = "w-100--p bw-1--x bs-s bdc-aaaaaa";
        div_p.c_cls = "w-100--p";
        integer = String(result).split(".")[0];
        decimal = String(result).split(".")[1];
        if (!decimal || decimal === "0") {
            result = integer
        }else{
            result = integer +"_"+decimal;
        }
        c_style = "h-"+result+"--p";
        div_p.c_cls = stringToArray(div_p.c_cls);
        div_p.c_cls.push(c_style);
        div_p.c_cls = arrayToString(div_p.c_cls)
    } else if (ilm.atr === 'vertical') {
        div_p.p_cls = "d-f fr-w bw-1--x bs-s bdc-aaaaaa";
        div_p.c_cls = "h-100--p";
        if(String(result).indexOf(".") > -1){
            // result = parseFloat(result);
            integer = result.split(".")[0];
            decimal = result.split(".")[1];
            result = integer +"_"+decimal;
        }
        c_style = "w-" + result + "--p";
        div_p.c_cls = stringToArray(div_p.c_cls);
        div_p.c_cls.push(c_style);
        div_p.c_cls = arrayToString(div_p.c_cls)
    }
    return div_p;
}

/**
 * 网格布局
 * @param ilm
 * @param children
 * @returns {{}}
 */
function createGridLayoutDom(ilm,children) {
    var div_p = {}, integer, decimal, cResult, rResult, rInteger, rDecimal, colNum, rowNum;
    div_p.p_cls = "bw-1--x bs-s bdc-aaaaaa fr-w d-f";
    div_p.c_cls = "bx-b";
    div_p.c_cls = stringToArray(div_p.c_cls);
    if (comAndLayout.layoutDefault) {
        var len = children.length;
        if (len >= 0 && len <= 1) {
            colNum = 1;
            rowNum = 1;
        } else if (len > 1 && len <= 2) {
            colNum = 2;
            rowNum = 1;
        } else if (len > 2 && len <= 4) {
            colNum = 2;
            rowNum = 2;
        } else if (len >= 4 && len <= 5) {
            colNum = 3;
            rowNum = 2
        } else if (len > 5 && len <= 9) {
            colNum = 3;
            rowNum = 3;
        }
    } else {
        colNum = parseInt(ilm.atr.col);
        rowNum = parseInt(ilm.atr.row)
    }
    cResult = 100 / colNum;
    rResult = 100 / rowNum;
    if (String(cResult).indexOf(".") > -1 || String(rResult).indexOf(".") > -1) {
        cResult = parseFloat(cResult).toFixed(1);
        integer = cResult.split(".")[0];
        decimal = cResult.split(".")[1];
        cResult = integer + "_" + decimal;
        rResult = parseFloat(rResult).toFixed(1);
        rInteger = rResult.split(".")[0];
        rDecimal = rResult.split(".")[1];
        rResult = rInteger + "_" + rDecimal;
    }
    // result = parseFloat(result).toFixed(1);
    var c_w = "w-" + cResult + "--p";
    div_p.c_cls.push(c_w);
    var c_h = "h-" + rResult + "--p";
    div_p.c_cls.push(c_h);
    div_p.c_cls = arrayToString(div_p.c_cls);
    ilm.atr.col = colNum;
    ilm.atr.row = rowNum;
    return div_p;
}

/**
 * 栏格布局
 * @param ilm
 * @param children
 * @returns {{}}
 */
function createColumnLayoutDom(ilm,children) {
    var div_p={},integer,decimal,result;
    div_p.p_cls = "w-100--p h-3--r bw-1--x bs-s bdc-aaaaaa dis-flex";
    if (ilm.atr !== "") {
        for (var i = 0; i < ilm.atr.colFlex.length; i++) {
            if (ilm.atr.colFlex.length !== 0) {
                div_p.c_cls = [];
                div_p.c_cls.push("fg-" + parseInt(ilm.atr.colFlex[i]));
            }else{
                div_p.c_cls = "h-p-100";
                div_p.c_cls = 100 / (children.length) + "%";
            }
        }
    }
    return div_p;
}

/**
 * 通栏布局
 * @param ilm
 * @param children
 * @returns {{}}
 */
function createSingleLayoutDom(ilm,children) {
    var div_p = {};
    div_p.p_cls = "w-100--p bw-1--x bs-s bdc-aaaaaa";
    return div_p;
}
/**
 * 树(tree)布局
 * @param ilm
 * @param children
 */
function createTreeDom(ilm, children) {
    var div_p = {};
    var eSty;
    if (ilm.atr.es && ilm.atr.es !== "") {
        eSty = ilm.atr.es
    } else {
        eSty = "click"
    }
    div_p.c_cls = "ml-1--r";
    return div_p
}
function openTree(e, vNode) {
    e.stopPropagation();
    findTreeLayout(vNode.context)
}

function findTreeLayout(vNode) {
    if (!vNode || vNode === document.getElementById('phone')) {
        return
    }
    if (vNode.data && vNode.data.ilm && vNode.data.ilm.t === "tr") {
        for (var i = 0; i < vNode.$children.length; i++) {
            if (i > 0) {
                //vNode.$children[i].data.style = {};
                //Vue.set(vNode.$children[i].$vnode.data.style,'display','');
                //Vue.set(vNode._self._vnode.children[i].data.style,'display','block');
                var sta = vNode._self._vnode.children[i].elm;
                if (sta.style.display === "none") {
                    sta.style.display = ""
                } else {
                    sta.style.display = "none"
                }
                //vNode._self._vnode.children[i].elm.style.display = '';
            }
        }
        return
    }
    if (vNode.el !== document.getElementById('phone')) {
        findTreeLayout(vNode.$parent)
    }
}

/**
 * 一拖 N 布局
 * @param ilm
 * @param children
 * @returns {*}
 */
function createOnePlusNLayoutDom(ilm,children) {
    return h("div", {}, createOnePlusNLayout(ilm, children))
}
function createOnePlusNLayout(lim,children) {
    var cls=[];
    var div_c;
    var count=conChilds.length+domChilds.length;
    var div_p=h("div",{
        class: "w-p-90 h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 dis-flex box-size-bb mg-t-r-2"
    },[]);
    if(count===1){
        div_c=h("div",{
            class: "w-100--p h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 dis-flex box-size-bb"
        });
        div_p.children.push(div_c);
    }else if(count===2){
        if(ilm.atr.colFlex.length!==0){
            for(var i=0;i<count;i++){
                div_c=h("div",{
                    class:"h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        flex:ilm.atr.colFlex[i]
                    }
                });
                div_p.children.push(div_c);
            }
        }else{
            for(var i=0;i<count;i++){
                div_c=h("div",{
                    class:"h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        width: 100 / count + "%"
                    }
                });
                div_p.children.push(div_c);
            }
        }
    }else if(count===3){
        if(ilm.atr.colFlex.length!==0){
            var div1=h("div",{
                class:"h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:ilm.atr.colFlex[0],
                }
            });
            var div2=h("div",{
                class:"h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:12-ilm.atr.colFlex[0],
                }
            },[]);
            var div_c1=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    height:100*(ilm.atr.colFlex[1]/(ilm.atr.colFlex[1]+ilm.atr.colFlex[2]))+"%"
                }
            });
            var div_c2=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    height:100*(ilm.atr.colFlex[2]/(ilm.atr.colFlex[1]+ilm.atr.colFlex[2]))+"%"
                }
            })
            div2.children.push(div_c1);
            div2.children.push(div_c2);
            div_p.children.push(div1);
            div_p.children.push(div2);
        }else{
            var div1=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            });
            var div2=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            },[]);
            for(var i=1;i<count;i++){
                div_c=h("div",{
                    class: "w-100--p h-p-50 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                });
                div2.children.push(div_c);
            }
            div_p.children.push(div1);
            div_p.children.push(div2);
        }
    }else{
        if(ilm.atr.colFlex.length!==0){
            var div1=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:ilm.atr.colFlex[0],
                }
            });
            var div2=h("div",{
                class:"dis-flex box-size-bb bd-all-w-1 bd-all-s-solid bd-all-c-999999 flex-dir-c",
                style:{
                    width:100*((12-ilm.atr.colFlex[0])/12)+"%"
                }
            },[]);
            var div2_1=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:ilm.atr.colFlex[1],
                }
            },[]);
            var div2_2=h("div",{
                class:"dis-flex box-size-bb bd-all-w-1 bd-all-s-solid bd-all-c-999999 ",
                style:{
                    flex:12-ilm.atr.colFlex[1],
                }
            },[]);
            for(var i=2;i<count;i++){
                div_c=h("div",{
                    class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        flex:ilm.atr.colFlex[i],
                    }
                });
                div2_2.children.push(div_c);
            }
            div2.children.push(div2_1);
            div2.children.push(div2_2);
            div_p.children.push(div1);
            div_p.children.push(div2);
        }else{
            var div1=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            });
            var div2=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb dis-flex flex-dir-c",
            },[]);
            var div2_1=h("div",{
                class: "w-100--p h-p-50 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            },[]);
            var div2_2=h("div",{
                class: "w-100--p h-p-50 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb dis-flex",
            },[]);
            for(var i=2;i<count;i++){
                div_c=h("div",{
                    class:"h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        width:100/(count-2)+"%",
                    }
                });
                div2_2.children.push(div_c);
            }
            div2.children.push(div2_1);
            div2.children.push(div2_2);
            div_p.children.push(div1);
            div_p.children.push(div2);
        }
    }
    cls.push(div_p);
    return cls;
}
