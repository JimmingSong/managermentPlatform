
/**
 * 清除导航栏样式  鼠标点击事件
 * @param clsName
 */
function clearClass(clsName) {
    var list = document.querySelectorAll("."+clsName);
    for(var i in list){
        list[i].className = clsName;
    }
}




//样式数据请求
function gain() {
    $.ajax({
        type:"post",
        url: baseUrl + "selectClsNameByClsKey.action",
        async:false,
        data:{},
        // contentType:"application/json;charset=utf-8",
        success:function (data) {
            cssBaseData.clsName = JSON.parse(data);
            // console.log(data);
        },
        error: function (e) {
            alert("请求失败")
        }
    })
}
function gain1() {
    $.ajax({
        type:"post",
        url: baseUrl + "selectCls_V_VByCls_V_KAndCls_V_N.action",
        async:false,
        data:{},
        // contentType:"application/json;charset=utf-8",
        success:function (data) {
            cssBaseData.clsValue = JSON.parse(data);
            // console.log(data)
        },
        error:function () {
            alert("请求失败")
        }
    })
}

/**
 * 查询
 */
function gain2() {
    var value111={id:"测试",tp:"项目1"};
    console.log(typeof JSON.stringify(value111));
    $.ajax({
        type:"post",
        url: baseUrl + "selectNPageDataById.action",
        // async:false,
        data:JSON.stringify(value111),
        // contentType:"application/json;charset=utf-8",
        success:function (data) {
            // classAndData.cls.clsValue = JSON.parse(data);
            console.log(data)
        },
        error:function () {
            alert("请求失败")
        }
    })
}
// gain2();
/**
 * 删除
 */
function gain3() {
    var value111={id:"测试",tp:"项目1"};
    console.log(typeof JSON.stringify(value111));
    $.ajax({
        type:"post",
        url: baseUrl + "deleteNPage.action",
        // async:false,
        data:JSON.stringify(value111),
        // contentType:"application/json;charset=utf-8",
        success:function (data) {
            // classAndData.cls.clsValue = JSON.parse(data);
            console.log(data)
        },
        error:function () {
            alert("请求失败")
        }
    })
}
// gain3();
/**
 * 增加
 */
function gain55() {
    var value111=[{id:"测试",tp:"项目1",name:"",ds:{},rs:{},tc:{},update:true}];
    console.log(typeof JSON.stringify(value111));
    $.ajax({
        type:"post",
        url: baseUrl + "insertNPages.action",
        // async:false,
        data:JSON.stringify(value111),
        // contentType:"application/json;charset=utf-8",
        success:function (data) {
            // classAndData.cls.clsValue = JSON.parse(data);
            console.log(data)
        },
        error:function () {
            alert("请求失败")
        }
    })
}
// gain4();

