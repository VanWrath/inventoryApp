import Collection from '../classes/Collection';
import Item from '../classes/Item';
//Actions
export const LOAD_DATA = 'LOAD_DATA';
export const GET_LIST = 'GET_LIST';
export const GET_ITEM = 'GET_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_LIST = 'UPDATE_LIST';
export const UPDATE_ITEM = 'UPDATE_ITEM';

const initialState = { lists: [], list: {}, item: {} };

//Reducer
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				lists : action.payload
			};
		case ADD_LIST:
			return {
				state : {
					lists : [ ...lists, new collection(action.name) ]
				}
			};
		case GET_LIST:
			return {
				...state,
				list : action.id
			};
		default:
			return state;
	}
}

//Action Creators
export function loadData(data) {
	return {
		type    : LOAD_DATA,
		payload : data
	};
}

export function addList(name) {
	return {
		type : ADD_LIST,
		name : name
	};
}

export function addItem(item) {
	return { type: ADD_ITEM, item };
}

export function getList(id) {
	return { type: GET_LIST, id };
}

export function getItem(listIndex, id) {
	return { type: GET_ITEM, listIndex, id };
}

export function updateList(index, text) {
	return { type: UPDATE_LIST, index, text };
}

export function updateItem(listIndex, item) {
	return { type: UPDATE_ITEM, listIndex, item };
}

export function deleteList(index) {
	return { type: DELETE_LIST, index };
}

export function deleteItem(listIndex, id) {
	return { type: DELETE_ITEM, listIndex, id };
}
