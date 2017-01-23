/* app/reducers/items.js */
 
import Immutable from 'immutable';
import faker from 'faker';
import {ADD_ITEM, ADD_ITEMS, DELETE_ITEM, DELETE_ITEMS, DELETE_ROW, FILTER_ITEM, DELETE_ALL, DRAG_ITEM} from '../constants/actionTypes';

let alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function generateItems() {
	var items = [];
	for (let col=0; col < 10; col++) {
		for (let row=0; row < 10; row++) {
			items.push({
				id: 'e' + col + row,
				text: faker.random.arrayElement(alphabets),
				color: faker.fake("{{commerce.color}}"),
				col: col, row: row
			});
		}
	}
	return items;
}
const initialItems = Immutable.List(generateItems());
 
export default function items(state = initialItems, action) {
	switch(action.type) {
	case ADD_ITEM:
		//TODO
		return state;
	case ADD_ITEMS:
		//TODO
		return state;
	case DELETE_ITEM:
		return state.delete( state.indexOf(action.item) );
	case DELETE_ITEMS:
		action.items.forEach(function(item) {
			state.delete( state.indexOf(item) );
		});
		return state;
	case DELETE_ROW:
		//TODO
		return state;
	case DELETE_ALL:
		return state.clear();
	case DRAG_ITEM:
		//TODO
		return state;
	default:
		return state;
	}
}