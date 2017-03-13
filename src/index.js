class BinarySortedArray {

    constructor(arr, comparator) {
        arr = arr || []

        this.array = []
        this.compare = comparator || this._defaultCompare

        let length = arr.length,
            index = 0
        while (index < length) {
            this.insert(arr[index++])
        }
    }

    _defaultCompare = (a, b) => {
        if (a === b) return 0
        return a < b ? -1 : 1
    }

    getArray = () => this.array.slice()

    clear = () => {
        this.array = []
        return this
    }

    insert = (item) => {
        this.array.splice(this.indexOf(item, true), 0, item)
        return this
    }

    remove = (item) => {
        let index = this.indexOf(item)
        if (index >= 0) {
            this.array.splice(index, 1)
        }

        return this
    }

    slice = (start, end) => this.array.slice(start, end)

    indexOf = (item, returnPossiblePlace) => {
        let minIdx = 0,
            maxIdx = this.array.length - 1,
            currentIdx = 0,
            tmp = 0,
            compareResult

        while (minIdx <= maxIdx) {
            currentIdx = (minIdx + maxIdx) / 2 | 0
            tmp = currentIdx
            compareResult = this.compare(this.array[currentIdx], item)

            if (compareResult < 0) {
                minIdx = currentIdx + 1
                tmp++
            } else if (compareResult > 0) {
                maxIdx = currentIdx - 1
            } else {
                return currentIdx
            }
        }

        return returnPossiblePlace ? Math.max(tmp, 0) : -1
    }
}

if (typeof module === "object") module.exports = BinarySortedArray
else if (typeof define === "function" && define.amd) define(BinarySortedArray)
