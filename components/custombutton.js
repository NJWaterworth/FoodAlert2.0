import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class custombutton extends Component {

	render() {
		const { text, onPress, customStyle} = this.props;
		const {textStyle, customButton} = styles;
		const combineStyles = StyleSheet.flatten([customButton, customStyle]);
		return (
		  <TouchableOpacity style={combineStyles}
			onPress={() => onPress()}
		  >
			 <Text style={styles.textStyle}>{text}</Text>
		  </TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({

  textStyle: {
    fontSize:15,
	color: 'black',
	textAlign: 'center'
  },
  
  customButton: {
	padding:10,
	backgroundColor: 'white',
	borderRadius:10,
	marginBottom: 10,
	width: 200,
	height: 44,
  }
});

export default custombutton;