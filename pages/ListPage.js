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
    title: 'List',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text style={{ marginTop: 50, fontSize: 25 }}>List</Text>
      </View>
    );
  }
}
