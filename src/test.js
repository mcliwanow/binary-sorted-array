import BinarySortedArray from './index'

test('initialize simple', () => {
    let array = new BinarySortedArray([1, 5, 6, 3, 5, 1])
    let sortedArray = array.getArray()
    let expectedArray = [1, 1, 3, 5, 5, 6]

    expect(sortedArray.length).toBe(expectedArray.length)
    expectedArray.forEach((num, idx) => {
        expect(sortedArray[idx]).toBe(num)
    })
})

test('insert simple', () => {
    let array = new BinarySortedArray([1, 2, 3, 5, 6, 7, 8, 9, 10, 11])
    let elementToInsert = 4
    array.insert(elementToInsert)
    let sortedArray = array.getArray()
    expect(sortedArray[3]).toBe(elementToInsert)

    elementToInsert = 0.99
    array.insert(elementToInsert)
    sortedArray = array.getArray()
    expect(sortedArray[0]).toBe(elementToInsert)

    elementToInsert = 1.2
    array.insert(elementToInsert)
    sortedArray = array.getArray()
    expect(sortedArray[2]).toBe(elementToInsert)

    elementToInsert = 100
    array.insert(elementToInsert)
    sortedArray = array.getArray()
    expect(sortedArray[sortedArray.length - 1]).toBe(elementToInsert)
})

test('remove simple', () => {
    let originalArray = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]
    let array = new BinarySortedArray(originalArray)
    let elementToRemove = 4
    array.remove(elementToRemove)
    let sortedArray = array.getArray()
    expect(sortedArray.length).toBe(originalArray.length)
    originalArray.forEach((num, idx) => {
        expect(sortedArray[idx]).toBe(num)
    })

    elementToRemove = 6
    expect(sortedArray[4]).toBe(6)
    array.remove(elementToRemove)
    sortedArray = array.getArray()
    expect(sortedArray.length).toBe(originalArray.length - 1)
    expect(sortedArray[4]).toBe(7)
})

test('indexOf simple', () => {
    let originalArray = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]
    let array = new BinarySortedArray(originalArray)
    let sortedArray = array.getArray()
    expect(sortedArray.length).toBe(originalArray.length)

    sortedArray = array.clear().getArray()
    expect(sortedArray.length).toBe(0)
})

test('slice', () => {
    let array = new BinarySortedArray([2, 5, 7, 1, 3, 4, 6, 8, 9, 10])
    let items = array.slice(1, 4)
    expect(items.length).toBe(3)
    expect(items[0]).toBe(2)
    expect(items[1]).toBe(3)
    expect(items[2]).toBe(4)
})

test('clear', () => {
    let originalArray = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11]
    let array = new BinarySortedArray(originalArray)
    expect(array.indexOf(4)).toBe(-1)
    expect(array.indexOf(12)).toBe(-1)
    expect(array.indexOf(1.4)).toBe(-1)
    originalArray.forEach((num, idx) => {
        expect(array.indexOf(num)).toBe(idx)
    })
})

test('initialize with objects', () => {
    let comparator = (a, b) => {
        if (a.start === b.start) return 0
        return a.start < b.start ? -1 : 1
    }
    let array = new BinarySortedArray([
        { id: 1, start: 1.123, title: 'some item'},
        { id: 2, start: 5, title: 'some item'},
        { id: 3, start: 6.89, title: 'some item'},
        { id: 4, start: 3.99, title: 'some item'},
        { id: 5, start: 5, title: 'some item'},
        { id: 6, start: 1.121, title: 'some item'},
    ], comparator)
    let sortedArray = array.getArray()
    let expectedArray = [
        { id: 6, start: 1.121, title: 'some item'},
        { id: 1, start: 1.123, title: 'some item'},
        { id: 4, start: 3.99, title: 'some item'},
        { id: 2, start: 5, title: 'some item'},
        { id: 5, start: 5, title: 'some item'},
        { id: 3, start: 6.89, title: 'some item'},
    ]

    expect(sortedArray.length).toBe(expectedArray.length)
    expectedArray.forEach((elem, idx) => {
        expect(sortedArray[idx].start).toBe(elem.start)
    })
})

