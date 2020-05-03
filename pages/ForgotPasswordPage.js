import React from 'react';
import CustomButton from '../components/custombutton';
import  {Alert, Image, ImageBackground, Button, TextInput, View, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };

    }

    sendEmail() {
        const email = this.state.email;
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            Alert.alert("Please check email to reset password");
        })
        .catch(function(error) {
            Alert.alert(error.message);
        })
    }

    render() {
        return(
        <View style={styles.container}>

                <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'email'}
            style={styles.input}
            />

            <CustomButton
            text="Send Email"
            onPress={this.sendEmail.bind(this)}
            customStyle={{
                backgroundColor: 'rgba(88, 194, 141, 0.8)',
                marginBottom: 0}}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
	imgBackground:{
		width: '100%',
		height: '100%',
		flex: 1
	},
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
	  backgroundColor: 'transparent',
    },
    input: {
      width: 200,
      height: 44,
      padding: 10,
	  backgroundColor: 'rgba(255,255,255,.8)',
	  borderRadius: 10,
      marginBottom: 10,
    },
  });