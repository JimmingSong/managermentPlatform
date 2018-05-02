function attributeParse() {
    //解析cls结构
    this.renderStyParse = function (sty) {
        this.clsStrParse(sty.cls);
        var _this = this;
        if (sty.chr && sty.chr.length > 0) {
            sty.chr.forEach(function (item) {
                _this.renderStyParse(item);
            })
            }
    };
    this.renderStyParse1 = function (sty) {
        this.clsStrParse(sty.cls);
        // var _this = this;
        // if (sty.chr && sty.chr.length > 0) {
        //     sty.chr.forEach(function (item) {
        //         _this.renderStyParse(item);
        //     })
        // }
    };
     //对类名进行解析
    var pos;
    var pos1;
    this.clsStrParse = function (clsStr) {
        if (!clsStr) {
            return;
        }
        var arr = stringToArray(clsStr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== "") {
                this.clsParse(arr[i]);
            }
        }
    };
    this.clsParse = function (cls) {
        var obj = {}, fs;
        if (cls.indexOf("-") === 0) {
            //判断类名是不是开头第一个字符为 - 的组合类
            if (cls.split("-")[1] === "i") {
                classAndData.cls.numValue.i = {
                    test: "图标",
                    name: "i",
                    st: true,
                };
            }
            if (cls.split("-")[1] === "c") {
                classAndData.cls.numValue.cc = {
                    test: "绝对居中",
                    name: "c",
                    st: true,
                };
            }
        } else {
            fs = cls.split("-")[0];
            if (cls.split("--").length === 2) {
                //判断只有一个单位的类名
                obj.unit = cls.split("--")[1];//单位
                var v = cls.split("--")[0];
                var val;
                //判断时候含有负数
                if (v.split("-")[1].indexOf("b") !== -1) {
                    val = "\-" + v.split("-")[1].substr(1);
                } else {
                    val = v.split("-")[1]
                }
                //判断是否含有小数点
                if (val.indexOf("_") !== -1) {
                    val = val.split("_")[0] + "\." + val.split("_")[1];
                }

                obj.value = val;//值
                obj.name = v.split("-")[0];
                classAndData.cls.numValue[fs + "d"] = obj;
                switch (fs) {
                    case "l":
                    case "r":
                        //定位中的left   right
                        pos = fs;
                        classAndData.cls.numValue.lrd = obj;
                        break;
                    case "t":
                    case "b":
                        //定位中的top   bottom
                        pos1 = fs;
                        classAndData.cls.numValue.tbd = obj;
                        break;
                    case "m":
                    case "ml":
                    case "mr":
                    case "mt":
                    case "mb":
                        //外边距
                        if (obj.value.indexOf("b") !== -1) {
                            obj.value = "\-" + obj.value.substr(1);
                        }
                        if (obj.value.indexOf("_") !== -1) {
                            obj.value = obj.value.split("_")[0] + "\." + obj.value.split("_")[1];
                        }
                        classAndData.cls.numValue.selMarPad = "margin";
                        classAndData.cls.numValue.marginPadding = fs;
                        classAndData.cls.numValue.margin = [{
                            "n": "全部外边距",
                            "v": "m"
                        }, {
                            "n": "上外边距",
                            "v": "mt"
                        }, {
                            "n": "下外边距",
                            "v": "mb"
                        }, {
                            "n": "左外边距",
                            "v": "ml"
                        }, {
                            "n": "右外边距",
                            "v": "mr"
                        }];
                        classAndData.cls.numValue.md = obj;
                        break;
                    case "pd":
                    case "pl":
                    case "pr":
                    case "pt":
                    case "pb":
                        //内边距
                        if (obj.value.indexOf("_") !== -1) {
                            obj.value = obj.value.split("_")[0] + "\." + obj.value.split("_")[1];
                        }
                        classAndData.cls.numValue.selMarPad = "padding";
                        classAndData.cls.numValue.marginPadding = fs;
                        classAndData.cls.numValue.margin = [{
                            "n": "全部内边距",
                            "v": "pd"
                        }, {
                            "n": "上内边距",
                            "v": "pt"
                        }, {
                            "n": "下内边距",
                            "v": "pb"
                        }, {
                            "n": "左内边距",
                            "v": "pl"
                        }, {
                            "n": "右内边距",
                            "v": "pr"
                        }];
                        classAndData.cls.numValue.md = obj;
                        break;
                    case "br":
                    case "blt":
                    case "blb":
                    case "brt":
                    case "brb":
                        //圆角
                        classAndData.cls.numValue.selBorRad = obj.name;
                        if (obj.value.indexOf("b") !== -1) {
                            obj.value = "\-" + obj.value.substr(1);
                        }
                        if (obj.value.indexOf("_") !== -1) {
                            obj.value = obj.value.split("_")[0] + "\." + obj.value.split("_")[1];
                        }
                        classAndData.cls.numValue.brd = obj;//表里有两个br
                        break;
                    case "bw":
                    case "blw":
                    case "bbw":
                    case "btw":
                    case "brw":
                        //边框宽度
                        classAndData.cls.numValue.selBord = obj.name.split("w")[0];
                        classAndData.cls.numValue.bwd = obj;
                        break;
                    case "bgs":
                        //背景尺寸
                        $.layer.alert("这是背景尺寸");
                        break;
                    default:
                        classAndData.cls.numValue[fs + "d"] = obj;
                }
            } else if (cls.indexOf("-") >= 0 && cls.indexOf("--") === -1 && cls.split("-")[0] !== "of" && cls.split("-")[0] !== "bgi") {
                //判断出没有单位，但是不是overflow和背景图片的类名
                var bObj = {};
                bObj.name = cls;
                obj.name = cls.split("-")[0];
                obj.value = cls.split("-")[1];
                switch (cls) {
                    case "wk-a":
                        obj.v = "a";
                        obj.n = "wk";
                        obj.st = true;
                        classAndData.cls.numValue.wka = obj;
                        break;
                    case "bx-b":
                    case "bx-c":
                        classAndData.cls.numValue.bxd = obj.value;
                        break;
                    case "f-r":
                        bObj.test = "右浮动";
                        bObj.st = true;
                        classAndData.cls.numValue.fr = bObj;
                        break;
                    case "f-c":
                        bObj.test = "清除浮动";
                        bObj.st = true;
                        classAndData.cls.numValue.fc = bObj;
                        break;
                    case "f-l":
                        bObj.test = "左浮动";
                        bObj.st = true;
                        classAndData.cls.numValue.fl = bObj;
                        break;
                    case "fw-b":
                        bObj.test = "加粗";
                        bObj.st = true;
                        classAndData.cls.numValue.fw = bObj;
                        break;
                    case "ft-i":
                        bObj.test = "斜体";
                        bObj.st = true;
                        classAndData.cls.numValue.ft = bObj;
                        break;
                    case "tl-o":
                        bObj.test = "上划线";
                        bObj.st = true;
                        classAndData.cls.numValue.tlo = bObj;
                        break;
                    case "tl-u":
                        bObj.test = "下划线";
                        bObj.st = true;
                        classAndData.cls.numValue.tlu = bObj;
                        break;
                    case "tl-l":
                        bObj.test = "删除线";
                        bObj.st = true;
                        classAndData.cls.numValue.tll = bObj;
                        break;
                    case "ta-l":
                        bObj.test = "文字居左";
                        bObj.st = true;
                        classAndData.cls.numValue.tal = bObj;
                        break;
                    case "ta-c":
                        bObj.test = "文字居中";
                        bObj.st = true;
                        classAndData.cls.numValue.tac = bObj;
                        break;
                    case "ta-r":
                        bObj.test = "文字居右";
                        bObj.st = true;
                        classAndData.cls.numValue.tar = bObj;
                        break;
                    case "fd-r":
                        bObj.test = "从左到右";
                        bObj.st = true;
                        classAndData.cls.numValue.fdr = bObj;
                        break;
                    case "fd-rr":
                        bObj.test = "从右到左";
                        bObj.st = true;
                        classAndData.cls.numValue.fdrr = bObj;
                        break;
                    case "fd-cr":
                        bObj.test = "从上到下";
                        bObj.st = true;
                        classAndData.cls.numValue.fdcr = bObj;
                        break;
                    case "fd-c":
                        bObj.test = "从下到上";
                        bObj.st = true;
                        classAndData.cls.numValue.fdc = bObj;
                        break;
                    case "jc-s":
                        bObj.test = "左";
                        bObj.st = true;
                        classAndData.cls.numValue.jcs = bObj;
                        break;
                    case "jc-e":
                        bObj.test = "右";
                        bObj.st = true;
                        classAndData.cls.numValue.jce = bObj;
                        break;
                    case "jc-c":
                        bObj.test = "中间";
                        bObj.st = true;
                        classAndData.cls.numValue.jcc = bObj;
                        break;
                    case "jc-sb":
                        bObj.test = "两边";
                        bObj.st = true;
                        classAndData.cls.numValue.jcsb = bObj;
                        break;
                    case "jc-ar":
                        bObj.test = "等分";
                        bObj.st = true;
                        classAndData.cls.numValue.jcar = bObj;
                        break;
                    case "ai-fs":
                        bObj.test = "上到下";
                        bObj.st = true;
                        classAndData.cls.numValue.aifs = bObj;
                        break;
                    case "ai-fe":
                        bObj.test = "下到上";
                        bObj.st = true;
                        classAndData.cls.numValue.aife = bObj;
                        break;
                    case "ai-c":
                        bObj.test = "居中";
                        bObj.st = true;
                        classAndData.cls.numValue.aic = bObj;
                        break;
                    case "fr-w":
                        bObj.v = "w";
                        bObj.n = "fr";
                        bObj.st = true;
                        bObj.checked = true;
                        classAndData.cls.numValue.frnw = bObj;
                        break;
                    case "fr-nw":
                        bObj.v = "nw";
                        bObj.n = "fr";
                        bObj.st = false;
                        bObj.checked = false;
                        classAndData.cls.numValue.frnw = bObj;
                        break;
                    case "v-h":
                        bObj.v = "h";
                        bObj.n = "v";
                        bObj.st = true;
                        bObj.checked = true;
                        classAndData.cls.numValue.vv = bObj;
                        break;
                    case "v-v":
                        bObj.v = "v";
                        bObj.n = "v";
                        bObj.st = false;
                        bObj.checked = false;
                        classAndData.cls.numValue.vv = bObj;
                        break;
                    case "ba-f":
                        bObj.id = "scroll";
                        bObj.val = "滚动";
                        bObj.v = "f";
                        bObj.n = "ba";
                        bObj.st = true;
                        classAndData.cls.numValue.baf = bObj;
                        break;
                    case "ba-s":
                        bObj.id = "immobilization";
                        bObj.val = "固定";
                        bObj.v = "s";
                        bObj.n = "ba";
                        bObj.st = true;
                        classAndData.cls.numValue.bas = bObj;
                        break;
                    case "bre-ry":
                        bObj.id = "longitudinal";
                        bObj.val = "纵向";
                        bObj.v = "ry";
                        bObj.n = "bre";
                        bObj.st = true;
                        classAndData.cls.numValue.brery = bObj;
                        break;
                    case "bre-rx":
                        bObj.id = "crosswise";
                        bObj.val = "横向";
                        bObj.v = "rx";
                        bObj.n = "bre";
                        bObj.st = true;
                        classAndData.cls.numValue.brerx = bObj;
                        break;
                    case "bre-rp":
                        bObj.id = "cover";
                        bObj.val = "全部";
                        bObj.v = "rp";
                        bObj.n = "bre";
                        bObj.st = true;
                        classAndData.cls.numValue.brerp = bObj;
                        break;
                    case "bl-c":
                        bObj.id = "area-bortext";
                        bObj.val = "文本";
                        bObj.v = "c";
                        bObj.n = "bl";
                        bObj.st = true;
                        classAndData.cls.numValue.blc = bObj;
                        break;
                    case "bl-p":
                        bObj.id = "area-mar";
                        bObj.val = "边距";
                        bObj.v = "p";
                        bObj.n = "bl";
                        bObj.st = true;
                        classAndData.cls.numValue.blp = bObj;
                        break;
                    case "bl-b":
                        bObj.id = "area-bor";
                        bObj.val = "边框";
                        bObj.v = "b";
                        bObj.n = "bl";
                        bObj.st = true;
                        classAndData.cls.numValue.blb = bObj;
                        break;
                    default:
                        switch (fs) {
                            case "bdc":
                            case "blc":
                            case "brc":
                            case "btc":
                            case "bbc":
                                if (obj.value === "t") {
                                    var colorObj = classAndData.cls.numValue[fs + "t"];
                                    colorObj = {};
                                    colorObj.test = "透明";
                                    colorObj.name = fs + "-t";
                                    colorObj.st = true;
                                } else {
                                    if (fs === "bdc") {
                                        classAndData.cls.numValue.selBord = fs.split("dc")[0];
                                    } else {
                                        classAndData.cls.numValue.selBord = fs.split("c")[0];
                                    }
                                    obj.value = "#" + obj.value;
                                    classAndData.cls.numValue.bdc = obj.value;
                                }
                                break;
                            case "bc":
                            case "c":
                            case "oc":
                                if (obj.value === "t") {
                                    var colorObj = classAndData.cls.numValue[fs + "t"];
                                    colorObj = {};
                                    colorObj.test = "透明";
                                    colorObj.name = fs + "-t";
                                    colorObj.st = true;
                                } else {
                                    obj.value = "#" + obj.value;
                                    classAndData.cls.numValue[fs] = obj.value;
                                }
                                break;
                            case "pos":
                                classAndData.cls.numValue[fs] = obj;
                                break;
                            case "bs":
                            case "bls":
                            case "bbs":
                            case "bts":
                            case "brs":
                                classAndData.cls.numValue.selBord = fs.split("s")[0];
                                classAndData.cls.numValue.bsd = obj.value;
                                break;
                            case "ord":
                                classAndData.cls.numValue.order = obj;
                                break;
                            case "zd":
                                classAndData.cls.numValue.zdd = obj;
                                break;
                            case "fg":
                                classAndData.cls.numValue.fdMax = obj;
                                break;
                            case "fsh":
                                classAndData.cls.numValue.fdMin = obj;
                                break;
                            case "d":
                            case "ff":
                            case "p":
                            case "tt":
                            case  "tl":
                            case "os":
                            case "tp":
                            case "ttf":
                                classAndData.cls.numValue[fs + "d"] = obj.value;
                                break;
                            case "ow":
                                if (obj.value.indexOf("_") === -1) {
                                    classAndData.cls.numValue[fs + "d"] = obj.value;
                                } else {
                                    var val = obj.value.split("_")[0] + "\." + obj.value.split("_")[1];
                                    obj.value = val;
                                    classAndData.cls.numValue[fs + "d"] = obj;
                                }
                                break;
                            default:
                                classAndData.cls.numValue[fs + "d"] = obj;
                        }
                }

            } else if (fs === "br" || fs === "blt" || fs === "brt" || fs === "blb" || fs === "brb") {
                //圆角类名
                classAndData.cls.numValue.selBorRad = fs;
                var v = cls.split("-")[1];
                var v1 = cls.split("-")[4];
                if (v.indexOf("_") !== -1) {
                    v = v.split("_")[0] + "\." + v.split("_")[1];
                }
                if (v1.indexOf("_") !== -1) {
                    v1 = v1.split("_")[0] + "\." + v1.split("_")[1];
                }
                classAndData.cls.numValue.brd.value = v;
                classAndData.cls.numValue.brd.unit = cls.split("-")[3];
                classAndData.cls.numValue.brtd.value = v1;
                classAndData.cls.numValue.brtd.unit = cls.split("-")[6];
            } else if (fs === "bos" || fs === "ts") {
                //盒子阴影和文字阴影
                classAndData.cls.numValue.boxTextS = fs;
                var val;
                var v = cls.split("-")[1];
                if (v.indexOf("b") !== -1) {
                    val = "\-" + v.substr(1);

                } else {
                    val = v
                }
                if (val.indexOf("_") !== -1) {
                    val = val.split("_")[0] + "\." + val.split("_")[1];
                }
                var val1;
                var v1 = cls.split("-")[4];
                if (v1.indexOf("b") !== -1) {
                    val1 = "\-" + v1.substr(1);
                } else {
                    val1 = v1
                }
                if (val1.indexOf("_") !== -1) {
                    val1 = val1.split("_")[0] + "\." + val1.split("_")[1];
                }
                var val2;
                var v2 = cls.split("-")[7];
                if (v2.indexOf("_") !== -1) {
                    val2 = v2.split("_")[0] + "\." + v2.split("_")[1];
                } else {
                    val2 = v2;
                }
                classAndData.cls.numValue.shaXd.value = val;
                classAndData.cls.numValue.shaXd.unit = cls.split("-")[3];
                classAndData.cls.numValue.shaYd.value = val1;
                classAndData.cls.numValue.shaYd.unit = cls.split("-")[6];
                classAndData.cls.numValue.blur.value = val2;
                classAndData.cls.numValue.blur.unit = cls.split("-")[9];
                classAndData.cls.numValue.tsc = "#" + cls.split("-")[10];
            } else if (fs === "of") {
                //overflow
                obj.n = cls.split("-")[1];
                obj.v = cls.split("-")[2];
                classAndData.cls.numValue.ofd = obj.n;
                classAndData.cls.numValue.selOverflow = obj.v;
            } else if (fs === "bgs" || fs === "bp" || fs === "bgi") {
                //背景图片
                switch (fs) {
                    case "bgi":
                        var str1 = cls.split("-")[1] + "\." + cls.split("-")[2];
                        var BgiObj = {};
                        BgiObj.n = str1;
                        resClsImgCache(BgiObj);
                        classAndData.cls.numValue.bgi.bcgImgName = str1;
                        classAndData.cls.numValue.bgi.bcgImg = bytecode;
                    case "bgs":
                        classAndData.cls.numValue.bawd.value = cls.split("-")[1];
                        classAndData.cls.numValue.bahd.value = cls.split("-")[4];
                        break;
                    case "bp":
                        var val;
                        var val1;
                        if (cls.split("-")[1].indexOf("b") === -1) {
                            val = cls.split("-")[1];
                        } else {
                            val = "\-" + cls.split("-")[1].substr(1);
                        }
                        if (val.indexOf("_") !== -1) {
                            val = val.split("_")[0] + "\." + val.split("_")[1];
                        }
                        if (cls.split("-")[4].indexOf("b") === -1) {
                            val1 = cls.split("-")[4];
                        } else {
                            val1 = "\-" + cls.split("-")[4].substr(1);
                        }
                        if (val1.indexOf("_") !== -1) {
                            val1 = val1.split("_")[0] + "\." + val1.split("_")[1];
                        }
                        classAndData.cls.numValue.imgXd.value = val;
                        classAndData.cls.numValue.imgYd.value = val1;
                        break;
                }
            }
            if (pos !== undefined && pos1 !== undefined) {
                console.log(pos1 + pos)
                classAndData.cls.numValue.pospoint = pos1 + pos;
            }
        }
    }
}

