/**
 * 组件 / 布局 / 字体图标/模板
 */
Vue.component('com',{
    render: function (createElement) {
        var views = [];
        var div_p = createElement("div", {}, []);
        var comData = this.data.coms;
        var selDatas = this.data.selDataType;
        var div=createElement("div",{
            style:{
                marginLeft:"5px"
            }
        }, []);
        var select = createElement("select", {
            on: {
                change: function (e) {
                    var type = e.target.value;
                    inquireComDatasforType(type);
                }
            }
        }, []);
        selDatas.forEach(function (item) {
            var option = createElement("option", {
                attrs: {
                    value: item.tp
                },
                domProps: {
                    innerHTML: item.n
                }
            });
            select.children.push(option);
        });
        div.children.unshift(select);
        div_p.children.push(div);
        for(var i = 0;i<comData.length;i++){
            div_p.children.push(createComIcon(createElement, comData[i]));
        }
        return div_p;
    },
    props:['data']
});
//五种布局
Vue.component("layout", {
    functional: true,
    render: function(createElement, context) {
        var layoutNodes = [];
        var layData=context.props.data.lay;
        for(var i=0;i<layData.length;i++){
            layoutNodes.push(createLayIcon(createElement,layData[i]))
        }
        return layoutNodes;
    },
    props: ["data"]
});

//字体图标
Vue.component("icons",{
    render:function(createElement){
        var iconData=this.data.iconDatas;
        var vm=this;
        var div = createElement("div", {
            style: {
                height: "95%",
            }

        }, []);
        if(iconData!==null){
            iconData.map(function(item,index){
                var span=createElement("span",{
                    attrs:{
                      title:item.cn,
                    },
                    style:{
                        display:"inline-block",
                        width:"20%",
                        textAlign:"center",
                        fontFamily: "-iconfont !important",
                        fontStyle:"normal",
                        marginTop:"5px"
                    },
                    domProps:{
                        innerHTML:item.v||item
                    },
                    on:{
                        click:function(e){
                            comAndLayout.icon.iconData=item.v||item;
                            comAndLayout.icon.searchIconValue = item.v || item;
                            console.log(classAndData.b_data.comValue);
                            if(classAndData.b_data.comValue!==null){
                                if(classAndData.b_data.comValue.n){
                                    classAndData.b_data.comValue.n=comAndLayout.icon.iconData;
                                }else if(classAndData.b_data.comValue.v){
                                    classAndData.b_data.comValue.v=comAndLayout.icon.iconData;
                                }
                            }
                            inquireIcon();
                        }
                    }
                });
                div.children.push(span);
            });
        }
        return div;
    },
    props: ["data"]
});

// //容器
// Vue.component("containers",{
//     render:function(createElement){
//         var data=this.data.getContainersData[0];
//         var vNode;
//         vNode= createElement(" ",{
//             class: data.class?data.class:data.lo + data.css,
//             on:{
//                 dragstart:function() {
//                     comAndLayout.copyData=copyData(data);
//                     console.log(comAndLayout.copyData);
//                 }
//             }
//         },[]);
//         if(data.ilm.tp !== ""){
//             var cur_layout = getLayoutBaseData(data,data.chr,data.index.di);
//             vNode.data.class = cur_layout.p_cls;
//             var componentChildren = vNode.children;
//             for(var r = 0;r < componentChildren.length;r++){
//                 componentChildren[r].data.class = cur_layout.c_cls;
//                 componentChildren[r].data.style[cur_layout.c_style.k] = cur_layout.c_style.v
//             }
//         };
//         return vNode;
//
//
//     },
//     props:["data"],
// })

