/**
 * 展示页面数据
 * @param pageData
 */
function showPageData(pageData) {
    if (pageData) {
        //整个页面中的css类名解析
        parseAllPageCls(pageData);
        // console.log(parseAllPageCls(pageData));
        phoneShow = getParsePageData(pageData);
    } else {
        phoneShow = {
            ds: {},
            rs: {},
            st: {
                "chr": []
            }
        };
    }
    phoneData.playData = phoneShow;
    phoneData.isShow = false;
    // 将页面数据传入 classAndData.dataTreeData.data 给 数据树 组件使用
    classAndData.dataTreeData.data = phoneShow
}
//切换模式
function switchShowEditMode(mode) {
    if (mode) {
        //从复杂的页面数据中获取赶紧的数据
        var weekPgData = dataTreeParse.weedPageData(phoneData.playData);
        phoneData.lookData = lookPhone = getParsePageData(weekPgData);
        //  lookPhone = phoneData.playData;
        // phoneData.lookData = lookPhone;
        phoneData.isShow = true;
    } else {
        phoneData.isShow = false;
    }
}

function getParsePageData(pageData) {
    var parseData = copyData(pageData);
    //页面数据结构解析
    dataTreeParse.parsePage(parseData);
    return parseData;
}