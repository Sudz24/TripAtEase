import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Travel from '../pages/travel'
import Covid from '../pages/covid';
import About from '../pages/about';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';

const fixOppoTextCutOff = () => {
  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: 'lucida grande',
    },
  });
  const oldRender = Text.render;
  Text.render = function render(...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style],
    });
  };

}

fixOppoTextCutOff();

function TravelScreen({ navigation}) {
  return (
    <Stack.Navigator>
    <Stack.Screen
      name="Travel"
      component={Travel}
      options={{ title: 'TripAtEase' , headerTitleAlign:'center', headerTintColor:'#fff', 
        headerStyle: {
            backgroundColor: '#006bad'} }}
    />
  </Stack.Navigator> )
}


function CovidScreen() {
  return (

   <Stack.Navigator>
      <Stack.Screen
        name="Covid"
        component={Covid}
        options={{ title: 'TripAtEase' , headerTitleAlign:'center', headerTintColor:'#fff', 
        headerStyle: {
            backgroundColor: '#006bad'} }}
      />
    </Stack.Navigator> );
}

function AboutScreen() {
    return (
        <Stack.Navigator>
        <Stack.Screen
          name="About"
          component={About}
          options={{ title: 'TripAtEase' , headerTitleAlign:'center', headerTintColor:'#fff', 
        headerStyle: {
            backgroundColor: '#006bad'} }}
        />
      </Stack.Navigator> );
  }


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Travel') {
              iconName = 'md-globe'
            } else if (route.name === 'COVID-19') {
              iconName = 'md-medkit'
            } else if (route.name === 'About') {
              iconName = 'md-book'
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: 'rgba(255,255,255,0.6)',
          keyboardHidesTabBar: true,
          tabStyle: {
            backgroundColor:'#006bad'
          }
        }}
      >
        <Tab.Screen name="Travel" component={TravelScreen} />
        <Tab.Screen name="COVID-19" component={CovidScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
  );
}