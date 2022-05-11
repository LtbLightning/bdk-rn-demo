import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import RnBdk from 'bdk-rn';

const App = () => {
  const [response, _response] = useState();
  const getNewAddress = async () => {
    const res = await RnBdk.getNewAddress();
    _response(res.data);
  };

  const getBalance = async () => {
    const res = await RnBdk.getBalance();
    _response(res.data);
  };

  const broadcastTx = async () => {
    const res = await RnBdk.broadcastTx(
      'tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt',
      700,
    );
    _response(JSON.stringify(res.data));
  };

  const createWallet = async () => {
    const res = await RnBdk.createWallet();
    _response(JSON.stringify(res.data));
  };

  const restoreWallet = async () => {
    const res = await RnBdk.restoreWallet(
      'box limit letter buddy endorse crush pulp copy immune dynamic phrase initial',
    );
    _response(JSON.stringify(res.data));
  };

  const genSeed = async () => {
    const res = await RnBdk.genSeed();
    _response(JSON.stringify(res.data));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Gen Seed" onPress={() => genSeed()} />
      <Button title="Create new wallet" onPress={() => createWallet()} />
      <Button title="Restore wallet" onPress={() => restoreWallet()} />
      <Button title="Get new address" onPress={() => getNewAddress()} />
      <Button title="Get balance" onPress={() => getBalance()} />
      <Button title="Broadcast TX" onPress={() => broadcastTx()} />
      <Text selectable>{response}</Text>
    </View>
  );
};

export default App;
