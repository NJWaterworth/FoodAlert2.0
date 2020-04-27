import React from 'react';

import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CustomButton from '../components/custombutton';
import firebase from 'react-native-firebase';
import helpers from '../helpers';
import CustomListview from '../components/customlistview';

const expired = {key:'expired', color: 'red', state: 'expired'};
let currentUser = firebase.auth().currentUser;

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: undefined,
      foodItem: '',
      foodStatus: ''
    };
  }

  handleChange = e => {
    this.setState({
      foodItem: e.nativeEvent.text,
      foodStatus: 'not expired'
    });
  };

  handleSubmit = () => {
    uid = currentUser.uid;
    if(this.state.selected == null) {
      Alert.alert('Plese select a date');
    }
    else if(this.state.foodItem == '') {
      Alert.alert('Plese enter a food item');
    }
    else {
      helpers.addItem(uid, this.state.selected, this.state.foodStatus, this.state.foodItem);
      this.setState({foodItem: ''});
    }
  };

  onDelete = async () => {
    const uid = currentUser.uid
    const date = this.state.selected
    var ref = firebase.database().ref('Users').child(uid).child("date").child(date);
    ref.once('value', function(snapshot) {
      if(snapshot.val() != null){
        ref.remove();
        Alert.alert("Items successfully deleted.")
      }
      else {
        Alert.alert("Nothing to delete.")
      }
    });
  };

  onDayPress = (day) => {
    this.setState({selected: day.dateString});
    console.log('selected day', day);
    this.handleLoading(day.dateString);
  }

  onDayLongPress = (day) => {
    this.setState({selected: day.dateString});
    console.log('selected day', day);
  }

  static navigationOptions = {
    title: 'Calendar',
  };

  handleLoading(day) {
    const uid = currentUser.uid
    var ref = firebase.database().ref('Users').child(uid).child("date").child(day);
    ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var userData = childSnapshot.val();
        console.log(userData);
      });
    });
    // ref.once('value', (snapshot) => {
    //   userData = snapshot.val();
    //   if(userData != null) {
    //     console.log(userData);
    //     this.setState({foodItem: userData.foodItem, foodStatus: userData.foodStatus});
    //     console.log(this.state.foodItem, this.state.foodStatus);
    //   }
    // });
  }

  render() {
    const {navigate} = this.props.navigation;
    const { selected } = this.state;
    const selectedDate = selected ? selected.toString() : ''; //Start date
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
          markedDates={{
            // examples of dots or select color
            '2020-03-25': {dots: [expired], selectedColor: 'green'},
            '2020-03-26': {dots: [expired], selectedColor: 'green'},
            [this.state.selected]: {selected: true, selectedColor: 'green'},
          }}
          markingType={'multi-dot'}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{}}
        />
        <Text style={{padding:16}}>SELECT A DATE : {selected} </Text>
        <Text style={{padding:16}}>EXPIRED FOOD :</Text>

        <Text style={{padding:16}}>ADD ITEM</Text>
        <TextInput style={{padding:16}} onChange={this.handleChange} value = {this.state.foodItem} placeholder={'Enter a Food Item and Select a Date'}/>
        
        <CustomButton
          text="Add"
          onPress = {this.handleSubmit.bind(this)}
          customStyle={{
          backgroundColor: 'rgba(88, 194, 141, 0.8)',
          marginBottom: 0, marginTop: 25, marginLeft: 110}}
        />

        <CustomButton
          text="Delete"
          onPress = {this.onDelete.bind(this)}
          customStyle={{
          backgroundColor: 'rgba(88, 194, 141, 0.8)',
          marginBottom: 0, marginTop: 25, marginLeft: 110}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  }	  
});

// const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     width: 300,
//     marginTop: 16,
//   },
// });
