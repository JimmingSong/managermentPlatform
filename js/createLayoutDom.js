function getBaseDom(h, data) {
    switch (data.tp) {
        case "ll":
            return createLinearLayoutDom(h, data);
        case "gl":
            return createGridLayoutDom(h, data);
        case "cl":
            return createColumnLayoutDom(h, data);
        case "sl":
            return createSingleLayoutDom(h,data);
        case "opl":
            return createOnePlusNLayoutDom(h, data);
    }
}

function createLinearLayoutDom(h, data,comData,contData) {
    return h("div", {},[createLinearLayout(h, data)])
}
function createLinearLayout(h, data) {
    var div_p;
    if(data.childs.length>12){
        data.childs.length=12;
    }
    for(var i=0;i<data.childs.length;i++){}
    var height=parseInt(data.style[1].location.height/i)+"px";
    var width=parseInt(data.style[1].location.width/i)+"px";
    if(data.attr.direction1==='horizontal'){
        div_p = h("div",{
            class:"w-p-90 h-r-8 mg-t-r-2"
        },[]);
        for(var i = 0;i < data.childs.length;i++){
            var div_c=h("div",{
                class:"w-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999",
                style:{
                    height:100/data.childs.length+"%",
                }
            });
            div_p.children.push(div_c);
        }

    }else{
        div_p=h("div",{
            class:"w-p-100 h-r-8 mg-t-r-2 dis-flex flex-wrap-nowrap",
        },[]);
        for(var i = 0;i<data.childs.length;i++){
            var div_c=h("div",{
                class:"w-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999",
                style:{
                    width:100/data.childs.length + "%"
                }
            });
            div_p.children.push(div_c);
        }
    }
    return div_p;
}

function createGridLayoutDom(h, data) {
    return h("div", {}, createGridLayout(h, data))
}
function createGridLayout(h, data) {
    var cls=[];
    var flexWrap;
    var div_p=h("div",{
        class:"w-p-90 h-r-8 mg-t-r-2",
    },[])
    for(var i=0;i<data.childs.length;i++){
        var div_c=h("div",{
            class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 dis-in-block box-size-bb",
            style:{
                width:100/data.attr.col+"%",
                height:100/data.attr.row+"%",
            }
        });
        div_p.children.push(div_c);
    }
    cls.push(div_p);
    return cls;
}


function createColumnLayoutDom(h, data) {
    return h("div", {}, createColumnLayout(h, data))
}
function createColumnLayout(h, data) {
    var cls=[];
    var div_p=h("div",{
        class:"w-p-90 h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 dis-flex box-size-bb mg-t-r-2",
    },[]);
    for(var i=0;i<data.childs.length;i++){
        // console.log(100/data.childs.length);
        if(data.attr.colFlex.length!==0){
            var div_c=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:data.attr.colFlex[i],
                }
            })
        }else{
            var div_c=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    width:100/data.childs.length+"%",
                    height:"100%",
                }
            })
        }
        div_p.children.push(div_c);
    }
    cls.push(div_p);
    return cls;
}

function createSingleLayoutDom(h,data){
    return h("div",{},createSingleLayout(h,data))
}
function createSingleLayout(h,data){
    var cls=[];
    if(data.childs.length>1){
        data.childs.length=1
    }
    for(var i=0;i<data.childs.length;i++){
        var div=h("div",{
            class:"w-p-90 h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb mg-t-r-2",
        });
    }
    cls.push(div);
    return cls;
}


function createOnePlusNLayoutDom(h, data) {
    return h("div", {}, createOnePlusNLayout(h, data))
}
function createOnePlusNLayout(h, data) {
   var cls=[];
   var div_c;
   var div_p=h("div",{
       class:"w-p-90 h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 dis-flex box-size-bb mg-t-r-2",
   },[]);
    if(data.childs.length===1){
        div_c=h("div",{
            class:"w-p-100 h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 dis-flex box-size-bb",
        });
        div_p.children.push(div_c);
    }else if(data.childs.length===2){
        if(data.attr.percent.length!==0){
            for(var i=0;i<data.childs.length;i++){
                div_c=h("div",{
                    class:"h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        flex:data.attr.percent[i] || 12-data.attr.percent[0],
                    }
                })
                div_p.children.push(div_c);
            }
        }else{
            for(var i=0;i<data.childs.length;i++){
                div_c=h("div",{
                    class:"h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                   style:{
                       width:100/data.childs.length+"%",
                   }
                })
                div_p.children.push(div_c);
            }
        }
    }else if(data.childs.length===3){
        if(data.attr.percent.length!==0){
            var div1=h("div",{
                class:"h-r-8 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:data.attr.percent[0],
                }
            });
            var div2=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:12-data.attr.percent[0],
                }
            },[]);
            for(var i=1;i<data.childs.length;i++){
                div_c=h("div",{
                    class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        flex:data.attr.percent[i] || 12-data.attr.percent[1],
                    }
                });
                div2.children.push(div_c);
            }
            div_p.children.push(div1);
            div_p.children.push(div2);
        }else{
            var div1=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            });
            var div2=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            },[]);
            for(var i=1;i<data.childs.length;i++){
                div_c=h("div",{
                    class:"w-p-100 h-p-50 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                });
                div2.children.push(div_c);
            }
            div_p.children.push(div1);
            div_p.children.push(div2);
        }
    }else{
        if(data.attr.percent.length!==0){
            var div1=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:data.attr.percent[0],
                }
            });
            var div2=h("div",{
                class:"dis-flex box-size-bb bd-all-w-1 bd-all-s-solid bd-all-c-999999 flex-dir-c",
                style:{
                    flex:12-data.attr.percent[0],
                }
            },[]);
            var div2_1=h("div",{
                class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                style:{
                    flex:data.attr.percent[1],
                }
            },[]);
            var div2_2=h("div",{
                class:"dis-flex box-size-bb bd-all-w-1 bd-all-s-solid bd-all-c-999999 ",
                style:{
                    flex:12-data.attr.percent[1]|| 12-data.attr.percent[1],
                }
            },[]);
            for(var i=2;i<data.childs.length;i++){
                div_c=h("div",{
                    class:"bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        flex:data.attr.percent[i] || 12-data.attr.percent[2],
                    }
                });
                div2_2.children.push(div_c);
            }
            div2.children.push(div2_1);
            div2.children.push(div2_2);
            div_p.children.push(div1);
            div_p.children.push(div2);
        }else{
            var div1=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            });
            var div2=h("div",{
                class:"w-p-50 h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb dis-flex flex-dir-c",
            },[]);
            var div2_1=h("div",{
                class:"w-p-100 h-p-50 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
            },[]);
            var div2_2=h("div",{
                class:"w-p-100 h-p-50 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb dis-flex",
            },[]);
            for(var i=2;i<data.childs.length;i++){
                div_c=h("div",{
                    class:"h-p-100 bd-all-w-1 bd-all-s-solid bd-all-c-999999 box-size-bb",
                    style:{
                        width:100/(data.childs.length-2)+"%",
                    }
                });
                div2_2.children.push(div_c);
            }
            div2.children.push(div2_1);
            div2.children.push(div2_2);
            div_p.children.push(div1);
            div_p.children.push(div2);
        }
    }
    cls.push(div_p);
   return cls;
}


//数据对应的dom组成的一组dom(未绑定css数据的)
function getDoms(h, data) {
    var doms = [];
    // console.log(cssData);
    for (var i = 0; i < data.length; i++) {
        doms.push(getBaseDom(h, data[i]));
        // console.log(doms);
    }
    return doms;
}
