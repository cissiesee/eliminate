import { FILTER_ITEM } from '../constants/actionTypes';
import actionTypesCreator from '../constants/actionTypes';

var actionTypes = actionTypesCreator();

const initialFilterItem = '';

export default function filter(state = initialFilterItem, action) {
    switch(action.type) {
        case actionTypes.FILTER_ITEM:
            return action.filterItem;
        default:
            return state;
    }
}