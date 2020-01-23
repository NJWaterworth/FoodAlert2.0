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

export default class CameraPage extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text style={{ marginTop: 50, fontSize: 25 }}>Camera</Text>
      </View>
    );
  }
}
