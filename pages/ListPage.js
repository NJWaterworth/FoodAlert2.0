import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import CustomListview from '../components/customlistview';
import { 
	StyleSheet,
	Text,
	ActivityIndicator,
	View, 
	FlatList
} from 'react-native';

const currentUser = firebase.auth().currentUser;
const uid = currentUser.uid;
const ref = firebase.database().ref('Users').child(uid).child("date");
export default class ListPage extends Component {
	
	
	static navigationOptions = {
		title: 'List',
	};
	
	state = {
		data: [],
	};
	
	componentDidMount() {
		this.fetchData();
	}
	
	fetchData = async () => {
		var response = await this.loadData();

		if ( response == undefined)
		{
			console.log('oop');
		} 
		else 
		{
			console.log('hit', response);
			this.setState({data: response});
		}
	};
	
	loadData = async() =>
	{
	  var temp = [];
	  await ref.on('value', snapshot => {
		  snapshot.forEach( childSnapshot => {
			var dates = childSnapshot.key;
			var items = childSnapshot.val();
			var foods = Object.values(items);
			temp.push({
				date : dates, 
				food : foods[0].foodItem,
				});
		  });
	  });
	  return ( temp );
	}
	
	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style = {styles.container}>
				<CustomListview
					itemList = {this.state.data}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	}
});
