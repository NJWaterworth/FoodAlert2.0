import React from 'react';
import CustomButton from '../components/custombutton';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import firebase from 'react-native-firebase';


export default class ProfilePage extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: ''
    };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    let uid = currentUser.uid;
    var firstname;
    var lastname;
    var ref = firebase.database().ref("Users/" + uid).once("value", snap => {
      userData = snap.val();
      this.setState({firstname: userData.firstname, lastname: userData.lastname, email: userData.email})
    });
  }

  onNotifications() {
     this.props.navigation.navigate('Notifications');
   }

  onChange() {
    this.props.navigation.navigate('ProfileChange');
  }

  onLogOut() {
    this.props.navigation.navigate('Login');
  }

  
   render() { 
return (
      <View style={{  alignItems: 'center' }}>

        <Image style = {{width: 100, height: 100, marginTop: 25}}
          source={require('../images/blank_profile.png')} />

        <Text style={{ marginTop: 10, fontSize: 25 }}>
        {this.state.firstname.toString() + " " + this.state.lastname.toString()}
        </Text>

        <Text style={{ marginTop: 10, fontSize: 25 }}>{this.state.email.toString()}</Text>

        <CustomButton
          text="Notification Settings"
          onPress={this.onNotifications.bind(this)}
          customStyle={{
          backgroundColor: 'rgba(88, 194, 141, 0.8)',
          marginBottom: 0, marginTop: 25}}
        />

        <CustomButton
          text="Profile Settings"
          onPress={this.onChange.bind(this)}
          customStyle={{
          backgroundColor: 'rgba(88, 194, 141, 0.8)',
          marginBottom: 0, marginTop: 25}}
        />

        <CustomButton
          text="Log Out"
          onPress={this.onLogOut.bind(this)}
          customStyle={{
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          marginBottom: 0, marginTop: 25}}
        />

      </View>
    );
  }
}
