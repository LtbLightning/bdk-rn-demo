import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/things';

const Logo = () => {
  return (
    <View style={styles.backgroud}>
      <Image source={require('./../assets/images/logo.png')} style={styles.image} resizeMode="cover" />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  backgroud: {
    backgroundColor: AppColors.orange,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 35,
  },
  image: {width: 35, height: 35},
});
