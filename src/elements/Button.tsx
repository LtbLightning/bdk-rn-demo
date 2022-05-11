import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/things';
import {Text} from './Text';

const Button = () => {
  return (
    <Pressable>
      <Text>Button</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    height: 46,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: AppColors.orange,
  },
});
