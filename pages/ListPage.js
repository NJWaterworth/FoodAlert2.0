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

export default class ListPage extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
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
          title="Go to Calendar"
          onPress={() => navigate('Calendar', {name: 'Jane'})}
        />
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      </View>
    );
  }
}
