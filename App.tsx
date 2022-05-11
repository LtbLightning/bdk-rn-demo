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
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Get new address" onPress={() => getNewAddress()} />
      <Button title="Get balance" onPress={() => getBalance()} />
      <Text selectable>{response}</Text>
    </View>
  );
};

export default App;

