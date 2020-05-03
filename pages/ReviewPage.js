import React from 'react';
import Moment from 'moment';
const Fuse = require('fuse.js');

import firebase from 'react-native-firebase';

import helpers from '../helpers';

let currentUser = firebase.auth().currentUser;

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  FlatList,
  TextInput
} from 'react-native';

export default class ReviewScreen extends React.Component {
  static navigationOptions = {
    title: 'Review',
  };

  constructor(props) {
      super(props);
      var textblocks = this.props.navigation.getParam('items',[]);

      this.state = {
        food_items: this.parse_reciept(textblocks)
      };
  }

  deleteItem(id) {
    let allItems = this.state.food_items;
    let filteredItems = allItems.filter(item => item.id != id);
    this.setState({ food_items: filteredItems })
  }

  updateItem(text, index) {
    let allItems = this.state.food_items;
    allItems[index].foodItem = text;
    this.setState({ food_items: allItems })
  }

  addItem() {
    Moment.locale('en');
    let date_string = Moment().format('YYYY-MM-D');
    let allItems = this.state.food_items;
    let all_len = allItems.length;
    let new_id = allItems[all_len-1].id + 1;
    allItems.push({
                    foodItem: "NEW ITEM",
                    date: date_string,
                    foodStatus: "not expired",
                    id: new_id});
    this.setState({ food_items: allItems })
  }

  parse_reciept(textblocks) {
      let food_list = [];
      var e = -1;
      let sub_index =0
      Moment.locale('en');
      let date_string = Moment().format('YYYY-MM-D');

      let raw_strings = [];
      //Find all blocks containing purchased goods
      if (textblocks.length <= 0) {
        return []
      }
      for (let text of textblocks) {
        var input = text.value;
        input = input.split("\n");
        for (let item of input){
            raw_strings.push(item);
        }
      }

      // Cut off end of string
      const options = {
          includeScore: true,
        }
      const fuse = new Fuse(raw_strings, options)
      const result = fuse.search('sub To')
      if( result.length > 0 ) {
        sub_index = result[0].refIndex;
      }

      raw_strings = raw_strings.slice(0, sub_index)

      const you_result = fuse.search('you saved')

      for (let i = 0; i < you_result.length; i++) {
        if(you_result[i].score < .5){
          raw_strings.splice(you_result[i].refIndex,1);
        }
      }

      const mono_result = fuse.search('monopoly')

      for (let i = 0; i < mono_result.length; i++) {
        if(mono_result[i].score < .5){
          raw_strings.splice(mono_result[i].refIndex,1);
        }
      }

      let price_count = 0;

      //get rid of Bs Values and count items
      for( let i = raw_strings.length -1; i >=0 ; i--) {
        //regex to get prices
        let re = new RegExp('^[0-9]*\.[0-9][0-9]');
        let ie = new RegExp('/^[-+]?\d+$/ .*F');

        if(re.test(raw_strings[i])){
          price_count +=1;
          raw_strings.splice(i,1);
        }
        else if(ie.test(raw_strings[i])) {
          raw_strings.splice(i,1);
        }
      }


      let parsed_block = [];

      for( let i = 0; i <price_count; i++) {
        parsed_block.push(raw_strings[raw_strings.length -1 -i])
      }

      //for each line in the block,
      let i = 1;
      for (let food of parsed_block) {
        food_list.push({
                        foodItem: food,
                        date: date_string,
                        foodStatus: "not expired",
                        id: i
                      });
        i++;
      }

      //Turn each item into an object and append to an array
      return food_list;
  }

  uploadFood(food_list) {
    let uid = currentUser.uid;
    //add items present in foodlist
    for (let food of food_list) {
      helpers.addItem(uid, food.date, food.foodStatus, food.foodItem)
    }

    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList
                 data={this.state.food_items}
                 extraData={this.state}
                 renderItem={({item, index}) =>
                  <View style={styles.food}>
                    <TextInput style={styles.name}
                    onChangeText={(new_text) => this.updateItem( new_text, index)}
                    value={item.foodItem}
                    />
                    <Button style={styles.remove} color="#DC143C" title="Remove" onPress={() => this.deleteItem(item.id)} />
                  </View>
                 }
                 keyExtractor={item => item.id}
          />
          <View style={styles.lowbar}>
          <Button title="Add Item" onPress={() => this.addItem(this.addItem())} />
          <Button title="Submit" color="rgba(88, 194, 141, 1)" onPress={() => this.uploadFood(this.state.food_items)} />
          </View>
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
    food: {
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      textAlign: 'center',
      flexDirection: 'row',
      width: '75%',
      marginTop: 10,
    },
    remove: {
      color: '#DC143C',

    },
    submit: {

    },
    add: {

    },
    name:{
      color: '#000000'
    },
    lowbar:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginTop: 10,

    }
  });
