import {Pressable, StyleSheet, TouchableHighlightBase, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/things';
import {Text} from './Text';
import {globalStyles} from '../styles/styles';

const Button = ({onPress, title, transparent, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress} style={transparent ? [] : [(globalStyles.btn, props.style)]}>
      <Text heading="h3" color={transparent ? AppColors.orange : AppColors.white}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
