import * as ActionTypes from '../constants/actionTypes';

export function addItem(item) {
	return dispatch => {
		setTimeout(() => dispatch({
			type: ActionTypes.ADD_ITEM
		}), 200);
	};
}
export function addItems(items) {
	return dispatch => {
		setTimeout(() => dispatch({
			type: ActionTypes.ADD_ITEMS
		}), 200);
	};
}
export function deleteItem(item, e) {
	return {
		type: ActionTypes.DELETE_ITEM,
		item
	};
}
export function deleteItems(items, e) {
	return {
		type: ActionTypes.DELETE_ITEMS,
		items
	};
}
export function deleteRow(row, e) {
	return {
		type: ActionTypes.DELETE_ROW,
		row
	};
}
export function deleteAll() {
	return {
		type: ActionTypes.DELETE_ALL
	};
}
export function filterItem(e) {
	let filterItem = e.target.value;
	return {
		type: ActionTypes.FILTER_ITEM,
		filterItem
	};
}
export function dragItem(item) {
	return {
		type: ActionTypes.DRAG_ITEM,
		item
	};
}
export function swap(items) {
	return {
		type: ActionTypes.SWAP_ITEM,
		items
	};
}