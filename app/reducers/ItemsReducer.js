/* app/reducers/items.js */
 
import Immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import itemsHelper from './ItemsHelper';

let itemsInfo = Immutable.Map({
	itemColNum: 10,
	itemRowNum: 10,
	square: 30,
	selectItem: null,
	dragItem: null,
	status: 'none' //'dragging,'dragged','eliminated','dropped'
});
let originItems = itemsHelper.generateInitialItems(itemsInfo.get('itemRowNum'), itemsInfo.get('itemColNum'), itemsInfo.get('square'));
let newItemsInfo = itemsInfo.set('items', originItems);

export default function itemsInfo(state = newItemsInfo, action) {
	switch(action.type) {
	case actionTypes.DELETE_ROW:
		//TODO
		return state;
	case actionTypes.DELETE_ALL:
		return state;//.clear();
	case actionTypes.DRAG_ITEM:
		return state.set('dragItem', action.item).set('status', 'dragging');
	case actionTypes.DRAGOVER_ITEM:
		if (state.get('dragItem')) {
			//TODO swap result dosen't meet tree eliminate then return *last state*
			let _items = itemsHelper.swapItems(state.get('dragItem'), action.item, state.get('items'));
			if (!itemsHelper.eliminateSameItems(_items)) {
				return state.set('dragItem', null).set('status', 'none');
			}
			return state.set('items', _items).set('dragItem', null).set('status', 'dragged');
		}
		return state;
	case actionTypes.STOP_DRAG:
		if (state.get('dragItem')) {
			return state.set('dragItem', null).set('status', 'none');
		}
		return state;
	case actionTypes.DELETE_ITEMS:
		let itemsAfterDel = itemsHelper.eliminateSameItems(state.get('items'));
		if (!itemsAfterDel) {
			return state.set('status', 'none');
		}
		return state.set('items', itemsAfterDel).set('status', 'eliminated');
	case actionTypes.DROP_ITEMS:
		let dropCols = itemsHelper.getDropCols(state.get('items'), state.get('itemRowNum'), state.get('itemColNum'));
		let newState = state;
		if (dropCols && dropCols.length) {
			let itemsAfterDrop = itemsHelper.dropItems(dropCols, state.get('items'));
			newState = state.set('items', itemsAfterDrop);
		}
		return newState.set('status', 'dropped');
	case actionTypes.SELECT_ITEM:
		return state.set('selectItem', action.item);
	// case actionTypes.CLEAR_STATUS:
	// 	return state.set('status', 'none');
	default:
		return state;
	}
}