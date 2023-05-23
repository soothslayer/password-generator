function saveOptions() {
  browser.storage.sync.set({
    rangePasswordLength: document.querySelector("#rangePasswordLength").value
    passwordWithNumbers:   document.querySelector("#passwordWithNumbers").checked
    passwordWithUppercase: document.querySelector("#passwordWithUppercase").checked
    passwordWithSymbols: document.querySelector("#passwordWithSymbols").checked
  });
}

function restoreOptions() {
  let storageItemrangePasswordLength = browser.storage.managed.get('rangePasswordLength');
    storageItemrangePasswordLength.then((res) => {
    document.querySelector("#rangePasswordLength").value = res.rangePasswordLength;
  });
    let storageItempasswordWithNumbers = browser.storage.managed.get('passwordWithNumbers');
    storageItempasswordWithNumbers.then((res) => {
      document.querySelector("#passwordWithNumbers").checked = res.passwordWithNumbers;
    });
    let storageItempasswordWithUppercase = browser.storage.managed.get('passwordWithUppercase');
    passwordWithUppercase.then((res) => {
      document.querySelector("#passwordWithUppercase").checked = res.passwordWithUppercase;
    });
    let storageItempasswordWithSymbols = browser.storage.managed.get('passwordWithSymbols');
    storageItempasswordWithSymbols.then((res) => {
      document.querySelector("#passwordWithSymbols").checked = res.passwordWithSymbols;
    });

 /* let gettingItem = browser.storage.sync.get('colour');
  gettingItem.then((res) => {
    document.querySelector("#colour").value = res.colour || 'Firefox red';
  });
  */
}

document.addEventListener('DOMContentLoaded', restoreOptions);
