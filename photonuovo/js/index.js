// Global variable declarations

var database = firebase.database();
database.ref("users").set("something else");
var user = firebase.auth().currentUser;
var imageLocation = "";


// Date objects
var dateOBJ = new Date();
var day = dateOBJ.getDate();
var month = dateOBJ.getMonth() + 1;
var year = dateOBJ.getFullYear();



// Event Listeners
document.getElementById("myProfileLink").addEventListener("click",function(){
removeElementFromFlow("discoverSection");
addElementToFlow("userAccountSection");
});

document.getElementById("discoverLink").addEventListener("click",function(){
  window.location.reload();
});


document.getElementById("uploadImageButton").addEventListener("click", function() {

  if (imageLocation != "") {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var keyGen = firebase.database().ref("img").push();
    var storageRef = firebase.storage().ref('photos/' + uid + "/" + keyGen.key);
    storageRef.putString(imageLocation, 'data_url').then(function(snapshot) {
      storageRef.getDownloadURL().then(function(url) {

        writeImageData(uid, keyGen.key, url, day, month, year);
        document.getElementById("blah").src = "images/imagePlaceholder.png";
        document.getElementById("uploaderButton").value = "";
        document.getElementById("closeUploadWindowButton").click();
      }).catch(function(error) {
        // Handle any errors
      });
      console.log('Uploaded a data_url string!');
    });
  } else {
    alert("Image location is empty");
  }
});


document.getElementById("toRegisterLoginSection").addEventListener("click", function() {
  removeElementFromFlow("headerSection");
  removeElementFromFlow("recents-section");
  addElementToFlow("logRegSection");

});

// Run on load
setTimeout(function() {
  removeElementFromFlow("loaderSection");
  addElementToFlow("visibleBodySection");
  if (user) {
    removeElementFromFlow("headerSection");
    removeElementFromFlow("recents-section");
    removeElementFromFlow("logRegSection");

  } else {
    removeElementFromFlow("recents-section");
    removeElementFromFlow("logRegSection");
  }
}, 3000);

document.getElementById("registerButton").addEventListener("click", function() {
  var email = document.getElementById("regEmailField").value;
  var password = document.getElementById("regPasswordField").value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
});

document.getElementById("signOutLink").addEventListener("click", function() {
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
});


// State Listeners
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    removeElementFromFlow("headerSection");
    removeElementFromFlow("recents-section");
    removeElementFromFlow("logRegSection");
    removeElementFromFlow("userAccountSection");
    addElementToFlow("userLandingSection");
    var dataRef = firebase.database().ref('imagesDetails');
    dataRef.on('value', function(snapshot) {
      var idVal = 1;
      snapshot.forEach(function(child) {

        document.getElementById('cardImageId'+idVal).src = child.val().image;

        document.getElementById('cardImageId'+idVal).addEventListener("click",function(){
          document.getElementById("largeModalImage").src = child.val().image;
        });
        idVal++;
      });
    });



  } else {
    addElementToFlow("logRegSection");
    removeElementFromFlow("userLandingSection");
    removeElementFromFlow("userAccountSection");
  }
});


// Functions

//Write data to Firebase storage
function writeImageData(userId, imageID, imageLink, postedDay, postedMonth, postedYear) {
  firebase.database().ref("imagesDetails/" + imageID).set({
    uid: userId,
    image: imageLink,
    day: postedDay,
    month: postedMonth,
    year: postedYear,
    likes: 0
  });
}

//Add or remove elements from HTML flow
function removeElementFromFlow(element) {
  document.getElementById(element).style.display = "none";
}

function addElementToFlow(element) {

  document.getElementById(element).style.display = "block";

}

//Read url of selected image
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#blah')
        .attr('src', e.target.result);
      imageLocation = e.target.result;

    };

    reader.readAsDataURL(input.files[0]);
  }
}
