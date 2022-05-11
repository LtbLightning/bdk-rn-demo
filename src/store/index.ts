import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import reducer from './reducer';

const store = createStore(combineReducers({reducer}), composeWithDevTools());
export default store;
