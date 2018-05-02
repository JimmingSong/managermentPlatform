/**
 * Created by Administrator on 2017/1/17.
 */
//id选择器
function $$(name){
    return document.querySelector(name);
}
// var  timerData,cdStyle;
var timerObjs ={};
function getBaseView(h,data,cssData) {
    switch(data.tp) {
        case "kv":
            return createKeyValueView(h,data,cssData);
        case "img":
        case "src":
            return createImageView(h,data,cssData);
        case "tx":
            return createTextView(h,data,cssData);
        case "ta":
            return createTextareaView(h,data,cssData);
        case "s":
            return createSearchView(h,data,cssData);
        case "d":
            return createDateView(h,data,cssData);
        case "tm":
            return createTimeView(h,data,cssData);
        case "dt":
            return createDateTimeView(h,data,cssData);
        case "btn":
            return createBtnView(h,data,cssData);
        case "r":
            return createRadioView(h,data,cssData);
        case "c":
            return createCheckBoxView(h,data,cssData);
        case "gi":
            return createGiView(h,data,cssData);
        case "gp":
            return createGpView(h,data,cssData);
        case "pop":
            return createPopView(h,data,cssData);
        case "cht":
            return createChatView(h,data,cssData);
        case "td":
            return createTdView(h,data,cssData);
        case "tree":
            return createTreeView(h,data,cssData);
        case "nav" :
            return createNavView(h,data,cssData);
        case "li":
        	return createListView(h,data,cssData);
        case "cf":
            return createCarouselFigureView(h,data,cssData);
        case "ct":
            return createCtView(h,data,cssData);
        case "cd":
            var timerData = data;
            var cdStyle = cssData.k;
            cdMove(timerData,cdStyle);
            return createCdDom(h,data,cssData);
        case "ev":
            return  createEvDom(h,data,cssData);
        case "vid":
            return createVidDom(h,data,cssData);
        case "sd":
            var timerData = data;
            var cdStyle = cssData.k;
            cdMove(timerData,cdStyle);
            return createSdDom(h,data,cssData);
        case "st":
            var timerData = data;
            var cdStyle = cssData.k;
            cdMove(timerData,cdStyle);
            return createStDom(h,data,cssData);
        case "sdt":
            var timerData = data;
            var cdStyle = cssData.k;
            cdMove(timerData,cdStyle);
            return createSdtDom(h,data,cssData);
        case "el":
            return createElDom(h,data,cssData);
        case "sl":
            return createSelectDom(h,data,cssData);
        case "vc":
            return createVcDom(h,data,cssData);
        case "ci":
            return createChatInputDom(h,data,cssData);
        case "hd":
            return createHeadImg(h,data,cssData);
        case "m":
            return createMenuList(h,data,cssData);
        case "hn":
            return createHeadNameDom(h, data, cssData);
        case "qr" :
            QRCode(data);
            return getTwoDimensionCode(h, data, cssData);
        case "pg":
            return createPagingDom(h, data, cssData);
        case "pw":
            return createPasswordDom(h, data, cssData);
        case "dc":
            return createDragComponentDOM(h, data, cssData);
        case "ic":
            return createIdCardDom(h, data, cssData);
        case "un":
            return createUserName(h, data, cssData);
        case "cpw":
            return createCpwDoms(h, data, cssData);
    }
}

//确认密码
function createCpwDoms(h, data, cssData) {
    switch (cssData.k) {
        case "cpw-df":
            return h("div", {}, getCpwDoms(h, data, cssData));
    }
}

function getCpwDoms(h, data, cssData) {
    var cls = [];
    var value1;
    var value2;
    var innerHTML;
    var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", "ig");
    var div1 = h("div", {}, []);
    var div2 = h("div", {}, []);
    var span1 = h("span", {
        domProps: {
            innerHTML: data.n[0]
        }
    });
    var input1 = h("input", {
        attrs: {
            type: "password",
            value: "",
            placeholder: "请输入不少于八位的大写、小写英文字母以及数字的组合"
        },
        on: {
            blur: function (e) {
                value1 = e.target.value;
                if (value1 === "") {
                    data.msg = "密码不可为空"
                } else if (pattern.test(value1)) {
                    data.v = value1;
                    cValue = value1;
                    data.msg = "&#xe66a;";
                } else {
                    data.msg = "您可能未输大写、小写字母、数字或少于8位字符";
                }
            }
        }
    });
    var span2 = h("span", {
        domProps: {
            innerHTML: data.msg
        }
    });
    var span3 = h("span", {
        domProps: {
            innerHTML: data.n[1]
        }
    });
    var input2 = h("input", {
        attrs: {
            type: "password",
            value: "",
        },
        on: {
            blur: function (e) {
                value2 = e.target.value;
                if (value2 === "") {
                    data.ops = "密码不可为空"
                } else if (value2 === data.v) {
                    data.ops = "&#xe66a;";
                } else {
                    data.ops = "密码与第一次输入的不同"
                }
            }
        }
    });
    var span4 = h("span", {
        domProps: {
            innerHTML: data.ops
        }
    });
    div1.children.push(span1);
    div1.children.push(input1);
    div1.children.push(span2);
    div2.children.push(span3);
    div2.children.push(input2);
    div2.children.push(span4);
    cls.push(div1);
    cls.push(div2);
    return cls;
}

//用户名
function createUserName(h, data, cssData) {
    switch (cssData.k) {
        case "un-df":
            return h("div", {}, getUserName(h, data));
    }
}

function getUserName(h, data) {
    var cls = [];
    var value;
    var span = h("span", {
        domProps: {
            innerHTML: data.n
        }
    });
    var input = h("input", {
        attrs: {
            type: "text",
            value: "",
        },
        on: {
            blur: function (e) {
                value = e.target.value;
                if (value !== data.v) {
                    data.msg = "您输入的用户名有误"
                } else if (value === "") {
                    data.msg = "用户名不能为空"
                } else {
                    data.msg = "&#xe66a;";
                }
            }
        }
    });
    var span2 = h("span", {
        domProps: {
            innerHTML: data.msg
        }
    });
    cls.push(span);
    cls.push(input);
    cls.push(span2);
    return cls;
}

//身份证验证
function createIdCardDom(h, data, cssData) {
    var events = getEvent(data);
    events["input"] = function (e) {
        data.v = e.target.value;
    };
    switch (cssData.k) {
        case "ic-df":
            return h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.n
                    }
                }),
                h("input", {
                    attrs: {
                        value: data.v
                    },
                    on: events
                }), h("span", {
                    domProps: {
                        innerHTML: validate(data.v).msg
                    }
                })
            ]);
    }

}

function validate(code) {
    //身份证号合法性验证
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 "
    };
    var row = {
        'pass': true,
        'msg': '验证成功'
    };
    if (code === "") {
        row = {
            'pass': false,
            'msg': '身份证号不能为空'
        };
    } else if (code !== "" && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)) {
        row = {
            'pass': false,
            'msg': '身份证号格式错误'
        };
    } else if (!city[code.substr(0, 2)]) {
        row = {
            'pass': false,
            'msg': '身份证号地址编码错误'
        };
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length === 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] !== code[17].toUpperCase()) {
                row = {
                    'pass': false,
                    'msg': '身份证号校验位错误'
                };
            }
        }
    }
    return row;
}

function createDragComponentDOM(h, data, cssData) {
    switch (cssData.k) {
        case "dc-df":
            return h("div", {}, [
                h("form", {
                    attrs: {
                        id: "my-awesome-dropzone"
                    },
                    class: "dropzone"
                }, [h("div", {
                    attrs: {
                        id: "myId"
                    },
                    class: "dropzone"
                })])
            ]);
    }

}

//文件拖拽上传
//function createDragComponentDOM(h,data,cssData){
//    //var myDropzone = new Dropzone("div#myId", { url: "/file/post"});
//    switch(cssData.k) {
//        case "dc-df":
//            return h("div",{},[
//                h("form",{
//                    attrs:{
//                        action:data.n,
//                        method:"post"
//                    },
//                    class:"dropzone"
//                },[
//                    h("div",{
//                        class:"fallback",
//                        style:{
//                            textAlign:"center"
//                        }
//                    },[
//                        h("input",{
//                            attrs:{
//                                name:"file",
//                                type:"file",
//                                multiple:"multiple"
//                            }
//
//                        }),
//                    ])
//                ])
//            ]);
//    }
//}
////文件拖拽上传
//function createDragComponentDOM(h,data,cssData){
//    switch(cssData.k) {
//        case "dc-df":
//            return h("div",{},[
//                h("form",{
//                    attrs:{
//                        id:"my-awesome-dropzone",
//                        action:data.n
//                    },
//                    class:"dropzone dz-clickable"
//                },[
//                    h("div",{
//                        class:"dz-default dz-message",
//                        style:{
//                            textAlign:"center"
//                        }
//                    },[
//                        h("span",{
//                            class:"iconfont font-size-4",
//                            domProps:{
//                                innerHTML:"&#xe6c0;"
//                            },
//                            style:{
//                                display:"block"
//                            }
//                        }),
//                        h("span",{
//                            domProps:{
//                                innerHTML:"拖拽文件到这里上传"
//                            }
//                        })
//                    ])
//                ])
//            ]);
//    }
//}
function createPasswordDom(h, data, cssData) {
    switch (cssData.k) {
        case "pw-df":
            return h("div", {}, createPwDoms(h, data, cssData));
    }
}

function createPwDoms(h, data, cssData) {
    var cls = [];
    var value;
    var display;
    var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", "ig");
    var span1 = h("span", {
        domProps: {
            innerHTML: data.n
        }
    });
    var input = h("input", {
        attrs: {
            type: "password",
        },
        on: {
            // input:function(e) {
            //     value = e.target.value;
            //     pattern.test(value);
            //     e.target.
            // },
            blur: function (e) {
                var value = e.target.value;
                if (data.v !== "") {
                    if (data.v === value) {
                        data.msg = "&#xe66a;";
                    } else {
                        data.msg = "您输入的用密码和户名不匹配";
                    }
                } else {
                    if (pattern.test(value)) {
                        data.v = value;
                        data.msg = "&#xe66a;";
                    } else if (value === "") {
                        console.log(value);
                        data.msg = "密码不能为空"
                    } else {
                        data.msg = "您可能未输大写、小写字母、数字或少于8位字符";
                    }
                }
            }
        }
    });
    var span2 = h("span", {
        style: {
            display: display
        },
        domProps: {
            innerHTML: data.msg
        }
    });
    cls.push(span1);
    cls.push(input);
    cls.push(span2);
    return cls;
}

/**
 * 分页
 * @param h
 * @param data
 * @param cssData
 * @returns {*}
 */
function createPagingDom(h, data, cssData) {
    switch (cssData.k) {
        case "pg-df":
            return h("div", {}, getPagingDom(h, data))
    }
}

function getPagingDom(h, data) {
    var arr = [];
    var btn = [];
    var page = h("span", {
        domProps: {
            innerHTML: "共" + data.n + "页",
        },
    });
    var ft = h("span", {
        domProps: {
            innerHTML: "首页"
        },
        on: {
            click: function () {
                data.v = "0"
            }
        }
    });
    var pt = h("span", {
        domProps: {
            innerHTML: "上一页"
        },
        on: {
            click: function () {
                data.v = parseInt(data.v) - 1
            }
        }
    });
    var nt = h("span", {
        domProps: {
            innerHTML: "下一页"
        },
        on: {
            click: function () {
                data.v = parseInt(data.v) + 1
            }
        }
    });
    var lt = h("span", {
        domProps: {
            innerHTML: "尾页"
        },
        on: {
            click: function () {
                data.v = parseInt(data.n)
            }
        }
    });
    var len = parseInt(data.n);
    var star = data.v;
    if (len > 5) {
        star = data.v;
        if (star === "" || star < 4) {
            star = 0;
            len = 5
        } else {
            star = parseInt(star) - 3;
            if (parseInt(data.v) >= parseInt(data.n) - 2) {
                len = parseInt(data.n);
                star = parseInt(data.n) - 5
            } else {
                len = parseInt(star) + 5
            }
        }
        // len = parseInt(data.n);
    } else {
        star = 0
    }
    for (var i = star; i <= len; i++) {
        var color;
        if (parseInt(data.v) === i) {
            btn.push(
                h("span", {
                    domProps: {
                        innerHTML: i
                    },
                    style: {
                        display: "inline-block",
                        width: "1rem",
                        textAlign: "center",
                        backgroundColor: "#58B2DC",
                        color: "#fff"
                    },
                    on: {
                        click: function (e) {
                            var val = e.target.innerHTML;
                            if (val <= parseInt(data.n)) {
                                data.v = e.target.innerHTML;
                            }
                            if (data.es.length !== 0) {
                                var event = getEvent(data);
                                actuator1.runStr(event.v);
                            }
                        }
                    }
                })
            )
        } else {
            btn.push(
                h("span", {
                    domProps: {
                        innerHTML: i
                    },
                    style: {
                        display: "inline-block",
                        width: "1rem",
                        textAlign: "center",
                    },
                    on: {
                        click: function (e) {
                            var val = e.target.innerHTML;
                            if (val <= parseInt(data.n)) {
                                data.v = e.target.innerHTML;
                            }
                            if (data.es.length !== 0) {
                                var event = getEvent(data);
                                actuator1.runStr(event.v);
                            }
                        }
                    }
                })
            )
        }
    }
    var inp = h("input", {
        class: "w-r-2",
        attrs: {
            type: "tel"
        },
        on: {
            blur: function (e) {
                var v = e.target.value;
                if (v >= 0) {
                    data.v = v;
                    if (data.es.length !== 0) {
                        var event = getEvent(data);
                        actuator1.runStr(event.v);
                    }
                }
            },
            keydown: function (e) {
                if (e.keyCode === 13) {
                    var v = e.target.value;
                    if (v >= 0) {
                        data.v = v;
                        if (data.es.length !== 0) {
                            var event = getEvent(data);
                            actuator1.runStr(event.v);
                        }
                    }
                }
            }
        }
    });
    var btn1 = h("button", {
        domProps: {
            innerHTML: "跳转"
        },
        on: {
            click: function (e) {
                var val = e.target.previousElementSibling.value;
                if (val >= 0) {
                    data.v = val;
                    if (data.es.length !== 0) {
                        var event = getEvent(data);
                        actuator1.runStr(event.v);
                    }
                }
            }
        }
    });
    arr.push(page);
    arr.push(ft);
    arr.push(pt);
    arr.push(btn);
    arr.push(nt);
    arr.push(lt);
    arr.push(inp);
    arr.push(btn1);
    return arr
}

/**
 *
 * @param h
 * @param data
 * @param cssData
 * @returns {*}
 */
function getTwoDimensionCode(h, data, cssData) {
    switch (cssData.k) {
        case "qr-df":
            return h("div", {}, [
                h("div", {
                    attrs: {
                        id: "con"
                    }
                }, [
                    h("video", {
                        attrs: {
                            id: "video"
                        }
                    }),
                    h("div", {}),
                    h("div", {}),
                    h("div", {}),
                    h("div", {}),
                    h("div", {}, [
                        h("div", {}),
                        h("div", {}),
                        h("div", {}),
                        h("div", {}),
                        h("div", {})
                    ]),
                    h("canvas", {
                        attrs: {
                            id: "canvas"
                        }
                    })
                ]),
                h("canvas", {
                    attrs: {
                        id: "canvas2"
                    }
                })
            ])
    }
}

