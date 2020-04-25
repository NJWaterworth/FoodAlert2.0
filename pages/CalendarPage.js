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
import CustomListview from '../components/customlistview';



const expired = {key:'expired', color: 'red', state: 'expired'};
let currentUser = firebase.auth().currentUser;
let addItem = (uid, date, status, item) => {
  var ref = firebase.database().ref('Users').child(uid).child("date").child(date).push({
    foodItem: item,
    foodStatus: status
  }, function(error) {
    if (error) {
      Alert.alert('Item saved failed');
    } else {
      Alert.alert('Item saved successfully');
    }
  });
};

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: undefined,
      foodItem: '',
      foodStatus: '',
      itemList: []
    };
  }

  handleChange = e => {
    this.setState({
      foodItem: e.nativeEvent.text,
      foodStatus: 'not expired'
    });
  };

  handleSubmit = () => {
    uid = currentUser.uid
    addItem(uid, this.state.selected);
    this.setState({foodItem: ''});
  };

  onDelete = () => {
    const uid = currentUser.uid
    const date = this.state.selected
    firebase.database().ref('Users').child(uid).child("date").child(date).remove();
    Alert.alert('Items deleted successfully');
  };

  onDayPress = (day) => {
    this.setState({selected: day.dateString, itemList: this.handleLoading(day.dateString)});
    console.log(this.state.itemList)
    console.log('selected day', day);
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
    var itemList = []
    var ref = firebase.database().ref('Users').child(uid).child("date").child(day);
    ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var userData = childSnapshot.val();
        if(userData){
          var foodItem = userData.foodItem;
          var foodStatus = userData.foodStatus;
          if(foodStatus == 'expired') {
            itemList.push({
              foodItem: foodItem
            });
            console.log(itemList);
          }
        }
      });
    });
  };

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
        <Text style={{padding:16}}>EXPIRED FOOD : {this.state.itemList}</Text>

        <Text style={{padding:16}}>ADD ITEM</Text>
        <TextInput style={{padding:16}} onChange={this.handleChange} value = {this.state.foodItem} placeholder={'Enter a Food Item and Select a Date'}/>
        
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
        <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.onDelete}
        >
        <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
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
