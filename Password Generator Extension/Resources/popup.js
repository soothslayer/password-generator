console.log("Hello World!", browser);
for(var i=6; i<=50; i++){
    var select = document.getElementById("passwordLengthNumber");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = i;
    option.value = i;
}
function copyToClipboard() {
    document.getElementById("passwordField").select();
    document.execCommand('copy');
    document.getElementById("passwordField").blur()
}
function saveCheckMarkWithName(checkMarkName) {
    let checkMarkVariable = document.getElementById(checkMarkName).checked
    if (checkMarkVariable) {
        localStorage.setItem(checkMarkName, "checked");
    } else {
        localStorage.setItem(checkMarkName, "unchecked");
    }
}
function loadCheckMarkWithName(checkMarkName) {
    let checkMarkVariable = localStorage.getItem(checkMarkName);

    if (checkMarkVariable == "unchecked") {
        document.getElementById(checkMarkName).checked = false;
    } else {
        document.getElementById(checkMarkName).checked = true;
    }
}
function saveOptions() {
    localStorage.setItem("rangePasswordLength", document.getElementById("passwordLengthNumber").value);
    console.log("saved");
    browser.runtime.sendMessage({ text: "saved" });

    saveCheckMarkWithName("passwordWithNumbers");
    saveCheckMarkWithName("passwordWithUppercase");
    saveCheckMarkWithName("passwordWithSymbols");
    saveCheckMarkWithName("oneOfEachSpecialCharacter");
}
function restoreOptions() {
    var rangePasswordLength = "12"
    if (localStorage.getItem("passwordHistory") === null) {
        
    } else {
        rangePasswordLength = localStorage.getItem("rangePasswordLength");
    }
    document.getElementById("passwordLengthNumber").value = rangePasswordLength;
    document.getElementById("rangePasswordLength").value = rangePasswordLength;
    
    loadCheckMarkWithName("passwordWithNumbers");
    loadCheckMarkWithName("passwordWithUppercase");
    loadCheckMarkWithName("passwordWithSymbols");
    loadCheckMarkWithName("oneOfEachSpecialCharacter");
    
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    console.log("restored");
    browser.runtime.sendMessage({ text: "loaded" });
    browser.runtime.sendMessage({ text: rangePasswordLength });
    browser.runtime.sendMessage({ text: document.getElementById("passwordLengthNumber").value });
    
    //check if password history exists and if it does then populate the password history select
    if (localStorage.getItem("passwordHistory") === null) {
      
    } else {
        var passwordHistory = JSON.parse(localStorage.getItem("passwordHistory"));

        if (localStorage.getItem("passwordLastSet") === null) {
            
        } else {
            const currentDate = new Date();
            const thirtyMinutesAgo = new Date(currentDate.getTime() - 1 * 60000);
            const passwordLastSet = new Date(JSON.parse(localStorage.getItem("passwordLastSet")));
            if (passwordLastSet < thirtyMinutesAgo) {
                passwordHistory = [];
                localStorage.setItem("passwordHistory", null)
            }
        }
   
        let i = 0;

        while (i < passwordHistory.length) {
            var select = document.getElementById("passwordHistory");
            var option = document.createElement("OPTION");
            select.options.add(option);
            option.text = passwordHistory[i];
            option.value = passwordHistory[i];
            i++;
        }
    }

}
function saveToPasswordHistory() {
    if (localStorage.getItem("passwordHistory") === null) {
        var passwordHistory =[];
    } else {
        var passwordHistory = JSON.parse(localStorage.getItem("passwordHistory"));
    }
    if (!passwordHistory.includes(document.getElementById("passwordField").value)) {
        passwordHistory.unshift(document.getElementById("passwordField").value);
        if (passwordHistory.length > 10) {
            passwordHistory.pop()
        }
        localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));
    }
    const date = new Date().getTime();
    localStorage.setItem("passwordLastSet", JSON.stringify(date));
}
document.addEventListener('DOMContentLoaded', restoreOptions);

document.querySelector("#rangePasswordLength").addEventListener('change', () => {
    document.getElementById("passwordLengthNumber").value = document.getElementById("rangePasswordLength").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#rangePasswordLength").addEventListener('input', () => {
    document.getElementById("passwordLengthNumber").value = document.getElementById("rangePasswordLength").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#passwordLengthNumber").addEventListener('change', () => {
    document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#passwordLengthNumber").addEventListener('input', () => {
    document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#passwordWithNumbers").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#passwordWithUppercase").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#passwordWithSymbols").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
    saveOptions();
});
document.querySelector("#oneOfEachSpecialCharacter").addEventListener('click', () => {
    //document.getElementById("rangePasswordLength").value = document.getElementById("passwordLengthNumber").value
    document.getElementById("passwordField").value = generatePassword(document.getElementById("rangePasswordLength").value);
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
    let oneOfEachSpecialCharacter = document.getElementById("oneOfEachSpecialCharacter").checked;
    const regexUppercase = new RegExp('[A-Z]');
    const regexNumbers = new RegExp('[0-9]');
    const regexSymbols = new RegExp('[!@#$%^&*()_+]');
  for (let i = 0; i < length; i++) {
      if (oneOfEachSpecialCharacter && regexUppercase.test(password)) {
          charset = charset.replace(/[A-Z]/g, '');
      }
      if (oneOfEachSpecialCharacter && regexNumbers.test(password)) {
          charset = charset.replace(/[0-9]/g, '');
      }
      if (oneOfEachSpecialCharacter && regexSymbols.test(password)) {
          charset = charset.replace(/[!@#$%^&*()_+]/g, '');
      }
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}
document.getElementById("generatePasswordButton").addEventListener("click", function() {
    let passwordLength = document.getElementById("rangePasswordLength").value
  const password = generatePassword(passwordLength); // Generate a password of length rangePasswordLength
  document.getElementById("passwordField").value = password; // Display the password in an input field
});
document.getElementById("copyAndClose").addEventListener("click", function() {
    copyToClipboard();
    saveOptions();
    //saveToPasswordHistory();
    window.close();
});
document.getElementById("passwordField").addEventListener("click", function() {
    this.select()
    document.execCommand('copy');
});
document.getElementById("clearHistory").addEventListener("click", function() {
    var passwordHistory = [];
    localStorage.setItem("passwordHistory", JSON.stringify(passwordHistory));
    var select = document.getElementById("passwordHistory");
    while (select.options.length > 0) {
        select.remove(0);
    }
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = "Password History";
    option.value = "";
});
document.querySelector("#passwordHistory").addEventListener('change', () => {
    document.getElementById("passwordField").value = document.getElementById("passwordHistory").value;
    document.getElementById("passwordHistory").value = "";
});
