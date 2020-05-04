 //Autenticación de usuario con correo y contraseña

//Inicialización de firebase
var firebaseConfig = {
    apiKey: "AIzaSyCTT4IpgR7eWjQ8abJxvMdKYfIWM-7ahSU",
    authDomain: "ayt-project-6ecbe.firebaseapp.com",
    databaseURL: "https://ayt-project-6ecbe.firebaseio.com",
    projectId: "ayt-project-6ecbe",
    storageBucket: "ayt-project-6ecbe.appspot.com",
    messagingSenderId: "234742925719",
    appId: "1:234742925719:web:261ed72b39bb3aa0aa1cd2",
    measurementId: "G-W5N984WD8T"
  };

  document.onload = function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();

  var docRef = firestore.doc('attributes/treesAmount');
  var emailInputLogin = document.querySelector('.inputEmailLogin');
  var passwordInputLogin = document.querySelector('.inputPasswordLogin');
  var sendBtnLogin = document.querySelector('.sendInfoLogin');
  var emailInputRegister = document.querySelector('.inputEmailRegister');
  var passwordInputRegister = document.querySelector('.inputPasswordRegister');
  var sendBtnRegister = document.querySelector('.sendInfoRegister');
  var logOut = document.querySelector('.logOut');
  var loginGmail = document.querySelector('.loginGmail');
  var treeProgress = document.querySelector('.treeQuantity');
  var amountOfTrees = 0 ; //Aqui el valor se extrae de la base de datos


  var sendQuantity = function (event) {
    firebase.auth().signOut().then(function() {
      docRef.set({
        treesAmount: amountOfTrees
    }).then(function() {
        console.log('Se mandó la info');
    }).catch(function (error) {
        console.log('No se mandó la info,', error);
    });
    }).catch(function(error) {
      // An error happened.
    });
  }
  logOut.addEventListener('click', sendQuantity)

  var handleTreeProgress = function (event) {
      amountOfTrees += 1 ;
      console.log(amountOfTrees);
  }
  
  var handleSendInfoLogin = function(event) {
  firebase.auth().signInWithEmailAndPassword(emailInputLogin.value, passwordInputLogin.value).then(function(user) {
      console.log('El usuario se conectó1');
      document.querySelector('.loginAndRegister').style.display='none';
      document.querySelector('.drawCanvas').style.display='block';
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta.');
      } else {
        alert(errorMessage);         
      }
      console.log(error);
  });
  }
  sendBtnLogin.addEventListener('click', handleSendInfoLogin);
  
  var handleSendInfoRegister = function(event) {
  firebase.auth().createUserWithEmailAndPassword(emailInputRegister.value, passwordInputRegister.value).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  }
  sendBtnRegister.addEventListener('click', handleSendInfoRegister);
  
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(displayName);
    treeProgress.addEventListener('click', handleTreeProgress);
    console.log('El usuario se conectó1');
    console.log(email);
    // ...
  } else {
    // User is signed out.
    // ...
    console.log('El usuario se piso :c');
  }
  });
  
  /*
  //autenticación con google
  var provider = new firebase.auth.GoogleAuthProvider();
  var handleLoginWithGmail = function (event){
  firebase.auth().languageCode = 'pt';
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  });
  }
  loginGmail.addEventListener('click', handleLoginWithGmail);
  */
  
  // A partir de aqui comienza todo lo del canvas del entorno virtual.
  