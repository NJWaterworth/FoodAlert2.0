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
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import ListPage from './pages/ListPage';
import CameraPage from './pages/CameraPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const MainNavigator = createStackNavigator({
  Login: {screen: LoginPage},
  Register: {screen: RegisterPage},
  Calendar: {screen: CalendarPage},
  Profile: {screen: ProfilePage},
  List: {screen: ListPage},
  Camera: {screen: CameraPage},
});

const App =createAppContainer(MainNavigator);

// const styles = StyleSheet.create({
//
// });

export default App;
