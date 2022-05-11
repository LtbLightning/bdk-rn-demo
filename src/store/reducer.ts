import {handleActions} from 'redux-actions';
import {unlockWallet, createWallet, resetWallet, newWallet, logout} from './actions';

const initialState = {
  walletExists: false,
  walletUnlocked: false,
  seed: '',
};

const reducer = handleActions(
  {
    [createWallet]: (state, {payload}) => {
      return {...state, walletExists: payload};
    },
    [newWallet]: (state, {payload}) => {
      return {...state, seed: payload};
    },
    [unlockWallet]: (state, {payload}) => {
      return {...state, walletUnlocked: payload};
    },
    [logout]: state => {
      return {...state, walletUnlocked: false, seed: ''};
    },
    [resetWallet]: state => {
      return {...initialState};
    },
  },
  initialState,
);

export default reducer;
