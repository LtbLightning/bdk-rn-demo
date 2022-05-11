import React, {Fragment, useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import RnBdk from 'bdk-rn';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import MainNavigator from '../navigators/MainNavigator';
import {AppColors} from '../styles/things';

const Login = () => {
  const [response, _response] = useState();
  const [walletExists, _walletExists] = useState(false);
  const [walletUnlocked, _walletUnlocked] = useState(false);
  const [mnemonic, _mnemonic] = useState(
    'title screen science betray fiber brother differ sniff page put damage slender',
  );

  const [newWalletSeed, _newWalletSeed] = useState('');

  const [loading, _loading] = useState(false);

  useEffect(() => {
    (async () => {
      const exists = await RnBdk.walletExists();
      _walletExists(exists.data);
    })();
  }, []);

  const logout = () => {
    _walletUnlocked(false);
  };

  const walletMethods = async (method: string = '') => {
    try {
      _loading(true);
      const res = await RnBdk[method](mnemonic);
      _response(JSON.stringify(res.data));
      if (method == 'createWallet') {
        _newWalletSeed(res.data.mnemonic);
      } else {
        _walletUnlocked(!res.error);
        _walletExists(!res.error);
      }
      _loading(false);
    } catch (err) {
      console.log(err);
      _loading(false);
    }
  };

  const gotoWallet = () => {
    _walletUnlocked(true);
    _walletExists(true);
  };

  return (
    <Fragment>
      {loading && <Loader />}
      {(!walletExists || !walletUnlocked) && (
        <Fragment>
          <Layout>
            <Logo />
            <Text heading="h1">Bitcoin Wallet</Text>
            {newWalletSeed != '' ? (
              <Fragment>
                <Text heading="h3">Wallet created: </Text>
                <Text>{newWalletSeed}</Text>
                <Button title="Go to wallet!!" onPress={() => gotoWallet()} />
              </Fragment>
            ) : (
              <Fragment>
                {!walletExists && !walletUnlocked && (
                  <Fragment>
                    <Text heading="h3" color={AppColors.lightBlack}>
                      A bitcoin wallet built with bdk-rn, a Bitcoin Development Kit for building React Native Apps
                    </Text>
                    <Button title="Create new wallet" onPress={() => walletMethods('createWallet')} />
                    <Pressable onPress={() => walletMethods('restoreWallet')}>
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
        </Fragment>
      )}

      {walletExists && walletUnlocked && <MainNavigator />}
    </Fragment>
  );
};

export default Login;

const styles = StyleSheet.create({
  bottomContainer: {marginVertical: 50, alignItems: 'center'},
  bottomText: {textAlign: 'center', color: AppColors.lightBlack},
});
