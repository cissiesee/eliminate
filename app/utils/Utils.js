let idCounter = 0;

function randomArray(arr) {
	if (arr instanceof Array) {
		let length = arr.length;
		let index = Math.floor(Math.random() * length);
		return arr[index];
	} else {
		console.error('arr should be array!');
	}
}

function findWhere(arr, obj) {
	if (arr instanceof Array) {
		if (typeof obj === 'function') {
			return arr.find(obj);
		} else if (typeof obj === 'object') {
			return arr.find(function(item) {
				let flag = true;
				for (let key in obj) {
					if (item[key] !== obj[key]) {
						flag = false;
						break;
					}
				}
				return flag;
			});
		}
	} else {
		console.error('arr should be array!');
	}
}

function uniqueId(prefix) {
	let id = ++idCounter;
	return prefix + '' + id;
}

function sortedIndexBy(sortedArr, sortObj, key) {
	let low = 0,
		high = sortedArr.length - 1;

	if (low === high) {
		throw new Error('sortedArr length must be more than 1!');
	}

	let position = isInRange([sortedArr[low][key], sortedArr[high][key]], sortObj[key]);

	//检测是否在范围之外
	if (position === 'left') {
		return low;
	} else if (position === 'right') {
		return high + 1;
	}

	//若在范围内，检测是否等于其中一项
	let matchIndex = sortedArr.findIndex(function(item) {
		return item[key] === sortObj[key];
	});

	if (matchIndex > -1) {
		return matchIndex;
	}

	//在范围内且不等于任何一项，使用两分法计算位置
	while(low < high) {
		let mid = Math.floor((high + low) / 2),
			rangeLow = [sortedArr[low][key], sortedArr[mid][key]],
			rangeHigh = [sortedArr[mid][key], sortedArr[high][key]],
			checkInRangeLow = isInRange(rangeLow, sortObj[key]),
			checkInRangeHigh = isInRange(rangeHigh, sortObj[key]);

		if (checkInRangeLow === true) {
			high = mid;
		} else if (checkInRangeHigh === true) {
			low = mid + 1;
		} else {
			let position = isInRange([sortedArr[low][key], sortedArr[high][key]], sortObj[key]);
			if (position === 'left') {
				return low - 1;
			} else if (position === 'right') {
				return high + 1;
			}
		}
	}

	return high;
}

function isInRange(range, num) {
	let order = (range[1] - range[0]) > 0 ? 0 : 1; //升序为0，降序为1
	if (order === 1) {
		if (num <= range[0] && num >= range[1]) {
			return true;
		} else if (num > range[0]) {
			return 'left';
		} else {
			return 'right';
		}
	} else {
		if (num >= range[0] && num <= range[1]) {
			return true;
		} else if (num < range[0]) {
			return 'left';
		} else {
			return 'right';
		}
	}
}

// var index = sortedIndexBy([{start: 3, end: 3}, {start: 5, end: 7}, {start: 9, end: 9}], {start: 4}, 'start');
// console.log(index);

export default {randomArray, findWhere, uniqueId, isInRange, sortedIndexBy};