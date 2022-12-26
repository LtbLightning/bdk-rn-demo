import BdkRn from 'bdk-rn';
import {createAction} from 'redux-actions';

export const unlockWallet = createAction('UNLOCK_WALLET');
export const createWallet = createAction('CREATE_WALLET');
export const newWallet = createAction('NEW_WALLET');
export const resetWallet = createAction('RESET_WALLET');
export const logout = createAction('LOGOUT_WALLET');
export const GEN_SEED_SUCCESS = 'GEN_SEED_SUCCESS';

export const genSeed = () => dispatch => {
  BdkRn.generateMnemonic({length: 12}).then((response: any) => {
    dispatch({type: GEN_SEED_SUCCESS, data: response.data});
  });
};
