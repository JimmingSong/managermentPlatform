var classAddToStyle = new classAddToStyle();
/**
 * 属性 / 数据 / 布局
 */
var classAndData = {
    //被改变得数据的css数据对象及标签名称
    clsobj:{obj:{},tag:""},
    con_class:null,
    rtShow: 0,
    //右上区展示开关 0：操作区 1：页面信息区 2：规则展示区
    playShow: 0,
    //操作区展示开关 0：属性区 1：数据区 2：交互区 3：布局区
    clsPlayShow: 0,
    //属性区展示开关 0：基础区 1：高级区 2：扩展区 3：动画区
    baseDataShow: 0,
    //数据区展示开关 0：基础数据 1：事件
    layIsShow: false,  //操作区布局标签是否显示
    messageData:null,//页面信息
    vNode:null,
    cls:{
        bgiIsShow: false,
        numValue:{
            wd: {//宽
                name:"w",
                value: 0,
                unit:"r"
            },
            //单位
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
            opUnit1: [{
                "n": "rem",
                "v": "r"
            }, {
                "n": "百分比",
                "v": "p"
            }, {
                "n": "像素",
                "v": "x"
            }, {
                "n": "视口",
                "v": "v",
            }],
            hd:{//高
                name:"h",
                value:0,
                unit:"r"
            },
            fsd:{//文字尺寸
                name:"fs",
                value:0,
                unit:"r"
            },
            fl:{
                test:"左浮动",
                name:"f-l",
                st:false,
            },//浮动
            fr:{
                test:"右浮动",
                name:"f-r",
                st:false,
            },
            fc:{
                test:"清除浮动",
                name:"f-c",
                st:false,
            },
            fw:{
                test:"加粗",
                name:"fw-b",
                st:false,
            },//字体粗细
            ft:{
                test:"斜体",
                name:"ft-i",
                st:false,
            },//font-style
            tlo:{
                test:"上划线",
                name:"tl-o",
                st:false,
            },
            tlu:{
                test:"下划线",
                name:"tl-u",
                st:false,
            },
            tll:{
                test:"删除线",
                name:"tl-l",
                st:false,
            },
            tal:{
                test:"文字居左",
                name:"ta-l",
                st: false
            },//text-align
            i: {
                test: "图标",
                name: "i",
                st: false
            },
            o: {
                test: '溢出',
                name: 'o',
                st: false
            },
            cc: {
                test: "绝对居中",
                name: "c",
                st: false
            },
            tar:{
                test:"文字居右",
                name:"ta-r",
                st:false,
            },
            tac:{
                test:"文字居中",
                name:"ta-c",
                st:false,
            },
            ffd: "s",//默认字体
            opFf:[{
                "n":"宋体",
                "v": "s"
            },{
                "n":"楷体",
                "v": "k"
            },{
                "n":"微软雅黑",
                "v": "w"
            },{
                "n":"草书",
                "v": "c"
            }],
            c: "#000000",
            ct: {
                test: "透明",
                name: "c-t",
                st: false,
            },
            bc: "#000000",
            bct: {
                test: "透明",
                name: "bc-t",
                st: false,
            },
            bdc: "#000000",
            bdct: {
                test: "透明",
                name: "bdc-t",
                st: false,
            },
            oc: "#000000",
            oct: {
                test: "透明",
                name: "oc-t",
                st: false,
            },
            tsc: "#000000",
            od:{
                value:0,
            },
            zdd: {
                name: "zd",
                value: 0,
            },
            bxd: "c",
            bxType: [{
                "n": "边框盒模型",
                "v": "b"
            }, {
                "n": "默认盒模型",
                "v": "c"
            }],
            dd: "i",
            fType:[{
                "n": "行内元素",
                "v": "i"
            }, {
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
                value:0,
                unit:"r"
            },
            lrd:{
                name:"lr",
                value:0,
                unit:"r"
            },
            pd:"s",
            pos:[{
                "n":"默认",
                "v":"s"
            },{
                "n":"相对定位",
                "v":"r"
            },{
                "n":"绝对定位",
                "v": "a"
            }, {
                "n": "固定定位",
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
                value:0,
                unit:"r"
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
            bwd:{
                name:"bw",
                value:0,
                unit:"r"
            },
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
            bsd: "s",
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
                "v": "n"
            }],
            brd:{
                name:"br",
                value:0,
                unit:"r"
            },
            brtd: {
                name: "br",
                value: 0,
                unit: "r"
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
            fdr:{
                test:"从左到右",
                name:"fd-r",
                st:false,
            },
            fdrr:{
                test:"从右到左",
                name:"fd-rr",
                st:false,
            },
            fdcr:{
                test:"从上到下",
                name:"fd-cr",
                st:false,
            },
            fdc:{
                test:"从下到上",
                name:"fd-c",
                st:false,
            },
            jcs:{
                test:"左",
                name:"jc-s",
                st:false,
            },
            jce:{
                test:"右",
                name:"jc-e",
                st:false,
            },
            jcsb:{
                test:"两边",
                name:"jc-sb",
                st:false,
            },
            jcar:{
                test:"等分",
                name:"jc-ar",
                st:false,
            },
            jcc:{
                test:"中间",
                name:"jc-c",
                st:false,
            },
            aifs:{
                test:"上到下",
                name:"ai-fs",
                st:false,
            },
            aife:{
                test:"下到上",
                name:"ai-fe",
                st:false,
            },
            aic:{
                test:"居中",
                name:"ai-c",
                st:false,
            },
            awd:{
                name:"aw",
                value:0,
                unit:"r"
            },
            iwd:{
                name:"iw",
                value:0,
                unit:"r"
            },
            ahd:{
                name:"ah",
                value:0,
                unit:"r"
            },
            ihd:{
                name:"ih",
                value:0,
                unit:"r"
            },
            lhd:{
                name:"lh",
                value:0,
                unit:"r"
            },
            tid:{
                name:"ti",
                value:0,
                unit:"r",
            },
            lsd:{
                name:"ls",
                value:0,
                unit:"r"
            },
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
                "n":"添加下划线",
                "v": "u"
            }, {
                "n": "添加上划线",
                "v":"o"
            },{
                "n":"添加删除线",
                "v":"l"
            }],
            owd:{
                name:"ow",
                value:0,
                unit:"r"
            },

            osd: "da",
            shaXd:{
                name:"ts",
                value:0,
                unit:"r"
            },
            shaYd:{
                name:"ts",
                value:0,
                unit:"r"
            },
            blur:{
                name:"ts",
                value:0,
                unit:"r"
            },
            boxTextS:"bos",
            boxTS:[{
                "n":"盒子阴影",
                "v":"bos",
            },{
                "n":"文字阴影",
                "v":"ts",
            }],
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
                value:0,
                unit:"s"
            },
            tranTimeUnit:[{
                "n":"秒",
                "v":"s"
            },{
                "n": "毫秒",
                "v": "ms"
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
                value:0,
                unit:"s"
            },
            ofd: "v",
            overflowHanding:[{
                "n": "超出隐藏",
                "v": "h"
            }, {
                "n":"超出出现滚动条",
                "v":"a"
            },{
                "n":"出现滚动条",
                "v":"s"
            },{
                "n":"默认",
                "v":"v"
            }],
            selOverflow: "x",
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
                name:"bgs",
                value:0,
            },
            bahd:{
                name:"bgs",
                value:0,
            },
            blb:{
                id:"area-bor",
                val:"边框",
                v:"b",
                n:"bl",
                st:false
            },
            blp:{
                id:"area-mar",
                val:"边距",
                v:"p",
                n:"bl",
                st:false
            },
            blc:{
                id:"area-bortext",
                val:"文本",
                v:"c",
                n:"bl",
                st:false
            },
            brerp:{
                id:"cover",
                val:"全部",
                v:"rp",
                n:"bre",
                st:false
            },
            brerx:{
                id:"crosswise",
                val:"横向",
                v:"rx",
                n:"bre",
                st:false
            },
            brery:{
                id:"longitudinal",
                val:"纵向",
                v:"ry",
                n:"bre",
                st:false
            },
            bas:{
                id:"immobilization",
                val:"固定",
                v:"s",
                n:"ba",
                st:false
            },
            baf:{
                id:"scroll",
                val:"滚动",
                v:"f",
                n:"ba",
                st:false
            },
            frnw:{
                v: "w",
                n:"fr",
                st:false,
            },
            wka: {
                v: "a",
                n: "wk",
                st: false,
            },
            vv:{
                v: "h",
                n: "v",
                st: false,
            },
            bgi: {
                bcgImg: "",
                isShow: false,
                bcgImgName: "",
            },
            imgXd:{
                name:"dbp",
                value:0,
            },
            imgYd:{
                name:"bp",
                value:0,
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
        },
    },
    b_data:{
        parNum:null,
        parVal:null,
        comNum:null,
        comValue: {},
        comValue1: "",
        com: null
    },
    aniSel_data: "",
    ani_data: [
        {
            n: "默认",
            v: "",
        },
        {
            n:"弹跳",
            v: "Ani-bounce",
        },{
            n:"淡入",
            v: "Ani-flash",
        },{
            n:"伸缩",
            v: "Ani-pulse",
        },{
            n:"橡皮圈",
            v: "Ani-rubberBand",
        },{
            n:"摇头",
            v: "Ani-headShake",
        },{
            n:"荡秋千",
            v: "Ani-swing",
        },{
            n:"收缩晃动",
            v: "Ani-tada",
        },{
            n:"右移摇晃",
            v: "Ani-wobble",
        },{
            n:"以中间点为中心，晃动及变色",
            v: "Ani-jello",
        },{
            n:"蹦出来",
            v: "Ani-bounceIn",
        },{
            n:"蹦下去",
            v: "Ani-bounceInDown",
        },{
            n:"从左边滑进来",
            v: "Ani-bounceInLeft",
        },{
            n:"从右边滑进来",
            v: "Ani-bounceInRight",
        },{
            n:"从下边滑进来",
            v: "Ani-bounceInUp",
        },{
            n:"原点蹦出去",
            v: "Ani-bounceOut",
        },{
            n:"蹦下去",
            v: "Ani-bounceOutDown",
        },{
            n:"向左蹦出去",
            v: "Ani-bounceOutLeft",
        },{
            n:"向右蹦出去",
            v: "Ani-bounceOutRight",
        },{
            n:"向上蹦出去",
            v: "Ani-bounceOutUp",
        },{
            n:"从上到下淡入",
            v: "Ani-fadeInDown",
        },{
            n:"从上到下淡入",
            v: "Ani-fadeInDownBig",
        },{
            n:"淡出",
            v: "Ani-fadeOut",
        },{
            n:"向下淡出",
            v: "Ani-fadeOutDown",
        },{
            n:"向下淡出",
            v: "Ani-fadeOutDownBig",
        },{
            n:"向左淡出",
            v: "Ani-fadeOutLeft"
        },{
            n:"向左淡出",
            v: "Ani-fadeOutLeftBig",
        },{
            n:"向右淡出",
            v: "Ani-fadeOutRight",
        },{
            n:"向右淡出",
            v: "Ani-fadeOutRightBig",
        },{
            n:"向上淡出",
            v: "Ani-fadeOutUp",
        },{
            n:"向上淡出",
            v: "Ani-fadeOutUpBig",
        },{
            n:"筋斗",
            v: "Ani-flip",
        },{
            n:"绕X轴翻筋斗",
            v: "Ani-flipInX",
        },{
            n:"绕Y轴翻筋斗",
            v: "Ani-flipInY",
        },{
            n:"绕X轴翻筋斗淡出",
            v: "Ani-flipOutX",
        },{
            n:"绕Y轴翻筋斗淡出",
            v: "Ani-flipOutY",
        },{
            n:"向右淡入",
            v: "Ani-lightSpeedIn",
        },{
            n:"向右淡出",
            v: "Ani-lightSpeedOut",
        },{
            n:"原地旋转一圈",
            v: "Ani-rotateIn",
        },{
            n:"从左上方旋转进来",
            v: "Ani-rotateInDownLeft",
        },{
            n:"从右上方旋转进来",
            v: "Ani-rotateInDownRight",
        },{
            n:"从左下方旋转进来",
            v: "Ani-rotateInUpLeft",
        },{
            n:"从右下方旋转进来",
            v: "Ani-rotateInUpRight",
        },{
            n:"原地旋转一圈消失",
            v: "Ani-rotateOut",
        },{
            n:"从左上方旋转消失",
            v: "Ani-rotateOutDownLeft",
        },{
            n:"从右上方旋转消失",
            v: "Ani-rotateOutDownRight",
        },{
            n:"从左下方旋转消失",
            v: "Ani-rotateOutUpLeft",
        },{
            n:"从右下方旋转消失",
            v: "Ani-rotateOutUpRight",
        },{
            n:"左上角位原点向下旋转晃出去",
            v: "Ani-hinge",
        },{
            n:"晃着显示",
            v: "Ani-jackInTheBox",
        },{
            n:"从下向上滚进来",
            v: "Ani-rollIn",
        },{
            n:"从右向上滚出去",
            v: "Ani-rollOut",
        },{
            n:"逐渐变大进来",
            v: "Ani-zoomIn",
        },{
            n:"从上到下变大进来",
            v: "Ani-zoomInDown",
        },{
            n:"从左逐渐变大进来",
            v: "Ani-zoomInLeft",
        },{
            n:"从右逐渐变大进来",
            v: "Ani-zoomInRight",
        },{
            n:"逐渐变小消失",
            v: "Ani-zoomOut",
        },{
            n:"逐渐变小向下消失",
            v: "Ani-zoomOutDown",
        },{
            n:"逐渐变小向左消失",
            v: "Ani-zoomOutLeft",
        },{
            n:"逐渐变小向右消失",
            v: "Ani-zoomOutRight",
        },{
            n:"从上到下逐渐变大进来",
            v: "Ani-zoomOutUp",
        },{
            n:"慢慢向下滑下来",
            v: "Ani-slideInDown",
        },{
            n:"向左滑进来",
            v: "Ani-slideInLeft",
        },{
            n:"向右滑进来",
            v: "Ani-slideInRight",
        },{
            n:"从下向上滑进来",
            v: "Ani-slideInUp",
        },{
            n:"从下滑出去",
            v: "Ani-slideOutDown",
        },{
            n:"从左滑出去",
            v: "Ani-slideOutLeft",
        },{
            n:"从右滑出去",
            v: "Ani-slideOutRight",
        },{
            n:"从上滑出去",
            v: "Ani-slideOutUp",
        }
    ],
    layoutIsShow: false,
    layoutTp: "",
    pageLayout: null,
    saveLayData: null,
    layoutIlm:{
        t:null,
        atr: null
    },//用于接收用户输入的ilm中的i和atr属性
    /**
     * @namespace {Object} 用于展示 编辑规则 用的数据 每次 右键菜单-编辑规则 触发时将相关数据给该属性
     */
    pageRenData: {
        // 全部 rls 存储
        rls: [],
        data: {},
        // 当前状态为 选择 修改 true为修改 flase为选择
        choiceOrUpdate: true,
        // isModify: true,
        // 是否显示编辑框
        isShowEdit: false,
        tempData: {
            index: 0,
            tp: 'order1',

            // 顺序规则 的范围 可以是 Object Array String
            scope: '',
            scopeStart: 0,
            scopeEnd: 0,
            scopeArr: [],

            isLoop: 1,
            isReciprocate: 0,
            other: '',
            resultTrue: 0,
            resultFalse: 0,

            // switch条件规则 的 value-index 对象数组
            resultMap: [],
            valueString: '',
            indexString: ''
        }
    },
    event:{
        // 存储 textarea 中的值
        eventD: "",
        // 存储当前事件对应的处理函数数组
        triggerDatas: [],
        // 当前 组件 or 容器 的 es 字段的值
        eventData: [
            {"k": "click", "v": ["11111", "222222", "333333"]},
            {"k": "focus", "v": ["6"]}],
        // 用于在事件函数列表中展示的数据
        partEventList: [],
        // 交互模块中事件数据
        // 当前使用的 k 在 eventData 的索引
        kIndex: null,
        // 当前使用的事件函数在 v 的索引
        vIndex: null,
        // 当前处于点击状态的 k 的 dom
        kDom: null,
        // textarea Dom对象
        textDom: null,
        // 添加触发方式 select.option 候选值
        newEventMode: ["click", "change", "input", "blur", "dbclick"],//添加新的触发方式
        // 添加触发方式 select.value 双向绑定值
        newEvent: "click",
        // 控制 添加事件类型select and 确定btn 是否出现
        modeIsShow: false,
        // 控制 事件处理函数列表 是否出现
        eventIsShow: false,
        // 控制 事件完成内容的 textarea 是否出现
        showTextarea: false,
        setTagCssControl: true
    },
    //-------------交互变量区------------------
    interactiveData: {
        event: [],
        tg: [],
        classList: null,
        attrs: {},
        popEvent: ""
    },
    //存获取到的es内的数据
    interactiveDatas: {},
    //要添加的事件名称
    eventName: "",
    //要添加的事件对象的
    //事件对象全部
    createInter: {},
    eventObj: {
        //存储旧的渲染对象
        oldRenderObj: {},
        eventNameArr: [
            {"k": "click", "v": "单击事件"},
            {"k": "dblclick", "v": "双击事件"},
            {"k": "mousedown", "v": "长按事件"},
            {"k": "mouseover", "v": "鼠标悬浮"},
            {"k": "mouseup", "v": "鼠标抬起"},
            {"k": "blur", "v": "失去焦点"},
            {"k": "focus", "v": "获取焦点"}],
        isSelRender: false,
        target: [],
        eventMethod: "",
        selRenderObj: {},
        checkCls: false,
        x_Node: null,
        //当前选中的对象
        cur_sel: "",
        //选择的容器数据对象
        containerObj: {},
        isShow: false,
        //样式树
        clsList:null,
        // 是否替换
        isSplice:"",
        //交互时添加类
        addCls: false,
        eventWay:[],
        selEventShow:false,
        destination: false,
        unitNum: 0
    },
    //约束规则管理
    con_rul: {
        con_obj: {},//容器对象
        componentData: {},//当前组件数据
        isModify: false,
        isShowModifyPop: false,
        modify: 0,
        fnArr: ["fnName"],
        fnName: "",//约束函数名称
        conName: "",//当前容器名称
        modifyState: null,
        isChange: false,
        addOrUpdate: false,
        oldConName: ""
    },
    // 数据树
    // 数据树 展示用数据
    dataTreeData: {
        // 当前页面数据
        data: null,
        // 右键弹框数据
        rightFrameData: {
            // 当前数据右键目标数据
            currData: null,
            currType: '页面',
            isShow: false,
            top: 0,
            left: 0
        },
        // 页面数据修改弹框数据
        pageDataUpdate: {
            id: '',
            type: '',
            name: '',
            str: '',
            isShow: false
        },
        // 段数据修改弹出框数据
        sectionDataUpdata: {
            str: '',
            isShow: false
        },
        // 段列表 修改弹出框 用数据
        sectionListUpdate: {
            arr: [],
            isShow: false
        },
        // 组件列表 修改弹出框 用数据
        compListUpdate: {
            arr: [],
            isShow: false
        },
        // 添加组件 用数据
        addCompData: {
            // 所有组件数据
            allCompList: [],
            addCompMarryList: [],
            // searchStr:　'',
            // 当前段的索引
            setcionIndex: null,
            isShow: false
        }
    }
};