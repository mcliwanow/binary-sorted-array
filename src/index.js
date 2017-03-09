let SortedArray = (function () {

const findPositionToInsert = (item, arr, comparator) => {
    let minIdx = 0
    let maxIdx = arr.length - 1
    let currentIdx = 0
    let tmp = 0
    let compareResult

    while (minIdx <= maxIdx) {
        currentIdx = (minIdx + maxIdx) / 2 | 0
        tmp = currentIdx
        compareResult = comparator(arr[currentIdx], item)

        if (compareResult < 0) {
            minIdx = currentIdx + 1
            tmp++
        } else if (compareResult > 0) {
            maxIdx = currentIdx - 1
        } else {
            return currentIdx
        }
    }

    return Math.max(tmp, 0)
}

const defaultCompare = (a, b) => {
    if (a === b) return 0
    return a < b ? -1 : 1
}

class SortedArray {

    constructor(arr, comparator) {
        arr = arr || []

        this.array = []
        this.compare = comparator || defaultCompare

        let length = arr.length,
            index = 0
        while (index < length) {
            this.insert(arr[index++])
        }
    }

    getArray = () => this.array.slice()

    insert = (item) => {
        this.array.splice(findPositionToInsert(item, this.array, this.compare), 0, item)
        return this
    }

    remove = (item) => {
        let index = this.search(item)
        if (index >= 0) {
            this.array.splice(index, 1)
        }

        return this
    }

    search = (item) => {
        let minIdx = 0
        let maxIdx = this.array.length - 1
        let currentIdx, compareResult
        while (minIdx <= maxIdx) {
            currentIdx = (minIdx + maxIdx) / 2 | 0
            compareResult = this.compare(this.array[currentIdx], item)

            if (compareResult < 0) {
                minIdx = currentIdx + 1
            } else if (compareResult > 0) {
                maxIdx = currentIdx - 1
            } else {
                return currentIdx
            }
        }

        return -1
    }

    // TODO: remove items (func)
    // TODO: range = (start, end) => {}
}

return SortedArray

}())

if (typeof module === "object") module.exports = SortedArray
if (typeof define === "function" && define.amd) define(SortedArray)