new Vue({
    el: "#phone1",
    data: phoneData,
    methods: {
        confirmUse: function (e) {
            var parCount = this.addToParag.usePar;
            if (parCount >= phoneShow.ds.values.length) {
                parCount = phoneShow.ds.values.length - 1;
            } else if (parCount <= 0) {
                parCount = 0;
            }
            this.addToParag.callback(parCount);
            this.addToParag.isShow = false;
        },
        addKeyDown: function (e) {
            if (e.keyCode === 13) {
                this.confirmUse()
            }
        },
        cancelUse: function (e) {
            this.addToParag.isShow = false;
        }
    }
});