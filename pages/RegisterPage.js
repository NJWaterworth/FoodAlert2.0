import React from 'react';
import { Alert, StyleSheet, View, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';

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

    writeUserData(email, firstname, lastname) {
        console.log('email ', email);
        console.log('firstname ', firstname);
        console.log('lastname ', lastname);
        firebase.database().ref('Users/').push({
            email,
            firstname,
            lastname
        }).then((data) => {
            console.log('Data ', data);
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
    
            // console.log(firebase.auth());
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => {
                console.log("Then block");
                console.log(user);
                this.writeUserData(this.state.email, this.state.firstname, this.state.lastname);
                this.props.navigation.navigate('Profile', {name: 'Jane'});
            })
            .catch((error)=> {
                const {code, message} = error;
                console.log(code);
                console.log(message);
                Alert.alert(message);
            })
        console.log("Finish block");
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
  
            <Button
                title={'Login'}
                style={styles.input}
                onPress={this.onRegister.bind(this)}
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