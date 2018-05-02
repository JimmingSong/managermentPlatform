
/*
   左边展示id的数据
 */
var idList = {
    t: "项目名称",
    id: [],
    // id: ["项目ID1", "项目ID2", "项目ID3", "项目ID4", "项目ID5", "项目ID6", "项目ID7", "项目ID8", "项目ID9"],
    b: [],//选择的元素
    c: [],//选择的下标
    pId:"",//页面ID
    pType: "singleshowinfo",//页面类型
    pName:"",//页面name
    popShow:false,
    popFontShow: false,
    popFontShow1: false,
    projectId:"",
    //搜索页面 新增页面
    addOrSearch: true,
    //updatePop
    updateShow: 0,
    updatePage: {
        oId: "",
        id: "",
        tp: "",
        name: "",
    },
    //存储夸页面 粘贴的数据
    copyPara: null,
    oldPageId: "",
    curPageId: "",
    //用于跨页面复制粘贴用
    oldRs: {}
};
var firstPageContent = {
    "ds": {},
    "rs": {},
    "st": {
        "chr": [
            {
                "sty": {"cls": "w-100--p ih-10--r bw-1--x bs-s bdc-000000 fs-0_5--r"},
                "ilm": {
                    "t": "",
                    "atr": ""
                },
                "index": {
                    "ri": {}
                },
                "chr": []
            }
        ]
    }
};