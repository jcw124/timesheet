<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>


// Initialize Firebase
var config = {
  apiKey: "AIzaSyD4joYL7bd6Rlwy6I8EWvpch1RDSWHzQSc",
  authDomain: "timesheet-7f4d8.firebaseapp.com",
  databaseURL: "https://timesheet-7f4d8.firebaseio.com",
  projectId: "timesheet-7f4d8",
  storageBucket: "",
  messagingSenderId: "432577347653"
};
firebase.initializeApp(config);


// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startdate = 0;
var monthlyRate = "";

// Capture Button Click
$("#submit").on("click", function(event) {
    event.preventDefault();

     // Grabbed values from text boxes
     name = $("#name-input").val().trim();
     role = $("#role-input").val().trim();
     startdate = $("#date-input").val().trim();
     monthlyRate = $("#rate-input").val().trim();

     // Code for handling the push
     database.ref().push({
       name: name,
       role: role,
       startdate: startdate,
       monthlyRate: monthlyRate,
       dateAdded: firebase.database.ServerValue.TIMESTAMP
     });

   });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
  
        // Console.loging the last user's data
        console.log(sv.name);
        console.log(sv.role);
        console.log(sv.startdate);
        console.log(sv.monthlyRate);
        console.log(sv.TIMESTAMP);
  
        // Change the HTML to reflect
        $("#name-display").text(sv.name);
        $("#email-display").text(sv.email);
        $("#age-display").text(sv.age);
        $("#comment-display").text(sv.comment);
        
// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
