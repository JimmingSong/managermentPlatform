/**
 * 模拟的页面数据
 */

function getData() {
    var pageData = {
        "id":"",
        "type":"",
        "name":"",
        "es":[],
        "a":"",
        "con":"",
        "r":"d1",
        "values":[
            {
                "name":"",
                "es":["a"],
                "a":"",
                "r":"d2",
                "values":[
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d2"},
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d3"},
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d2"}
                ]
            },
            {
                "name":"",
                "es":["d9"],
                "a":"",
                "r":"d2",
                "values":[
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d3"},
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d3"},
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d2"}
                ]
            },
            {
                "name":"",
                "es":["d45"],
                "a":"",
                "r":"d41",
                "values":[
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d3"},
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d3"},
                    // {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"css":"","lo":"","dom":""},"r":"d2"}
                ]
            }
        ]
    };
    return pageData;
}


/**
 * 渲染树 数据
 * @returns {{id: string, lo: string, css: string, ilm: {tp: string, atr: string}, es: Array, chr: [null]}}
 */
function  getCssData1() {
    var cssTree = {
        "id":"d1",
        "lo":"dis-flex flex-js-center w-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-aaaaaa h-r-7",
        "css":"",
        "ilm":{
            "tp":"",
            "atr":""
        },
        "es":[],
        "chr":[
            {
                "id":"d2",
                "lo":"w-p-80 bd-all-w-1 bd-all-s-solid bd-all-c-aaaaaa h-r-7",
                "css":"",
                "ilm":{
                    "tp":"",
                    "atr":""
                },
                "es":[],
                "chr":[
                    {
                        "id":"d9",
                        "lo":"w-p-80 bd-all-w-1 bd-all-s-solid bd-all-c-aaaaaa h-r-7",
                        "css":"",
                        "ilm":{
                            "tp":"",
                            "atr":""
                        },
                        "es":[],
                        "chr":[

                        ]
                    },
                ]
            }
        ]
    };
    // for(var i = 0;i < 10;i++){
    //     cssTree.chr.push(
    //         {
    //             "id":"d"+i,
    //             "lo":"dis-flex flex-js-center w-p-45 h-r-1 bd-all-w-1 bd-all-s-solid bd-all-c-aaaaaa",
    //             "css":"",
    //             "ilm":{
    //                 "tp":"",
    //                 "atr":""
    //             },
    //             "es":[],
    //             "chr":[]
    //         }
    //     )
    // }
    return cssTree;
}

/*
   左边展示id的数据
 */
var idList = {
    t:"项目名称",
    id:["项目ID1","项目ID2","项目ID3","项目ID4","项目ID5","项目ID6","项目ID7","项目ID8","项目ID9"]
};
/*
 *组件/布局/模板对象数据
 */
/*
   组件模块数据（用于拖拽区域）
 */
//存放组件Icon数据
function getComData(){
    var data=[
        {"k":"&#xe65a;","v":"","n":"el"},{"k":"img","v":"","n":"img"},{"k":"tx","v":"","n":"tx"},{"k":"ta","v":"","n":"ta"},{"k":"cf","v":"","n":"cf"},{"k":"s","v":"","n":"s"},{"k":"btn","v":"","n":"btn"},{"k":"d","v":"","n":"d"},{"k":"tm","v":"","n":"tm"},{"k":"kv","v":"","n":"kv"},{"k":"pop","v":"","n":"pop"},{"k":"td","v":"","n":"td"},{"k":"dt","v":"","n":"dt"},{"k":"cht","v":"","n":"cht"},{"k":"gi","v":"","n":"gi"},{"k":"r","v":"","n":"r"},{"k":"c","v":"","n":"c"},{"k":"gp","v":"","n":"gp"},{"k":"tree","v":"","n":"tree"},{"k":"nav","v":"","n":"nav"},{"k":"li","v":"","n":"li"},{"k":"ct","v":"","n":"ct"},{"k":"cd","v":"","n":"cd"},{"k":"ev","v":"","n":"ev"},{"k":"vid","v":"","n":"vid"},{"k":"sd","v":"","n":"sd"},{"k":"st","v":"","n":"st"},{"k":"sdt","v":"","n":"sdt"},{"k":"sl","v":"","n":"sl"},{"k":"vc","v":"","n":"vc"},{"k":"ci","v":"","n":"ci"},{"k":"hd","v":"","n":"hd"},{"k":"m","v":"","n":"m"}
    ];
    return data;
}
function getLayData(){
    var data=[{"k":"ll","v":"","n":"ll"},{"k":"gl","v":"","n":"gl"},{"k":"cl","v":"","n":"cl"},{"k":"sl","v":"","n":"sl"},{"k":"opl","v":"","n":"opl"}];
    return data;
}
var comAndLayout = {
    comIsShow:true,
    layoutIsShow:false,
    modelMIsShow:false,
    com:"组件展示",
    layout:"布局",
    model:"模板",
    layoutData:{
        lay:getLayData(),
        layData: getLayoutData(),
    },
    comDatas:{
        com:getComData(),
        componentData:getDatas(),
        // componentDom:"",
        componentCss:getCssData(),
    }
};
/*
*展示尺寸选择
 */
