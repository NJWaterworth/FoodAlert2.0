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

export default class CalendarPage extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button
          title="Go to Camera"
          onPress={() => navigate('Camera', {name: 'Jane'})}
        />
        <Button
          title="Go to List Page"
          onPress={() => navigate('List', {name: 'Jane'})}
        />
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      </View>
    );
  }
}
