import React, {Fragment, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import RnBdk from 'bdk-rn';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';

const Home = props => {
  const {navigation} = props;
  const [loading, _loading] = useState(false);
  const [balance, _balance] = useState(0);
  const [address, _address] = useState('');

  useEffect(() => {
    (async () => {
      const res = await RnBdk.getBalance();
      _balance(res.data);
      _loading(false);
    })();
  });

  const getNewAddress = async () => {
    try {
      const res = await RnBdk.getNewAddress();
      _res(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const broadcastTx = async () => {
    const res = await RnBdk.broadcastTx('tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt', 600);
  };
  return (
    <Fragment>
      <Layout>
        <Text heading="h1">
          {balance}
          <Text heading="h3">sats</Text>
        </Text>
        <View style={styles.btnContainer}>
          {/* <Button style={styles.btn} title="Pay" onPress={() => getBalance()} />
          <Button style={styles.btn} title="Request" onPress={() => broadcastTx()} /> */}
          <Button style={styles.btn} title="Pay" onPress={() => navigation.navigate('Send')} />
          <Button style={styles.btn} title="Receive" onPress={() => navigation.navigate('Receive')} />
        </View>
        <Text>{address}</Text>
      </Layout>
      {loading && <Loader />}
    </Fragment>
  );
};

export default Home;

const styles = StyleSheet.create({
  btnContainer: {flexDirection: 'row', alignItems: 'center'},
  btn: {width: '35%', marginHorizontal: 5},
});