test('insert with objects', () => {
    let comparator = (a, b) => {
        if (a.start === b.start) return 0
        return a.start < b.start ? -1 : 1
    }
    let originalArray = [
        { id: 1, start: 1.123, title: 'some item'},
        { id: 2, start: 1.125, title: 'some item'},
        { id: 3, start: 2, title: 'some item'},
        { id: 4, start: 3, title: 'some item'},
        { id: 5, start: 4.444, title: 'some item'},
        { id: 6, start: 5.111, title: 'some item'},
        { id: 7, start: 6, title: 'some item'},
        { id: 8, start: 7, title: 'some item'},
        { id: 9, start: 8.23, title: 'some item'},
    ]
    let array = new BinarySortedArray(originalArray, comparator)
    let elementToInsert = { id: 123, start: 4, title: 'new item' }
    array.insert(elementToInsert)
    let sortedArray = array.getArray()
    expect(sortedArray[4]).toBe(elementToInsert)

    elementToInsert = { id: 1231, start: 0.99, title: 'new item' }
    array.insert(elementToInsert)
    sortedArray = array.getArray()
    expect(sortedArray[0]).toBe(elementToInsert)

    elementToInsert = { id: 1231, start: 1.124, title: 'new item' }
    array.insert(elementToInsert)
    sortedArray = array.getArray()
    expect(sortedArray[2]).toBe(elementToInsert)

    elementToInsert = { id: 121, start: 123, title: 'new item' }
    array.insert(elementToInsert)
    sortedArray = array.getArray()
    expect(sortedArray[sortedArray.length - 1]).toBe(elementToInsert)
})

test('remove with objects', () => {
    let comparator = (a, b) => {
        if (a.start === b.start) return 0
        return a.start < b.start ? -1 : 1
    }
    let originalArray = [
        { id: 1, start: 1.123, title: 'some item'},
        { id: 2, start: 1.125, title: 'some item'},
        { id: 3, start: 2, title: 'some item'},
        { id: 4, start: 3, title: 'some item'},
        { id: 5, start: 4.444, title: 'some item'},
        { id: 6, start: 5.111, title: 'some item'},
        { id: 7, start: 6, title: 'some item'},
        { id: 8, start: 7, title: 'some item'},
        { id: 9, start: 8.23, title: 'some item'},
    ]
    let array = new BinarySortedArray(originalArray, comparator)
    let elementToRemove = { id: 123, start: 4, title: 'new item' }
    array.remove(elementToRemove)
    let sortedArray = array.getArray()
    expect(sortedArray.length).toBe(originalArray.length)
    originalArray.forEach((num, idx) => {
        expect(sortedArray[idx]).toBe(num)
    })

    elementToRemove = { id: 123, start: 4.444, title: 'new item' }
    expect(sortedArray[4].id).toBe(5)
    array.remove(elementToRemove)
    sortedArray = array.getArray()
    expect(sortedArray.length).toBe(originalArray.length - 1)
    expect(sortedArray[4].id).toBe(6)
})

test('indexOf with objects', () => {
    let comparator = (a, b) => {
        if (a.start === b.start) return 0
        return a.start < b.start ? -1 : 1
    }
    let originalArray = [
        { id: 1, start: 1.123, title: 'some item'},
        { id: 2, start: 1.125, title: 'some item'},
        { id: 3, start: 2, title: 'some item'},
        { id: 4, start: 3, title: 'some item'},
        { id: 5, start: 4.444, title: 'some item'},
        { id: 6, start: 5.111, title: 'some item'},
        { id: 7, start: 6, title: 'some item'},
        { id: 8, start: 7, title: 'some item'},
        { id: 9, start: 8.23, title: 'some item'},
    ]
    let array = new BinarySortedArray(originalArray, comparator)
    expect(array.indexOf({ id: 1, start: 4, title: 'some item'})).toBe(-1)
    expect(array.indexOf({ id: 1, start: 12, title: 'some item'})).toBe(-1)
    expect(array.indexOf({ id: 1, start: 1.124, title: 'some item'})).toBe(-1)
    originalArray.forEach((num, idx) => {
        expect(array.indexOf(num)).toBe(idx)
    })
})
