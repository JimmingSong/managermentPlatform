
//解析一个类名字符串
function parseClsStr(cls) {
    if (cls !== "" && cls !== undefined) {
        var arr = cls.split(" ");
        for (var j = 0; j < arr.length; j++) {
            if (arr[j].indexOf("-") !== -1 && arr[j].indexOf("-") !== 0) {
                cssCache(arr[j]);
            }
        }
    }
}

//解析一个页面的css数据
function parseAllPageCls(pageData) {
    cssStAnalysis(pageData.st);
    cssRsAnalysis(pageData.rs);
}
//页面css样式解析
//解析st结构
function cssStAnalysis(stCss) {
    for (var i = 0; i < stCss.chr.length; i++) {
        var st_container = stCss.chr[i];
        parseClsStr(st_container.sty.cls);
        if (st_container.chr !== undefined && st_container.chr !== null && st_container.chr.length > 0) {
            cssStAnalysis(st_container);
        }
    }
}

//解析rs
// cssRsAnalysis(phoneShow.ct)
function cssRsAnalysis(rsDatas) {
    for (var id in rsDatas) {
        parseRenderObj(rsDatas[id].sty);
    }
    ;
}
function parseRenderObj(renderObj) {
    if (renderObj !== null && renderObj !== undefined) {
        parseClsStr(renderObj.cls);
        if (renderObj.chr && renderObj.chr.length > 0) {
            renderObj.chr.forEach(function (item) {
                parseRenderObj(item);
            })
        }
    }
}
//页面css缓存到本地
function cssCache(data) {
    // console.log(data);
    if (data !== "bos" && data !== "iconfont" && data !== "" && data !== "dis-flex" && data.split("-")[0] !== "Ani") {
        var clsName = data;
        var cls;
        var un;
        var str = data.split("-")[0];
        if (str === "bos" || str === "ts") {
            //判断出盒子阴影和 文字阴影类名
            var str1 = data.split("-")[1];   //水平距离
            var str2 = data.split("-")[3];    //水平单位
            var str3 = data.split("-")[4];    //竖直距离
            var str4 = data.split("-")[6];    //竖直单位
            var str5 = data.split("-")[7];   //模糊距离
            var str6 = data.split("-")[9];   //模糊单位
            var str7 = data.split("-")[10];   //颜色
            var cls = cssBaseData.clsName[str] + ":" + judgeNumber(str1) + judgeUnit(str2) + " " + judgeNumber(str3) + judgeUnit(str4) + " " + judgeNumber(str5) + judgeUnit(str6) + " " + "#" + str7;
        } else if (str === "ff") {
            //判断类名为字体类型
            var str1 = data.split("-")[1];
            cls = cssBaseData.clsName[str] + ":" + cssBaseData.clsValue[str][str1];
        } else if (str === "of") {
            //判断类名为overflow
            var str1 = data.split("-")[1];//处理方式的值
            var str2 = data.split("-")[2];//处理方向
            if (str2 === "a") {
                if (str1 === "h") {
                    cls = "overflow:hidden";
                } else {
                    cls = "overflow:" + cssBaseData.clsValue[str][str1 + str2];
                }
            } else if (str2 === "x") {
                cls = "overflow-x:" + cssBaseData.clsValue[str][str1 + str2]
            } else {
                cls = "overflow-y:" + cssBaseData.clsValue[str][str1 + str2]
            }
        } else if (str === "bp") {
            ////判断类名为图片定位
            //定位是可能有用到N+V
            var str1 = data.split("-")[1];
            if (str1 === "l" || str1 === "c" || str1 === "r" || str1 === "t" || str1 === "b") {
                //str1为N+V模式中的V
                cls = cssBaseData.clsName[str] + cssBaseData.clsValue[str][str1];
            } else {
                var str2 = data.split("-")[4];
                if (str1.indexOf("_") === -1) {
                    if (str2.indexOf("_") === -1) {
                        cls = cssBaseData.clsName[str] + ":" + str1 + "%" + " " + str2 + "%";
                    } else {
                        cls = cssBaseData.clsName[str] + ":" + str1 + "%" + " " + (str2.split("_")[0] + "\." + str2.split("_")[1]) + "%";
                    }
                } else {
                    if (str2.indexOf("_") === -1) {
                        cls = cssBaseData.clsName[str] + ":" + (str1.split("_")[0] + "\." + str1.split("_")[1]) + "%" + " " + str2 + "%";
                    } else {
                        cls = cssBaseData.clsName[str] + ":" + (str1.split("_")[0] + "\." + str1.split("_")[1]) + "%" + " " + (str2.split("_")[0] + "\." + str2.split("_")[1]) + "%";
                    }
                }
            }
        } else if (str === "c" || str === "bc" || str === "bdc" || str === "blc" || str === "brc" || str === "btc" || str === "bbc" || str === "oc") {
            //判断为颜色类类型
            var str1 = data.split("-")[1]
            //透明
            if (str1 === "t") {
                cls = cssBaseData.clsName[str] + ":transparent";
            } else {
                cls = cssBaseData.clsName[str] + ":" + "#" + str1;
            }
        } else if (str === "br") {
            //全部圆角
            var arr = data.split("--");
            if (arr.length === 5) {
                var str1 = arr[0].split("-")[1];//第一个值
                var un1 = arr[1].split("-")[0];//第一个值的单位
                var str2 = arr[1].split("-")[1];//第2个值
                var un2 = arr[2].split("-")[0]//第2个值的单位
                var str3 = arr[2].split("-")[1];//第3个值
                var un3 = arr[3].split("-")[0]//第3个值的单位
                var str4 = arr[3].split("-")[1];//第4个值
                var un4 = arr[4];//第4个值的单位
                cls = cssBaseData.clsName[str] + ":" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2) + " " + judgeNumber(str3) + judgeUnit(un3) + " " + judgeNumber(str4) + judgeUnit(un4);
            } else if (arr.length === 4) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1].split("-")[0]
                var str2 = arr[1].split("-")[1];
                var un2 = arr[2].split("-")[0]
                var str3 = arr[2].split("-")[1];
                var un3 = arr[3];
                cls = cssBaseData.clsName[str] + ":" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2) + " " + judgeNumber(str3) + judgeUnit(un3);
            } else if (arr.length === 3) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1].split("-")[0]
                var str2 = arr[1].split("-")[1];
                var un2 = arr[2];
                cls = cssBaseData.clsName[str] + ":" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2);
            } else if (arr.length === 2) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1];
                cls = cssBaseData.clsName[str] + ":" + judgeNumber(str1) + judgeUnit(un1);
            }
        } else if (str === "brt") {
            //右上圆角
            var arr = data.split("--");
            if (arr.length === 3) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1].split("-")[0]
                var str2 = arr[1].split("-")[1];
                var un2 = arr[2];
                cls = "border" + "\-" + "top" + "\-" + "right" + "\-" + "radius:" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2);
            } else if (arr.length === 2) {
                var str1 = data.split("-")[1];
                var str2 = data.split("-")[3];
                if (str2 === "x") {
                    un = "px";
                } else if (str2 === "p") {
                    un = "%";
                } else {
                    un = "rem";
                }
                cls = "border" + "\-" + "top" + "\-" + "right" + "\-" + "radius:" + judgeNumber(str1) + un;
            }

        } else if (str === "blt") {
            //左上圆角
            var arr = data.split("--");
            if (arr.length === 3) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1].split("-")[0]
                var str2 = arr[1].split("-")[1];
                var un2 = arr[2];
                cls = "border" + "\-" + "top" + "\-" + "left" + "\-" + "radius:" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2);
            } else if (arr.length === 2) {
                var str1 = data.split("-")[1];
                var str2 = data.split("-")[3];
                if (str2 === "x") {
                    un = "px";
                } else if (str2 === "p") {
                    un = "%";
                } else {
                    un = "rem";
                }
                cls = "border" + "\-" + "top" + "\-" + "left" + "\-" + "radius:" + judgeNumber(str1) + un;
            }
        } else if (str === "blb") {
            //左下圆角
            var arr = data.split("--");
            if (arr.length === 3) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1].split("-")[0]
                var str2 = arr[1].split("-")[1];
                var un2 = arr[2];
                cls = "border" + "\-" + "bottom" + "\-" + "left" + "\-" + "radius:" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2);
            } else if (arr.length === 2) {
                var str1 = data.split("-")[1];
                var str2 = data.split("-")[3];
                if (str2 === "x") {
                    un = "px";
                } else if (str2 === "p") {
                    un = "%";
                } else {
                    un = "rem";
                }
                cls = "border" + "\-" + "bottom" + "\-" + "left" + "\-" + "radius:" + judgeNumber(str1) + un;
            }

        } else if (str === "brb") {
            //右下圆角
            var arr = data.split("--");
            if (arr.length === 3) {
                var str1 = arr[0].split("-")[1];
                var un1 = arr[1].split("-")[0]
                var str2 = arr[1].split("-")[1];
                var un2 = arr[2];
                cls = "border" + "\-" + "bottom" + "\-" + "right" + "\-" + "radius:" + judgeNumber(str1) + judgeUnit(un1) + " " + judgeNumber(str2) + judgeUnit(un2);
            } else if (arr.length === 2) {
                var str1 = data.split("-")[1];
                var str2 = data.split("-")[3];
                if (str2 === "x") {
                    un = "px";
                } else if (str2 === "p") {
                    un = "%";
                } else {
                    un = "rem";
                }
                cls = "border" + "\-" + "bottom" + "\-" + "right" + "\-" + "radius:" + judgeNumber(str1) + un;
            }

        } else if (str === "bgi") {
            //背景图片
            var obj = {};
            //处理如果存在多个 - 的情况下，拼接图片名称和图片类型
            if (data.split("-").length === 3) {
                var str1 = data.split("-")[1] + "\." + data.split("-")[2];
            } else {
                var arr1 = data.split("-");
                arr1.splice(0, 1);
                arr1.splice(arr1.length - 1, 1);
                var str2 = arr1.join("-");
                var str1 = str2 + "\." + data.split("-")[data.split("-").length - 1]
            }
            obj.n = str1;
            //从数据库请求图片的方法
            resClsImgCache(obj);
            cls = "background-image:url(" + bytecode + ")";
        } else if (str === "fl") {
            var str1 = data.split("-")[1];
            var str2 = data.split("-")[2];
            if (str2.toString().indexOf("_") === -1) {
                cls = cssBaseData.clsName[str] + ":" + cssBaseData.clsValue[str][str1] + "(" + str2 + "%)";
            } else {
                var arr = str2.split("_");
                cls = cssBaseData.clsName[str] + ":" + cssBaseData.clsValue[str][str1] + "(" + arr[0] + "\." + arr[1] + "%)";
            }
        } else {
            if (data.indexOf("--") === -1) {
                //判断没有单位
                if (str === "ord" || str === "fg" || str === "fsh" || str === "zd" || str === "o") {
                    //没有单位并且不是n+v类型，值为动态输入的值
                    var str1 = data.split("-")[1];
                    cls = cssBaseData.clsName[str] + ":" + judgeNumber(str1);
                }
                else {
                    //没有单位，为N+V类型
                    var str1 = data.split("-")[1];
                    cls = cssBaseData.clsName[str] + ":" + cssBaseData.clsValue[str][str1];
                }
            } else {
                //普通的  类名-值-单位类型
                var str1 = data.split("-")[1];
                var str2 = data.split("-")[3];
                if (str2 === "x") {
                    un = "px";
                } else if (str2 === "p") {
                    un = "%";
                } else if (str2 === "r") {
                    un = "rem";
                } else if (str2 === "s") {
                    un = "s";
                } else if (str2 === "ms") {
                    un = "ms";
                } else if (str2 === "v") {
                    if (str === "w") {
                        un = "vw";
                    } else {
                        un = "vh";
                    }
                }
                if (str1.indexOf("_") === -1) {
                    if (str1.indexOf("b") === -1) {
                        cls = cssBaseData.clsName[str] + ":" + str1 + un;
                    } else {
                        cls = cssBaseData.clsName[str] + ":" + "\-" + str1.substr(1) + un;
                    }
                } else {
                    if (str1.indexOf("b") === -1) {
                        cls = cssBaseData.clsName[str] + ":" + (str1.split("_")[0] + "\." + str1.split("_")[1]) + un;
                    } else {
                        cls = cssBaseData.clsName[str] + ":" + ("\-" + str1.substr(1).split("_")[0] + "\." + str1.split("_")[1]) + un;
                    }
                }

            }
        }
        cssDynaCache.addCssRule(clsName, cls);
        // var name="."+clsName+"{"+cls+"}";
        // return name;
    }
}

