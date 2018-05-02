//样式顺序
//1.位置属性(position, top, right, z-index, display, float,padding, margin等)
//2.大小(width, height)
//3.文字系列(font, line-height, letter-spacing, color,text-align等)
//4.背景(background, border等)
//5.其他(animation, transition等)
function getCssData () {
    var cssData = [
        {
            "k":"el-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {"cls": ""},
                    {"cls": ""}
                ]
            }
        },
        {
            "k":"img-df",
            "v":{
                "cls":"mg-t-r-0_7",
                "children":[
                    {"cls":""}
                ]
            }
        },
        {
            "k":"tx-df",
            "v":{
                "cls": "dis-flex flex-js-center flex-align-center box-size-bb pd-a-r-0_1 mg-t-r-0_7",
                "children": [
                    {
                        "cls": "dis-flex flex-js-center flex-grow-1 col-rem-3",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "dis-flex flex-js-center flex-grow-2",
                        "children": [
                            {
                                "cls": "bd-all-r-3px h-r-1 w-p-100"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"ta-df",
            "v":{
                "cls": "dis-flex mg-a-r-0_2 mg-t-r-0_7",
                "children": [
                    {
                        "cls": "dis-flex flex-js-center flex-align-center",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "dis-flex w-r-6",
                        "children": [
                            {
                                "cls": "w-p-100 h-r-2 bd-all-r-3px"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"cf-df",
            "v":{
                "cls": "w-p-100 h-r-8 of-hidden-x mg-t-r-0_7",
                "children": [
                    {
                        "cls": "h-p-100",
                        "children": [
                            {
                                "cls": "h-p-100 fl-left",
                                "children": [
                                    {
                                        "cls": "w-p-100 "
                                    }
                                ]
                            },
                            {
                                "cls": "h-p-100 fl-left",
                                "children": [
                                    {
                                        "cls": "w-p-100"
                                    }
                                ]
                            },
                            {
                                "cls": "h-p-100 fl-left",
                                "children": [
                                    {
                                        "cls": "w-p-100"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        //搜索框
        {
            "k":"s-df",
            "v":{
                "cls": "dis-flex mg-t-r-0_7",
                "children": [
                    {
                        "cls": " w-p-100 h-p-100",
                        "children": [
                            {
                                "cls": "w-p-100 h-p-100"
                            }
                        ]
                    },
                    {
                        "cls": "dis-flex",
                        "children": [
                            {
                                "cls": "bgc-efad4d w-r-1_5 h-r-0_9 iconfont"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"btn-df",
            "v":{
                "cls": "dis-flex flex-align-center mg-t-r-0_7",
                "children": [
                    {
                        "cls": "w-r-2 h-r-1 font-size-0_5"
                    }
                ]
            }
        },
        //日期组
        {
            "k":"d-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "mg-t-r-0_7",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        //时间组
        {
            "k":"tm-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    }
                ]
            }
        },
        //kv组
        {
            "k":"kv-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    }
                ]
            }
        },
        {
            "k":"pop-df",
            "v":{
                "cls": "w-r-6 h-r-3 font-size-0_5 bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all mg-t-r-0_7",
                "children": [
                    {
                        "cls": "w-r-6 h-r-1 line-hg-r-1 tx-align-center"
                    },
                    {
                        "cls": "dis-flex flex-js-center flex-align-center h-r-1 line-hg-r-1 bd-b-s-solid bd-b-w-1 box-size-bb",
                        "children": [
                            {
                                "cls": "w-p-60 h-p-40 font-size-0_4"
                            }
                        ]
                    },
                    {
                        "cls": "pop-btn-2 h-r-1 font-weight-bold",
                        "children": [
                            {
                                "cls": "fl-left w-p-45 h-r-1 line-hg-r-1 tx-align-center bd-r-s-solid bd-r-w-1"
                            },
                            {
                                "cls": "fl-right w-p-45 h-r-1 line-hg-r-1 tx-align-center"
                            }
                        ]
                    }
                ]
            }
        },
        //进度表
        {
            "k":"td-df",
            "v":{
                "cls": "font-size-0_8 bd-all-w-1 bd-b-s-solid bd-all-r-3px of-hidden-all mg-t-r-0_7",
                "children": [
                    {
                        "cls": "dis-flex flex-js-center flex-align-center bgc-5bc0de"
                    },
                    {
                        "cls": "font-size-0_6",
                        "children": [
                            {
                                "cls": "dis-flex flex-align-center bd-t-w-1 bd-t-s-solid",
                                "children": [
                                    {
                                        "cls": "tx-align-center w-p-50 bgc-42f7ca",
                                        "children": [
                                            {
                                                "cls": ""
                                            },
                                            {
                                                "cls": ""
                                            },
                                            {
                                                "cls": ""
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "dis-in-block w-p-50 bgc-efad4d of-omit"
                                    }
                                ]
                            },
                            {
                                "cls": "dis-flex flex-align-center bd-t-w-1 bd-t-s-solid",
                                "children": [
                                    {
                                        "cls": "tx-align-center w-p-50 bgc-42f7ca",
                                        "children": [
                                            {
                                                "cls": ""
                                            },
                                            {
                                                "cls": ""
                                            },
                                            {
                                                "cls": ""
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "dis-in-block w-p-50 bgc-efad4d of-omit"
                                    }
                                ]
                            },
                            {
                                "cls": "dis-flex flex-align-center bd-t-w-1 bd-t-s-solid",
                                "children": [
                                    {
                                        "cls": "tx-align-center w-p-50 bgc-42f7ca",
                                        "children": [
                                            {
                                                "cls": ""
                                            },
                                            {
                                                "cls": ""
                                            },
                                            {
                                                "cls": ""
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "dis-in-block w-p-50 bgc-efad4d of-omit"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        //日期时间组
        {
            "k":"dt-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    }
                ]
            }
        },
        //聊天列表
        {
            "k":"cht-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "font-size-0_5 box-size-bb",
                        "children": [
                            {
                                "cls": "dis-flex flex-js-center"
                            },
                            {
                                "cls": "dis-flex",
                                "children": [
                                    {
                                        "cls": "",
                                        "children": [
                                            {
                                                "cls": ""
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "dis-flex flex-grow-1",
                                        "children": [
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-0_45"
                                                    },
                                                    {
                                                        "cls": "",
                                                        "children": [
                                                            {
                                                                "cls": ""
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "cls": "w-r-1 h-r-1",
                                                "children": [
                                                    {
                                                        "cls": "w-p-100 h-p-100 bd-all-r-half"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        //gi
        {
            "k":"gi-df",
            "v":{
                "cls": " dis-flex flex-dir-c mg-a-r-0_2 w-p-50 mg-t-r-0_7",
                "children": [
                    {
                        "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                        "children": [
                            {
                                "cls": "dis-block mg-a-r-center w-p-100"
                            }
                        ]
                    },
                    {
                        "cls": "tx-align-center font-size-0_5"
                    }
                ]
            }
        },
        //单选框
        {
            "k":"r-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": "",
                                "children": [
                                    {
                                        "cls": ""
                                    },
                                    {
                                        "cls": ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"c-df",
            "v":{
                "cls":"dis-flex mg-t-r-0_7",
                "children":[
                    {
                        "cls":"",
                        "children":[
                            {"cls":""}
                        ]
                    },
                    {
                        "cls":"",
                        "children":[
                            {
                                "cls":"",
                                "children":[
                                    {"cls":""},
                                    {"cls":""}
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        //gp
        {
            "k":"gp-df",
            "v":{
                "cls": "w-r-10_5 h-r-104 bd-all-r-10px pd-t-r-0_2 pd-b-r-0_2 mg-a-r-center bcg-color-gray float-ctf mg-t-r-0_7",
                "children": [
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    },
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left mg-t-r-0_7",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    },
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left mg-t-r-0_7",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    },
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left mg-t-r-0_7",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    },
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left mg-t-r-0_7",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    },
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left mg-t-r-0_7",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    },
                    {
                        "k": "gi-df",
                        "v": {
                            "cls": "dis-flex flex-dir-c mg-a-r-0_5 w-r-2_5 h-r-3 fl-left mg-t-r-0_7",
                            "children": [
                                {
                                    "cls": "dis-flex flex-js-center flex-align-center bd-all-w-1 bd-all-s-solid bd-all-r-8px of-hidden-all",
                                    "children": [
                                        {
                                            "cls": "dis-block mg-a-r-center w-r-2_5"
                                        }
                                    ]
                                },
                                {
                                    "cls": "tx-align-center font-size-0_5 of-hidden-all"
                                }
                            ]
                        }
                    }
                ]
            }
        },//gp
        //tree(树)
        {
            "k":"tree-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": "",
                                "children": [
                                    {
                                        "cls": ""
                                    },
                                    {
                                        "cls": ""
                                    },
                                    {
                                        "cls": ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"nav-df",
            "v":{
                "cls": "dis-flex pd-t-r-0_2 pd-b-r-0_2 flex-js-ar mg-t-r-0_7",
                "children": [
                    {
                        "cls": "tx-align-center cursor-pointer",
                        "children": [
                            {
                                "cls": "iconfont nab-show pd-a-r-0_2 w-r-1_5 dis-in-block font-size-1 bgc-efad4d bd-all-r-8px"
                            },
                            {
                                "cls": "font-size-0_5"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"li-df",
            "v":{
                "cls": "w-p-100 dis-flex font-size-0_6 margin-pst-top-8p pd-a-r-0_1 bd-all-w-1 bd-b-s-solid bd-all-r-8px box-size-bb mg-t-r-0_7",
                "children": [
                    {
                        "cls": "w-p-30 tx-align-center",
                        "children": [
                            {
                                "cls": "w-p-100 h-p-100"
                            }
                        ]
                    },
                    {
                        "cls": "w-p-70 pd-l-r-0_2 pd-r-r-0_2",
                        "children": [
                            {
                                "cls": "dis-flex flex-js-ar flex-align-center",
                                "children": [
                                    {
                                        "cls": "mg-r-r-0_2"
                                    },
                                    {
                                        "cls": "font-size-0_4"
                                    }
                                ]
                            },
                            {
                                "cls": "w-p-100 font-size-0_5 of-auto-y"
                            },
                            {
                                "cls": "dis-flex of-hidden-all mg-t-r-0_1 flex-align-center",
                                "children": [
                                    {
                                        "cls": "dis-in-flex flex-js-center flex-align-center w-p-40"
                                    },
                                    {
                                        "cls": "dis-flex flex-js-center-end w-p-60 pd-r-r-0_3 box-size-bb",
                                        "children": [
                                            {
                                                "cls": "pd-a-r-0_2 bgc-5bc0de"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"ct-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"cd-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"ev-df",
            "v":{
                "cls": "mg-t-r-0_7"
            }
        },
        {
            "k":"vid-df",
            "v":{
                "cls":"w-p-100 mg-t-r-0_7",
                "children":[
                    {"cls":"w-p-100"}
                ]
            }
        },
        {
            "k":"sd-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"st-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"sdt-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            }
                        ]
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"sl-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": ""
                    },
                    {
                        "cls": "",
                        "children": [
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            },
                            {
                                "cls": ""
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"vc-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    }
                ]
            }
        },
        {
            "k":"ci-df",
            "v":{
                "cls": "pst-style-fx pst-left-0 pst-bottom-0 w-p-100 mg-t-r-0_7",
                "children": [
                    {
                        "cls": "dis-flex flex-js-ar bgc-cccccc pd-a-r-0_2",
                        "children": [
                            {
                                "cls": "flex-grow-1 font-size-1 bd-all-w-1 bd-b-s-solid bd-all-c-aaaaaa bd-all-r-6px tx-align-center font-c-666666"
                            },
                            {
                                "cls": "w-p-70 bd-all-w-1 bd-b-s-solid bd-all-c-aaaaaa bd-all-r-6px"
                            },
                            {
                                "cls": "flex-grow-1 font-size-1 bd-all-w-1 bd-b-s-solid bd-all-c-aaaaaa bd-all-r-6px tx-align-center font-c-666666"
                            }
                        ]
                    },
                    {
                        "cls": "bgc-dddddd",
                        "children": [
                            {
                                "cls": "dis-flex flex-js-ar",
                                "children": [
                                    {
                                        "cls": "",
                                        "children": [
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-2"
                                                    }
                                                ]
                                            },
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-0_7"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "",
                                        "children": [
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-2"
                                                    }
                                                ]
                                            },
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-0_7"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "",
                                        "children": [
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-2"
                                                    }
                                                ]
                                            },
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-0_7"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "cls": "",
                                        "children": [
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-2"
                                                    }
                                                ]
                                            },
                                            {
                                                "cls": "",
                                                "children": [
                                                    {
                                                        "cls": "font-size-0_7"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"hd-df",
            "v":{
                "cls": "w-r-5 dis-flex flex-wrap-wrap h-r-5 flex-align-center mg-t-r-0_7",
                "children": [
                    {
                        "cls": "dis-flex flex-js-ar w-p-100",
                        "children": [
                            {
                                "cls": "mg-a-r-0_2 h-p-100"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "k":"m-df",
            "v":{
                "cls": "mg-t-r-0_7",
                "children": [
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    },
                    {
                        "cls": ""
                    }
                ]
            }
        },
        // {
        //     "k":"hn-df",
        //     "v":{
        //         "cls": "",
        //         "children": [
        //             {
        //                 "cls": ""
        //             }
        //         ]
        //     }
        // },
    ];
    //if(type){
    //	cssData = cssData.filter(function(e){
    //		return type == (e.k.substr(0,type.length));
    //	})[0];
    //}
    return cssData;
}
