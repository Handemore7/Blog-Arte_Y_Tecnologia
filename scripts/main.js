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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var emailInputLogin = document.querySelector('.inputEmailLogin');
var passwordInputLogin = document.querySelector('.inputPasswordLogin');
var sendBtnLogin = document.querySelector('.sendInfoLogin');
var emailInputRegister = document.querySelector('.inputEmailRegister');
var passwordInputRegister = document.querySelector('.inputPasswordRegister');
var sendBtnRegister = document.querySelector('.sendInfoRegister');
var logOut = document.querySelector('.logOut');
var loginGmail = document.querySelector('.loginGmail');

var handleSendInfoLogin = function(event) {
  firebase.auth().signInWithEmailAndPassword(emailInputLogin.value, passwordInputLogin.value).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
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

var handleLogOut = function(event) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
logOut.addEventListener('click', handleLogOut);



// A partir de aqui comienza todo lo del canvas del entorno virtual.

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
  
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);
  
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('lightblue');
  
    {
      const planeSize = 40;
  
      const loader = new THREE.TextureLoader();
      const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);
  
      const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -.5;
      scene.add(mesh);
    }
  
    {
      const skyColor = 0xB1E1FF;  // light blue
      const groundColor = 0xB97A20;  // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    controls = new THREE.OrbitControls(camera, renderer.domElement);


    var loaderTexture = new THREE.ImageLoader();
    loaderTexture.load( './Models/bark_0021-jpg', function ( image ) {

        texture.image = image;
        texture.needsUpdate = true;

    } );

    var loader = new THREE.OBJLoader();
    loader.load
    (
        './Models/Tree.obj',

        function(object){scene.add(object);
            if ( child instanceof THREE.Mesh ) {

                child.material.map = texture;

            }
        });
    
    
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }
    

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
    
      function render() {
    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
    
      requestAnimationFrame(render);
    }
    
    main();
    
    //Aqui termina lo del canvas del entorno virtual.