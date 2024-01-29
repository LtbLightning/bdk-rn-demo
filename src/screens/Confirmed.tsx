import BdkRn from 'bdk-rn';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import Back from '../elements/Back';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import {AppColors, fontFamily} from '../styles/things';

const Confirmed = props => {
  const [list, _list] = useState('');
  useEffect(() => {
    (async () => {
      let res = await BdkRn.getConfirmedTransactions();
      _list(JSON.stringify(res.value));
    })();
  }, []);
  return (
    <Layout>
      <Logo />
      <Text heading="h2" color={AppColors.orange} style={{fontFamily: fontFamily.medium}}>
        Your confirmed transactions
      </Text>
      <ScrollView contentContainerStyle={{maxHeight: 400}}>
        <Text>{list}</Text>
      </ScrollView>
      <Back />
    </Layout>
  );
};

export default Confirmed;
