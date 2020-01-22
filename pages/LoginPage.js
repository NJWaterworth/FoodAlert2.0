import React from 'react';
import CustomButton from '../components/custombutton';
import  {Alert, Image, ImageBackground, Button, TextInput, View, StyleSheet} from 'react-native';


export default class Login extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           username: '',
           password: '',
       };
   }

   onLogin() {
       const { username, password } = this.state;
       Alert.alert('Credentials', `${username} + ${password}`);
       this.props.navigation.navigate('Profile', {name: 'Jane'});
   }

   onSignUp() {
      this.props.navigation.navigate('Register');
   }

   render() {
	   
       return (
		 
		 <ImageBackground 
			style={styles.imgBackground}
			resizeMode='cover'
			source={require('../images/apple1.png')} 
		>
	    
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
        
        <CustomButton
          text="Login"
          onPress={this.onLogin.bind(this)}
		  customStyle={{
			backgroundColor: 'rgba(88, 194, 141, 0.8)',
			marginBottom: 0}}
        />

         <CustomButton
          text="Sign Up"
          onPress={this.onSignUp.bind(this)}
		  customStyle={{backgroundColor: 'transparent'}} 
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