$(document).ready(function() {
      // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDBCMWsA-Z4KgEoiQ2CC8pGOiHOcEqHLaQ",
    authDomain: "chris-project-7ac32.firebaseapp.com",
    databaseURL: "https://chris-project-7ac32.firebaseio.com",
    projectId: "chris-project-7ac32",
    storageBucket: "chris-project-7ac32.appspot.com",
    messagingSenderId: "533057620555"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

    $("#submitToMe").on("click", function() {

    event.preventDefault();

    name = $("#inputName").val().trim();
    destination = $("#inputDest").val().trim();
    firstTime = $("#inputFirst").val().trim();
    frequency = $("#inputFreq").val().trim();

    console.log(name, destination, firstTime, frequency);

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
      });
    })

    setInterval(updateTime, 1000);

    function updateTime () {

        $(".display").empty();

        database.ref().on("child_added", function(snapshot) {

            var name = $("<td>").text(snapshot.val().name.trim());
            var destination = $("<td>").text(snapshot.val().destination.trim());
            var frequency = $("<td>").text(snapshot.val().frequency.trim());
            

            // using moment.js to calculate minutes til next boat
            var first = snapshot.val().firstTime;
            var time = moment(first, 'hh:mm a');
            var nextArrival = $("<td>").text(time.format('hh:mm a'));
            var current = moment();
            
            if (current.isBefore(time)) {
                // console.log("if before");
                var minLeft = time.diff(current, 'minutes');
                var next = $("<td>").text(minLeft);
                $(".display").append($("<tr>").append([name, destination, frequency, nextArrival, next]));
            }

           
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    }

    
})