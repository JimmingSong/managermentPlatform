//css动态缓存样式
function cssDynaCache() {
    //css样式缓存方法
    var sheet = document.styleSheets[0];
    var cssRules = document.styleSheets[0].cssRules;
    //查找
    this.selectCss = function (cssName) {
        var flag = -1;
        if (cssRules.length !== 0 && cssRules !== undefined) {
            for (var i = 0; i < cssRules.length; i++) {
                var className = cssRules[i].selectorText.substr(1);
                if (cssName === className) {
                    flag = i;
                    break;
                }
            }
        }
        return flag;
    };
    //添加
    this.addCssRule = function (cssName, rules) {
        var index = this.selectCss(cssName);
        if (index === -1) {
            if (sheet.insertRule) {
                sheet.insertRule("." + cssName + "{" + rules + "}", cssRules.length);
            } else if (sheet.addRule) {
                sheet.addRule("." + cssName, rules, cssRules.length);
            }
        }
        // console.log(sheet.cssRules)
    };
    //删除
    this.removeCss = function (cssName) {
        var index = this.selectCss(cssName);
        if (index !== -1) {
            sheet.removeRule(index);
        }
    }

}