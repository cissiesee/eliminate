import keyMirror from 'keymirror';
 
export default function() {
	return keyMirror({
		ADD_ITEM: null,
		DELETE_ITEM: null,
		DELETE_ALL: null,
		FILTER_ITEM: null
	});
}
 
// 等于
// export const ADD_ITEM = 'ADD_ITEM';
// export const DELETE_ITEM = 'DELETE_ITEM';
// export const DELETE_ALL = 'DELETE_ALL';
// export const FILTER_ITEM = 'FILTER_ITEM';