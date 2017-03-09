"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SortedArray = function () {

    var findPositionToInsert = function findPositionToInsert(item, arr, comparator) {
        var minIdx = 0;
        var maxIdx = arr.length - 1;
        var currentIdx = 0;
        var tmp = 0;
        var compareResult = void 0;

        while (minIdx <= maxIdx) {
            currentIdx = (minIdx + maxIdx) / 2 | 0;
            tmp = currentIdx;
            compareResult = comparator(arr[currentIdx], item);

            if (compareResult < 0) {
                minIdx = currentIdx + 1;
                tmp++;
            } else if (compareResult > 0) {
                maxIdx = currentIdx - 1;
            } else {
                return currentIdx;
            }
        }

        return Math.max(tmp, 0);
    };

    var defaultCompare = function defaultCompare(a, b) {
        if (a === b) return 0;
        return a < b ? -1 : 1;
    };

    var SortedArray =

    // TODO: remove items (func)
    // TODO: range = (start, end) => {}
    function SortedArray(arr, comparator) {
        _classCallCheck(this, SortedArray);

        _initialiseProps.call(this);

        arr = arr || [];

        this.array = [];
        this.compare = comparator || defaultCompare;

        var length = arr.length,
            index = 0;
        while (index < length) {
            this.insert(arr[index++]);
        }
    };

    var _initialiseProps = function _initialiseProps() {
        var _this = this;

        this.getArray = function () {
            return _this.array.slice();
        };

        this.insert = function (item) {
            _this.array.splice(findPositionToInsert(item, _this.array, _this.compare), 0, item);
            return _this;
        };

        this.remove = function (item) {
            var index = _this.search(item);
            if (index >= 0) {
                _this.array.splice(index, 1);
            }

            return _this;
        };

        this.search = function (item) {
            var minIdx = 0;
            var maxIdx = _this.array.length - 1;
            var currentIdx = void 0,
                compareResult = void 0;
            while (minIdx <= maxIdx) {
                currentIdx = (minIdx + maxIdx) / 2 | 0;
                compareResult = _this.compare(_this.array[currentIdx], item);

                if (compareResult < 0) {
                    minIdx = currentIdx + 1;
                } else if (compareResult > 0) {
                    maxIdx = currentIdx - 1;
                } else {
                    return currentIdx;
                }
            }

            return -1;
        };
    };

    return SortedArray;
}();

if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") module.exports = SortedArray;
if (typeof define === "function" && define.amd) define(SortedArray);