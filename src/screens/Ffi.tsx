/* eslint-disable curly */
import {
  Address,
  Blockchain,
  BumpFeeTxBuilder,
  DatabaseConfig,
  DerivationPath,
  Descriptor,
  DescriptorPublicKey,
  DescriptorSecretKey,
  Mnemonic,
  PartiallySignedTransaction,
  Transaction,
  TxBuilder,
  Wallet,
} from 'bdk-rn';
import {AddressIndex, BlockChainNames, BlockchainEsploraConfig, KeychainKind, WordCount} from 'bdk-rn/lib/lib/enums';
import {BlockchainElectrumConfig, BlockchainRpcConfig, Network} from 'bdk-rn/src/lib/enums';
import {OutPoint, ScriptAmount, SignOptions} from 'bdk-rn/src/classes/Bindings';
import React, {Fragment, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

import Button from '../elements/Button';
import Loader from '../elements/Loader';
import RnBgTask from 'react-native-bg-thread';
import {Text} from '../elements/Text';

let xprvWallet =
  "tprv8ZgxMBicQKsPddfv1ciyQYYFujwNsBQnSDW6DjT55pA6UXPM6foNPd4mfHM8vbcbmAMf7R3Fj416o4P1A5Nu8GM9nEhALLVhve6mSAz11o7/84'/1'/0'/0/*";

let xprvWallet1 =
  "tprv8ZgxMBicQKsPd3G66kPkZEuJZgUK9QXJRYCwnCtYLJjEZmw8xFjCxGoyx533AL83XFcSQeuVmVeJbZai5RTBxDp71Abd2FPSyQumRL79BKw/84'/1'/0'/0/*";

let mnemonicString = 'cream ecology sniff amazing awful ocean gaze can peanut abandon emotion affair';

let publicKey =
  'tpubD6NzVbkrYhZ4X6hhuGPZoxCNUmTK2Wbh1X6sWFVNW5xVK1e7j4cxa7gdqPfWZ9AKeiaYYjhVi75t2gbubG3oPNpwpAoMtW9ki4Aj7itJMhm/*';

let psbtString =
  'cHNidP8BAJoBAAAAAivIGwj79VJdDEMC6DTEBFWNRXh8i63O5Bj2ul/ckLSiAAAAAAD+////q/fYDAwa/ovXiOHXMMJWBzSSppAfXu8xVBWr97kc60kAAAAAAP7///8CCwUAAAAAAAAWABTiG3occFHBPEfIFYEno1q+KemyBNwFAAAAAAAAFgAUJeosBE8pPYv+vWAJxdrAq2HPlb50ByUAAAEA3gEAAAAAAQG1SXpVEroudlm2vsvLISuSLWqp3SMiU8bE/zFmMfSlrAEAAAAA/v///wLcBQAAAAAAABYAFCXqLARPKT2L/r1gCcXawKthz5W+kRAAAAAAAAAWABRIuasG/iTpawzZOHBRQUPdiAgtjwJHMEQCICkgZhWePD/RuE7V87/VcxX6PIv9LPg8+K6O42bX49usAiBe+ohVk1/abwUqmeqYuSM8x/e6sDrnZB1rD6GFdfm9iQEhApqPApANDfpFbG9N/WKaIz7W/c4Mf/7J8Zw2Usaj0G/InfEkAAEBH9wFAAAAAAAAFgAUJeosBE8pPYv+vWAJxdrAq2HPlb4iBgKn69zak6elBqiAOr/Z//pXXXHCW9JlHB6Nh9ccRCENABgJwK/eVAAAgAEAAIAAAACAAAAAAAcAAAAAAQD9cgEBAAAAAAECovbyC3Cz7gh5c5NeEl+NmyrVHkJ1d2rhU7Uh+DmS7NkBAAAAAP7///+SPhXvmO5lpEkSYDX3pXJX4UQxOwl3kr/j1zniiE3ZngEAAAAA/v///wLcBQAAAAAAABYAFCXqLARPKT2L/r1gCcXawKthz5W+sBoAAAAAAAAWABRAhHNCgth+tfSl0MjNpNs3O47FEgJHMEQCIHl0XcCSCH7JKLwvO32VdRO0J9W0V/IL3RaQ0Vp4ac3WAiBW5cHlrtP+mxBDJ+wMj8DCjptEnO9zxDw9heSw6CL7GwEhAqfr3NqTp6UGqIA6v9n/+lddccJb0mUcHo2H1xxEIQ0AAkcwRAIgUzTkO+PIbFWFVbZRl6ygi7yt/hCYEmVijPrJFr1E458CIAbTRLNvI8lsnDhcoze8mHZTkrAhfQQxexiy4AVxPYvJASEDNiD45tgRtvrlY6QCHTSPq/yyeARojSMzPVWTgO7tHite+SQAAQEf3AUAAAAAAAAWABQl6iwETyk9i/69YAnF2sCrYc+VviIGAqfr3NqTp6UGqIA6v9n/+lddccJb0mUcHo2H1xxEIQ0AGAnAr95UAACAAQAAgAAAAIAAAAAABwAAAAAiAgI2ReskgqkBRuwxJXtQ26XViRJaolnh8310DqkZHcZkzRgJwK/eVAAAgAEAAIAAAACAAAAAAAkAAAAAIgICp+vc2pOnpQaogDq/2f/6V11xwlvSZRwejYfXHEQhDQAYCcCv3lQAAIABAACAAAAAgAAAAAAHAAAAAA==';

let networkString = Network.Testnet;

let signOptions = new SignOptions(false, false, 152, false, false, false, false, false);

const Ffi = () => {
  const [loading, _loading] = useState(false);
  const [response, _response] = useState<any>();
  const [response1, _response1] = useState<any>();
  const [seed, _seed] = useState<any>();

  const [descriptor, _descriptor] = useState<any>(xprvWallet1);
  const [descriptorPubKey, _descriptorPubKey] = useState<DescriptorPublicKey>();
  const path = 'm/84h/1h/0h/0';
  const publicPath = 'm/44/1/0/0';

  const genSeed = async () => {
    try {
      _loading(true);
      const fromWordCount = await new Mnemonic().create(WordCount.WORDS24);
      console.log('FROM WORDS COUNT:', fromWordCount.asString());

      const fromString = await new Mnemonic().fromString(fromWordCount.asString());
      console.log('FROM STRING:', fromString.asString());

      const fromEntropy = await new Mnemonic().fromEntropy([1, 2, 9, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
      console.log('FROM ENTROPY:', fromEntropy.asString());

      _response(fromWordCount.asString());
      _seed(fromWordCount.asString());
      _loading(false);
    } catch (err) {
      _loading(false);
    }
  };

  const descriptorSecret = async () => {
    try {
      // _loading(true);
      let mnemonic = await new Mnemonic().fromString(mnemonicString);
      const descSecretKeyObj = new DescriptorSecretKey();
      const derivationPathObj = new DerivationPath();

      const xprv = await descSecretKeyObj.create(networkString, mnemonic);

      const derivationPath = await derivationPathObj.create(path);
      console.log('Secret key', await xprv.asString());
      console.log('Derive Secret key', await xprv.derive(derivationPath));
      let extended = await xprv.extend(derivationPath);
      console.log('Extend Secret key', extended);

      _descriptor(extended);

      let pubKey = await xprv.asPublic();
      console.log('Pubkey', pubKey);
      console.log('Pubkey Value', await pubKey.asString());
      _descriptorPubKey(await xprv.asPublic());
      console.log('Secret Bytes', await xprv.secretBytes());
      console.log('As String', await xprv.asString());

      _loading(false);
    } catch (err) {
      console.log(err);
      _loading(false);
    }
  };

  const descriptorPublic = async () => {
    try {
      _loading(true);

      const descPubKeyObj = new DescriptorPublicKey();
      const derivationPathObj = new DerivationPath();

      const xpub = await descPubKeyObj.fromString(publicKey);
      console.log('Public key from string', await xpub.asString());

      const derivationPath = await derivationPathObj.create(publicPath);
      console.log('Public key', await xpub?.asString());
      console.log('Extend Public key', await xpub?.extend(derivationPath));
      console.log('Derive Public key', await xpub?.derive(derivationPath));

      _loading(false);
    } catch (err) {
      console.log(err);
      _loading(false);
    }
  };

  const blockchainInstance = new Blockchain();
  const [blockchain, setBlockchain] = useState<Blockchain>(blockchainInstance);
  const [blockchain1, setBlockchain1] = useState<Blockchain>(blockchainInstance);

  const initBlockChain = async () => {
    try {
      _loading(true);

      /** =============== RPC CONFIG =============== */
      // let config: BlockchainRpcConfig = {
      //   url: 'http://192.168.8.100:18443',
      //   network: networkString,
      //   walletName: 'w1',
      //   authUserPass: {username: 'polaruser', password: 'polarpass'},
      //   syncParams: {startScriptCount: 15, startTime: 15, forceStartTime: true, pollRateSec: 120},
      // };

      // setBlockchain(await blockchainInstance.create(config, BlockChainNames.Rpc));
      // setBlockchain1(await blockchainInstance.create(config, BlockChainNames.Rpc));
      /** =============== RPC CONFIG =============== */

      /** =============== Electrum CONFIG =============== */
      let config: BlockchainElectrumConfig = {
        url: 'ssl://electrum.blockstream.info:60002',
        sock5: null,
        retry: 5,
        timeout: 5,
        stopGap: 500,
        validateDomain: false,
      };
      setBlockchain(await blockchainInstance.create(config));
      setBlockchain1(await blockchainInstance.create(config));
      /** =============== Electrum CONFIG =============== */

      /** =============== Esplora CONFIG =============== */
      // let config: BlockchainEsploraConfig = {
      //   baseUrl: 'https://blockstream.info/testnet/api',
      //   proxy: null,
      //   concurrency: 5,
      //   stopGap: 5,
      //   timeout: 5,
      // };

      // setBlockchain(await blockchainInstance.create(config, BlockChainNames.Esplora));
      // setBlockchain1(await blockchainInstance.create(config, BlockChainNames.Esplora));
      /** =============== Esplora CONFIG =============== */

      const height = await blockchain.getHeight();
      const hash = await blockchain.getBlockHash(height);
      _response(`Height: ${height},\n Hash: ${hash}`);
      _loading(false);
    } catch (e) {
      console.log('RPC error', e);
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

      const network = networkString;
      const mnemonicObj = await new Mnemonic().fromString(mnemonicString);
      const secretKeyObj = await new DescriptorSecretKey().create(network, mnemonicObj);
      const descriptorObj = await new Descriptor().newBip84(secretKeyObj, KeychainKind.Internal, network);

      const dbConfig = await new DatabaseConfig().memory();
      const w = await walletInstance.create(descriptorObj, null, network, dbConfig);
      setWallet(w);
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
      setWallet1(await walletInstance1.create(wpkh1, networkString));
      _loading(false);
    } catch (e) {
      console.log('Blockchain error', e);
      _loading(false);
    }
  };

  const sync = () => {
    console.log('Sync UI block testing');
    RnBgTask.runInBackground(() => {
      let start = Date.now();
      wallet?.sync(blockchain).then(e => {
        console.log('Sync Completed', e);
        let timeTaken = Date.now() - start;
        console.log('Total time taken : ' + timeTaken + ' milliseconds');
      });
    });
    console.log('===========Done==========');

    getBalance();

    // console.log('Get Balance called');
    // wallet?.getBalance().then(e => console.log('Balance Completed', e));

    // console.log('Address called');
    // wallet?.getAddress(AddressIndex.New).then(e => console.log('Address Response', e));
  };

  const getBalance = () => {
    console.log('Get Balance called');
    wallet?.getBalance().then(e => console.log('Balance Completed', e));
  };

  // const sync = async () => {
  //   console.log('Sync UI block testing');
  //   let start = Date.now();
  //   const synced = await wallet?.sync(blockchain);
  //   const bal = await wallet?.getBalance();
  //   console.log('Synced:', synced);
  //   console.log('Balance:', bal);

  //   let timeTaken = Date.now() - start;
  //   console.log('Total time taken : ' + timeTaken + ' milliseconds');
  // };

  const getAddress = async () => {
    console.log('Address called');
    let addr = await wallet?.getAddress(AddressIndex.New);
    console.log('External Address::', addr);

    const script = await addr?.address?.scriptPubKey();

    console.log('Iternal Address::', await wallet?.getInternalAddress(AddressIndex.New));

    console.log('Is wallet mine::', await wallet?.isMine(script));
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
      console.log(await wallet?.listTransactions(false));
    } else {
      console.log(await wallet1?.listTransactions(true));
    }
    _loading(false);
  };

  let txId = 'b56bb94471074aa6674b9bac22e66b97cb9bd307988e9fc3502df18e8b2d1d00';
  let addressHash = 'bcrt1q6txq9z7wjcxwkr2epph3zvrvl7lhw0ej2jd63x';

  const sendBit = async (one = true) => {
    let broadcast;
    let psbt;

    if (one) {
      let address = await new Address().create(addressHash);
      let script = await address.scriptPubKey();
      let txBuilder = await new TxBuilder().create();
      await txBuilder.addRecipient(script, 20000);
      await txBuilder.enableRbf();
      let txBuilderResult = await txBuilder.finish(wallet);
      psbt = await wallet?.sign(txBuilderResult.psbt);
      let tx = await psbt?.extractTx();
      broadcast = await blockchain.broadcast(tx);
    } else {
      let address = await new Address().create('tb1qccmtnhczmv3a6k4mtq8twm7ltj3e32qsntmamv');
      let script = await address.scriptPubKey();
      let txBuilder = await new TxBuilder().create();
      await txBuilder.addRecipient(script, 1500);
      let txBuilderResult = await txBuilder.finish(wallet1);
      psbt = await wallet1?.sign(txBuilderResult.psbt);
      broadcast = await blockchain1.broadcast(psbt);
    }
    console.log('Broadcast', broadcast, psbt);
  };

  const extraTxMethods = async () => {
    let txBuilder = await new TxBuilder().create();
    let amount = 999;
    let script = await (await new Address().create(addressHash)).scriptPubKey();
    let script1 = await (await new Address().create('tb1qvdgr0mhn354zzc5q6ex0p6stkuj4qcjl640ju2')).scriptPubKey();
    await txBuilder.addUnspendable(new OutPoint(txId, 750));
    await txBuilder.addUtxo(new OutPoint(txId, 750));
    await txBuilder.addUtxos([new OutPoint(txId, 750)]);
    await txBuilder.doNotSpendChange();
    await txBuilder.manuallySelectedOnly();
    await txBuilder.onlySpendChange();
    await txBuilder.unspendable([new OutPoint(txId, 750)]);
    await txBuilder.feeRate(15);
    await txBuilder.feeAbsolute(15);
    await txBuilder.drainWallet();
    await txBuilder.drainTo(script);
    await txBuilder.enableRbf();
    await txBuilder.enableRbfWithSequence(15);
    await txBuilder.addData([15, 20, 25, 30]);

    const scriptAmounts: Array<ScriptAmount> = [new ScriptAmount(script, amount), new ScriptAmount(script1, amount)];
    await txBuilder.setRecipients(scriptAmounts);

    console.log(await script.toBytes());
    console.log('No Error occured', txBuilder);
  };

  const descriptors = async () => {
    let mnemonic = await new Mnemonic().fromString(mnemonicString);
    const secretKey = await new DescriptorSecretKey().create(networkString, mnemonic);

    let descObject = await new Descriptor().create(`wpkh(${xprvWallet})`, networkString);
    const bip44 = await new Descriptor().newBip44(secretKey, KeychainKind.External, networkString);
    const bip49 = await new Descriptor().newBip49(secretKey, KeychainKind.External, networkString);
    const bip84 = await new Descriptor().newBip84(secretKey, KeychainKind.External, networkString);

    console.log('Default---->', await descObject.asString(), await descObject.asStringPrivate());
    console.log('44--->', bip44, await bip44.asString(), await bip44.asStringPrivate());
    console.log('49--->', bip49, await bip49.asString(), await bip49.asStringPrivate());
    console.log('84--->', bip84, await bip84.asString(), await bip84.asStringPrivate());
  };

  const publicDescriptors = async () => {
    try {
      const fingerprint = 'd1d04177';
      let mnemonic = await new Mnemonic().fromString(mnemonicString);
      const secretKey = await new DescriptorSecretKey().create(networkString, mnemonic);
      const pubKey = await secretKey.asPublic();

      console.log('<====== Public descriptor templates=========>');
      const bip44 = await new Descriptor().newBip44Public(pubKey, fingerprint, KeychainKind.External, networkString);
      const bip49 = await new Descriptor().newBip49Public(pubKey, fingerprint, KeychainKind.External, networkString);
      const bip84 = await new Descriptor().newBip84Public(pubKey, fingerprint, KeychainKind.External, networkString);

      console.log('44--->', bip44, await bip44.asString(), await bip44.asStringPrivate());
      console.log('49--->', bip49, await bip49.asString(), await bip49.asStringPrivate());
      console.log('84--->', bip84, await bip84.asString(), await bip84.asStringPrivate());
    } catch (e) {
      console.log('Error while creating public keys', e);
    }
  };

  const psbtMethods = async () => {
    const psbt = new PartiallySignedTransaction(psbtString);
    let transactionObject = await psbt.extractTx();
    let byteArray = await transactionObject.serialize();

    let txObject = await new Transaction().create(byteArray);
    console.log('====================PSBT===================');
    // console.log('TxId: ', await psbt.txid());
    // console.log('Fee Amount: ', await psbt.feeAmount());
    // console.log('Fee Rate: ', await psbt.feeRate());
    // console.log('JSON serialize: ', await psbt.jsonSerialize());

    console.log('====================TRANSACTION===================');
    console.log('TXObject', txObject);
    // console.log('Serialize: ', await txObject.serialize());
    console.log('txid: ', await txObject.txid());
    console.log('weight: ', await txObject.weight());
    console.log('size: ', await txObject.size());
    console.log('vsize: ', await txObject.vsize());
    console.log('isCoinBase: ', await txObject.isCoinBase());
    console.log('isExplicitlyRbf: ', await txObject.isExplicitlyRbf());
    console.log('isLockTimeEnabled: ', await txObject.isLockTimeEnabled());
    console.log('version: ', await txObject.version());
    console.log('lockTime: ', await txObject.lockTime());
    console.log('input: ', await txObject.input());
    console.log('output: ', await txObject.output());
  };

  const bumpTx = async (tid = 'da6e62280471c504dbf92baf78af5bfdde3e6d457ea55cf43c490f091740c898') => {
    const bumpTxBuilder = await new BumpFeeTxBuilder().create(tid, 15);
    console.log('Bump tx::', bumpTxBuilder);
    console.log('Shrink::', await bumpTxBuilder.allowShrinking(addressHash));
    console.log('RBF::', await bumpTxBuilder.enableRbf());
    console.log('RBF Sequence::', await bumpTxBuilder.enableRbfWithSequence(15));
    console.log('Finish::', await bumpTxBuilder.finish(wallet));
    _response('Send and Bump Finish');
  };

  const addressExtras = async () => {
    let addr = await new Address().create('tb1qccmtnhczmv3a6k4mtq8twm7ltj3e32qsntmamv');
    let script = await addr?.scriptPubKey();

    let address = await new Address().fromScript(script, Network.Testnet);
    console.log('From Script', address);
    console.log(await address?.payload());
    console.log(await address?.network());
    console.log(await address?.toQrUri());
    console.log(await address?.asString());
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
        {/* {loading && <Loader />} */}
        {/* <Button transparent title="Secret Descriptor" onPress={descriptors} />
        <Button transparent title="Public Descriptor" onPress={publicDescriptors} />
        <Button transparent title="PSBT" onPress={psbtMethods} /> */}
        <View>
          <Button transparent title="PSBT" onPress={() => psbtMethods()} />
          <Button transparent title="Init blockchain" onPress={() => initBlockChain()} />
          <Text heading="h2">Wallet</Text>
          <Button transparent title="Seed" onPress={genSeed} />
          <Button transparent title="Descriptor Secret" onPress={descriptorSecret} />
          <Button transparent title="Descriptor Public" onPress={descriptorPublic} />
          <Button transparent title="Wallet Init" onPress={walletInit} />
          {wallet?.isInit && (
            <Fragment>
              <Button transparent title="Sync" onPress={() => sync()} />
              <Button transparent title="Get Balance" onPress={() => getBalance()} />
              <Button transparent title="Address" onPress={() => getAddress()} />
              <Button transparent title="List unspents" onPress={() => unspents()} />
              <Button transparent title="List transactions" onPress={() => transactions()} />
              <Button transparent title="Send" onPress={() => sendBit()} />
              <Button transparent title="Address Extras" onPress={() => addressExtras()} />
            </Fragment>
          )}
          <Button transparent title="TxBuilders" onPress={() => extraTxMethods()} />
          <Text>{response}</Text>
        </View>

        {/* <View>
          <Text heading="h2">Wallet 1</Text>
          <Button transparent title="Wallet Init" onPress={walletInit1} />
          {wallet1?.isInit && (
            <Fragment>
              <Button transparent title="Sync" onPress={() => sync(false)} />
              <Button transparent title="Balance" onPress={() => balance(false)} />
              <Button transparent title="Address" onPress={() => getAddress(false)} />
              <Button transparent title="List unspents" onPress={() => unspents(false)} />
              <Button transparent title="List transactions" onPress={() => transactions(false)} />
              <Button transparent title="Send" onPress={() => sendBit(false)} />
            </Fragment>
          )}
          <Text>{response1}</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ffi;
