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

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {TextInput} from 'react-native';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: undefined
    };
  }

  onDayPress = (day) => {
    this.setState({selected: day.dateString});
    TextInput
    console.log('selected day', day);
  }

  onDayLongPress = (day) => {
    this.setState({selected: day.dateString});
    console.log('selected day', day);
  }
  static navigationOptions = {
    title: 'Calendar',
  };
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Calendar
          // Handler which gets executed on day press. 
          onDayPress={this.onDayPress}
          // Handler which gets executed on day long press. 
          onDayLongPress={this.onDayLongPress}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {console.log('month changed', month)}}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Collection of dates that have to be marked. Default = {}
          markedDates={{[this.state.selected]: {selected: true, selectedDotColor: 'blue'}}}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{}}
        />
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
