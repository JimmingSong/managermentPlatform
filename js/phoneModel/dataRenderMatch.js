/**
 *
 * @param data  待匹配渲染规则的 数据对象
 * @param index 当前匹配 数据对象在其数组的索引
 * @param ri_datas 总渲染数据
 * @returns {*} 匹配的渲染对象
 */
function getComRenderObj(data, index, ri_datas) {
    if ((!ri_datas[data.tp]) || (!ri_datas[data.tp].d) || (ri_datas[data.tp].d.length === 0)) {
        var tps = data.tp;
        var newR;
        $.ajax({
            type: "post",
            url: baseUrl + "selectAllCmptObjDrawingTypeAndStyByType.action",
            data: tps+"-df",
            async: false,
            success: function (rdata) {
                newR = JSON.parse(rdata);
            },
            error: function () {
                alert("默认样式数据请求失败")
            }
        });
        var id = addRenderObjInRS(newR.v);
        ri_datas[tps] = {};
        ri_datas[tps].d = [];
        ri_datas[tps].d.push(id);
        return id;
    }
    //删除容器中的渲染规则 取用默认规则（目前渲染规则有错误）
    //if(ri_datas[data.tp].rls && ri_datas[data.tp].rls.length !== 0 ){
    //    ri_datas[data.tp].rls.length = 0;
    //}
    //如果没有渲染规则 依次取
    if (!ri_datas[data.tp].rls || ri_datas[data.tp].rls.length === 0) {
        return ri_datas[data.tp].d[0]
    }
    //当前容器中的index 下的 ri 中的数据
    var ren = ri_datas[data.tp];
    //渲染规则的 类型 tp
    var ruleTp;
    //取的第几个 渲染规则
    var renValue;
    //如果数据中没有rl指定第几种渲染规则 默认去第一个 坐标为 0
    if (ren.rls && ren.rls.length > 0) {
        var rule = data.rl;
        if (rule >= ren.rls.length || rule === undefined) {
            rule = 0;
        }
        renValue = ren.rls[rule];
        ruleTp = renValue.tp;
    } else {
        ruleTp = "order1";
        renValue = {isLoop: 1};
    }
    //判断渲染对象的 tp 取对应的渲染id
    switch (ruleTp) {
        // order1 顺序匹配1 和当前元素不同tp的也参与匹配
        case "order1":
            var renD = [];
            scope = renValue.scope;
            if (Array.isArray(scope)) {
                scope.forEach(function (item) {
                    renD.push(ren.d[item]);
                })
            } else if (scope instanceof Object && "start" in scope && "end" in scope) {
                renD = ren.d.slice(scope.start, scope.end);
                if (renD === undefined) {
                    renD = [];
                }
            } else {
                renD = ren.d;
            }
            var renDLength = renD.length;
            if (renValue.isLoop === 0) {
                if (index >= renDLength) {
                    return null;
                } else {
                    return renD[index];
                }
            }
            return loopMatching(renD, index, renValue.isReciprocate);
            break;
        // 顺序匹配2 和当前元素不同tp的认为不参与匹配 需要先计算当前元素之前有多少同tp的元素
        case "order2":
            //存储 当前容器中 当前组件类型的所有渲染对象
            var renD = [];
            scope = renValue.scope;
            if (Array.isArray(scope)) {
                scope.forEach(function (item) {
                    renD.push(ren.d[item]);
                })
            } else if (scope instanceof Object && "start" in scope && "end" in scope) {
                renD = ren.d.slice(scope.start, scope.end);
                if (renD === undefined) {
                    renD = [];
                }
            } else {
                renD = ren.d;
            }
            var renDLength = renD.length;
            tp = data.tp;
            // 遍历给每个 tp 为 order2 的对象 同步修改属性 counts
            ren.rls.forEach(function (item) {
                if (item.tp === "order1" || item.tp === "order2") {
                    if (item.hasOwnProperty('count')) {
                        item.count.num++;
                    } else {
                        item.count = {
                            num: 0
                        }
                    }
                }
            });
            if (renValue.isLoop === 0) {
                if (renValue.count >= renDLength) {
                    return null;
                } else {
                    return renD[renValue.count];
                }
            }
            return loopMatching(renD, renValue.count.num, renValue.isReciprocate);
            // return loopMatching(renD, 0, renValue.isReciprocate)
            break;
        // 条件if 判断条件以String保存在渲染里 用 eval 运行
        case "ifChoice":
            var otherObj = ren.rls[rule].other,
                dataObj = data;
            var tVar = otherObj.slice(0, otherObj.indexOf('.'));
            eval("var " + tVar + " = dataObj");
            if (eval(otherObj)) {
                return ren.d[ren.rls[rule].resultTrue];
            } else {
                return ren.d[ren.rls[rule].resultFalse];
            }
            break;
        // 条件switch
        case "switchChoice":
            var dataT = data;
            var renT = ri_datas[dataT.tp];
            var ruleT = ren.rls[dataT.rl];
            var varNameT = ruleT.other.slice(0, ruleT.other.indexOf("."));
            eval("var " + varNameT + " = dataT");
            var renIndexObj = ruleT.resultMap.find(function (item) {
                return item.rls === eval(ruleT.other);
            })
            var i = 0;
            if (renIndexObj) {
                i = renIndexObj.index;
            }
            var renObj = renT.d[i];
            return renObj;
            break;
        default:
            console.error("marchData函数执行出现异常 当前渲染规则的类型为", ruleTp);
            break;
    }
}

/**
 * @method loopMatching
 * @param renArr 待匹配的 渲染对象数组
 * @param index 匹配索引
 * @param isReciprocate 是否开启往复匹配 1为开启 0为关闭
 * @returns {Object} 在 渲染对象数组 中唯一对应的元素
 */
function loopMatching(renArr, index, isReciprocate) {
    if (isReciprocate === 1) {
        var renArrLength = renArr.length - 1;
        if (Math.floor(index / renArrLength) % 2 === 1) {
            return renArr[renArrLength - index % renArrLength];
        } else {
            return renArr[index % renArrLength];
        }
    } else {
        index = index >= renArr.length ? index % renArr.length : index;
        return renArr[index];
    }
}
/**
 * 查找所有组件对应的默认渲染数据
 * @param k
 */
function inquireRender(k) {
    var IP = location.host, port = location.port;
    $.ajax({
        type: "post",
        url: baseUrl + "selectAllCmptObjDrawingTypeAndStyByType.action",
        data: k,
        async: false,
        success: function (data) {
            console.log(data);
            var datas = JSON.parse(data);
            comAndLayout.dragTemnpData = datas;
        },
        error: function () {
            alert("默认样式数据请求失败")
        }
    })
}
