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


$("#button").on("click", function (event) {
    event.preventDefault();
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");


    console.log("Name: " + name);
    console.log("Destination: " + destination);
    console.log("First Train Time: " + firstTrainTime);
    console.log("Frequency: " + frequency);
    console.log("Next Train: " + nextTrainFormatted);
    console.log("Minutes Away: " + minutesTillTrain);


    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextTrainFormatted: nextTrainFormatted,
        minutesTillTrain: minutesTillTrain
    });
});

database.ref().on("child_added", function (childSnapshot) {
    var tRow = $("<tr>");
    var name = $("<td>").text((childSnapshot.val().name));
    var destination = $("<td>").text((childSnapshot.val().destination));
    var frequency = $("<td>").text((childSnapshot.val().frequency));
    var nextArrival = $("<td>").text((childSnapshot.val().nextTrainFormatted));
    var minutesAway = $("<td>").text((childSnapshot.val().minutesTillTrain));

    tRow.append(name, destination, frequency, nextArrival, minutesAway);
    $("tbody").append(tRow);


}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