function QRCode(data) {
    setTimeout(function (data) {
        var video, canvas, canvas2, context, context2;
        //这段代 主要是获取摄像头的视频流并显示在Video 签中
        // window.addEventListener("DOMContentLoaded", function (){}, false);
        try {
            canvas2 = document.getElementById("canvas2");
            video = document.getElementById("video");
            console.log(video);
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            context2 = canvas2.getContext("2d");
            var videoObj = {video: true, audio: false},
                flag = true,
                MediaErr = function (error) {
                    flag = false;
                    if (error.PERMISSION_DENIED) {
                        alert('用户拒绝了浏览器请求媒体的权限', '提示');
                    } else if (error.NOT_SUPPORTED_ERROR) {
                        alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
                    } else if (error.MANDATORY_UNSATISFIED_ERROR) {
                        alert('指定的媒体类型未接收到媒体流', '提示');
                    } else {
                        alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');
                    }
                };
            //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）
            if (navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia(videoObj, function (stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, MediaErr);
            } else if (navigator.mozGetUserMedia) {
                navigator.mozGetUserMedia(videoObj, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, MediaErr);
            } else if (navigator.msGetUserMedia) {
                navigator.msGetUserMedia(videoObj, function (stream) {
                    $(document).scrollTop($(window).height());
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, MediaErr);
            } else {
                alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');
                return false;
            }
            if (flag) {
                alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');
            }
        } catch (e) {
            // printHtml("浏览器不支持HTML5 CANVAS");
        }
        //开始拍照
        setInterval(function () {//防止调用过快
            video = document.getElementById("video");
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");
            canvas2 = document.getElementById("canvas2");
            context2 = canvas2.getContext("2d");
            canvas.width = video.clientWidth + "";
            canvas.height = video.clientHeight + "";
            var srcWidth = parseFloat(video.clientWidth) / 4;
            var srcHeight = video.clientHeight / 4;
            var tarWidth = parseFloat(video.clientWidth) / 2;
            var tarHeight = parseFloat(video.clientHeight) / 2;
            if (context) {
                context.drawImage(video, 0, 0, parseFloat(video.clientWidth), parseFloat(video.clientHeight));
                if (context2) {
                    context2.drawImage(canvas, srcWidth, srcHeight, tarWidth, tarHeight, 0, 0, video.offsetWidth / 2, video.offsetHeight / 2)
                    CatchCode();
                }
            }
        }, 100);

        //抓取屏幕图像
        function CatchCode(data) {
            if (canvas2 != null) {
                var imgData = canvas2.toDataURL()
                var base64Data = imgData.substr(22);
//                console.log(base64Data);
//                 data.n = base64Data
            }
        }
    }, 2000);
}

function createHeadNameDom(h, data, cssData) {
    switch (cssData.k) {
        case "hn-df":
            var headName;
            for (var i = 0; i < data.ops.length; i++) {
                if (headName === undefined) {
                    headName = data.ops[i]
                } else {
                    headName += "、" + data.ops[i]
                }
            }
            return h("div", {
                style: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                },
                on: getEvent(data)
            }, [
                h("span", {
                    domProps: {
                        innerHTML: headName
                    },
                    on: {
                        click: function () {
                            var IP = location.hostname, port = location.port;
                            console.log(IP + "/" + port)
                        }
                    }
                })
            ])
    }
}

function createMenuList(h,data,cssData){
    switch(cssData.k){
        case "m-df":
            return h("div",{
                style:{
                    position:"relative"
                }
            },[
                h("div",{
                    on:{
                        click:function(e){
                            var mLi=e.target.parentNode.nextElementSibling;
                            // console.log(mLi);
                            mLi.style.display=mLi.style.display==="block"?"none":"block";
                        }
                    }
                },[
                    h("p",{
                        domProps:{
                            innerHTML:data.n
                        }
                    }),

                ]),
                createLi(h,data, h("ul",{
                    style:{
                        position:"absolute",
                        left:"0",
                        top:"10"
                    }
                }))
            ])
    }
}

function createLi(h,data,e){
    var lis =[];
    for(var i=0;i<data.ops.length;i++){
        var li = h("li",{
            on:{
                click:function(e){
                    console.log(e.target)
                    if(e.target.nodeName==="LI"){
                        clearSpan(e.target.parentNode);
                        e.target.childNodes[1].style.display="inline-block"
                        e.target.parentNode.style.display="none";
                    }
                    if(e.target.nodeName==="SPAN"){
                        e.target.nextElementSibling.style.display="inline-block";
                        e.target.parentNode.parentNode.style.display="none";
                        // e.target.nextElementSibling.style.display="none";
                    }

                }
            }
        },[
            h("span",{
                domProps:{
                    innerHTML:data.ops[i].msg
                }
            }),
            h("span",{
                class: "-i",
                domProps:{
                    innerHTML: "&#xe66a;"
                }
            })
        ]);
        lis.push(li);
    }
    e.children=lis;
    return e;
}

function clearSpan(parent){
    for(var i = 0;i < parent.children.length;i++){
        parent.children[i].children[1].style.display = "none"
    }
}


//头像
//九宫格
function createHeadImg(h,data,cssData){
    switch (cssData.k){
        case "hd-df":
            return h("div",{
            },createSudoku(h,data));
    }
}
function createSudoku(h,data) {
    var leng = data.ops.length;
    var cls = [];
    if(leng==1){
        var div=h("div",{},[]);
        div.children.push(h("img",{
            style:{
                width:"100%",
            },
            attrs:{
                src: data.ops[0]
            }
        }));
        cls.push(div);
    }else if(leng === 2){
        var div=h("div",{
            style:{
                alignItems:"center"
            }
        },[]);
        div.children.push(h("img",{
            style:{
                width:"40%",
                // height:"40%",
            },
            attrs:{
                src:data.ops[0].v
            }
        }));
        div.children.push(h("img",{
            style:{
                width:"40%",
                // height:"40%",
            },
            attrs:{
                src: data.ops[1]
            }
        }));
        cls.push(div);
    }else{
        var height;
        var width;
        if(leng<=2){
            height="100%";
        }else if(leng<=6){
            height="50%";
        }else{
            height="33%";
        }
        var box = h("div",{
            style:{
                height:height,
            }
        },[]);
        var box1 = h("div",{
            style:{
                height:height,
            }
        },[]);
        var box2 = h("div",{
            style:{
                height:height,
            }
        },[]);
        var opsL = data.ops.length;
        if(opsL > 9){
            opsL = 9
        }
        for(var i = 0;i < opsL;i++){
            switch (i){
                case 0:
                    box.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1",
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 1:
                    box.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1",
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 2:
                    box1.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1",
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 3:
                    box1.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1",
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 4:
                    box.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1"
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 5:
                    box1.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1"
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 6:
                    box2.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1"
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 7:
                    box2.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1"
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
                case 8:
                    box2.children.push(
                        h("img",{
                            style:{
                                width:"30%",
                                // flexGrow:"1"
                            },
                            attrs:{
                                src: data.ops[i]
                            }
                        })
                    );
                    break;
            }
        }
        if(leng <= 2){
            cls.push(box)
        }else if(leng <= 6){
            cls.push(box);
            cls.unshift(box1);
        }else {
            cls.push(box);
            cls.unshift(box1);
            cls.unshift(box2);
        }
    }
    return cls;
}

//发送消息、文件、或语音
function createChatInputDom(h, data, cssData) {
    switch (cssData.k){
        case "ci-df":
            var a = false,isInput = false;
            return h("div",{},[
                h("div",{},[
                    h("i",{
                        class:"iconfont",
                        domProps:{
                            innerHTML: "&#xe664;"
                        },
                        on:{
                            click:function (e) {
                                isInput = !isInput;
                                if(isInput){
                                    a = false;
                                    var next2 = e.target.parentNode.nextElementSibling;
                                    next2.style.overflow = "hidden";
                                    next2.style.height = '0';
                                    e.target.innerHTML = "&#xe62d;";
                                    e.target.nextElementSibling.setAttribute("type","button");
                                    e.target.nextElementSibling.setAttribute("value",data.n);
                                } else {
                                    a = false;
                                    var next3 = e.target.parentNode.nextElementSibling;
                                    next3.style.overflow = "hidden";
                                    next3.style.height = '0';
                                    e.target.innerHTML = "&#xe664;";
                                    e.target.nextElementSibling.setAttribute("type", "text");
                                    e.target.nextElementSibling.setAttribute("value", "");
                                }
                            }
                        }
                    }),
                    h("input",{
                        attrs:{
                            type: "text"
                        }
                    }),
                    h("i",{
                        class:"iconfont",
                        domProps:{
                            innerHTML: "&#xe666;"
                        },
                        on:{
                            click:function (e) {
                                a = !a;
                                if(a){
                                    var next = e.target.parentNode.nextElementSibling;
                                    next.style.overflow = "auto";
                                    next.style.height = 'auto'
                                }else {
                                    var next1 = e.target.parentNode.nextElementSibling;
                                    next1.style.overflow = "hidden";
                                    next1.style.height = '0'
                                }

                            }
                        }
                    })
                ]),
                h("div",{
                    style:{
                        height:"0",
                        overflow:"hidden",
                        transition:"height 2s linear"
                    }
                },[
                    h("div",{},[
                        h("div",{},[
                            h("div",{},[
                                h("i",{
                                    class: "iconfont",
                                    domProps: {
                                        innerHTML: "&#xe603;"
                                    }
                                })
                            ]),
                            h("div",{},[
                                h("span",{
                                    domProps:{
                                        innerHTML:"图片"
                                    }
                                })
                            ])
                        ]),
                        h("div",{},[
                            h("div",{},[
                                h("i",{
                                    class: "iconfont",
                                    domProps: {
                                        innerHTML: "&#xe660;"
                                    }
                                })
                            ]),
                            h("div",{},[
                                h("span",{
                                    domProps:{
                                        innerHTML:"视频"
                                    }
                                })
                            ])
                        ]),
                        h("div",{},[
                            h("div",{},[
                                h("i",{
                                    class: "iconfont",
                                    domProps: {
                                        innerHTML: "&#xe67c;"
                                    }
                                })
                            ]),
                            h("div",{},[
                                h("span",{
                                    domProps:{
                                        innerHTML:"文件"
                                    }
                                })
                            ])
                        ]),
                        h("div",{},[
                            h("div",{},[
                                h("i",{
                                    class: "iconfont",
                                    domProps: {
                                        innerHTML: "&#xe656;"
                                    }
                                })
                            ]),
                            h("div",{},[
                                h("span",{
                                    domProps:{
                                        innerHTML:"定位"
                                    }
                                })
                            ])
                        ]),
                    ])
                ])
            ])

    }
}

//验证码
function createVcDom(h,data,cssData) {
    switch (cssData.k){
        case "vc-df":
            // var num = Math.random()
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                h("input",{
                    attrs:{
                        type:"text"
                    },
                    on:{
                        blur:function (e) {
                            var inputVal = e.target.nextElementSibling.innerHTML;
                            if(inputVal.split(" ").join("").toUpperCase() === e.target.value.toUpperCase()){
                                data.v = "1"
                            }else if(e.target.value === ""){
                                data.v = "0";
                                $.layer.alert("验证码不能为空哦")
                            }else{
                                data.v = "0";
                                $.layer.alert("验证码输入错误")
                            }
                        }
                    }
                }),
                h("span",{
                    domProps:{
                        innerHTML:MathRandom(data.num)
                    },
                    style:{
                        backgroundColor:randomColor(),
                        color:"#fff"
                    },
                    on:{
                        click:function (e) {
                            e.preventDefault();
                            e.target.innerHTML = MathRandom(data.num);
                            e.target.style.backgroundColor = randomColor();
                        }
                    }
                })
            ])
    }
}
//随机数生成
function MathRandom(length) {
    var numList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var wordArr = [];
    for(var i = 0;i < length;i++){
        var word = numList.substr(parseInt(Math.random()*(numList.length)),1);
        wordArr.push(word)
    }
    return wordArr.join(" ");
    // console.log(wordArr.join(" "));
}
function randomColor(){
    var r = parseInt(Math.random()*(180-100+1)+100);
    var g = parseInt(Math.random()*(180-100+1)+100);
    var b = parseInt(Math.random()*(180-100+1)+100);
    return `rgb(${r},${g},${b})`
}
//下拉框
var dataListId = 0;
function createSelectDom(h,data,cssData) {
    switch (cssData.k) {
        case "sl-df":
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                createSelect(h,data)
            ]);
        case "sl-1":
            return h("div", {}, [
                h("select", {
                    on: {
                        change: function (e) {
                            var tar = e.target;
                            var next1 = tar.nextElementSibling, next2 = next1.nextElementSibling;
                            deleteOldDay(next1);
                            deleteOldDay(next2);
                            appendCityTown(tar.value, next1, next2)
                        }
                    }
                }, selArr(h)),
                h("select", {
                    on: {
                        change: function (e) {
                            var tar = e.target, next1 = tar.nextElementSibling, pre = tar.previousElementSibling;
                            deleteOldDay(next1);
                            appendCityCounty(pre.value, tar.value, next1)
                        }
                    }
                }, selArr2(h)),
                h("select", {}, selArr3(h))
            ]);
        case "sl-2":
            return h("div", {}, [
                createDoSelect(h, data)
            ]);
        case "sl-3":
            var selDataListId = dataListId++;
            return h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.n
                    }
                }),
                h("input", {
                    attrs: {
                        type: "text",
                        list: selDataListId
                    }
                }),
                createDataList(h, data, selDataListId)
            ])
    }
}

//datalist 下拉框
function createDataList(h, data, id) {
    var arr = h("datalist", {
        attrs: {
            id: id
        }
    }, []);
    for (var i in data.ops) {
        arr.children.push(
            h("option", {
                attrs: {
                    value: data.ops[i].v
                }
            })
        )
    }
    return arr;
}
//下拉框的动态创建
function createDoSelect(h, data) {
    var sel = h("select",{},[]);
    for(var i in data.ops){
        sel.children.push(
            h("option",{
                domProps:{
                    innerHTML:data.ops[i].v
                },
                attrs:{
                    value:data.ops[i].n
                },
                on:{
                    click:function (e) {

                    }
                }
            })
        )
    }
    return sel;
}
//------------------------------------------------------------------------
//下拉框 地区选择 sl-1
function selArr(h,data){
    var ops1 =[];
    for(var i = 0;i< city.length;i++){
        ops1.push(
            h("option",{
                domProps:{
                    innerHTML:city[i].name
                }
            })
        );
    }
    ops1.unshift(h("option",{
        attrs:{
            value:"--请选择--"
        },
        domProps:{
            innerHTML:"--请选择--"
        }
    }));
    return ops1
}
function selArr2(h){
    var ops2 =[];
    for(var i = 0;i< city[0].sub.length;i++){
        ops2.push(
            h("option",{
                domProps:{
                    innerHTML:city[0].sub[i].name
                }
            })
        );
    }
    ops2.unshift(h("option",{
        attrs:{
            value:"--请选择--"
        },
        domProps:{
            innerHTML:"--请选择--"
        }
    }));
    return ops2
}
function selArr3(h){
    var ops3 =[];
    for(var i = 0;i< city[0].sub[0].sub.length;i++){
        ops3.push(
            h("option",{
                domProps:{
                    innerHTML:city[0].sub[0].sub[i].name
                }
            })
        );
    }
    ops3.unshift(h("option",{
        attrs:{
            value:"--请选择--"
        },
        domProps:{
            innerHTML:"--请选择--"
        }
    }));
    return ops3
}
//添加对应市
function appendCityTown(cityName,p,t) {
    var frag = document.createDocumentFragment();
    if(cityName === "--请选择--"){
        var ops2 = document.createElement("option");
        ops2.innerHTML = "--请选择--";
        var ops3 = document.createElement("option");
        ops3.innerHTML = "--请选择--";
        p.appendChild(ops2);
        t.appendChild(ops3)
    }else {
        var ops = document.createElement("option");
        ops.innerHTML = "--请选择--";
        var opss = document.createElement("option");
        opss.innerHTML = "--请选择--";
        frag.prepend(ops);
        t.prepend(opss)
        for (var i = 0; i < city.length; i++) {
            if (cityName === city[i].name) {
                for (var j = 0; j < city[i].sub.length; j++) {
                    var opt = document.createElement("option");
                    opt.setAttribute("value", city[i].sub[j].name);
                    opt.innerHTML = city[i].sub[j].name;
                    frag.appendChild(opt);
                }
                for (var k = 0; k < city[i].sub[0].sub.length; k++) {
                    var opt2 = document.createElement("option");
                    opt2.setAttribute("value", city[i].sub[0].sub[k].name);
                    opt2.innerHTML = city[i].sub[0].sub[k].name;
                    t.appendChild(opt2)
                }
            }
        }
    }
    p.appendChild(frag);
}
//添加县级
function appendCityCounty(cityname,townName,county) {
    var frag = document.createDocumentFragment();
    if(townName === "--请选择--"){
        var ops = document.createElement("option");
        ops.innerHTML = "--请选择--";
        county.appendChild(ops);
    }else{
        var ops1 = document.createElement("option");
        ops1.innerHTML = "--请选择--";
        county.prepend(ops1);
        for(var i = 0;i<city.length;i++){
            if(cityname === city[i].name){
                for(var j = 0;j<city[i].sub.length;j++){
                    if(townName === city[i].sub[j].name){
                        for(var k = 0;k<city[i].sub[j].sub.length;k++){
                            var opt = document.createElement("option");
                            opt.setAttribute("value",city[i].sub[j].sub[k].name);
                            opt.innerHTML = city[i].sub[j].sub[k].name;
                            frag.appendChild(opt);
                        }
                    }
                }
            }
        }
    }
    county.appendChild(frag);
}
//-------------------------------------------------------------------------------------------------

function createSelect(h,data) {
    var select = h("select", {
        on: getEvent(data)
    }, []);
    if(typeof data.ops ==="string") {

    }else {
        for(var i in data.ops) {
            select.children.push(h("option",{
                attrs:{
                    value:data.ops[i].k
                },
                domProps:{
                    innerHTML:data.ops[i].v
                }
            }));
        }
    }
    return select;
}
function createElDom(h,data,cssData) {
    switch(cssData.k) {
        case "el-df":
            getStrForElExpressions(data,"n");
            getStrForElExpressions(data,"v");
            return h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.n
                    }
                }),
                h("span", {
                    domProps: {
                        innerHTML: data.v
                    }
                })
            ]);
    }

}

//时间  年月日 时分秒
function createSdtDom(h, data, cssData) {
    switch (cssData.k){
        case "sdt-df":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getFullYear()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"年"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMonth()+1
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"月"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getDate()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"日"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getHours()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"时"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMinutes()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"分"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getSeconds()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"秒"
                        }
                    })
                ])
            ]);
        case "sdt-1":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getFullYear()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"-"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMonth()+1
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"-"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getDate()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getHours()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:":"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMinutes()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:":"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getSeconds()
                        }
                    })
                ])
            ]);
        case "sdt-2":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getFullYear()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"/"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMonth()+1
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"/"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getDate()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getHours()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:":"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMinutes()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:":"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getSeconds()
                        }
                    })
                ])
            ]);
        case "sdt-3":
            return h("div",{},createTimeDown(h,data));
    }
}

//时间  时分秒
function createStDom(h, data, cssData) {
    switch (cssData.k){
        case "st-df":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getHours()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"时"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMinutes()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"分"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getSeconds()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"秒"
                        }
                    })
                ])
            ]);
        case "st-1":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getHours()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:":"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMinutes()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:":"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getSeconds()
                        }
                    })
                ])
            ]);
        case "st-2":
            return h("div",{},createTimeDown(h,data));
    }
}

//日期展示
function createSdDom(h, data, cssData) {
    switch (cssData.k){
        case "sd-df":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getFullYear()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"年"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMonth()+1
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"月"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getDate()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"日"
                        }
                    })
                ])
            ]);
        case "sd-1":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getFullYear()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"-"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMonth()+1
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"-"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getDate()
                        }
                    })
                ])
            ]);
        case "sd-2":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getFullYear()
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"/"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getMonth()+1
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:"/"
                        }
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:new Date(parseInt(data.v)).getDate()
                        }
                    })
                ])
            ]);
            //倒计时
        case "sd-3":
            return h("div",{},createTimeDown(h,data));
    }
}
//video  视频播放
function createVidDom(h, data, cssData) {
    switch (cssData.k){
        case "vid-df":
            return h("div",{},[
                h("video",{
                    attrs:{
                        autoplay: "autoplay",
                        controls:"controls",
                        preload:"preload",
                        src:data.v
                    }
                })
            ])
    }
}
//评价
function createEvDom(h, data, cssData) {
    switch (cssData.k){
        case "ev-df":
            return h("div",{
                class:"h-r-2",
                style:{
                    backgroundImage:"url(../images/start.png)",
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"200% 100%",
                    backgroundPositionX:"100%",
                },
                on:{
                    click:function(e) {
                        evClick(e, data)
                    }
                }
            })
    }
}
function evClick(e,data) {
    if(e.layerX <= parseInt(e.target.clientWidth)*0.2){
        e.target.style.backgroundPositionX = "80%";
        data.v = 1
    }else if(e.layerX <= parseInt(e.target.clientWidth)*0.4){
        e.target.style.backgroundPositionX = "60%";
        data.v = 2
    }else if(e.layerX <= parseInt(e.target.clientWidth)*0.6){
        e.target.style.backgroundPositionX = "40%";
        data.v = 3
    }else if(e.layerX <= parseInt(e.target.clientWidth)*0.8){
        e.target.style.backgroundPositionX = "20%";
        data.v = 4
    }else{
        e.target.style.backgroundPositionX = "0";
        data.v = 5
    }
}
var currId = 0;
var index = 0;
var ab = 0;
function timerMove(timerData,cdStyle,id){
    var i =id;
    if(timerData !== undefined) {
        switch (cdStyle){
            case "cd-df":
                var now = new Date(), currV = new Date(parseInt(timerData.v)),
                    currDay = new Date(currV - now) < 0 ? 0 : parseInt((currV - now)/1000/3600/24),
                    currHour = parseInt(parseInt((currV- now)/1000)%(3600*24)/3600)<0?0:parseInt(parseInt((currV- now)/1000)%(3600*24)/3600),
                    currM = parseInt(parseInt((currV- now)/1000)%3600/60)<0?0:parseInt(parseInt((currV- now)/1000)%3600/60),
                    currS = parseInt(parseInt((currV - now) / 1000) % 60) < 0 ? timerData.ops[0].v : parseInt(parseInt((currV - now) / 1000) % 60);
                if (currDay < 10) {
                    currDay = "0" + currDay;
                }
                if (currHour < 10) {
                    currHour = "0" + currHour;
                }
                if (currM < 10) {
                    currM = "0" + currM;
                }
                if (currS < 10) {
                    currS = "0" + currS;
                }

                if (document.getElementById(i + "d") !== null) {
                    var d = document.getElementById(i + "d");
                    d.innerHTML = currDay + "";
                }
                if (document.getElementById(i + "h") !== null && document.getElementById(i + "m") !== null && document.getElementById(i + "s") !== null) {
                    var hour = document.getElementById(i + "h"),
                        min = document.getElementById(i + "m"),
                        second = document.getElementById(i + "s");
                    hour.innerHTML = currHour + "";
                    min.innerHTML = currM + "";
                    second.innerHTML = currS + "";
                }
                break;
            //case "cd-1":
            //    var now = new Date(),currV = new Date(timerData.v),
            //        currDay = parseInt(parseInt((currV- now)/1000)/3600/24)<0?0:parseInt(parseInt((currV- now)/1000)/3600/24),
            //        currHour = parseInt(parseInt((currV- now)/1000)%(3600*24)/3600)<0?0:parseInt(parseInt((currV- now)/1000)%(3600*24)/3600),
            //        currM = parseInt(parseInt((currV- now)/1000)%3600/60)<0?0:parseInt(parseInt((currV- now)/1000)%3600/60),
            //        currS = parseInt(parseInt((currV- now)/1000)%60)<0?0:parseInt(parseInt((currV- now)/1000)%60);
            //    if(document.querySelectorAll("."+timerData.k+"d").length !== 0){
            //        var d = document.querySelectorAll("."+timerData.k+"d");
            //        for(var i = 0;i<d.length;i++){
            //            d[i].innerHTML = currDay;
            //        }
            //    }
            //    if(currDay < 10){
            //        currDay = "0" + currDay
            //    }
            //    if(currHour < 10){
            //        currHour = "0" + currHour
            //    }
            //    if(currM < 10){
            //        currM = "0" + currM
            //    }
            //    if(currS < 10){
            //        currS = "0" + currS
            //    }
            //    if(document.querySelector("."+timerData.k+"h") && document.querySelector("."+timerData.k+"m") && document.querySelector("."+timerData.k+"s")){
            //        var hour = document.querySelectorAll("."+timerData.k+"h");
            //        var min = document.querySelectorAll("."+timerData.k+"m");
            //        var  second = document.querySelectorAll("."+timerData.k+"s");
            //        for(var i = 0;i<hour.length;i++){
            //            hour[i].innerHTML = currHour+"";
            //            min[i].innerHTML = currM+"";
            //            second[i].innerHTML = currS+""
            //        }
            //    }
        }

    }
}

