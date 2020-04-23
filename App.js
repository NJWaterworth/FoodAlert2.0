/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import ProfileChange from './pages/ProfileChangePage'
import ListPage from './pages/ListPage';
import CameraPage from './pages/CameraPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ReviewPage from './pages/ReviewPage';

const LoginStack = createStackNavigator({
  Login: {screen: LoginPage},
  Register: {screen: RegisterPage},
  ForgotPassword: {screen: ForgotPasswordPage},
},
{
  navigationOptions: {
      headerShown: false,
},
});

const CalendarStack = createStackNavigator({
  Calendar: {screen: CalendarPage},
  },
  {
  defaultNavigationOptions: {
  //Header customization of the perticular Screen
    headerStyle: {
      backgroundColor: '#42f44b',
    },
    headerTintColor: '#FFFFFF',
    title: 'Calendar',
    }
  });

const ProfileStack = createStackNavigator({
  Profile: {screen: ProfilePage},
  ProfileChange: {screen: ProfileChange}
  },
  {
  defaultNavigationOptions: {
  //Header customization of the perticular Screen
    headerStyle: {
      backgroundColor: '#42f44b',
    },
    headerTintColor: '#FFFFFF',
    title: 'List',
    }
});

const ListStack = createStackNavigator({
  List: {screen: ListPage},
});

const CameraStack = createStackNavigator({
  Camera: {screen: CameraPage},
  ReviewPage: {screen: ReviewPage}
  },
  {
    navigationOptions: {
        headerShown: false,
  },
});

const Home = createBottomTabNavigator(
  {
    Calendar: { screen: CalendarStack },
    List: { screen: ListStack },
    Camera: { screen: CameraStack },
    Profile: { screen: ProfileStack },
  },
  // {
  //
  // },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let Icon = Ionicons;
        let iconName;
        if (routeName === 'Calendar') {
          iconName = 'ios-calendar'
        } else if (routeName === 'List') {
          iconName = "ios-browsers";
        } else if (routeName === 'Camera') {
          iconName = `ios-camera`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
    navigationOptions: {
        headerShown: false,
      }
  });

const App = createStackNavigator({
  LoginStack,
  Home,
});

const styles = StyleSheet.create({

});

export default createAppContainer(App);
