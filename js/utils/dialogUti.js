var rightMenuList = [];
function DialogUti(){
    this.level = 1;
    this.initDialog = function(parentNode,datas,location){
        var divNode;
        if(!document.getElementById("#menu_"+this.level)){
            divNode = document.createElement("div");
        }else {
            divNode = document.getElementById("menu_"+this.level);
        }
        divNode.setAttribute("id","menu_"+this.level);
        divNode.setAttribute("class","right-menu");
        divNode.setAttribute("style", "left:" + location.x + "px;top:" + location.y + "px;" + "color:" + "black;");
        for(var i=0;i<datas.length;i++){
            var childNode = document.createElement("div");
            if("icon" in datas[i] && datas[i].icon){
                var spanNode = document.createElement("span");
                childNode.appendChild(spanNode);
            }
            childNode.innerHTML = datas[i].name;
            childNode.setAttribute("class","right-menu-child");
            childNode.childrenDialogDatas = datas[i];
            divNode.appendChild(childNode);
            if("children" in childNode.childrenDialogDatas && childNode.childrenDialogDatas.children.length > 0){
                $(childNode).unbind("click");
                $(childNode).bind("click",function(e){
                    stopPropagation(e);
                    var shiftX = this.offsetWidth;
                    var shiftY = this.offsetHeight;
                    dialog.level++;
                    dialog.initDialog(this,this.childrenDialogDatas.children,{x:shiftX,y:shiftY});
                });
            }else {
                $(childNode).unbind();
                if("values" in childNode.childrenDialogDatas && childNode.childrenDialogDatas.values.length > 0){
                    for(var val=0;val<childNode.childrenDialogDatas.values.length;val++){
                        if(childNode.childrenDialogDatas.values[val].key === "click"){
                            childNode.childNodeEvent = val;
                            $(childNode).bind("click",function(e){
                                stopPropagation(e);
                                this.childrenDialogDatas.values[this.childNodeEvent].value(e);
                                $("#menu_1").remove();
                            })
                        }else{
                            $(childNode).bind(childNode.childrenDialogDatas.values[val].key,childNode.childrenDialogDatas.values[val].value);
                        }
                    }
                }else {
                    $("#menu_1").remove();
                }
            }
        }
        parentNode.appendChild(divNode);
    };
    this.createDialog = function(parentNode,datas,location,index){
        jdugyRightMenu();
        this.level = 1;
        this.initDialog(parentNode,datas,location,index);
        rightMenuList.push("#menu_1");
    }
}
var dialog=new DialogUti();
function stopPropagation(e){
    if (e || e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.CancelBubble = true;
    }
}
function jdugyRightMenu(){
    if(rightMenuList.length>0){
        while(rightMenuList.length){
            $(rightMenuList[0]).remove();
            rightMenuList.splice(0,1);
        }
    }
}

