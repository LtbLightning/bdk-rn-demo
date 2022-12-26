import {DescriptorSecretKey, Mnemonic, DescriptorPublicKey, DerivationPath} from 'bdk-rn';
import {Network} from 'bdk-rn/src/lib/enums';
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

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {loading && <Loader />}
        <Button title="Gen Mnemonic" onPress={() => genSeed()} />
        <Button title="Descriptor Secret key" onPress={descriptorSecret} />
        <Button title="Descriptor Public key" onPress={descriptorPublic} />
        <Text>{response}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Ffi;
