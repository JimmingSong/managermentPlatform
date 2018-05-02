//复选框组件，应用与可见和flex布局的换行
Vue.component("checkbox",{
    render:function(createElement){
        var data=this.data;
        var che;
        if(data.st){
            che=true
        }else{
            che=false
        }
        return createElement("div",{
            style:{
                display: "inline-block"
            }
        },[
            createElement("input",{
                attrs:{
                    type:"checkbox",
                    value:data.v,
                    name:data.n,
                    checked:che
                },
                on:{
                    click:function(e){
                        var name=e.target.name;
                        var val=e.target.value;
                        //不可见，选中时添加v-h,取消之后添加类名v-v
                        if (name === "v") {
                            if (e.target.checked) {
                                classAndData.cls.numValue.vv.st = true;
                                classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj)
                            } else {
                                classAndData.cls.numValue.vv.st = false;
                                classAddToStyle.inputClick(name, "v", cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj)
                            }
                            //flex布局换行
                        } else if (name === "fr") {
                            if (e.target.checked) {
                                classAndData.cls.numValue.frnw.st = true;
                                classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj)
                            } else {
                                classAndData.cls.numValue.frnw.st = true;
                                classAddToStyle.inputClick(name, "nw", cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj)
                            }
                        }
                    }
                }
            })
        ])
    },
    props:["data"],
})
//单选按钮组件
Vue.component("radio",{
    render:function(createElement){
        var data=this.data;
        var checked;
        if(data.st){
            checked=true
        }else{
            checked=false
        }
        return createElement("div",{
            style:{
                display:"inline-block",
            },
        },[
            createElement("input",{
                attrs:{
                    type:"radio",
                    value:data.v,
                    name:data.n,
                    id:data.id,
                    checked:checked
                },
                on:{
                    click:function(e){
                        var name=e.target.name;
                        var val=e.target.value;
                        //应用于背景图片中的背景区域，当点击其中一个选项时，删除其他两个选项的类名
                        if(name==="bl"){
                            if(val==="b"){
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.blp.st = false;
                                    classAndData.cls.numValue.blc.st = false;
                                    cssDynaCache.removeCss("bl-c");
                                    cssDynaCache.removeCss("bl-p");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);

                                };
                            }else if(val==="p"){
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.blb.st = false;
                                    classAndData.cls.numValue.blc.st = false;
                                    cssDynaCache.removeCss("bl-b");
                                    cssDynaCache.removeCss("bl-c");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);
                                };
                            }else{
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.blb.st = false;
                                    classAndData.cls.numValue.blp.st = false;
                                    cssDynaCache.removeCss("bl-b");
                                    cssDynaCache.removeCss("bl-p");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);

                                };
                            }
                        };
                        //应用于背景图片中的背景重复
                        if(name==="bre"){
                            if(val==="rp"){
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.brerx.st = false;
                                    classAndData.cls.numValue.brery.st = false;
                                    cssDynaCache.removeCss("bre-rx");
                                    cssDynaCache.removeCss("bre-ry");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);

                                };
                            }else if(val==="rx"){
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.brerp.st = false;
                                    classAndData.cls.numValue.brery.st = false;
                                    cssDynaCache.removeCss("bre-rp");
                                    cssDynaCache.removeCss("bre-ry");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);
                                };
                            }else{
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.brerp.st = false;
                                    classAndData.cls.numValue.brerx.st = false;
                                    cssDynaCache.removeCss("bre-rp");
                                    cssDynaCache.removeCss("bre-rx");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);

                                };
                            }
                        };
                        //应用于背景图片中的图片滚动
                        if(name==="ba"){
                            if(val==="s"){
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.baf.st = false;
                                    cssDynaCache.removeCss("baf");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);

                                };
                            }else {
                                if(e.target.checked){
                                    data.st=true;
                                    classAndData.cls.numValue.bas.st = false;
                                    cssDynaCache.removeCss("bas");
                                    classAddToStyle.inputClick(name, val, cssBaseData.clsName, cssBaseData.clsValue, classAndData.clsobj.obj);

                                };
                            }
                        };
                    }
                }
            }),
            createElement("label",{
                attrs:{
                    value:data.v,
                    name:data.n,
                    for:data.id,
                },
                domProps:{
                    innerHTML:data.val,
                }
            }),
        ]);
    },
    props:["data"]
})