function cdMove(data,style) {
    var timerData=data;
    var cdStyle = style;
    currId++;
    (function(timerData,cdStyle,currId){
        var timer = setInterval(
            function(){
                timerMove(timerData,cdStyle,currId);
            },1000);
        timerObjs[index]=timer;
        index++;
    })(timerData,cdStyle,currId);
}

//倒计时
function createCdDom(h,data,cssData){
    switch (cssData.k){
        case "cd-df":
            return h("div",{},createTimeDown(h,data));
        case "cd-1":
            return h("div",{},createTimeDown1(h,data));
    }
}


var timerIndex=0;
function createTimeDown(h, data) {
    var array = [];
    var now = new Date();
    var currV = new Date(parseInt(data.v));
    var currDay = new Date(currV- now)<0?0:parseInt((currV- now)/1000/3600/24),
        currHour = parseInt(parseInt((currV- now)/1000)%(3600*24)/3600)<0?0:parseInt(parseInt((currV- now)/1000)%(3600*24)/3600),
        currM = parseInt(parseInt((currV- now)/1000)%3600/60)<0?0:parseInt(parseInt((currV- now)/1000)%3600/60),
        currS = parseInt(parseInt((currV- now)/1000)%60)<0?0:parseInt(parseInt((currV- now)/1000)%60);
    if(currHour < 10){
        currHour = "0" + currHour;
    }
    if(currM < 10){
        currM = "0" + currM;
    }
    if(currS < 10){
        currS = "0" + currS;
    }
    var remainDay =   h("div",{},[
        h("span",{
            attrs:{
                id:currId+"d"
            },
            domProps:{
                innerHTML:currDay
            }
        }),
        h("span",{
            domProps:{
                innerHTML:"天"
            }
        })
    ]);
    var remainTime =  h("div",{},[
        h("span",{
            attrs:{
                id:currId+"h"
            },
            domProps:{
                innerHTML:currHour
            }
        }),
        h("span",{
            domProps:{
                innerHTML:":"
            }
        }),
        h("span",{
            attrs:{
                id:currId+"m"
            },
            domProps:{
                innerHTML:currM
            }
        }),
        h("span",{
            domProps:{
                innerHTML:":"
            }
        }),
        h("span",{
            attrs:{
                id:currId+"s"
            },
            domProps:{
                innerHTML:currS
            }
        })
    ]);
    if(currDay<=0){
        if (remainDay.data.style) {
            remainDay.data.style.display = "none"
        } else {
            remainDay.data.style = {};
            remainDay.data.style.display = "none"
        }
        //if("class" in remainDay.data) {
        //    remainDay.data.class= remainDay.data.class+" "+"dis-none";
        //}else {
        //    remainDay.data.style.display = "none"
        //    remainDay.data.class="dis-none";
        //}
    }
    if (currHour === "00" && currM === "00" && currS === "00") {
        if (remainTime.data.style) {
            remainTime.data.style.display = "none"
        } else {
            remainTime.data.style = {};
            remainTime.data.style.display = "none"
        }
    }
    array = [
        h("div",{},[
            h("span",{
                domProps:{
                    innerHTML: currHour === "00" && currM === "00" && currS === "00" ? data.ops[0].v : data.n
                }
            })
        ]),
        remainDay,
        remainTime

    ];
    return array;
}

function createTimeDown1(h, data) {
    var array = [];
    var now = new Date();
    var currV = new Date(data.v);
    var currDay = parseInt(parseInt((currV- now)/1000)/3600/24)<0?0:parseInt(parseInt((currV- now)/1000)/3600/24);
    currHour = parseInt(parseInt((currV- now)/1000)%(3600*24)/3600)<0?0:parseInt(parseInt((currV- now)/1000)%(3600*24)/3600),
        currM = parseInt(parseInt((currV- now)/1000)%3600/60)<0?0:parseInt(parseInt((currV- now)/1000)%3600/60),
        currS = parseInt(parseInt((currV- now)/1000)%60)<0?0:parseInt(parseInt((currV- now)/1000)%60);
    if(currHour < 10){
        currHour = "0" + currHour;
    }
    if(currM < 10){
        currM = "0" + currM;
    }
    if(currS < 10){
        currS = "0" + currS;
    }
    var remainDay =   h("div",{},[
        h("span",{
            class:data.k+"d",
            attrs:{
                id:data.k+"d"
            },
            domProps:{
                innerHTML:currDay
            }
        }),
        h("span",{
            domProps:{
                innerHTML:"天"
            }
        })
    ]);
    var remainTime =  h("div",{},[
        h("span",{
            class:data.k+"h",
            attrs:{
                id:data.k+"h"
            },
            domProps:{
                innerHTML:currHour
            }
        }),
        h("span",{
            domProps:{
                innerHTML:":"
            }
        }),
        h("span",{
            class:data.k+"m",
            domProps:{
                innerHTML:currM
            }
        }),
        h("span",{
            domProps:{
                innerHTML:":"
            }
        }),
        h("span",{
            class:data.k+"s",
            attrs:{
                id:data.k+"s"
            },
            domProps:{
                innerHTML:currS
            }
        })
    ]);
    if(currDay<=0){
        if("class" in remainDay.data) {
            remainDay.data.class= remainDay.data.class+" "+"dis-none";
        }else {
            remainDay.data.class="dis-none";
        }
    }
    array = [
        h("div",{},[
            h("span",{
                domProps:{
                    innerHTML:data.n
                }
            }),
        ]),
        remainDay,
        remainTime
    ];
    return array;
}

function createCtView(h, data, cssData) {
    switch (cssData.k){
        case "ct-df":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        class:"iconfont",
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.v
                        }
                    })
                ])
            ]);
        case "ct-1":
            var state = false;
            return h("div",{
            },[
                h("span",{
                    class:"iconfont cursor-pointer",
                    domProps:{
                        innerHTML:data.n
                    },
                    on:{
                        click:function (e) {
                            state = !state;
                            if(state){
                                e.target.style.color = "#f00";
                            }else {
                                e.target.style.color = "#000"
                            }

                        }
                    }
                }),
                h("span",{
                    domProps:{
                        innerHTML:data.v
                    }
                })
            ])
    }
}

var timer = null;

    timer = setInterval(function(){
        if(document.getElementById("cla-w")) {
            var box = document.getElementById("cla-w");
            var index = 0;
            $("#ulList").css("left", "0");
            $("#ulList").animate({left: -box.clientWidth + "px"}, 1000);
            $($("#ulList li")[index]).appendTo($("#ulList"));	//将第一个元素搬到最后一个
        }
    },3000);

function createCarouselFigureView(h,data,cssData) {
    switch (cssData.k){
        case "cf-df":
            return h("div",{
                attrs:{
                    id:"cla-w"
                },
                style:{
                    position:"relative"
                },
                on:{
                    touchstart:function () {
                        clearInterval(timer);
                        timer = null;
                    },
                    touchend:function () {
                        timer = setInterval(function(){
                            var box = document.getElementById("cla-w");
                            var index = 0;
                            $("#ulList").css("left","0");
                            $("#ulList").animate({left:-box.clientWidth+"px"},1000);
                            $($("#ulList li")[index]).appendTo($("#ulList"));	//将第一个元素搬到最后一个
                        },3000);
                    }
                }
            },[
                h("ul",{
                    attrs:{
                        id:"ulList"
                    },
                    style:{
                        width:100*data.v.length+"%",
                        position:"absolute",
                        left:"-100%",
                        top:"0",
                    }
                }, crateImgContainer(h,data))
            ])
    }
}

/**
 * 根据轮播图的内容数量创建对应个数的图片/文字/视频
 * @param h
 * @param data
 * @returns {Array}
 */
function crateImgContainer(h, data) {
    var box = [];
    for (var i = 0; i < data.v.length; i++) {
        box.push(
            h("li",{
                style:{
                    width:100/data.v.length+"%"
                }
            },[
                createCfContent(h, data.v[i])
            ])
        );
    }
    return box
}

/**
 * 根据轮播图的字段来创建对应的标签 图片 文字 视频
 * @param h
 * @param data
 * @returns {*}
 */
function createCfContent(h, data) {
    var content;
    if (data.tp === "img") {
        content = h("img", {
            style: {
                height: "100%"
            },
            attrs: {
                src: data.v
            },
            on: getEvent(data)
        })
    } else if (data.tp === "tx") {
        content = h("span", {
            style: {
                height: "100%"
            },
            attrs: {
                src: data.v
            },
            on: getEvent(data)
        })
    } else if (data.tp === "vid") {
        content = h("video", {
            style: {
                height: "100%"
            },
            attrs: {
                src: data.v
            },
            on: getEvent(data)
        })
    }
    return content;
}

/**
 * 图片
 * @param h
 * @param data
 * @param cssData
 * @returns {*}
 */
function createImageView(h, data,cssData) {
    switch(cssData.k) {
        case "img-1":
            return h("div",{
            },[h("div",{
            },[h("span",{
                domProps:{
                    innerHTML:data.n
                },
                on:getEvent(data)
            })]),h("div",{},[h("img",{
                attrs: {
                    src: data.v
                },
                on:getEvent(data)
            })])]);
        case "img-df":
            return h("div",{},[h("img",{
                    attrs: {
                        src: data.v?data.v:""
                    },
                    on:getEvent(data)
                }
            )])
    }
}

//搜索框

function createTextView(h,data,cssData) {
    var events = getEvent(data);
    events["input"] = function (e) {
        data.v = e.target.value;
    };
    switch(cssData.k){
    	 case "tx-df": //第一种：既有提示文字 又有 占位字符
             console.log("第一种表现形式");
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n.split("|")[0] 
                        },
                        on:getEvent(data)
                    })
                ]),
                h("div",{},[
                    h("input",{
                        attrs: {
                            id:"in-3",
                            type: "text",
                            name: data.k,
                            value: data.v,
                            placeholder: data.n.split("|")[1] 
                        },
                        on:getEvent(data)
                    })
                ])
            ]);
        case "tx-1":  //第二种：仅有提示问题
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n.split("|")[0]
                        },
                        on:getEvent(data)
                    })
                ]),
                h("div",{},[
                    h("input",{
                        attrs: {
                            type: "text",
                            name: data.k,
                            value: data.v
                        },
                        on:getEvent(data)
                    })])]);
        //第三种：仅有占位字符
        case "tx-2":
            return h("div",{},[
                h("input",{
                    attrs:{
                        name:data.k,
                        placeholder: data.n.split("|")[1]
                    },
                    on:getEvent(data)
                })
            ]);
        case "tx-3":
            var dis;
            if (data.ds === "0") {
                dis = true;
            } else {
                dis = false;
            }
            return h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.n
                    }
                }),
                h("input", {
                    attrs: {
                        disabled: dis,
                        value: data.v
                    },
                })
            ]);
        case "tx-tl":
            return h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.n
                    }
                }),
                h("input", {
                    attrs: {
                        type: "tel",
                        value: data.v
                    },
                    on: getEvent(data)
                })
            ])
    }
}

//文本区
function createTextareaView(h,data,cssData) {
//  console.log(data);
    switch(cssData.k){
        case "ta-df":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n?data.n.split("|")[0]:""
                        },
                        on:getEvent(data)
                    })
                ]),
                h("div",{},[
                    h("textarea",{
                        attrs: {
                            type: "text",
                            name: data.k,
                            value: "v" in data?data.v:"",
                            placeholder: data.n?data.n.split("|")[1]:""
                        },
                        on:getEvent(data)
                    })
                ])
            ]);
        case "ta-1":
            return h("div",{},[
                h('textarea', {
                    attrs: {
                        type: "text",
                        name: data.k,
                        value: data.v,
                        placeholder: data.n
                    },
                    on:getEvent(data)
                })
            ]);
        case "ta-2":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n?data.n.split("|")[0]:""
                        },
                        on:getEvent(data)
                    }),
                ]),
                h("div",{},[
                    h("textarea",{
                        attrs:{
                            name:data.k
                        },
                        on:getEvent(data)
                    })
                ])
            ]);
    }
}

//搜索框
function createSearchView(h,data,cssData) {
    switch(cssData.k){
        case "s-2":
            return h("div",{},[
                h("div",{}),
                h("input",{
                    attrs:{
                        name:data.k,
                        placeholder: data.n,
                        value: data.v
                    },
                    on:getEvent(data)
                })
            ]);
        //第二种：搜索按钮在左边
        case "s-1":
            return h("div",{},
                [
                    h("input",
                        {
                            attrs: {
                                name: data.k,
                                placeholder: data.n,
                                value: data.v
                            },
                            on: getEvent(data)
                        }
                    )
                ]
            );
        //第三种：搜索按钮在右边
        case "s-df":
            return h("div",{},
                [
                    h("input", {
                        attrs: {
                            name: data.k,
                            placeholder: data.n,
                            value: data.v
                        },
                        on: getEvent(data)
                    })
                ]
            );
        case "s-3":
            return h("div", {
                    on: getEvent(data)
                }, [
                    h("input",
                        {
                            attrs: {
                                name: data.k,
                                placeholder: data.n || "",
                                value: data.v ? data.v : ''
                            },
                        on:getEvent(data)
                        })
                ]
            )
    }
}

//按钮
function createBtnView(h,data,cssData) {
    var events = getEvent(data);
    events["input"] = function(e) {
        data.v = e.target.value;
    };
    switch (cssData.k){
        case "btn-df":   //第一种：普通的按钮
            return h("div",{},[
	            	h("button",{
		                domProps:{
		                    innerHTML:data.n
		                },
                        on:getEvent(data)
                    })
            ]);
        case "btn-1":
            return h("div",{
            },[h("span",{
                domProps:{
                    innerHTML:data.n
                },
                on:getEvent(data)
            })]);
        case "btn-2":
            return h("div",{},[
                h("input",{
                    attrs:{
                        type:"file",
                        accept:"video/*",
                        value:data.v
                    },
                    on:getEvent(data)
                })
            ]);
        case "btn-i":
            return h("div",{},[
                h("input",{
                    attrs:{
                        type:"file",
                        accept:"image/*",
                        value:data.v
                    },
                    on:getEvent(data)
                })
            ]);
        case "btn-all":
            return h("div",{},[
                h("input",{
                    attrs:{
                        type:"file",
                        value:data.v
                    },
                    on:getEvent(data)
                })
            ]);
        case "btn-3":
            return h("div",{},[
                h("button",{
                    domProps:{
                        innerHTML:data.n
                    },
                    on:{
                        click:function (e) {
                            var tar = e.target.nextElementSibling;
                            tar.click()
                        }
                    }
                }),
                h("input",{
                    style:{
                        display:"none"
                    },
                    attrs:{
                        type:"file",
                        value:data.v,
                    },
                    on:{
                        change:function (e) {
                            data.v = e.target.value;
                            console.log("input的值为"+data.v)
                        }
                    }
                })
            ]);
        case "btn-4":
            return h("div",{},[
                h("button",{
                    domProps:{
                        innerHTML:data.n
                    },
                    on:{
                        click:function (e) {
                            var tar = e.target.nextElementSibling;
                            tar.click()
                        }
                    }
                }),
                h("input",{
                    style:{
                        display:"none"
                    },
                    attrs:{
                        type:"file",
                        value:data.v,
                        accept:"video/*",
                    },
                    on:{
                        change:function (e) {
                            data.v = e.target.value;
                            console.log("input的值为"+data.v)
                        }
                    }
                })
            ]);
        case "btn-5":
            return h("div",{},[
                h("button",{
                    domProps:{
                        innerHTML:data.n
                    },
                    on:{
                        click:function (e) {
                            var tar = e.target.nextElementSibling;
                            tar.click()
                        }
                    }
                }),
                h("input",{
                    style:{
                        display:"none"
                    },
                    attrs:{
                        type:"file",
                        value:data.v,
                        accept:"image/*",
                    },
                    on:{
                        change:function (e) {
                            data.v = e.target.value;
                        }
                    }
                })
            ]);
        case "btn-6":
            return h("div", {}, createCountDown(h, data));
    }
}

function createCountDown(h, data) {
    var clear;
    var cls = [];
    var innerHTML = data.n;
    var span = h("span", {
        domProps: {
            innerHTML: innerHTML
        },
        on: {
            click: function (e) {
                clearTimeout(clear)
                if (e.target.innerHTML.indexOf("重新获取") === -1) {
                    innerHTML = Number(data.v);
                    console.log(innerHTML);
                }

                function time() {
                    if (innerHTML > 0) {
                        e.target.innerHTML = "重新获取（" + innerHTML + "）";
                        innerHTML--;
                    } else {
                        e.target.innerHTML = data.n;
                        clearTimeout(clear);
                    }
                }

                clear = setInterval(time, 1000);
            }
        }
    });
    cls.push(span);
    return cls;
}

/**
 * 创建日期组件
 * @param h
 * @param data
 * @param cssData
 * @returns {*}
 */
