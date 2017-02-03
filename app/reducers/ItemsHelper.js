import Utils from '../utils/Utils';

const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const originColors = ['red', 'yellow', 'blue', 'green', 'purple'];

function _getRandomElement(itemInfo) {
	let item = Object.assign({
		id: Utils.uniqueId('ele-')
		//text: Utils.randomArray(alphabets),
	}, itemInfo);
	if (!item.backgroundColor) {
		item.backgroundColor = Utils.randomArray(originColors);
	}
	if (!item.fontColor) {
		item.fontColor = item.backgroundColor === 'yellow' ? '#000' : '#fff';
	}
	return item;
}

function _getSupplementRowIndex(items, col) {
	let targetItems = items.filter(function(item) {
		return item.col === col && item.row < 0;
	});
	return - targetItems.length - 1;
}

function _detectSameItem(item, items, direction, key, arr) {
	let eArr = arr || [], query;
	switch(direction) {
	case 'right':
		query = {row: item.row, col: item.col + 1};
		break;
	case 'left':
		query = {row: item.row, col: item.col - 1};
		break;
	case 'top':
		query = {row: item.row - 1, col: item.col};
		break;
	case 'bottom':
		query = {row: item.row + 1, col: item.col};
		break;
	}
	let targetItem = Utils.findWhere(items, query);
	if (!targetItem) {
		return eArr;
	}
	if (targetItem[key] === item[key]) {
		eArr.push(targetItem);
		return _detectSameItem(targetItem, items, direction, key, eArr);
	} else {
		return eArr;
	}
}

function _detectEmptyAfterElement(row, col, items, maxRow) {
	if (row > maxRow - 1) {
		return false;
	}
	let targetItem = Utils.findWhere(items, {row, col});
	if (!targetItem) {
		return {row, col};
	}
	return _detectEmptyAfterElement(row + 1, col, items, maxRow);
}

function _detectElementAfterEmpty(row, col, items, maxRow) {
	if (row > maxRow - 1) {
		return false;
	}
	let targetItem = Utils.findWhere(items, {row, col});
	if (targetItem) {
		return {row, col};
	}
	return _detectElementAfterEmpty(row + 1, col, items, maxRow);
}

export function generateInitialItems(itemRowNum, itemColNum, square) {
	let items = [];
	for (let row = 0; row < itemRowNum; row++) {
		for (let col = 0; col < itemColNum; col++) {
			let colors = originColors;
			let leftItem = Utils.findWhere(items, {row, col: col - 1});
			let topItem = Utils.findWhere(items, {row: row - 1, col});
			if (leftItem) {
				colors = originColors.filter(function(item) {
					return item !== leftItem.backgroundColor;
				});
			}
			if (topItem) {
				colors = colors.filter(function(item) {
					return item !== topItem.backgroundColor;
				});
			}
			let backgroundColor = Utils.randomArray(colors);
			let newItem = _getRandomElement({
				backgroundColor: backgroundColor,
				col: col,
				row: row,
				square: square
			});
			//console.log(newItem);
			items.push(newItem);
		}
	}
	return items;
}

//交换元素
export function swapItems(originItem, destItem, items) {
	let newItems = items.map(function(item) {
		let newItem = Object.assign({}, item);
		if (item.id === originItem.id) {
			newItem.row = destItem.row;
			newItem.col = destItem.col;
		} else if (item.id === destItem.id) {
			newItem.row = originItem.row;
			newItem.col = originItem.col;
		}
		return newItem;
	});
	return newItems;
}

//核心三消算法
export function eliminateSameItems(items, key) {
	let eliminateItems = [], newItems = [];
	key = key || 'backgroundColor';
	items.forEach(function(item) {
		if (Utils.findWhere(eliminateItems, {row: item.row, col: item.col})) {
			//已通过之前的递归算法将该元素收入待消除队列，则无需再次递归计算
			return;
		}
		let arrRight = _detectSameItem(item, items, 'right', key);
		let arrLeft = _detectSameItem(item, items, 'left', key);
		let hArr = arrLeft.concat([item]).concat(arrRight);

		let arrTop = _detectSameItem(item, items, 'top', key);
		let arrBottom = _detectSameItem(item, items, 'bottom', key);
		let vArr = arrTop.concat([item]).concat(arrBottom);

		if (hArr.length >= 3) {
			eliminateItems = eliminateItems.concat(hArr);
			//console.log('item:', item, ',', 'horizontal must be eliminate ' + hArr.length);
		}

		if (vArr.length >= 3) {
			eliminateItems = eliminateItems.concat(vArr);
			//console.log('item:', item, ',', 'vertical must be eliminate ' + vArr.length);
		}
	});
	//console.log(eliminateItems);
	if (eliminateItems.length) {
		items.forEach(function(item) {
			let targetItem = Utils.findWhere(eliminateItems, {row: item.row, col: item.col});
			if (!targetItem) { //不是待消除元素则保留该元素
				newItems.push(item);
			} else { //是待消除元素则在该列顶部补位
				newItems.push(_getRandomElement({
					row: _getSupplementRowIndex(newItems, item.col),
					col: item.col,
					square: item.square
				}));
			}
		});
	} else {
		return false;
	}
	return newItems;
}

export function getDropCols(items, maxRow, maxCol) {
	let dropCols = []; //需下降元素填满空位的列s
	for(let col = 0; col < maxCol; col++) {
		let dropStartRow, //空位前最后一个元素的行
			dropRow, //空位数量
			firstEmptyPosition = _detectEmptyAfterElement(0, col, items, maxRow);

		if (firstEmptyPosition) { //该列有空位
			dropStartRow = firstEmptyPosition.row;
			if (firstEmptyPosition.row < maxRow - 1) { //第一个空位不在底部，继续查找空位后第一个元素
				let firstItemAfterEmpty = _detectElementAfterEmpty(firstEmptyPosition.row + 1, firstEmptyPosition.col, items, maxRow);
				if (!firstItemAfterEmpty) { //空位后无元素
					dropRow = maxRow - firstEmptyPosition.row + 1;
				} else { //空位后有元素
					dropRow = firstItemAfterEmpty.row - firstEmptyPosition.row;
				}
			} else { //第一个空位在底部
				dropRow = 1;
			}
		} else { //该列无空位
			dropRow = 0;
		}
		if (dropRow) {
			dropCols.push({col, dropStartRow, dropRow});
		}
	}
	return dropCols;
}

export function dropItems(dropCols, items) {
	let newItems = items.map(function(item) {
		let matchCol = Utils.findWhere(dropCols, {col: item.col});
		let newItem = Object.assign({}, item);
		if (matchCol) { //元素在有空位的列
			if (item.row < matchCol.dropStartRow) { //该元素在空位前
				//处理降落
				newItem.row += matchCol.dropRow;
			}
		}
		return newItem;
	});
	return newItems;
}