//css判断单位
function judgeUnit(un) {
    var unit;
    if (un === "p") {
        unit = "%"
    } else if (un === "r") {
        unit = "rem";
    } else if (un === "x") {
        unit = "px";
    } else if (un === "s") {
        unit = "s";
    } else if (un === "ms") {
        unit = "ms";
    } else if (un === "v") {
        if (str === "w") {
            unit = "vw";
        } else {
            unit = "vh";
        }
    }
    return unit;
}

//css判断小数点
function judgeNumber(str) {
    if (str.indexOf("_") !== -1) {
        str = str.split("_")[0] + "\." + str.split("_")[1];
    } else {
        str = str;
    }
    ;
    if (str.indexOf("b") !== -1) {
        str = "\-" + str.substr(1);
    } else {
        str = str;
    }
    return str;
}

//混合组件渲染对象的css数据
function mixComponetStyle(oldStyle, newStyle) {
    if (oldStyle.cls !== undefined && newStyle.cls !== undefined) {
        oldStyle.cls = mixStyleStr(oldStyle.cls, newStyle.cls);
        if (oldStyle.chr && newStyle.chr) {
            oldStyle.chr.forEach(function (item, index) {
                mixComponetStyle(item, newStyle.chr[index]);
            })
        }
        return oldStyle;
    } else {
        return null;
    }
}


