const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const toggleBtn = document.getElementById("toggle");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");

const historyList = document.getElementById("historyList");

let history = [];

/* Length Slider */

lengthSlider.addEventListener("input", () => {
lengthValue.textContent = lengthSlider.value;
});

/* Secure Random */

function getSecureRandomInt(max){

const array = new Uint32Array(1);
window.crypto.getRandomValues(array);
return array[0] % max;

}

/* Generate Password */

function generatePassword(){

let chars = "";

if(uppercase.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if(lowercase.checked) chars += "abcdefghijklmnopqrstuvwxyz";
if(numbers.checked) chars += "0123456789";
if(symbols.checked) chars += "!@#$%^&*()_+{}[]<>?/";

if(chars === ""){
alert("Select at least one option!");
return;
}

let password = "";
let length = lengthSlider.value;

for(let i=0;i<length;i++){

let index = getSecureRandomInt(chars.length);
password += chars[index];

}

passwordBox.value = password;

updateStrength(password);
calculateEntropy(password);
estimateCrackTime(password);
saveHistory(password);

}

generateBtn.addEventListener("click", generatePassword);

/* Strength Meter */

function updateStrength(password){

let score = 0;

if(password.length > 8) score++;
if(password.length > 12) score++;

if(/[A-Z]/.test(password)) score++;
if(/[a-z]/.test(password)) score++;
if(/[0-9]/.test(password)) score++;
if(/[^A-Za-z0-9]/.test(password)) score++;

if(score <= 2){
strengthText.textContent = "Weak";
strengthFill.style.width = "33%";
strengthFill.style.background = "red";
}

else if(score <=4){
strengthText.textContent = "Medium";
strengthFill.style.width = "66%";
strengthFill.style.background = "orange";
}

else{
strengthText.textContent = "Strong";
strengthFill.style.width = "100%";
strengthFill.style.background = "green";
}

}

/* Entropy */

function calculateEntropy(password){

let charset = 0;

if(/[A-Z]/.test(password)) charset += 26;
if(/[a-z]/.test(password)) charset += 26;
if(/[0-9]/.test(password)) charset += 10;
if(/[^A-Za-z0-9]/.test(password)) charset += 32;

let entropy = Math.log2(Math.pow(charset,password.length));

document.getElementById("entropy").innerText =
"Entropy: " + Math.round(entropy) + " bits";

}

/* Crack Time */

function estimateCrackTime(password){

let guessesPerSecond = 1e10;

let charset = 0;

if(/[A-Z]/.test(password)) charset += 26;
if(/[a-z]/.test(password)) charset += 26;
if(/[0-9]/.test(password)) charset += 10;
if(/[^A-Za-z0-9]/.test(password)) charset += 32;

let combinations = Math.pow(charset,password.length);

let seconds = combinations / guessesPerSecond;

let years = seconds / (60*60*24*365);

document.getElementById("crackTime").innerText =
"Crack Time: " + years.toFixed(2) + " years";

}

/* Copy */

copyBtn.addEventListener("click", () => {

if(passwordBox.value === "") return;

navigator.clipboard.writeText(passwordBox.value);

alert("Password copied!");

});

/* Show / Hide */

toggleBtn.addEventListener("click", () => {

if(passwordBox.type === "password"){
passwordBox.type = "text";
}

else{
passwordBox.type = "password";
}

});

/* History */

function saveHistory(password){

history.unshift(password);

if(history.length > 5){
history.pop();
}

historyList.innerHTML = "";

history.forEach(p=>{
let li = document.createElement("li");
li.textContent = p;
historyList.appendChild(li);
});

}

/* Download */

document.getElementById("download").onclick = function(){

let text = passwordBox.value;

let blob = new Blob([text], {type:"text/plain"});

let a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "password.txt";

a.click();

}

/* Dark Mode */
const darkBtn = document.getElementById("darkMode");

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("light-mode");

if(document.body.classList.contains("light-mode")){
darkBtn.textContent = "🌙 Dark Mode";
}else{
darkBtn.textContent = "☀ Light Mode";
}

});