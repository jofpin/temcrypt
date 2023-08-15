let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

// It is used to check if an encrypted String belongs to temcrypt.
const stringCheck = temcrypt.utils({
    check: {
      dataString: "encryptedString"
    }
  });
  
// Return of results
console.log(stringCheck);