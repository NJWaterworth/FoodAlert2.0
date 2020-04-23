import React from 'react';
import Moment from 'moment';
const Fuse = require('fuse.js');

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

//foodItem (string:"Apple"), date(string: yyyy-mm-dd), foodStatus(string: "not expired")

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

  deleteItem = data => {
  let allItems = [this.state.food_items];
  let filteredItems = allItems.filter(item => item.id != data.id);
  this.setState({ food_items: filteredItems })
}

 Food({ foodItem }) {
    return (
      <View style={styles.food}>
        <TextInput style={styles.name}>{foodItem}</TextInput>
        <Button title="Remove" onPress={() => this.deleteItem(foodItem)} />
      </View>
    );
  }

  parse_reciept(textblocks) {
      let food_list = [];
      var e = -1;
      let sub_index =-1
      Moment.locale('en');
      let date_string = Moment().format('YYYY-MM-D');

      let raw_strings = [];
      //Find all blocks containing purchased goods
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
      sub_index = result[0].refIndex;

      console.log(raw_strings);
      raw_strings = raw_strings.slice(0, sub_index)
      console.log(raw_strings);

      const you_result = fuse.search('you saved')
      console.log(you_result);

      for (let i = 0; i < you_result.length; i++) {
        if(you_result[i].score < .5){
          raw_strings.splice(you_result[i].refIndex,1);
        }
      }

      const mono_result = fuse.search('monopoly')
      console.log(mono_result);

      for (let i = 0; i < mono_result.length; i++) {
        if(mono_result[i].score < .5){
          raw_strings.splice(mono_result[i].refIndex,1);
        }
      }

      let price_count = 0;

      //get rid of Bs Values and count items
      for( let i = raw_strings.length -1; i >=0 ; i--) {
        //regex to get prices
        console.log("Testing, ", raw_strings[i]);
        let re = new RegExp('^[0-9]*\.[0-9][0-9]');
        let ie = new RegExp('/^[-+]?\d+$/ .*F');

        if(re.test(raw_strings[i])){
          console.log("price found!");
          price_count +=1;
          raw_strings.splice(i,1);
        }
        else if(ie.test(raw_strings[i])) {
          console.log("Useless numbers");
          raw_strings.splice(i,1);
        }
      }

      console.log(raw_strings);

      let parsed_block = [];

      for( let i = 0; i <price_count; i++) {
        parsed_block.push(raw_strings[raw_strings.length -1 -i])
      }

      console.log(parsed_block);

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
      console.log(food_list);

      //Turn each item into an object and append to an array
      return food_list;
  }

  uploadFood = async function() {

    this.props.navigation.goBack()

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <FlatList
                 data={this.state.food_items}
                 renderItem={({ item }) => <this.Food foodItem={item.foodItem} />}
                 keyExtractor={item => item.id}
          />
          <Button title="Submit" onPress={() => this.uploadFood()} />
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
