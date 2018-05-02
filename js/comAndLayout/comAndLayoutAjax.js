/*
   组件模块数据（用于拖拽区域）
 */
function inquireAllComs() {
    var IP = location.host, Port = location.port;
    $.ajax({
        type: "post",
        url: baseUrl + "selectAllCmptObjDrawingValue.action",
        data: "{}",
        sync: false,
        success: function (data) {
            var datas = JSON.parse(data);
            comAndLayout.comDatas.coms = datas;
        },
        error: function (e) {
            alert("请求失败")
        }
    })
}

function inquireAllDataType() {
    var IP = location.host, port = location.port;
    $.ajax({
        type: "post",
        url: baseUrl + "selectAllCmptDataValue.action",
        data: {},
        success: function (data) {
            var datas = JSON.parse(data);
            comAndLayout.comDatas.selDataType = datas;
            var sel = {};
            sel.n = "请选择类型";
            sel.tp = "{}";
            comAndLayout.comDatas.selDataType.unshift(sel);
        },
        error: function (e) {
            alert("请求失败")
        }
    })
}

function inquireComDatasforType(type) {
    if (type === "{}") {
        inquireAllComs()
    } else {
        var IP = location.host, port = location.port;
        $.ajax({
            type: "post",
            url: baseUrl + "selectAllCmptObjDrawingValueByType.action",
            data: type,
            success: function (data) {
                console.log(data);
                var datas = JSON.parse(data);
                comAndLayout.comDatas.coms = datas;
            },
            error: function (e) {
                alert("请求失败")
            }
        })
    }
}

/**
 * 查找所有组件对应的默认渲染数据
 * @param k
 */
function inquireRenderAndData(k) {
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

/**
 * 查询所有字体图标
 */
function inquireIcon() {
    var IP = location.host, port = location.port;
    $.ajax({
        type: "post",
        url: baseUrl + "selectAllIconf_value.action",
        data: {},
        success: function (data) {
            var icons = JSON.parse(data);
            comAndLayout.icon.iconDatas = icons.v;
        },
        error: function () {
            alert("字体图标请求失败")
        }
    })
}

/**
 * 查询单个字体图标
 * @param sIcon
 */
function inquireOneIcon(sIcon) {
    var IP = location.host, port = location.port;
    $.ajax({
        type: "post",
        url: baseUrl + "selectIconf_valueByFuzzyCname.action",
        async: false,
        data: sIcon,
        success: function (data) {
            var icon = JSON.parse(data);
            console.log(data);
            comAndLayout.icon.iconDatas = icon.v;
        },
        error: function (e) {
            alert("单个字体图标请求失败")
        }
    })
}

