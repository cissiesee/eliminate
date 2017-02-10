/* app/reducers/items.js */
 
import Immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import itemsHelper from './ItemsHelper';

let itemsInfo = Immutable.Map({
    itemColNum: 9,
    itemRowNum: 9,
    square: 30,
    selectItem: null,
    dragItem: null,
    status: 'none', //'dragging,'dragged','eliminated','dropped'
    grid: null
});
let originItems = itemsHelper.generateInitialItems(itemsInfo.get('itemRowNum'), itemsInfo.get('itemColNum'), itemsInfo.get('square'));
let grid = itemsHelper.generateGrid(itemsInfo.get('itemRowNum'), itemsInfo.get('itemColNum'), itemsInfo.get('square'));
let newItemsInfo = itemsInfo.set('items', originItems).set('grid', grid);

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
        let dragItem = state.get('dragItem');
        if (dragItem) {
            //TODO swap result dosen't meet tree eliminate then return *last state*
            let _items = itemsHelper.swapItems(dragItem, action.item, state.get('items'));
            if (!itemsHelper.eliminateSameItems(_items, [action.item, dragItem])) {
                return state.set('dragItem', null).set('status', 'none');
            }
            return state.set('items', _items)
                        .set('dragItem', null)
                        .set('swapItems', [dragItem, action.item])
                        .set('status', 'dragged');
        }
        return state;
    case actionTypes.STOP_DRAG:
        if (state.get('dragItem')) {
            return state.set('dragItem', null).set('status', 'none');
        }
        return state;
    case actionTypes.DELETE_ITEMS:
        let itemsAfterDel = itemsHelper.eliminateSameItems(state.get('items'), state.get('swapItems'));
        if (!itemsAfterDel) {
            return state.set('swapItems', null).set('status', 'none');
        }
        let newGridAfterDel = itemsHelper.activateGridCell(state.get('grid'), itemsAfterDel.eliminateItems);
        return state.set('items', itemsAfterDel.newItems).set('swapItems', null).set('status', 'eliminated').set('grid', newGridAfterDel);
    case actionTypes.DROP_ITEMS:
        let dropCols = itemsHelper.getDropCols(state.get('items'), state.get('itemRowNum'), state.get('itemColNum'));
        let newState = state;
        if (dropCols && dropCols.length) {
            let itemsAfterDrop = itemsHelper.dropItems(dropCols, state.get('items'));
            let maxDropdownRows = itemsHelper.getMaxByKey(itemsAfterDrop, 'dropdownRows');
            let maxDelay = itemsHelper.getMaxByKey(itemsAfterDrop, 'dropDelay');
            newState = state
                .set('items', itemsAfterDrop)
                .set('maxDropdownRows', maxDropdownRows)
                .set('maxDelay', maxDelay);
        }
        return newState.set('status', 'dropped');
    case actionTypes.SELECT_ITEM:
        return state.set('selectItem', action.item);
    // case actionTypes.CLEAR_STATUS:
    //  return state.set('status', 'none');
    default:
        return state;
    }
}