//样式拼接
function classAddToStyle() {
    //通用的类名拼接方法
    this.clsJoin = function (n, v, un, clsname, conCls) {
        let clsName, str, arr, value;
        //css类名
        if (n === "m" || n === "ml" || n === "mr" || n === "mb" || n === "mt") {
            //判断值是否有符号，如果有转换成b
            if (v.toString().indexOf("-") === -1) {
                //判断值是否有小数点,如果有转换成_
                if (v.toString().indexOf(".") === -1) {
                    clsName = n + "-" + v + "--" + un;
                } else {
                    str = v.toString();
                    arr = str.split(".");
                    value = (arr[0] + "\." + arr[1]);
                    clsName = n + "-" + arr[0] + "_" + arr[1] + "--" + un;
                }
            } else {
                if (v.toString().indexOf(".") === -1) {
                    clsName = n + "-b" + v.toString().substr(1) + "--" + un;
                } else {
                    str = v.toString();
                    arr = str.split(".");
                    value = ("\-" + arr[0].toString().substr(1) + "\." + arr[1]);
                    clsName = n + "-b" + arr[0].toString().substr(1) + "_" + arr[1] + "--" + un;
                }
            }
        } else {
            if (v.toString().indexOf(".") === -1) {
                clsName = n + "-" + v + "--" + un;
            } else {
                str = v.toString();
                arr = str.split(".");
                value = (arr[0] + "\." + arr[1]);
                clsName = n + "-" + arr[0] + "_" + arr[1] + "--" + un;
            }
        }
        addCssName(conCls, clsName)
    };
    //flex子项拼接方法，直接把键和值进行拼接
    this.flexClsJoin = function (n, v, clsname, conCls) {
        var clsName = n + "-" + v;
        addCssName(conCls, clsName)
    };
    //定位中Y轴方向的拼接规则    top   bottom
    //注意当类名中有top的时候，要把对应的类名中的bottom删掉
    this.clsTBJoin = function (point, clsname, v, un, conCls) {
        let pt, clsName, str, arr, value;
        if (point === "tl" || point === "tr") {
            pt = "t";
        } else {
            pt = "b"
        }
        //css类名
        if (v.toString().indexOf("-") === -1) {
            if (v.toString().indexOf(".") === -1) {
                clsName = pt + "-" + v + "--" + un;
            } else {
                str = v.toString();
                arr = str.split(".");
                value = (arr[0] + "\." + arr[1]);
                clsName = pt + "-" + arr[0] + "_" + arr[1] + "--" + un;
            }
        } else {
            if (v.toString().indexOf(".") === -1) {
                clsName = pt + "-b" + v.toString().substr(1) + "--" + un;
            } else {
                str = v.toString();
                arr = str.split(".");
                value = ("\-" + arr[0].toString().substr(1) + "\." + arr[1]);
                clsName = pt + "-b" + arr[0].toString().substr(1) + "_" + arr[1] + "--" + un;
            }
        }
        if (pt === "t") {
            clearPosCls(conCls, "b")
        } else {
            clearPosCls(conCls, "t")
        }
        addCssName(conCls, clsName)
    };
    //定位中X轴方向的拼接规则    left   right
    this.clsLRJoin = function (point, clsname, v, un, conCls) {
        var pt, str, arr, value, clsName;
        if (point === "tl" || point === "bl") {
            pt = "l";
        } else {
            pt = "r"
        }
        //css类名
        if (v.toString().indexOf("-") === -1) {
            if (v.toString().indexOf(".") === -1) {
                clsName = pt + "-" + v + "--" + un;
            } else {
                str = v.toString();
                arr = str.split(".");
                value = (arr[0] + "\." + arr[1]);
                clsName = pt + "-" + arr[0] + "_" + arr[1] + "--" + un;
            }
        } else {
            if (v.toString().indexOf(".") === -1) {
                clsName = pt + "-b" + v.toString().substr(1) + "--" + un;
            } else {
                str = v.toString();
                arr = str.split(".");
                value = ("\-" + arr[0].toString().substr(1) + "\." + arr[1]);
                clsName = pt + "-b" + arr[0].toString().substr(1) + "_" + arr[1] + "--" + un;
            }
        }

        if (pt === "l") {
            clearPosCls(conCls, "r")
        } else {
            clearPosCls(conCls, "l")
        }

        addCssName(conCls, clsName)
    };
    //单选和多选的拼接规则
    this.inputClick = function (n, val, clsname, clsvalue, conCls) {
        var clsName = n + "-" + val;
        var cls = clsname[n] + ":" + clsvalue[n][val];
        addCssName(conCls, clsName)
    };
    //overflow的拼接规则
    this.ofChange = function (n, v, v1, clsname, clavalue, conCls) {
        var clsName = n + "-" + v + "-" + v1;
        addCssName(conCls, clsName)
    };
    //圆角的拼接规则
    this.brChange = function (n, v, un, v1, un1, clsname, conCls) {
        var clsName;
        if (v.toString().indexOf(".") !== -1) {
            var str = v.toString();
            var arr = str.split(".");
            v = arr[0] + "_" + arr[1];
        }
        if (v1.toString().indexOf(".") !== -1) {
            var str = v1.toString();
            var arr = str.split(".");
            v1 = arr[0] + "_" + arr[1];
        }
        if (v === 0 && v1 !== 0) {
            clsName = n + "-" + v1 + "--" + un1;
        } else if (v !== 0 && v1 === 0) {
            clsName = n + "-" + v + "--" + un;
        } else {
            clsName = n + "-" + v + "--" + un + "-" + v1 + "--" + un1;
        }


        addCssName(conCls, clsName);

    };
    //阴影的拼接规则
    this.tsClick = function (n, v, v1, v2, c, clsname, un, un1, un2, conCls) {
        var str = v.toString();
        if (str.indexOf("-") === -1) {
            if (str.indexOf(".") === -1) {
                var val = v;
            } else {
                var val = str.split(".")[0] + "_" + str.split(".")[1];
            }
        } else {
            if (str.indexOf(".") === -1) {
                var val = "b" + v;
            } else {
                var val = "b" + str.split(".")[0].substr(1) + "_" + str.split(".")[1];
            }
        }

        var str1 = v1.toString();
        if (str1.indexOf("-") === -1) {
            if (str1.indexOf(".") === -1) {
                var val1 = v1;
            } else {
                var val1 = str1.split(".")[0] + "_" + str1.split(".")[1];
            }
        } else {
            if (str1.indexOf(".") === -1) {
                var val1 = "b" + v1;
            } else {
                var val1 = "b" + str1.split(".")[0].substr(1) + "_" + str1.split(".")[1];
            }
        }

        var str2 = v2.toString();
        if (str2.indexOf(".") === -1) {
            var val2 = v2;
        } else {
            var val2 = str2.split(".")[0] + "_" + str2.split(".")[1];
        }
        var input = document.getElementsByClassName("shadowCls")[1];
        var input1 = document.getElementsByClassName("shadowCls")[0];
        if (input.value.indexOf("#") !== 0) {
            c = "#" + input.value;
        }
        if (input.value.length < 7) {
            for (var i = input.value.length - 1; i < 6; i++) {
                c = c + "0";
            }
        } else if (input.value.length > 7) {
            c = input.value.substring(0, 7)
        } else {
            c = input.value
        }

        var clsName = n + "-" + val + "--" + un + "-" + val1 + "--" + un1 + "-" + val2 + "--" + un2 + "-" + c.toString().substr(1).toUpperCase();
        addCssName(conCls, clsName);
        input.value = c;
        input1.value = c;
    };
    //背景图片定位的拼接规则
    this.imgPosition = function (n, v, v1, clsname, conCls) {
        var str = v.toString();
        var arr = str.split(".");
        var str1 = v.toString();
        var arr1 = str1.split(".");
        if (v.toString().indexOf(".") === -1 || v1.toString().indexOf(".") === -1) {
            var clsName = n + "-" + v + "--p" + "-" + v1 + "--p";
        } else if (v.toString().indexOf(".") === -1 || v1.toString().indexOf(".") !== -1) {
            var clsName = n + "-" + v + "--p" + "-" + arr1[0] + "_" + arr1[1] + "--p";
        } else if (v.toString().indexOf(".") !== -1 || v1.toString().indexOf(".") === -1) {
            var clsName = n + "-" + arr[0] + "_" + arr[1] + "--p" + "-" + v1 + "--p";
        } else {
            var clsName = n + "-" + arr[0] + "_" + arr[1] + "--p" + "-" + arr1[0] + "_" + arr1[1] + "--p";
        }
        addCssName(conCls, clsName)
    };
}


