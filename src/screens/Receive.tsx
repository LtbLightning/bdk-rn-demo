import BdkRn from 'bdk-rn';
import React, { useEffect, useState } from 'react';

import Back from '../elements/Back';
import Logo from '../elements/Logo';
import { Text } from '../elements/Text';
import Layout from '../Layout';
import { AppColors, fontFamily } from '../styles/things';

const Receive = props => {
  const [address, _address] = useState('');
  useEffect(() => {
    (async () => {
      let res = await BdkRn.getNewAddress();
      _address(res.value);
    })();
  }, []);
  return (
    <Layout>
      <Logo />
      <Text heading="h2" color={AppColors.orange} style={{fontFamily: fontFamily.medium}}>
        Your wallet address
      </Text>
      <Text>{address}</Text>
      <Back />
    </Layout>
  );
};

export default Receive;
