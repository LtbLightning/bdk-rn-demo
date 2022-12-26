import BdkRn from 'bdk-rn';
import React, {useEffect, useState} from 'react';

import Back from '../elements/Back';
import Logo from '../elements/Logo';
import {Text} from '../elements/Text';
import Layout from '../Layout';
import {AppColors, fontFamily} from '../styles/things';

const Pending = props => {
  const [list, _list] = useState('');
  useEffect(() => {
    (async () => {
      let res = await BdkRn.getPendingTransactions();
      _list(JSON.stringify(res.value));
    })();
  }, []);
  return (
    <Layout>
      <Logo />
      <Text heading="h2" color={AppColors.orange} style={{fontFamily: fontFamily.medium}}>
        Your pending transactions
      </Text>
      <Text>{list}</Text>
      <Back />
    </Layout>
  );
};

export default Pending;
