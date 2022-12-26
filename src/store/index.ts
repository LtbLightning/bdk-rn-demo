import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import reducer from './reducer';
import counterReducer from './counterReducer';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({reducer, counterReducer}), applyMiddleware(thunk), composeWithDevTools());
export default store;
