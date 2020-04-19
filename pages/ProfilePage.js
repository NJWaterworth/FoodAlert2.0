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
import ImagePicker from 'react-native-image-picker';

const options = {
    noData: true
  };


export default class ProfilePage extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };



  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      imgSource: ''
  };
  }

  componentDidMount() {
    let currentUser = firebase.auth().currentUser;
    let uid = currentUser.uid;
    var firstname;
    var lastname;
    const photoRef = firebase.storage().ref('ProfilePics/' + uid + '/fileName');
    const url = photoRef.getDownloadURL();
    var ref = firebase.database().ref("Users/" + uid).once("value", snap => {
      userData = snap.val();
      this.setState({firstname: userData.firstname, lastname: userData.lastname, email: userData.email, photoReference: photoRef})
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

  selectImage() {
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      const source = { uri: response.uri }
      console.log(source)
      const userID = firebase.auth().currentUser.uid;
      const uploadData = {
        id : userID,
        photo: response
      };
      firebase.firestore().collection('ProfilePics').doc (userID).set(uploadData);
      this.setState({
        image: source
      })
    }
  })
}

  
   render() { 
return (
      <View style={{  alignItems: 'center' }}>

        <Image
         style = {{width: 100, height: 100, marginTop: 25}}
         source = {this.state.photoReference}
         />

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
          text="Change Profile Pic"
          onPress = {this.selectImage.bind(this)}
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
