import React from 'react';
import firebase from 'react-native-firebase';
import axios from 'axios';

const helpers = {
  addItem: function(itemName, date, status) {
    // add call to department of agriculture
    // pull all fdcIds from response and load them into an array

    var fdcIds = [];
    const url =
      'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=o0FhMAtej3kSnFeBzqJkoxaKMe1gYvksGxWWsgId&query=' + itemName;
    axios.get(url).then(response => {
        response.data.foods.forEach(food => {
          if (typeof food != null) {
            fdcIds.push(food.fdcId);
            // console.log(food.fdcId);
          }
        });

        //    call to firestore to find the expiration days
        //    If the first fdcId is not in the database, try the next and so on, until the first match
        //    calculate expiration date
        //    push food item to database


        const expirationCollection = firebase.firestore().collection('Expiration_Times');

        console.log(expirationCollection.id);

        //TEST: This should return a doc, that fdc_id exists in Firestore
        let query = expirationCollection.where('fdc_id', '==', '329044').get().then(snapshot => {
            if (snapshot.empty) {
                // console.log(snapshot);
                console.log('No matching documents.');
            }
            else {
                console.log('I think we did it');

            }
        });


        // fdcIds.forEach(id => {
        //     let query = expirationCollection.where('fdc_id', '==', id).get().then(snapshot => {
        //         if (snapshot.empty) {
        //             // console.log(snapshot);
        //             console.log('No matching documents.');
        //         }
        //         else {
        //             console.log(id);
        //             console.log('I think we did it');
        //
        //
        //         }
        //     });
        // });


      })
      .catch(error => console.log(error));

  },

  //  getItemsByDay takes in a day string
  //  Returnd list contains objects of the form
    // {
    //    foodItem: "apple",
    //    foodStatus: "not expired"
    // }
  getItemsByDay: function(day) {
    var itemList = [];
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('Users').child(uid).child('date').child(day);
    ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var userData = childSnapshot.val();
        itemList.push(userData);
      });
      return itemList;
    });
  },

    // getAllItems returns a list of all food items for a user
    // Returned list contains objects of the form
    // {
    //    date: "2020-04-18",
    //    foodItem: "apple",
    //    foodStatus: "not expired"
    // }
  getAllItems: function() {
    var itemList = [];
    var uid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('Users').child(uid).child('date');
    ref.once('value', function(snapshot) {
      snapshot.forEach(date => {
         var array = Object.values(date);
         console.log(array[0]);
         var dayItems = array[2];
         var dayIds = array[4];

         dayIds.forEach(id => {
             let item = {
                 date: array[0],
                 foodItem: dayItems[id].foodItem,
                 foodStatus: dayItems[id].foodStatus
             };
             itemList.push(item);
         });

      });
      // itemList.forEach(obj => {
      //   console.log('Day: ' + obj.date);
      //   console.log('Food Item: ' + obj.foodItem);
      //   console.log('Food Status: ' + obj.foodStatus);
      // });

      return itemList;
    });
  },
};

export default helpers;
