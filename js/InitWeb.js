//(function(doc,win){
//    var docEl = doc.documentElement,
//        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//        recalc = function() {
//            docEl.style.fontSize = 43 * (docEl.clientWidth / 3200) + 'px';
//        };
//    win.addEventListener(resizeEvt, recalc, false);
//    doc.addEventListener('DOMContentLoaded', recalc, false);
//})(document,window);
//重设onResize事件 使其能够监听div尺寸的变化
(function ($, h, c) {
    var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j + "-special-event",
        b = "delay", f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {w: l.width(), h: l.height()});
            if (a.length === 1) {
                g()
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i)
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false
            }
            var n;

            function m(s, o, p) {
                var q = $(this), r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments)
            }

            if ($.isFunction(l)) {
                n = l;
                return m
            } else {
                n = l.handler;
                l.handler = m
            }
        }
    };

    function g() {
        i = h[k](function () {
            a.each(function () {
                var n = $(this), m = n.width(), l = n.height(), o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l])
                }
            });
            g()
        }, e[b])
    }
})(jQuery, this);

function RemSetting(dom, scale) {
    if (!dom) {
        dom = document.documentElement;
    }
    if (scale === undefined) {
        scale = 1 / 12;
    }
    this.setRem = function (scale) {
        if (scale !== undefined && typeof scale === 'number' && !isNaN(scale)) {
            this.scale = scale;
        }
        var docEl = document.documentElement;
        let width;
        if (this.dom !== undefined) {
            //if (this.dom.offsetWidth < 1200) {
            //    width = 1500;
            //} else {
            //    width = this.dom.offsetWidth;
            //}
            width = this.dom.offsetWidth;
        }
        docEl.style.fontSize = width * this.scale + 'px';
    };
    this.setDom = function (dom) {
        var _this = this;
        if (dom !== this.dom) {
            this.dom = dom;
            this.setRem();
            $(this.dom).resize(function () {
                _this.setRem();
            });
        }
    };
    this.scale = scale;
    this.setDom(dom);
    //设置页面大小改变或横竖屏切换改变rem值
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, this.setRem, false);
}

