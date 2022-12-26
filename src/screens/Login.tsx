/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
import {BdkRn, Mnemonic} from 'bdk-rn';
import React, {Fragment, useState} from 'react';
import {Alert, Modal, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {connect} from 'react-redux';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import MainNavigator from '../navigators/MainNavigator';
import {createWallet, unlockWallet} from '../store/actions';
import {AppColors} from '../styles/things';
import Descriptors from './Descriptors';

let defaultSeedString = 'cream ecology sniff amazing awful ocean gaze can peanut abandon emotion affair';

const Login = (props: any) => {
  const {walletExists, walletUnlocked, createWallet, unlockWallet} = props;
  const [seedModal, _seedModal] = useState(false);
  const [descriptorScreen, _descriptorScreen] = useState(false);
  const [isWalletModal, _isWalletModal] = useState(true);
  const [mnemonic, _mnemonic] = useState(defaultSeedString);
  const [responseText, _responseText] = useState('');
  const [loading, _loading] = useState(false);

  const initWallet = async () => {
    try {
      _loading(true);
      const response = await BdkRn.createWallet({
        mnemonic,
        password: '',
        network: 'testnet',
        blockChainConfigUrl: '',
        blockChainSocket5: '',
        retry: '',
        timeOut: '',
        blockChainName: '',
        // descriptor: mnemonic,
      });
      if (response.isOk()) {
        createWallet(true);
        unlockWallet(true);
      } else Alert.alert('Error', response.error.toString());
      _loading(false);
    } catch (err) {
      _loading(false);
    }
  };

  const genMnemonic = async () => {
    try {
      _loading(true);
      let seed = await Mnemonic.create();
      _responseText(seed.value);
      _loading(false);
    } catch (err) {
      _loading(false);
    }
  };

  const getXprv = async () => {
    try {
      _seedModal(false);
      _loading(true);
      let res = await BdkRn.createExtendedKey({network: 'testnet', mnemonic, password: ''});
      _responseText(JSON.stringify(res.value));
      _loading(false);
    } catch (err) {
      _loading(false);
    }
  };

  const openModal = (wallet = true) => {
    _seedModal(true);
    _isWalletModal(wallet);
  };

  return (
    <Fragment>
      {descriptorScreen ? (
        <Descriptors back={() => _descriptorScreen(false)} />
      ) : (
        <Fragment>
          {(!walletExists || !walletUnlocked) && (
            <Fragment>
              <Layout>
                <Logo />
                <Text heading="h1">Bitcoin Wallet</Text>
                <Fragment>
                  {!walletExists && !walletUnlocked && (
                    <Fragment>
                      <Text heading="h3" color={AppColors.lightBlack}>
                        A bitcoin wallet built with bdk-rn, a Bitcoin Development Kit for building React Native Apps
                      </Text>
                      <Button title="Gen Mnemonic" onPress={() => genMnemonic()} />
                      <Button title="Initialize wallet" onPress={() => openModal()} />
                      <Button title="Extendend KeyInfo" onPress={() => openModal(false)} />
                      <Text>{responseText}</Text>
                      <Fragment>
                        <Pressable onPress={() => _descriptorScreen(true)}>
                          <Text heading="h3" color={AppColors.orange}>
                            Manage Descriptors {'->'}
                          </Text>
                        </Pressable>
                      </Fragment>
                    </Fragment>
                  )}
                </Fragment>
              </Layout>
              <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>Your wallet, your coins {'\n'} 100% open-source & open-design</Text>
              </View>

              <Modal
                transparent={true}
                visible={seedModal}
                onRequestClose={() => {
                  _seedModal(false);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text>{isWalletModal ? 'Enter your seed OR descriptor!!' : 'Enter your seed phrase!!'}</Text>
                    {/* {isWalletModal && (
                      <View style={{flexDirection: 'row', marginVertical: 5}}>
                        <BouncyCheckbox isChecked={isDescriptor} onPress={newValue => _isDescriptor(newValue)} />
                        <Text>Init with descriptor ?</Text>
                      </View>
                    )} */}
                    <TextInput
                      style={styles.modalInput}
                      multiline
                      value={mnemonic}
                      onChangeText={_mnemonic}
                      textAlignVertical="top"
                    />
                    <Pressable
                      style={styles.modalBtn}
                      onPress={() => {
                        _seedModal(false);
                        if (isWalletModal) initWallet();
                        else getXprv();
                      }}>
                      <Text color={AppColors.white}>{isWalletModal ? 'Init' : 'Info'}</Text>
                    </Pressable>
                    <Pressable
                      style={{...styles.modalBtn, backgroundColor: AppColors.black}}
                      onPress={() => _seedModal(false)}>
                      <Text color={AppColors.white}>Cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              {loading && <Loader />}
            </Fragment>
          )}
          {walletExists && walletUnlocked && <MainNavigator />}
        </Fragment>
      )}
    </Fragment>
  );
};

export default connect((state: any) => ({...state.reducer, ...state.counterReducer}), {unlockWallet, createWallet})(
  Login,
);

export const styles = StyleSheet.create({
  bottomContainer: {marginVertical: 50, alignItems: 'center'},
  bottomText: {textAlign: 'center', color: AppColors.lightBlack},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {width: 250, height: 75, borderWidth: 1, padding: 5, borderColor: AppColors.lightBlack},
  modalBtn: {backgroundColor: AppColors.orange, padding: 5, margin: 5, width: 150, borderRadius: 5},
});
