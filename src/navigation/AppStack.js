import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreens from '../screens/HomeScreens';
import DetailScreens from '../screens/DetailScreens';
import AddContactScreens from '../screens/AddContactScreens';
import SplashScreens from '../screens/SplashScreens';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loader" component={SplashScreens} />
        <Stack.Screen name="Home" component={HomeScreens} />
        <Stack.Screen name="Details" component={DetailScreens} />
        <Stack.Screen name="AddContact" component={AddContactScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
