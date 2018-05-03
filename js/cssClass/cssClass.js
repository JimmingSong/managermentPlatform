
// ----------------------------------------------------------------------
// 数据树 所使用的函数
// 鼠标右键事件 页面
function rightClickFramePage(e, pageData){
    e.preventDefault();
    // classAndData.dataTreeData.rightFrameData.top = e.of
    classAndData.dataTreeData.rightFrameData.currType = '页面'
    classAndData.dataTreeData.rightFrameData.isShow = true
    // classAndData.dataTreeData.rightFrameData.currData = pageData
    Vue.set(classAndData.dataTreeData.rightFrameData, 'currData', pageData)
    classAndData.dataTreeData.pageDataUpdate.isShow = false
    classAndData.dataTreeData.sectionDataUpdata.isShow = false
    classAndData.dataTreeData.sectionListUpdate.isShow = false
    classAndData.dataTreeData.compListUpdate.isShow = false
}
// 鼠标右键事件 段
function rightClickFrameSection(e, sectionData) {
    e.preventDefault()
    classAndData.dataTreeData.rightFrameData.currType = '段'
    classAndData.dataTreeData.rightFrameData.isShow = true
    // 同步数据到 右键事件暂存区
    // 当 allData 存在时为 页面层 右键弹框
    // classAndData.dataTreeData.rightFrameData.currData = sectionData
    Vue.set(classAndData.dataTreeData.rightFrameData, 'currData', sectionData)
    classAndData.dataTreeData.pageDataUpdate.isShow = false
    classAndData.dataTreeData.sectionDataUpdata.isShow = false
    classAndData.dataTreeData.sectionListUpdate.isShow = false
    classAndData.dataTreeData.compListUpdate.isShow = false
}
/**
 * 右键弹框处理函数 根据 当前右键目标 & 菜单点击项 控制后续弹框及数据初始化
 * @parem {String} 当前点击的邮件菜单项
 */
function rightClickControl(optionStr) {
    classAndData.dataTreeData.rightFrameData.isShow = false
    if(classAndData.dataTreeData.rightFrameData.currType === '页面') {
        if (optionStr === 'update') {
            initPageDataFrame()
        } else {
            initSectionListFrame()
        }
    } else {
        if (optionStr === 'update') {
            initSectionDataFrame()
        } else {
            initCompListFrame()
        }
    }
}
/**
 * 显示 页面层数据 编辑框
 */
function initPageDataFrame() {
    //
    analyticPageData()
    classAndData.dataTreeData.pageDataUpdate.isShow = true
}
/**
 * 显示 段数据 编辑框
 */
function initSectionDataFrame() {
    //
    analyticSectionData()
    classAndData.dataTreeData.sectionDataUpdata.isShow = true
}
/**
 * 显示 段列表 编辑框
 */
function initSectionListFrame() {
    //
    // classAndData.dataTreeData.sectionListUpdate.arr = classAndData.dataTreeData.rightFrameData.currData.values
    Vue.set(classAndData.dataTreeData.sectionListUpdate, 'arr', classAndData.dataTreeData.rightFrameData.currData.values)
    classAndData.dataTreeData.sectionListUpdate.isShow = true
}
/**
 * 显示 组件列表 编辑框
 */
function initCompListFrame() {
    //
    // classAndData.dataTreeData.compListUpdate.arr = classAndData.dataTreeData.rightFrameData.currData.values
    Vue.set(classAndData.dataTreeData.compListUpdate, 'arr', classAndData.dataTreeData.rightFrameData.currData.values)
    classAndData.dataTreeData.compListUpdate.isShow = true
}
/**
 * 数组元素换位函数
 */
function swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
}
function swapUp(arr, index) {
    if (index > 0) {
        swapItems(arr, index, index-1)
    }
}
function swapDown(arr, index) {
    if (index < arr.length-1) {
        swapItems(arr, index, index+1)
    }
}
// 解析页面数据
function analyticPageData() {
    var o = {}
    for(var key in classAndData.dataTreeData.data) {
        if (key !== 'ds' && key !== 'rs' && key !== 'st') {
            o[key] = classAndData.dataTreeData.data[key]
        }
    }
    classAndData.dataTreeData.pageDataUpdate.str = JSON.stringify(o, null, 4)
}
// 保存页面数据
function savePageData() {
    try {
        var o = JSON.parse(classAndData.dataTreeData.pageDataUpdate.str)
    } catch (error) {
        console.error(error)
        return false
    }
    for(var key in o) {
        classAndData.dataTreeData.data[key] = o[key]
    }
    return true
}
// 解析段数据
function analyticSectionData() {
    var o = {}
    for(var key in classAndData.dataTreeData.rightFrameData.currData) {
        if(key !== 'values') {
            o[key] = classAndData.dataTreeData.rightFrameData.currData[key]
        }
    }
    classAndData.dataTreeData.sectionDataUpdata.str = JSON.stringify(o, null, 4)
}
// 保存段数据
function saveSectionData() {
    try{
        var o = JSON.parse(classAndData.dataTreeData.sectionDataUpdata.str)
    } catch (error) {
        console.error(error)
        return false
    }
    for(var key in o) {
        classAndData.dataTreeData.rightFrameData.currData[key] = o[key]
    }
    return true
}
// --------------------------------------------------------------------------

//按钮和input框中正则匹配数字
function keyPress(ob) {
    if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value; else ob.t_value = ob.value;
    if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
}

function keyUp(ob) {
    if (!ob.value.match(/^[\+\-]?\d*?\.?\d*?$/)) ob.value = ob.t_value; else ob.t_value = ob.value;
    if (ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = ob.value;
}

function onBlur(ob) {
    if (!ob.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/)) ob.value = ob.o_value; else {
        if (ob.value.match(/^\.\d+$/)) ob.value = 0 + ob.value;
        if (ob.value.match(/^\.$/)) ob.value = 0;
        ob.o_value = ob.value
    }
}

/**
 * 展示交互添加的样式类
 * @param h
 * @param data
 * @returns {*}
 */
function showClsTreeView(h,data){
    if (data !== null) {
        var li_views = [],name = [];
        var clsArr = stringToArray(data.cls);
        clsArr.forEach(function (item,index) {
            if(item !== ''){
                name.push(
                    h("span", {
                        domProps: {
                            innerHTML:item
                        }
                    }),
                    h("i",{
                        class:"iconfont",
                        domProps:{
                            innerHTML:"&#xe63a;"
                        },
                        on:{
                            click:function () {
                                clsArr.splice(index,1);
                                data.cls = arrayToString(clsArr)
                            }
                        }
                    })
                )
            }else{
                name.push(
                    h("span", {
                        domProps: {
                            innerHTML:"空"
                        }
                    })
                )
            }
        });
        li_views.push(name);
        if (data !== null && data.chr !== undefined) {
            if ('chr' in data && data.chr.length > 0) {
                var itemChildren = data.chr.map(function (item, index) {
                    return showClsTreeView(h,item);
                });
            }
        }
        li_views.push(itemChildren);
    }
    return h("div",
        {
            style:{
                marginLeft:"0.5rem",
                fontSize:"0.4rem"
            }
        }, li_views);
}

function showBorderDetail(direction, cls) {
    for (var item of cls) {
        let clsHead = item.split("-")[0];
        let value = item.split("-")[1];
        switch (clsHead) {
            case direction + "w":
                classAndData.cls.numValue.bwd.value = item.split("--")[0].split("-")[1];
                classAndData.cls.numValue.bwd.unit = item.split("--")[1];
                break;
            case direction + "c":
                classAndData.cls.numValue.bdc = "#" + value;
                break;
            case direction + "s":
                classAndData.cls.numValue.bsd = value;
                break;
            default:
                classAndData.cls.numValue.bwd.value = 0;
                classAndData.cls.numValue.bwd.unit = "r";
                classAndData.cls.numValue.bdc = "#000000";
                classAndData.cls.numValue.bsd = "s";
        }
    }
}