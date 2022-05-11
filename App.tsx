import React, {Fragment, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import RnBdk from 'bdk-rn';

const App = () => {
  const [response, _response] = useState();
  const [walletExists, _walletExists] = useState(false);
  const [walletUnlocked, _walletUnlocked] = useState(false);
  const [mnemonic, _mnemonic] = useState(
    'title screen science betray fiber brother differ sniff page put damage slender',
  );

  useEffect(() => {
    (async () => {
      const exists = await RnBdk.walletExists();
      _walletExists(exists.data);
    })();
  }, []);

  const setResponse = (res: any) => _response(JSON.stringify(res.data));

  const getNewAddress = async () => {
    const res = await RnBdk.getNewAddress();
    setResponse(res);
  };

  const getBalance = async () => {
    const res = await RnBdk.getBalance();
    setResponse(res);
  };

  const broadcastTx = async () => {
    const res = await RnBdk.broadcastTx('tb1ql7w62elx9ucw4pj5lgw4l028hmuw80sndtntxt', 600);
    setResponse(res);
  };

  const createWallet = async () => {
    const res = await RnBdk.createWallet();
    setResponse(res);

    _walletUnlocked(!res.error);
    _walletExists(!res.error);
  };

  const restoreWallet = async () => {
    const res = await RnBdk.restoreWallet(mnemonic);
    setResponse(res);
    _walletUnlocked(!res.error);
    _walletExists(!res.error);
  };

  const genSeed = async () => {
    const res = await RnBdk.genSeed();
    setResponse(res);
  };

  const unlockWallet = async () => {
    const res = await RnBdk.unlockWallet();
    setResponse(res);
    _walletUnlocked(!res.error);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!walletExists && !walletUnlocked && (
        <Fragment>
          <Button title="Gen Seed" onPress={() => genSeed()} />
          <Button title="Create new wallet" onPress={() => createWallet()} />
          <Button title="Restore wallet" onPress={() => restoreWallet()} />
        </Fragment>
      )}

      {walletExists && !walletUnlocked && (
        <Fragment>
          <Button title="Unlock Wallet!" onPress={() => unlockWallet()} />
        </Fragment>
      )}

      {walletExists && walletUnlocked && (
        <Fragment>
          <Button title="Get new address" onPress={() => getNewAddress()} />
          <Button title="Sync Wallet & Get balance" onPress={() => getBalance()} />
          <Button title="Broadcast TX" onPress={() => broadcastTx()} />
        </Fragment>
      )}
      <Text selectable>{response}</Text>
    </View>
  );
};

export default App;
