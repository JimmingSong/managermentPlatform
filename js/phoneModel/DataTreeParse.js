/**
 * Created by Jillian on 2018/1/29.
 */
/**
 * 数据树解析对象
 * 用于数据树的解析事物:
 * 构建结构索引数据数组，解析索引构建索引树，解析约束
 */
function DataTreeParse(){
    this.pageData;
    //初始化
    this.init = function (pageData) {
        pageData.ds.tdi = {};
        pageData.ds.index = {};
        pageData.ds.index.datas = {};
        pageData.ds.index.waitp = {};
        this.pageData = pageData;
    };
    //解析一个页面数据
    this.parsePage=function(pageData){
        this.init(pageData);
        let dsData = pageData.ds;
        //构建结构索引数据数组
        //this.parseTDI(dsData);
        //解析索引构建索引树
        this.parseAIndex(dsData);
        if (dsData.values && dsData.values.length > 0) {
            for (let i in dsData.values) {
                let paragData = dsData.values[i];
                this.parseParag(paragData, i);
            }
        }
    };
    //解析一个段数据
    this.parseParag = function (paragData, paraIndex) {
        //构建结构索引数据数组
        this.parseTDI(paragData, paraIndex);
        //解析索引构建索引树
        this.parseAIndex(paragData);
        if(paragData.values&&paragData.values.length>0){
            for (let i in paragData.values) {
                this.parseComponent(paragData.values[i]);
            }
        }
    };
    //解析一个组件数据
    this.parseComponent=function(comData){
        //构建结构索引数据数组
        this.parseTDI(comData);
        //解析约束
        this.parseConstraint(comData);
        //解析索引构建索引树
        this.parseAIndex(comData);
    };
    //去除一个页面数据的解析
    this.wipePage = function (pageData) {
        this.pageData = pageData;
        let dsData = pageData.ds;
        //构建结构索引数据数组
        //this.wipeTDI(dsData);
        //解析索引构建索引树
        this.wipeAIndex(dsData);
        if (dsData.values && dsData.values.length > 0) {
            for (let i in dsData.values) {
                let paragData = dsData.values[i];
                this.wipeParag(paragData);
            }
        }
    };
    //去除一个段数据中的解析
    this.wipeParag = function (paragData) {
        //去除结构索引
        this.wipeTDI(paragData);
        //去除索引树
        this.wipeAIndex(paragData);
        if (paragData.values && paragData.values.length > 0) {
            for (let i in paragData.values) {
                this.wipeComponent(paragData.values[i], i);
            }
        }
    };
    /**
     * 去除一个组件数据数据中的解析
     * @param comData
     */
    this.wipeComponent = function (comData) {
        //去除结构索引
        this.wipeTDI(comData);
        //去除约束
        this.wipeConstraint(comData);
        //去除索引树
        this.wipeAIndex(comData);
    };
    /**
     * 将数据中的数据索引放到结构树的di中
     * @param data
     * @param paraIndex
     */
    this.parseTDI = function (data, paraIndex) {
        if (data.l !== undefined || paraIndex !== undefined) {
            let baseData = this.pageData.ds.tdi;
            let lIndex = data.l ? data.l : paraIndex;
            if (baseData[lIndex] === undefined) {
                baseData[lIndex] = {};
                if (!data.tp) {
                    baseData[lIndex].p = [];
                    baseData[lIndex].p.push(data)
                } else {
                    baseData[lIndex].c = [];
                    baseData[lIndex].c.push(data)
                }
            } else {
                if (!data.tp) {
                    if (!baseData[lIndex].hasOwnProperty("p")) {
                        baseData[lIndex].p = []
                    }
                    baseData[lIndex].p.push(data)
                } else {
                    if (!baseData[lIndex].hasOwnProperty("c")) {
                        baseData[lIndex].c = []
                    }
                    baseData[lIndex].c.push(data)
                }
            }
        }
    };
    this.clearTDI = (tdi)=> {
        for (let item  in  tdi) {
            delete tdi[item]
        }
    };
    /**
     * 解析约束
     * @param data
     */
    this.parseConstraint=function(data){
        let cts_Data = this.pageData.ds.con;
        if(data.c&&data.v&&(data.v !== "")){
            //找到约束容器数据
            let cts_Data = cts_Datas[data.c];
            //判断是否已经解析过
            if(cts_Data.values.indexOf(data) === -1){
                //获得状态数据
                let state_data = cts_Data.st[data.v];
                //初始化数据
                for (let i in state_data) {
                    data[i]=state_data[i];
                }
                cts_Data.values.push(data);
            }
        }
    };
    /**
     * 解析索引
     * @param data
     */
    this.parseAIndex=function(data){
        let indexDatas = this.pageData.ds.index.datas;
        let waitPDatas = this.pageData.ds.index.waitp;
        //有索引且从解析过的进行解析
        if(data.a&&(!indexDatas[data.a])){
            //父索引名称
            let p_a = data.a.substring(0, str.lastIndexOf('_'));
            //自己的名子
            let n = data.a.substring(str.lastIndexOf('_') + 1, data.a.length);
            //如果索引区中有父则互相连接
            if(p_a in indexDatas){
                if (!data.rlt.p) {
                    let p_data = indexDatas[p_a];
                    data.rlt.p = p_data;
                    p_data.rlt.childs[n] = data;
                }
            }else{
                //没有父亲的进入等待连接区
                if(!waitPDatas[p_a]){
                    waitPDatas[p_a]=[data];
                }else{
                    waitPDatas[p_a].push(data);
                }
            }
            //查看等待区中是否有自己的孩子
            if(data.a in waitPDatas){
                for (let i in waitPDatas[data.a]) {
                    let c_data = waitPDatas[data.a][i];
                    let n = c_data.a.substring(str.lastIndexOf('_') + 1, c_data.a.length);
                    c_data.rlt.p = data;
                    data.rlt.childs[n] = c_data;
                }
                if(waitPDatas[data.a].length === 0){
                    delete waitPDatas[data.a];
                }
            }
        }
    };
    //去除结构辅助
    this.wipeTDI = (data) => {
        this.clearTDI(this.pageData.ds.tdi);
        this.parseTDI(this.pageData.ds);
        let baseData = this.pageData.ds.tdi;
        if (baseData[data.l] === undefined) {
            return;
        } else {
            let key;
            if (!data.tp) {
                key = "p";
            } else {
                key = "c";
            }
            if (data.l !== undefined && data.l !== "" && baseData[data.l][key].indexOf(data) == -1) {
                baseData[data.l][key].push(data);
            }
        }
    };
    //去除约束
    this.wipeConstraint = function (data) {
        let cts_Data = this.pageData.ds.con;
        if (data.c && data.v && (data.v !== "")) {
            //找到约束容器数据
            let cts_Data = cts_Datas[data.c];
            //判断是否已经解析过
            let index = cts_Data.values.indexOf(data);
            if (index == -1) {
                return;
            } else {
                delete cts_Data.values[index];
            }
        }
    };
    //去除索引(锚点）
    this.wipeAIndex = function (data) {
        let indexDatas = this.pageData.ds.index.datas;
        let waitPDatas = this.pageData.ds.index.waitp;
        //有索引且从解析过的进行解析
        if (!data.a || !indexDatas[data.a]) {
            return;
        } else {
            let p_a = data.a.substring(0, str.lastIndexOf('_'));
            let n = data.a.substring(str.lastIndexOf('_') + 1, c_data.a.length);
            if (data.rlt) {
                //把自己从父索引数据的孩子中去除
                if (data.rlt.p) {
                    let parent = data.rlt.p;
                    if (parent.rlt.childs[n]) {
                        delete parent.rlt.childs[n];
                    }
                } else {
                    //如果没有父索引 将其从等待父索引队列中删除
                    if (waitPDatas[p_a]) {
                        let index = waitPDatas[p_a].indexOf(data);
                        if (index != -1) {
                            delete waitPDatas[p_a][index];
                        }
                    }
                }
                //把自己从孩子索引数据的父亲中去除
                if (data.rlt.childs) {
                    for (let n in data.rlt.childs) {
                        let child = data.rlt.childs[n];
                        delete child.rlt.p;
                    }
                }
            }
        }
    };
    //从复杂页面树据中获取干净的页面数据
    this.weedPageData = function (pageData) {
        let newPageData = {};
        for (let key in pageData) {
            switch (key) {
                case "ds":
                    newPageData["ds"] = weedDsAssistData(pageData.ds);
                    break;
                case "st":
                    newPageData["st"] = weedStAssistData(pageData.st);
                    break;
                case "rs":
                case "id":
                case "name":
                case "tp":
                    newPageData[key] = copyData(pageData[key]);
                    break;
                default:
                    break;
            }
        }
        return newPageData;
    }
}
//获取干净的ds数据
function weedDsAssistData(data) {
    let newData = {};
    for (let k in data) {
        switch (k) {
            case"tdi":
            case"index":
            case"rlt":
                break;
            case "con":
            {
                let newcon = {};
                for (let key in data.con) {
                    newcon[key] = {};
                    let conItem = data.con[key];
                    for (let k in conItem) {
                        if (k !== "values") {
                            newcon[key][k] = copyData(conItem[k]);
                        }
                    }
                }
                newData.con = newcon;
            }
                break;
            case "values":
            {
                if (data.values && data.values.length > 0) {
                    let newValues = [];
                    data.values.forEach(function (item) {
                        newValues.push(weedDsAssistData(item));
                    })
                    newData.values = newValues;
                }
            }
                break;
            default:
                newData[k] = copyData(data[k]);
        }
    }
    return newData;
}
//获取干净的st数据
function weedStAssistData(data) {
    let newData = {};
    for (let k in data) {
        switch (k) {
            case "index":
            {
                let newIndex = {};
                for (let key in data.index) {
                    if (key != "di") {
                        newIndex[key] = data.index[key];
                        if (key == "ri") {
                            for (let tp in newIndex.ri) {
                                if (newIndex.ri[tp].rls && newIndex.ri[tp].rls.length > 0) {
                                    newIndex.ri[tp].rls.forEach(function (item) {
                                        if (item.count) {
                                            delete item.count;
                                        }
                                    });
                                }
                            }
                        }
                    }

                }
                newData.index = newIndex;
            }
                break;
            case "chr":
            {
                let newChr = [];
                if (data.chr && data.chr.length > 0) {
                    data.chr.forEach(function (item) {
                        newChr.push(weedStAssistData(item));
                    })
                }
                newData.chr = newChr;
            }
                break;
            default:
                newData[k] = copyData(data[k]);
        }
    }
    return newData;
}