new Vue({
    el:"#com-model",
    data:comAndLayout,
    methods:{
        //设置默认插入位置的事件
        setPosition: function (e) {
            if (phoneShow.ds.values) {
                comAndLayout.parLength = phoneShow.ds.values.length;
            } else {
                comAndLayout.parLength = "0"
            }
            this.comPop.isShow = 0;
        },
        getPosition: function (e) {
            this.comPop.isShow = 1;
        },
        canPositon: function (e) {
            this.comPop.isShow = 1;
            console.log(this.data);
        },
        comClick:function (e) {
            e.preventDefault();
            clearClass("model-t");
            e.target.className = "model-t model-show";
            comAndLayout.lbshow = 0;
        },
        layClick:function (e) {
            clearClass("model-t");
            e.target.className = "model-t model-show";
            comAndLayout.lbshow = 1;
            // console.log(comAndLayout.layoutIsShow)
        },
        iconfont:function(e){
            clearClass("model-t");
            e.target.className = "model-t model-show";
            comAndLayout.lbshow = 2;
        },
        modelMClick:function (e) {
            clearClass("model-t");
            e.target.className = "model-t model-show";
            comAndLayout.lbshow = 3;
        },
        incIcon:function(e){
            var div=document.getElementsByClassName("showInput")[0];
            div.style.display="inline";
        },
        tureIcon:function(e){
            var div=document.getElementsByClassName("showInput")[0];
            div.style.display="none";
            console.log(comAndLayout.inceIcon);//增加的字体图标
        },
        falseIcon:function(e){
            var div=document.getElementsByClassName("showInput")[0];
            div.style.display="none";
        },
        delIcon:function(e){

        },
        searchIcon:function(e){
            if(e.keyCode==13){
                var sIcon = comAndLayout.icon.searchIconName;
                console.log(typeof(sIcon));
                if (sIcon === "") {
                    inquireIcon()
                } else {
                    inquireOneIcon(sIcon);
                }
            }
        }
    },
    renderLevel: 0
});

