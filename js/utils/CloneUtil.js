(function () {
    var toString = Object.prototype.toString, gObj = {}, cloneHelper = function (cache, item) {
        /// <summary>helper for Utils.clone</summary>
        if ('object' == typeof item || Utils.isFunction(item)) {
            for (var i = cache.length - 2; i >= 0; i -= 2) {
                if (cache[i] == item)
                    return cache[i + 1]
            }
            cache.push(item, item = Utils.clone(item, cache))
        }
        return item
    };
    window.Utils = {
        isFunction: function (it) {
            /// <summary>判断参数是否为Function</summary>
            /// <param name="it" type="Object">待判断的参数</param>
            /// <returns type="Boolean" />
            return toString.call(it) == '[object Function]';
        },
        clone: function (obj, cache) {
            /// <summary>克隆一个对象</summary>
            /// <param name="o" type="Object">要克隆的目标对象</param>
            /// <returns type="Object" />
            cache || (cache = []);
            var clone, temp;
            if (!obj || (!Utils.isFunction(obj) && typeof obj != 'object')) return o;
            else if (obj.cloneNode) return o.cloneNode(true);//克隆DOM节点，绑定事件的有问题，暂不处理
            else if (Utils.isFunction(obj)) clone = new Function('return ' + obj)(); //克隆function eval在当前作用域，Funtion在全局
            else clone = (temp = obj.constructor, clone = new temp(obj.valueOf()), obj == clone) ? new temp() : clone; //克隆其它对象，通过识别复制后的对象与原对象是否相同来决定传不传参数，像数组是不能传参数的
            cache.push(obj, clone);
            for (temp in obj) if (gObj.hasOwnProperty.call(obj, temp)) clone[temp] = cloneHelper(cache, obj[temp]);//使用gObj.hasOwnProperty 防止对象obj重写了hasOwnProperty方法
            return clone
        }
    }
}());