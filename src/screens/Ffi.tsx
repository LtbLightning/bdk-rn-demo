/* eslint-disable curly */
import {
  DescriptorSecretKey,
  Mnemonic,
  DescriptorPublicKey,
  DerivationPath,
  Blockchain,
  Wallet,
  DatabaseConfig,
} from 'bdk-rn';
import {BlockChainNames} from 'bdk-rn/lib/lib/enums';
import {BlockchainElectrumConfig, Network} from 'bdk-rn/src/lib/enums';
import React, {Fragment, useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import {Text} from '../elements/Text';

let xprvWallet =
  "tprv8ZgxMBicQKsPddfv1ciyQYYFujwNsBQnSDW6DjT55pA6UXPM6foNPd4mfHM8vbcbmAMf7R3Fj416o4P1A5Nu8GM9nEhALLVhve6mSAz11o7/84'/1'/0'/0/*";

let xprvWallet1 =
  "tprv8ZgxMBicQKsPd3G66kPkZEuJZgUK9QXJRYCwnCtYLJjEZmw8xFjCxGoyx533AL83XFcSQeuVmVeJbZai5RTBxDp71Abd2FPSyQumRL79BKw/84'/1'/0'/0/*";

let mnemonic = 'tackle pause sort ten task vast candy skill retire upset lend captain';

const Ffi = () => {
  const [loading, _loading] = useState(false);
  const [response, _response] = useState<any>();
  const [response1, _response1] = useState<any>();
  const [seed, _seed] = useState<any>();

  const [descriptor, _descriptor] = useState<any>(xprvWallet1);
  const path = 'm/84h/1h/0h/0';

  const genSeed = async () => {
    try {
      _loading(true);
      const fromWordCount = await Mnemonic.fromString(mnemonic);
      _response(fromWordCount.asString());
      _seed(fromWordCount.asString());
      _loading(false);
    } catch (err) {
      console.log('ERRO', err);
      _loading(false);
    }
  };

  const descriptorSecret = async () => {
    try {
      _loading(true);
      let k = mnemonic;
      const xprv = await DescriptorSecretKey.create(Network.Testnet, k);
      const derivationPath = await DerivationPath.create(path);
      console.log('Secret key', xprv.asString());
      console.log('Derivation path', derivationPath.asString());
      console.log('Derive Secret key', (await xprv.derive(path)).asString());
      let extended = (await xprv.extend(path)).asString();
      console.log('Extend Secret key', extended);

      _descriptor(extended);

      console.log('Public key', await xprv.asPublic());
      console.log('Secret Bytes', await xprv.secretBytes());

      _loading(false);
    } catch (err) {
      console.log(err);
      _loading(false);
    }
  };

  const descriptorPublic = async () => {
    try {
      _loading(true);
      const xpub = await DescriptorPublicKey.create();
      const derivationPath = await DerivationPath.create(path);
      console.log('Public key', xpub.asString());
      console.log('Derivation path', derivationPath.asString());

      console.log('Derive Public key', (await xpub.derive(path)).asString());
      console.log('Extend Public key', (await xpub.extend(path)).asString());

      _loading(false);
    } catch (err) {
      console.log(err);
      _loading(false);
    }
  };

  const blockchainInstance = new Blockchain();
  const [blockchain, setBlockchain] = useState<Blockchain>(blockchainInstance);

  const initBlockChain = async () => {
    try {
      _loading(true);
      let config: BlockchainElectrumConfig = {
        url: 'ssl://electrum.blockstream.info:60002',
        retry: '5',
        timeout: '5',
        stopGap: '5',
      };
      setBlockchain(await blockchainInstance.create(config));
      const height = await blockchain.getHeight();
      const hash = await blockchain.getBlockHash(height);
      _response(`Height: ${height},\n Hash: ${hash}`);
      _loading(false);
    } catch (e) {
      console.log('Blockchain error', e);
      _loading(false);
    }
  };

  const dbConfig = async () => {
    try {
      _loading(true);
      const memory = await DatabaseConfig.memory();
      _response(`Height: ${memory}`);
      _loading(false);
    } catch (e) {
      console.log('Blockchain error', e);
      _loading(false);
    }
  };

  const walletInstance = new Wallet();
  const walletInstance1 = new Wallet();
  const [wallet, setWallet] = useState<Wallet>();
  const [wallet1, setWallet1] = useState<Wallet>();

  const walletInit = async () => {
    try {
      _loading(true);
      let wpkh1 = `wpkh(${xprvWallet})`;
      setWallet(await walletInstance.init(wpkh1, Network.Testnet));
      _loading(false);
    } catch (e) {
      console.log('Blockchain error', e);
      _loading(false);
    }
  };

  const walletInit1 = async () => {
    try {
      _loading(true);
      let wpkh1 = `wpkh(${xprvWallet1})`;
      setWallet1(await walletInstance1.init(wpkh1, Network.Testnet));
      _loading(false);
    } catch (e) {
      console.log('Blockchain error', e);
      _loading(false);
    }
  };

  const sync = async (one = true) => {
    _loading(true);
    if (one) await wallet?.sync(blockchain);
    else await wallet1?.sync(blockchain);
    _loading(false);
  };

  const balance = async (one = true) => {
    _loading(true);
    if (one) {
      console.log(await wallet?.getBalance());
    } else {
      console.log(await wallet1?.getBalance());
    }
    _loading(false);
  };

  const address = async (one = true) => {
    _loading(true);
    if (one) {
      console.log(await wallet?.getAddress());
    } else {
      console.log(await wallet1?.getAddress());
    }
    _loading(false);
  };

  const unspents = async (one = true) => {
    _loading(true);
    if (one) {
      console.log(await wallet?.listUnspent());
    } else {
      console.log(await wallet1?.listUnspent());
    }
    _loading(false);
  };

  const transactions = async (one = true) => {
    _loading(true);
    if (one) {
      console.log(await wallet?.listTransactions());
    } else {
      console.log(await wallet1?.listTransactions());
    }
    _loading(false);
  };

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {loading && <Loader />}
        {/* <Button transparent title="Descriptor" onPress={descriptorSecret} /> */}
        <View>
          <Button transparent title="Init blockchain" onPress={() => initBlockChain()} />
          <Text heading="h2">Wallet</Text>
          <Button transparent title="Wallet Init" onPress={walletInit} />
          {wallet?.isInit && (
            <Fragment>
              <Button transparent title="Sync" onPress={() => sync()} />
              <Button transparent title="Balance" onPress={() => balance()} />
              <Button transparent title="Address" onPress={() => address()} />
              <Button transparent title="List unspents" onPress={() => unspents()} />
              <Button transparent title="List transactions" onPress={() => transactions()} />
            </Fragment>
          )}
          <Text>{response}</Text>
        </View>

        <View>
          <Text heading="h2">Wallet 1</Text>
          <Button transparent title="Wallet Init" onPress={walletInit1} />
          {wallet1?.isInit && (
            <Fragment>
              <Button transparent title="Sync" onPress={() => sync(false)} />
              <Button transparent title="Balance" onPress={() => balance(false)} />
              <Button transparent title="Address" onPress={() => address(false)} />
              <Button transparent title="List unspents" onPress={() => unspents(false)} />
              <Button transparent title="List transactions" onPress={() => transactions(false)} />
            </Fragment>
          )}
          <Text>{response1}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Ffi;
