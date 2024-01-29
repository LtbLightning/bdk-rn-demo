import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Descriptors from '../screens/Descriptors';

const MainStack = createNativeStackNavigator();

const SecondNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Descriptors" component={Descriptors} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default SecondNavigator;
