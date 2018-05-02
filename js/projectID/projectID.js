function menu(e, index, item) {
    var idWord = idList.id[index];
    var phone = document.querySelector(".list-ul");
    var phoneW = phone.offsetWidth;
    var phoneH = phone.offsetHeight;
    let liList = document.querySelectorAll(".list-ul>li");
    let tar = e.currentTarget;
    if (e.button === 2) {
        for (i of liList) {
            i.style.background = "";
        }
        tar.style.background = "#6fb4ed";
        var datas1 = [
            {
                name: "保存到本地", icon: "", values: [{
                key: 'click', value: function (event) {
                    var tar = e.target;
                    if(tar.nodeName === 'SPAN'){
                        tar = tar.parentNode;
                    }
                    saveToLocal(tar)
                }
            }],
                children: []
            },
            {
                name: "提交服务器", icon: "", values: [{
                key: 'click', value: function (event) {
                    savePage(idWord)
                }
            }], children: []
            },
            {
                name: "删除本地", icon: "", values: [{
                key: "click", value: function (event) {
                    $.layer.confirm("删除本地页面页面数据将不能被找回,你确定要删除吗?", function () {
                        deleteOnePageDataTolocal(tar)
                    })
                }
            }], children: []
            },
            {
                name: "复制页面", icon: "", values: [{
                    key: "click", value: function (event) {
                        idList.updateShow = 2;
                        idList.updatePage.oId = item;
                        idList.updatePage.tp = 'singleshowinfo';
                    }
                }], children: []
            },
            {
                name: "新增页面", icon: "", values: [{
                    key: 'click', value: function () {
                        if (idList.b.indexOf(idList.id[index]) === -1) {
                            idList.popShow = true;
                            var div = document.createElement("div");
                            div.className = 'shadeShadow';
                            div.id = 'shadeShadow';
                            document.getElementById('data-handle').appendChild(div);
                        }
                    }
                }], children: []
            },
            {
                name: "删除服务器及本地", icon: "", values: [{
                key: "click", value: function (event) {
                    $.layer.confirm('删除数据库中的数据将不能被找回,您确定要删除吗?', function () {
                        deleteOnePageData(tar)
                    })
                }
            }], children: []
            }];
        if (idWord === idList.curPageId) {
            datas1.push({
                name: "重命名", icon: "", values: [{
                    key: "click", value: function () {
                        idList.updateShow = 1;
                        idList.updatePage.oId = item;
                    }
                }], children: []
            })
        }
        dialog.createDialog(e.currentTarget, datas1, {
            x: phoneW * (1 / 2) + phone.offsetLeft - 50,
            y: phoneH * (1 / 2) + phone.offsetTop - 50
        });
        window.onclick=function(){
            $("#menu_1").remove();
            for (i of liList) {
                i.style.background = "";
            }
        }
    }else{
        for (let j of liList) {
            j.className = '';
        }
        tar.className = "proShowName";
    }
}
 function showPopup(){
  //  console.log("pop");
    idList.popShow = !idList.popShow;
}
// 展示页面id

// if(idList.id.indexOf(phoneShow.ds.id) === -1){
//     idList.id.push(phoneShow.ds.id);
// }
//删除页面
function deleteNPage(e, index) {
    var f = document.getElementsByClassName("proShowName");
    // ajaxDeal().then(function (data) {
    //     console.log(data);
    //     if (data === "true") {
    //         for (item in f) {
    //             f[item].style = '';
    //         }
    //         idList.id.splice(idList.c[0], 1);
    //         idList.c.length = 0;
    //     } else {
    //         alert("删除失败")
    //     }
    // }, function (error) {
    //     console.log("出错啦", error);
    // })
}

/**
 * 保存到本地
 * @param e 当前点击的li标签
 */
function saveToLocal(e) {
    // localStorage.setItem()
    var D = dataTreeParse.weedPageData(phoneShow);
    localStorage.setItem(phoneShow.id, JSON.stringify(D));
}
/**
 * 提交页面到服务器
 * @param id
 */
function savePage(id) {
    var localPage;
    if (idList.curPageId === id) {
        localPage = dataTreeParse.weedPageData(phoneShow);
        localPage["update"] = true;
        localStorage.setItem(id, JSON.stringify(localPage))
    } else {
        localPage = localStorage.getItem(id);
        localPage = JSON.parse(localPage);
        localPage["update"] = true;
        localPage = dataTreeParse.weedPageData(localPage);
        localStorage.setItem(id, JSON.stringify(localPage))
    }
    if(localPage){
        var arr = [];
        arr.push(localPage);
        $.ajax({
            type:"post",
            url: baseUrl + "insertNPages.action",
            data: JSON.stringify(arr),
            contentType: "application/json;charset=utf-8",
            success:function (data) {
                $.layer.alert("恭喜!数据库存储成功");
            },
            error:function () {
                $.layer.alert("抱歉!数据库存储失败")
            }
        })
    } else {
        $.layer.alert("没找到此页面")
    }

}

function deleteOnePageData(e) {
    var pId = e.children[0].innerHTML;
    $.layer.confirm("确定要删除ID为 " + pId + " 这个页面吗?三思而行呐!!", function () {
        var pData = JSON.parse(localStorage.getItem(pId));
        var pObj = {};
        pObj.id = pData.id;
        pObj.tp = pData.tp;
        reqServer("post", "deleteNPage.action", pObj, false, function (data) {
            if (data) {
                $.layer.alert("数据库数据删除成功,后悔也没用了哦!");
                idList.id.splice(idList.id.indexOf(pId), 1);
                localStorage.removeItem(pId);
                phoneShow.ds = {};
                phoneShow.rs = {};
                phoneShow.st = {}
            }
        })
    })
}
function deleteOnePageDataTolocal(e) {
    var pId = e.children[0].innerHTML;
    $.layer.confirm("确定要删除ID为 " + pId + " 这个页面吗?删除将不能找回,请三思!", function () {
        idList.id.splice(idList.id.indexOf(pId), 1);
        localStorage.removeItem(pId);
        phoneShow.id = "";
        phoneShow.tp = "";
        idList.curPageId = "";
        idList.oldPageId = "";
        treeData.pState = true;
        treeData.pageTree.vmTree = [];
        phoneShow.ds = {};
        phoneShow.rs = {};
        phoneShow.st = {};
        $.layer.alert("本地数据删除成功,后悔也没用了哦!");
    })
}


function clearStIndexDi(st) {
    if (st.chr instanceof Array) {
        for (var i = 0; i < st.chr.length; i++) {
            if (st.chr[i].index.di) {
                delete st.chr[i].index.di;
            }
            clearStIndexDi(st.chr[i]);
        }
    } else {
        if (st.index.di) {
            delete st.index.di;
            clearStIndexDi(st.chr)
        }
    }
}

