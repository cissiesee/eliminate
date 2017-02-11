/* app/reducers/items.js */
 
import Immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';
import itemsHelper from './ItemsHelper';
import Utils from '../utils/Utils';
//import itemsHistory from './ItemsHistory';

let _draggingItem = null,
    _dragOverItem = null,
    _swapItems = null;

let _itemsHistory = [];

let itemsInfo = Immutable.Map({
    itemColNum: 9,
    itemRowNum: 9,
    selectItem: null,
    dragItem: null,
    status: 'none', //'dragging,'swapped','eliminated','dropped'
    grid: null
});
let originItems = itemsHelper.generateInitialItems(itemsInfo.get('itemRowNum'), itemsInfo.get('itemColNum'));
let grid = itemsHelper.generateGrid(itemsInfo.get('itemRowNum'), itemsInfo.get('itemColNum'));
_itemsHistory.push(originItems);
let newItemsInfo = itemsInfo.set('items', originItems).set('grid', grid);

export default function itemsInfo(state = newItemsInfo, action) {
    switch(action.type) {
    case actionTypes.DELETE_ROW:
        //TODO
        return state;
    case actionTypes.DELETE_ALL:
        return state;//.clear();
    case actionTypes.DRAG_ITEM:
        _draggingItem = {row: action.item.row, col: action.item.col};
        return state.set('status', 'dragging');
    case actionTypes.DRAGOVER_ITEM:
        if (_draggingItem) {
            if (!itemsHelper.isInZone(state.get('itemRowNum'), state.get('itemColNum'), action.item)) {
                return state.set('status', 'none');
            }
            _dragOverItem = action.item;
            _swapItems = [_draggingItem, _dragOverItem];
            let _items = itemsHelper.swapItems(_swapItems, state.get('items'));
            //_itemsHistory.push(_items);
            return state.set('items', _items)
                        .set('status', 'swapped');
        }
        return state;
    case actionTypes.STOP_DRAG:
        if (state.get('status') === 'dragging') {
            return state.set('status', 'none');
        }
        return state;
    case actionTypes.DELETE_ITEMS:
        let itemsAfterDel = itemsHelper.eliminateSameItems(state.get('items'), _swapItems);
        if (!itemsAfterDel) { //无消除元素
            let _newState = state;
            _swapItems = null;
            //如果目前在交换状态则撤销
            if (state.get('status') === 'swapped') {
                _newState = state.set('items', _itemsHistory[_itemsHistory.length - 1]);
            } else if (state.get('status') === 'dropped') {
                _itemsHistory.push(state.get('items'));
            }
            return _newState.set('status', 'none');
        }
        let newGridAfterDel = itemsHelper.activateGridCell(state.get('grid'), itemsAfterDel.eliminateItems);
        _swapItems = null;
        //_itemsHistory.push(itemsAfterDel.newItems);
        return state
            .set('items', itemsAfterDel.newItems)
            .set('status', 'eliminated')
            .set('grid', newGridAfterDel);
    case actionTypes.DROP_ITEMS:
        let dropCols = itemsHelper.getDropCols(state.get('items'), state.get('itemRowNum'), state.get('itemColNum'));
        let newState = state;
        if (dropCols && dropCols.length) {
            let itemsAfterDrop = itemsHelper.dropItems(dropCols, state.get('items'));
            let maxDropdownRows = itemsHelper.getMaxByKey(itemsAfterDrop, 'dropdownRows');
            let maxDelay = itemsHelper.getMaxByKey(itemsAfterDrop, 'dropDelay');
            _itemsHistory.push(itemsAfterDrop);
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