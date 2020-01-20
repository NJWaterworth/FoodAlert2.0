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

export default class ProfilePage extends React.Component {
  static navigationOptions = {
    title: 'Profile',
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
        title="Go to Calendar"
        onPress={() => navigate('Calendar', {name: 'Jane'})}
      />
    </View>
    );
  }
}
