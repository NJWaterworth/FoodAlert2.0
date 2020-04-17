import React, {Component} from 'react';
import CustomListview from '../components/customlistview';
import firebase from 'react-native-firebase';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  platform,
  StatusBar,
} from 'react-native';


const currentUser = firebase.auth().currentUser;
const uid = currentUser.uid;
const ref = firebase.database().ref('Users').child(uid).child("date");
	
export default class ListPage extends React.Component {
  static navigationOptions = {
    title: 'List',
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      fo : [],
    };
  }
 
	fetchData = async () =>{ 
	var inOrder = ref.orderByKey();
     inOrder.once('value', function(snapshot) {
	  var foodLists = [];
      snapshot.forEach(function(childSnapshot) {
        var dates = childSnapshot.key;
		var items = childSnapshot.val();
		var foods = Object.values(items);
		foodLists.push({
			'date': dates,
			'foodItem': foods[0].foodItem,
			'foodStatus': foods[0].foodStatus
		});
      });
	  return foodLists;
	});
  }
  
  async render() {
    const {navigate} = this.props.navigation;
	const obj = await this.fetchData();
	console.log(obj);
    return (
      <View style={styles.container}>
        <CustomListview
          itemList={obj}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  }
});