function createDateView(h, data, cssData) {
    var events = getEvent(data);
    events["input"] = function(e) {
        data.v = e.target.value;
    };
    switch (cssData.k){
        case "d-df":
            return h("div",{},[
                h("span",{
                    domProps:data.n
                }),
                h("select",{
                    attrs:{
                        id:data.k+"y"
                    },
                    on: {
                        change: function (e) {
                            var tar = e.target;
                            var pickY = tar,
                                pickM = pickY.nextElementSibling.nextElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value, pickM.value, pickD.value, 0, 0, 0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value, pickM.value, pickD);
                        }
                    }
                },createYears(h)),
                h("span",{
                    domProps:{
                        innerHTML:"年"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"m"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickM = tar,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMonths(h)),
                h("span",{
                    domProps:{
                        innerHTML:"月"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"d"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickD = tar,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createDays(h)),
                h("span",{
                    domProps:{
                        innerHTML:"日"
                    }
                })
            ]);
        case "d-1":
            return h("div",{},[
                h("select",{
                    on: {
                        change: function (e) {
                            var tar = e.target;
                            var pickY = tar,
                                pickM = pickY.nextElementSibling.nextElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value, pickM.value, pickD.value, 0, 0, 0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value, pickM.value, pickD);
                        }
                    }
                },createYears(h)),
                h("span",{
                    domProps:{
                        innerHTML:" - "
                    }
                }),
                h("select",{
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickM = tar,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMonths(h)),
                h("span",{
                    domProps:{
                        innerHTML:" - "
                    }
                }),
                h("select",{
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickD = tar,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createDays(h))
            ]);
        case "d-2":
            var nowM,nowD;
            var nowTm = new Date();
            nowM = nowTm.getMonth()+1;
            nowD = nowTm.getDate();
            if(nowM < 10) nowM = "0"+nowM;
            if(nowD < 10) nowD = "0"+nowD;
            var curTime = nowTm.getFullYear()+"-"+nowM+"-"+nowD;
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                h("input",{
                    attrs:{
                        type:"date",
                        value:curTime
                    },
                    on:{
                        change:function (e) {
                            data.v = e.target.value;
                            console.log(data.v)
                        }
                    }
                })
            ]);
        case "d-3":
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"y"
                    },
                    on: {
                        change: function (e) {
                            var tar = e.target;
                            var pickY = tar,
                                pickM = pickY.nextElementSibling.nextElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value, pickM.value, pickD.value, 0, 0, 0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value, pickM.value, pickD);
                        }
                    }
                },createYears(h)),
                h("span",{
                    domProps:{
                        innerHTML:"年"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"m"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickM = tar,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createOldMonth(h)),
                h("span",{
                    domProps:{
                        innerHTML:"月"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"d"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickD = tar,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createOldDays(h)),
                h("span",{
                    domProps:{
                        innerHTML:"日"
                    }
                })
            ]);
        case "d-4":
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"y"
                    },
                    on: {
                        change: function (e) {
                            var tar = e.target;
                            var pickY = tar,
                                pickM = pickY.nextElementSibling.nextElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value, pickM.value, pickD.value, 0, 0, 0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value, pickM.value, pickD);
                        }
                    }
                },createYears(h)),
                h("span",{
                    domProps:{
                        innerHTML:"年"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"m"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickM = tar,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMonths(h)),
                h("span",{
                    domProps:{
                        innerHTML:"月"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"d"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickD = tar,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,0,0,0);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createDays(h)),
                h("span",{
                    domProps:{
                        innerHTML:"日"
                    }
                })
            ]);
        case "d-5":
            var tYear = new Date().getFullYear();
            var tMonth = new Date().getMonth()+1;
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:"<"
                        },
                        style:{
                            cursor:"pointer"
                        },
                        on:{
                            click:function(e){
                                var div1=e.target.parentNode.nextElementSibling.nextElementSibling;
                                var year=e.target.nextElementSibling.firstElementChild;
                                var month=e.target.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
                                div1.firstElementChild.style.display="none";
                                var div2;
                                if(month.innerHTML<=1 && tMonth<=1){
                                    div1.removeChild(div1.querySelector("div"));
                                    month.innerHTML=12;
                                    year.innerHTML=parseInt(year.innerHTML)-1;
                                    tYear=tYear-1;
                                    tMonth=12;
                                    div2=div1.appendChild(createTcl3(is_leap,data,tYear,tMonth));
                                }else{
                                    div1.removeChild(div1.querySelector("div"));
                                    month.innerHTML=parseInt(month.innerHTML)-1;
                                    tMonth--;
                                    div2=div1.appendChild(createTcl3(is_leap,data,tYear,tMonth));
                                }
                                div2.style.width="100%";
                                div2.style.textAlign="center";
                            }
                        }
                    }),
                    h("div",{},[
                        h("span",{
                            domProps:{
                                innerHTML:tYear
                            }
                        }),
                        h("span",{
                            domProps:{
                                innerHTML:"年"
                            }
                        }),
                        h("span",{
                            domProps:{
                                innerHTML:tMonth
                            }
                        }),
                        h("span",{
                            domProps:{
                                innerHTML:"月"
                            }
                        }),
                    ]),
                    h("span",{
                        domProps:{
                            innerHTML:">"
                        },
                        style:{
                            cursor:"pointer"
                        },
                        on:{
                            click:function(e){
                                var div1=e.target.parentNode.nextElementSibling.nextElementSibling;
                                var year=e.target.previousElementSibling.firstElementChild;
                                var month=e.target.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
                                div1.firstElementChild.style.display="none";
                                var div2;
                                if(month.innerHTML>11 && tMonth>11){
                                    div1.removeChild(div1.querySelector("div"));
                                    month.innerHTML=1;
                                    year.innerHTML=parseInt(year.innerHTML)+1;
                                    tYear=tYear+1;
                                    tMonth=1;
                                    div2 = div1.appendChild(createTcl3(is_leap,data,tYear,tMonth));
                                }else{
                                    div1.removeChild(div1.querySelector("div"));
                                    month.innerHTML=parseInt(month.innerHTML)+1;
                                    tMonth++;
                                    div2 = div1.appendChild(createTcl3(is_leap,data,tYear,tMonth));
                                }
                                div2.style.width="100%";
                                div2.style.textAlign="center";
                            }
                        }
                    })
                ]),
                h("div", {}, createWeek(h)),
                h("div", {}, [createCl3(h, is_leap, data, tYear, tMonth)]),
            ]);
    }
}

/**
 * 创建对应星期 几
 * @param h
 * @returns {Array}
 */
function createWeek(h) {
    var weekDay = ['日', '一', '二', '三', '四', '五', '六'];
    var arr = [];
    weekDay.forEach(function (item) {
        arr.push(h('span', {
            domProps: {
                innerHTML: item
            }
        }))
    });
    return arr
}

/**
 * 虚拟DOM创建跟星期相对应的月表
 * @param h
 * @param is_leap
 * @param data
 * @param tYear
 * @param tMonth
 * @returns {*}
 */
function createCl3(h, is_leap, data, tYear, tMonth) {
    var date = new Date();
    var div=h("div",{
        style:{
            display:"flex",
            flexWrap:"wrap",
        }
    },[]);
    var tDay = date.getDate(); //今日日期
    var tMonth_1 = new Date(tYear,tMonth-1, 1); //当月第一天Date资讯
    var firstday = tMonth_1.getDay(); //当月第一天星期几
    // console.log(firstday);
    //各月份的总天数
    var m_days = new Array(31, 28 + is_leap(tYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var ntr = Math.ceil((m_days[tMonth-1] + firstday) / 7); //表格所需要行数
    for(i=0;i<ntr;i++) { //表格的行
        var div1=h("div",{
            style:{
                width:" 100%",
                display:"flex",
            }
        },[]);
        for(k=0;k<7;k++) { //表格每行的单元格
            var idx=i*7+k; //单元格自然序列号
            var date_str=idx-firstday+1; //计算日期
            //过滤无效日期（小于等于零的、大于月总天数的）
            (date_str<=0 || date_str>m_days[tMonth-1]) ? date_str="&nbsp;" : date_str=idx-firstday+1;
            var span=h("span",{
                style:{
                    flex:"1",
                    color:color,
                    cursor: "default",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                },
                domProps:{
                    innerHTML:date_str,
                },
                on:{
                    click:function(e){
                        data.v=new Date(tYear,tMonth,e.target.innerHTML).getTime();
                        var spanList = e.target.parentNode.parentNode.querySelectorAll('span');
                        spanList.forEach(function (item) {
                            if (parseInt(item.innerHTML) !== tDay) {
                                item.style.color = "#000000";
                                item.style.background = ""
                            } else {
                                item.style.color = "#3296FA";
                                item.style.background = ""
                            }
                        });
                        if (e.target.innerHTML !== "&nbsp;") {
                            e.target.style.color = "#fff";
                            e.target.style.background = "#3296FA"
                        }
                    }
                }
            });
            //打印日期：字体颜色为蓝色
            var color=span.data.style.color;
            date_str + 1 === tDay ? color = "#3296FA" : color = "#000000";
            div1.children.push(span);
        }
        div.children.push(div1);
    }
    return div;
}

/**
 * 判断是不是闰年
 * @param year
 * @returns {number}
 */
function is_leap(year) {
    var res;
    return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
}

/**
 * 原生js创建跟星期相对应的月份表
 * @param is_leap
 * @param data
 * @param tYear
 * @param tMonth
 * @returns {Element}
 */
function createTcl3(is_leap,data,tYear,tMonth){
    var date = new Date();
    var div=document.createElement("div");
    div.style.display="flex";
    div.style.flexWrap="wrap";
    var tDay = date.getDate(); //今日日期
    var tMonth_1 = new Date(tYear,tMonth-1, 1); //当月第一天Date资讯
    var firstday = tMonth_1.getDay(); //当月第一天星期几
    // console.log(firstday);
    //各月份的总天数
    var m_days = new Array(31, 28 + is_leap(tYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var ntr = Math.ceil((m_days[tMonth-1] + firstday) / 7); //表格所需要行数
    for(i=0;i<ntr;i++) { //表格的行
        var div1=document.createElement("div")
        div1.style.width="100%";
        div1.style.display="flex";
        for(k=0;k<7;k++) { //表格每行的单元格
            var idx=i*7+k; //单元格自然序列号
            var date_str=idx-firstday+1; //计算日期
            //过滤无效日期（小于等于零的、大于月总天数的）
            (date_str<=0 || date_str>m_days[tMonth-1]) ? date_str="&nbsp;" : date_str=idx-firstday+1;
            date_str === tDay && tMonth === (date.getMonth() + 1) ? color = "#3296FA" : color = "#000000";
            var span=document.createElement("span");
            span.onclick=function(e) {
                data.v=new Date(tYear,tMonth,e.target.innerHTML).getTime();
                var spanList = e.target.parentNode.parentNode.querySelectorAll('span');
                spanList.forEach(function (item) {
                    if (parseInt(item.innerHTML) !== tDay || tMonth !== (date.getMonth() + 1)) {
                        item.style.color = "#000000";
                        item.style.background = ""
                    } else if (parseInt(item.innerHTML) === tDay && tMonth === (date.getMonth() + 1)) {
                        item.style.color = "#3296FA";
                        item.style.background = ""
                    }
                });
                if (e.target.innerHTML !== "&nbsp;") {
                    e.target.style.color = "#fff";
                    e.target.style.background = "#3296FA"
                }

            };
            // flex:"1",
            // color:color,
            // cursor: "default",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center"
            span.style.flex="1";
            span.style.color = color;
            span.style.cursor = "default";
            span.style.display = "flex";
            span.style.justifyContent = "center";
            span.style.alignItems = "center";
            span.innerHTML=date_str;
            div1.appendChild(span);
        }
        div.appendChild(div1);
    }
    return div;
}

//默认时间是30天前
function createOldMonth(h) {
    var months = [];
    var curD = new Date().getTime();
    var old = new Date("2017/12/25").getTime()-new Date("2017/11/25").getTime();
    var oldc = curD-old;
    var showT = new Date(oldc).getMonth()+1;
    for(var i = 1;i<=12;i++){
        var num = i;
        if(num < 10) num = "0" + num;
        if(i === showT){
            months.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else {
            months.push(h("option", {
                domProps: {
                    innerHTML: num
                },
                attrs: {
                    value: i
                }
            }));
        }
    }
    return months;
}
function createOldDays(h) {
    var days = [];
    var curD = new Date().getTime();
    var old = new Date("2017/12/25").getTime()-new Date("2017/11/25").getTime();
    var oldc = curD-old;
    var showT = new Date(oldc).getDate();
    for(var i = 1;i<=31;i++){
        var num = i;
        if(num < 10) num = "0" + num;
        if(i === showT){
            days.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else{
            days.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i
                }
            }));
        }
    }
    return days;
}
// function createDateView(h,data,cssData){
//     switch (cssData.k){
//         case "d-df":
//             return h("div",{},[
//                 h("div", {}, [
//                     h("div", {
//                         attrs:{
//                             id:"select"
//                         },
//                         on:{
//                             click:function(e){
//                             e.stopPropagation();
//                             var lis = document.getElementById("select-li");
//                             var monthBox = document.getElementById("select-li-month");
//                             var dayBox = document.getElementById("select-li-day");
//                             lis.style.display = lis.style.display== "block"?"none":"block";
//                             monthBox.style.display = "none";
//                             dayBox.style.display = "none"
//                         }
//                     }
//                 }, [
//                     h("span", {
//                         attrs: {
//                             id: "chose"
//                         },
//                         domProps: {
//                             innerHTML: 1987
//                         }
//                     }),
//                     h("i", {})
//                 ]), appendLi(h, h("ul", {
//                     attrs:{
//                         id:"select-li"
//                     },
//                     on:{
//                         click:function(e){
//                         var chose = document.getElementById("chose");
//                 chose.innerHTML = e.target.innerHTML;
//                 var month = document.getElementById("chose-month");
//                 var day = document.getElementById("select-li-day");
//                 //console.log(chose.innerHTML);
//                 month.innerHTML = 1;
//                 //console.log(month.innerHTML);
//                 deleteOldDay(day);
//                 appendDay(chose.innerHTML,month.innerHTML,day)
//                 },
//                 mouseover:function(e){
//                     if(e.target.nodeName == "LI"){
//                         e.target.style.backgroundColor = "#666";
//                     }
//                 },
//                 mouseout: function(e){
//                     e.target.style.background = ""
//                 }
//                 }
//                 }))
//                 ]),//年份选择列表
//         h("span",{
//             domProps:{
//                 innerHTML:"年"
//             }
//         }),//字符串“年”
//             h("div", {}, [
//                 h("div", {
//                     attrs:{
//                         id:"select-month"
//                     },
//                     on:{
//                         click:function(e){
//                         e.stopPropagation();
//         var lis = document.getElementById("select-li-month");
//         var yearBox = document.getElementById("select-li");
//
//         var dayBox = document.getElementById("select-li-day");
//         lis.style.display = lis.style.display== "block"?"none":"block";
//         yearBox.style.display = "none";
//         dayBox.style.display = "none";
//         }
//         }
//         }, [
//             h("span", {
//                 attrs: {
//                     id: "chose-month"
//                 },
//                 domProps: {
//                     innerHTML: 1
//                 }
//             }),
//             h("i", {})
//         ]),appendLiMonth(h,h("ul", {
//             attrs:{
//                 id:"select-li-month"
//             },
//             on:{
//                 click:function(e){
//                 var chose = document.getElementById("chose-month");
//         var year = document.getElementById("chose");
//         var month = document.getElementById("chose-month");
//         var choseDay = document.getElementById("chose-day");
//         var dayList = document.getElementById("select-li-day");
//         chose.innerHTML = e.target.innerHTML;
//         choseDay.innerHTML = 1;
//         deleteOldDay(dayList);
//         appendDay(year.innerHTML,month.innerHTML,dayList);
//         },
//         mouseover:function(e){
//             if(e.target.nodeName == "LI"){
//                 e.target.style.backgroundColor = "#666";
//             }
//         },
//         mouseout: function(e) {
//             e.target.style.background = ""
//         }
//         }
//         }))
//         ]),//选择月份
//         h("span",{
//             domProps:{
//                 innerHTML:"月"
//             }
//         }),//字符串“月”
//             h("div",{},[
//                 h("div",{
//                     attrs:{
//                         id:"select-day"
//                     },
//                     on:{
//                         click:function(e){
//                         e.stopPropagation();
//         var dayList = document.getElementById("select-li-day");
//         var yearBox = document.getElementById("select-li");
//         var monthBox = document.getElementById("select-li-month");
//         dayList.style.display = dayList.style.display == "block"?"none":"block";
//         yearBox.style.display = "none";
//         monthBox.style.display = "none";
//         }
//         }
//         },[
//             h("span",{
//                 attrs:{
//                     id:"chose-day"
//                 },
//                 domProps:{
//                     innerHTML:1
//                 }
//             }),
//             h("i",{})
//         ]),appendLiDay(h,
//             h("ul",{
//                 attrs:{
//                     id:"select-li-day"
//                 },
//                 on:{
//                     click:function(e)  {
//                     var daySpan = document.getElementById("chose-day");
//         var dayList = document.getElementById("select-li-day");
//         daySpan.innerHTML = e.target.innerHTML;
//         dayList.style.display = "none"
//         },
//         mouseover:function(e){
//             if(e.target.nodeName == "LI"){
//                 e.target.style.backgroundColor = "#666";
//             }
//         },
//         mouseout: function(e) {
//             e.target.style.background = ""
//         }
//         }
//         }))
//         ]),
//         h("span",{
//             domProps:{
//                 innerHTML:"日"
//             }
//         })//字符串“日”
//         ]);
//     }
// }
//添加年份列表
function appendLi(h){
    var lis =[];
    for(var i = 2000;i <= 2030;i++){
        var option = h("option",{
            domProps:{
                innerHTML:i
            }
        });
        lis.push(option);
    }
    return lis;
}
//添加月份
function appendLiMonth(h,e){
    var lis =[];
    for(var i=1;i<=12;i++){
        var li = h("li",{
            domProps:{
                innerHTML:i
            }
        });
        lis.push(li);
    }
    e.children=lis;
    return e;
}
//添加天数
function appendLiDay(h,e){
    var lis =[];
    for(var i=1;i<=31;i++){
        var li = h("li",{
            domProps:{
                innerHTML:i
            }
        });
        lis.push(li);
    }
    e.children=lis;
    return e;
}

//清除之前日期
function deleteOldDay(d) {
    var node = d.firstChild;
    var tmpNode;
    while(node !== d.lastChild) {
        tmpNode = node.nextSibling;
        d.removeChild(node);
        node = tmpNode;
    }
    d.removeChild(d.lastChild);
}

//时间  时分秒
function createTimeView(h, data, cssData) {
    switch (cssData.k) {
        case "tm-df":
            // data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),$$("#"+data.k+"h").value,$$("#"+data.k+"mi").value,$$("#"+data.k+"s").value);
            return h("div",{},[
                h("select",{
                    attrs:{
                        id:data.k+"h"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickH = tar,
                                pickMt = pickH.nextElementSibling.nextElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createHours(h)),
                h("span",{
                    domProps:{
                        innerHTML:"时"
                    },
                }),
                h("select",{
                    attrs:{
                        id:data.k+"mi"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickMt = tar,
                                pickH = pickMt.previousElementSibling.previousElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMinutes(h)),
                h("span",{
                    domProps:{
                        innerHTML:"分"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"s"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickS = tar,
                            pickMt = pickS.previousElementSibling.previousElementSibling,
                                pickH = pickMt.previousElementSibling.previousElementSibling;
                                data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createSeconds(h)),
                h("span",{
                    domProps:{
                        innerHTML:"秒"
                    }
                })
            ]);
        case "tm-1":
            return h("div",{},[
                h("select",{
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickH = tar,
                                pickMt = pickH.nextElementSibling.nextElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createHours(h)),
                h("span",{
                    domProps:{
                        innerHTML:":"
                    }
                }),
                h("select",{
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickMt = tar,
                                pickH = pickMt.previousElementSibling.previousElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMinutes(h)),
                h("span",{
                    domProps:{
                        innerHTML:":"
                    }
                }),
                h("select",{
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickS = tar,
                                pickMt = pickS.previousElementSibling.previousElementSibling,
                                pickH = pickMt.previousElementSibling.previousElementSibling;
                            data.v = getCurrMillseconds(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createSeconds(h))
            ]);
        case "tm-2":
            var nowTime = new Date().getHours()+":"+new Date().getMinutes();
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                h("input",{
                    attrs: {
                        value:nowTime,
                        type:"time"
                    },
                    on:{
                        change:function (e) {
                            data.v = e.target.value;
                        }
                    }
                })
            ])
    }
}

//时间选择器
// function createTimeView(h,data,cssData) {
//     switch (cssData.k) {
//         case "tm-df":
//             return h("div",{},[
//                 h("div",{},[
//                     h("div",{
//                         on:{
//                             click:function(e){
//                             e.stopPropagation();
//                             var hour = document.getElementById("hoursLi");
//                             var min = document.getElementById("minuteLi");
//                             var sec = document.getElementById("secondLi");
//                             hour.style.display = hour.style.display == "block"?"none":"block";
//                             min.style.display = "none";
//                             sec.style.display = "none"
//                             }
//                         }
//                     },[
//                         h("span",{
//                             attrs:{
//                                 id:"chooseHour"
//                             },
//                             domProps:{
//                                 innerHTML:"00"
//                             }
//                         }),
//                         h("i",{})
//                     ]),
//                     appendHours(h,h("ul",{
//                         attrs:{
//                             id:"hoursLi"
//                         },
//                         on:{
//                             click:function(e){
//                             var hour = document.getElementById("chooseHour");
//                             hour.innerHTML = e.target.innerHTML;
//                             },
//                             mouseover:function (e){
//                                 if(e.target.nodeName == "LI"){
//                                     e.target.style.backgroundColor = "#666";
//                                 }
//                             },
//                             mouseout:function (e) {
//                                 e.target.style.background = ""
//                             }
//                         }
//                     }))
//                 ]),
//                 h("span",{
//                     domProps:{
//                         innerHTML:"时"
//                     }
//                 }),
//                 h("div",{},[
//                     h("div",{
//                         on:{
//                             click:function(e){
//                             e.stopPropagation();
//                             var minute = $$("#minuteLi");
//                             var hour = $$("#hoursLi");
//                             var sec = $$("#secondLi");
//                             minute.style.display = minute.style.display == "block"?"none":"block";
//                             hour.style.display = "none";
//                             sec.style.display = "none"
//                             }
//                         }
//                     },[
//                         h("span",{
//                             attrs:{
//                                 id:"chooseMin"
//                             },
//                             domProps:{
//                                 innerHTML:"00"
//                             }
//                         }),
//                         h("i",{})
//                     ]),
//                     appendMinute(h,h("ul",{
//                         attrs:{
//                             id:"minuteLi"
//                         },
//                         on:{
//                             click:function(e){
//                             var mine = $$("#chooseMin");
//                             mine.innerHTML = e.target.innerHTML
//                             },
//                             mouseover:function(e){
//                                 if(e.target.nodeName == "LI"){
//                                     e.target.style.backgroundColor = "#666";
//                                 }
//                             },
//                             mouseout:function (e) {
//                                 e.target.style.background = ""
//                             }
//                         }
//                     }))
//                 ]),
//                 h("span",{
//                     domProps:{
//                         innerHTML:"分"
//                     }
//                 }),
//                 h("div",{},[
//                     h("div",{
//                         on:{
//                             click:function(e){
//                             e.stopPropagation();
//                             var second = $$("#secondLi");
//                             var hour = $$("#hoursLi");
//                             var min = $$("#minuteLi");
//                             second.style.display = second.style.display == "block"?"none":"block";
//                             min.style.display = "none";
//                             hour.style.display = "none";
//                             }
//                         }
//             },[
//                 h("span",{
//                     attrs:{
//                         id:"chooseSec"
//                     },
//                     domProps:{
//                         innerHTML:"00"
//                     }
//                 }),
//                 h("i",{})
//             ]),
//             appendMinute(h,h("ul",{
//                 attrs:{
//                     id:"secondLi"
//                 },
//                 on:{
//                     click:function(e){
//                     var sec = $$("#chooseSec");
//                     sec.innerHTML = e.target.innerHTML
//                     },
//                     mouseover:function(e){
//                         if(e.target.nodeName == "LI"){
//                             e.target.style.backgroundColor = "#666";
//                         }
//                     },
//                     mouseout: function(e) {
//                         e.target.style.background = ""
//                     }
//                 }
//             }))
//
//             ]),
//             h("span",{
//                 domProps:{
//                     innerHTML:"秒"
//                 }
//             })
//             ]
//         )
//
//     }
// }
//添加 “时”
function appendHours(h,e){
    var lis =[];
    for(var i=0;i<24;i++){
        if(i<10){
            i = "0" + i;
        }
        var li = h("li",{
            domProps:{
                innerHTML:i
            }
        });
        lis.push(li);
    }
    e.children=lis;
    return e;
}

//添加 “分”“秒”
function appendMinute(h,e){
    var lis =[];
    for(var i=0;i<60;i++){
        if(i<10){
            i = "0" + i;
        }
        var li = h("li",{
            domProps:{
                innerHTML:i
            }
        });
        lis.push(li);
    }
    e.children=lis;
    return e;
}

/**
 * kv组件
 * @param h
 * @param data
 * @param cssData
 * @returns {*}
 */
function createKeyValueView(h,data,cssData) {
    switch (cssData.k){
        case "kv-df":
            return h("div", {
                    on: getEvent(data)
                },
                [
                    isHaveSpan(h, data.n, data),
                    isHaveSpan(h, data.v, data)
            ]);
        case "kv-1":
            return h("div",{},[
                h("div",{
                    class:"of-hidden-y",
                    attrs:{
                        id:"show-txt"
                    }
                },[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.v.split("|")[0]
                        },
                        on:{
                            click:function (e) {
                                var show = document.getElementById("show-txt");
                                show.style.height = "auto";
                                e.target.style.display = "none";
                            }
                        }
                    })
                ])
            ]);
        case "kv-2":
            return h("div",{},[
                h("a",{
                    domProps:{
                        innerHTML:data.n
                    },
                    attrs:{
                        href:data.v
                    }
                })
            ]);
        case "kv-3":
            return h("div",{},[
                h("div",{
                    class:"of-hidden-y"
                },[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    }),
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.v.split("|")[0]
                        },
                        on:{
                            click:function (e) {
                                openOrClose(e.target,data)
                            }
                        }
                    })
                ])
            ]);
        case "kv-4":
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n.split("|")[0]
                    }
                }),
                h("span",{
                    domProps:{
                        innerHTML:data.n.split("|")[1]
                    }
                })
            ]);
        case "kv-5":
            return h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.n.split("|")[0]
                    },
                    on: {
                        mouseover: function (e) {
                            // e.target.style.display = "inline-block";
                            e.target.parentNode.style.position = "relative";
                            var sp = document.createElement("span");
                            sp.setAttribute("id", "showKvContent");
                            sp.style.display = "inline-flex";
                            sp.style.flexWrap = "no-wrap";
                            sp.innerHTML = data.n.split("|")[0];
                            sp.style.backgroundColor = "#ffffff";
                            sp.style.color = "#666";
                            sp.style.position = "absolute";
                            sp.style.bottom = -(e.target.parentNode.clientHeight) + "px";
                            sp.style.left = "0";
                            // sp.style.transform = "translateX(-50%)";
                            e.target.parentNode.appendChild(sp)
                        },
                        mouseout: function (e) {
                            if (e.target.parentNode.querySelector("#showKvContent")) {
                                var con = e.target.parentNode.querySelector("#showKvContent");
                                e.target.parentNode.removeChild(con);
                            }
                        }
                    }
                }),
                h("span", {
                    domProps: {
                        innerHTML: data.n.split("|")[1]
                    },
                    on: {
                        mouseover: function (e) {
                            // e.target.style.display = "inline-block";
                            e.target.parentNode.style.position = "relative";
                            var sp = document.createElement("span");
                            sp.setAttribute("id", "showKvContent");
                            sp.style.display = "inline-block";
                            sp.innerHTML = data.n.split("|")[1];
                            sp.style.background = "#fff";
                            sp.style.position = "absolute";
                            console.log(e.target.parentNode.clientHeight);
                            sp.style.bottom = -(e.target.parentNode.clientHeight) + "px";
                            sp.style.left = "0";
                            // sp.style.transform = "translateX(-50%)";
                            e.target.parentNode.appendChild(sp)
                        },
                        mouseout: function (e) {
                            if (e.target.parentNode.querySelector("#showKvContent")) {
                                var con = e.target.parentNode.querySelector("#showKvContent");
                                e.target.parentNode.removeChild(con);
                            }
                        }
                    }
                })
            ])
    }
}
/**
 * kv-df的有关函数
 * @param h
 * @param data
 * @param dataEs
 * @returns {*}
 */
