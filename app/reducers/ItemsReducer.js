/* app/reducers/items.js */
 
import Immutable from "immutable";
import faker from "faker";
import * as actionTypes from "../constants/actionTypes";

const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const colors = ["red", "yellow", "blue", "green", "purple"];

function generateItems(itemColNum, itemRowNum, square) {
	let items = [];
	for (let col=0; col < itemColNum; col++) {
		for (let row=0; row < itemRowNum; row++) {
			let _colors = colors;
			let topItem = items.find(function(item) {
				return item.col === col && item.row === row - 1;
			});
			let leftItem = items.find(function(item) {
				return item.col === col - 1 && item.row === row;
			});
			if (topItem) {
				_colors = colors.filter(function(item) {
					return item !== topItem.backgroundColor;
				});
			}
			if (leftItem) {
				_colors = _colors.filter(function(item) {
					return item !== leftItem.backgroundColor;
				});
			}
			let backgroundColor = faker.random.arrayElement(_colors);
			items.push({
				id: faker.random.uuid(),
				//text: faker.random.arrayElement(alphabets),
				backgroundColor: backgroundColor,
				fontColor: (backgroundColor === 'yellow' ? '#000' : '#fff'),
				col: col,
				row: row,
				square: square
			});
		}
	}
	return items;
}

function swapItems(originItem, destItem, items) {
	let newItems = items.map(function(item) {
		let newItem = Object.assign({}, item);
		if (item.id === originItem.id) {
			newItem.col = destItem.col;
			newItem.row = destItem.row;
		} else if (item.id === destItem.id) {
			newItem.col = originItem.col;
			newItem.row = originItem.row;
		}
		return newItem;
	});
	return newItems;
}

//核心三消算法
function eliminateSameItems(items, key) {
	let eliminateItems = [], newItems = [];
	key = key || 'backgroundColor';
	items.forEach(function(item) {
		if (eliminateItems.find(function(_item) {
			return item.col === _item.col && item.row === _item.row;
		})) {
			return;
		}
		let arrRight = detectSameItem(item, items, 'right', key);
		let arrLeft = detectSameItem(item, items, 'left', key);
		let hArr = arrLeft.concat([item]).concat(arrRight);

		let arrTop = detectSameItem(item, items, 'top', key);
		let arrBottom = detectSameItem(item, items, 'bottom', key);
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
			let targetItem = eliminateItems.find(function(_item) {
				return _item.col === item.col && _item.row === item.row;
			});
			if (!targetItem) {
				newItems.push(item);
			}
		});
	} else {
		return false;
	}
	return newItems;
}

function detectSameItem(item, items, direction, key, arr) {
	let eArr = arr || [];
	let targetItem = items.find(function(_item) {
		switch(direction) {
		case 'right':
			return (_item.col === item.col + 1 && _item.row === item.row);
		case 'left':
			return (_item.col === item.col - 1 && _item.row === item.row);
		case 'top':
			return (_item.col === item.col && _item.row === item.row - 1);
		case 'bottom':
			return (_item.col === item.col && _item.row === item.row + 1);
		}
	});
	if (!targetItem) {
		return eArr;
	}
	if (targetItem[key] === item[key]) {
		eArr.push(targetItem);
		return detectSameItem(targetItem, items, direction, key, eArr);
	} else {
		return eArr;
	}
}

function calculateDropInfo(items, maxRow, maxCol) {
	let dropCols = []; //需下降元素填满空位的列s
	for(let col = 0; col < maxCol - 1; maxRow ++) {
		let dropStartRow, //空位前最后一个元素的行
			dropRow, //空位数量
			firstEmptyPosition = detectFirstEmpty(col, 0, items);

		if (firstEmptyPosition) { //该列有空位
			dropStartRow = firstEmptyPosition[1] ? firstEmptyPosition[1] - 1 : false;
			if (firstEmptyPosition[1] < maxRow - 1) { //第一个空位不在底部，继续查找空位后第一个元素
				let firstItemAfterEmpty = detectFirstItemAfterEmpty(firstEmptyPosition[0], firstEmptyPosition[1] + 1, items);
				if (!firstItemAfterEmpty) { //空位后无元素
					dropRow = maxRow - firstEmptyPosition[1] + 1;
				} else { //空位后有元素
					dropRow = firstItemAfterEmpty[1] - firstEmptyPosition[1];
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

function dropItems(dropCols, items) {
	dropCols.forEach(function(dropCol) {
		//有元素需要降落
		if (dropCol.dropStartRow) {
			let targetItems = items.find(function(item) {
				return item.row < dropStartRow;
			});
			targetItems.row += dropCol.dropRow;
		} else {

		}
	});

	let newItems = items.map(function(item) {
		let matchCol = dropCols.find(function(dropCol) {
			dropCol.col === item.col;
		});
		if (matchCol) { //元素在有空位的列
			if (matchCol.dropStartRow && item.row <= matchCol.dropStartRow) { //该元素所在行空位前有元素，且该元素在空位前
				//处理降落
				item.row += matchCol.dropRow;
			}
			//TODO 处理补位
		}
	});
}

function detectFirstEmpty(col, row, items) {
	if (row > itemRowNum - 1) {
		return false;
	}
	let targetItem = items.find(function(_item) {
		return _item.col === col && _item.row === row;
	});
	if (!targetItem) {
		return [col, row];
	}
	return detectFirstEmpty(col, row + 1, items);
}

function detectFirstItemAfterEmpty(col, row, items) {
	if (row > itemRowNum - 1) {
		return false;
	}
	let targetItem = items.find(function(_item) {
		return _item.col === col && _item.row === row;
	});
	if (targetItem) {
		return [col, row];
	}
	return detectFirstItemAfterEmpty(col, row + 1, items);
}

let itemsInfo = Immutable.Map({
	itemColNum: 10, 
	itemRowNum: 10, 
	square: 30,
	selectItem: null, 
	dragItem: null,
	lock: false,
	check: false
});
let originItems = generateItems(itemsInfo.get("itemColNum"), itemsInfo.get("itemRowNum"), itemsInfo.get("square"));
let newItemsInfo = itemsInfo.set("items", originItems);

export default function itemsInfo(state = newItemsInfo, action) {
	switch(action.type) {
	case actionTypes.ADD_ITEM:
		//TODO
		return state;
	case actionTypes.ADD_ITEMS:
		//TODO
		return state;
	case actionTypes.DELETE_ITEM:
		return state;
	case actionTypes.DELETE_ITEMS:
		return state;
	case actionTypes.DELETE_ROW:
		//TODO
		return state;
	case actionTypes.DELETE_ALL:
		return state;//.clear();
	case actionTypes.DRAG_ITEM:
		return state.set('dragItem', action.item);
	case actionTypes.DRAGOVER_ITEM:
		if (state.get('dragItem')) {
			//TODO swap result dosen't meet tree eliminate then return *last state*
			let _items = swapItems(state.get('dragItem'), action.item, state.get('items'));
			if (!eliminateSameItems(_items)) {
				return state.set('dragItem', null);
			}
			return state.set('items', _items).set('dragItem', null).set('lock', true).set('check', true);
		}
		return state;
	case actionTypes.CHECK_ITEMS:
		let _items = eliminateSameItems(state.get('items'));
		if (!_items) {
			return state.set('check', false).set('lock', false);
		}
		return state.set('items', _items).set('check', false).set('lock', false);
	case actionTypes.STOP_DRAG:
		if (state.get('dragItem')) {
			return state.set('dragItem', null);
		}
		return state;
	case actionTypes.SELECT_ITEM:
		return state.set('selectItem', action.item);
	default:
		return state;
	}
}