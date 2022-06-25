import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Send from '../screens/Send';
import Receive from '../screens/Receive';
import Confirmed from '../screens/Confirmed';
import Pending from '../screens/Pending';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Send" component={Send} />
        <MainStack.Screen name="Receive" component={Receive} />
        <MainStack.Screen name="Pending" component={Pending} />
        <MainStack.Screen name="Confirmed" component={Confirmed} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
