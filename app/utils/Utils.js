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

export default {randomArray, findWhere, uniqueId};