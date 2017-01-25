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
				id: 'e' + col + row,
				text: faker.random.arrayElement(alphabets),
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

let items = generateItems();
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