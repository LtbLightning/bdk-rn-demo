import {StyleSheet} from 'react-native';
import {AppColors} from './things';

export const globalStyles = StyleSheet.create({
  layoutMainContainer: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 5,
    backgroundColor: AppColors.white,
  },
  centerItems: {
    alignItems: 'center',
  },
  btn: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: AppColors.orange,
    marginVertical: 10,
    width: '80%',
  },
  text: {color: AppColors.black, fontSize: 20},
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: AppColors.lightBlack,
    width: '80%',
  },
});
