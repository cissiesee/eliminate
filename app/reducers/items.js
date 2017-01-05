/* app/reducers/items.js */
 
import Immutable from 'immutable';
import actionTypesCreator from '../constants/actionTypes';

var actionTypes = actionTypesCreator();
 
const initialItems = Immutable.List([1,2,3]);
 
export default function items(state = initialItems, action) {
    switch(action.type) {
        case actionTypes.ADD_ITEM:
            return state.push( state.size != 0 ? state.get(-1) + 1 : 1 );
        case actionTypes.DELETE_ITEM:
            return state.delete( state.indexOf(action.item) );
        case actionTypes.DELETE_ALL:
            return state.clear();
        default:
            return state;
    }
}