// import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/login';
import Register from '../pages/register';
import Tabs from './tabs';


const Stack = createStackNavigator();

const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
          headerShown: false,
          drawerLockMode: 'locked-closed'
        }
      },
      Register: {
        screen: Register,
        navigationOptions: {
          headerShown: false,
          drawerLockMode: 'locked-closed'
        }
      },
      Tabs: {
        screen: Tabs,
        navigationOptions : {
          headerShown: false,
        }
      } 
}

export default function AuthStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Tabs" component={Tabs} options={{ title: 'TripAtEase' , headerTitleAlign:'center', headerTintColor:'#fff', 
        headerStyle: {
            backgroundColor: '#006bad'} }}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
