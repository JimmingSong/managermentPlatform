var obj;
var fuhaothis;
var newZujianData = {
    "k":"kv","n":"姓名:","v":"刘静","tp":"kv",es:[],
    "cls":{
        "css":"",
        "lo":"",
        "dom":""
    }
};//图片
function getEvent(data) {
    var event = {};
    data.es.map(function(item) {
        var valueType = Object.prototype.toString.call(item.v);
        if(valueType === '[object Function]'){
            event[item.k] = item.v;
        }else {
            event[item.k] = function(e) {
                obj = e;
                fuhaothis = data;
                window.event? window.event.cancelBubble = true : e.stopPropagation();
                sendCommandToAndroid(item.v);
            }
        }
    });
    return event;
}
//事件流
function getEsArr(data) {
    var es = [];
    data.es
        .map(function(item) {
            var valueType = Object.prototype.toString.call(item.v);
            if(valueType === '[object Function]'){
                var event = {};
                event[item.k]=item.v;
                es.push(event);
            }else {
                var event = {};
                event[item.k]=function(e) {
                    obj = e;
                    fuhaothis = data;
                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                    sendCommandToAndroid(item.v);
                };
                es.push(event);
            }
        });
    return es;
}
var actuator = new Actuator();
//执行器对象
function Actuator(){
    this.strArr=[];
    this.pushStr = function(str){
        this.strArr.push(str);
    };
    this.runStrs=function(){
        if (this.strArr.length === 0) {
            return false;
        }
        var that = this;
        this.strArr.forEach(function(str){
            that.runStr(str);
        });
        return true;
    };
    this.runStr=function(str){
        eval(str);
        return true;
    }
}

function postCommand(dealStr){
    var flag;
    var json=JSON.parse(dealStr);
    //console.log(dealStr);
    var flag;
    /*if(!"level" in json && level!=0){
     actuator.pushStr(dealStr["command"]);
     }*/
    flag = actuator.runStr(json["command"]);
}

function sendCommandToAndroid(CommandStr,level) {
    //window.android.Test("");
    //window.android.postCommand(CommandStr);
    var commandData={command:CommandStr,level:level||0};
    //invokePlatformFun("Test","sendCommandToAndroid");
    // invokePlatformFun("postCommand",JSON.stringify(commandData));
    postCommand(JSON.stringify(commandData));
}
function bigImage(e){
    console.log(e);
    var frag = document.createDocumentFragment();
    var div = document.createElement("div");
    //div.style.width = document.documentElement.clientWidth+"px";
    var img = document.createElement("img");
    var imgurl = e.target.attributes[0].nodeValue;
    img.setAttribute("src",imgurl);
    // img.style.width = document.style.width;
    img.setAttribute("class","big-img");
    div.style.position = "absolute";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%,-50%)";
    div.appendChild(img);
    document.body.appendChild(div);
    document.querySelector(".big-img").onclick = function (e) {
        document.body.querySelector(".big-img").parentNode.remove();
    }
}
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

/**
 * 页面跳转事件
 * @param pageId
 */
var pageList = [];
function toPage(pageId) {
    let value = {};
    value.id = pageId;
    value.n = phoneShow.name || "";
    value.tp = phoneShow.tp;
    // value = JSON.stringify(value);
    reqServer("post", "selectNPageDataById", value, false, function (data) {
        if (data === "搜索结果为空") {
            $.layer.alert("页面不存在!")
        } else {
            let sData = JSON.parse(data);
            //解析数据中的样式，并缓存到本地
            parseAllPageCls(sData);
            //将数据传给预览页面
            phoneData.lookData = lookPhone = getParsePageData(sData);
            pageList.push(pageId)
        }
    })
}

/**
 * 返回按钮事件
 */
function backPage() {
    let value = {};
    value.id = pageList.pop();
    value.n = phoneShow.name || "";
    value.tp = phoneShow.tp;
    // value = JSON.stringify(value);
    reqServer("post", "selectNPageDataById", value, false, function (data) {
        if (data === "搜索结果为空") {
            $.layer.alert("页面不存在!")
        } else {
            let sData = JSON.parse(data);
            //解析数据中的样式，并缓存到本地
            parseAllPageCls(sData);
            //将数据传给预览页面
            phoneData.lookData = lookPhone = getParsePageData(sData);
        }
    })
}

