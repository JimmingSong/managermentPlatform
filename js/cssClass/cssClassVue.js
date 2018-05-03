/* eslint-disable no-undef */
let classModelVM = new Vue({
    el: "#data-class",
    data: classAndData,
    mounted: function () {
        var handleModel = document.getElementById("data-class");
        var leftDiv = document.getElementById("data-right");
        var scrollPos;
        if (window.pageYOffset) {
            scrollPos = window.pageYOffset;
        } else if (document.compatMode && document.compatMode !== 'BackCompat') {
            scrollPos = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollPos = document.body.scrollTop;
        }
        handleModel.onmousemove = function (e) {
            if (window.pageYOffset) {
                scrollPos = window.pageYOffset;
            } else if (document.compatMode && document.compatMode !== 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollPos = document.body.scrollTop;
            }
            let bodyH = e.clientY + scrollPos;
            let handleHeight = handleModel.clientHeight + scrollPos;
            if (scrollPos <= 0) {
                handleHeight += 80
            }
            if (bodyH < handleHeight && bodyH >= handleHeight - 10) {
                this.style.cursor = "s-resize";
            } else {
                this.style.cursor = "default"
            }
        };
        handleModel.onmousedown = (event) => {
            event.stopPropagation();
            if (handleModel.style.cursor === "s-resize") {
                leftDiv.onmousemove = (ev) => {
                    ev.preventDefault();
                    handleModel.style.height = ev.clientY + "px"
                };
                leftDiv.onmouseup = ()=> {
                    leftDiv.onmousemove = null;
                };
                //leftDiv.onmouseout = ()=>{
                //    leftDiv.onmousemove = null
                //}
            }
        }
    },
    methods: {

        //-----------------------------------------------------------------
        //约束规则
        rulerState: function (e) {
            classAndData.con_rul.addOrUpdate = false;
            classAndData.con_rul.isModify = !classAndData.con_rul.isModify;
            e.target.innerHTML = "&#xe617;";
            var lis = document.querySelectorAll('.ruler');
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = "ruler";
            }
            if (classAndData.con_rul.isModify) {

            } else {
                e.target.innerHTML = "&#xe66a;";
                classAndData.con_rul.isShowModifyPop = false;
            }
        },
        selConType: function (e, index) {
            var tar = e.target;
            if (tar.nodeName === "SPAN") {
                tar = tar.parentNode;
            }
            $(tar).addClass("ruler-show");
            $(tar).siblings().removeClass("ruler-show");
            if (classAndData.con_rul.isModify) {
                classAndData.con_rul.conName = index;
                classAndData.con_rul.oldConName = index;
                classAndData.con_rul.fnName = classAndData.con_rul.con_obj[index].fn;
                classAndData.con_rul.modifyState = classAndData.con_rul.con_obj[index].st;
                classAndData.con_rul.isShowModifyPop = true;
            } else {
                classAndData.con_rul.componentData.d.c = index;
            }
        },
        addCon: function () {
            classAndData.con_rul.isShowModifyPop = true;
            classAndData.con_rul.addOrUpdate = true;
            classAndData.con_rul.conName = "";
            classAndData.con_rul.fnName = "";
            classAndData.con_rul.modifyState = ""
        },
        cancelCon: function () {
            classAndData.con_rul.isShowModifyPop = false;
            classAndData.con_rul.conName = "";
            classAndData.con_rul.fnName = "";
            classAndData.con_rul.modifyState = ""
        },
        deleteCon: function (index) {
            // delete  classAndData.con_rul.con_obj[index];
            Vue.delete(classAndData.con_rul.con_obj, index);
            if (classAndData.con_rul.con_obj.values && classAndData.con_rul.con_obj.values.length > 0) {
                classAndData.con_rul.con_obj.values.map(function (item, index) {
                    Vue.delete(item, "c");
                })
            }
        },
        sureCon: function () {
            if (classAndData.con_rul.addOrUpdate) {
                Vue.set(classAndData.con_rul.con_obj, classAndData.con_rul.conName, {
                    "fn": classAndData.con_rul.fnName,
                    "st": classAndData.con_rul.modifyState
                });
                Vue.set(classAndData.con_rul.componentData, "c", classAndData.con_rul.conName);
            } else {
                Vue.set(classAndData.con_rul.con_obj, classAndData.con_rul.conName, {
                    "fn": classAndData.con_rul.fnName,
                    "values": [],
                    "st": classAndData.con_rul.modifyState
                });
                if (classAndData.con_rul.isChange && classAndData.con_rul.con_obj.values && classAndData.con_rul.con_obj.values.length > 0) {
                    classAndData.con_rul.con_obj.values.map(function (item) {
                        Vue.set(item, "c", classAndData.con_rul.conName)
                    });
                    Vue.set(classAndData.con_rul.con_obj[classAndData.con_rul.conName], "values", classAndData.con_rul.con_obj.values)
                }
                Vue.delete(classAndData.con_rul.con_obj, classAndData.con_rul.oldConName)
            }
            classAndData.con_rul.addOrUpdate = false;
            console.log(classAndData.con_rul.con_obj)
        },
        changeCon: function () {
            classAndData.con_rul.isChange = true;
        },
        //---------------------------------------------------------------------------------------------------
        // 数据树>>> 按钮  隐藏 基础数据&事件 显示 数据树
        initDataTree: function() {
            classAndData.baseDataShow = 2
        },
        //数据区域应用按钮
        keyDownApplyData: function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.applyData()
            }
        },
        applyData: function (e) {
            if (isJson(classAndData.b_data.comValue1)) {
                for (var i in classAndData.b_data.comValue) {
                    Vue.set(classAndData.b_data.comValue, i, JSON.parse(classAndData.b_data.comValue1)[i]);
                }
            } else {
                $.layer.alert("请输入正确的JSON格式数据")
            }
        },
        // 初始化事件管理面板
        initEventManage: function() {
            // console.log('数据初始化', phoneShow.play_data);
            if(phoneShow.play_data){
                if (phoneShow.play_data.hasOwnProperty('d')){
                    if (!phoneShow.play_data.d.hasOwnProperty('es')) {
                        Vue.set(this.event, 'eventData', phoneShow.play_data.d.es)
                    } else {
                        Vue.set(phoneShow.play_data.d, 'es', []);
                        Vue.set(this.event, 'eventData', phoneShow.play_data.d.es)
                    }
                } else{
                    if (!phoneShow.play_data.hasOwnProperty('es')) {
                        Vue.set(phoneShow.play_data, 'es', [])
                    }
                    Vue.set(this.event, "eventData", phoneShow.play_data.es)
                }
            }
            // 由于 es 的 v 可能为字符串 需要转换成字符串数组
            this.event.eventData.forEach(function(item) {
                if(!Array.isArray(item.v)) {
                    if (typeof item.v === "string") {
                        Vue.set(item, "v", [item.v])
                    } else {
                        console.log('当前es的v既不是Array也不是String')
                    }
                }
            });
            this.event.kIndex = null;
            this.event.vIndex = null;
            this.partEventFn()
        },
        // 处理 在事件处理函数列表中显示函数内容
        partEventFn: function(){
            if (this.event.kIndex !== null){
                this.event.partEventList =  this.event.eventData[this.event.kIndex].v
            } else {
                this.event.partEventList = []
            }
        },
        // 控制是否显示 添加事件类型select
        addTypeBtn: function () {
            this.event.modeIsShow = !this.event.modeIsShow;
        },
        // 确认添加 某事件类型button
        confirmAddType: function () {
            var newE = this.event.newEvent;
            var flag = this.event.eventData.every(function(item) {
                return item.k != newE
            });
            if (flag) {
                var e_obj = {};
                e_obj.k = this.event.newEvent;
                e_obj.v = [];
                // this.event.eventData.unshift(e_obj);
                Vue.set(this.event.eventData, this.event.eventData.length + '', e_obj)
            }
            this.event.modeIsShow = false
        },
        // 删除某个事件类型
        deleteEventType: function(index) {
            if (this.event.kIndex >= index) {
                this.event.kIndex--
            }
            this.event.eventData.splice(index, 1);
            if (this.event.eventData.length ===0) {
                this.event.kIndex = null
            }
            this.partEventFn()
        },
        // 显示 某类型事件 对应的 处理函数列表
        showEventList: function (e, index) {
            // 选中行背景高亮显示
            var tar = e.target;
            if (tar.nodeName === "SPAN") {
                tar = tar.parentNode;
            }
            $(tar).addClass("ruler-show2");
            $(tar).siblings().removeClass("ruler-show2");
            this.event.kIndex = index;
            this.event.triggerDatas = this.event.eventData[index].v;
            this.partEventFn();
            this.event.eventIsShow = true;
            this.event.showTextarea = false;
            this.event.kDom = e.target
        },
        // 删除某个事件处理函数
        deleteEventFn: function(index) {
            if (this.event.vIndex >= index) {
                this.event.vIndex--
            }
            this.event.eventData[this.event.kIndex].v.splice(index, 1);
            if (this.event.eventData[this.event.kIndex].v.length === 0) {
                this.event.vIndex = null
            }
        },
        // 添加 事件处理函数 显示textarea
        addEventFn: function() {
            if (this.event.kIndex !== null){
                var temp = this.event.eventData;
                temp[this.event.kIndex].v.push("");
                this.event.vIndex = temp[this.event.kIndex].v.length-1;
                this.event.eventD = temp[this.event.kIndex].v[temp[this.event.kIndex].v.length - 1];
                this.event.showTextarea = true
            }
        },
        // 显示事件处理函数的全部内容
        triggerEvent: function (e, index) {
            // 选中行背景高亮显示
            var tar = e.target;
            if (tar.nodeName === "SPAN") {
                tar = tar.parentNode;
            }
            $(tar).addClass("ruler-show2");
            $(tar).siblings().removeClass("ruler-show2");
            var vm = this;
            vm.event.vIndex = index;
            vm.event.eventD = vm.event.eventData[vm.event.kIndex].v[vm.event.vIndex];
            vm.event.showTextarea = true
        },
        // textarea 实时同步 textarea 的值到 eventData
        eventContent: function(e) {
            this.event.eventData[this.event.kIndex].v[this.event.vIndex] = e.target.value;
            this.event.eventD = e.target.value
        },
        // 手动刷新函数列表 绑定到 button 上
        confirmBtn: function() {
            this.event.eventD = "";
            this.event.showTextarea = false;
            this.partEventFn()
        },
        //------------------------------------------------------------------------
        //基础数据添加段按钮事件
        addCurClick: function (e) {
            var par = {};
            //par.values = [];
            Vue.set(par, 'values', []);
            Vue.set(phoneShow.ds.values, phoneShow.ds.values.length - 1, par);
            console.log(phoneShow.ds);
        },
        //基础数据组件数据按钮事件
        addComClick:function(e){
            this.cls.addComIsShow=!this.cls.addComIsShow;
            this.b_data.comNum = phoneShow.ds.values.length;
        },
        //基础数据组件数据确认按钮事件
        addCom:function(e){
            this.con_class=this.b_data.comValue;
            this.cls.addComIsShow=!this.cls.addComIsShow;
            console.log(this.b_data.comValue)
        },
        //选项卡
        classClick:function (e) {
            clearClass("model-t1");
            e.target.className = "model-t1 model-show";
            //展示操作区
            this.rtShow = 0;
            //展示操作区属性区展现
            this.playShow = 0;
        },
        /**
         * 导航栏 数据按钮点击事件
         * @param e
         */
        dataClick:function (e) {
            clearClass("model-t1");
            e.target.className = "model-t1 model-show";
            //展示操作区
            this.rtShow = 0;
            //展示操作区数据区展现
            this.playShow = 1;
        },
        /**
         * 导航栏 布局按钮点击事件
         * @param e
         */
        handleClick: function (e) {
            clearClass("model-t1");
            e.target.className = "model-t1 model-show";
            //展示操作区
            this.rtShow = 0;
            //展示操作区布局区展现
            this.playShow = 3;
        },
        //-------------------交互事件操作区-------------------------------
        /**
         * 导航栏 交互按钮点击事件
         * @param e
         */
        interactiveClick: function (e) {
            clearClass("model-t1");
            e.target.className = "model-t1 model-show";
            //展示操作区
            this.rtShow = 0;
            //展示操作区交互区展现
            this.playShow = 2;
        },
        /**
         * 触发事件后面的 + 按钮事件  展示触发方式
         */
        selectInter:function () {
            classAndData.eventObj.selEventShow = !classAndData.eventObj.selEventShow;
            classAndData.eventObj.eventMethod = ""
        },
        /**
         * 添加渲染对象 按钮点击事件
         */
        addRenderObj: function () {
            // 进入添加渲染对象 状态
            classAndData.eventObj.isSelRender = true;
            //改变鼠标在模拟展示区的 样式
            document.getElementById("show-screen").children[1].style.cursor = '-webkit-grabbing'
        },
        /**
         * 取消 添加渲染对象 状态
         */
        canceladdRenderObj(){
            classAndData.eventObj.isSelRender = false;
            document.getElementById("show-screen").children[1].style.cursor = 'default'
        },
        //点击渲染对象id查看渲染对象详情
        renderDetails: function (item) {
            classAndData.interactiveData.attrs = {};
            var itemTp = item.split("(")[0];
            let ren;
            if (itemTp === "容器") {
                var itemIndex = item.split("(")[1].split(")")[0];
                classAndData.eventObj.cur_sel = itemIndex;
                //根据容器index 获取容器信息
                classAndData.eventObj.containerObj[itemIndex] = classAndData.eventObj.containerObj[itemIndex] ? classAndData.eventObj.containerObj[itemIndex] : getContainerData1(itemIndex);
                if (classAndData.eventObj.containerObj[itemIndex].sty) {

                    if (classAndData.interactiveDatas.sty) {
                        ren = classAndData.interactiveDatas.sty
                    } else {
                        ren = classAndData.interactiveDatas
                    }
                    var curEventObj = ren.es[classAndData.eventObj.curWay];
                    for(var i = 0;i<curEventObj.length;i++){
                        if(curEventObj[i].tg === itemIndex && curEventObj[i].bh){
                            classAndData.interactiveData.attrs = JSON.stringify(curEventObj[i].bh.p);
                        }
                        if (curEventObj[i].bh && curEventObj[i].bh.s && curEventObj[i].bh.s.length > 0) {
                            classAndData.eventObj.unitNum = curEventObj[i].bh.s.length
                        }
                        if (curEventObj[i].bh && curEventObj[i].bh.v) {
                            classAndData.interactiveData.popEvent = curEventObj[i].bh.v
                        }
                    }
                }
            } else {
                classAndData.eventObj.cur_sel = item;
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                if (ren.es && JSON.stringify(ren.es) !== "{}") {
                    var eventType = ren.es[classAndData.eventObj.curWay];
                  eventType.forEach(function (it) {
                      if (it.tg === item && it.bh && it.bh.p) {
                          classAndData.interactiveData.attrs = JSON.stringify(it.bh.p);
                      }
                      if (it.bh && it.bh.s && it.bh.s.length > 0) {
                          classAndData.eventObj.unitNum = it.bh.s.length
                      }
                  })
                }else{
                    var oneRen = phoneShow.rs[item];
                    if (oneRen.atr || oneRen.sty) {
                        classAndData.interactiveData.attrs = oneRen.atr;
                    }
                }
            }
            classAndData.eventObj.isShow = true;
        },
        //事件选择下拉框事件,添加事件列表
        selEventMethod:function () {
            if(classAndData.eventObj.eventMethod && classAndData.eventObj.eventWay.indexOf(classAndData.eventObj.eventMethod) === -1){
                classAndData.eventObj.eventWay.push(classAndData.eventObj.eventMethod);
                classAndData.eventObj.curWay = classAndData.eventObj.eventMethod;
            }
        },
        deleteEventList:function (e,item,index) {
            e.stopPropagation();
            let ren;
            if (classAndData.interactiveDatas.sty) {
                ren = classAndData.interactiveDatas.sty;
            } else {
                ren = classAndData.interactiveDatas;
            }
            classAndData.eventObj.eventWay.splice(index,1);
            if (ren.es && JSON.stringify(ren.es) !== "{}") {
                delete ren.es[item];
            }
        },
        //点击执行事件方式方法
        EventMethodDetail: function (item) {
            if (JSON.stringify(classAndData.interactiveDatas) !== "{}") {
                classAndData.eventObj.curWay = item;
                classAndData.eventObj.target.length = 0;
                let ren;
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas;
                }
                if (ren && ren.es && item in ren.es) {
                    var handleStyle = ren.es[item];
                    for (var n = 0; n < handleStyle.length; n++) {
                        var eventCon = handleStyle[n];
                        if(eventCon.tg.indexOf("d") > -1){
                            classAndData.eventObj.target.push(eventCon.tg);
                        }else{
                            classAndData.eventObj.target.push("容器("+eventCon.tg+")");
                        }
                    }
                } else {
                    classAndData.eventObj.target.length = 0;
                    classAndData.interactiveData.attrs = {};
                }
                classAndData.eventObj.destination = true;
                classAndData.eventObj.selEventShow = false;
            }
        },
        //删除渲染对象
        deleteRd: function (item, index) {
            var itemTp = item.split("(")[0],rb;
            let ren;
            if (classAndData.interactiveDatas.sty) {
                ren = classAndData.interactiveDatas.sty;
            } else {
                ren = classAndData.interactiveDatas;
            }
            if (itemTp === "容器") {
                var itemIndex = item.split("(")[1].split(")")[0];
                for (var i = 0; i < ren.es[classAndData.eventObj.curWay].length; i++) {
                    rb = ren.es[classAndData.eventObj.curWay][i];
                    if (rb.tg.toString() === itemIndex) {
                        ren.es[classAndData.eventObj.curWay].splice(i, 1);
                        classAndData.eventObj.target.splice(index, 1);
                    }
                }
            }else{
                for (var j = 0; j < ren.es[classAndData.eventObj.curWay].length; j++) {
                    rb = ren.es[classAndData.eventObj.curWay][j];
                    if (rb.tg === itemTp) {
                        ren.es[classAndData.eventObj.curWay].splice(j, 1);
                        classAndData.eventObj.target.splice(index, 1);
                    }
                }
            }

        },
        //替换按钮
        isSplice:function () {
            let ren;
            if (classAndData.interactiveDatas.sty) {
                ren = classAndData.interactiveDatas.sty;
            } else {
                ren = classAndData.interactiveDatas;
            }
            if(classAndData.eventObj.isSplice){
                if (classAndData.interactiveDatas.k) {
                    ren.es[classAndData.eventObj.curWay].map(function (item) {
                        if (!item.bh) {
                            Vue.set(item, "bh", {});
                        }
                        Vue.set(item.bh, "t","1");
                    });
                } else {
                    ren.es[classAndData.eventObj.curWay].map(function (item) {
                        if (!item.bh) {
                            Vue.set(item, "bh", {});
                            Vue.set(item.bh, "i", "1");
                        } else {
                            if (!item.bh.p) {
                                Vue.set(item, "bh", {});
                            }
                            Vue.set(item.bh.p,"t","1");
                        }
                    });
                }
            }else{
                if (classAndData.interactiveDatas.k) {
                    ren.es[classAndData.eventObj.curWay].map(function (item) {
                            Vue.delete(item.bh,"t");
                    });
                } else {
                    ren.es[classAndData.eventObj.curWay].map(function (item) {
                        Vue.delete(item.bh,"t")
                    });
                }
            }
        },
        //样式改变的 按钮
        changeCheckCss: function () {
            var clsObj = {};
            let ren;
            //判断是容器还是组件
            if (classAndData.eventObj.cur_sel.search(/[a-z]/i) === 1 || classAndData.eventObj.cur_sel.indexOf(",") !== -1) {
                //修改容器点击后的样式
                classAndData.eventObj.oldRenderObj = extendDeep(classAndData.eventObj.containerObj[classAndData.eventObj.cur_sel]);
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                if (ren.es[classAndData.eventObj.curWay]) {
                    ren.es[classAndData.eventObj.curWay].forEach(function (item) {
                        classAndData.eventObj.selRenderObj = extendDeep(classAndData.eventObj.containerObj[classAndData.eventObj.cur_sel]);
                        if (item.tg === classAndData.eventObj.cur_sel && item.bh && item.bh.s && item.bh.s[classAndData.eventObj.unitNum]) {
                            classAndData.eventObj.selRenderObj = extendDeep(item.bh.s[classAndData.eventObj.unitNum]);
                        }
                    })
                }
                //将现在的样式与事件交互后的样式进行融合展示
                classNameMixture(clsObj,classAndData.eventObj.oldRenderObj.sty,classAndData.eventObj.selRenderObj.sty?classAndData.eventObj.selRenderObj.sty:classAndData.eventObj.selRenderObj);
                Vue.set(classAndData.eventObj.containerObj[classAndData.eventObj.cur_sel],"sty",clsObj);
                // classAndData.eventObj.containerObj[classAndData.eventObj.cur_sel].sty = classAndData.eventObj.selRenderObj;
                classAndData.clsobj.obj = classAndData.eventObj.containerObj[classAndData.eventObj.cur_sel].sty;
            } else {
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                //设置组件修改后的样式
                classAndData.eventObj.oldRenderObj = phoneShow.rs[classAndData.eventObj.cur_sel];
                if (ren.es[classAndData.eventObj.curWay]) {
                    ren.es[classAndData.eventObj.curWay].forEach(function (item) {
                        classAndData.eventObj.selRenderObj = extendDeep(phoneShow.rs[classAndData.eventObj.cur_sel]);
                        if (item.tg === classAndData.eventObj.cur_sel && item.bh && item.bh.s && item.bh.s[classAndData.eventObj.unitNum]) {
                            classAndData.eventObj.selRenderObj.sty = extendDeep(item.bh.s[classAndData.eventObj.unitNum]);
                        }
                    })
                }
                treeData.cssTree.vNodeTree = phoneShow.rs[classAndData.eventObj.cur_sel].__ob__.dep.subs[1].vm._vnode;
                classAndData.clsobj.tag = phoneShow.rs[classAndData.eventObj.cur_sel].__ob__.dep.subs[1].vm._vnode.tag;
                setCurElementStyle(phoneShow.rs[classAndData.eventObj.cur_sel].__ob__.dep.subs[1].vm._vnode.elm);
                classNameMixture(clsObj,classAndData.eventObj.oldRenderObj.sty,classAndData.eventObj.selRenderObj.sty);
                phoneShow.rs[classAndData.eventObj.cur_sel] = classAndData.eventObj.selRenderObj;
                Vue.set(phoneShow.rs[classAndData.eventObj.cur_sel], "sty", clsObj);
                parseRenderObj(classAndData.eventObj.selRenderObj.sty);
                classAndData.clsobj.obj = classAndData.eventObj.selRenderObj.sty;
                console.log(phoneShow.rs[classAndData.eventObj.cur_sel]);
                treeData.cssTree.renderObj = classAndData.eventObj.selRenderObj;
                treeData.treeShow = 1;
                classAndData.event.setTagCssControl = false;
            }
            classAndData.playShow = 0;
            classAndData.eventObj.addCls = true;
        },
        //属性修改textarea失去焦点事件
        blurFun: function () {
            if (!classAndData.interactiveData.attrs || JSON.stringify(classAndData.interactiveData.attrs) === "{}") {
                return;
            }
            let ren;
            if (classAndData.interactiveDatas.k) {
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                ren.es[classAndData.eventObj.curWay].map(function (item) {
                    if (item.tg === classAndData.eventObj.cur_sel) {
                        if (!item.bh) {
                            Vue.set(item, "bh", {});
                            Vue.set(item.bh, "p", JSON.parse(classAndData.interactiveData.attrs));
                            // item.bh.p = JSON.parse(classAndData.interactiveData.attrs)
                        } else {
                            var showObj = JSON.parse(classAndData.interactiveData.attrs);
                            if (!item.bh.p) {
                                Vue.set(item, "bh", {});
                            }
                            for (var i in showObj) {
                                if (!item.bh.p) {
                                    item.bh.p = {}
                                }
                                item.bh.p[i] = showObj[i];
                            }
                        }
                    }
                });
            } else {
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                ren.es[classAndData.eventObj.curWay].map(function (item) {
                    if (item.tg === classAndData.eventObj.cur_sel) {
                        if (!item.bh) {
                            Vue.set(item, "bh", {});
                            Vue.set(item.bh, "p", JSON.parse(classAndData.interactiveData.attrs));
                            // item.bh.p = JSON.parse(classAndData.interactiveData.attrs)
                        } else {
                            var showObj = JSON.parse(classAndData.interactiveData.attrs);
                            if (!item.bh.p) {
                                Vue.set(item.bh, "p", {});
                            }
                            for (var i in showObj) {
                                item.bh.p[i] = showObj[i];
                            }
                        }
                    }
                });
            }
            console.log(phoneShow);
        },
        //确定按钮
        sureBtn: function () {
            classAndData.eventObj.addCls = false;
            var newSty;
            let ren;
            if (classAndData.eventObj.selRenderObj.k) {
                phoneShow.rs[classAndData.eventObj.cur_sel] = classAndData.eventObj.oldRenderObj;
                delete classAndData.eventObj.selRenderObj.sty.es;
                newSty = classAndData.eventObj.selRenderObj.sty;
                deleteHadData(newSty, phoneShow.rs[classAndData.eventObj.cur_sel].sty);
                //给当前点击的渲染ID 添加交互数据
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                ren.es[classAndData.eventObj.curWay].map(function (item) {
                    if (item.tg === classAndData.eventObj.cur_sel) {
                        if (!item.bh) {
                            item.bh = {};
                            item.bh.s = [];
                        } else {
                            if (!item.bh.s) item.bh.s = []
                        }
                        if (classAndData.eventObj.unitNum > item.bh.s.length) {
                            item.bh.s.push(newSty);
                        } else {
                            item.bh.s.splice(classAndData.eventObj.unitNum, 1, newSty)
                        }
                    }
                });
                classAndData.event.setTagCssControl = true;
                //Vue.set(phoneShow.rs[classAndData.eventObj.cur_sel],"sty",classAndData.interactiveDatas.sty)
            } else {
                // Vue.set(classAndData.eventObj.containerObj[classAndData.eventObj.cur_sel],"sty",classAndData.eventObj.oldRenderObj.sty);
                classAndData.eventObj.selRenderObj = getContainerData1(classAndData.eventObj.cur_sel);
                newSty = classAndData.eventObj.selRenderObj.sty;
                deleteHadData(newSty, classAndData.eventObj.oldRenderObj.sty);
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                ren.es[classAndData.eventObj.curWay].map(function (item) {
                    if (item.tg === classAndData.eventObj.cur_sel) {
                        if (!item.bh) {
                            item.bh = {};
                            item.bh.s = [];
                        } else {
                            if (!item.bh.s) item.bh.s = []
                        }
                        //item.bh.sty = newSty;
                        //item.bh.s.push(newSty);
                        if (classAndData.eventObj.unitNum > item.bh.s.length) {
                            item.bh.s.push(newSty);
                        } else {
                            item.bh.s.splice(classAndData.eventObj.unitNum, 1, newSty)
                        }
                    }
                });
                classAndData.eventObj.selRenderObj.sty = classAndData.eventObj.oldRenderObj.sty;
            }
            //确认传入的是对象还是字符串
            // if (phoneShow.play_data && phoneShow.play_data.r) {
            //     classAndData.clsobj.obj = phoneShow.play_data.r.sty;
            // } else {
            //     classAndData.clsobj.obj = phoneShow.play_data.sty;
            // }
            // console.log(classAndData.interactiveDatas);
            treeData.cssTree.renderObj = null;
            treeData.cssTree.vNodeTree = null;
            classAndData.playShow = 2;
        },
        //添加弹框事件
        popFun(){
            console.log(classAndData.interactiveData.popEvent);
            if (classAndData.interactiveData.popEvent !== "") {
                let ren;
                if (classAndData.interactiveDatas.sty) {
                    ren = classAndData.interactiveDatas.sty
                } else {
                    ren = classAndData.interactiveDatas
                }
                ren.es[classAndData.eventObj.curWay].map(function (item) {
                    if (!item.bh) {
                        item.bh = {}
                    }
                    item.bh.v = classAndData.interactiveData.popEvent
                });
            }
        },
        //-----------------------------------------------------------------
        classBaseClick:function(e){
            clearClass("classTitle");
            e.target.className="classTitle current";
            classAndData.clsPlayShow = 0;
        },
        classMoseClick:function(e){
            clearClass("classTitle");
            e.target.className="classTitle current";
            classAndData.clsPlayShow = 1;
        },
        classExtensionClick:function(e){
            clearClass("classTitle");
            e.target.className="classTitle current";
            classAndData.clsPlayShow = 2;
        },
        classAnimationClick:function(e){
            clearClass("classTitle");
            e.target.className="classTitle current";
            classAndData.clsPlayShow = 3;
        },
        dataBasicClick:function(e){
            clearClass("classTitle");
            e.target.className="classTitle dataCurrent";
            classAndData.baseDataShow = 0;
        },
        dataHandleClick:function(e){
            this.initEventManage()
            clearClass("classTitle");
            e.target.className="classTitle dataCurrent";
            classAndData.baseDataShow = 1;
        },
        //目录按钮
        directory1Click:function(e){
            var ul = document.getElementsByClassName("lis")[0];
            ul.style.display = ul.style.display === "block" ? "none" : "block";
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].style.display = "block";
                ul.children[i].onclick = function(e) {
                    if (e.target.nodeName === "LI") {
                        ul.style.display = "none";
                    }
                    if (e.target.nodeName === "A") {
                        ul.style.display = "none";
                    }
                }
            }
        },
        directory2Click:function(e){
            var ul = document.getElementsByClassName("lis")[1];
            ul.style.display = ul.style.display === "block" ? "none" : "block";
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].style.display = "block";
                ul.children[i].onclick = function(e) {
                    if (e.target.nodeName === "LI") {
                        ul.style.display = "none";
                    }
                    if (e.target.nodeName === "A") {
                        ul.style.display = "none";
                    }
                }
            }
        },
        //2d  3d转换按钮
        directory3Click:function(e){
            var oneDiv = document.getElementsByClassName("conversionOne")[0];
            var twoDiv = document.getElementsByClassName("conversionTwo")[0];
            if (event.target.innerHTML === "2D") {
                oneDiv.style.display = "none";
                twoDiv.style.display = "block";
                event.target.innerHTML = "3D";
            } else {
                twoDiv.style.display = "none";
                oneDiv.style.display = "block";
                event.target.innerHTML = "2D";
            }
        },
        //透明度+按钮
        btnAdd1Click:function(e){
            e.preventDefault();
            e.target.nextElementSibling.focus();
            if(this.cls.numValue.od.value>=1){
                this.cls.numValue.od.value = 1
            }else if(this.cls.numValue.od.value < 0){
                this.cls.numValue.od.value = 0
            }else{
                this.cls.numValue.od.value = parseFloat((parseFloat(this.cls.numValue.od.value) + 0.1).toFixed(1));
            }
        },
        //透明度-按钮
        btnSubtraction1Click:function(e){
            e.preventDefault();
            var v=this.cls.numValue.od.value;
            if(v <= 0){
                v=0;
            }else if(v > 1){
                v=1;
            }else{
                v=parseFloat(v-0.1).toFixed(1);
            }
            e.target.previousElementSibling.focus();
            this.cls.numValue.od.value = v;
        },
        //透明度input输入框
        oBlur:function(e){
            var name=e.target.name;
            if(this.cls.numValue.od.value.toString().indexOf(".")===-1){
                var clsName=name+"-"+this.cls.numValue.od.value;
            }else{
                var str=this.cls.numValue.od.value.toString();
                var arr = str.split(".");
                var clsName=name+"-"+arr[0]+"_"+arr[1];
            }

            addCssName(this.clsobj.obj, clsName)

        },
        okeyDown:function(e){
            if(e.keyCode==13){
                e.target.blur();
            }
        },
        bgiClilck: function (e) {
            this.cls.bgiIsShow = !this.cls.bgiIsShow;
        },
        //背景图片取消按钮
        canBgi: function (e) {
            this.cls.bgiIsShow = false;
            this.cls.numValue.bcgImgName = "";
            this.cls.numValue.bcgImg = "";
        },
        //背景图片确定按钮
        sureBgi: function (e) {
            var obj = {}, dataArr = [];
            obj.n = this.cls.numValue.bcgImgName;
            obj.c = this.cls.numValue.bcgImg;
            dataArr.push(obj);


            var clsName = "bgi-" + this.cls.numValue.bcgImgName.split(".")[0] + "-" + this.cls.numValue.bcgImgName.split(".")[1];
            var cls = "background-image:url(" + this.cls.numValue.bcgImg + ")";


            reqClsImgData(dataArr);

            cssDynaCache.addCssRule(clsName, cls);
            addCssName(this.clsobj.obj, clsName);

            this.cls.bgiIsShow = false;
        },
        //内外边距二级联动
        marPadChange:function(e){
            var select=document.getElementById("selectMarPad");
            if(this.cls.numValue.selMarPad==="margin"){
                this.cls.numValue.marginPadding = "m";
                this.cls.numValue.margin=[{
                    "n":"全部外边距",
                    "v":"m"
                },{
                    "n":"上外边距",
                    "v":"mt"
                },{
                    "n":"下外边距",
                    "v":"mb"
                },{
                    "n":"左外边距",
                    "v":"ml"
                },{
                    "n":"右外边距",
                    "v":"mr"
                }];
            }else{
                this.cls.numValue.marginPadding="pd";
                this.cls.numValue.margin=[{
                    "n":"全部内边距",
                    "v":"pd"
                },{
                    "n":"上内边距",
                    "v":"pt"
                },{
                    "n":"下内边距",
                    "v":"pb"
                },{
                    "n":"左内边距",
                    "v":"pl"
                },{
                    "n":"右内边距",
                    "v":"pr"
                }];
            }
        },
        //单位select
        //单位改变之后进行拼接
        unitChange:function(e){
            var na = e.target.name.split("d")[0];
            var name=e.target.name;
            //定位Y轴方向
            if (na === "tb") {
                classAddToStyle.clsTBJoin(this.cls.numValue.pospoint, cssBaseData.clsName, this.cls.numValue.tbd.value, this.cls.numValue.tbd.unit, this.clsobj.obj)
                //定位X轴方向
            } else if (na === "lr") {
                classAddToStyle.clsLRJoin(this.cls.numValue.pospoint, cssBaseData.clsName, this.cls.numValue.lrd.value, this.cls.numValue.lrd.unit, this.clsobj.obj)
                //边距
            } else if (na === "m") {
                classAddToStyle.clsJoin(this.cls.numValue.marginPadding, this.cls.numValue.md.value, this.cls.numValue.md.unit, cssBaseData.clsName[this.cls.numValue.marginPadding], this.clsobj.obj);
                //边框线宽
            } else if (na === "bw") {
                var bw = this.cls.numValue.selBord + "w";
                classAddToStyle.clsJoin(bw, this.cls.numValue.bwd.value, this.cls.numValue.bwd.unit, cssBaseData.clsName[bw], this.clsobj.obj);
                //圆角
            } else if (na === "br") {
                classAddToStyle.brChange(this.cls.numValue.selBorRad, this.cls.numValue.brd.value, this.cls.numValue.brd.unit, this.cls.numValue.brtd.value, this.cls.numValue.brtd.unit, cssBaseData.clsName, this.clsobj.obj)
            } else {
                let clsName;
                var un = this.cls.numValue[name]["unit"];
                if(this.cls.numValue[name].value!==0){
                    var v = this.cls.numValue[name].value;
                    if(v.toString().indexOf(".")===-1){
                        clsName = name.split("d")[0] + "-" + v + "--" + un;
                    }else{
                        var str=v.toString();
                        var arr = str.split(".");
                        clsName = name.split("d")[0] + "-" + arr[0] + "_" + arr[1] + "--" + un;
                    }
                    addCssName(this.clsobj.obj, clsName)
                }
            }
        },
        //n+v
        keyChange:function(e){
            var name=e.target.name;
            let clsName;
            if(name==="bs"){
                clsName = this.cls.numValue.selBord + "s-" + this.cls.numValue[name + "d"];
                addCssName(this.clsobj.obj, clsName)
            }else if(name==="m"){
                classAddToStyle.clsJoin(this.cls.numValue.marginPadding, this.cls.numValue.md.value, this.cls.numValue.md.unit, cssBaseData.clsName[this.cls.numValue.marginPadding], this.clsobj.obj)
            }else if(name==="bw"){
                let bw = this.cls.numValue.selBord + "w";
                let cls = this.clsobj.obj.cls.split(" ");
                switch (this.cls.numValue.selBord) {
                    case "b":
                        showBorderDetail(this.cls.numValue.selBord, cls);
                        break;
                    case "bl":
                        showBorderDetail(this.cls.numValue.selBord, cls);
                        break;
                    case "br":
                        showBorderDetail(this.cls.numValue.selBord, cls);
                        break;
                    case "bb":
                        showBorderDetail(this.cls.numValue.selBord, cls);
                        break;
                    case "bt":
                        showBorderDetail(this.cls.numValue.selBord, cls);
                        break
                }
                //classAddToStyle.clsJoin(bw, this.cls.numValue.bwd.value, this.cls.numValue.bwd.unit, cssBaseData.clsName[bw], this.clsobj.obj)
            }else if(name==="ff"){
                clsName = name + "-" + this.cls.numValue[name + "d"];
                addCssName(this.clsobj.obj, clsName)
            } else if (name === "pos") {
                classAddToStyle.clsTBJoin(classAndData.cls.numValue.pospoint, cssBaseData.clsName, classAndData.cls.numValue.tbd.value, classAndData.cls.numValue.tbd.unit, classAndData.clsobj.obj);
                classAddToStyle.clsLRJoin(classAndData.cls.numValue.pospoint, cssBaseData.clsName, classAndData.cls.numValue.lrd.value, classAndData.cls.numValue.lrd.unit, classAndData.clsobj.obj)
            }else{
                clsName = name + "-" + this.cls.numValue[name + "d"];
                addCssName(this.clsobj.obj, clsName);
            }
        },
        //颜色input框
        cChange:function(e){
            //判断输入的字符，截取到6位颜色数字，如果没有6位，则默认补0
            var name=e.target.name;
            let clsName;
            if (e.target.value.indexOf("#") !== 0) {
                this.cls.numValue[name] = "#" + e.target.value;
            }
            if (e.target.value.length < 7) {
                for (var i = e.target.value.length - 1; i < 6; i++) {
                    this.cls.numValue[name] = this.cls.numValue[name] + "0";
                }
            } else if (e.target.value.length > 7) {
                this.cls.numValue[name] = e.target.value.substring(0, 7)
            } else {
                this.cls.numValue[name] = e.target.value
            }
            //边框颜色
            if(name==="bdc"){
                if(this.cls.numValue.selBord==="b"){
                    clsName = this.cls.numValue.selBord + "dc-" + this.cls.numValue[name].toString().substr(1).toUpperCase();
                }else{
                    clsName = this.cls.numValue.selBord + "c-" + this.cls.numValue[name].toString().substr(1).toUpperCase();
                }
                addCssName(this.clsobj.obj, clsName)
            }else{
                console.log(e.target.name);
                clsName = name + "-" + this.cls.numValue[name].toString().substr(1).toUpperCase();
                addCssName(this.clsobj.obj, clsName)
            }

        },
        //颜色输入框失去焦点事件
        colorChange: function (e) {
            if (e.keyCode === 13) {
                e.target.blur();
            }
        },
        //阴影应用按钮
        tsBtnClick:function(e){
            //判断输入的值是否大于等于0，是进行拼接，不是就等于0
            if(this.cls.numValue.blur.value<0){
                alert("模糊距离数值必须时大于等于0");
                this.cls.numValue.blur.value = 0;
            }else{
                classAddToStyle.tsClick(this.cls.numValue.boxTextS, this.cls.numValue.shaXd.value, this.cls.numValue.shaYd.value, this.cls.numValue.blur.value, this.cls.numValue.tsc, cssBaseData.clsName, this.cls.numValue.shaXd.unit, this.cls.numValue.shaYd.unit, this.cls.numValue.blur.unit, this.clsobj.obj)
            }
        },
        //溢出处理方式
        ofChange:function(e){
            var name=e.target.name;
            classAddToStyle.ofChange(name, this.cls.numValue.ofd, this.cls.numValue.selOverflow, cssBaseData.clsName, cssBaseData.clsValue, this.clsobj.obj)
        },
        //溢出处理方向
        ofChange1:function(e){
            var sel=document.getElementById("ofSel");
            var name=sel.name;
            classAddToStyle.ofChange(name, this.cls.numValue.ofd, this.cls.numValue.selOverflow, cssBaseData.clsName, cssBaseData.clsValue, this.clsobj.obj)
        },
        //圆角位置拼接
        brChange:function(e){
            classAddToStyle.brChange(this.cls.numValue.selBorRad, this.cls.numValue.brd.value, this.cls.numValue.brd.unit, this.cls.numValue.brtd.value, this.cls.numValue.brtd.unit, cssBaseData.clsName, this.clsobj.obj)
        },
        //动画应用按钮
        animateBtn:function(e){
            if (this.aniSel_data !== "") {
                if (this.clsobj.obj.sty !== undefined && this.clsobj.obj.sty.length !== 0) {
                    var arr = this.clsobj.obj.sty.split(" ");
                } else {
                    var arr = this.clsobj.obj.cls.split(" ");
                }
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
                    addCssName(this.clsobj.obj, "animated");
                    addCssName(this.clsobj.obj, this.aniSel_data);
                } else {
                    addCssName(this.clsobj.obj, "animated");
                    addCssName(this.clsobj.obj, this.aniSel_data);
                }

            }else{
                if (this.clsobj.obj.sty !== undefined && this.clsobj.obj.sty.length !== 0) {
                    var arr = this.clsobj.obj.sty.split(" ");
                    clearAni(arr);
                    if (arr.length) {
                        this.clsobj.obj.sty = arr.join(" ");
                    }
                } else {
                    var arr = this.clsobj.obj.cls.split(" ");
                    clearAni(arr);
                    if (arr.length) {
                        this.clsobj.obj.cls = arr.join(" ");
                    }
                }

            }

        },
        animateSel:function(e){
            if (this.aniSel_data !== "") {
                var clsName = this.aniSel_data;
                var animate = document.getElementsByClassName("animate")[0];
                animate.className = "";
                animate.classList.add("animate");
                animate.classList.add(clsName);
                animate.classList.add("animated")
            }
        },
        //点击相应图标清除类名
        deleteClass: function (e) {
            var n = e.target.id;
            switch (n) {
                case "lr":
                    this.cls.numValue[n + "d"].value = 0;
                    this.cls.numValue[n + "d"].unit = "r";
                    n = this.cls.numValue.pospoint.slice(1, 2);
                    break;
                case "tb":
                    this.cls.numValue[n + "d"].value = 0;
                    this.cls.numValue[n + "d"].unit = "r";
                    n = this.cls.numValue.pospoint.slice(0, 1);
                    break;
                case "bw":
                    this.cls.numValue[n + "d"].value = 0;
                    this.cls.numValue[n + "d"].unit = "r";
                    n = this.cls.numValue.selBord + "w";
                    this.cls.numValue.selBord = "b";
                    break;
                case "br":
                    this.cls.numValue[n + "d"].value = 0;
                    this.cls.numValue[n + "d"].unit = "r";
                    this.cls.numValue[n + "td"].value = 0;
                    this.cls.numValue[n + "td"].unit = "r";
                    n = this.cls.numValue.selBorRad;
                    this.cls.numValue.selBorRad = "br";
                    break;
                case "m":
                    this.cls.numValue[n + "d"].value = 0;
                    this.cls.numValue[n + "d"].unit = "r";
                    n = this.cls.numValue.marginPadding;
                    this.cls.numValue.marginPadding = "m";
                    this.cls.numValue.selMarPad = "margin";
                    this.cls.numValue.margin = [{
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
                    break;
                case "ff":
                case "p":
                    this.cls.numValue[n + "d"] = "s";
                    classAndData.cls.numValue.pospoint = "tl";
                    let clsArray = classAndData.clsobj.obj.cls.split(" ");
                    clsArray.forEach(function (item) {
                        let c = item.split("-");
                        if (c[0].length === 1 && c[0].indexOf("b") > -1) {
                            classAndData.cls.numValue["lrd"].value = 0;
                            classAndData.cls.numValue["lrd"].unit = "r";
                            delClass(classAndData.clsobj.obj, item);
                        } else if (c[0].length === 1 && c[0].indexOf("t") > -1) {
                            classAndData.cls.numValue["lrd"].value = 0;
                            classAndData.cls.numValue["lrd"].unit = "r";
                            delClass(classAndData.clsobj.obj, item);
                        } else if (c[0].length === 1 && c[0].indexOf("l") > -1) {
                            classAndData.cls.numValue["tbd"].value = 0;
                            classAndData.cls.numValue["tbd"].unit = "r";
                            delClass(classAndData.clsobj.obj, item);
                        } else if (c[0].length === 1 && c[0].indexOf("r") > -1) {
                            classAndData.cls.numValue["tbd"].value = 0;
                            classAndData.cls.numValue["tbd"].unit = "r";
                            delClass(classAndData.clsobj.obj, item);
                        }
                    });
                    break;
                case "w":
                case "h":
                case "fs":
                case "o":
                case "zd":
                case "aw":
                case "ah":
                case "iw":
                case "ih":
                case "lh":
                case "ti":
                case "ls":
                case "ow":
                    if (this.cls.numValue[n + "d"].unit !== null && this.cls.numValue[n + "d"].unit !== undefined) {
                        this.cls.numValue[n + "d"].unit = "r";
                    }
                    this.cls.numValue[n + "d"].value = 0;
                    break;
                case "ord":
                    this.cls.numValue.order.value = 0;
                    break;
                case "fg":
                    this.cls.numValue.fdMax.value = 0;
                    break;
                case "fsh":
                    this.cls.numValue.fdMin.value = 0;
                    break;
                case "ts":
                    n = this.cls.numValue.boxTextS;
                    this.cls.numValue.boxTextS = "bos";
                    this.cls.numValue.shaXd.value = 0;
                    this.cls.numValue.shaXd.unit = "r";
                    this.cls.numValue.shaYd.value = 0;
                    this.cls.numValue.shaYd.unit = "r";
                    this.cls.numValue.blur.value = 0;
                    this.cls.numValue.blur.unit = "r";
                    this.cls.numValue.tsc = "#000000";
                    break;
            }
            delClass(classAndData.clsobj.obj, n);
        },

        renRuleState: function (e) {
           stateRenRule(e)
        },
        renRuleAdd: function (e) {
            addRenRule()
        },
        renRuleDetails: function (event, index) {
            editRenRule(event, index)
        },
        renRuleSave: function(){
            saveRenRule()
        },
        renRuleDelete: function(index) {
            deleteRenRule(index)
        },
        renRuleCancel: function () {
            cancelRenRule()
        },
        // 样式清空
        clearCls:function () {
            clearClsName(classAndData.clsobj.obj);
            clearAttributeParse();
        },
        layoutFun: function (e) {
            var layTp = e.target.value, layData = getLayoutData(layTp);
            // 如果有布局就将布局数据 展示出来
            if (classAndData.layoutIlm && classAndData.layoutIlm.t && classAndData.layoutIlm.t !== "") {
                //将当前的容器布局 传到 布局的vue组件中 用来展示
                classAndData.layoutIlm = layData;
                //用来双向绑定的数据
                classAndData.pageLayout.t = layTp;
                classAndData.pageLayout.atr = layData.atr;
                classAndData.layoutIsShow = true;
            }
            if (!classAndData.interactiveDatas.k) {
                if (layTp !== "") {
                    Vue.set(classAndData.interactiveDatas, "ilm", {});
                    Vue.set(classAndData.interactiveDatas.ilm, "t", layTp);
                    Vue.set(classAndData.interactiveDatas.ilm, "atr", layData);
                    classAndData.pageLayout = classAndData.interactiveDatas.ilm;
                    classAndData.layoutIlm = layData;
                    classAndData.pageLayout.t = layTp;
                    classAndData.pageLayout.atr = layData.atr;
                    classAndData.layoutIsShow = true;
                }
            }
        }
    },
    computed: {
        // 编辑渲染规则中使用 单击切换图标
        getRenState: function(){
            if(classAndData.pageRenData.choiceOrUpdate) {
                return "&#xe617;"
            } else {
                return "&#xe66a;"
            }
        }
    },
    watch: {
        'eventObj.eventMethod': 'selEventMethod'
    },
    updated: function () {
        if (classAndData.playShow === 0) {
            clearClass("model-t1");
            var classList = document.querySelectorAll('.model-t1');
            classList[0].className = "model-t1 model-show";
        }
    },
    renderLevel: 0
});