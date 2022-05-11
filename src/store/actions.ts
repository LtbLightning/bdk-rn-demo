import {createAction} from 'redux-actions';

export const unlockWallet = createAction('UNLOCK_WALLET');
export const createWallet = createAction('CREATE_WALLET');
export const newWallet = createAction('NEW_WALLET');
export const resetWallet = createAction('RESET_WALLET');
export const logout = createAction('LOGOUT_WALLET');
