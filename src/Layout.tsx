import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalStyles} from './styles/styles';
import PropTypes from 'prop-types';

const Layout = props => {
  const {children, center} = props;
  let internalStyles = {...globalStyles.layoutMainContainer};
  if (center) internalStyles = {...internalStyles, alignItems: 'center'};
  return <SafeAreaView style={internalStyles}>{children}</SafeAreaView>;
};

Layout.propTypes = {
  center: PropTypes.bool,
};
Layout.defaultProps = {
  center: true,
};

export default Layout;
