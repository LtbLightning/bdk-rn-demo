import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput} from 'react-native';
import BdkRn from 'bdk-rn';

import Back from '../elements/Back';
import Button from '../elements/Button';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import {globalStyles} from '../styles/styles';

const Send = props => {
  const [address, _address] = useState('');
  const [amount, _amount] = useState('');

  const sendIt = async () => {
    try {
      await BdkRn.broadcastTx(address, parseInt(amount));
      Alert.alert('Transaction broadcasted!!');
    } catch (err) {
      console.log('Something went wrong');
    }
  };

  return (
    <Layout>
      <Logo />
      <Text heading="h3">Send to Testnet Address</Text>
      <TextInput placeholder="Recepient Address" style={globalStyles.input} value={address} onChangeText={_address} />
      <TextInput
        placeholder="Amount(Sats)"
        style={globalStyles.input}
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={_amount}
      />
      <Button title="Broadcast" onPress={() => sendIt()} />
      <Back {...props} />
    </Layout>
  );
};

export default Send;

const styles = StyleSheet.create({});
