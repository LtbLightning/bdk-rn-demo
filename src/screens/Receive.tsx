import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../Layout';
import {Text} from '../elements/Text';

import RnBdk from 'bdk-rn';
import {AppColors, fontFamily} from '../styles/things';
import Logo from '../elements/Logo';
import Button from '../elements/Button';
import Back from '../elements/Back';

const Receive = props => {
  const [address, _address] = useState('NEW test address');
  useEffect(() => {
    (async () => {
      let res = await RnBdk.getNewAddress();
      _address(res.data);
    })();
  }, []);
  return (
    <Layout>
      <Logo />
      <Text heading="h2" color={AppColors.orange} style={{fontFamily: fontFamily.medium}}>
        Your wallet address
      </Text>
      <Text>{address}</Text>
      <Back {...props} />
    </Layout>
  );
};

export default Receive;

const styles = StyleSheet.create({});
