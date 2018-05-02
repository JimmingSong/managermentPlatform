 /**
    *展示尺寸选择
    */
new Vue({
    el:"#show-size",
    data:showSize,
    methods:{
        selectPhoneType:function (e) {
            phoneTypeSel(showSize.phoneType);
        },
        writeMode:function (e) {
            e.target.className = "wm_btn wm_show";
            e.target.nextElementSibling.className = "wm_btn";
            switchShowEditMode(false);
        },
        previewMode:function (e) {
            e.target.previousElementSibling.className = "wm_btn";
            e.target.className = "wm_btn wm_show";
            switchShowEditMode(true);
            resetState();
            classAndData.rtShow = 1;
        },
        previewToBrow(){
            let id = phoneShow.id;
            let name = phoneShow.name || '';
            let tp = phoneShow.tp;
            if (id === "" || tp === "") {
                $.layer.alert("ID或TP不能为空哦！")
            } else {
                id = encodeURIComponent(id);
                window.open(`preview.html?id=${id}`);
                //location.href = `preview.html?id=${id}`
            }
        }
    }
});