function isHaveSpan(h, data) {
    var span;
    if (data && data !== "") {
        if (data.indexOf('|') > -1) {
            span = [];
            var wArr = data.split("|");
            for (var item of wArr) {
                span.push(h("span", {
                        domProps: {
                            innerHTML: item
                        }
                    })
                )
            }
        } else if (data && data === "^") {
            span = h("span", {
                domProps: {
                    innerHTML: ""
                }
            })
        } else {
            span = h("span", {
                domProps: {
                    innerHTML: data
                }
                //on: getEvent(dataEs)
            })
        }
        return span
    }
}
//展开或关闭
var OC = true;
function openOrClose(e,data) {
    OC = !OC;
    if(OC){
       e.innerHTML = data.v.split("|")[0];
        $(e.parentNode.previousElementSibling).removeAttr("style");
    }else{
        e.innerHTML = data.v.split("|")[1];
        e.parentNode.previousElementSibling.style.height = "auto"
    }
}
//弹出框
function createPopView(h,data,cssData) {
    switch(cssData.k){
        case "pop-1":
            return h("div",{},[
                h("div",{},[ h("span",{
                    domProps:{
                        innerHTML:data.n
                    }})]),
                h("div",{},[
                    h("div",{},[ h("span",{ domProps:{
                        innerHTML:data.btns.split("|")[0]
                    },
                    })]),
                    h("div",{},[h("span",{ domProps:{
                        innerHTML:data.btns.split("|")[1]
                    },
                    })])
                ])
            ]);//提示型
        case "pop-df":
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                },[]),
                h("div",{},[
                    h("input",{
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.btns.split("|")[0]
                        },
                        on:{
                            click:function(e) {
                                e.target.parentNode.parentNode.style.display = "none"
                            }
                        },
                    }),
                    h("span",{
                        domProps:{
                            innerHTML:data.btns.split("|")[1]
                        },
                        on:{
                            click:function(e) {
                                e.target.parentNode.parentNode.style.display = "none";
                                console.log(e.target.parentNode.previousSibling.childNodes[0].value)
                            }
                        },
                    })
                ])
            ]);//布局型
        case "pop-2":
            return h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }
            );//自动消失框
        case "pop-3":
            return h("div",{},[
                h("ul",{
                    'class':"tx-align-center"
                },createPopList(h,data))
            ])
    }
}
function createPopList(h, data) {
    var popList = [];
    var txt = data.btns.split("|");
    txt.reverse();
    console.log(txt);
    for(var j=0;j<txt.length;j++){
        popList.push(
            h("li",{
                'class':"mg-b-r-0_1 mg-t-r-0_1"
            },[
                h("span",{
                    domProps:{
                        innerHTML:txt[j]
                    }
                })
            ])
        )
    }
    return popList
}
//进度表
function createTdView(h,data,cssData){
    switch(cssData.k) {
        case "td-1":
            return;
        case "td-df":
            var el = h("div",{},[]);
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                addChildren(h,el,data)
            ])
    }
}
//表现形式为"td-2"时进度表添加一条条数据
function addChildren(h,el,data) {
    var de;
    if("v" in data) {
        de = data;
    }else{
        de=getDefaultData(data)
    }
    for (var i = 0; i < de.v.length; i++) {
        el.children.push(h("div", {}, [
            h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: de.v[i].bt
                    }
                }),
                h("span", {
                    domProps: {
                        innerHTML: "-"
                    }
                }),
                h("span", {
                    domProps: {
                        innerHTML: de.v[i].et
                    }
                })
            ]),
            h("span", {
                domProps: {
                    innerHTML:de.v[i].msg
                },
                on: {
                    click: function(e) {
                        //console.log(e.target.innerHTML.length);
                        if (e.target.innerHTML.length > 11) {
                            //e.preventDefault();
                            //e.stopPropagation();
                            var hiddenBox = document.getElementById("hidden");
                            var mask = document.getElementById("zhe");
                            hiddenBox.setAttribute("class", "hidden");
                            hiddenBox.innerHTML = e.target.innerHTML;
                            mask.setAttribute("class", "mask");
                        }
                    }
                }
            })
        ]));
    }
    return el;
}
function getCurrMillseconds(year,month,day,hour,minute,second) {
    return new Date(year,month,day,hour,minute,second).getTime();
}
function createDateTimeView (h,data,cssData) {
    switch(cssData.k){
        case "dt-df":
            // data.v = getCurrMillseconds($$("#"+data.k+"y").value+$$("#"+data.k+"m").value+$$("#"+data.k+"d").value+$$("#"+data.k+"h").value+$$("#"+data.k+"mi").value+$$("#"+data.k+"s").value);
            return h("div",{},[
                h("select",{
                    attrs:{
                        id:data.k+"y"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickY = tar,
                                pickM = pickY.nextElementSibling.nextElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling,
                                pickH = pickD.nextElementSibling.nextElementSibling,
                                pickMt = pickH.nextElementSibling.nextElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createYears(h)),
                h("span",{
                    domProps:{
                        innerHTML:"年"
                    }

                }),
                h("select",{
                    attrs:{
                        id:data.k+"m"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickM = tar,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickD = pickM.nextElementSibling.nextElementSibling,
                                pickH = pickD.nextElementSibling.nextElementSibling,
                                pickMt = pickH.nextElementSibling.nextElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            deleteOldDay(pickD);
                            appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMonths(h)),
                h("span",{
                    domProps:{
                        innerHTML:"月"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"d"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickD = tar,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickH = pickD.nextElementSibling.nextElementSibling,
                                pickMt = pickH.nextElementSibling.nextElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createDays(h)),
                h("span",{
                    domProps:{
                        innerHTML:"日"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"h"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickH = tar,
                                pickD = pickH.previousElementSibling.previousElementSibling,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickMt = pickH.nextElementSibling.nextElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createHours(h)),
                h("span",{
                    domProps:{
                        innerHTML:"时"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"mi"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickMt = tar,
                                pickH = pickMt.previousElementSibling.previousElementSibling,
                                pickD = pickH.previousElementSibling.previousElementSibling,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling,
                                pickS = pickMt.nextElementSibling.nextElementSibling;
                            data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createMinutes(h)),
                h("span",{
                    domProps:{
                        innerHTML:"分"
                    }
                }),
                h("select",{
                    attrs:{
                        id:data.k+"s"
                    },
                    on:{
                        change:function (e) {
                            var tar = e.target;
                            var pickS = tar,
                            pickMt = pickS.previousElementSibling.previousElementSibling,
                                pickH = pickMt.previousElementSibling.previousElementSibling,
                                pickD = pickH.previousElementSibling.previousElementSibling,
                                pickM = pickD.previousElementSibling.previousElementSibling,
                                pickY = pickM.previousElementSibling.previousElementSibling;
                                data.v = getCurrMillseconds(pickY.value,pickM.value,pickD.value,pickH.value,pickMt.value,pickS.value);
                            console.log(data.v);
                            //deleteOldDay(pickD);
                            //appendDay(pickY.value,pickM.value,pickD);
                        }
                    }
                },createSeconds(h)),
                h("span",{
                    domProps:{
                        innerHTML:"秒"
                    }
                }),
            ]);
        case "dt-1":
            var nowTime = new Date();
            var curY = nowTime.getFullYear(),
                curM = nowTime.getMonth()+1,
                curD = nowTime.getDate(),
                curH = nowTime.getHours(),
                curMin = nowTime.getMinutes();
            if(curM < 10) curM = "0"+curM;
            if(curD < 10) curD = "0"+curD;
            if(curH < 10) curh = "0"+curH;
            if(curMin < 10) curMin = "0"+curMin;
            var showTime = curY+"-"+curM+"-"+curD+"T"+curH+":"+curMin;
            return h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                }),
                h("input",{
                    attrs:{
                        type:"datetime-local",
                        value:showTime
                    },
                    on:{
                        change:function (e) {
                            console.log(showTime);
                            console.log(e.target.value);
                            data.v = new Date(e.target.value).getTime();
                            console.log(data.v);
                        }
                    }
                })
            ])
    }
}

//年份
function createYears(h){
    var years =[];
    var curYear = new Date().getFullYear();
    for(var i = 2000;i<=2050;i++){
        if(i === curYear){
            years.push(h("option",{
                domProps:{
                    innerHTML:i
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else{
            years.push(h("option",{
                domProps:{
                    innerHTML:i
                },
                attrs:{
                    value:i
                }
            }));
        }
    }
    return years;
}
//月份
function createMonths(h){
    var months = [];
    var curMon = new Date().getMonth()+1;
    for(var i = 1;i<=12;i++){
        var num = i;
        if(num < 10) num = "0" + num;
        if(i === curMon){
            months.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else {
            months.push(h("option", {
                domProps: {
                    innerHTML: num
                },
                attrs: {
                    value: i
                }
            }));
        }
    }
    return months;
}
//天
function createDays(h){
    var days = [];
    var curD = new Date().getDate();
    for(var i = 1;i<=31;i++){
        var num = i;
        if(num < 10) num = "0" + num;
        if(i === curD){
            days.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else{
            days.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i
                }
            }));
        }
    }
    return days;
}
//时
function  createHours(h) {
    var hours = [];
    var curH = new Date().getHours();
    for(var i =0;i<24;i++) {
        var num = i;
        if(num < 10) num = "0" + num;
        if(curH === i){
            hours.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else {
            hours.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i
                }
            }));
        }

    }
    return hours;
}
//分
function  createMinutes(h) {
    var minutes = [];
    var curMin = new Date().getMinutes();
    for(var i =0;i<60;i++) {
        var num = i;
        if(num < 10) num = "0" + num;
        if(curMin === i){
            minutes.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i,
                    selected:"selected"
                }
            }));
        }else{
            minutes.push(h("option",{
                domProps:{
                    innerHTML:num
                },
                attrs:{
                    value:i
                }
            }));
        }
    }
    return minutes;
}
//秒
function  createSeconds(h) {
    var seconds = [];
    for(var i =0;i<60;i++) {
        var num = i;
        if(num < 10) num = "0" + num;
        seconds.push(h("option",{
            domProps:{
                    innerHTML:num
            },
            attrs:{
                value:i
            }
        }));
    }
    return seconds;
}
//给天数的列表添加li
function appendDay(y,m,parent){
    var dateDay = new Date(y,m,0);
    var getDay = dateDay.getDate();
    for(var k=1;k<=getDay;k++){
        var num = k;
        if(num < 10) num = "0" + num;
        var option = document.createElement("option");
        option.innerHTML = num;
        option.setAttribute("value",k);
        parent.appendChild(option);
    }
}

//聊天列表
function createChatView(h,data,cssData) {
    switch(cssData.k) {
        case "cht-df":
            return h("div",{},
                appendValues(h,data)
            );
        case "cht-1":
            return h("div",{},
                appendMsgFile(h,data)
            );
    }
}
//修改过后的聊天窗口
var chtMouseDownTime, chtMouseUpTime;
function appendValues(h,data) {
    var arr = [];
    for(var i in data.ops){
        var el = [];
        var timeValue;
        var currDate = new Date(parseInt(data.ops[i].t));
        var nowTime = new Date();
        var nowH,nowM,nowS,curH,curM,curS;
        curH = currDate.getHours();
        curM = currDate.getMinutes();
        curS = currDate.getSeconds();
        if(curH < 10) curH = "0"+curH;
        if(curM < 10) curM = "0"+curM;
        if(curS < 10) curS = "0"+curS;
        nowH = nowTime.getHours();
        nowM = nowTime.getMinutes();
        nowS = nowTime.getSeconds();
        if(nowH < 10) nowH = "0"+nowH;
        if(nowM < 10) nowH = "0"+nowM;
        if(nowS < 10) nowH = "0"+nowS;
        if(nowTime.getDate() - currDate.getDate() < 1){
            timeValue = curH+"时"+curM+"分";
        }else if(nowTime.getDate() - currDate.getDate() >= 1 && nowTime.getDate() - currDate.getDate() < 2){
            timeValue = "昨天   "+curH+"时"+curM+"分";
        }else if(nowTime.getDate() - currDate.getDate() >= 2 && nowTime.getDate() - currDate.getDate() <= 3){
            timeValue = "前天   "+curH+"时"+curM+"分";
        }else{
            timeValue = currDate.toLocaleString();
        }
        var timeSpan = [],msgContent = [],selected;
        if(data.show){
            selected =
                h("div",{},[
                    h("span",{
                        class:"iconfont cursor-pointer",
                        domProps:{
                            innerHTML:"&#xe672;"
                        },
                        attrs:{
                            name:i
                        },
                        on:{
                            click:function (e) {
                                var index = e.target.getAttribute("name");
                                if(data.seled.indexOf(data.ops[index]) === -1 || data.seled.length === 0){
                                    data.seled.push(data.ops[index]);
                                    e.target.innerHTML = "&#xe65a;"
                                }else if(data.seled.indexOf(data.ops[index]) !== -1){
                                    data.seled.pop(data.ops[index]);
                                    e.target.innerHTML = "&#xe672;"
                                }
                            }
                        }
                    })
                ])
        }else{
            selected = h("div",{
                style:{
                    display:"none"
                }
            },[
                h("span",{
                    class:"iconfont cursor-pointer",
                    domProps:{
                        innerHTML:"&#xe672;"
                    },
                    attrs:{
                        name:i
                    },
                    on:{
                        click:function (e) {
                            var index = e.target.getAttribute("name");
                            if(data.seled.indexOf(data.ops[index]) === -1 || data.seled.length === 0){
                                data.seled.push(data.ops[index]);
                                e.target.innerHTML = "&#xe66a;"
                            }else if(data.seled.indexOf(data.ops[index]) !== -1){
                                data.seled.pop(data.ops[index]);
                                e.target.innerHTML = "&#xe672;"
                            }
                            console.log(data.seled)
                        }
                    }
                })
            ])
        }
        if(i === "0" || new Date(parseInt(data.ops[i].t)).getFullYear() - new Date(parseInt(data.ops[i-1].t)).getFullYear() > 1 || new Date(parseInt(data.ops[i].t)).getMonth() - new Date(parseInt(data.ops[i-1].t)).getMonth() > 1 || new Date(parseInt(data.ops[i].t)).getDate() - new Date(parseInt(data.ops[i-1].t)).getDate() > 1 ||new Date(parseInt(data.ops[i].t)).getMinutes() - new Date(parseInt(data.ops[i-1].t)).getMinutes() > 1){
            timeSpan.push(h("p",{
                class:"",
                domProps:{
                    innerHTML:timeValue
                }
            }))
        }else {
            timeSpan.push(h("p",{
                class:"dis-none",
                domProps:{
                    innerHTML:timeValue
                }
            }))
        }
        if("img" in data.ops[i]){
            msgContent.push(
                h("div",{
                    class: "bd-all-r-8px pd-a-r-0_2 box-size-bb",
                    on: getEvent(data)
                },[
                    h("img",{
                        class:"w-p-100",
                        attrs:{
                            src:data.ops[i].img
                        }
                    })
                ])
            )
        }else if("vid" in data.ops[i]){
            msgContent.push(
                h("div",{
                    class: "bd-all-r-8px pd-a-r-0_2 box-size-bb",
                    on: getEvent(data)
                },[
                    h("video",{
                        class:"w-p-100",
                        attrs:{
                            controls:"controls",
                            src:data.ops[i].vid
                        }
                    })
                ])
            )
        }else{
            msgContent.push(
                h("div", {
                    on: getEvent(data)
                }, [
                    h("span",{
                        class: "tx-align-left dis-in-block bc-42f7ca pd-a-r-0_3 bd-all-r-8px",
                        domProps:{
                            innerHTML:data.ops[i].msg
                        }
                    })
                ])
            )
        }

        if(data.ops[i].id === "myself"){
            el.push(h("div",{},[
                timeSpan,
                h("div",{},[
                    selected,
                    h("div",{
                        class:"flex-js-end pd-r-r-0_3"
                    },[
                        h("div",{
                            class:"mg-r-r-0_3 tx-align-right",
                            style:{
                                maxWidth:"70%"
                            }
                        },[
                            h("span",{
                                domProps:{
                                    innerHTML:data.ops[i].n
                                },
                                on: {
                                    click: function (e) {
                                        console.log(e.currentTarget);
                                        console.dir(data);
                                    }
                                }
                            }),
                            msgContent
                        ]),
                        h("div",{},[
                            h("img",{
                                attrs:{
                                    src:data.ops[i].h
                                }
                            })
                        ])
                    ])
                ])
            ]))
        }else{
            el.push(h("div",{
            },[
                timeSpan,
                h("div",{},[
                    selected,
                    h("div",{
                        class:"flex-dir-rr flex-js-end pd-l-r-0_3"
                    },[
                        h("div",{
                            class:"mg-l-r-0_3 flex-dir-c",
                            style:{
                                maxWidth:"70%"
                            }
                        },[
                            h("span",{
                                domProps:{
                                    innerHTML:data.ops[i].n
                                }
                            }),
                            msgContent
                        ]),
                        h("div",{
                        },[
                            h("img",{
                                attrs:{
                                    src:data.ops[i].h
                                }
                            })
                        ]),
                    ])
                ]),

            ]))
        }
        arr.push(el)
    }
    return arr
}

//聊天图片
function appendMsgFile(h,data) {
    var arr = [];
    for(var i in data.ops){
        var el = [];
        var timeValue;
        var currDate = new Date(parseInt(data.ops[i].t));
        var nowTime = new Date();
        var nowH,nowM,nowS,curH,curM,curS;
        curH = currDate.getHours();
        curM = currDate.getMinutes();
        curS = currDate.getSeconds();
        if(curH < 10) curH = "0"+curH;
        if(curM < 10) curM = "0"+curM;
        if(curS < 10) curS = "0"+curS;
        nowH = nowTime.getHours();
        nowM = nowTime.getMinutes();
        nowS = nowTime.getSeconds();
        if(nowH < 10) nowH = "0"+nowH;
        if(nowM < 10) nowH = "0"+nowM;
        if(nowS < 10) nowH = "0"+nowS;
        if(nowTime.getDate() - currDate.getDate() < 1){
            timeValue = curH+"时"+curM+"分";
        }else if(nowTime.getDate() - currDate.getDate() >= 1 && nowTime.getDate() - currDate.getDate() < 2){
            timeValue = "昨天   "+curH+"时"+curM+"分";
        }else if(nowTime.getDate() - currDate.getDate() >= 2 && nowTime.getDate() - currDate.getDate() <= 3){
            timeValue = "前天   "+curH+"时"+curM+"分";
        }else{
            timeValue = currDate.toLocaleString();
        }
        var timeSpan = [];
        if(i === "0" || new Date(parseInt(data.ops[i].t)).getMinutes() - new Date(parseInt(data.ops[i-1].t)).getMinutes() > 1){
            timeSpan.push(h("p",{
                class:"",
                domProps:{
                    innerHTML:timeValue
                }
            }))
        }else {
            timeSpan.push(h("p",{
                class:"dis-none",
                domProps:{
                    innerHTML:timeValue
                }
            }))
        }
        if(data.ops[i].id === "myself"){
            el.push(h("div",{},[
                timeSpan,
                h("div",{
                    class:"flex-js-end pd-r-r-0_3"
                },[
                    h("div",{
                        class:"mg-r-r-0_3 tx-align-right",
                        style:{
                            maxWidth:"70%"
                        }
                    },[
                        h("span",{
                            domProps:{
                                innerHTML:data.ops[i].id
                            }
                        }),
                        h("div",{},[
                            createImg(h,data,i),
                            h("div",{},[
                                h("span",{
                                    domProps:{
                                        innerHTML:data.ops[i].f
                                    }
                                }),
                                h("span",{
                                    domProps:{
                                        innerHTML:"已发送"
                                    }
                                }),
                            ]),
                        ])
                    ]),
                    h("div",{
                    },[
                        h("img",{
                            attrs:{
                                src:data.ops[i].h
                            }
                        })
                    ])
                ])
            ]))
        }else{
            el.push(h("div",{
            },[
                timeSpan,
                h("div",{
                    class:"flex-dir-rr flex-js-end pd-l-r-0_3"
                },[
                    h("div",{
                        class:"mg-l-r-0_3 flex-dir-c",
                        style:{
                            maxWidth:"70%"
                        }
                    },[
                        h("span",{
                            domProps:{
                                innerHTML:data.ops[i].id
                            }
                        }),
                        h("div",{},[
                            createImg(h,data,i),
                            h("div",{},[
                                h("span",{
                                    domProps:{
                                        innerHTML:data.ops[i].f
                                    }
                                }),
                                h("span",{
                                    domProps:{
                                        innerHTML:"已发送"
                                    }
                                }),
                            ]),
                        ])
                    ]),
                    h("div",{
                    },[
                        h("img",{
                            attrs:{
                                src:data.ops[i].h
                            }
                        })
                    ]),
                ])
            ]))
        }
        arr.push(el)
    }
    return arr
}
//img方法
function createImg(h,data,i){
    var img;
    var file=data.ops[i].f;
    var result =/\.[^\.]+/.exec(file);
    switch (result[0]){
        case ".txt":
            img=h("img",{
                attrs:{
                    src:"../images/file/img_txt.png",
                    dynsrc:file,
                }
            });
            console.log(img.data.attrs.dynsrc);
            break;
        case ".pdf":
            img=h("img",{
                attrs:{
                    src:"../images/file/img_pdf.png",
                    dynsrc:file,
                }
            });
            break;
        case ".ppt":
            img=h("img",{
                attrs:{
                    src:"../images/file/img_ppt.png",
                    dynsrc:file,
                }
            });
            break;
        case ".xlsx":
            img=h("img",{
                attrs:{
                    src:"../images/file/img_exl.png",
                    dynsrc:file,
                }
            });
            break;
        case ".docx" || "doc":
            img=h("img",{
                attrs:{
                    src:"../images/file/img_word.png",
                    dynsrc:file,
                }
            });
            break;
        case ".zip":
            img=h("img",{
                attrs:{
                    src:"../images/file/img_tar.png",
                    dynsrc:file,
                }
            });
            break;
    }
    return img;
}
//聊天图片
function appendMsgVid(h,data) {
    var arr = [];
    for(var i in data.ops){
        var el = [];
        var timeValue;
        var currDate = new Date(parseInt(data.ops[i].t));
        var nowTime = new Date();
        var nowH,nowM,nowS,curH,curM,curS;
        curH = currDate.getHours();
        curM = currDate.getMinutes();
        curS = currDate.getSeconds();
        if(curH < 10) curH = "0"+curH;
        if(curM < 10) curM = "0"+curM;
        if(curS < 10) curS = "0"+curS;
        nowH = nowTime.getHours();
        nowM = nowTime.getMinutes();
        nowS = nowTime.getSeconds();
        if(nowH < 10) nowH = "0"+nowH;
        if(nowM < 10) nowH = "0"+nowM;
        if(nowS < 10) nowH = "0"+nowS;
        if(nowTime.getDate() - currDate.getDate() < 1){
            timeValue = curH+"时"+curM+"分";
        }else if(nowTime.getDate() - currDate.getDate() >= 1 && nowTime.getDate() - currDate.getDate() < 2){
            timeValue = "昨天   "+curH+"时"+curM+"分";
        }else if(nowTime.getDate() - currDate.getDate() >= 2 && nowTime.getDate() - currDate.getDate() <= 3){
            timeValue = "前天   "+curH+"时"+curM+"分";
        }else{
            timeValue = currDate.toLocaleString();
        }
        var timeSpan = [];
        if(i === "0" || new Date(parseInt(data.ops[i].t)).getMinutes() - new Date(parseInt(data.ops[i-1].t)).getMinutes() > 1){
            timeSpan.push(h("p",{
                class:"",
                domProps:{
                    innerHTML:timeValue
                }
            }))
        }else {
            timeSpan.push(h("p",{
                class:"dis-none",
                domProps:{
                    innerHTML:timeValue
                }
            }))
        }
        if(data.ops[i].id === "myself"){
            el.push(h("div",{},[
                timeSpan,
                h("div",{
                    class:"flex-js-end pd-r-r-0_3"
                },[
                    h("div",{
                        class:"mg-r-r-0_3 tx-align-right",
                        style:{
                            maxWidth:"70%"
                        }
                    },[
                        h("span",{
                            domProps:{
                                innerHTML:data.ops[i].id
                            }
                        }),
                        h("div",{},[
                            h("img",{
                                attrs:{
                                    src:data.ops[i].img
                                }
                            })
                        ])
                    ]),
                    h("div",{
                    },[
                        h("img",{
                            attrs:{
                                src:data.ops[i].h
                            }
                        })
                    ])
                ])
            ]))
        }else{
            el.push(h("div",{
            },[
                timeSpan,
                h("div",{
                    class:"flex-dir-rr flex-js-end pd-l-r-0_3"
                },[
                    h("div",{
                        class:"mg-l-r-0_3 flex-dir-c",
                        style:{
                            maxWidth:"70%"
                        }
                    },[
                        h("span",{
                            domProps:{
                                innerHTML:data.ops[i].id
                            }
                        }),
                        h("div",{},[
                            h("img",{
                                attrs:{
                                    src:data.ops[i].img
                                }
                            })
                        ])
                    ]),
                    h("div",{
                    },[
                        h("img",{
                            attrs:{
                                src:data.ops[i].h
                            }
                        })
                    ]),
                ])
            ]))
        }
        arr.push(el)
    }
    return arr
}
//gi
function createGiView(h,data,cssData){
    switch(cssData.k) {
        case "gi-df":
            return h("div",{},[
                h("div",{},[
                    h("img",{
                        attrs:{
                            src:data.img
                        },
                        on:getEvent(data)
                    })
                ]),
//				h("div",{},[
                h("span",{
                    domProps:{
                        innerHTML:data.n
                    }
                })
//				])
            ]);//图片-上下型
        case "gi-1":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.img
                        },
                        on:getEvent(data)
                    })
                ]),
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ])
            ]);//图标-上下型
    }
}
//gp
function createGpView(h,data,cssData) {
    switch(cssData.k) {
        case "gp-df":
            return getGis(h,data,cssData);
        case "gp-1":
            return getGis(h,data,cssData);
    }
}
//得到一个个gi
function getGis(h,data,cssData) {
    var fault;
    if("ops" in data) fault = data; else fault = getDefaultData(data);
    var gis =h("div",{},[]);
    for(var i=0;i<fault.ops.length;i++) {
        // Vue.set(fault.ops[i],"tp","gi");
        // if(cssData.k === "gp-df"){
        //     Vue.set(cssData.v.children[i],"k","gi-df");
        // }else if(cssData.k === "gp-1"){
        //     Vue.set(cssData.v.children[i],"k","gi-1");
        // }
        gis.children.push(getBaseView(h,fault.ops[i],cssData.v.children[i]));
    }
    console.log(gis);
    return gis;
}

