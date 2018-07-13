//Declración de Variables:
const inputMailRecord = document.getElementById('mail-record');
const inputPasswordRecord = document.getElementById('password-record');
const btnSignUp = document.getElementById('btn-signup');
const inputMailAccess = document.getElementById('mail-access');
const inputPasswordAccess = document.getElementById('password-access');
const btnLogin = document.getElementById('btn-login');
const btnLogout = document.getElementById('btn-logout');
let containerText = document.getElementById('container-text');
const btnSignOff = document.getElementById('sign-off');
const status = document.getElementById('status');
const btnLoginGoogle = document.getElementById('btn-login-google');
const btnLoginFacebook = document.getElementById('btn-login-facebook');

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAB7icNPz-tO88wVkgcCeNmlz9H1xd8OTU",
    authDomain: "login-e3b98.firebaseapp.com",
    databaseURL: "https://login-e3b98.firebaseio.com",
    projectId: "login-e3b98",
    storageBucket: "login-e3b98.appspot.com",
    messagingSenderId: "857338189328"
};
firebase.initializeApp(config);

const clearContent = (elements) => {
    elements.forEach(element => {
        clearElement(element);
    });
}

const clearElement = (element) => {
    if (element.value) {
        element.value = '';
    }
    element.innerHTML = '';
}

//Enviar un mensaje de verificación al usuario
const checkEmail = () => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(() => {
        console.log('enviando el correo')
        // Email sent.
    }).catch((error) => {
        // An error happened.
        console.log(eror);
    });
}

//Registrar nuevo usuario con correo y contraseña
btnSignUp.addEventListener('click', registrar => {
    //Obtener email y pass
    let registrationMail = inputMailRecord.value;
    let registrationPassword = inputPasswordRecord.value;

    firebase.auth().createUserWithEmailAndPassword(registrationMail, registrationPassword)
    .then(() =>{
      checkEmail();
    })
    .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            containerText.innerHTML = 'Verfique los datos de registro: ' + errorMessage;
            // ... 
        });
    containerText.innerHTML = 'Se registró satisfactoriamente';
    clearContent([inputMailRecord, inputPasswordRecord]);
});

//Acceso de usuarios existentes
btnLogin.addEventListener('click', logear => {
    //Obtener email y pass registrados
    let accessMail = inputMailAccess.value;
    let accessPassword = inputPasswordAccess.value;

    firebase.auth().signInWithEmailAndPassword(accessMail, accessPassword)
        .catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
            containerText.innerHTML = 'No se encuentra registrado: ' + errorMessage;
        });
    //containerText.innerHTML = 'Bienvenid@ a esta red social';
    clearContent([inputMailAccess, inputPasswordAccess]);
});

//Cerrar sesión
btnSignOff.addEventListener('click', signOff => {
    firebase.auth().signOut()
        .then(() => {
            console.log('Cerrando sesión de red social');
        })
        .catch((error) => {
            console.log(error);
        })
});

const showResult = (user) => {
    if (user.emailVerified){
        btnSignOff.classList.remove('hidden');
        status.innerHTML = `
        <p>Se validó que su correo si existe, Bienvenid@, usuario se encuentra activo</p>
        `
    }
    
}

//Estado de autenticación
const observer = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            showResult(user);
            // User is signed in.
            console.log(user);
            let displayName = user.displayName;
            let email = user.email;
            let emailVerified = user.emailVerified;
            console.log(emailVerified);
            let photoURL = user.photoURL;
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
            let providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
            status.innerHTML = 'Usuario inactivo';
        }
        //containerText.innerHTML = 'Sólo lo ve si existe usuario';
    });
}

observer();

//Autentificación con Google
btnLoginGoogle.addEventListener('click', handleAuth =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(`${result.user.email} Ha iniciado sesión`);
      }).catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        console.log(`Error ${error.code}: ${error.message}`);
      });
})

//Autentificación con Facebook
btnLoginFacebook.addEventListener('click', handleAuthFace =>{
    //Si cuenta con una sesión activa
    if (!firebase.auth().currentUser){
        //Almacenar la información del proveedor facebook
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
          }).catch((error)=> {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
          });
    }
});
