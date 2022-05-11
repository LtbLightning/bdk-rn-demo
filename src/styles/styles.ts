import {StyleSheet} from 'react-native';
import {AppColors} from './things';

export const globalStyles = StyleSheet.create({
  layoutMainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centerItems: {
    alignItems: 'center',
  },
  text: {color: AppColors.black, fontSize: 20},
});