//按钮组件，点击时data.st为true,改变按钮样式，添加类名，再次点击时data.st为false,按钮为默认样式，删除该类名
Vue.component("btn",{
    render:function (createElement) {
        var _data = this.data;
        var color;
        if(_data.st){
            color = "#6A6A6A"
        }else {
            color = "#F9F9F9"
        }
        return createElement("button",{
            domProps:{
                innerHTML:_data.test
            },
            attrs:{
                name:_data.name,
                value:_data.value
            },
            style:{
                backgroundColor: color
            },
            on:{
                click:function(e){
                    _data.st=!_data.st;
                    var name = e.target.name;
                    var clsName;
                    if (name === "f-c") {
                        //清除浮动
                        clsName = "-cb";
                        var cls = "clear:both"
                    } else if (name === "i") {
                        //添加图标
                        clsName = "-i";
                    } else if (name === "o") {
                        clsName = "-o"
                    } else if (name === "c") {
                        //绝对居中
                        clsName = "-c";
                    } else if (name === "c-t" || name === "bc-t" || name === "bdc-t" || name === "oc-t") {
                        //颜色透明按钮
                        if (name === "bdc-t") {
                            if (classAndData.cls.numValue.selBord === "b") {
                                clsName = classAndData.cls.numValue.selBord + "dc-t";
                            } else {
                                clsName = classAndData.cls.numValue.selBord + "c-t";
                            }
                        } else {
                            clsName = e.target.name;
                        }
                    } else if (name === "ta-l" || name === "ta-r" || name === "ta-c") {
                        //文字位置按钮
                        clsName = e.target.name;
                        clearBtnCls(clsName, ["tal", "tar", "tac"], classAndData.cls.numValue);
                    } else if (name === "f-l" || name === "f-r") {
                        //浮动按钮
                        clsName = e.target.name;
                        clearBtnCls(clsName, ["fl", "fr"], classAndData.cls.numValue);
                    } else if (name === "fd-r" || name === "fd-rr" || name === "fd-cr" || name === "fd-c") {
                        //flex轴方向按钮
                        clsName = e.target.name;
                        clearBtnCls(clsName, ["fdr", "fdrr", "fdcr", "fdc"], classAndData.cls.numValue);
                    } else if (name === "jc-s" || name === "jc-e" || name === "jc-sb" || name === "jc-ar" || name === "jc-c") {
                        //flex主轴排列按钮
                        clsName = e.target.name;
                        clearBtnCls(clsName, ["jcs", "jce", "jcsb", "jcar", "jcc"], classAndData.cls.numValue);
                    } else if (name === "ai-fs" || name === "ai-fe" || name === "ai-c") {
                        //flex交叉轴排列按钮
                        clsName = e.target.name;
                        clearBtnCls(clsName, ["aifs", "aife", "aic"], classAndData.cls.numValue);
                    } else {
                        clsName = e.target.name;
                    }
                    if (_data.st) {
                        addCssName(classAndData.clsobj.obj, clsName)
                    } else {
                        delCssName(classAndData.clsobj.obj, clsName)
                    }
                }
            }
        })
    },
    props:["data"]
});

/**
 *属性 数据 布局
 */
