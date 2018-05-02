function getIconOrImg(h,data){
    switch (data.n){
        case "el":
            return createIconOrImg(h,getComData);
        case "img":
            return createIconOrImg(h,getComData);
        case "tx":
            return createIconOrImg(h,getComData);
        case "ta":
            return createIconOrImg(h,getComData);
        case "cf":
            return createIconOrImg(h,getComData);
        case "s":
            return createIconOrImg(h,getComData);
        case "btn":
            return createIconOrImg(h,getComData);
        case "d":
            return createIconOrImg(h,getComData);
        case "tm":
            return createIconOrImg(h,getComData);
        case "kv":
            return createIconOrImg(h,getComData);
        case "pop":
            return createIconOrImg(h,getComData);
        case "td":
            return createIconOrImg(h,getComData);
        case "dt":
            return createIconOrImg(h,getComData);
        case "cht":
            return createIconOrImg(h,getComData);
        case "gi":
            return createIconOrImg(h,getComData);
        case "r":
            return createIconOrImg(h,getComData);
        case "c":
            return createIconOrImg(h,getComData);
        case "gp":
            return createIconOrImg(h,getComData);
        case "tree":
            return createIconOrImg(h,getComData);
        case "nav":
            return createIconOrImg(h,getComData);
        case "li":
            return createIconOrImg(h,getComData);
        case "ct":
            return createIconOrImg(h,getComData);
        case "cd":
            return createIconOrImg(h,getComData);
        case "ev":
            return createIconOrImg(h,getComData);
        case "vid":
            return createIconOrImg(h,getComData);
        case "sd":
            return createIconOrImg(h,getComData);
        case "st":
            return createIconOrImg(h,getComData);
        case "sdt":
            return createIconOrImg(h,getComData);
        case "sl":
            return createIconOrImg(h,getComData);
        case "vc":
            return createIconOrImg(h,getComData);
        case "ci":
            return createIconOrImg(h,getComData);
        case "hd":
            return createIconOrImg(h,getComData);
        case "m":
            return createIconOrImg(h,getComData);
    }
}
function createIconOrImg(h,data){
    // console.log(data);
    // if( =="icon"){
    //     h("span",{
    //         domProps:{
    //             innerHTML:"span"
    //         }
    //     });
    // }else{
    //     h("span",{
    //         domProps:{
    //             innerHTML:"img"
    //         }
    //     });
    // }
}

//数据对应的dom组成的一组dom
function getBaseDoms(h,data){
    var doms = [];
    for(var i=0;i<data.length;i++){
        doms.push(getIconOrImg(h,data));
    }
    return doms;
}
