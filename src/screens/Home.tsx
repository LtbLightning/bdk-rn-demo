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
  const [loading, _loading] = useState(false);
  const [balance, _balance] = useState<any>(0);

  const syncWallet = async () => {
    _loading(true);
    const res = await BdkRn.syncWallet();
    _balance(res.value);
    _loading(false);
  };

  const getBalance = async () => {
    _loading(true);
    const res = await BdkRn.getBalance();
    _balance(res.value + 'sats');
    _loading(false);
  };

  return (
    <Fragment>
      <Layout>
        <Logo />
        <Text heading="h1">{balance}</Text>

        <View style={styles.btnContainer}>
          <Button style={styles.btn} title="Sync Wallet" onPress={() => syncWallet()} />
          <Button style={styles.btn} title="Get Balance" onPress={() => getBalance()} />
        </View>

        <View style={styles.btnContainer}>
          <Button style={styles.btn} title="Send" onPress={() => navigation.navigate('Send')} />
          <Button style={styles.btn} title="Receive" onPress={() => navigation.navigate('Receive')} />
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.btn} title="Pending Tx" onPress={() => navigation.navigate('Pending')} />
          <Button style={styles.btn} title="Confirmed Tx" onPress={() => navigation.navigate('Confirmed')} />
        </View>

        <Button style={styles.btn_full} title="Reset App" onPress={() => resetWallet()} />
      </Layout>
      {loading && <Loader />}
    </Fragment>
  );
};

export default connect((state: any) => ({...state.reducer}), {unlockWallet, resetWallet, logout})(Home);

const styles = StyleSheet.create({
  btnContainer: {flexDirection: 'row', alignItems: 'center'},
  btn: {width: '35%', marginHorizontal: 5},
  btn_full: {width: '73%', marginHorizontal: 5},
});
