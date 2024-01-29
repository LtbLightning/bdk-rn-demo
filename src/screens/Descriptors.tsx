import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import Button from '../elements/Button';
import {Text} from '../elements/Text';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Layout from '../Layout';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import {CreateDescriptorRequest} from 'bdk-rn/lib/lib/interfaces';
import BdkRn from 'bdk-rn';
import {AppColors} from '../styles/things';

const Descriptors = ({back}) => {
  const [seed, _seed] = useState('');
  const [password, _password] = useState('');

  const [useMnemonic, _useMnemonic] = useState(false);
  const [type, _type] = useState<any>('');
  const [response, _response] = useState<any>('');
  const publicKeys = ['KEY1', 'KEY2', 'KEY3'];

  const radioButtonsData: RadioButtonProps[] = [
    'default',
    null,
    '',
    'p2wpkh',
    'wpkh',
    'p2pkh',
    'pkh',
    'shp2wpkh',
    'p2shp2wpkh',
    'MULTI',
  ].map((i, idx) => ({
    id: idx,
    value: i,
    label: i == null ? 'null' : i == '' ? "blank('')" : i,
    selected: idx == 0,
  }));

  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData);

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    _type(radioButtons.filter(i => i.selected)[0].value);
    setRadioButtons(radioButtonsArray);
  };

  const createDesc = async () => {
    const args: CreateDescriptorRequest = {
      type: type,
      mnemonic: seed,
      password: password,
      path: '',
      network: 'testnet',
      publicKeys: publicKeys,
      threshold: 4,
      // xprv: seed,
    };
    try {
      const apiResponse = await BdkRn.createDescriptor(args);
      if (apiResponse.isOk()) _response(apiResponse.value);
      else Alert.alert('Error', apiResponse.error.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Text heading="h2">Manage Descriptors</Text>

      <View style={styles.row}>
        <BouncyCheckbox isChecked={useMnemonic} onPress={_useMnemonic} />
        <Text>Check if menmonic OR uncheck if XPRV ?</Text>
      </View>
      <Text>{useMnemonic ? 'Seed phrase' : 'XPRV'}:</Text>
      <TextInput style={styles.modalInput} multiline numberOfLines={5} value={seed} onChangeText={_seed} />
      {useMnemonic && (
        <>
          <Text> Password </Text>
          <TextInput style={{...styles.modalInput, height: 30}} value={password} onChangeText={_password} />
        </>
      )}
      <Text heading="h3">Type:</Text>
      <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} containerStyle={styles.typeContainer} />
      {type == 'multi' && <Text>Public Keys: {JSON.stringify(publicKeys)}</Text>}
      <Button title="Create descriptor" onPress={() => createDesc()} />
      <Text>{response}</Text>

      <Button title="<-- Back" onPress={() => back()} style={{backgroundColor: AppColors.black}} />
    </Layout>
  );
};

export default Descriptors;

const styles = StyleSheet.create({
  row: {flexDirection: 'row', marginVertical: 5},
  typeContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  modalInput: {width: 250, height: 75, borderWidth: 1, padding: 5, borderColor: AppColors.lightBlack},
});
