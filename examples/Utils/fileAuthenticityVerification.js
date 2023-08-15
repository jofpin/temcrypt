let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

// This verifies if the encryption hash is compatible with the encrypted file, thus allowing you to manage the legitimacy of your data.
const fileHashVerification = temcrypt.utils({
    verify: {
      hash: "9933d77e080b0db3466f6645be3e196f27adfdae41faf998489a9e",
      dataFiles: "test.txt.trypt" // Here add the file or the path where the file is located
    },
  });
  
// Return of results
console.log(fileHashVerification);