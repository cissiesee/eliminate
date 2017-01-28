/* app/reducers/items.js */
 
import Immutable from 'immutable';
import faker from 'faker';
import * as actionTypes from '../constants/actionTypes';

const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const colors = ['red', 'yellow', 'blue', 'green', 'orange'];
let itemColNum = 10;
let itemRowNum = 10;
let square = 30;
let selectItem = null;
let dragItem = null;

function generateItems() {
	let items = [];
	for (let col=0; col < itemColNum; col++) {
		for (let row=0; row < itemRowNum; row++) {
			let backgroundColor = faker.random.arrayElement(colors);
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
	let dragItem = items.find(function(item) {
			return item.id === originItem.id;
		}),
		overItem = items.find(function(item) {
			return item.id === destItem.id;
		});

	let originCol = dragItem.col,
		originRow = dragItem.row,
		destCol = overItem.col,
		destRow = overItem.row;

	dragItem.col = destCol;
	dragItem.row = destRow;
	overItem.col = originCol;
	overItem.row = originRow;
	return items;
}

function eliminateSameItems(items, key) {
	let eliminateItems = [], newItems = [];
	items.forEach(function(item) {
		if (eliminateItems.find(function(_item) {
			return item.col === _item.col && item.row === _item.row;
		})) {
			return;
		}
		let arrRight = detectItem(item, items, 'right', key);
		let arrLeft = detectItem(item, items, 'left', key);
		let hArr = arrLeft.concat([item]).concat(arrRight);

		let arrTop = detectItem(item, items, 'top', key);
		let arrBottom = detectItem(item, items, 'bottom', key);
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
	}
	return newItems;
}

function detectItem(item, items, direction, key, arr) {
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
		return detectItem(targetItem, items, direction, key, eArr);
	} else {
		return eArr;
	}
}

let _items = generateItems();
let items = eliminateSameItems(_items, 'backgroundColor');
let itemsInfo = Immutable.Map({itemColNum, itemRowNum, square, items, selectItem, dragItem});


export default function itemsInfo(state = itemsInfo, action) {
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
			let _items = swapItems(state.get('dragItem'), action.item, state.get('items'));
			let newState = state.set('items', _items);
			return newState.set('dragItem', null);
		}
		return state;
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