import React from 'react';
import firebase from 'react-native-firebase';
import axios from 'axios';
import Alert from 'react-native';

const helpers = {
  addItem: function(uid, date, status, itemName) {
    // add call to department of agriculture
    // pull all fdcIds from response and load them into an array
    dateString = date;
    var date = new Date(date);
    status = 'expired';
    var newDateString;
    var fdcIds = [];
    var found = false;
    var count = 0;
    const url =
      'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=o0FhMAtej3kSnFeBzqJkoxaKMe1gYvksGxWWsgId&query=' + itemName;
    axios.get(url).then(response => {
        response.data.foods.forEach(food => {
          if (typeof food != null) {
            fdcIds.push(food.fdcId);
          }
        });

        //    call to firestore to find the expiration days
        //    If the first fdcId is not in the database, try the next and so on, until the first match
        //    calculate expiration date
        //    push food item to database
        const expirationCollection = firebase.firestore().collection('expiration_times');
        // console.log(expirationCollection.id);
        fdcIds.forEach(id => {
            let query = expirationCollection.get().then(snapshot => {
              if (snapshot.empty) {
                return;
              }
              snapshot.forEach(doc => {
                if(doc.data().fdc_id == id){
                  count = 1;
                  days = parseInt(doc.data().expiration_days) + 1;
                  date.setDate(date.getDate() + days); 
                  var dd = date.getDate();
                  if (dd < 10) {
                    dd = '0' +dd;
                  }
                  var mm = date.getMonth() + 1;
                  if(mm < 10) {
                    mm = '0' +mm;
                  }
                  var y = date.getFullYear();
                  newDateString = y + '-'+ mm + '-'+ dd;
                  firebase.database().ref('Users').child(uid).child("date").child(newDateString).push({
                    foodItem: itemName,
                    foodStatus: status
                  }, function(error) {
                    if (error) {
                      Alert.alert('Item saved failed');
                    }
                  });
                }
              }); 
              if (count == 0) {
                count = 1;
                firebase.database().ref('Users').child(uid).child("date").child(dateString).push({
                  foodItem: itemName,
                  foodStatus: status
                }, function(error) {
                  if (error) {
                    Alert.alert('Item saved failed');
                  }
                });
              }
            });
        });
      })
      .catch(error => console.log(error));
  }
};

export default helpers;
