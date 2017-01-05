import actionTypesCreator from '../constants/actionTypes';

var actionTypes = actionTypesCreator();
 
export function addItem(item) {
    return dispatch => {
       setTimeout(() => dispatch({type: actionTypes.ADD_ITEM}), 200);
    };
}
export function deleteItem(item, e) {
    return {
       type: actionTypes.DELETE_ITEM,
       item
    };
}
export function deleteAll() {
    return {
       type: actionTypes.DELETE_ALL
    };
}
export function filterItem(e) {
    let filterItem = e.target.value;
    return {
       type: actionTypes.FILTER_ITEM,
       filterItem
    };
}