var showSize = {
    size:[
        {"name":"苹果6","size":{"x":"750"}},
        {"name":"电脑","size":{"x":"2600"}},
        {"name":"苹果5","size":{"x":"640"}},
        {"name":"苹果6Plus","size":{"x":"1080"}},
        {"name":"华为Nexus 6P","size":{"x":"1440"}},
        {"name":"华为meta7 青春版","size":{"x":"720"}}
        ],
    showSize:"750",
    phoneType:"苹果6"
};
/*
 展示区域数据
 */
var phoneShow = {
    datalist: getData(),
    cssdata: getCssData1(),
    // classdata:getCssData()
};
/*
展示区放大或缩小选择
 */
var bigAndSmall = {
    size:"100",
    baseWdSize:"500",
    baseHgSize:"892",
};
/*
   属性 / 数据 / 交互
 */
var classAndData = {
    clsIsShow:true,
    dataIsShow:false,
    handleIsShow:false,
    cls:{
        baseIsShow:true,
        moseIsShow:false,
        extensionIsShow:false,
        animationIsShow:false,
        clsName:{},
        clsValue:{},
        numValue:{
            wd: {
                name:"w",
                value: 0
            },
            wUnit:"r",
            opUnit:[{
                "n":"rem",
                "v":"r"
            },{
                "n":"百分比",
                "v":"p"
            },{
                "n":"像素",
                "v":"x"
            }],
            hd:{
                name:"h",
                value:0
            },
            hUnit:"r",
            fsd:{
                name:"fs",
                value:0
            },
            f:"f",
            fw:"fw",
            ft:"ft",
            tl:"tl",
            ta:"ta",
            fsUnit:"r",
            ffd:"宋体",
            opFf:[{
                "n":"宋体",
                "v":"宋体"
            },{
                "n":"楷体",
                "v":"楷体"
            },{
                "n":"微软雅黑",
                "v":"Light"
            },{
                "n":"草书",
                "v":"草书"
            }],
            c:"#FFFFFF",
            bc:"#FFFFFF",
            bdc:"#FFFFFF",
            oc:"#FFFFFF",
            tsc:"#FFFFFF",
            od:{
                value:0,
            },
            dd:"b",
            fType:[{
                "n":"块级元素",
                "v":"b"
            },{
                "n":"行内块级元素",
                "v":"ib"
            },{
                "n":"flex",
                "v":"f"
            },{
                "n":"inline-flex",
                "v":"if"
            },{
                "n":"tabel",
                "v":"t"
            },{
                "n":"none",
                "v":"n"
            }],
            tbd:{
                name:"tb",
                value:0
            },
            tbUnit:"r",
            lrUnit:"r",
            lrd:{
                name:"lr",
                value:0
            },
            pd:"s",
            pos:[{
                "n":"默认",
                "v":"s"
            },{
                "n":"固定定位",
                "v":"a"
            },{
                "n":"相对定位",
                "v":"r"
            },{
                "n":"绝对定位",
                "v":"f"
            }],
            pospoint:"tl",
            posP:[{
                "n":"左上",
                "v":"tl",
            },{
                "n":"左下",
                "v":"bl",
            },{
                "n":"右上",
                "v":"tr",
            },{
                "n":"右下",
                "v":"br",
            }],
            md:{
                name:"m",
                value:0
            },
            selMarPad:"margin",
            marPad:[{
                "n":"外边距",
                "v":"margin"
            },{
                "n":"内边距",
                "v":"padding"
            }],
            marginPadding:"m",
            margin:[{
                "n":"全部外边距",
                "v":"m"
            },{
                "n":"上外边距",
                "v":"mt"
            },{
                "n":"下外边距",
                "v":"mb"
            },{
                "n":"左外边距",
                "v":"ml"
            },{
                "n":"右外边距",
                "v":"mr"
            }],

            mUnit:"r",
            bwd:{
                name:"bw",
                value:0
            },
            bwUnit:"r",
            selBord:"b",
            border:[{
                "n":"全部",
                "v":"b"
            },{
                "n":"左边框",
                "v":"bl"
            },{
                "n":"右边框",
                "v":"br"
            },{
                "n":"上边框",
                "v":"bt"
            },{
                "n":"下边框",
                "v":"bb"
            }],
            bsd:"s",
            borSty:[{
                "n":"实线",
                "v":"s"
            },{
                "n":"双实线",
                "v":"do"
            },{
                "n":"小线段",
                "v":"da"
            },{
                "n":"点线",
                "v":"dt"
            },{
                "n":"groove",
                "v":"g"
            },{
                "n":"rigde",
                "v":"r"
            },{
                "n":"inset",
                "v":"i"
            },{
                "n":"hidden",
                "v":"h"
            },{
                "n":"outset",
                "v":"ou"
            },{
                "n":"不设置",
                "v":"none"
            }],
            brd:{
                name:"br",
                value:0
            },
            selBorRad:"br",
            borRad:[{
                "n":"全部",
                "v":"br"
            },{
                "n":"左上圆角",
                "v":"blt"
            },{
                "n":"右上圆角",
                "v":"brt"
            },{
                "n":"左下圆角",
                "v":"blb"
            },{
                "n":"右下圆角",
                "v":"brb"
            }],
            brUnit:"r",
            fdMax:{
                name:"fg",
                value:0
            },
            fdMin:{
                name:"fsh",
                value:0
            },
            order:{
                name:"ord",
                value:0
            },
            fd:"fd",
            jc:"jc",
            ai:"ai",
            awd:{
                name:"aw",
                value:0
            },
            awUnit:"r",
            iwd:{
                name:"iw",
                value:0
            },
            iwUnit:"r",
            ahd:{
                name:"ah",
                value:0
            },
            ahUnit:"r",
            ihd:{
                name:"ih",
                value:0
            },
            ihUnit:"r",
            lhd:{
                name:"lh",
                value:0
            },
            lhUnit:"r",
            tid:{
                name:"ti",
                value:0
            },
            tiUnit:"r",
            lsd:{
                name:"ls",
                value:0
            },
            lsUnit:"r",
            ttd:"n",
            textTrans:[{
                "n":"不设置",
                "v":"n"
            },{
                "n":"全部大写",
                "v":"u"
            },{
                "n":"全部小写",
                "v":"l"
            },{
                "n":"首字母大写",
                "v":"c"
            },{
                "n":"full-size-kana",
                "v":"fs"
            },{
                "n":"设置等宽字体",
                "v":"fw"
            }],
            tld:"n",
            textDec:[{
                "n":"取消文本设置",
                "v":"n"
            },{
                "n":"添加上划线",
                "v":"u"
            },{
                "n":"添加下划线",
                "v":"o"
            },{
                "n":"添加删除线",
                "v":"l"
            }],
            owd:{
                name:"ow",
                value:0,
            },
            owUnit:"r",
            osd:"s",
            shaXd:{
                name:"ts",
                value:0
            },
            shaYd:{
                name:"ts",
                value:0
            },
            selShaUnit:"r",
            selShaUnit1:"r",
            tpd:"n",
            aniDire:[{
                "n":"没有",
                "v":"n"
            },{
                "n":"所有",
                "v":"a"
            },{
                "n":"定义过的有",
                "v":"p"
            }],
            tud:{
                name:"tu",
                value:0
            },
            tuUnit:"s",
            tranTimeUnit:[{
                "n":"秒",
                "v":"s"
            },{
                "n":"分",
                "v":"min"
            }],
            ttfd:"e",
            timingFunction:[{
                "n":"默认值",
                "v":"e"
            },{
                "n":"先慢后快",
                "v":"i"
            },{
                "n":"先快后慢",
                "v":"o"
            },{
                "n":"先慢后快再慢",
                "v":"io"
            },{
                "n":"线性增长",
                "v":"l"
            }],
            trdd:{
                name:"trd",
                value:0
            },
            trdUnit:"s",
            ofd:"a",
            overflowHanding:[{
                "n":"超出出现滚动条",
                "v":"a"
            },{
                "n":"出现滚动条",
                "v":"s"
            },{
                "n":"默认",
                "v":"v"
            },{
                "n":"超出隐藏",
                "v":"h"
            }],
            selOverflow:"a",
            overflow:[{
                "n":"全部",
                "v":"a"
            },{
                "n":"x方向",
                "v":"x"
            },{
                "n":"y方向",
                "v":"y"
            }],
            bawd:{
                name:"iw",
                value:0
            },
            bahd:{
                name:"ih",
                value:0
            },
            bl:[{
                "n":"边框",
                "v":"b"
            },{
                "n":"边距",
                "v":"p"
            },{
                "n":"文本",
                "v":"c"
            }],
            imgXd:{
                name:"dbp",
                value:0
            },
            imgYd:{
                name:"bp",
                value:0
            },
            transXd:0,
            transYd:0,
            scaXd:0,
            scaYd:0,
            rotXd:0,
            rotYd:0,
            skewXd:0,
            skewYd:0,
            transThreeXd:0,
            transThreeYd:0,
            transThreeZd:0,
            scaThreeXd:0,
            scaThreeYd:0,
            scaThreeZd:0,
            rotThreeXd:0,
            rotThreeYd:0,
            rotThreeZd:0,
            skewThreeXd:0,
            skewThreeYd:0,
            skewThreeZd:0,
        }
    }
};

/*
    树展示区 数据
 */
var treeData = {
    cssTreeIsShow:true,
    pageTreeIsShow:false,
    pageTree:{}
};

/**
 * Ctrl+Z 功能相关变量
 * */
// 存储 phoneShow 的历史版本
var phoneShowOld = []
// 标示 用于的上一个操作不是 撤销
var rescindFlag = true

