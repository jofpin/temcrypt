let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const mainKey = "yourSecretKey";
const encryptedData = "..."; // Encrypted data obtained from the encryption example

// Decrypt dataString using the provided mainKey
const decryptedData = temcrypt.decrypt({
  dataString: encryptedData,
  mainKey: mainKey
});

// Return of results edString
console.log("Decrypted Data:", decryptedData.dataString);
console.log("Creation Date:", decryptedData.creationDate);
console.log("Last Decryption Date:", decryptedData.lastDecryptionDate);