//单选
function createRadioView(h, data,cssData) {
    switch (cssData.k) {
        case "r-df":
                return h("div",{},[
                    h("div",{},[
                        h("span",{
                            domProps:{
                                innerHTML:data.n||""
                            }
                        })
                    ]),
                    h("div",{},getRadioItems(h,data))
                ]);
        case "r-1":
            return h("div",{},[
                h("p",{
                    style:{
                        margin:"0",
                    },
                    attrs:{
                        "id":"radioBtn"
                    },
                    on:{
                        click:function (e) {
                            switchRadio(e,data);
                        }
                    }
                })
            ]);
        case "r-2":
            return createRadioView2(h,data);
    }
}
//r-2
function createRadioView2(h,data) {
    var span = h("span",{
        class:""
    });
    var select =h("select",{
        class:"",
        on:{
            change:function(e) {
                span.data.domProps = {
                    innerHTML: e.target.value
                };
                span.data.on = {
                    click:function() {
                        e.target.style.display = "inline-block";
                    }
                };
                e.target.style.display = "none";
            }
        }
    },[]);
    for(var i in data.ops) {
        select.children.push(h("option",{
            class:"",
            domProps:{
                innerHTML:data.ops[i].v
            },
            attrs:{
                value:data.ops[i].k
            }
        }));
    }
    var div = h("div",{
        class:""
    },[
        span,
        select
    ]);
    return div;
}
function switchRadio(e,data) {
    var rb;
    if(e.target.nodeName === "P"){
        rb = e.target;
    }else if(e.target.nodeName === "DIV"){
        rb = e.target.children[0];
    }
    if(data.v === "" || data.v === data.ops[0].k){
        data.v = data.ops[1].k;
    }else{
        data.v = data.ops[0].k;
    }
    if(data.v === data.ops[1].k){
        // var classNameList = rb.className.split(" ");
        // classNameList.push("f-r");
        // rb.className = classNameList.join(" ");
        rb.style.float = "right";
        if(data.ops[0].v === "男" || data.ops[0].v === "女"){
            rb.parentNode.style.backgroundColor = "#00f"
        }else if(data.ops[0].v === "开" || data.ops[0].v === "关"){
            rb.parentNode.style.backgroundColor = "#28DA46"
        }else{
            rb.parentNode.style.backgroundColor = "#28DA46"
        }
    }else{
        // var afterClassList = rb.className.split(" ");
        // if(afterClassList.indexOf('f-r') > -1){
        //     afterClassList.splice(afterClassList.indexOf('f-r'),1);
        // }
        // rb.className = afterClassList.join(" ");
        rb.style.float = "left";
        rb.parentNode.style.backgroundColor = "#fff"
    }
}
//双选
function createCheckBoxView(h, data,cssData) {
    switch (cssData.k) {
        case "c-df":
            return h("div",{},[
                h("div",{},[
                    h("span",{
                        domProps:{
                            innerHTML:data.n
                        }
                    })
                ]),
                h("div",{},getCheckBoxItems(h,data))
            ]);
        case "c-1":
            return;
    }
}
function getRadioItems(h,data) {
    var fault;
    if("ops" in data){
        fault = data
    }else{fault = getDatas(data)}
    var items = [];
    for(var i =0;i<fault.ops.length;i++) {
        items.push(h("div",{},[
            h("input",{
                attrs:{
                    id:"item"+i,
                    type:"radio",
                    name:"r",
                    value:fault.ops[i].k
                },
                on:{
                    click:function (e) {
                        console.dir(e.target);
                        if(e.target.checked){
                            // e.target.checked = false
                        }
                        data.v = e.target.value;
                    }
                }
            }),
            h("label",{
                domProps:{
                    innerHTML:fault.ops[i].v
                },
                attrs:{
                    for:"item"+i
                }
            }),
        ]));
    }
    return items;
}
function  getCheckBoxItems(h,data) {
    var fault;
    if("ops" in data){
        fault = data;
    }else{fault = getDatas(data)}
    var items = [];
    for(var i =0;i<fault.ops.length;i++) {
        items.push(h("div",{},[
            h("label",{
                domProps:{
                    innerHTML:fault.ops[i].v
                },
                attrs:{
                    for:"item"+i
                }
            }),
            h("input",{
                attrs:{
                    id:"item"+i,
                    type:"checkbox",
                    name:"c",
                    value:fault.ops[i].k
                },
                on:{click:function (e) {
                    data.v.push(e.target.value);
                }}
            })
        ]));
    }
    return items;
}

