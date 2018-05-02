//存放组件icon数据
function getComData(){
    var data=[
        {"k": "el", "v": "", "tp": "el", "n": ""}, {"k": "img", "v": "", "tp": "img", "n": ""}
    ];
    return data;
}
//存放布局icon数据
function getLayData(){
    var data = [{"k": "容器", "v": "", "n": "con"},
        {"k": "线性布局", "v": "", "n": "ll"},
        {"k": "网格布局", "v": "", "n": "gl"},
        {"k": "目录树布局", "v": "", "n": "tr"},
        {"k": "一拖N", "v": "", "n": "opl"}];
    return data;
}
var comAndLayout = {
    layoutDefault:true,
    lbshow: 0,
    //显示一共多少段
    parLen: "",
    //左下区展示开关 0：组件区 1：布局区 2：字体图标区，3：模板区
    com:"组件展示",
    layout:"布局",
    model:"模板",
    dragTemnpData:null,//拖拽时暂存组件数据
    comPop: {
        isShow: 1, //组件模块设置插入位置的弹框 0：设置的图标，弹出框出现 1：确定按钮或取消按钮时弹出框消失
        parValue: null,//用户输入的插入第几段的数值
        couValue: null,//用户输入插入第几个的数值
    },
    layoutData:{
        lay:getLayData(),//布局icon
        layData: getLayoutData(),//布局的属性及样式
    },
    comDatas:{
        selDataType: [],//所有tp类型
        coms: [],
        comdata: null,
        allComs: [],
    },
    icon:{
        iconData:"",//用户选择的字体图标
        iconDatas:null,//从数据库请求的字体图标
        searchIconName: "",//查找的字体图标值
        searchIconValue: "",//图标内容
        searchIcon:null,//接收通过字体图标名称查找的字体图标
    },
    parLength: phoneShow.ds.values ? phoneShow.ds.values.length : 0,//页面数据中的段的数量
};

