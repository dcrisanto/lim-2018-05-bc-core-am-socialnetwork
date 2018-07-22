/* const btnLogin = document.getElementById("login");
const btnR = document.getElementById("register");


btnR.addEventListener('click', () =>{
  openModal2()
})

btnLogin.addEventListener('click', () =>{
  openModal1()
})

function openModal1() {
  //simulate ajax call to get the modal content
  var htmlFromServer = getHtml();

  //append the html to the modal
  $('#modal_content').html(htmlFromServer);

};

function openModal2() {
  //simulate ajax call to get the modal content
  var htmlFromServer = getHtmlR();

  //append the html to the modal
  $('#modal_content').html(htmlFromServer);

};

function getHtml() {
 let loginPrint=
  ` <div class='row'>
  <div class='input-field col s12'>
    <input class='validate' type='email' name='email' id='mail-access' />
    <label for='email'>Ingresa tu email</label>
  </div>
</div>

<div class='row'>
  <div class='input-field col s12'>
    <input class='validate' type='password' name='password' id='password-access' />
    <label for='password'>Ingresa tu contraseña</label>
  </div>
</div>


<center>
  <div class='row'>
    <input type="button" id="btn-login" class=".btn" value="LOGIN">
    <button type='submit' name='btn-login' class='col s12 btn btn-large waves-effect indigo' id="btn-login">ingresar</button>
  </div>
</center>`
return loginPrint
};

function getHtmlR(){
  let loginPrintR=
  `  <div class='row'>
  <div class='input-field col s12'>
  <input id="emailR" type="email" name="username" placeholder="email" required>
  <input id="passwordR" type="password" name="password" placeholder="password" required>
  </div>
</div>
<div class="bottom-container">
  <input type="button" id="btn-signup" class=".btn" value="Regístrate">
</div>`
return loginPrintR

}
 */