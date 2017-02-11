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
export function dragOverItem(item) {
    return {
        type: ActionTypes.DRAGOVER_ITEM,
        item
    };
}
export function stopDrag(item) {
    return {
        type: ActionTypes.STOP_DRAG,
        item
    };
}
export function selectItem(item) {
    return {
        type: ActionTypes.SELECT_ITEM,
        item
    };
}
export function swapItems(items) {
    return {
        type: ActionTypes.SWAP_ITEM,
        items
    };
}
export function deleteItems(opts) {
    return {
        type: ActionTypes.DELETE_ITEMS,
        opts
    };
}
export function dropdownItems() {
    return {
        type: ActionTypes.DROP_ITEMS
    };
}
// export function clearStatus() {
//  return {
//      type: ActionTypes.CLEAR_STATUS
//  };
// }