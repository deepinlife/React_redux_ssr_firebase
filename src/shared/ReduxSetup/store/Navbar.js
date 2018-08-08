import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CombineReducers from "./Reducer/CombineReducer";

const store = createStore(
	CombineReducers,
	{},
	applyMiddleware(thunk)
)

export default store;