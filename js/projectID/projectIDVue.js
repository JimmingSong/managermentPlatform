/*项目id*/
new Vue({
    el:"#id-list",
    data: idList,
    mounted:function(){
        var handleModel = document.getElementById("id-list");
        var leftDiv = document.getElementById("data-left");
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
            }
        }
    },
    methods:{
        preventClick:function(e){
            document.oncontextmenu = function(e){return false;}
        },
        chec: function (item, index, e) {
            e.preventDefault();
            var WmBtn = document.getElementById("wm_btn");
            WmBtn.className = "wm_btn wm_show";
            WmBtn.nextElementSibling.className = "wm_btn";
            phoneShow.isShow = false;
            //展示回页面数
            treeData.treeShow = 0;
            //切换页面的时候更新页面树
            treeData.pageTree.vmTree.length = 0;
            if (idList.oldPageId !== "" || idList.curPageId !== idList.oldPageId) {
                if(idList.curPageId === ""){
                    return
                }else{
                    var D = dataTreeParse.weedPageData(phoneShow);
                    localStorage.setItem(phoneShow.id, JSON.stringify(D));
                }
            }
            var pageData = localStorage.getItem(item);
            var messageData = JSON.parse(pageData);
            if (pageData) {
                pageData = JSON.parse(pageData);
                if (!pageData.ds.values || pageData.ds.values.length === 0) {
                    phoneData.addToParag.parLength = "0"
                } else {
                    phoneData.addToParag.parLength = pageData.ds.values.length;
                }
                if (idList.curPageId === "") {
                    idList.curPageId = pageData.id;
                } else {
                    idList.oldPageId = idList.curPageId;
                    idList.curPageId = pageData.id
                }
                showPageData(pageData);
            }
            if (messageData.ds) {
                delete messageData.ds;
            }
            if (messageData.st) {
                delete messageData.st;
            }
            if (messageData.rs) {
                delete messageData.rs;
            }
            if (messageData.con_cls) {
                delete messageData.con_cls;
            }
            classAndData.messageData = messageData;
            //展示頁面信息
            classAndData.rtShow = 1;
        },
        menu:function(e,index,item){
            menu(e, index, item)
        },
        deletePro: function(item,index){
                for(var i=0;i<idList.b.length;i++){
                   for(var j=0; j<idList.id.length;j++){
                      if(idList.id[j].name === idList.b[i].name){
                          idList.id.splice(j,1);
                      }
                   }
                 }
            idList.b.length = 0;
        },
        showPopup:function(){
            idList.popShow = !idList.popShow;
            // idList.popFontShow = true;
            // idList
            idList.addOrSearch = true;
            var div = document.createElement("div");
            div.className = 'shadeShadow';
            div.id = 'shadeShadow';
            document.getElementById('data-handle').appendChild(div);
        },
        searchFun: function () {
            idList.popShow = !idList.popShow;
            var div = document.createElement("div");
            div.className = 'shadeShadow';
            div.id = 'shadeShadow';
            document.getElementById('data-handle').appendChild(div);
            idList.addOrSearch = false;
        },
        keyDown: function (e) {
            if (e.keyCode === 13) {
                this.addPro();
            }
        },
        addPro:function(){
            var value={};
            value.id = idList.pId;
            value.tp = idList.pType;
            value.n = idList.pName;
            if (value.id === "" || value.tp === "") {
                $.layer.alert("ID或TP不能为空")
            } else {
                //新增页面
                if (idList.addOrSearch) {
                    value.ds = firstPageContent.ds;
                    value.rs = firstPageContent.rs;
                    value.st = firstPageContent.st;
                    var val = JSON.stringify(value);
                    if (idList.id.indexOf(idList.pId) > -1) {
                        $.layer.confirm("此ID已存在,确定要覆盖吗", function () {
                            idList.id.splice(idList.id.indexOf(idList.pId), 1, idList.pId);
                            localStorage.setItem(idList.pId, val);
                            idList.popShow = false;
                        })
                    } else {
                        //将新增的页面数据存到localStorage
                        idList.id.push(idList.pId);
                        localStorage.setItem(idList.pId, val);
                        idList.popShow = false;
                    }
                } else {
                    reqServer("post", "selectNPageDataById", value, false, function (data) {
                        data = data.replace(/[\r\n]/g, "");
                        if (data === "搜索结果为空{}") {
                            $.layer.alert("此页面不存在!")
                        } else {
                            reqServer("post", "CreateCss1.action", value, false, function (data) {
                                var link = document.createElement("link");
                                link.setAttribute("rel", "stylesheet");
                                link.setAttribute("href", "http://fuhao.7766.org:8070/css/test.css");
                                document.getElementsByTagName("head")[0].appendChild(link);
                            });
                            let sData = JSON.parse(data);
                            if (idList.id.indexOf(sData.id) === -1) {
                                idList.id.push(sData.id)
                            } else {
                                idList.id.splice(idList.id.indexOf(sData.id), 1, sData.id);
                            }
                            localStorage.setItem(sData.id, data)
                        }
                    })
                }
            }
            idList.popShow = false;
            document.getElementById('data-handle').removeChild(document.getElementById("shadeShadow"));
        },
        cancel:function(){
            idList.addData="";
            idList.popShow =false;
            document.getElementById('data-handle').removeChild(document.getElementById("shadeShadow"));
        },
        search: function (e) {
            var value=idList.projectId;
            console.log(value);
            if(e.keyCode===13){
                $.ajax({
                    type: "post",
                    url: baseUrl + "selectNPageidNyFuzzyId.action",
                    // async:false,
                    data: value,
                    success: function (data) {
                        console.log(data);
                        idList.id = data;
                    },
                    error: function (e) {
                        alert("请求失败" + e.status);
                    }
                })
            }
        },
        updateSureClick: function () {
            if (idList.updatePage.id === "" || idList.updatePage.tp === "") {
                $.layer.alert("ID和tp不能为空")
            } else {
                if (idList.updateShow === 1) {
                    localStorage.removeItem(idList.curPageId);
                    idList.id.splice(idList.id.indexOf(idList.curPageId), 1, idList.updatePage.id);
                    phoneShow.id = idList.updatePage.id;
                    phoneShow.tp = idList.updatePage.tp;
                    phoneShow.n = idList.updatePage.name;
                    var D = dataTreeParse.weedPageData(phoneShow);
                    localStorage.setItem(phoneShow.id, JSON.stringify(D));
                    showPageData(D);
                    if (D.ds) {
                        delete D.ds;
                    }
                    if (D.st) {
                        delete D.st;
                    }
                    if (D.rs) {
                        delete D.rs;
                    }
                    if (D.con_cls) {
                        delete D.con_cls;
                    }
                    classAndData.messageData = D;
                    idList.updateShow = false;
                    idList.updatePage.id = "";
                    idList.updatePage.tp = "";
                    idList.updatePage.name = "";
                } else if (idList.updateShow === 2) {
                    if (idList.id.includes(idList.updatePage.id)) {
                        $.layer.alert("此ID已存在,请重新输入");
                        idList.updateShow = true;
                    } else {
                        idList.id.push(idList.updatePage.id);
                        phoneShow.id = idList.updatePage.id;
                        phoneShow.tp = idList.updatePage.tp;
                        phoneShow.n = idList.updatePage.name;
                        var D = dataTreeParse.weedPageData(phoneShow);
                        localStorage.setItem(phoneShow.id, JSON.stringify(D));
                        showPageData(D);
                        if (D.ds) {
                            delete D.ds;
                        }
                        if (D.st) {
                            delete D.st;
                        }
                        if (D.rs) {
                            delete D.rs;
                        }
                        if (D.con_cls) {
                            delete D.con_cls;
                        }
                        classAndData.messageData = D;
                        idList.updateShow = false;
                        idList.updatePage.id = "";
                        idList.updatePage.tp = "";
                        idList.updatePage.name = "";
                    }
                }

            }
        },
        updateCancelClick: function () {
            idList.updateShow = false;
        }
    },
    renderLevel:0,
});
