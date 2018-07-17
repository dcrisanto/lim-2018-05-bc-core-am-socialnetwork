//Declración de Variables:
const inputMailRecord = document.getElementById('mail-record');
const inputPasswordRecord = document.getElementById('password-record');
const resgisterLink = document.getElementById('registerLink');
const btnSignUp = document.getElementById('btn-signup');
const inputMailAccess = document.getElementById('mail-access');
const inputPasswordAccess = document.getElementById('password-access');
const btnLogin = document.getElementById('btn-login');
const containerText = document.getElementById('container-text');
const signUp = document.getElementById('signUp');
const signIn = document.getElementById('signIn');
const wall = document.getElementById('wall');
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
        observer();
        // Email sent.
    }).catch((error) => {
        // An error happened.
        containerText.innerHTML =
        `<p>error</p>
        `
    });
}

//Registrar nuevo usuario con correo y contraseña
resgisterLink.addEventListener('click', () => {
    signIn.style.display='none';
    signUp.style.display='block';
    inputMailRecord.style.display='block';
    inputPasswordRecord.style.display='block';
});

btnSignUp.addEventListener('click', registrar => {
    //Obtener email y pass
    let registrationMail = inputMailRecord.value;
    let registrationPassword = inputPasswordRecord.value;
    firebase.auth().createUserWithEmailAndPassword(registrationMail, registrationPassword)
        .then(() => {
            document.getElementById('prueba').innerHTML =
        `<p>Se ha enviado un correo de verificación</p>
        `
            checkEmail();
        })
        .catch((error) => {
            // Handle Errors here.
            document.getElementById('prueba').innerHTML = error.code + error.message;
            // ... 
        });
    clearContent([inputMailRecord, inputPasswordRecord]);
});

const showResult = (user) => {
    if (user.emailVerified) {
    `wall.style.display="block"`
        // btnSignOff.classList.remove('hidden');
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
            let displayName = user.displayName;
            let email = user.email;
            let emailVerified = user.emailVerified;
            let photoURL = user.photoURL;
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
            let providerData = user.providerData;
            // ...
            console.log('exite usuario');
        } else {
            // User is signed out.
            // ...
            console.log('no existe usuario')
            status.innerHTML = 'Usuario inactivo';
        }

        //containerText.innerHTML = 'Sólo lo ve si existe usuario';
    });
}

//Acceso de usuarios existentes
btnLogin.addEventListener('click', logear => {
    //Obtener email y pass registrados
    let accessMail = inputMailAccess.value;
    let accessPassword = inputPasswordAccess.value;

    firebase.auth().signInWithEmailAndPassword(accessMail, accessPassword)
    .then(()=>{
        wall.style.display='block';
        sign.style.display='none';
    })

        .catch((error) => {
            // Handle Errors here.
            containerText.innerHTML = error.code + error.message;
        });

    containerText.innerHTML = `<p>Bienvenid@ a esta red social</p>`;
    clearContent([inputMailAccess, inputPasswordAccess]);
});


//Cerrar sesión
btnSignOff.addEventListener('click', signOff => {
    firebase.auth().signOut()
        .then(() => {
            containerText.innerHTML = `<p>Cerrando Sesión</p>`;
        })
        .catch((error) => {
            containerText.innerHTML = error;
        })
});

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
        containerText.innerHTML = `<p> Bienvenid@ a esta red social, ha iniciado sesión con: + ${result.user.email}`;
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
        provider.addScope('public_profile');
        firebase.auth().signInWithPopup(provider).then((result)=> {
            // ...
            document.getElementById('prueba').innerHTML = `<p>Bienvenida ${result.user.displayName}</p>`;
        console.log('face');
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
