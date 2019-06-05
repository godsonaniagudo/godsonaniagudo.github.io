
// Run on load
var database = firebase.database();
var user = firebase.auth().currentUser;
var imageLocation = "";



// Date objects
var dateOBJ = new Date();
var day = dateOBJ.getDate();
var month = dateOBJ.getMonth() + 1;
var year = dateOBJ.getFullYear();



setTimeout(function() {
  removeElementFromFlow("loaderSection");
  addElementToFlow("visibleSection");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      removeElementFromFlow("forgotPasswordSection");
      removeElementFromFlow("signInSection");
      removeElementFromFlow("createAccountSection");
      removeElementFromFlow("setProfilePictureSection");
      removeElementFromFlow("splashSection");
      addElementToFlow("landingSection");
      alert("Logged in");


    } else {
      addElementToFlow("splashSection");
      removeElementFromFlow("landingSection");
      alert("Logged out");
    }
  });

}, 3000);



//Event Listeners
goToSection("signInLink");
goToSection("createAccountLink");
goToSection("toForgotPassword");

document.getElementById("registerButton").addEventListener("click", function() {
  var email = document.getElementById("regEmailField").value;
  var password = document.getElementById("regPasswordField").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  }).then(function(result){
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref("user/" + uid).set({
      uid: uid,
      username: document.getElementById("regNameField").value,
      email: email,
      regDay: day,
      regDayOfYear: 0,
      regMonth: month,
      regYear: year,
      profilePic: "https://firebasestorage.googleapis.com/v0/b/schedaily.appspot.com/o/media%2Fimages%2Fdefaults%2Ficons8-male-user-48.png?alt=media&token=b439cf53-0c0e-4e76-8cf3-4b4ee7af68cb",
    }).then(function(result){
      addElementToFlow("landingSection");
      removeElementFromFlow("createAccountSection");
    });
  });
});

document.getElementById("loginButton").addEventListener("click", function() {
  var email = document.getElementById("loginEmailField").value;
  var password = document.getElementById("loginPasswordField").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    addElementToFlow("landingSection");
    removeElementFromFlow("signInSection");
    user = firebase.auth().currentUser;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
});


// State-changed listeners
// State Listeners








// Functions
function goToSection(sectionID){
  document.getElementById(sectionID).addEventListener("click",function(){
    removeElementFromFlow("forgotPasswordSection");
    removeElementFromFlow("splashSection");
    removeElementFromFlow("signInSection");
    removeElementFromFlow("createAccountSection");
    removeElementFromFlow("setProfilePictureSection");
    removeElementFromFlow("landingSection");
    switch(sectionID){
      case "signInLink" : addElementToFlow("signInSection");
      break;
      case "createAccountLink" : addElementToFlow("createAccountSection");
      break;
      case "toForgotPassword" : addElementToFlow("forgotPasswordSection");
      break;
      default : return;
    }
  });
}


//add elements to flow//
function addElementToFlow(elementID){
  document.getElementById(elementID).style.display = "block";
}

//remove elements from flow
function removeElementFromFlow(elementID){
  document.getElementById(elementID).style.display = "none";
}