//清除页面展示的css
function clearAttributeParse() {
    var data = classAndData.cls.numValue;
    data.wd = {//宽
        name: "w",
        value: 0,
        unit: "r"
    };
    data.hd = {//高
        name: "h",
        value: 0,
        unit: "r"
    };
    data.fsd = {//文字尺寸
        name: "fs",
        value: 0,
        unit: "r"
    };
    data.fl = {
        test: "左浮动",
        name: "f-l",
        st: false,
    };//浮动
    data.fr = {
        test: "右浮动",
        name: "f-r",
        st: false,
    };
    data.fc = {
        test: "清除浮动",
        name: "f-c",
        st: false,
    };
    data.fw = {
        test: "加粗",
        name: "fw-b",
        st: false,
    };//字体粗细
    data.i = {
        test: "图标",
        name: "i",
        st: false,
    };
    data.cc = {
        test: "绝对居中",
        name: "c",
        st: false,
    };
    data.ft = {
        test: "斜体",
        name: "ft-i",
        st: false,
    };//font-style
    data.bgi = {
        bcgImg: "",
        isShow: false,
        bcgImgName: "",
    };
    data.tlo = {
        test: "上划线",
        name: "tl-o",
        st: false,
    };
    data.tlu = {
        test: "下划线",
        name: "tl-u",
        st: false,
    };
    data.tll = {
        test: "删除线",
        name: "tl-l",
        st: false,
    };
    data.tal = {
        test: "文字居左",
        name: "ta-l",
        st: false,
    };//text-align
    data.tar = {
        test: "文字居右",
        name: "ta-r",
        st: false,
    };
    data.tac = {
        test: "文字居中",
        name: "ta-c",
        st: false,
    };
    data.ffd = "s";//默认字体
    data.c = "#000000";
    data.bc = "#000000";
    data.bdc = "#000000";
    data.oc = "#000000";
    data.tsc = "#000000";
    data.od = {
        value: 0,
    };
    data.zdd = {
        name: "zd",
        value: 0,
    };
    data.dd = "i";
    data.tbd = {
        name: "tb",
        value: 0,
        unit: "r"
    };
    data.lrd = {
        name: "lr",
        value: 0,
        unit: "r"
    };
    data.pd = "s";
    data.pospoint = "tl";
    data.md = {
        name: "m",
        value: 0,
        unit: "r"
    };
    data.selMarPad = "margin";
    data.marginPadding = "m";
    data.margin = [{
        "n": "全部外边距",
        "v": "m"
    }, {
        "n": "上外边距",
        "v": "mt"
    }, {
        "n": "下外边距",
        "v": "mb"
    }, {
        "n": "左外边距",
        "v": "ml"
    }, {
        "n": "右外边距",
        "v": "mr"
    }];
    data.bwd = {
        name: "bw",
        value: 0,
        unit: "r"
    };
    data.selBord = "b";
    data.bsd = "da";
    data.brd = {
            name: "br",
            value: 0,
            unit: "r"
    };
    data.brtd = {
        name: "br",
        value: 0,
        unit: "r"
    };
    data.selBorRad = "br";
    data.fdMax = {
        name: "fg",
        value: 0
    };
    data.fdMin = {
        name: "fsh",
        value: 0
    };
    data.order = {
        name: "ord",
        value: 0
    };
    data.fdr = {
        test: "从左到右",
        name: "fd-r",
        st: false,
    };
    data.fdrr = {
        test: "从右到左",
        name: "fd-rr",
        st: false,
    };
    data.fdcr = {
        test: "从上到下",
        name: "fd-cr",
        st: false,
    };
    data.fdc = {
        test: "从下到上",
        name: "fd-c",
        st: false,
    };
    data.jcs = {
        test: "左",
        name: "jc-s",
        st: false,
    };
    data.jce = {
        test: "右",
        name: "jc-e",
        st: false,
    };
    data.jcsb = {
        test: "两边",
        name: "jc-sb",
        st: false,
    };
    data.jcar = {
        test: "等分",
        name: "jc-ar",
        st: false,
    };
    data.jcc = {
        test: "中间",
        name: "jc-c",
        st: false,
    };
    data.aifs = {
        test: "上到下",
        name: "ai-fs",
        st: false,
    };
    data.aife = {
        test: "下到上",
        name: "ai-fe",
        st: false,
    };
    data.aic = {
        test: "居中",
        name: "ai-c",
        st: false,
    };
    data.awd = {
        name: "aw",
        value: 0,
        unit: "r"
    };
    data.iwd = {
        name: "iw",
        value: 0,
        unit: "r"
    };
    data.ahd = {
        name: "ah",
        value: 0,
        unit: "r"
    };
    data.ihd = {
        name: "ih",
        value: 0,
        unit: "r"
    };
    data.lhd = {
        name: "lh",
        value: 0,
        unit: "r"
    };
    data.tid = {
        name: "ti",
        value: 0,
        unit: "r",
    };
    data.lsd = {
        name: "ls",
        value: 0,
        unit: "r"
    };
    data.ttd = "n";
    data.tld = "n";
    data.owd = {
        name: "ow",
        value: 0,
        unit: "r"
    };

    data.osd = "da";
    data.shaXd = {
        name: "ts",
        value: 0,
        unit: "r"
    };
    data.shaYd = {
        name: "ts",
        value: 0,
        unit: "r"
    };
    data.blur = {
        name: "ts",
        value: 0,
        unit: "r"
    };
    data.boxTextS = "bos";
    data.tpd = "n";
    data.tud = {
        name: "tu",
        value: 0,
        unit: "s"
    };
    data.ttfd = "e";
    data.trdd = {
        name: "trd",
        value: 0,
        unit: "s"
    };
    data.ofd = "v";
    data.selOverflow = "x";
    data.bawd = {
        name: "bgs",
        value: 0,
    };
    data.bahd = {
        name: "bgs",
        value: 0,
    };
    data.blb = {
        id: "area-bor",
        val: "边框",
        v: "b",
        n: "bl",
        st: false
    };
    data.blp = {
        id: "area-mar",
        val: "边距",
        v: "p",
        n: "bl",
        st: false
    };
    data.blc = {
        id: "area-bortext",
        val: "文本",
        v: "c",
        n: "bl",
        st: false
    };
    data.brerp = {
        id: "cover",
        val: "全部",
        v: "rp",
        n: "bre",
        st: false
    };
    data.brerx = {
        id: "crosswise",
        val: "横向",
        v: "rx",
        n: "bre",
        st: false
    };
    data.brery = {
        id: "longitudinal",
        val: "纵向",
        v: "ry",
        n: "bre",
        st: false
    };
    data.bas = {
        id: "immobilization",
        val: "固定",
        v: "s",
        n: "ba",
        st: false
    };
    data.baf = {
        id: "scroll",
        val: "滚动",
        v: "f",
        n: "ba",
        st: false
    };
    data.frnw = {
        v: "w",
        n: "fr",
        st: false,
    };
    data.vv = {
        v: "h",
        n: "v",
        st: false,
    };
    data.imgXd = {
        name: "dbp",
        value: 0,
    };
    data.imgYd = {
        name: "bp",
        value: 0,
    };
    data.transXd = 0;
}
