//展示组件图标
function createComIcon(h,data) {
    // console.log(data);
    var arr = h("div",{
        class:"w-p-50 dis-in-block",
        attrs:{
            draggable:"true"
        },
        on:{
            dragstart:function () {
                // comAndLayout.dragTemnpData= getDatas(data.n);
                // console.log(comAndLayout.dragTemnpData);
                //请求此渲染对象数据及数据数据
                inquireRenderAndData(data.k);
                console.log(typeof(data.k));
            }
        }
    },[
        h("span",{
            style: {
                display: "block"
            },
            domProps:{
                innerHTML: data.n
            }
        })
    ]);
    return arr;
}
//展示布局图标
function createLayIcon(h,data){
    var arr=h("div",{
        class:"w-p-45 dis-in-block tx-align-center pd-all-r-0_3 pd-a-r-0_3",
        attrs:{
            draggable:"true"
        },
        on:{
            dragstart:function () {
                comAndLayout.dragTemnpData = getLayoutData(data.n);
                console.log(comAndLayout.dragTemnpData);
            }
        }
    },[
        h("span",{
            domProps:{
                innerHTML:data.k
            }
        })
    ]);
    return arr;
}