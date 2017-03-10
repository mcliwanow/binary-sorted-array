"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinarySortedArray = function BinarySortedArray(arr, comparator) {
    _classCallCheck(this, BinarySortedArray);

    _initialiseProps.call(this);

    arr = arr || [];

    this.array = [];
    this.compare = comparator || this._defaultCompare;

    var length = arr.length,
        index = 0;
    while (index < length) {
        this.insert(arr[index++]);
    }
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this._defaultCompare = function (a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    };

    this.getArray = function () {
        return _this.array.slice();
    };

    this.clear = function () {
        _this.array = [];
        return _this;
    };

    this.insert = function (item) {
        _this.array.splice(_this.indexOf(item, true), 0, item);
        return _this;
    };

    this.remove = function (item) {
        var index = _this.indexOf(item);
        if (index >= 0) {
            _this.array.splice(index, 1);
        }

        return _this;
    };

    this.indexOf = function (item, returnPossiblePlace) {
        var minIdx = 0,
            maxIdx = _this.array.length - 1,
            currentIdx = 0,
            tmp = 0,
            compareResult = void 0;

        while (minIdx <= maxIdx) {
            currentIdx = (minIdx + maxIdx) / 2 | 0;
            tmp = currentIdx;
            compareResult = _this.compare(_this.array[currentIdx], item);

            if (compareResult < 0) {
                minIdx = currentIdx + 1;
                tmp++;
            } else if (compareResult > 0) {
                maxIdx = currentIdx - 1;
            } else {
                return currentIdx;
            }
        }

        return returnPossiblePlace ? Math.max(tmp, 0) : -1;
    };
};

if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") module.exports = BinarySortedArray;
if (typeof define === "function" && define.amd) define(BinarySortedArray);