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


export default class ListPage extends Component {
	
	
	static navigationOptions = {
		title: 'List',
	};
	
	state = {
		data: [],
	};
	
	componentDidMount() {
		let currentUser = firebase.auth().currentUser;
		let uid = currentUser.uid;
		let ref = firebase.database().ref('Users').child(uid).child("date");
		
		this.fetchData(ref);
	}
	
	fetchData = async (ref) => {
		var response = await this.loadData(ref);

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
	
	loadData = async(ref) =>
	{
	  var temp = [];
	  await ref.on('value', function(snapshot){
		  snapshot.forEach( function(childSnapshot){
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
