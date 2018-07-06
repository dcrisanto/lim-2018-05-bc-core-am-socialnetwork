(function(){
    var config = {
        apiKey: "AIzaSyBJLg0QwQM_UVohFzRN37UFDKrX5U85lek",
        authDomain: "labredsocial.firebaseapp.com",
        databaseURL: "https://labredsocial.firebaseio.com",
        projectId: "labredsocial",
        storageBucket: "labredsocial.appspot.com",
        messagingSenderId: "735549578294"
      };
      firebase.initializeApp(config);
      const txtemail=document.getElementById("inputLogin");
      const txtpassword=document.getElementById("inputPassword");
      const buttonLogIn=document.getElementById("buttonLogIn");
      const buttonSignIn=document.getElementById("buttonSignIn");
      const buttonLogOut=document.getElementById("buttonLogOut");

      buttonLogIn.addEventListener('click', e=>{
          const email = txtemail.value;
          const pass= txtpassword.value;
          const auth = firebase.auth();
        
          const promise = auth.signInWithEmailAndPassword(email, pass);
          promise.catch(e=> console.log(e.message));
      })

      buttonSignIn.addEventListener('click', e=>{
        const email = txtemail.value;
        const pass= txtpassword.value;
        const auth = firebase.auth();
      
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e=> console.log(e.message));
      });

      buttonLogOut.addEventListener('click', e=>{
          firebase.auth().signOut();
      })

      firebase.auth().onAuthStateChanged(firebaseUser =>{
          if (firebaseUser){
              console.log(firebaseUser);
          }
          else{
              console.log('no está loggeado');
              buttonLogOut.classList.add('hide');
          }
      })

})