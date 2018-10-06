var config = {
    apiKey: "AIzaSyDU00P-Zi8QohrU4nkgUGRwlPtAViJyfww",
    authDomain: "train-time-b3042.firebaseapp.com",
    databaseURL: "https://train-time-b3042.firebaseio.com",
    projectId: "train-time-b3042",
    storageBucket: "",
    messagingSenderId: "818846465505"
};

firebase.initializeApp(config);
var database = firebase.database();



var name = "";
var destination = "";
var frequency = 0;
var firstTrainTime = 0000;

var rName = "";
var rDestination = "";
var rFrequency = 0;
var rFirstTrainTime = 0000;



$("#button").on("click", function (event) {
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    });
    //clears input boxes
    $("#name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});



database.ref().on("child_added", function (childSnapshot) {
    rName = childSnapshot.val().name;
    rDestination = childSnapshot.val().destination;
    rFrequency = parseInt(childSnapshot.val().frequency);
    rFirstTrainTime = childSnapshot.val().firstTrainTime;
    var trainInfo = trainTime(rFrequency, rFirstTrainTime);


    //add rows of data to table

    var tRow = $("<tr>").append(
        $("<td>").text(rName),
        $("<td>").text(rDestination),
        $("<td>").text(rFrequency),
        $("<td>").text(trainInfo[0]),
        $("<td>").text(trainInfo[1]),
    );
    $("tbody").append(tRow);


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});



function trainTime(frequency, firstTrainTime) {

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTillTrain = frequency - tRemainder;

    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

    console.log(nextTrainFormatted);
    console.log(minutesTillTrain);
    return [nextTrainFormatted, minutesTillTrain];
};
