/**
 * Created by Jillian on 2018/3/1.
 */

function dsDeal(ds) {
    this.ds = ds;
    /**
     * 增加段
     * @param parag
     * @param index
     */
    this.addParag = function (parag, index) {
        var _this = this;
        if (!parag) {
            return;
        }
        if (index === undefined || index > _this.ds.values.length) {
            dataTreeParse.parseParag(parag);
            _this.ds.values.push(parag);
            return;
        } else if (index < 0) {
            index = 0;
        }
        _this.ds.values.splice(index, 0, parag);
        dataTreeParse.parseParag(parag);
    };
    /**
     * 根据地址删除段
     * @param index
     */
    this.deleteParagForIndex = function (index) {
        var _this = this;
        parag = _this.ds.values[index];
        if (parag === undefined) {
            return;
        }
        dataTreeParse.wipeParag(parag);
        delete _this.ds.values[index];
    };
    /**
     * 根据段数据删除段
     * @param parag
     */
    this.deleteParag = function (parag) {
        var _this = this;
        var index = _this.ds.values.indexOf(parag);
        if (parag === undefined || parag === null || index === -1) {
            return;
        }
        if (parag === undefined) {
            return;
        }
        dataTreeParse.wipeParag(parag);
        delete _this.ds.values[index];
    };
    /**
     * 更新段数据
     * @param newParag
     * @param index
     */
    this.updateParag = function (newParag, index) {
        this.deleteParagForIndex(index);
        this.addParag(newParag, index);
    };
    /**
     * 增加组件数据
     * @param cData
     * @param parag
     * @param index
     */
    this.addcData = function (cData, parag, index) {
        var _this = this;
        if (parag === undefined || parag === null) {
            return;
        }
        if (!parag.values) {
            parag.values = [];
        }
        dataTreeParse.parseComponent(cData);
        if (index === undefined || index > parag.values.length) {
            parag.values.push(cData);
            return;
        } else if (index < 0) {
            index = 0;
        }
        parag.values.splice(index, 0, cData);
    };
    /**
     * 删除组件数据
     * @param cData
     */
    this.deletecData = function (cData) {
        var _this = this;
        if (cData === undefined || cData === null) {
            return;
        }
        _this.ds.values.forEach(function (parag) {
            var index = parag.values.indexOf(cData);
            if (index !== -1) {
                dataTreeParse.wipeComponent(cData);
                parag.values.splice(index, 1);
                return parag;
            }
        })
    };
    /**
     * 更新组件数据
     * @param cData
     * @param n_cData
     */
    this.updateCData = function (cData, n_cData) {
        var _this = this;
        if (cData === undefined || cData === null) {
            return;
        }
        if (n_cData === undefined || n_cData === null) {
            return;
        }
        _this.ds.values.forEach(function (parag) {
            var index = parag.values.indexOf(cData);
            if (index !== -1) {
                dataTreeParse.wipeComponent(cData);
                dataTreeParse.parseComponent(n_cData);
                parag.values[index] = n_cData;
            }
        })
    };
}