//tree(树)
var level = 0;
var leng = 14.2;
//多级列表
function createTreeView(h,data,cssData){
    if(!("open" in data)){
        Vue.set(data,"open",false);
    }
    var li_views = [];
    // var body_views = [];
    var icon;
    if('imageUri' in data){
        icon= h('span',{class:"test iconfont icon-"+data.imageUri+" "+(("values" in data && data.values.length>0)?cssData.v.icon1:cssData.v.icon2)});
    }else if('img' in data){
        icon= h('img',{class:("values" in data && data.values.length>0)?cssData.v.icon1:cssData.v.icon2,attrs:{ src:data.img}});
    }
    var open_marker;
    var num;
    if('num' in data && data.num>0){
        //最前面的点击图标
        open_marker = h("span",{
            class:'iconfont',
            style:{
                cursor:"pointer"
            },
            domProps:{
                innerHTML: data.open ? "&#xe601;" : "&#xe666;",
            },
            on:{
                click: function (e) {
                    window.event? window.event.cancelBubble = true : e.stopPropagation();
                    data.open = !data.open;
                }
            }
        });
        // 后面的显示子级数量
        num = h("span", {
            domProps: {
                innerHTML: "(" + data.num + ")"
            },
            style: {
                color: "#999"
            }
        });
    } else {
        //最前面的点击图标
        open_marker = h("span", {
            style: {
                display: "none"
            }
        });
        // 后面的显示子级数量
        num = h("span", {

            style: {
                display: "none"
            }
        });
    }
    /**
     * 每级的文字
     */
    var name = h("span",{
        // 'attrs':{
        //     'id':data.id
        // },
        'class':"dis-in-block ",
        style:{
            maxWidth:"6rem",
            whiteSpace:"nowrap",
            overflow:"hidden",
            textOverflow:"ellipsis"
        },
        domProps: {
            innerHTML: data.name
        },
        on: data.es ? getEvent(data) : {}
    });
    /**
     * li下的div
     */
    var divs = h("div",{
        class :"dis-flex flex-align-center",
    },[]);
    [open_marker,icon,name,num].forEach(function(item){
        if(item !== null && item !== undefined){
            divs.children.push(item);
        }
    });
    li_views.push(divs);
    if(data.open  && 'ops' in data && data.ops.length >0){
        level++;
        var itemChildren = data.ops.map(function(item){
            leng = Math.max(leng,item.name.length);
            return createTreeView(h,item,cssData);
        });
        level--;
        _ul = itemChildren;
        li_views.push(_ul);
    }
    return h("div", {}, li_views)
}

function createNavView(h,data,cssData){
    switch(cssData.k){
        case "nav-df":
            return h("div",{},addNavChild(h,data));
        case "nav-1":
            return h("div", {
                style: {
                    position: "relative"
                }
            }, [
                h("div",{},addNavSpan(h,data)),
                h("span",{
                    style: {
                        borderColor: "transparent",
                        borderTopColor: "#000000"
                    }
                })
            ])
    }
}
function addNavSpan(h,data){
    var cls=[];
    console.log(data.vs);
    for(var i=0;i<data.vs.length;i++){
        var div=h("div",{},[]);
        var span1=h("span",{
            class: "iconfont",
            style:{
                display:"inline-block",
                width:"100%",
                textAlign:"center",
            },
            domProps:{
                innerHTML:data.vs[i].icn
            }
        });
        var p=h("p",{
            domProps:{
                innerHTML:data.vs[i].n
            }
        });
        div.children.push(span1);
        div.children.push(p);
        cls.push(div);
    }
    return cls;
}

function addNavChild(h, data) {
    var navChild = [];
    for (var i = 0; i < data.vs.length; i++) {
        navChild.push(
            h("div", {}, [
                h("span", {
                    domProps: {
                        innerHTML: data.vs[i].icn
                    },
                    on: getEvent(data.vs[i])
                }),
                h("p", {
                    domProps: {
                        innerHTML: data.vs[i].n
                    },
                    on: getEvent(data.vs[i])
                })
            ])
        )
    }
    return navChild
}
	//列表
function createListView(h,data,cssData) {
	switch (cssData.k){
		case "li-df":
			return h("div",{},[
				addImg(h,data),
				h("div",{},[
					h("div",{},[
						h("span",{
							domProps:{
								innerHTML:data.n||""
							}
						}),
						h("span",{
							domProps:{
								innerHTML:data.tm||"" 

.toLocaleString()
							}
						})
					]),//左边上面的div(标题/时间)
					h("p",{
						domProps:{
							innerHTML:data.abs||""
						}
					}),
					h("div",{},[
						h("span",{
							domProps:{
								innerHTML:data.d||""
							}
						}),
						h("div",{},addBtn(h,data,cssData))
					])
				])
			]
		)
	}
}

//列表 是否创建图片
function addImg(h,data){
	if(data.img || data.src){
	return	h('div',{},[
				h("img",{
					attrs:{
						src: data.img || data.src
					}
				})
			])
		}
}
//列表 添加按钮

function addBtn(h,data){
	var btn =[];
	if(data.icns){
		for(var i = 0;i<data.icns.length;i++){
			btn.push(
				h("button",{
					domProps:{
						innerHTML:data.icns[i].n
					}
				})
			);
		}
		return btn;
	}
}


//数据对应的dom组成的一组dom(未绑定css数据的)
function getDoms(h, data, cssData) {
    var doms = [];
    //console.log(data);
    //console.log(cssData);
    for (var i = 0; i < data.length; i++) {
        //console.log(cssData[i]);
        if (i < cssData.length) {
            if (cssData[i].k.substr(0, data[i].tp.length) === data[i].tp) {
                doms.push(getBaseView(h, data[i], cssData[i]));
            } else {
                cssData.splice(i, 0, getDefaultCssData(data[i]));
                doms.push(getBaseView(h, data[i], cssData[i]));
            }
        } else {
            cssData.push(getDefaultCssData(data[i]));
            doms.push(getBaseView(h, data[i], cssData[i]));
        }

        //console.log(doms[doms.length-1]);
    }
    return doms;
}

