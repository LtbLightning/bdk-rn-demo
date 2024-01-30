import {StyleSheet, Text as BdkText, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {AppColors, fontFamily, fontSizes} from '../styles/things';

export const Text = ({children, style, ...props}: any) => {
  const {heading, color} = props;
  let internalStyle = {...styles.text};
  internalStyle.color = color;
  if (heading) internalStyle.fontSize = fontSizes[heading];
  internalStyle = {...internalStyle, ...style};
  return (
    <BdkText style={internalStyle} selectable>
      {children}
    </BdkText>
  );
};

Text.propTypes = {
  heading: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', false]),
  color: PropTypes.any,
};

Text.defaultProps = {
  heading: false,
  color: AppColors.black,
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.h5,
    marginVertical: 5,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },
});
