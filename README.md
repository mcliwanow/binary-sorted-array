# Binary Sorted Array #

An array sorted using binary search algorithm. Binary search is used when calling `indexOf` or `insert` (to find position in the array where the item should be inserted).

[![Build Status](https://travis-ci.org/mcliwanow/binary-sorted-array.svg?branch=master)](https://travis-ci.org/mcliwanow/binary-sorted-array)

## Installation ##

There are 2 options:

1. Download `lib/index.js` file
2. use npm `npm i --save binary-sorted-array`

## Usage ##

Basic usage example

```javascript
import BinarySortedArray from './index'
let array = new BinarySortedArray([1, 5, 6, 3, 5, 1])
array.insert(0.99)
array.remove(3)
array.indexOf(6)
let sortedArray = array.getArray()
array.clear()
```

Example with objects and custom compare function

```javascript
import BinarySortedArray from './index'
let compare = (a, b) => {
    if (a.start === b.start) return 0
    return a.start < b.start ? -1 : 1
}
let array = new BinarySortedArray([
    { id: 1, start: 1.123, title: 'some item'},
    { id: 2, start: 5, title: 'another item'},
    { id: 3, start: 6.89, title: 'yet another item'},
    { id: 4, start: 3.99 },
    { id: 5, start: 5 },
    { id: 6, start: 1.121 },
], comparator)
array.insert({ start: 0.99 })
array.remove({ id: 4, start: 3.99 })
array.indexOf({ start: 5 })
let sortedArray = array.getArray()
array.clear()
```

### Documentation ###

#### new BinarySortedArray(arr: Array, compare: function)  ####

Constructor takes 2 parameters and if given array is not empty sorts the array during initialization.

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>**`arr`**</td>
<td>Array of items</td>
<td>`[]`</td>
</tr>
<tr>
<td>**`compare`**</td>
<td>Function comparing array items. Check default value for example</td>
<td>
<pre lang="javascript">
(a, b) => {
    if (a === b) return 0
    return a < b ? -1 : 1
}
</pre>
</td>
</tr>
</tbody>
</table>

#### `.getArray()` ####

Returns copy of sorted array

#### `.insert(item)` ####

Adds a new item to the array in the proper position

#### `.indexOf(item, returnPossiblePlace)` ####

Returns index of the item or -1 if it doesn't exist in the array. If `returnPossiblePlace` is set to `true` instead of -1 it returns a place in the array where the item could be placed (watch out - you don't know if the item is in the array in this case!)

#### `.remove(item)` ####

Removes first found `item` for which `compare` function (see **`constructor`**) returns 0

#### `.clear()` ####

Clears the array
