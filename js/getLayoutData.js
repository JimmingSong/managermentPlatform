// var layout = {};
// //模板数据格式为{layout:"",style:"",perporty:{},location:{},childs:[]},
// // 其中layout为布局名称，style为样式名称，location 包括宽，高以及具体位置信息，perporty 为布局内部属性值，childs格式同外部。
// // 测试数据 横向 水平 高度100%
// // 容器宽度 = 项目width * 项目个数
// layout.layoutHorData = {
//     layout: 'LinearLayout',
//     style: 'linear',
//     perporty: {
//         direction: 'horizontal',
//         columnWidth: 200
//     },
//     location: {
//         height: 500
//     },
//     // 子组件数组
//     childs: [{}, {}, {}, {}]
// };
// // 测试数据 纵向 垂直 宽度100%
// layout.layoutVerData = {
//     layout: 'LinearLayout',
//     style: 'linear',
//     perporty: {
//         direction: 'vertical',
//         columnWidth: 100
//     },
//     location: {
//         width: 400
//     },
//     childs: [{}, {}, {}, {}]
// };
//
// // 测试数据 网格布局
// layout.layoutGridData = {
//     layout: 'GridLayout',
//     style: 'grid',
//     perporty: {
//         direction: 'grid',
//         colNum: 4,
//         rowNum: 3,
//         itemMargin: 1
//     },
//     location: {
//         // 默认item的width和height 后面可以动态调整
//         width: 400,
//         height: 300
//     }
// }
//
// // // 测试数据 栏格布局
// layout.layoutColumnData = {
//     layout: 'GridLayout',
//     style: 'column',
//     perporty: {
//         direction: 'column',
//         colNum: 3,
//         colFlex: ['auto', '20', '40']
//     },
//     location: {
//         width: 500
//     },
//     childs: []
// }
//
// // // 测试数据 通栏布局
// layout.layoutSingleData = {
//     layout: 'SingleLayout',
//     style: 'single',
//     perporty: {
//         // 这个是 栏高 也就是 容器的高度
//         width: 300
//     },
//     location: {
//         width: 500,
//         height: 400
//     },
//     childs: {}
// }
//
// // 测试数据 一拖N布局
// layout.layoutOnePlusNLayout = function(layoutNum) {
//     return onePlusNLayoutArr[layoutNum];
// }
// var onePlusNLayoutArr = [{
//     layout: 'OnePlusNLayout',
//     style: 'oneplusn',
//     perporty: {
//         percent: 0,
//         rowPercent: 'auto',
//         colPercent: 'auto'
//     },
//     location: {},
//     childs: {}
// }, {
//     layout: 'OnePlusNLayout',
//     style: 'oneplusn',
//     perporty: {
//         percent: 1,
//         rowPercent: 'auto',
//         colPercent: 'auto'
//     },
//     location: {},
//     childs: {}
// }, {
//     layout: 'OnePlusNLayout',
//     style: 'oneplusn',
//     perporty: {
//         percent: 2,
//         rowPercent: 'auto',
//         colPercent: 'auto'
//     },
//     location: {},
//     childs: {}
// }, {
//     layout: 'OnePlusNLayout',
//     style: 'oneplusn',
//     perporty: {
//         percent: 3,
//         rowPercent: 'auto',
//         colPercent: 'auto'
//     },
//     location: {},
//     childs: {}
// }, {
//     layout: 'OnePlusNLayout',
//     style: 'oneplusn',
//     perporty: {
//         percent: 4,
//         rowPercent: 'auto',
//         colPercent: 'auto'
//     },
//     location: {},
//     childs: {}
// }]

// layout.layoutOnePlusNLayoutArr = [].concat(onePlusNLayoutArr);

function getLayoutData(tp) {
    switch (tp) {
        case "df":
            return {
                "t": "",
                "atr": ""
            };
            break;
        case "ll":
            return {
                "t": 'll',
                "atr":"horizontal"
            };
            break;
        case "gl":
            return {
                "t": 'gl',
                "atr": {
                    "row": 0,
                    "col": 0
                }
            };
            break;
        case "cl":
            return {
                "t": 'cl',
                "atr": {
                    // colNum:4,
                    "colFlex": []
                }
            };
            break;
        case "sl":
            return {
                "t": 'sl',
                "atr": {}
            };
            break;
        case "opl":
            return {
                "t": 'opl',
                "atr": {
                    "percent": []
                }
            };
            break;
        case "tr":
            return {
                "t": "tr",
                "atr": {}
            };
            break;
        case "con":
            return  {
                "sty": {"cls": "ih-1--r bw-1--x bs-s bdc-aaaaaa"},
                "index": {
                    "ri": {}
                },
                "chr": []
            }
    }
}