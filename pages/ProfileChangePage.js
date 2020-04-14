import React from 'react';
import CustomButton from '../components/custombutton';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import firebase from 'react-native-firebase';


export default class ProfileChangePage extends React.Component {
  static navigationOptions = {
    title: 'ProfileChange',
  };
  constructor(props) {
    super(props);
    let user = firebase.auth().currentUser;
    this.state = {
        currentPassword: '',
        newPassword: '',
        newConfirmPassword: '',
        newFirstName: '',
        newLastName: '',
        newEmail: '',
    };
   }

   onChange() {
      let user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.currentPassword
      );
      user.reauthenticateWithCredential(credential)
        .catch((error) => {
          Alert.alert(error.message);
          return;
        })
      if (this.state.newPassword !== '') {
        if (this.state.newPassword === this.state.newConfirmPassword) {
          user.updatePassword(this.state.newPassword)
            .catch((error) => {
              Alert.alert(error.message);
            })
        }
      }
      if (this.state.newEmail !== '') {
        user.updateEmail(this.state.newEmail)
          .catch((error) => {
            Alert.alert(error.message);
          })
        let userRef = firebase.database().ref("Users/" + user.uid);
        userRef.update({'email' : this.state.newEmail})
          .catch((error) => {
            Alert.alert(error.message);
          })
      }
      if (this.state.newFirstName !== '' && this.state.newLastName !== '')  {
        let userRef = firebase.database().ref("Users/" + user.uid);
        
        userRef.update({'firstname' : this.state.newFirstName})
          .catch((error) => {
            Alert.alert(error.message);
          })    
        userRef.update({'lastname' : this.state.newLastName})
          .catch((error) => {
            Alert.alert(error.message);
          })     
      }

      this.props.navigation.navigate('Profile');
    }
  render()
   {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <TextInput
          value={this.state.currentPassword}
          onChangeText={(currentPassword) => this.setState({ currentPassword })}
          placeholder={'Enter Current Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <TextInput
          value={this.state.newPassword}
          onChangeText={(newPassword) => this.setState({ newPassword })}
          placeholder={'Enter New Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <TextInput
          value={this.state.newConfirmPassword}
          onChangeText={(newConfirmPassword) => this.setState({ newConfirmPassword })}
          placeholder={'Confirm New Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <TextInput
          value={this.state.newFirstName}
          onChangeText={(newFirstName) => this.setState({ newFirstName })}
          placeholder={'Enter New First Name'}
          style={styles.input}
        />

        <TextInput
          value={this.state.newLastName}
          onChangeText={(newLastName) => this.setState({ newLastName })}
          placeholder={'Enter New Last Name'}
          style={styles.input}
        />

        <TextInput
          value={this.state.newEmail}
          onChangeText={(newEmail) => this.setState({ newEmail })}
          placeholder={'Enter New Email'}
          style={styles.input}
        />

        <CustomButton
            text="Post Changes"
            onPress={this.onChange.bind(this)}
            customStyle={{
            backgroundColor: 'rgba(88, 194, 141, 0.8)',
            marginBottom: 0,}}
          />
        </View>


    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1', 
      // marginTop: 75,
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
    },
  });