//按钮+输入框+按钮 组件，失去焦点，按enter键的时候进行拼接类名
Vue.component("selnum",{
    render:function(createElement){
        var data=this.data;
        return createElement("div", {
            style:{
                width:"30%",
                height:"20px",
                display:"flex",
                justifyContent: "space-around",
                alignItems: "center",
                border:"1px solid black",
            }
        }, [
            createElement("button", {
                domProps: {
                    innerHTML: "+"
                },
                attrs:{
                    type:"button",
                },
                on: {
                    mousedown: function (e) {
                        e.preventDefault();
                        e.target.nextElementSibling.focus();
                        data.value++;
                    }
                },
                style:{
                    height:"15px",
                    border:"none",
                    background: "#ffffff",
                    outline: "none",
                }
            }),
            createElement("input", {
                domProps: {
                    value: data.value,
                },
                attrs:{
                    name:data.name,
                    pattern:"[0-9]*",
                },
                on: {
                    input: function (e) {
                        data.value = e.target.value
                    },
                    blur:function(e){
                        var name=e.target.name;
                        //边距和边框宽度时会出现name为其他的类名，强制让它为m或bw
                        //出现这个问题的原因可能是哪少了判断，暂时没找到问题出现的原因，但是不影响其他的
                        if (name === "ml" || name === "mr" || name === "mt" || name === "mb" || name === "pd" || name === "pt" || name === "pr" || name === "pl" || name === "pb") {
                            name = "m";
                        }
                        if (name === "blw" || name === "brw" || name === "bbw" || name === "btw") {
                            name = "bw";
                        }
                        if (cssBaseData.clsName === null) {
                            $.layer.alert("出错le")
                        }else if(name==="tb"){
                            //定位Y轴方向
                            classAddToStyle.clsTBJoin(classAndData.cls.numValue.pospoint, cssBaseData.clsName, data.value, classAndData.cls.numValue.tbd.unit, classAndData.clsobj.obj)
                        } else if (name === "r" || name === "l") {
                            //定位X轴方向
                            classAddToStyle.clsLRJoin(classAndData.cls.numValue.pospoint, cssBaseData.clsName, data.value, classAndData.cls.numValue.lrd.unit, classAndData.clsobj.obj)
                        } else if (name === "t" || name === "b") {
                            classAddToStyle.clsTBJoin(classAndData.cls.numValue.pospoint, cssBaseData.clsName, data.value, classAndData.cls.numValue.lrd.unit, classAndData.clsobj.obj)
                        }else if(name==="m"){
                            //边距
                            //外边距可以为负值，但是内边距不可以，内边距加了一层判断
                            var str=classAndData.cls.numValue.marginPadding;
                            if(str==="m"||str==="ml"||str==="mr"||str==="mb"||str==="mt"){
                                classAddToStyle.clsJoin(classAndData.cls.numValue.marginPadding, data.value, data.unit, cssBaseData.clsName[classAndData.cls.numValue.marginPadding], classAndData.clsobj.obj)
                            }else{
                                if(data.value<0){
                                    alert("数值必须时大于等于0");
                                    data.value = 0;
                                }else{
                                    classAddToStyle.clsJoin(classAndData.cls.numValue.marginPadding, data.value, classAndData.cls.numValue[name + "d"]["unit"], cssBaseData.clsName[classAndData.cls.numValue.marginPadding], classAndData.clsobj.obj)
                                }
                            }
                        }else if(name==="br"){
                            //圆角
                            if(data.value<0){
                                alert("数值必须时大于等于0");
                                data.value = 0;
                            }else{
                                classAddToStyle.brChange(classAndData.cls.numValue.selBorRad, classAndData.cls.numValue.brd.value, classAndData.cls.numValue.brd.unit, classAndData.cls.numValue.brtd.value, classAndData.cls.numValue.brtd.unit, cssBaseData.clsName, classAndData.clsobj.obj)
                            }
                        }else if(name==="bw"){
                            //边框线宽
                            var bw=classAndData.cls.numValue.selBord+"w";
                            if(data.value<0){
                                alert("数值必须时大于等于0");
                                data.value = 0;
                            }else{
                                classAddToStyle.clsJoin(bw, data.value, data.unit, cssBaseData.clsName[bw], classAndData.clsobj.obj)
                            }
                        }else if(name==="dbp"){
                            //背景图片定位
                            if(data.value<0){
                                alert("数值必须时大于等于0");
                                data.value = 0;
                            }else{
                                classAddToStyle.imgPosition(name.substr(1), data.value, classAndData.cls.numValue.imgYd.value, cssBaseData.clsName, classAndData.clsobj.obj)
                            }
                        }else if(name==="bp"){
                            //背景图片定位
                            if(data.value<0){
                                alert("数值必须时大于等于0");
                                data.value = 0;
                            }else{
                                classAddToStyle.imgPosition(name, classAndData.cls.numValue.imgXd.value, data.value, cssBaseData.clsName, classAndData.clsobj.obj)
                            }
                        }else if(name==="ts"){

                        }else if(name==="fg"){
                            //flex布局放大占位
                            if(classAndData.cls.numValue.fdMax.value<0){
                                alert("数值必须时大于等于0");
                                classAndData.cls.numValue.fdMax.value = 0;
                            }else{
                                classAddToStyle.flexClsJoin(name, classAndData.cls.numValue.fdMax.value, cssBaseData.clsName, classAndData.clsobj.obj);
                            }

                        }else if(name==="fsh"){
                            //flex缩小占位
                            if(classAndData.cls.numValue.fdMin.value<0){
                                alert("数值必须时大于等于0");
                                classAndData.cls.numValue.fdMin.value = 0;
                            }else{
                                classAddToStyle.flexClsJoin(name, classAndData.cls.numValue.fdMin.value, cssBaseData.clsName, classAndData.clsobj.obj);
                            }
                        }else if(name==="ord"){
                            //flex排列方式
                            if(classAndData.cls.numValue.order.value<0){
                                alert("数值必须时大于等于0");
                                classAndData.cls.numValue.order.value = 0;
                            }else{
                                classAddToStyle.flexClsJoin(name, classAndData.cls.numValue.order.value, cssBaseData.clsName, classAndData.clsobj.obj);
                            }
                        } else if (name === "zd") {
                            //z-index
                            classAddToStyle.flexClsJoin(name, classAndData.cls.numValue.zdd.value, cssBaseData.clsName, classAndData.clsobj.obj);
                        }else if(name==="bgs"){
                            //背景图片背景尺寸
                            if(data.value < 0){
                                alert("数值必须时大于等于0");
                                data.value = 0;
                            }else{
                                classAddToStyle.imgPosition(name, classAndData.cls.numValue.bawd.value, classAndData.cls.numValue.bahd.value, cssBaseData.clsName, classAndData.clsobj.obj)
                            }
                        }else{
                            if(data.value < 0){
                                alert("数值必须时大于等于0");
                                data.value = 0;
                            }else{
                                var unit=classAndData.cls.numValue[name+"d"]["unit"];
                                classAddToStyle.clsJoin(name, data.value, unit, cssBaseData.clsName[name], classAndData.clsobj.obj)
                            }
                        }

                    },

                    keydown:function(e){
                        if(e.keyCode === 13){
                            e.target.blur();
                        }
                    },
                    keyup: function (e) {
                        keyPress(e.target);

                    }

                },
                style:{
                    width:"40%",
                    height:"10px",
                    border:"none",
                    textAlign: "center",
                    background: "#ffffff",
                    outline: "none",
                }
            }),
            createElement("button", {
                domProps: {
                    innerHTML: "-",
                },
                attrs:{
                    type:"button"
                },
                on:{
                    mousedown:function(e){
                        e.preventDefault();
                        e.target.previousElementSibling.focus();
                        var input = e.target.previousElementSibling;
                        if (input.name === "tb" || input.name === "lr" || input.name === "ts" || input.name === "m" || input.name === "ml" || input.name === "mr" || input.name === "mb" || input.name === "mt") {
                            data.value--
                        }else{
                            if(data.value<=0){
                                data.value=0
                            }else{
                                data.value--
                            }
                        }
                    }
                },
                style:{
                    height:"15px",
                    border:"none",
                    background: "#ffffff",
                    outline: "none",
                }
            })
        ]);
    },
    props:["data"],
});

