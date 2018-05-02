function stringToArray(str){
    if(typeof str !="string") {
        str = JSON.stringify(str);
    }
    return str.split(" ");
}

function arrayToString(array){
    return array.join(" ");
}

function chooseStringFromArray(array,str){
    return array.indexOf(str);
}

function copyData(data){
    if(!data){
        return data;
    }
    return  JSON.parse(JSON.stringify(data));
}

function GetRequest() {
    var url = location.search;
    if (url.indexOf("?") != -1) {
        return url.substr(1);
    }
    return "";
}

function isJson(str){
    try{
        if(JSON.parse(str)){
            return true;
        }
    }catch(e){
        return false;
    }
}

function isRepeat(array,str){
	if(array.indexOf(str)>=0){
		return true;
	}
	return false;
}

function clearSameForArray(array){
    var newArray = [];
    for(var i in array) {
        if(newArray.indexOf(array[i])==-1) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}
function jsonToString(el) {
    var newEl = JSON.stringify(el);
    return newEl;
}
function  stringToJson(el) {
    var newEl = JSON.parse(el);
    return newEl;
}
//去空格
function removeSpace(str) {
    var resultStr = str.replace(/\ +/g, ""); //去掉空格
    return resultStr;
}
//去回车
function removeEnter(str) {
    var resultStr = str.replace(/[\r\n]/g, ""); //去掉回车换行
    return resultStr;
}
//去空格回车
function removeSpaceOrEnter(str) { 
    var resultStr = str.replace(/\ +/g, ""); //去掉空格
    resultStr = str.replace(/[\r\n]/g, ""); //去掉回车换行
    return resultStr;
}
//深度复制
function extendDeep(parent, child) {
    var i,proxy;
    proxy = JSON.stringify(parent); //把parent对象转换成字符串
    proxy = JSON.parse(proxy); //把字符串转换成对象，这是parent的一个副本
    child = child || {};
    for(i in proxy) {
        if(proxy.hasOwnProperty(i)) {
            child[i] = proxy[i];
        }
    }
    proxy = null; //因为proxy是中间对象，可以将它回收掉
    return child;
}

function clearCls(clsObj) {
    if (clsObj instanceof Array) {
        for (var i = 0; i < clsObj.length; i++) {
            clsObj[i].cls = "";
            if (clsObj.chr) {
                clearCls(clsObj[i].chr)
            }
        }
    } else {
        clsObj.cls = "";
        if (clsObj.chr) {
            clearCls(clsObj.chr)
        }
    }
}