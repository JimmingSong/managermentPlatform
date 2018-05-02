// var css;
//动态创建的css绑定
function dynamicCssDomBind1(dom, cssData, conData) {
	if(dom instanceof Array){
		for(var i = 0;i<dom.length;i++){
			var vnode = dom[i];
            if (cssData[i] === undefined) {
                cssData[i] = extendDeep(cssData[i - 1])
            }
			var render = cssData[i];
            // if (render === undefined) {
            // 	render = extendDeep(cssData[i - 1]);
            // }
			bindVnode1(vnode, render, conData);
		}
	} else if (dom !== undefined) {
		//if("class" in dom.data) {
		//	dom.data.class = dom.data.class + cssData.sty.cls;
		//}else {
		//	dom.data.class = cssData.sty.cls;
		//}
		//dynamicCssDomBind(dom.children, cssData.sty.chr, conData);
		if (cssData.sty) {
			bindVnode1(dom, cssData.sty, conData);
		}
	}
	return dom;
}
//为一个虚拟dom对象绑定事件
function bindVnode1(vnode, render, conData) {
	if ("class" in vnode.data) {
		vnode.data.class = vnode.data.class + " " + render.cls;
	} else {
		vnode.data.class = render.cls;
	}
	//设置托拽与设置内部样式事件
	castvNodeEventArray(vnode, "click");
	castvNodeEventArray(vnode, "dblclick");
	vnode.data.on["click"].push(function (e) {
		//判断我的组件是否是操作焦点
		if (conData === phoneShow.play_data) {
			//(阻止冒泡)
			e.preventDefault();
			e.stopPropagation();
			//是 则将我的属性设为编辑对像
			classAndData.clsobj.obj = render;
			classAndData.clsobj.tag = e.target.nodeName;
			classParse.renderStyParse(render);
			//	classParse.parseComponentClassName(render);

			} else {
			//否 不响应事件
			return;
			}
	});
    // vnode.data.on["dblclick"].push(function (e) {
    // 	moveAndStretch(e, render);
    // });

	if (vnode.children !== undefined && render.chr !== undefined) {
		dynamicCssDomBind1(vnode.children, render.chr, conData);
	}
}
//tree的样式绑定
var treeCss,No = 0;
//树待改
function treeCssDomBind1(dom, cssData) {
    if(dom instanceof Array){
        for(var i = 0;i<dom.length;i++){
            if(No === 0){
                treeCss = extendDeep(cssData[i]);
                No++;
			}
            if(No !== 0 && cssData[i] === undefined){
                cssData[i] = treeCss;
            }
            if("class" in dom[i].data) {
                dom[i].data.class = dom[i].data.class+" "+cssData[i].cls;
            }else {
                dom[i].data.class = cssData[i].cls;
            }
            if (dom[i].children !== undefined && cssData[i].chr !== undefined) {
                treeCssDomBind1(dom[i].children, cssData[i].chr);
            }
        }
    }else if(dom !== undefined) {
        if("class" in dom.data) {
            dom.data.class = dom.data.class + " " + cssData.sty.cls;
        }else {
            dom.data.class = cssData.sty.cls;
        }
        treeCssDomBind1(dom.children, cssData.sty.chr);
    }
    return dom
}

let fst, sec, nu = 0;

function dynamicBind(dom, cssData, conData) {
    if (dom instanceof Array) {
        for (var i = 0; i < dom.length; i++) {
            if (cssData.length > dom.length) {
                sec = cssData[cssData.length - 1];
            }
            if (cssData[i] === undefined) {
                cssData[i] = extendDeep(cssData[i - 1]);
            }
            if ("class" in dom[i].data) {
                if (dom.data.domProps && dom.data.domProps.innerHTML.toString() === conData.v) {
                    dom[i].data.class = dom[i].data.class + " " + sec.cls;
                } else {
                    dom[i].data.class = dom[i].data.class + " " + cssData[i].cls;
                }
            } else {
                dom[i].data.class = cssData[i].cls;
            }
            if (dom[i].children !== undefined && cssData[i].chr !== undefined) {
                dynamicBind(dom[i].children, cssData[i].chr, conData);
            }
        }
    } else if (dom !== undefined) {
        if ("class" in dom.data) {
            dom.data.class = dom.data.class + " " + cssData.sty.cls;
        } else {
            dom.data.class = cssData.sty.cls;
        }
        dynamicBind(dom.children, cssData.sty.chr, conData);
    }
    return dom
}

function matchValue(dom, dataV) {
    if (dom === dataV) {

    }
}

function AllCssDomBind1(dom, cssData, conData) {
	if (conData.d.tp === "tree") {
		return treeCssDomBind1(dom, cssData, conData);
    } else if (cssData.k === "d-5") {
        return dynamicBind(dom, cssData, conData.d)
    } else {
		return dynamicCssDomBind1(dom, cssData, conData);
	}
}

