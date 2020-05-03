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
  Alert,
  AsyncStorage
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
      loading: true,
      firstname: '',
      lastname: '',
      email: '',
      imgSource: '',
      images: [],
      url: ''
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
      this.setState({firstname: userData.firstname, lastname: userData.lastname, email: userData.email})
    });
    let images;
    AsyncStorage.getItem('images')
    .then(data => {
      images = JSON.parse(data) || [];
      this.setState({
        images: images
      });
    })
    .catch(error => {
      Alert.alert(error.message);
    });
    ref = firebase.storage().ref(`/userData/images/${uid}`);
    ref.getDownloadURL().
      then(data => {
        this.setState({url: data})
        this.setState({loading: false})
      }).
      catch(error => {
        this.setState({url: "userData/images/default"})
        this.setState({loading: false})
      })
  }

  onNotifications() {
     this.props.navigation.navigate('Notifications');
   }

  onChange() {
    this.props.navigation.navigate('ProfileChange');
  }

  onLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      }).catch((error) => {
        Alert.alert(error.message);
      })
  }

  selectImage() {
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
    } else if (response.error) {
    } else if (response.customButton) {
    } else {
      const source = { uri: response.uri }
      const userID = firebase.auth().currentUser.uid;
      const uploadData = {
        id : userID,
        photo: response
      };
      this.setState({
        imgSource: source,
        imageUri: response.uri
      });
    const ext = this.state.imageUri.split('.').pop();
    const filename = userID;
    firebase.storage()
      .ref(`userData/images/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.State_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const images = this.state.images
            images.push(snapshot.downloadURL);
            state = {
              ...state,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: images
            };
            AsyncStorage.setItem('images', JSON.stringify(images));
          }
          this.setState(state); 
        },
        error => {
          Alert.alert('Sorry, try again');
        }
      );
      }
  })
  
}  
render() {
  return (
      <View style={{  alignItems: 'center' }}>

        <Image
         style = {{width: 100, height: 100, marginTop: 25}}
         source = {{uri: this.state.url}}
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