/**
 *
 * @param e
 * @param data
 */
function popToTop(e, data) {
    e.stopPropagation();
    let phoneModel = document.querySelector('#show-screen>div:nth-child(3)');
    let phoneL = phoneModel.getBoundingClientRect().left;
    let phoneT = phoneModel.getBoundingClientRect().top;
    var curTar = e.currentTarget;
    //获取当前div相对于X坐标
    var left = curTar.getBoundingClientRect().left;
    //获取当前div相对于body的Y坐标
    var top = curTar.getBoundingClientRect().top;
    let con;
    if (data.tg.indexOf(",") > -1) {
        con = getContainerData(data.tg);
    } else {
        con = lookPhone.rs[data.tg];
    }
    let clsArr = con.sty.cls.split(" ");
    let showTar = con.__ob__.dep.subs[1].vm.$el;
    let offsetW;
    if (curTar.clientWidth >= showTar.clientWidth) {
        offsetW = (curTar.clientWidth - $(showTar).width()) / 2
    } else {
        offsetW = 0;
    }
    //let dis = getComputedStyle(showTar)['display'];
    //if(dis === "none"){
    //    showTar.style.display = "block"
    //}
    showTar.style.position = "fixed";
    showTar.style.top = top - (phoneT + $(showTar).height()) + 'px';
    showTar.style.left = left - phoneL + offsetW + 'px';
    //document.body.onclick = function (e) {
    //    e.preventDefault();
    //    e.stopPropagation();
    //    showTar.style.display = ''
    //}
    if (showTar.style.display === 'none') {
        showTar.style.display = 'block'
    }
    document.body.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        showTar.style.display = 'none'
    }
}
/**
 * 弹出框从右边开始展示
 * @param e
 * @param data
 */
function rightPopToTop(e, data) {
    e.stopPropagation();
    let phoneModel = document.querySelector('#show-screen>div:nth-child(3)');
    let phoneR = phoneModel.getBoundingClientRect().right;
    let phoneT = phoneModel.getBoundingClientRect().top;
    var curTar = e.currentTarget;
    //获取当前div相对于X坐标
    var right = curTar.getBoundingClientRect().right;
    //获取当前div相对于body的Y坐标
    var top = curTar.getBoundingClientRect().top;
    var con;
    if (data.tg.indexOf(",") > -1) {
        con = getContainerData(data.tg);
    } else {
        con = lookPhone.rs[data.tg];
    }
    let clsArr = con.sty.cls.split(" ");
    //let L,R,direction;
    //for(let item of clsArr){
    //    direction = item.split("-")[0];
    //    switch (direction){
    //        case 'l':
    //        case 'r':
    //            let distance = item.split("-")[1].split("--")[0];
    //            if(distance) L = parseInt(distance); else L = 0;
    //            break;
    //        case 't':
    //        case 'b':
    //            let distance1 = item.split("-")[1].split("--")[0];
    //            if(distance1) R = parseInt(distance1); else R = 0;
    //            break;
    //    }
    //}
    //console.log(L+":"+R);
    let showTar = con.__ob__.dep.subs[1].vm.$el;
    //let offsetW;
    let showTarWid = $(showTar).width();
    //if (curTar.clientWidth >= showTarWid) {
    //    offsetW = (curTar.clientWidth - showTarWid) / 2
    //} else {
    //    offsetW = 0;
    //}
    //if(!L)L = 0;
    //if(!R)R = 0;
    if (showTar.style.display === 'none') {
        showTar.style.display = 'block'
    }
    showTar.style.position = "fixed";
    showTar.style.top = top - (phoneT + $(showTar).height()) + 'px';
    showTar.style.right = right - phoneR + 'px';
    document.body.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        showTar.style.display = 'none'
    };
    //window.addEventListener("click", function (e) {
    //    e.preventDefault();
    //    e.stopPropagation();
    //    showTar.style.display = ''
    //})
}

/**
 * 获取body超出浏览器的距离
 * @returns {*}
 */
function getScrollPos() {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    }
    else if (document.compatMode && document.compatMode !== 'BackCompat') {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scrollPos = document.body.scrollTop;
    }
    return scrollPos;
}