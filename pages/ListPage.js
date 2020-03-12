import React, {Component} from 'react';
import CustomListview from '../components/customlistview';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  platform,
  StatusBar,
} from 'react-native';

export default class ListPage extends React.Component {
  static navigationOptions = {
    title: 'List',
  };
  
  getData() {
    return [
      {
        key: 1, title: 'apple',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://www.pngitem.com/pimgs/m/136-1361134_apple-fruit-png-transparent-png.png'
      },
      {
        key: 2,
        title: 'banana',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://lh3.googleusercontent.com/proxy/b1QTG7tt3ONSyV8VUO1s66wZtGptrjhti7VPTQWIMWpX0awNW7XbkjZctkEkobgO1Byxk6MZgok06wS0PYsFKceqSynHklz7KlBI8etayqxqtXzhmdQ_DGG5vD6w6pRnN_ojzug'
      },
      {
        key: 3, title: 'cherries',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://lh3.googleusercontent.com/proxy/MnLv-iaQLVWgNE0GNKjUIGz4KXO7jAqQEze9C2YP5paZuSfKMEmUAyEXmN-8uKBuPJvtT_R73Sb2UUYFOtPVqLzQn8v05cyp1MMm2O3ap5efbQXV1syPzFl1rei-Y_K0'
      },
      {
        key: 4,
        title: 'strawberry',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://www.pngfind.com/pngs/m/341-3413414_sliced-strawberry-transparent-background-hd-png-download.png'
      },
	  {
        key: 1, title: 'apple',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://www.pngitem.com/pimgs/m/136-1361134_apple-fruit-png-transparent-png.png'
      },
      {
        key: 2,
        title: 'banana',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://lh3.googleusercontent.com/proxy/b1QTG7tt3ONSyV8VUO1s66wZtGptrjhti7VPTQWIMWpX0awNW7XbkjZctkEkobgO1Byxk6MZgok06wS0PYsFKceqSynHklz7KlBI8etayqxqtXzhmdQ_DGG5vD6w6pRnN_ojzug'
      },
      {
        key: 3, title: 'cherries',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://lh3.googleusercontent.com/proxy/MnLv-iaQLVWgNE0GNKjUIGz4KXO7jAqQEze9C2YP5paZuSfKMEmUAyEXmN-8uKBuPJvtT_R73Sb2UUYFOtPVqLzQn8v05cyp1MMm2O3ap5efbQXV1syPzFl1rei-Y_K0'
      },
      {
        key: 4,
        title: 'strawberry',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://www.pngfind.com/pngs/m/341-3413414_sliced-strawberry-transparent-background-hd-png-download.png'
      },
	  {
        key: 1, title: 'apple',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://www.pngitem.com/pimgs/m/136-1361134_apple-fruit-png-transparent-png.png'
      },
      {
        key: 2,
        title: 'banana',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://lh3.googleusercontent.com/proxy/b1QTG7tt3ONSyV8VUO1s66wZtGptrjhti7VPTQWIMWpX0awNW7XbkjZctkEkobgO1Byxk6MZgok06wS0PYsFKceqSynHklz7KlBI8etayqxqtXzhmdQ_DGG5vD6w6pRnN_ojzug'
      },
      {
        key: 3, title: 'cherries',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://lh3.googleusercontent.com/proxy/MnLv-iaQLVWgNE0GNKjUIGz4KXO7jAqQEze9C2YP5paZuSfKMEmUAyEXmN-8uKBuPJvtT_R73Sb2UUYFOtPVqLzQn8v05cyp1MMm2O3ap5efbQXV1syPzFl1rei-Y_K0'
      },
      {
        key: 4,
        title: 'strawberry',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        image_url: 'https://www.pngfind.com/pngs/m/341-3413414_sliced-strawberry-transparent-background-hd-png-download.png'
      },
    ]
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <CustomListview
          itemList={this.getData()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  }
});
