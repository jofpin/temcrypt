let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

// It is used to check if an encrypted file belongs to temcrypt.
const fileCheck = temcrypt.utils({
    check: {
      dataFiles: "test.txt.trypt" // Here add the file or the path where the file is located
    },
  });
  
// Return of results
console.log(fileCheck);