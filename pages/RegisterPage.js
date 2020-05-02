import React from 'react';
import { Alert, ImageBackground, StyleSheet, View, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';
import CustomButtom from '../components/custombutton';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           email: '',
           password: '',
           confirmPassword: '',
           firstname: '',
           lastname: ''
        };
    }

    writeUserData(email, firstname, lastname, uid) {
        firebase.database().ref().child('Users').child(uid).set({
            email,
            firstname,
            lastname,
            uid
        }).then((data) => {
        }).catch((error) => {
            Alert.alert(error.message);
        })
    }

    onRegister() {
        if(this.state.password === '' || this.state.confirmPassword === ''){
            Alert.alert("Error", "Please input a valid password");
            return;
        }
        if(this.state.password !== this.state.confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
    
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                this.writeUserData(this.state.email, this.state.firstname, this.state.lastname, user.user.uid);
                this.props.navigation.navigate('Profile', {name: 'Jane'});
            })
            .catch((error)=> {
                Alert.alert(error.message);
            })
    }

    render() {
        return(
            <ImageBackground
                style={styles.imgBackground}
                resizeMode='cover'
                source={require('../images/apple1.png')}
            >

                <View style={styles.container}>
                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholder={'email'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />

                <TextInput
                    value={this.state.firstname}
                    onChangeText={(firstname) => this.setState({ firstname })}
                    placeholder={'first name'}
                    style={styles.input}
                />
                
                <TextInput
                    value={this.state.lastname}
                    onChangeText={(lastname) => this.setState({ lastname })}
                    placeholder={'last name'}
                    style={styles.input}
                />
    
                <CustomButtom
                    text="Login"
                    onPress={this.onRegister.bind(this)}
                    customStyle={{
                        backgroundColor: 'rgba(88, 194, 141, 0.8)',
                        marginBottom: 0
                    }}
                />
                </View>
            </ImageBackground>
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