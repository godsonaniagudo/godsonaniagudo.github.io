document.addEventListener("click",function() {
  var email = document.getElementById("emailID").value;
  var password = document.getElementById("passwordID").value;
  firebase.default.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
  alert("Done");
});
