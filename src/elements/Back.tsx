import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {AppColors} from '../styles/things';
import Button from './Button';

const Back = props => {
  const navigation = useNavigation();
  return <Button title="<-- Back" onPress={() => navigation.goBack()} style={{backgroundColor: AppColors.black}} />;
};

export default Back;
