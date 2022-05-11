import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/things';
import {Text} from './Text';

const Button = ({onPress, children, title, ...props}) => {
  return (
    <Pressable onPress={onPress} style={{...styles.btn, ...props.style}}>
      <Text heading="h3" color={AppColors.white}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: AppColors.orange,
    marginVertical: 20,
    width: '80%',
  },
});
