//get information from form and write to firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyATC3kbRIrzi_7j_t0J2O9yNKHNSRqGpAI",
    authDomain: "trains-30aa0.firebaseapp.com",
    databaseURL: "https://trains-30aa0.firebaseio.com",
    projectId: "trains-30aa0",
    storageBucket: "trains-30aa0.appspot.com",
    messagingSenderId: "253987961512"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
$("#submitButton").on("click", function(){
    var trainName = $("#input1").val().trim();
    var destination = $("#input2").val().trim();
    var firstTrain = $("#input3").val().trim();
    var frequency = $("#input4").val().trim();

    database.ref().push({trainName: trainName, destination: destination,firstTrain: firstTrain, frequency: frequency})
});
database.ref().on("child_added", function(childSnapShot){
    var tFrequency = childSnapShot.val().frequency;

// Time is 3:30 AM
var firstTime = childSnapShot.val().firstTrain;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var  tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    $("#trainTable").append(`
    <tr>
        <td> ${childSnapShot.val().trainName} </td>
        <td> ${childSnapShot.val().destination} </td>
        <td> ${firstTime} </td>
       
        <td> ${childSnapShot.val().frequency} </td>
        <td> ${tMinutesTillTrain} </td>
    </tr>
    `)
    
});