//右侧布局
Vue.component("atr",{
    render: function (createElement) {
        var data = this.data;
        if (data) {
            switch (data.t) {
                case "ll":
                    return createElement("div", {}, [
                        createElement("span", {
                            domProps: {
                                innerHTML: "atr:"
                            }
                        }),
                        createElement("select", {
                            on: {
                                change: function (e) {
                                    classAndData.pageLayout.atr = e.target.value;
                                }
                            }
                        }, [
                            createElement("option", {
                                attrs: {
                                    value: "horizontal"
                                },
                                domProps: {
                                    innerHTML: "垂直线性"
                                }
                            }),
                            createElement("option", {
                                attrs: {
                                    value: "vertical"
                                },
                                domProps: {
                                    innerHTML: "水平线性"
                                }
                            })
                        ])
                    ]);
                    break;
                case "gl":
                    return createElement("div", {}, [
                        createElement("span", {
                            domProps: {
                                innerHTML: "列:"
                            }
                        }),
                        createElement("input", {
                            attrs: {
                                value: data.atr.col
                            },
                            style: {
                                width: "80%"
                            },
                            on: {
                                blur: function (e) {
                                    classAndData.pageLayout.atr.col = parseFloat(e.target.value);
                                    comAndLayout.layoutDefault = false
                                },
                                keydown: function (e) {
                                    if (e.keyCode === 13) {
                                        e.preventDefault();
                                        classAndData.pageLayout.atr.col = parseFloat(e.target.value);
                                        comAndLayout.layoutDefault = false
                                    }
                                }
                            }
                        }),
                        createElement("span", {
                            domProps: {
                                innerHTML: "行:"
                            }
                        }),
                        createElement("input", {
                            attrs: {
                                value: data.atr.row
                            },
                            style: {
                                width: "80%"
                            },
                            on: {
                                blur: function (e) {
                                    classAndData.pageLayout.atr.row = parseFloat(e.target.value);
                                    comAndLayout.layoutDefault = false
                                },
                                keydown: function (e) {
                                    if (e.keyCode === 13) {
                                        e.preventDefault();
                                        classAndData.pageLayout.atr.row = parseFloat(e.target.value);
                                        comAndLayout.layoutDefault = false
                                    }
                                }
                            }
                        })
                    ]);
                    break;
                case "cl":
                    return createElement("textarea", {
                        style: {
                            width: "90%"
                        },
                        domProps: {
                            innerHTML: "colFlex:[]"
                        }
                    });
                    break;
                case "opl":
                    return createElement("textarea", {
                        style: {
                            width: "90%"
                        },
                        domProps: {
                            innerHTML: "colFlex:[]"
                        }
                    });
                    break;
            }
        }
    },
    props: ["data"]
});

