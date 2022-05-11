import React from 'react';
import {AppColors} from '../styles/things';
import Button from './Button';

const Back = props => {
  return (
    <Button title="<-- Back" onPress={() => props.navigation.goBack()} style={{backgroundColor: AppColors.black}} />
  );
};

export default Back;
