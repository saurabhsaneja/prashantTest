//import : react components
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MainStack from './src/navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

const App = () => {
  //UI
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor={'black'} />
          <MainStack />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
};

export default App;