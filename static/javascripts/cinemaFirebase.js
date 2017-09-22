$(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyChdoJmbBgDVFA70TEeItX51YHCwUrXEzM",
    authDomain: "my-cinema-data.firebaseapp.com",
    databaseURL: "https://my-cinema-data.firebaseio.com",
    projectId: "my-cinema-data",
    storageBucket: "",
    messagingSenderId: "655336188244"
  };

  firebase.initializeApp(config);

  console.log(firebase);

  var database = firebase.database();

  var company = "Holywood Leisure";
  var userId = "Movieland";
  var dataStored = "Attendance Figures";
  var today = new Date();
  var seatAttendance = 43;
  var filmName = "Victoria and Abdul";
  var ticketsSold = 40;

//  writeUserData(company, userId, dataStored, today, seatAttendance, filmName, ticketsSold);

  // This includes a key
  var data = {
    date: today,
    dailySeatAttendanceNumber: seatAttendance,
    film: filmName,
    tickets: ticketsSold
  }
  var ref = database.ref(company + "/" + userId).child(dataStored);
  ref.push(data);

})

// This does not include a key
function writeUserData(company, userId, dataStored, today, seatAttendance, filmName, ticketsSold) {
  firebase.database().ref(company + '/' + userId + '/' + dataStored).set({
    date: today,
    dailySeatAttendanceNumber: seatAttendance,
    film : filmName,
    tickets: ticketsSold
  });
}
