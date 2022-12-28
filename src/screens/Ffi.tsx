import {DescriptorSecretKey, Mnemonic, DescriptorPublicKey, DerivationPath, Blockchain} from 'bdk-rn';
import {BlockChainNames, EntropyLength} from 'bdk-rn/lib/lib/enums';
import {BlockchainElectrumConfig, Network} from 'bdk-rn/src/lib/enums';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import {Text} from '../elements/Text';

const Ffi = () => {
  const [loading, _loading] = useState(false);
  const [response, _response] = useState<any>();
  const [seed, _seed] = useState<any>();
  const path = 'm/84h/1h/0h/0';

  const genSeed = async () => {
    try {
      _loading(true);
      const fromWordCount = await Mnemonic.create(24);
      _response(fromWordCount.asString());
      _seed(fromWordCount.asString());
      _loading(false);

      const fromEntropy = await Mnemonic.fromEntropy(EntropyLength.Length16);
      _response(fromEntropy.asString());
    } catch (err) {
      console.log('ERRO', err);
      _loading(false);
    }
  };

  const descriptorSecret = async () => {
    try {
      _loading(true);
      const xprv = await DescriptorSecretKey.create(Network.Testnet, response);
      const derivationPath = await DerivationPath.create(path);
      console.log('Secret key', xprv.asString());
      console.log('Derivation path', derivationPath.asString());
      console.log('Derive Secret key', (await xprv.derive(path)).asString());
      console.log('Extend Secret key', (await xprv.extend(path)).asString());
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

  const blockchainConfig = async () => {
    try {
      _loading(true);
      let config: BlockchainElectrumConfig = {
        url: 'ssl://electrum.blockstream.info:60002',
        retry: '5',
        timeout: '5',
        stopGap: '5',
      };

      // let config: BlockchainEsploraConfig = {
      //   url: 'http://localhost:5000/',
      //   proxy: '',
      //   concurrency: '5',
      //   stopGap: '5',
      //   timeout: '5',
      // };
      const blockchain = await Blockchain.create(config, BlockChainNames.Electrum);
      const height = await blockchain.getHeight();
      const hash = await blockchain.getBlockHash(height);
      _response(`Height: ${height},\n Hash: ${hash}`);
      _loading(false);
    } catch (e) {
      console.log('Blockchain error', e);
      _loading(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {loading && <Loader />}
        <Button title="Gen Mnemonic" onPress={() => genSeed()} />
        <Button title="Descriptor Secret key" onPress={descriptorSecret} />
        <Button title="Descriptor Public key" onPress={descriptorPublic} />
        <Button title="Blockchain config" onPress={blockchainConfig} />
        <Text>{response}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Ffi;
