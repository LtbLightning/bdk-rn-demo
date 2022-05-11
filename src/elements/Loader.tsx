import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/things';

const Loader = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={AppColors.white} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    backgroundColor: AppColors.lightBlack,
    zIndex: 10,
  },
});
