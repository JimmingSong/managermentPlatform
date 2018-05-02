function ajaxDeal(url,data,type,async,contentType) {
    return new Promise(function(resolve,reject){
        if(async==undefined){
            async=true;
        }
        $.ajax({
            type:type?type:"post",
            data:data?data:"",
            url:url,
            async:async,
            // contentType:contentType?contentType:"application/json;charset=utf-8",
            success:function(data){
                resolve(data);
            },
            error:function(data) {
                reject(data);
            }
        });
    });
}
function reqAlert(msg) {
	//return function() {
		$.layer.alert(msg);
	//}
}

//样式表名称是否存在
function successFun(data,msg) {
//	console.log(msg);
	console.log(typeof data);
	if(!(data.indexOf("true")>=0)) {
//		console.log(msg);
		$.layer.newAlert("你的样式为"+msg.n+"已存在",function(){
			updateData(msg);
			location.href="showViews.html";
		});
	}else {
		$.layer.alert("提交成功");
		location.href="showViews.html";
	}
}

//点击更新执行的函数
function updateData(msg) {
	msg.update = true;
    var IP = location.hostname,port = location.port;
	$.ajax({
		type:"post",
		data:JSON.stringify(msg),
		url:"http://"+IP+":"+port+"/insertAstyle.action",
		contentType:"application/json;charset=utf-8",
		success:function(data){
			console.log(typeof data);
			data = JSON.parse(data);
			if(data.name) {
				reqAlert("更新成功");
			}
		},
		error:function(data) {
			reqAlert("更新失败");
		}
	})
	//ajaxDeal(msg,"http://"+IP+":"+port+"/insertAstyle.action",function(data){reqAlert("更新成功",true)},reqAlert("更新失败"));
}
//点击重命名执行的函数
function reName(clsName) {
	clsName = "";
}


function reqServer(type,url,jsonData,isAsync,success,error){
	if(error){
		error=function(failinfo){
		   alert("请求失败");
			console.info(JSON.stringify(failinfo));
		}
	}
    var IP = location.hostname,port = location.port;
	var baseUrl="http://"+IP+":"+port+"/";
	$.ajax({
		type:type,
		data:JSON.stringify(jsonData),
		url:baseUrl+url,
		contentType:"application/json;charset=utf-8",
		async:isAsync,
		success:success,
		error:error
	})
}
//请求某种类型的基本类数据
function reqClsArrayByType(type,callback,isAsync){
	if(!type||type ==""){
		return;
	}
	var postData={jsonMessage:[type]};
	reqServer("post","selectNameByType.action",postData,isAsync,callback);
}



