//Username validation
function validateUsername(username){
  return username.length >= 5 && username.length <= 20;
}

function validatePassword(password){
  return password.length >= 8 && password.length <= 16;
}

function validateEmail(email){
  return email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@outlook.com");
}

let output = document.getElementById("output");

function redirect(){
  window.location.href = "/html/user.html";
}

function registerOutput(isUsernameGood, isEmailGood, isPasswordGood){
  let message = document.createElement("p");
  if(isUsernameGood === true && isEmailGood === true && isPasswordGood=== true)
  {
    const time = 3000;
    message.textContent = "Registration sucessful";
    output.appendChild(message);
    setTimeout(redirect, time);
  }
  else
  {
    message.textContent = "Please enter a valid email.";
    output.appendChild(message);
  }
} 


//Get Username from Form
let registerForm = document.getElementsByName("registerForm")[0];

registerForm.addEventListener('submit', function(e){

  e.preventDefault();

  output.innerHTML = "";
  //Store the data
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  //Client-side validation
  isUsernameGood = validateUsername(username);
  isEmailGood = validateEmail(email);
  isPasswordGood = validatePassword(password);
  registerOutput(isUsernameGood, isEmailGood, isPasswordGood);
  //Put it in the database
});


