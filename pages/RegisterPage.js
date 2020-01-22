import React from 'react';
import { Alert, StyleSheet, View, TextInput, Button } from 'react-native';


export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           username: '',
           password: '',
           confirmPassword: '',
           name: ''
        };
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
        const { username, password, name } = this.state;
        Alert.alert('Registered', 'Congrats');
        this.props.navigation.navigate('Profile', {name: 'Jane'});
    }

    render() {
        return(
            <View style={styles.container}>
            <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
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
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                placeholder={'Name'}
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