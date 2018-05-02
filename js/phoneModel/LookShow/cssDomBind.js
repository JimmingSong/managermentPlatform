/**
 * 动态创建的css绑定
 * @param dom
 * @param cssData
 * @param conData
 * @returns {*}
 */
function dynamicCssDomBind(dom, cssData, conData) {
    if (dom instanceof Array) {
        for (var i = 0; i < dom.length; i++) {
            var vnode = dom[i];
            var render = cssData[i];
            if (render === undefined) {
                render = extendDeep(cssData[i - 1]);
            }
            bindVnode(vnode, render, conData)
        }
    } else if (dom !== undefined) {
        //if("class" in dom.data) {
        //	dom.data.class = dom.data.class + cssData.sty.cls;
        //}else {
        //	dom.data.class = cssData.sty.cls;
        //}
        //dynamicCssDomBind(dom.children, cssData.sty.chr, conData);
        if (cssData.sty) {
            bindVnode(dom, cssData.sty, conData);
        }
    }
    return dom;
}

/**
 * 为一个虚拟dom对象绑定事件
 * @param vnode
 * @param render
 * @param conData
 */
function bindVnode(vnode, render, conData) {
    if (render === undefined) {
        render = extendDeep(cssData[i - 1]);
    }
    if ("class" in vnode.data) {
        vnode.data.class = vnode.data.class + " " + render.cls;
    } else {
        vnode.data.class = render.cls;
    }
    //解析设置样式交互事件
    if (render.es) {
        setStyleEvent(render.es, vnode);
    }
    if (vnode.children !== undefined && render.chr !== undefined) {
        dynamicCssDomBind(vnode.children, render.chr, conData);
    }
}
//tree的样式绑定
var treeCss, No = 0;
//树待改
function treeCssDomBind(dom, data, cssData) {
    if (dom instanceof Array) {
        for (var i = 0; i < dom.length; i++) {
            if (No === 0) {
                treeCss = extendDeep(cssData[i]);
                No++;
            }
            if (No !== 0 && cssData[i] === undefined) {
                cssData[i] = treeCss;
            }
            if ("class" in dom[i].data) {
                dom[i].data.class = dom[i].data.class + " " + cssData[i].cls;
            } else {
                dom[i].data.class = cssData[i].cls;
            }
            if (dom[i].children !== undefined && cssData[i].children !== undefined) {
                treeCssDomBind(dom[i].children, data, cssData[i].children);
            }
        }
    } else if (dom !== undefined) {
        if ("class" in dom.data) {
            dom.data.class = dom.data.class + " " + cssData.cls + " " + data.cls.lo;
        } else {
            dom.data.class = cssData.cls + " " + data.cls.lo;
        }
        treeCssDomBind(dom.children, data, cssData.children);
    }
    return dom
}

function AllCssDomBind(dom, cssData, conData) {
    if (cssData.tp === "tree") {
        return treeCssDomBind(dom, cssData, conData);
    } else {
        return dynamicCssDomBind(dom, cssData, conData);
    }
}

