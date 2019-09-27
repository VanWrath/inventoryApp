import Collection from '../classes/Collection';
import Item from '../classes/Item';
//Actions
export const LOAD_DATA = 'LOAD_DATA';
export const STORE_DATA = 'STORE_DATA';
export const GET_LIST = 'GET_LIST';
export const GET_ITEM = 'GET_ITEM';
export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_LIST = 'UPDATE_LIST';
export const UPDATE_ITEM = 'UPDATE_ITEM';

const initialState = { lists: [], list: {}, item: {}, listIndex: 0 };

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
				lists : [ ...state.lists, action.list ]
			};
		case GET_LIST:
			let index = 0;
			for (let i = 0; i < state.lists.length; i++) {
				if (state.lists[i]._id == action.id) {
					index = i;
				}
			}
			return {
				...state,
				list : { ...state.lists[index] }
			};
		case DELETE_LIST:
			return {
				lists : state.lists.filter((list) => list._id !== action.id)
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

export function addList(list) {
	return {
		type : ADD_LIST,
		list
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

export function deleteList(id) {
	return { type: DELETE_LIST, id };
}

export function deleteItem(listIndex, id) {
	return { type: DELETE_ITEM, listIndex, id };
}
