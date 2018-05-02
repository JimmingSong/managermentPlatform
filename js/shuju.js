var aa={
    "id": "测试页面1",
    "tp": "show",
    "name": "show",
    "ds": {
    "a": "",
        "con": {},
    "l": "0",
        "values": [{
        "name": "",
        "es": ["a"],
        "a": "",
        "l": "0",
        "values": [
            {"k": "kv", "n": "姓名|地址", "v": "展开|收起", "tp": "kv", "es": [], "l": "0", "rl": 0},
            {"k": "kv", "n": "姓名|地址", "v": "展开|收起", "tp": "kv", "es": [], "l": "1,0", "rl": 0}
            ]
    }],
        "index": {
        "datas": {},
        "waitp": {}
    }
},
    "rs": {
    "d1": {
        "k": "kv-df", "css": "", "dom": "",
        "es": [
            {"click": [
                {"tg": "d2", "bh": {"css": {"cls": "", "children": [{"cls": "bg-bbbbbb"}, {"cls": ""}]}}}
                ]
            }
        ],
        "sty": {"cls": "", "children": [{"cls": "bc-42f7ca"}, {"cls": "bc-42f7ca"}]}
    },
    "d2": {
        "k": "kv-df",
            "css": "",
            "dom": "",
            "es": [{
            "click": [{
                "tg": "",
                "bh": {
                    "css": {
                        "cls": "",
                        "children": [{
                            "cls": "bg-bbbbbb"
                        },
                            {
                                "cls": ""
                            }
                        ]
                    }
                }
            }]
        }],
            "sty": {
            "cls": "",
                "children": [{
                "cls": "bc-42f7ca"
            },
                {
                    "cls": "bc-42f7ca"
                }
            ]
        }
    }
},
    "st": {
    "chr": [{
        "lo": "",
        "css": "d-f jc-c w-100--p bw-1--x bs-s bdc-aaaaaa h-10--r",
        "ilm": {
            "t": "",
            "atr": ""
        },
        "index": {
            "ri": {
                "tx": {
                    "d": ["d1", "d2"],
                    "rls": [{
                        "tp": "order2",
                        "scope": "",
                        "isLoop": 1,
                        "isReciprocate": 0
                    }]
                },
                "kv": {
                    "d": ["d1"],
                    "rls": [{
                        "tp": "order2",
                        "isLoop": 1,
                        "scope": {
                            "start": 0,
                            "end": 2
                        },
                        "isReciprocate": 0,
                        "count": 1
                    }, {
                        "tp": "order1",
                        "scope": [0, 1, 2],
                        "isLoop": 1,
                        "isReciprocate": 1,
                        "count": 1
                    }, {
                        "tp": "ifChoice",
                        "other": "stData_sfhowehjgwh.k == 'tm'",
                        "resultTrue": 4,
                        "resultFalse": 0
                    }, {
                        "tp": "switchChoice",
                        "other": "stData_sfhowehjgwh.k",
                        "resultMap": [{
                            "value": "tx-d-0",
                            "index": 0
                        }, {
                            "value": "tx-d-1",
                            "index": 1
                        }, {
                            "value": "tx-d-2",
                            "index": 2
                        }]
                    }]
                }
            }
        },
        "chr": [{
            "lo": "",
            "css": "d-f jc-c w-50--p bw-1--x bs-s bdc-aaaaaa",
            "ilm": {
                "t": "",
                "atr": ""
            },
            "index": {
                "ri": {
                    "kv": {
                        "d": ["d2"],
                        "rls": [{
                            "tp": "order2",
                            "scope": {
                                "start": 0,
                                "end": 2
                            },
                            "isLoop": 1,
                            "isReciprocate": 0
                        }]
                    }
                }
            },
            "es": [],
            "chr": []
        }]
    }, {
        "lo": "",
        "css": "d-f jc-c w-100--p bw-1--x bs-s bdc-aaaaaa h-10--r",
        "ilm": {
            "t": "",
            "atr": ""
        },
        "index": {
            "ri": {
                "tx": ["d1"],
                "kv": {
                    "d": ["d2"],
                    "rls": [{
                        "tp": "order1",
                        "isLoop": 1,
                        "isReciprocate": 0
                    }]
                }
            }
        },
        "chr": [{
            "lo": "",
            "css": "d-f jc-c w-50--p bw-1--x bs-s bdc-aaaaaa",
            "ilm": {
                "t": "",
                "atr": ""
            },
            "index": {
                "ri": {
                    "tx": {
                        "d": ["d1", "d2"],
                        "rls": [{
                            "tp": "order2",
                            "scope": "",
                            "isLoop": 1,
                            "isReciprocate": 0
                        }]
                    },
                    "kv": {
                        "d": ["d1"],
                        "rls": [{
                            "tp": "order2",
                            "isLoop": 1,
                            "scope": {
                                "start": 0,
                                "end": 2
                            },
                            "isReciprocate": 0,
                            "count": 1
                        }, {
                            "tp": "order1",
                            "scope": [0, 1, 2],
                            "isLoop": 1,
                            "isReciprocate": 1,
                            "count": 1
                        }, {
                            "tp": "ifChoice",
                            "other": "stData_sfhowehjgwh.k == 'tm'",
                            "resultTrue": 4,
                            "resultFalse": 0
                        }, {
                            "tp": "switchChoice",
                            "other": "stData_sfhowehjgwh.k",
                            "resultMap": [{
                                "value": "tx-d-0",
                                "index": 0
                            }, {
                                "value": "tx-d-1",
                                "index": 1
                            }, {
                                "value": "tx-d-2",
                                "index": 2
                            }]
                        }]
                    }
                }
            },
            "es": [],
            "chr": [],
            "l": "1,0"
        }]
    }, {
        "lo": "",
        "css": "d-f jc-c w-100--p bw-1--x bs-s bdc-aaaaaa h-10--r",
        "ilm": {
            "t": "",
            "atr": ""
        },
        "index": {
            "ri": {
                "tx": ["d1"],
                "kv": {
                    "d": ["d2"],
                    "rls": [{
                        "tp": "order1",
                        "isLoop": 1,
                        "isReciprocate": 0
                    }]
                },
                "df": ["d1"]
            }
        },
        "chr": [{
            "lo": "",
            "css": "d-f jc-c bw-1--x w-50--p bs-s bdc-aaaaaa",
            "ilm": {
                "t": "",
                "atr": ""
            },
            "l": "2,0",
            "index": {
                "ri": {
                    "tx": ["d1"],
                    "kv": ["d2"]
                }
            },
            "es": [],
            "chr": []
        }]
    }]
}
}