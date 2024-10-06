//react components
import React from 'react';
//stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//global
import { ScreenNames } from '../global/Index';
//screens
import Feed from '../screens/Feed';
import Profile from '../screens/Profile';

const MainStack = () => {
  //variables
  const Stack = createNativeStackNavigator();
  const initialRouteName = ScreenNames.FEED;
  const screenOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={ScreenNames.FEED} component={Feed} />
      <Stack.Screen name={ScreenNames.PROFILE} component={Profile} />
    </Stack.Navigator>
  );
};

export default MainStack;