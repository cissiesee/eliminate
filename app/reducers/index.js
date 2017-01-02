import { combineReducers } from 'redux';
import items from './items';
import filter from './filter';
 
const rootReducer = combineReducers({
  items,
  filter
});

debugger
 
export default rootReducer;