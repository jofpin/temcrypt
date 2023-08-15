let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

// Change the main key of an encrypted string
const stringKeyChange = temcrypt.utils({
  changeKey: {
    dataString: "encryptedString",
    mainKey: "yourCurrentMainKey",
    newKey: "newMainKey",
  },
});

// Return of results
console.log(stringKeyChange);