import { combineReducers } from 'redux';
import itemsInfo from './ItemsReducer';
import filter from './FilterReducer';
 
const rootReducer = combineReducers({
    itemsInfo,
    filter
});
 
export default rootReducer;