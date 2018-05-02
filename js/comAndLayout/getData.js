function getDatas(tp){
           switch (tp){
               case "el":
                   return {
                       "k": "el", "n": "姓名：", "v": "宋计民", "tp": "el", "es": [], "cls": {
                           "k": "el-df", "css": "el-df-df", "lo": "", "dom": "", "sty": {
                               "cls": "", "chr": [{"cls": ""}]
                   }}};
                   break;
               case "img":
                   return {
                       "k": "img",
                       "n": "图片",
                       "v": "../images/logo.png",
                       "tp": "img",
                       "es": [],
                       "cls": {"k": "img-df", "css": "", "lo": "", "dom": "", "sty": {"cls": "", "chr": [{"cls": ""}]}}
                   };//图片
                   break;
               case "tx":
                   return {
                       "k": "tx",
                       "n": "用户名:|手机号或邮箱",
                       "tp": "tx",
                       "v": "",
                       "es": [],
                       "cls": {
                           "k": "tx-df",
                           "css": "",
                           "dom": "",
                           "sty": {
                               "cls": "dis-flex flex-js-center flex-align-center box-size-bb pd-a-r-0_1",
                               "chr": [{
                                   "cls": "dis-flex flex-js-center flex-grow-1 col-rem-3",
                                   "chr": [{"cls": ""}]
                               }, {
                                   "cls": "dis-flex flex-js-center flex-grow-2",
                                   "chr": [{"cls": "bd-all-r-3px h-r-1 w-p-100"}]
                               }]
                           }
                       }
                   };//文本框
                   break;
               case "ta":
                   return {"k":"ta","n":"请发表你的评论:|200字以上","tp":"ta","v":"","es":[],"cls":{"k":"ta-df","css":"","lo":"","dom":""}};//文本区
                   break;
               case "cf":
                   return {"k":"cf","tp":"cf","v":["../images/weixin.jpg","../images/zhihu.png","../images/wangzhe.png"],"es":[],"cls":{"k":"cf-df","css":"","lo":"","dom":""}};
                   break;
               case "s":
                   return {"k":"s","n":"搜索","tp":"s","v":"","es":[],"cls":{"k":"s-df","css":"","lo":"","dom":""}};//搜索框
                   break;
               case "btn":
                   return {"k":"btn","n":"xiala","tp":"btn","v":"","es":[],"cls":{"k":"btn-df","css":"","lo":"","dom":""}};//按钮-图标按钮
                    break;
               case "d":
                   return {"k":"d","n":"日期","tp":"d","v":"","es":[],"cls":{"k":"d-df","css":"","lo":"","dom":""}};//日期选择器
                   break;
               case "tm":
                   return  {"k":"tm","n":"时间","tp":"tm","v":"","es":[],"cls":{"k":"tm-df","css":"","lo":"","dom":""}};//时间选择器
                   break;
               case "kv":
                   return {
                       "k": "kv",
                       "n": "姓名上海辅昊实业有限公司|请选择地址",
                       "v": "展开|收起",
                       "tp": "kv",
                       "es": [],
                       "l": "",
                       "cls": {
                           "k": "kv-df",
                           "sty": {"cls": "", "chr": [{"cls": ""}, {"cls": ""}]},
                           "css": "",
                           "dom": ""
                       }
                   };//k-v
                    break;
               case "pop":
                    return {"k":"pop","n":"mui是一个好框架？","tp":"pop","btns":"否|是|投诉|关注","es":[],"v":"","cls":{"k":"pop-df","css":"","lo":"","dom":""}};//弹出框
                   break;
               case "td":
                   return {"k":"td","n":"周末事务安排表","tp":"td",
                       "v":[{"bt":"09:00","et":"10:00","msg":"学习vue!"},
                           {"bt":"10:00","et":"11:00","msg":"读书!"},
                           {"bt":"09:00","et":"10:00","msg":"学习vue!上海辅昊实业有限公司"}
                       ],"cls":{"k":"td-df","css":"","lo":"","dom":""}};//进度表（事务安排表）
                   break;
               case "dt":
                   return {"k":"dt","n":"日期时间","tp":"dt","v":"","es":[],"cls":{"k":"dt-df","css":"","lo":"","dom":""}};//时间选择器
                   break;
               case "cht":
                   return {"k":"cht","tp":"cht","es":[],"show":true,"seled":[],
                       "ops":[
                           {"id":"myself","n":"我自己","h":"../images/5_s.jpg","t":"1512518400000","msg":"上海辅昊实业有限公司","f":"基础样式展示..docx"},
                           {"id":"yourself","n":"她","h":"../images/5_s.jpg","t":"1512518430000","img":"../images/weixin.jpg","f":"基础样式展示..docx"},
                           {"id":"yourself","n":"她","h":"../images/5_s.jpg","t":"1512736833056","f":"基础样式展示..docx","vid":"http://192.168.1.103:8186/FuHaoServer/images/birds.mp4"},
                           {"id":"yourself","n":"她","h":"../images/5_s.jpg","t":"1512736833056","msg":"上海辅昊实业有限公司","f":"基础样式展示..docx"},
                       ],
                       "cls":{"k":"cht-df","css":"","lo":"","dom":""}
                   };//聊天列表
                   break;
               case "gi":
                   return {"id":"gi","tp":"gi","n":"QQ","img":"../images/qq.png","es":[],"cls":{"k":"gi-df","css":"","lo":"","dom":""}};//gi 弹出框
                   break;
               case "r":
                   return {"k":"r","tp":"r","n":"性别:","ops":[{"k":"man","v":"男"},{"k":"woman","v":"女"},{"k":"woman","v":"女"},{"k":"woman","v":"女"}],"v":"","es":[],"cls":{"k":"r-df","css":"","lo":"","dom":""}};//单选
                   break;
               case "c":
                   return {"k":"c","tp":"c","n":"爱好:","ops":[{"k":"basketball","v":"打篮球"},{"k":"basketball","v":"打篮球"},{"k":"swim","v":"游泳"}],"v":[],"es":[],"cls":{"k":"c-df","css":"","lo":"","dom":""}};//双选
                   break;
               case "gp":
                   return {"tp":"gp","ops":[{"id":"qq","tp":"gi","n":"qq","img":"../images/qq.png","es":[],"cls":{"k":"gp-df","css":"","lo":"","dom":""}},//弹出框
                       {"id":"weixin","tp":"gi","n":"微信","img":"../images/weixin.jpg","es":[],"cls":{"css":"","lo":"","dom":""}},
                       {"id":"taobao","tp":"gi","n":"淘宝","img":"../images/taobao.jpg","es":[],"cls":{"css":"","lo":"","dom":""}},
                       {"id":"appstore","tp":"gi","n":"app store","img":"../images/appstore.png","es":[],"cls":{"k":"gp-df","css":"","lo":"","dom":""}},
                       {"id":"eleme","tp":"gi","n":"饿了么","img":"../images/eleme.jpg","es":[],"cls":{"css":"","lo":"","dom":""}},
                       {"id":"eleme1","tp":"gi","n":"王者荣耀","img":"../images/wangzhe.png","es":[],"cls":{"k":"gp-df","css":"","lo":"","dom":""}},
                       {"id":"eleme2","tp":"gi","n":"知乎","img":"../images/zhihu.png","es":[],"cls":{"css":"","lo":"","dom":""}}
                   ],"cls":{"k":"gp-df","css":"","lo":"","dom":""}};//gp
                   break;
               case "tree":
                   return {
                       //"open":true,
                       "k":"tree",
                       "tp":"tree",
                       "num": 2,
                       "ops": [
                           {
                               "num": 2,
                               "ops": [
                                   {"name":"web"},
                                   {"name":"Vue"}
                               ],
                               "name": " 本地磁盘C",
                           },
                           {
                               "num": 2,
                               "ops": [
                                   {"name":"user"},
                                   {"name":"window"}
                               ],
                               "name": "本地磁盘D",
//				            "id": "/45815640/45818741/45819027/46361482"
                           }
                       ],
                       "name": "我的电脑",
                       "cls":{"k":"tree-df","css":"","lo":"","dom":""}
//					    "id": "/45815640/45818741/45819027/46361482"
                   };//tree
                   break;
               case "nav":
                   return {"k":"nav","tp":"nav","vs":[
                       {"n":"首页","id":"","icn":"&#xe6d9;","es":[{"k":"click","v":""}]},
                       {"n":"鱼塘","id":"","icn":"&#xe6d9;","es":[]},
                       {"n":"发布","id":"","icn":"&#xe6e5;","es":[]},
                       {"n":"消息","id":"","icn":"&#xe639;","es":[]},
                       {"n":"我的","id":"","icn":"&#xe610;","es":[]}
                   ],"cls":{"k":"nav-df","css":"","lo":"","dom":""}};//导航栏
                   break;
               case "li":
                   return {
                       "id":"",
                       "img":"../images/taidi.jpg",
                       "n":"泰迪",
                       "tm":new Date(),
                       "abs":"这是一只又懒又臭又蠢的泰迪这是一只又懒又臭又蠢的泰迪这是一只又懒又臭又蠢的泰迪这是一只又懒又臭又蠢的泰迪这是一只又懒又臭又蠢的泰迪这是一只又懒又臭又蠢的泰迪",
                       "k":"关键字",
                       "tp":"li",
                       "icns":[{"k":"btn","n":"提交","tp":"btn","v":"","es":[{"k":"pop"}]}],
                       "es":[],
                       "cls":{"k":"li-df","css":"","lo":"","dom":""}
                   };
                   break;
               case "ct":
                   return  {"k":"ct","tp":"ct","n":"&#xe61e;","v":"ct.v","es":[],"cls":{"k":"ct-df","css":"","lo":"","dom":""}};
                   break;
               case "cd":
                   return  {"k":"cd","n":"距离结束","tp":"cd","v":"1598486005000","es":[],"cls":{"k":"cd-df","css":"","lo":"","dom":""}};//倒计时
                   break;
               case "ev":
                    return {"k":"ev","tp":"ev","n":"","v":"","es":[],"cls":{"k":"ev-df","css":"","lo":"","dom":""}};//评价
                   break;
               case "vid":
                   return  {"k":"vid","n":"图片","v":"../images/birds.mp4","tp":"vid","es":[],"cls":{"k":"vid-df","css":"","lo":"","dom":""}};//video  视频播放
                   break;
               case "sd":
                   return {"k":"sd","n":"日期","tp":"sd","v":"1598486005000","es":[],"cls":{"k":"sd-df","css":"","lo":"","dom":""}};//时间显示 年月日
                   break;
               case "st":
                   return {"k":"st","n":"日期","tp":"st","v":"1598486005000","es":[],"cls":{"k":"st-df","css":"","lo":"","dom":""}};//时间显示 时分秒
                   break;
               case "sdt":
                   return {"k":"sdt","n":"日期","tp":"sdt","v":"1598486005000","es":[],"cls":{"k":"sdt-df","css":"","lo":"","dom":""}};//时间显示  年月日 时分秒
                   break;
               case "sl":
                    return {"k":"sl","n":"城市","v":"","ops":[
                        {"k":"ruirui","v":"锐锐","ops":[
                            {"k":"guyue","v":"顾越"}
                        ]},
                        {"k":"xiaosong","v":"小宋"}
                    ],"tp":"sl","es":[],"cls":{"k":"sl-df","css":"","lo":"","dom":""}};
                    break;
               case "vc":
                   return  {"k":"vc","tp":"vc","n":"请输入验证码","v":"","num":4,"es":[],"cls":{"k":"vc-df","css":"","lo":"","dom":""}};//验证码
                   break;
               case "ci":
                   return {"k":"ci","n":"按住说话","tp":"ci","v":"","es":[],"cls":{"k":"ci-df","class":"","lo":"","dom":""}};//聊天输入
                   break;
               case "hd":
                   return {"k":"hd","tp":"hd","ops":[{"v":"../images/logo.png"}, {"v":"../images/logo.png"},{"v":"../images/logo.png"}],"cls":{"k":"hd-df","class":"","lo":"","dom":""}};
                   break;
               case "m":
                   return {"k":"m","tp":"m","n":"首页","id":"","ops":[{"k":"click","msg":"今天"},{"k":"click","msg":"明天"}],"cls":{"k":"m-df","class":"","lo":"","dom":""}};
                   break;
           }

          var data = [
              /*{"k":"tree","n":"","tp":"tree","ops":[{"k":"","v":[{"k":"btn","tp":"btn","es":[]},{"k":"kv-1","tp":"kv","v":"维森集团"},{"k":"kv-1","tp":"kv","v":""}],"num":"3","ops":[{"k":"","v":[{"k":"btn","tp":"btn","es":[]},{"k":"kv-1","tp":"kv","v":"维森集团"}]}]}]}//树*/
              // {"k":"hn","tp":"hn","ops":["啦啦啦","啦啦啦","啦啦啦","啦啦啦"],"cls":{"lo":"","dom":"","css":""},"es":[]}
          ];
    // if(tp){
    //     data = data.filter(function(e){
    //         return tp === e.tp;
    //     })[0];
    // }
    return data;
}
//默认的数据（data的缺省值）
function getDefaultData(data){
    switch (data.tp){
        case "img":
            return {"n":"这是一张图片","v":"img/weixin.jpg","es":[]};//图片
        case "tx":
            return {"n":"请输入查找的关键字","v":"","es":[]};//文本框
        case "ta":
            console.log("11");
            return {"n":"请发表评论:|200字以上","v":"","es":[]};//文本区
        case "s":
            return {"n":"请输入搜索内容","v":"","es":[]};//搜索框
        case "btn":
            return {"n":"xiala","v":"","es":[{"k":"pop"}]};//按钮-图标按钮
        case "d":
            return {"n":"日期","v":"","es":[]};//日期选择器
        case "tm":
            return {"n":"时间","v":"","es":[]};//时间选择器
        case "kv":
            return {"n":"姓名:","v":"XXXXXX有限公司","es":[]};//k-v
        case "pop":
            return {"n":"mui是一个好框架？","btns":"否|是","es":[],"v":""}; //弹出框
        case  "td":
            return {"n":"XX安排表", "v":[{"bt":"00:00","et":"23:59","msg":"XXXXXXX有限公司"}]};//进度表（事务安排表）
        case "dt":
            return {"n":"日期时间","v":"","es":[]};//时间选择器
        case "cht":
            return {"n":"昵称为XXX","es":[],"img":"img/5_s.jpg", "ops":[{"t":new Date(),"msg":"XXXXX有限公司"}]};//聊天列表
        case "gi":
            return {"n":"XXX","img":"img/weixin.jpg","es":[]};//gi
        case "rc":
            return {"n":"选择：","ops":["XX","XX"],"v":"","es":[]};//单双选
        case "gp":
            return {"ops":[{"id":"qq","tp":"gi","n":"qq","img":"img/qq.png","es":[]}]};//gp 弹出框
        case "tree":
            return {"n":"","ops":[{"k":"","v":[{"es":[]},{"v":"维森集团"},{"v":""}],"num":"3","ops":[{"v":[{"es":[]},{"v":"维森集团"}]}]}]};//树
    }
}