//点击图标删除类名
function delClass(conCls, n) {
    var str;
    var arr = conCls.cls.split(" ");
    for (var i = 0; i < arr.length; i++) {
        str = arr[i].slice(0, n.length);
        if (str === n) {
            arr.splice(i, 1);
        }
    }
    conCls.cls = arr.join(" ")
}

//上传图片
function addBgiImg(e) {
    var file = e.files[0];
    console.log(file.name);
    classAndData.cls.numValue.bcgImgName = file.name;
    r = new FileReader();  //本地预览
    r.onload = function () {
        classAndData.cls.numValue.bcgImg = r.result;
    };
    r.readAsDataURL(file);    //Base64
}


//上传图片
function reqClsImgData(data) {
    console.log(data);
    var IP = location.hostname, port = location.port;
    $.ajax({
        type: "post",
        data: JSON.stringify({jsonMessage: data}),
        url: "http://" + IP + ":" + port + "/addPicture.action",
        dataType: "json",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            if (data) {
                $.layer.alert("图片存储成功");
            }
        },
        error: function (e) {
            alert("链接失败")
        }
    })
}

//给容器和组件添加类
function addCssName(conCls, clsName) {
    if (conCls == null && conCls == undefined) {
        return;
    }
    //if (conCls.sty) {
    //    conCls.sty = mixStyleStr(conCls.sty, clsName);
    //}else{
    //    conCls.cls = mixStyleStr(conCls.cls, clsName);
    //}
    conCls.cls = mixStyleStr(conCls.cls, clsName);
    console.log(conCls)
}

//清除定位的类名
function clearPosCls(conCls, b) {
    if (conCls == null && conCls == undefined) {
        return;
    }
    if (conCls.cls !== "" && conCls.cls !== undefined) {
        var arr = conCls.cls.split(" ");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== undefined) {
                if (arr[i].split("-")[0] === b || arr[i] === "") {
                    arr.splice(i, 1);
                }
            }
        }
        conCls.cls = arr.join(" ")
    }
}


//清除按钮样式
function clearBtnCls(clsName, arr, cls) {
    if (cls[clsName.split("-")[0] + clsName.split("-")[1]].st === true) {
        for (var i = 0; i < arr.length; i++) {
            cls[arr[i]].st = false;
        }
        cls[clsName.split("-")[0] + clsName.split("-")[1]].st = true;
    } else {
        for (var i = 0; i < arr.length; i++) {
            cls[arr[i]].st = false;
        }
    }

}

//清除动画类，改为默认不添加动画
function clearAni(arr) {
    if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "animated") {
                arr.splice(arr.indexOf(arr[i]), 1);
            } else {
                if (arr[i].split("-")[0] === "Ani") {
                    arr.splice(i, 1);
                }
            }
        }
    }
}