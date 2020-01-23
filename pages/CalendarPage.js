import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text style={{ marginTop: 50, fontSize: 25 }}>Calendar</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     width: 300,
//     marginTop: 16,
//   },
// });
