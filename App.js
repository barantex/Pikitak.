// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoUpload from './VideoUpload'; // Video yükleme ekranı

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={VideoUpload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
