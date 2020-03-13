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

export default class ProfileChangePage extends React.Component {
  static navigationOptions = {
    title: 'ProfileChange',
  };
  constructor(props) {
       super(props);

       this.state = {
           newUsername: '',
           newPassword: '',
           newConfirmPassword: '',
           oldPassword: '',
           newName: '',
           newEmail: '',
       };
   }

   onChange() {
      //TODO Add Logic when Firebase is made
        Alert.alert("Button Pressed", this.state.oldPassword + "\n + "
        + this.state.newUsername +  "\n + " 
        + this.state.newPassword +  "\n + " 
        + this.state.newConfirmPassword +  "\n + " 
        + this.state.newName +  "\n + " 
        + this.state.newEmail)
    }
  render()
   {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>


        <TextInput
          value={this.state.oldPassword}
          onChangeText={(oldPassword) => this.setState({ oldPassword })}
          placeholder={'Enter Current Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <TextInput
          value={this.state.newUsername}
          onChangeText={(newUsername) => this.setState({ newUsername })}
          placeholder={'Enter New Username'}
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
          value={this.state.newName}
          onChangeText={(newName) => this.setState({ newName })}
          placeholder={'Enter New Name'}
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