//右侧数据模块中的事件模块
// Vue.component("inter",{
//     render:function(createElement){
//         var _data;
//         var vm=this;
//         if(this.data!==undefined){
//             _data=this.data;
//             console.log(_data);
//         }
//         var textarea=createElement("textarea",{
//             on:{
//                 blur:function(e){
//                     console.log(e.target.value);
//                 }
//             }
//         });
//         return textarea;
//
//     },
//     props:["data"]
// })
Vue.component("txtarea", {
    render: function (createElement) {
        var data = this.data;
        // var showData = data;
        var vm = this;
        console.log(data);
        return createElement("textarea", {
            domProps: {
                innerHTML: JSON.stringify(data, null, 4)
            },
            attrs: {
                rows: 20,
                cols: 40,
                // value: showData
            },
            on: {
                input: function (e) {
                    var new_value = e.target.value;
                    // vm.data = JSON.parse(new_value);
                    Vue.set(vm.data, "n", JSON.parse(new_value).n);
                    Vue.set(vm.data, "v", JSON.parse(new_value).v);
                    Vue.set(vm.data, "es", JSON.parse(new_value).es);
                    classAndData.b_data.comValue = vm.data;
                }
            }
        })
    },
    props: ["data"],
});


/**
 * 数据树 组件
 */
