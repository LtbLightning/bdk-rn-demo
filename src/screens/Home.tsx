import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import BdkRn from 'bdk-rn';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import {unlockWallet, resetWallet, logout} from '../store/actions';

const Home = props => {
  const {navigation, unlockWallet, resetWallet, logout} = props;
  const [loading, _loading] = useState(true);
  const [balance, _balance] = useState(0);
  const [address, _address] = useState('');

  useEffect(() => {
    (async () => await syncWallet())();
  });

  const syncWallet = async () => {
    const res = await BdkRn.getBalance();
    _balance(res.data);
    _loading(false);
  };

  const resetApplication = async () => {
    await BdkRn.resetWallet();
    resetWallet();
  };

  return (
    <Fragment>
      <Layout>
        <Logo />
        <Text heading="h1">
          {balance}
          <Text heading="h3">sats</Text>
        </Text>
        <Button style={styles.btn} title="Sync Wallet" onPress={() => syncWallet()} />
        <View style={styles.btnContainer}>
          <Button style={styles.btn} title="Send" onPress={() => navigation.navigate('Send')} />
          <Button style={styles.btn} title="Receive" onPress={() => navigation.navigate('Receive')} />
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.btn} title="Logout" onPress={() => logout()} />
          <Button style={styles.btn} title="Reset App" onPress={() => resetApplication()} />
        </View>
        <Text>{address}</Text>
      </Layout>
      {loading && <Loader />}
    </Fragment>
  );
};

export default connect((state: any) => ({...state.reducer}), {unlockWallet, resetWallet, logout})(Home);

const styles = StyleSheet.create({
  btnContainer: {flexDirection: 'row', alignItems: 'center'},
  btn: {width: '35%', marginHorizontal: 5},
});
