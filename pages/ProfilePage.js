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
    // this.loadValues();
//     const {navigate} = this.props.navigation;
//     var currentUser = firebase.auth().currentUser;
//     var name;
    
//     var userRef = firebase.database().ref('Users/');
//     var meRef = userRef.child('-M0tuB26tNEDpkqYw1Op/firstname');
//     var self = this.state;
//     //var name = firebase.database().ref(meRef);
//      //console.log('User email: ', userRef.toString());
//      var snapJson;
//      var firstProp;

//      userRef.orderByChild("uid").equalTo(currentUser.uid).on('value', function(snapshot) {
//       snapJson = snapshot.toJSON();

//       for(var key in snapJson) {
//       if(snapJson.hasOwnProperty(key)) {
//         firstProp = snapJson[key];
//         break;
//       }
//     }
//   console.log(firstProp.firstname);
// });

//      //console.log(firstProp.firstname);
//     meRef.once('value').then(snapshot => {
//     // snapshot.val() is the dictionary with all your keys/values from the '/store' path
    
//     this.setState({ stores: snapshot })
//     //console.log('Test: ', this.state.stores.val())
// });    
return (
      <View style={{  alignItems: 'center' }}>


          <Image style = {{width: 100, height: 100, marginTop: 25}}
            source={require('../images/blank_profile.png')} />
          <Text style={{ marginTop: 10, fontSize: 25 }}>{this.state.firstname.toString()}</Text>
          <Text style={{ marginTop: 10, fontSize: 25 }}>{this.state.lastname.toString()}</Text>
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