Vue.component('datatree', {
    render: function (createELement) {
        if (this.data === null) {
            return createELement('div');
        } else {
            // console.log(dataTreeData)
            var arr = [];
            // 页面数据层 仅一个且需要 id type 字段
            arr.push(createELement('span', {
                domProps: {
                    // innerText: '页面'
                    innerText: this.data.id
                },
                on: {
                    contextmenu: function ($event) {
                        classAndData.dataTreeData.rightFrameData.top = $event.offsetY - 10;
                        classAndData.dataTreeData.rightFrameData.left = $event.offsetX - 10;
                        rightClickFramePage($event, classAndData.dataTreeData.data.ds)
                    }
                }
            }));
            // arr = arr.concat(dataTreeView(this.data.ds, createELement))
            // 添加 段 组件
            if (!this.data.ds.hasOwnProperty('values')) {
                this.data.ds.values = []
            }
            this.data.ds.values.forEach(function (item, index) {
                if (!item.values) {
                    item.values = [];
                }
                var chrArr = item.values.map(function (item2, index2) {
                    return createELement('p', {
                        domProps: {
                            innerText: item2.k + '组件(n:' + item2.n + ', v:' + item2.v + ')'
                        }
                    })
                });
                arr.push(createELement('div', {
                    attrs: {
                        class: 'datatree'
                    }
                }, [
                    createELement('p', {
                        domProps: {
                            innerText: '段(0,' + index + ')' + item.name
                        },
                        on: {
                            contextmenu: function ($event) {
                                classAndData.dataTreeData.rightFrameData.top = $event.offsetY - 10
                                classAndData.dataTreeData.rightFrameData.left = $event.offsetX - 10
                                rightClickFrameSection($event, item)
                            }
                        }
                    }),
                    createELement('div', {
                        attrs: {
                            class: 'datatree'
                        }
                    }, chrArr)
                ]))
            }, this)
            // 返回按钮
            arr.push(createELement('button', {
                domProps: {
                    innerHTML: '返回'
                },
                on: {
                    click: function () {
                        // 修改
                        console.log('返回')
                        classAndData.baseDataShow = 0
                    }
                }
            }))

            // 右键弹出框
            arr.push(createELement('div', {
                class: {
                    'vshow': !this.rightFrameData.isShow,
                    'frame': true
                },
                attrs: {
                    style: 'position: absolute;top:' + this.rightFrameData.top + 'px;left:' + this.rightFrameData.left + 'px;'
                }
            }, [
                createELement('p', {
                    domProps: {innerText: '添加'}, on: {
                        click: function () {
                            rightClickControl('add')
                        }
                    }
                }),
                createELement('p', {
                    domProps: {innerText: '修改'}, on: {
                        click: function () {
                            rightClickControl('update')
                        }
                    }
                }),
                createELement('p', {
                    domProps: {innerText: '删除'}, on: {
                        click: function () {
                            rightClickControl('delete')
                        }
                    }
                }),
                createELement('p', {
                    domProps: {innerText: '排序'}, on: {
                        click: function () {
                            rightClickControl('sort')
                        }
                    }
                })
            ]))

            // --------------------------------------------------------------
            // 页面数据编辑框 textarea
            arr.push(createELement('div', {
                class: {
                    'vshow': !this.pageDataUpdate.isShow,
                    'dataEdit': true
                },
                attrs: {
                    style: 'position: absolute;top:' + this.rightFrameData.top + 'px;left:' + this.rightFrameData.left + 'px;'
                }
            }, [
                createELement('textarea', {
                    domProps: {
                        value: this.pageDataUpdate.str
                    },
                    on: {
                        input: function ($event) {
                            classAndData.dataTreeData.pageDataUpdate.str = $event.target.value
                        }
                    }
                }),
                createELement('button', {
                    domProps: {
                        innerHTML: '确认'
                    },
                    on: {
                        click: function () {
                            var flag = savePageData()
                            if (flag) {
                                // 保存成功 隐藏 页面数据编辑框
                                classAndData.dataTreeData.pageDataUpdate.isShow = false
                            } else {
                                // 保存失败
                                alert('数据树 页面数据 保存失败')
                            }
                        }
                    }
                })
            ]))

            // --------------------------------------------------------------
            // 段数据编辑框 testarea
            arr.push(createELement('div', {
                class: {
                    'vshow': !this.sectionDataUpdata.isShow,
                    'dataEdit': true
                },
                attrs: {
                    style: 'position: absolute;top:' + this.rightFrameData.top + 'px;left:' + this.rightFrameData.left + 'px;'
                }
            }, [
                createELement('textarea', {
                    domProps: {
                        value: this.sectionDataUpdata.str
                    },
                    on: {
                        input: function ($event) {
                            classAndData.dataTreeData.sectionDataUpdata.str = $event.target.value
                        }
                    }
                }),
                createELement('button', {
                    domProps: {
                        innerHTML: '确定'
                    },
                    on: {
                        click: function () {
                            var flag = saveSectionData();
                            if (flag) {
                                classAndData.dataTreeData.sectionDataUpdata.isShow = false
                            } else {
                                // 保存失败
                                console.log('数据树 段数据 保存失败')
                            }
                        }
                    }
                })
            ]));

            // ------------------------------------------------------------------
            // 段列表 编辑添加框 显示段列表 每个段 删除 上移 下移 底部带 新增 保存 按钮
            var sectionList = []
            // 循环添加 子项
            this.sectionListUpdate.arr.forEach(function (item, index) {
                sectionList.push(createELement('div', {
                    attrs: {
                        style: 'display: flex; justify-content: space-around;'
                    }
                }, [
                    createELement('span', {
                        domProps: {
                            innerText: '段(0,' + index + ')'
                        }
                    }),
                    createELement('span', {
                        domProps: {
                            // 上移
                            innerHTML: '上',
                            index: index
                        },
                        on: {
                            click: function ($event) {
                                swapUp(classAndData.dataTreeData.data.ds.values, $event.target.index)
                            }
                        }
                    }),
                    createELement('span', {
                        domProps: {
                            // 下移
                            innerHTML: '下',
                            index: index
                        },
                        on: {
                            click: function ($event) {
                                swapDown(classAndData.dataTreeData.sectionListUpdate.arr, $event.target.index)
                            }
                        }
                    }),
                    createELement('span', {
                        domProps: {
                            innerHTML: '删'
                        },
                        on: {
                            click: function ($event) {
                                //
                            }
                        }
                    })
                ]))
            })
            sectionList.push(createELement('div'), {
                attrs: {
                    style: 'display: flex; justify-content: space-around;'
                }
            }, [
                // 添加段按钮
                createELement('button', {
                    domProps: {
                        innerHTML: '添加段'
                    },
                    on: {
                        click: function() {
                            classAndData.dataTreeData.data.ds.values.push({
                                name: '',
                                values: []
                            })
                        }
                    }
                }),
                // 确定按钮
                createELement('button', {
                    domProps: {
                        innerHTML: '确定'
                    },
                    on: {
                        click: function () {
                            classAndData.dataTreeData.sectionListUpdate.isShow = false
                        }
                    }
                })
            ])
            arr.push(createELement('div', {
                class: {
                    'vshow': !this.sectionListUpdate.isShow,
                    'list': true
                },
                attrs: {
                    style: 'position: absolute;top:' + this.rightFrameData.top + 'px;left:' + this.rightFrameData.left + 'px;'
                }
            }, sectionList))

            // ----------------------------------------------------
            // 组件列表 编辑弹出框 样式同上
            var compList = []
            this.compListUpdate.arr.forEach(function (item, index) {
                compList.push(createELement('div', {
                    attrs: {
                        style: 'display: flex; justify-content: space-around;'
                    }
                }, [
                    createELement('span', {
                        domProps: {
                            innerText: item.k + '组件' + 'n:(' + item.n + ')'
                        }
                    }),
                    createELement('span', {
                        domProps: {
                            // 上移
                            innerHTML: '上'
                        },
                        on: {
                            click: function ($event) {
                                swapUp(classAndData.dataTreeData.compListUpdate.arr, index)
                            }
                        }
                    }),
                    createELement('span', {
                        domProps: {
                            // 下移
                            innerHTML: '下'
                        },
                        on: {
                            click: function ($event) {
                                swapDown(classAndData.dataTreeData.compListUpdate.arr, index)
                            }
                        }
                    }),
                    createELement('span', {
                        domProps: {
                            innerHTML: '删'
                        },
                        on: {
                            click: function ($event) {
                                //
                            }
                        }
                    })
                ]))
            })
            compList.push(createELement('div'), {
                attrs: {
                    style: 'display: flex; justify-content: space-around;'
                }
            }, [
                // 添加组件按钮
                createELement('button', {
                    domProps: {
                        innerHTML: '添加组件'
                    },
                    on: {
                        click: function ($event) {
                            // 显示添加组件的框 同时隐藏组件列表框
                            classAndData.dataTreeData.addCompData.isShow = true
                            classAndData.dataTreeData.compListUpdate.isShow = false
                        }
                    }
                }),
                // 确定按钮 用于关闭 组件列表
                createELement('button', {
                    domProps: {
                        innerHTML: '确定'
                    },
                    on: {
                        click: function ($event) {
                            classAndData.dataTreeData.compListUpdate.isShow = false
                        }
                    }
                })
            ])
            arr.push(createELement('div', {
                class: {
                    'vshow': !this.compListUpdate.isShow,
                    'list': true
                },
                attrs: {
                    style: 'position: absolute;top:' + this.rightFrameData.top + 'px;left:' + this.rightFrameData.left + 'px;'
                }
            }, compList))

            // --------------------------------------------------------
            // 添加段 并不一定需要弹框

            // --------------------------------------------------------
            // 添加组件
            var addCompList = []
            classAndData.dataTreeData.addCompData.addCompMarryList.forEach(function (item) {
                addCompList.push(createELement('p', {
                    domProps: {
                        innerText: item.n,
                        comName: item.k
                    },
                    on: {
                        click: function ($event) {
                            // 添加组件 k 为 $event.target.comName
                            console.log('添加组件', $event.target.comName)
                            // 隐藏 添加组件列表框
                            classAndData.dataTreeData.addCompData.isShow = false
                        }
                    }
                }))
            })
            arr.push(createELement('div', {
                class: {
                    'vshow': !this.addCompData.isShow,
                    'addcomp': true
                },
                attrs: {
                    style: 'position: absolute;top:' + this.rightFrameData.top + 'px;left:' + this.rightFrameData.left + 'px;'
                }
            }, [
                createELement('input', {
                    domProps: {
                        // value: this.addCompData.searchStr
                    },
                    on: {
                        input: function ($event) {
                            var temp = $event.target.value
                            if (temp === " " ) {
                                return ;
                            }
                            console.log(classAndData.dataTreeData.addCompData)
                            if (classAndData.dataTreeData.data !== null) {
                                if (temp === '') {
                                    classAndData.dataTreeData.addCompData.addCompMarryList = classAndData.dataTreeData.addCompData.allCompList
                                } else {
                                    classAndData.dataTreeData.addCompData.addCompMarryList = classAndData.dataTreeData.addCompData.allCompList.filter(function (item) {
                                        return item.n.includes(temp)
                                    })
                                }
                            } else {
                                return []
                            }
                        }
                    }
                }),
                createELement('div', {}, addCompList)
            ]))

            // vNode 构建完毕
            return createELement('div', {
                class: {
                    // 'datatreediv': false
                },
                attrs: {
                    style: 'position: relative;'
                }
            }, arr)
        }
    },
    data: function () {
        return classAndData.dataTreeData
    },
    beforeCreate: function () {
        // 获取所有组件数据 同步的
        var IP = location.hostname, port = location.port;
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": `http://${IP}:${port}/selectAllCmptObjDrawingValue.action`,
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "2c920480-915a-e6f4-254a-1f7aa9a89a93"
            }
        }

        $.ajax(settings).done(function (response) {
            // 此处使用 ES6 的语法
            classAndData.dataTreeData.addCompData.allCompList = Array.from(JSON.parse(response))
        });
    },
    beforeUpdate: function () {
        // datatree 组件的数据改变后 重新渲染前 校验传入数据
        if (!this.data.ds.hasOwnProperty('values')) {
            Vue.set(this.data.ds, 'values', [])
        }
    },
    computed: {
        // 在 添加组件框 根据 input 的值筛选并显示 组件列表
        // addCompMarryList: function() {
        //     if (this.data !== null) {
        //         if (this.addCompData.searchStr === '') {
        //             return this.addCompData.allCompList
        //         } else {
        //             var temp = this.addCompData.searchStr
        //             return this.addCompData.allCompList.filter(function (item) {
        //                 return item.n.includes(temp)
        //             })
        //         }
        //     } else {
        //         return []
        //     }
        // }
    }
});

Vue.component('clslist',{
    render:function (createElement) {
        var data = this.data;
        return showClsTreeView(createElement,data)
    },
    props:["data"]
});