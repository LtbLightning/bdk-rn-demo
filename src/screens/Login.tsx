import React, {Fragment, useEffect, useState} from 'react';
import {Modal, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import BdkRn from 'bdk-rn';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import MainNavigator from '../navigators/MainNavigator';
import {createWallet, newWallet, unlockWallet} from '../store/actions';
import {AppColors} from '../styles/things';

// Don't delete it
// title screen science betray fiber brother differ sniff page put damage slender

const Login = props => {
  const {walletExists, walletUnlocked, seed, createWallet, unlockWallet, newWallet} = props;
  const [seedModal, _seedModal] = useState(false);
  const [mnemonic, _mnemonic] = useState('');
  const [loading, _loading] = useState(false);

  useEffect(() => {
    (async () => {
      const exists = await BdkRn.walletExists();
      createWallet(exists.data);
    })();
  }, []);

  const walletMethods = async (method: string = '', seed: string = '') => {
    try {
      _loading(true);
      const res = await BdkRn[method](seed);
      if (method === 'createWallet') {
        newWallet(res.data.mnemonic);
      } else {
        createWallet(!res.error);
        unlockWallet(!res.error);
      }
      _loading(false);
    } catch (err) {
      _loading(false);
    }
  };

  const gotoWallet = () => {
    createWallet(true);
    unlockWallet(true);
  };

  return (
    <Fragment>
      {(!walletExists || !walletUnlocked) && (
        <Fragment>
          <Layout>
            <Logo />
            <Text heading="h1">Bitcoin Wallet</Text>
            {seed != '' ? (
              <Fragment>
                <Text heading="h3" color={AppColors.orange}>
                  Your recovery phrase:
                </Text>
                <Text>{seed}</Text>
                <Button title="Goto wallet -->" onPress={() => gotoWallet()} />
              </Fragment>
            ) : (
              <Fragment>
                {!walletExists && !walletUnlocked && (
                  <Fragment>
                    <Text heading="h3" color={AppColors.lightBlack}>
                      A bitcoin wallet built with bdk-rn, a Bitcoin Development Kit for building React Native Apps
                    </Text>
                    <Button title="Create new wallet" onPress={() => walletMethods('createWallet')} />
                    <Pressable onPress={() => _seedModal(true)}>
                      <Text heading="h3" color={AppColors.orange}>
                        Restore existing wallet
                      </Text>
                    </Pressable>
                  </Fragment>
                )}

                {walletExists && !walletUnlocked && (
                  <Fragment>
                    <Text heading="h3" color={AppColors.lightBlack}>
                      Welcome back!
                    </Text>
                    <Button title="Unlock Wallet!" onPress={() => walletMethods('unlockWallet')} />
                  </Fragment>
                )}
              </Fragment>
            )}
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
                <Text>Enter your seed phrase!!</Text>
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
                    walletMethods('restoreWallet', mnemonic);
                  }}>
                  <Text color={AppColors.white}>Restore</Text>
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
  );
};

export default connect((state: any) => ({...state.reducer}), {unlockWallet, createWallet, newWallet})(Login);

const styles = StyleSheet.create({
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
