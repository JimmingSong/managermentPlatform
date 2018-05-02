/**
 * Created by Jillian on 2018/2/10.
 */
var IP = location.hostname, port = location.port;
var baseUrl = "http://" + IP + ":" + port + "/";
function initView() {
    /*
     * ajax调用
     * */
    //请求所有页面

    // 请求所有组件
    inquireAllComs();
    //请求所有数据类型
    inquireAllDataType();
    //请求所有字体图标
    inquireIcon();
    //基础类的键值
    gain();
    gain1();
    for (var i = 0; i < localStorage.length; i++) {
        var id = localStorage.key(i);
        var pageD = localStorage.getItem(id);
        if (isJson(pageD)) {
            pageD = JSON.parse(localStorage.getItem(id));
            if (pageD.hasOwnProperty("ds") && pageD.hasOwnProperty("rs") && pageD.hasOwnProperty("st")) {
                idList.id.push(localStorage.key(i))
            }
        }
    }
}
