let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";
const filePath = "test.txt.trypt"; // enter encrypted file

// Decrypt the file at filePath using the provided mainKey
const decryptedData = temcrypt.decrypt({
  dataFiles: filePath,
  mainKey: key
});

console.log("Decrypted File:", decryptedData.decryptedData[0].fileName);
console.log("Creation Date:", decryptedData.decryptedData[0].creationDate);
console.log("Last Decryption Date:", decryptedData.decryptedData[0].lastDecryptionDate);
