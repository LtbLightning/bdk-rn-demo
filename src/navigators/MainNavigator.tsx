import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Send from '../screens/Send';
import Receive from '../screens/Receive';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Send" component={Send} />
        <MainStack.Screen name="Receive" component={Receive} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
