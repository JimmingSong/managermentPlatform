/**
 * 为一个虚拟dom设置数据交互事件
 * @param es
 * @param data
 * @param vNode
 */
function setDataEvent(es, data, vNode) {
    if (!es) {
        return
    }
    var addItemEvent = function (type, event) {
        if (Object.prototype.toString.call(event) === '[object Function]') {
            vNode.data.on[type.k].push(event);
        } else {
            var fun = function (e) {
                obj = e;
                fuhaothis = data;
                window.event ? window.event.cancelBubble = true : e.stopPropagation();
                sendCommandToAndroid(type.v);
            };
            vNode.data.on[type.k].push(fun);
        }
    };
    es.forEach(
        function (item) {
            castvNodeEventArray(vNode, item.k);
            //item中v的类型
            var valueType = Object.prototype.toString.call(item.v);
            if (valueType === '[object Array]') {
                item.v.forEach(function (it) {
                    addItemEvent(item, it);
                })
            } else {
                addItemEvent(item, item.v);
            }
        }
    );
}

/**
 * 为一个虚拟dom设置样式交互事件
 * @param eventData
 * @param vNode
 */
var clickNumber = 0;
function setStyleEvent(eventData, vNode) {
    for (var eventType in eventData) {
        castvNodeEventArray(vNode, eventType);
        var stylefuns = [];
        eventData[eventType].forEach(function (item) {
            if (eventType === "mousedown") {
                stylefuns.push(function (e) {
                    let time = setTimeout(function () {
                        if (!item.tg || item.v) {
                            eval(item.v)
                        } else {
                            triggerStyleFunc(item.tg, item.bh, e, item);
                        }
                    }, 1000);
                    e.target.onmouseout = function (e) {
                        clearTimeout(time)
                    };
                    e.target.onmouseup = function (e) {
                        clearTimeout(time)
                    };
                });
            } else {
                stylefuns.push(function (e) {
                    if (!item.tg || item.v) {
                        eval(item.v)
                    } else {
                        triggerStyleFunc(item.tg, item.bh, e, item);
                    }
                });
            }
        });
        vNode.data.on[eventType] = vNode.data.on[eventType].concat(stylefuns);
    }
}

/**
 * 触发样式交互事件
 * @param target
 * @param behavier
 * @param e
 * @param item
 */
function triggerStyleFunc(target, behavier, e, item) {
    if (behavier === undefined) {
        return;
    }
    var targetData;
    //获取目标对象并判断目标对象类型
    if (target.indexOf(",") !== -1) {
        targetData = getContainerData(target);
    } else {
        targetData = lookPhone.rs[target];
    }

    if (behavier.s && behavier.s.length > 0) {
        //样式循环展示
        if (clickNumber > behavier.s.length - 1) {
            clickNumber = 0
        }
        parseRenderObj(behavier.s[clickNumber]);
        if(behavier.t){
            Vue.set(targetData, "sty", behavier.s[clickNumber]);
            // classNameMixture(targetData.sty,behavier.sty)
        }else{
            var obj = {};
            classNameMixture(obj, targetData.sty, behavier.s[clickNumber]);
            // mixComponetStyle(targetData.sty, behavier.sty);
            Vue.set(targetData,"sty",obj)
        }
        // classNameMixture(e.target,targetData.sty, behavier.sty)
        clickNumber++;
        }
    if (behavier.p) {
        //设置属性
        for (var i in behavier.p) {
            if(i === "display"){
                if(!targetData.style){
                    Vue.set(targetData,"style",{});
                }
                if (behavier.p[i].indexOf("|") > 0 && behavier.p[i].split("|")[1] && targetData.style.display && targetData.style.display !== behavier.p[i].split("|")[1]) {
                    targetData.style[i] = behavier.p[i].split("|")[1];
                }else{
                    Vue.set(targetData.style,i,behavier.p[i].split("|")[0] || behavier.p[i])
                }
            }else{
                if (!targetData.attrs) {
                    Vue.set(targetData, "attrs", {});
                }
                if (behavier.p[i].indexOf("|") > 0 && behavier.p[i].split("|")[1] && targetData.attrs[i] && targetData.attrs[i] !== behavier.p[i].split("|")[1]) {
                    targetData.attrs[i] = behavier.p[i].split("|")[1];
                }else{
                    Vue.set(targetData.attrs,i,behavier.p[i].split("|")[0] || behavier.p[i])
                }
                // targetData.attrs[i] = behavier.p[i];
            }
        }
    }
    if (behavier.v) {
        eval(behavier.v)
    }
}
function classNameMixture(obj,oldCls,newCls) {
    var depOldCls = extendDeep(oldCls);
    var depNewCls = extendDeep(newCls);
    var mixCls = mixStyleStr(depOldCls.cls, depNewCls.cls);
    deleteHadData(newCls,oldCls);
    //Vue.set(obj,"cls",oldCls.cls + " "+newCls.cls=== " "?"":oldCls.cls + " "+newCls.cls);
    Vue.set(obj, "cls", mixCls);
    // obj.cls = oldCls.cls + " "+newCls.cls=== " "?"":oldCls.cls + " "+newCls.cls;
    if (depOldCls.es) {
        obj.es = depOldCls.es
    }
    if(oldCls.chr && oldCls.chr.length > 0){
        obj.chr = [];
        for(var i = 0;i<oldCls.chr.length;i++){
            obj.chr[i] = {};
            classNameMixture(obj.chr[i],oldCls.chr[i],newCls.chr[i])
        }
    }
}
/**
 * 根据结构树位置信息取得容器数据
 * @param index
 * @returns {{chr: Array}|lookPhone.st|{chr}}
 */
function getContainerData(index) {
    var array = index.split(",");
    var data = lookPhone.st;
    for (var i in array) {
        data = data.chr[array[i]];
    }
    return data;
}

/**
 * 设置一个vNode中的事件为一个数组
 * @param vNode
 * @param type
 */
function castvNodeEventArray(vNode, type) {
    if (!vNode.data.on) {
        vNode.data.on = {};
    }
    if (!vNode.data.on[type]) {
        vNode.data.on[type] = [];
    }
    if (Object.prototype.toString.call(vNode.data.on[type]) === '[object Function]') {
        var func = vNode.data.on[type];
        vNode.data.on[type] = [func];
    }

}