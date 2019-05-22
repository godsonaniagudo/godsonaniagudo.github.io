var database = firebase.database();
database.ref("users").set("something else");

var user = firebase.auth().currentUser;

setTimeout(function() {
  removeElementFromFlow("loaderSection");
  addElementToFlow("visibleBodySection");
  if (user) {
    removeElementFromFlow("headerSection");
    removeElementFromFlow("recents-section");
    removeElementFromFlow("logRegSection");
  } else {
    // No user is signed in.
  }
}, 3000);

document.getElementById("toRegisterLoginSection").addEventListener("click", function() {
  removeElementFromFlow("headerSection");
  removeElementFromFlow("recents-section");
  addElementToFlow("logRegSection");

});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    removeElementFromFlow("headerSection");
    removeElementFromFlow("recents-section");
    removeElementFromFlow("logRegSection");
    addElementToFlow("userLandingSection");

  } else {
    addElementToFlow("logRegSection");
    removeElementFromFlow("userLandingSection")
  }
});



document.getElementById("signOutLink").addEventListener("click",function(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
});


document.getElementById("loginButton").addEventListener("click", function() {
  var email = document.getElementById("loginEmailField").value;
  var password = document.getElementById("loginPasswordField").value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
    user = firebase.auth().currentUser;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
      });

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });

  alert("Done");
});

document.getElementById("registerButton").addEventListener("click", function() {
  var email = document.getElementById("regEmailField").value;
  var password = document.getElementById("regPasswordField").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  alert("Done");
});

function removeElementFromFlow(element) {
  document.getElementById(element).style.display = "none";
}

function addElementToFlow(element) {

  document.getElementById(element).style.display = "block";

}
