//import : react components
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MainStack from './src/navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  //UI
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={'black'} />
        <MainStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;