//点击按钮删除类名
function delCssName(conCls, clsName) {
    if (conCls == null && conCls == undefined) {
        return;
    }
    if (conCls.cls !== "" && conCls.cls !== undefined) {
        var arr = conCls.cls.split(" ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) {
                if (arr[i] === clsName || arr[i] === "") {
                    arr.splice(i, 1);
                }
            }
        }
        ;
        conCls.cls = arr.join(" ")
    }

}
/**
 * 混合两个class字符串 替换相同键值的 添加没有的
 * @param oldClsStr 旧class字符串
 * @param newClsStr 新class字符串
 * @return {String} 完成替换的旧class字符串
 */
function mixStyleStr(oldClsStr, newClsStr) {
    if (oldClsStr === undefined || oldClsStr === "") {
        if (newClsStr === undefined || newClsStr === "") {
            return "";
        } else {
            parseClsStr(newClsStr);
            return newClsStr;
        }
    }
    parseClsStr(newClsStr);
    var clsArray = newClsStr.split(" ");
    // console.log(clsArray.length);
    clsArray.forEach(function (item) {
        if (item === "") {
            return;
        }
        //组合类的情况
        if (item.indexOf("-") === 0) {
            //如果字符串中没有就做拼接
            if (oldClsStr.indexOf(" " + item + " ") === -1 && oldClsStr.indexOf(item) !== 0 && oldClsStr.substr(oldClsStr.lastIndexOf(" ") + 1, oldClsStr.length) !== item) {
                oldClsStr = oldClsStr + " " + item;
            }
        } else {
            //基础类的情况
            var str = item.substring(0, item.indexOf("-"));
            if (oldClsStr.indexOf(" " + str + "-") !== -1) {
                var pattern = new RegExp('\\s' + str + '-.*?\\s', 'g');
                oldClsStr = oldClsStr.replace(pattern, " " + item + " ");
                //考虑在末尾的情况
                if (oldClsStr.substr(oldClsStr.lastIndexOf(" "), oldClsStr.length).indexOf(" " + str + "-") !== -1) {
                    oldClsStr = oldClsStr.substring(0, oldClsStr.lastIndexOf(" ")) + " " + item;
                }
            } else if (oldClsStr.indexOf(str) === 0) {
                //考虑在开头的情况
                if (oldClsStr.indexOf(" ") !== -1) {
                    oldClsStr = item + " " + oldClsStr.substring(oldClsStr.indexOf(" "), oldClsStr.length);
                } else {
                    oldClsStr = item;
                }
            } else {
                oldClsStr = oldClsStr + " " + item;
            }
        }

    });
    return oldClsStr;
}


//从数据库中取背景图片数据
var bytecode = "";

function resClsImgCache(data) {
    reqServer("post", "selectPictureByName.action", {jsonMessage: [data.n]}, false, function (resData) {
        if (resData.indexOf("无此图片") !== -1) {
            $.layer.alert("没有" + data.n + "图片");
        } else {
            resData = JSON.parse(resData);
            // console.log(resData);
            bytecode = resData[0].v;
        }
    });
}


//请求图片信息
function reqServer(type, url, jsonData, isAsync, success, error) {
    if (error) {
        error = function (failinfo) {
            alert("请求失败");
            console.info(JSON.stringify(failinfo));
        }
    }
    var IP = location.hostname, port = location.port;
    var baseUrl = "http://" + IP + ":" + port + "/";
    $.ajax({
        type: type,
        data: JSON.stringify(jsonData),
        url: baseUrl + url,
        contentType: "application/json;charset=utf-8",
        async: isAsync,
        success: success,
        error: error
    })
}