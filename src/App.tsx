import React from 'react';
import {StyleSheet} from 'react-native';

import Logo from './elements/Logo';
import {Text} from './elements/Text';
import Layout from './Layout';
import {AppColors} from './styles/things';

const App = () => {
  return (
    <Layout>
      <Logo />
      <Text heading="h1">Bitcoin Wallet</Text>
      <Text heading="h3" color={AppColors.lightBlack}>
        A simple bitcoin wallet for your enjoyment.
      </Text>
    </Layout>
  );
};

export default App;

const styles = StyleSheet.create({});
