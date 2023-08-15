let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

// Change the mainKey of an encrypted file
const fileKeyChange = temcrypt.utils({
  changeKey: {
    dataFiles: "test.txt.trypt", // Here add the file or the path where the file is located
    mainKey: "yourCurrentMainKey",
    newKey: "newMainKey",
  }
});

// Return of results
console.log(fileKeyChange);