//function createSearchView(h, data,cls) {
//    var events = getEvent(data);
//    events["input"] = function(e) {
//        data.value = e.target.value;
//    }
//    return h('input', {
//        class:cls,
//        attrs: {
//            type: "search",
//            name: data.key,
//            value: data.value,
//            placeholder: data.keyname
//        },
//        on: events,
//    });
//}
//
//function createTextView(h, data,cls) {
//    var events = getEvent(data);
//    events["input"] = function(e) {
//        data.value = e.target.value;
//    }
//    events["keyup"] = function(e){
//        if(e.keyCode==13) {
//            if (changeTypeCallBack) {
//                changeTypeCallBack();
//            }
//        }
//    }
//    return h('input', {
//        class:cls,
//        attrs: {
//            type: "text",
//            name: data.key,
//            value: data.value,
//            placeholder: data.keyname
//        },
//        on: events,
//    });
//}
//
//
//function createTextAreaView(h, data,cls) {
//    var events = getEvent(data);
//    events["input"] = function(e) {
//        data.value = e.target.value;
//    }
//    return h('textarea', {
//        class:cls,
//        attrs: {
//            name: data.key,
//            placeholder: data.keyname,
//            value: data.value
//        },
//        on: events
//    });
//}
//
//function createButtonView(h, data,cls,parag) {
//    return h('button', {
//        on: getShowDataEvent(data,parag),
//        'class': cls,
//        domProps: {
//            innerHTML: data.keyname
//        }
//    });
//}
//
//function createIconButtonView(h, data,cls,parag) {
//    return h('button', {
//        on: getShowDataEvent(data,parag),
//        'class': "iconfont icon-"+data.keyname+" "+cls
//    });
//}
//
//function createRadioView(h, data,cls) {
//    return h("div", getRadioItem(h, data,cls));
//}
//
//function createCheckBoxView(h, data,cls) {
//    return h("div", getCheckBoxItem(h, data,cls));
//}
//
//function getRadioItem(h, data,cls) {
//    var domItems = [h("form", {
//        'class': 'mui-input-group'
//    }, data.values.map(function(item) {
//        return h("div", {
//            'class':  'mui-radio'+" "+cls
//        }, [h("label", {
//            domProps: {
//                innerHTML: item.value
//            }
//        }),
//            h("input", {
//                attrs: {
//                    type: "radio",
//                    name: data.key,
//                    value: item.key,
//                    checked: getCheckedStatus("radio", data,item.key)
//                },
//                on: {
//                    change: function(e) {
//                        radioChange(e, data);
//                    }
//                }
//            })
//        ])
//    }))];
//    return domItems;
//}
//
//function getCheckBoxItem(h, data,cls) {
//    var domItems = [h("form", {
//        'class': 'mui-input-group'
//    }, data.values.map(function(item) {
//        return h("div", {
//            'class': 'mui-checkbox'+" "+cls
//        }, [h("label", {
//            domProps: {
//                innerHTML: item.value
//            }
//        }),
//            h("input", {
//                attrs: {
//                    type: "checkbox",
//                    name: data.key,
//                    value: item.key,
//                    checked: getCheckedStatus("checkbox", data, item.key)
//                },
//                on: {
//                    change: function(e) {
//                        checkboxChange(e, data);
//                    }
//                }
//            })
//        ])
//    }))];
//    return domItems;
//}
//
//function createImageView(h, data,cls) {
//    return h("img", {
//        'class': cls,
//        attrs: {
//            src: data.value
//        },
//        on: getEvent(data)
//    });
//}
//
//function createSelectView(h, data,cls) {
//    return h("select", {
//        attrs: {
//            name: data.key,
//            value: data.value
//        },
//        'class': cls,
//        on: {
//            change: function(e) {
//                data.value = e.target.value;
//            }
//        }
//    }, data.values.map(function(item) {
//        return h('option', {
//            attrs: {
//                value: item.key
//            },
//            domProps: {
//                innerHTML: item.value
//            }
//        });
//    }));
//}
//function getChatListener(data) {
//return null;
//}
//function createChatbaseView(h,data) {
//    switch (data.key){
//        case "text":
//          return data.value;
//        case "image":
//            return h("img", {
//                attrs: {
//                    src: data.value
//                },
//                on: getChatListener(data)
//            });
//        case "voice":
//             return h("button",{
//                // class:[fuhaoClass.viewers[2], 'icon', 'iconfont', 'icon-' + vice],
//                 on:getChatListener(data)
//             });
//        case "video":
//            return h("button",{
//                //class:[fuhaoClass.viewers[2], 'icon', 'iconfont', 'icon-' + vice],
//                on:getChatListener(data)
//            });
//    }
//}
//function createChatView(h,data,cls){
//    var chat_type="send";
//    var valuesViews=[];
//    var time_view;
//    var icon_view;
//    var baseClass;
//    //var user_id=window.android.getUserID();
//    var user_id = "id";
//    if(data.key!==user_id){
//      baseClass =getfhbaseClass('chat-user');
//    }else{
//        baseClass=getfhbaseClass('chat-self');
//    }
//
//    for(var i in data.values){
//      if(data.values[i].key==="icon"){
//          img_view= h('img',  {'class': baseClass.childs[1].cls+' '+cls['head-icon'],
//              attrs: {
//              src: data.values[i].value
//          }}
//          );
//      }else if(data.values[i].key==="time"){
//         time_view= h('span',{
//             'class': cls.time,
//              domProps: {
//                  innerHTML: convertLongTimeToDate(data.values[i].value)
//              }
//          });
//      }else{
//          valuesViews.push(createChatbaseView(h,data.values[i]));
//      }
//    }
//    var arrow= h('span', {
//        'class': baseClass.childs[2].childs[0].cls+ " "+cls.arrow,
//    });
//    valuesViews.push(arrow);
//    var nameview=h('div',{
//        class:baseClass.childs[0].childs[0].cls+" "+cls.name,
//        domProps: {
//            innerHTML: data.keyname
//        }
//    });
//   return h('div',{class:baseClass.cls},[
//       h('div',{class:baseClass.childs[0].cls},[time_view,nameview]),
//       img_view,
//       h('div',{class:baseClass.childs[2].cls+' '+cls['msg-text']},valuesViews),
//   ])
//}
//
//function createFooterInputView(h,data,cls) {
//    var baseclass=getfhbaseClass('foot-input');
//   return h('div', {
//        'class': baseclass.cls+" "+cls.div
//    }, [h('input', {
//        attrs:{
//            value: data.value,
//        },
//        class: baseclass.childs[1].cls+" "+cls.text,
//        on: {
//            input: function input(e) {
//                data.value = e.target.value;
//            }
//        }
//    }), h('span', {
//        'class': ['mui-icon', 'mui-icon-paperplane'],
//       on:{
//            'click':function (e) {
//                values=[];
//                var v={};
//                v.key="text";
//                v.value=data.value;
//                values.push(v);
//                sendMessageToServer(values);
//            }
//       }
//    })]);
//}
//function createDatePickerView(h,data,cls){
//    var curdate=new Date();
//    if (data.year.v == "" ||data.month.v == "" ||data.date.v == "") {
//        data.year.v= curdate.getFullYear();
//        data.month.v = curdate.getMonth() + 1;
//        data.date.v = curdate.getDate();
//    }
//    data.value = getTime(data);
//    contentviews=[];
//    //先给时下拉框赋内容
//    data.year.options=getOption('year',30,curdate.getFullYear());
//    data.month.options=getOption('month',12);
//    data.date.options=getOption('date',new Date(data.year.v,data.month.v,0).getDate());
//    contentviews=contentviews.concat(getdateselect(h,'year',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'month',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'date',data,cls));
//    return contentviews;
//}
//function createTimePickerView(h, data,cls){
//    var curdate=new Date();
//    if (data.hour.v == "" ||data.minite.v == "" ||data.second.v == "") {
//        data.hour.v= curdate.getHours();
//        data.minite.v = curdate.getMinutes();
//        data.second.v = curdate.getSeconds();
//    }
//    data.value = getTime(data);
//    contentviews=[];
//    //先给时下拉框赋内容
//    data.hour.options=getOption('hour',24);
//    data.minite.options=getOption('minite',60);
//    data.second.options=getOption('second',60);
//    contentviews=contentviews.concat(getdateselect(h,'hour',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'minite',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'second',data,cls));
//   return contentviews;
//}
//function createDateTimePickerView(h,data,cls){
//    var curdate=new Date();
//    if (data.year.v == "" ||data.month.v == "" ||data.date.v == ""||data.hour.v == "" ||data.minite.v == "" ||data.second.v == "") {
//        data.year.v= curdate.getFullYear();
//        data.month.v = curdate.getMonth() + 1;
//        data.date.v = curdate.getDate();
//        data.hour.v= curdate.getHours();
//        data.minite.v = curdate.getMinutes();
//        data.second.v = curdate.getSeconds();
//    }
//    data.value = getTime(data);
//    contentviews=[];
//    //先给时下拉框赋内容
//    data.year.options=getOption('year',30,curdate.getFullYear());
//    data.month.options=getOption('month',12,data.month.v);
//    data.date.options=getOption('date',new Date(data.year.v,data.month.v,0).getDate());
//    data.hour.options=getOption('hour',24);
//    data.minite.options=getOption('minite',60);
//    data.second.options=getOption('second',60);
//    contentviews=contentviews.concat(getdateselect(h,'year',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'month',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'date',data,cls));
//    contentviews.push(h('br'));
//    contentviews=contentviews.concat(getdateselect(h,'hour',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'minite',data,cls));
//    contentviews=contentviews.concat(getdateselect(h,'second',data,cls));
//    return contentviews;
//}
//function createListItemView(h, data,cls,parag) {
//    var baseclass = getfhbaseClass('li');
//    var imgdiv;
//    var keysdiv;
//    var topdiv
//    var buttondiv;
//    var rightdiv;
//    var li_content = []
//    var button_views = [];
//    var top_views = [];
//    if ('id' in data) {
//        var commandStr =getForwardCommand(data.id);
//        if('values' in data){
//            for(var i in data.values){
//                if(data.values[i].key=="click"){
//                    data.values[i].value=commandStr;
//                }
//            }
//        }else{
//            data.values=[{key:"click",value:commandStr}];
//        }
//    }
//    if(('imageUri'in data)&&(data.imageUri!="")){
//        imgdiv=h('img',{class:baseclass.childs[0].cls+' '+cls.img,attrs:{src:data.imageUri}});
//    }
//    if('icons' in data){
//        var icon_views=[]
//        for(var j in data.icons){
//            if(data.icons[j].type==="button"){
//                icon_views.push(createButtonView(h,data.icons[j],cls.icons.btn));
//            }else if(data.icons[j].type==="iconbtn"){
//                icon_views.push(createIconButtonView(h,data.icons[j],cls.icons.iconbtn));
//            }
//        }
//        var icondiv= h('div',{class:baseclass.childs[1].childs[2].childs[1].cls}, icon_views)
//        if(intent==undefined||(intent.action!="checkli"&&"radioli")){
//            button_views.push(icondiv);
//        }
//    }
//       var title;
//    if(Object.prototype.toString.call(data.title) === '[object Array]'){
//        title=h('span',
//            {   class:baseclass.childs[1].childs[0].childs[0].cls+" "+cls.title,
//                domProps: {
//                    innerHTML: data.title.join(" ")
//                }});
//    }else{
//        title=h('span',
//            {   class:baseclass.childs[1].childs[0].childs[0].cls+" "+cls.title,
//                domProps: {
//                    innerHTML: data.title
//                }});
//    }
//
//         top_views.push(title);
//        if('date' in data){
//           var time=h('span',{
//               class:baseclass.childs[1].childs[0].childs[1].cls+" "+cls.date,
//                domProps: {
//                    innerHTML: convertLongTimeToDate(data.date)
//                }
//            });
//        if(intent==undefined||(intent.action!="checkli"&&"radioli")){
//                top_views.push(time);
//            }
//        }
//           topdiv=h('div',{class:baseclass.childs[1].childs[0].cls},top_views);
//        if('abstra' in data){
//            if('keys'in data.abstra) {
//                var key_views = [];
//                for (var i in data.abstra.keys) {
//                    key_views.push(h('span', {
//                        class:cls.key,
//                        domProps: {
//                            innerHTML: data.abstra.keys[i]
//                        }
//                    }));
//                }
//                keysdiv=h('div', {class: baseclass.childs[1].childs[1].cls}, key_views);
//            }
//            if("foot" in data.abstra) {
//                var textview;
//                if(Object.prototype.toString.call(data.title) === '[object Array]'){
//                    textview= h('p', {
//                        class: baseclass.childs[1].childs[2].childs[0].cls+" "+cls.text,
//                        domProps: {
//                            innerHTML: data.abstra.foot.join(" ")
//                        }
//                    });
//                }else{
//                    textview= h('p', {
//                        class: baseclass.childs[1].childs[2].childs[0].cls+" "+cls.text,
//                        domProps: {
//                            innerHTML: data.abstra.foot
//                        }
//                    });
//                }
//                button_views.push(textview);
//
//            }
//        }
//        buttondiv=h('div',{class:baseclass.childs[1].childs[2].cls},button_views);
//        if(intent!=undefined&&(intent.action=="checkli")){
//           rightdiv=h("div",{class:baseclass.childs[2].cls},[
//               h("input",
//                   {
//                       class:baseclass.childs[2].childs[0].cls,
//                       attrs:{
//                           type:"checkbox",
//                           name:intent.key,
//                           value:data.id,
//                           checked: getCheckedStatus("checkbox", intent, data.id)
//                       },
//                       on: {
//                           click:function(e){
//                               window.event? window.event.cancelBubble = true : e.stopPropagation();
//                           },
//                           change: function(e) {
//                               checkboxChange(e, intent);
//                           }
//                       }
//                   }
//               )
//           ]);
//        }
//       [topdiv,keysdiv,buttondiv].map(function (item) {
//           if(item!=null||undefined){
//               li_content.push(item);
//           }
//       });
//        var content_view=h('div',{class:baseclass.childs[1].cls},li_content);
//    return h("div", {
//        'class': baseclass.cls+' '+cls.div,
//        attrs: {
//            id: data.id
//        },
//        on:
//            //click: function(e) {
//            //    ForwardDataUrl(data.id);
//            //}
//            LiData(data,parag)
//
//    },[imgdiv,content_view,rightdiv]);
//}
//
//function createGroupItemView(h, data,cls,parag) {
//    var baseClass=getfhbaseClass('gi');
//    var iconview;
//    //if ('id' in data) {
//    //    var commandStr =getForwardCommand(data.id);
//    //    if('values' in data){
//    //        for(var i in data.values){
//    //            if(data.values[i].key=="click"){
//    //                data.values[i].value=commandStr;
//    //            }
//    //        }
//    //    }else{
//    //        data.values=[{key:"click",value:commandStr}];
//    //    }
//    //}
//
//    if('imageUri' in data){
//       iconview= h('div',{class:"iconfont icon-"+data.imageUri+" "+cls.icon});
//    }else if('img' in data){
//        iconview= h('img',{class:cls.icon,attrs:{ src:data.img}});
//    }
//    return h("div", {
//        attrs: {
//            id: data.id,
//        },
//        'class': baseClass.cls+" "+cls.div+" gi-drop-div",
//        //'style':{
//        //    left:data.left,
//        //    top:data.top,
//        //    position:"relative",
//        //    cursor:"pointer",
//        //    "box-sizing":"border-box"
//        //},
//        on: {
//            mousedown: function (e) {
//                giClick(data, e, e.target);
//            },
//            //mousemove:function(e){
//            //    giMouseMove(data, e, e.target);
//            //},
//            //mouseup:function(e) {
//            //    giMouseUp(data, e, e.target);
//            //}
//        }
//    }, [h('div',{class:baseClass.childs[0].cls},[
//        iconview,
//        h('div',{
//            class:baseClass.childs[0].childs[0].cls+" "+cls.name,
//            domProps: {
//                innerHTML: data.name
//            }
//        })
//    ])]);
//}
//function createGroupShowView(h, data,cls) {
//    var groupShowCls = getBasicViewCSSData("group_show");
//    var baseClass=getfhbaseClass('group_show');
//    var liIcons=[];
//    for(var i=0;i<data.children.length;i++){
//        var gi_data=data.children[i];
//        liIcons.push(createGroupItemView(h,gi_data,groupShowCls.gi));
//    };
//    hide = function(event){
//        data.is_show = false;
//    };
//    if('name' in data && data.name!=""){
//        var groupShowName = h("div",{'class':groupShowCls.name,
//            domProps: {
//                innerHTML: data.name
//            }
//         });
//    }
//    return h("div",{'class':baseClass.cls+" "+groupShowCls.overlay,
//                        'style':{
//                            'width':'auto','height':'auto','display':'block'
//                        },
//                        'on':{
//                            'click':hide
//                        }
//                    },
//                    [h("div",{'class':groupShowCls.div},
//                        [
//                            //groupShowName,
//                        h("div",{'class':baseClass.childs[0].childs[0].cls+" "+groupShowCls.inner,'style':{'overflow':'auto'}},
//                            liIcons
//                        )
//                    ])]
//            );
//}
//
//function createGroupView(h, data,cls,parag){
//    var baseClass=getfhbaseClass('group');
//    var iconview = null;
//    var commandFun = function(e){
//        data.is_show = true;
//    };
//    if('values' in data){
//        for(var i in data.values){
//            if(data.values[i].key=="click"){
//                data.values[i].value=commandFun;
//            }
//        }
//    }else{
//        data.values=[{key:"click",value:commandFun}];
//    }
//    var liIcons=[];
//    for(var i=0;i<data.children.length;i++){
//        var gi_data=data.children[i];
//        if('imageUri' in gi_data){
//            iconview= h('div',{class:"iconfont icon-"+gi_data.imageUri + " " + cls.icon});
//        }else if('img' in gi_data){
//            iconview= h('img',{class:cls.childs.icon,attrs:{ src:gi_data.img}});
//        }
//        liIcons.push(h('div',{'class':baseClass.childs[1].cls+" "+cls.u_div},[iconview]));
//        if(i==8){
//            break;
//        }
//    }
//    var group = h("div",
//        {'class':baseClass.cls+" "+cls.m_div,
//            //on: getEvent(data),
//            'attrs':{
//                'href':"#"+data.id,
//                'id':'to_'+data.id
//            },
//            'on':{
//                'click':commandFun
//            }},
//        [h("div",
//            {'class':cls.content},
//            [h("div", {
//                'class': baseClass.cls+" "+cls.div
//            },liIcons
//        ),
//            h("div",{
//                'class':baseClass.childs[0].cls + " " + cls.name,
//                domProps: {
//                    innerHTML: data.name
//                }
//            })
//            ])]
//    );
//    if(data.is_show) {
//        paragviews.push(createGroupShowView(h,data,cls));
//        BackListener.addListener(hide);
//    }
//    return group;
//}
//function createResultButtom(h,intent){
//    var basecls=getfhbaseClass('result_buttom');
//    var cls=getCssData("result_buttom").data;
//    return [h('div',{class:cls.cls+" "+"bcg-color-gray"}),h('div',{
//        class:basecls.cls+" "+cls.cls
//    },[ h('button', {
//        on: {
//            click: function (e) {
//                var jsondata;
//                if(intent.action=="checkli"){
//                     jsondata={key:intent.key,value:intent.value};
//                }else if(intent.action=="appendCreate"){
//                    jsondata=getSubmitData(0,JSON.stringify([]));
//                }
//                var commandstr=getReturnDataCommand(jsondata,intent.action);
//                sendCommandToAndroid(commandstr);
//            }
//        },
//        'class': basecls.childs[0].cls+" "+cls.childs[0],
//        domProps: {
//            innerHTML: "确定"
//        }
//    })])];
//}
//function getIconsViews(h, data,same,cls) {
//    var icons = data.icons;
//    var views = {};
//    for (var location in icons) {
//        var btns = icons[location];
//        var btnviews = [];
//        for (var i in btns) {
//          switch (btns[i].type){
//              case 'button':
//                  btnviews.push( h('button', {
//                      on: getShowDataEvent(btns[i],icons[location],"icons"),
//                      'class': same+" "+cls.btn,
//                      domProps: {
//                          innerHTML: btns[i].keyname
//                      }
//                  }));
//                  break;
//              case 'iconbtn':
//                  btnviews.push( h('button', {
//                      on: getShowDataEvent(btns[i],icons[location],"icons"),
//                      'class': "iconfont icon-"+btns[i].keyname+" "+same+" "+cls.iconbtn
//                  }));
//                  break;
//          }
//        }
//        views[location] = btnviews;
//    }
//    return views;
//}
//function  getDealChilds(dealData,createElement,cN){
//    var childs = [];
//    if("children" in dealData  && dealData.children.length != 0){
//        for(var c= 0,cle=dealData.children.length;c<cle;c++){
//            var childData=dealData.children[c];
//            if(!("show" in childData)){
//                Vue.set(childData,"show",false);
//            }
//            if("children" in childData&&childData.children.length!=0){
//                var childview=getDealChilds(childData,createElement,c);
//            }
//            var sty = {};
//            if(cN==0) {
//                sty = {
//                    position: "absolute",
//                    top: (c + 1) + "rem",//上移
//                    left: (15 - cN * 1.5) + "rem"//左移
//                };
//            }else {
//                sty = {
//                    position: "absolute",
//                    top: "0",//上移
//                    left: "2rem"//左移
//                };
//            }
//            var cLi = createElement("li", {
//                style:sty,
//                on:getdealevent(childData,dealData)
//            },[createElement("span", {
//                attrs:{
//                    class:"iconfont icon-"+ childData.icon +" deal-icon ps"
//                }
//            }),createElement("span", {
//                domProps: {
//                    innerHTML: childData.name
//                },
//                attrs:{
//                    class:"deal-icon ps"
//                },
//                style:{
//                    left:"1rem"
//                }
//            }),childview]);
//            childs.push(cLi);
//        }
//        var cUl = createElement("ul", {
//            attrs:{
//                class:"deal-childs-ul"
//            },
//            class:{
//                none:dealData.show
//            },
//            style:{
//                position:"relative"
//            }
//        },childs);
//    }
//    return cUl;
//}
//function getEvent(data) {
//    var event = {};
//    data.values.map(function(item) {
//        var valueType = Object.prototype.toString.call(item.value);
//        if(valueType === '[object Function]'){
//            event[item.key] = item.value;
//        }else {
//            event[item.key] = function(e) {
//                window.event? window.event.cancelBubble = true : e.stopPropagation();
//                sendCommandToAndroid(item.value);
//            }
//        }
//    });
//    return event;
//}
//function getCheckedStatus(type, data, value) {
//    if (type == "checkbox") {
//        if (data.value.indexOf(value) >= 0) {
//            return true;
//        } else {
//            return false;
//        }
//    } else if (type == "radio") {
//        if (data.value ==value) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//}
//
//
//function checkboxChange(e, data) {
//    if (e.target.checked) {
//        data.value.push(e.target.value);
//    } else {
//        var index = data.value.indexOf(e.target.value);
//        data.value.splice(index, 1);
//    }
//}
//
//function radioChange(e, data) {
//    data.value = e.target.value;
//}
//
//
//function getCalendarClass(item) {
//    var classLists = '';
//    if (this.m !== item.month) {
//        return classLists += fuhaoClass.newdata.calendar[6] + "";
//    } else if (this.cur === item.data) {
//        return classLists += fuhaoClass.newdata.calendar[7] + "";
//    } else if (this.sel === item.data) {
//        return classLists += fuhaoClass.newdata.calendar[8];
//    }
//    return classLists
//}
//
//function getbadgeView(h, data) {
//    var items = [];
//    if ("badge" in data) {
//        items.push(h("span", {
//            'class': fuhaoClass.viewers[4],
//            domProps: {
//                innerHTML: data.badge
//            }
//        }));
//    }
//    return items;
//}
//
//function getKVView(h, data,cls,parag) {
//    var v_view;
//    var name_view;
//    var app_views;
//    var pre_views;
//    var tail_views;
//    var baseclass;
//    var VNODE = [];
//    if (!('type' in data)) {
//        baseclass = getfhbaseClass('kv');
//        var v_cls = baseclass.childs[2].childs[0].cls+ " " + cls.v;
//        if (data.value !== "") {
//            v_view = createKeyValue(h, data,v_cls);
//        }else{
//            return;
//        }
//    } else {
//        baseclass=getfhbaseClass('kv-flex');
//        var v_cls=baseclass.childs[2].childs[0].cls+" "+cls.v;
//        switch (data.type) {
//            case "text":
//                v_view = createTextView(h, data,v_cls);
//                break;
//            case "textarea":
//                v_view = createTextAreaView(h, data,v_cls);
//                break;
//            case "search":
//                v_view=createSearchView(h,data,v_cls);
//                break;
//            case "radio":
//                v_view = createRadioView(h, data,v_cls);
//                break;
//            case "checkbox":
//                v_view = createCheckBoxView(h, data,v_cls);
//                break;
//            case "img":
//                v_view = createImageView(h, data,cls.v);
//                break;
//            case "select":
//                v_view = createSelectView(h, data,v_cls);
//                break
//            case 'time':
//                v_view=createTimePickerView(h,data,cls.v);
//                break
//            case 'date':
//                v_view=createDatePickerView(h,data,cls.v);
//                break
//            case 'datetime':
//                v_view=createDateTimePickerView(h,data,cls.v);
//                break
//        }
//    }
//    if ("icons" in data) {
//        var views = getIconsViews(h, data,baseclass.childs[1].childs[0].cls,cls.icons);
//        if ("app" in views) {
//            app_views = views["app"];
//        }
//        if ("pre" in views) {
//            pre_views = views["pre"];
//        }
//        if ("tail" in views) {
//            tail_views = views["tail"];
//        }
//    }
//    //if("type" in data){
//    //    if(data.type == "text" || data.type == "textarea"|| data.type == "search"){
//    //        name_view = null;
//    //    }else{
//    //        if(!('keyname' in data)||data.keyname==""){
//    //            name_view=null;
//    //        }else {
//    //            name_view = h("span", {
//    //                class: baseclass.childs[0].childs[0].cls + " " + cls.k,
//    //                domProps: {
//    //                    innerHTML: data.keyname
//    //                }
//    //            });
//    //        }
//    //    }
//    //}else{
//        if((!("key" in data))||data.key==""){
//            name_view=null;
//        }else{
//        name_view = h("span", {
//            class:baseclass.childs[0].childs[0].cls+" "+cls.k,
//            domProps: {
//                innerHTML: data.key
//            }
//        });}
//    //}
//    [ name_view, pre_views,v_view, app_views, tail_views].forEach(function(item, index) {
//        if (item != null || undefined) {
//            VNODE.push(h('div', {
//                'class': baseclass.childs[index].cls,
//                on:getShowDataEvent(data,parag)
//            }, [item]))
//        }
//    });
//    return h('div', {
//        'class': baseclass.cls+" "+cls.div,
//    }, VNODE)
//}
//function getBaseView(h,data,cls,parag) {
//  if('type'in data){
//      if(data.type==='gi'){
//          return createGroupItemView(h,data,cls,parag);
//       }else if(data.type==='li'){
//          return createListItemView(h,data,cls,parag);
//       }else if(data.type==='chat'){
//          return createChatView(h,data,cls);
//       }else if(data.type==='button'){
//          return createButtonView(h,data,cls,parag);
//       }else if(data.type==='iconbtn'){
//          return createIconButtonView(h,data,cls,parag);
//       }else if(data.type==='group'){
//          return createGroupView(h,data,cls,parag);
//      }else{
//          return getKVView(h,data,cls,parag);
//       }
//    }else{
//        return getKVView(h,data,cls,parag);
//    }
//}
//
//function getParagraphView(h,data,templet){
//    var cssData=getCssData(templet);
//    var items=null;
//    var paragname=null;
//    var paragviews=[];
//    if(cssData.type==="fixed"){
//        var items = data.values.map(function (item) {
//            return getBaseView(h, item,cssData.data.childs[data.values.indexOf(item)],data);
//        });
//    }else{
//        var items = data.values.map(function (item) {
//            if('type' in item){
//                if(item.type== 'foreignkey'){
//                    return createForeignKeyView(h,item,cssData,data);
//                }
//                return getBaseView(h, item,cssData.data.childs[item.type],data);
//            }else{
//                return getBaseView(h, item,cssData.data.childs.default,data);
//            }
//        });
//    }
//    if('name' in data && data.name!=""){
//        paragname=h('div',{
//                class:cssData.name.div
//            },[
//                h('span',{
//                    class:cssData.name.name,
//                    domProps: {
//                        innerHTML: data.name
//                    }
//                })
//            ]
//        );
//    }
//     if(paragname!=null){
//         paragviews.push(paragname);
//     }
//     if(items==null){
//       return;
//     }else{
//        paragviews=paragviews.concat(items);
//     }
//    if(cssData.type==="fixed"){
//        return h('div',{class:cssData.data.cls},paragviews);
//    }else{
//       return paragviews;
//    }
//}
//function  initIntent(intent){
//    if(intent.action=="checkli"){
//       Vue.set(intent,"value",[]);
//    }
//}
//
//function createForeignKeyView(h, data,cssData,parag){
//    var items = data.values.map(function (item) {
//        if('type'in item){
//            return getBaseView(h, item,cssData.data.childs[item.type],data);
//        }else{
//            return getBaseView(h, item,cssData.data.childs.default,data);
//        }
//    });
//    items.splice(0,0,h("span",{
//        class:"vert-center font-size-07 font-color-show row-rem-1",
//        domProps: {
//            innerHTML: "外键数据："+data.name
//        }
//    }));
//    return h("div",{
//        class:"bor-radius-hint",
//        on:getForeignKeyEvent(data,parag)
//    },items);
//}
//
