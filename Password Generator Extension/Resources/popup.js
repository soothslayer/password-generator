console.log("Hello World!", browser);
function saveOptions() {
  browser.storage.sync.set({
    rangePasswordLength: document.querySelector("#rangePasswordLength").value
    //passwordWithNumbers:   document.querySelector("#passwordWithNumbers").checked
    //passwordWithUppercase: document.querySelector("#passwordWithUppercase").checked
    //passwordWithSymbols: document.querySelector("#passwordWithSymbols").checked
  });
}
function restoreOptions() {
    let storageItemrangePasswordLength = browser.storage.managed.get('rangePasswordLength');
    storageItemrangePasswordLength.then((res) => {
        document.querySelector("#rangePasswordLength").value = res.rangePasswordLength;
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
function copyToClipboard() {
    document.getElementById("passwordField").select();
    document.execCommand('copy');
    document.getElementById("passwordField").blur()
}
document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
copyToClipboard();

document.querySelector("#rangePasswordLength").addEventListener('change', () => {
    document.getElementById("passwordLengthNumber").value = document.getElementById("rangePasswordLength").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
    
});
document.querySelector("#rangePasswordLength").addEventListener('input', () => {
    document.getElementById("passwordLengthNumber").value = document.getElementById("rangePasswordLength").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
});
document.querySelector("#passwordLengthNumber").addEventListener('change', () => {
    document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
});
document.querySelector("#passwordLengthNumber").addEventListener('input', () => {
    document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
});
document.querySelector("#passwordWithNumbers").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
});
document.querySelector("#passwordWithUppercase").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
});
document.querySelector("#passwordWithSymbols").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    copyToClipboard();
    saveOptions();
});
function updateNumberInput(newVal){
    document.getElementById("passwordLengthNumber").value=newVal;
}
function generatePassword(length) {
    let charset = "abcdefghijklmnopqrstuvwxyz"
    let includeNumbers = document.getElementById("passwordWithNumbers").checked
    if (includeNumbers) {
        charset += "0123456789"
    } else {
        charset = charset.replace(/[0-9]/g, '');
    }
    let includeUppercase = document.getElementById("passwordWithUppercase").checked
    if (includeUppercase) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    } else {
        charset = charset.replace(/[A-Z]/g, '');
    }
    let includeSymbols = document.getElementById("passwordWithSymbols").checked
    if (includeSymbols) {
        charset += "!@#$%^&*()_+"
    } else {
        charset = charset.replace(/[!@#$%^&*()_+]/g, '');
    }
  //const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}
document.getElementById("generatePasswordButton").addEventListener("click", function() {
    let passwordLength = document.getElementById("rangePasswordLength").value
  const password = generatePassword(passwordLength); // Generate a password of length 12
  document.getElementById("passwordField").value = password; // Display the password in an input field
    copyToClipboard();
});
document.getElementById("passwordField").addEventListener("click", function() {
    this.select()
    document.execCommand('copy');
});
