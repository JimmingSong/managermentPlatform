function AnchorManager() {
    //this.anchorObj={};
    //插入锚点数据
    this.insertAnchor = function(pageData,obj) {
        if("a" in pageData&&pageData.a!=""&&pageData.a!==undefined) {
            obj[pageData.a] = pageData;
        }
        for(var i= 0;i<pageData.values.length;i++) {
            if("a" in pageData.values[i]&&pageData.values[i].a!==""&&pageData.values[i].a!==undefined) {
                obj[pageData.values[i].a] = pageData.values[i];
            }
            for(var j = 0;j<pageData.values[i].values.length;j++){
                if("a" in pageData.values[i].values[j]&&pageData.values[i].values[j].a!=""&&pageData.values[i].values[j].a!==undefined){
                    obj[pageData.values[i].values[j].a] = pageData.values[i].values[j];
                }
            }
        }
    };
    //删除锚点数据
    this.deleteAnchor = function(data,obj) {
        delete  obj[data.a];
    };
    //修改锚点数据
    this.modifyAnchor = function(data,obj) {
        obj[data.a] = data;
    };
    //查找锚点数据
    this.searchAnchor = function(anchorName,obj) {
        return obj[anchorName];
    };
}
var anchorManager = new AnchorManager();
var backstageVariableArr = [];
function analyzeData(data){

}
var actuator1 = new Actuator1();
//执行器对象
function Actuator1(){
    this.strArr=[];
    this.pushStr = function(str){
        this.strArr.push(str);
    };
    this.runStrs=function(){
        if(this.strArr.length==0){
            return false;
        }
        var that = this;
        this.strArr.forEach(function(str){
            that.runStr(str);
        });
        return true;
    };
    this.runStr=function(str){
        console.log(str);
        return eval(str);
    }
}
function executeJsExpression(str) {
    return actuator1.runStr(str);
}
function executeJsExpressions(arr) {
    var item = [];
    for(var i in arr) {
        item.push(executeJsExpression(arr[i]))
    }
    return item;
}
var localPack = {};//本地锚点数据对象
var serverPack = {};//服务器锚点数据对象


var expressionsList=[];
var serverExpressionslist = [];
var isFlash=false;
function  getStrForElExpressions(data,key){
    var reg = /\$\{(.*?)\}/g;
    var expressions=data[key].match(reg);
    var result=judgeInExpressionsList(data);
    if(expressions==null){
        if(result==null){
            return;
        }else{
            data[key]=analyzeExpessions(result.el[key]);
        }
    }else{
        if(result==null){
            var queueData={data:data,el:{}};
            queueData.el[key]=data[key];
            expressionsList.push(queueData);
            data[key]=analyzeExpessions(data[key]);
            //延迟于后台变量
            //获取去除值
            //data[key]=去除值
        }else{
            if(key in result.el){
                result.el[key]=data[key];
                data[key]=analyzeExpessions(data[key]);
                //isFlash=true;
                //获取去除值
                //data[key]=去除值
            }else{
                result.el[key]=data[key];
                data[key]=analyzeExpessions(data[key]);
                //isFlash=true;
            }
        }
    }
}

function judgeInExpressionsList(data){
    for(var i in expressionsList){
        if(expressionsList[i].data===data){
            return expressionsList[i];
        }
    }
    return null;
}
function analyzeExpessions(str) {
    var reg = /\$\{(.*?)\}/g;
    var expressions=str.match(reg);
    var JsStrs = [];
    console.log(actuator.runStr("1+2"));
    for(var i in expressions) {
        var JsStr= expressions[i].substring(2,expressions[i].length-1);
        JsStrs.push(JsStr);
    }
    var arr = executeJsExpressions(JsStrs);
    for(var m in expressions) {
        str = str.replace(expressions[m],arr[m]);
    }
    return str;
}

//向服务器请求锚点数据
function reqServerAnthorData(anchorArr) {
    for(var i in anchorArr) {
        reqServer("get","http://180.169.113.90/FuHaoSever/one/data/anchorArr[i]",{},false,function(data){
            serverPack[anchorArr[i]] = data;
        });
    }
}

function getServerStrForElExpressions(data,key) {
    var reg = /\*\{(.*?)\}/g;
    var serverExpressions=data[key].match(reg);
    var result=judgeInServerExpressionsList(data);
    if(serverExpressions==null){
        if(result==null){
            return;
        }else{
            data[key]=analyzeServerExpressions(result.el[key]);
        }
    }else{
        if(result==null){
            var queueData={data:data,el:{}};
            queueData.el[key]=data[key];
            serverExpressionslist.push(queueData);
            data[key]=analyzeServerExpressions(data[key]);
            //延迟于后台变量
            //获取去除值
            //data[key]=去除值
        }else{
            if(key in result.el){
                result.el[key]=data[key];
                data[key]=analyzeServerExpressions(data[key]);
                //isFlash=true;
                //获取去除值
                //data[key]=去除值
            }else{
                result.el[key]=data[key];
                data[key]=analyzeServerExpressions(data[key]);
                //isFlash=true;
            }
        }
    }
}
//判断保存的队列里面有没有
function judgeInServerExpressionsList(data) {
    for(var i in serverExpressionslist){
        if(serverExpressionslist[i].data===data){
            return serverExpressionslist[i];
        }
    }
    return null;
}
//解析后台表达式变量
function analyzeServerExpressions(str) {
    var reg = /\*\{(.*?)\}/g;
    var serverExpressions=str.match(reg);
    var JsStrs = [];
    console.log(actuator.runStr("1+2"));
    for(var i in serverExpressions) {
        var JsStr= serverExpressions[i].substring(2,serverExpressions[i].length-1);
        JsStrs.push(JsStr);
    }
    var arr = executeJsExpressions(JsStrs);
    for(var m in serverExpressions) {
        str = str.replace(serverExpressions[m],arr[m]);
    }
    return str;
}