let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";
const filePath = "data/test.txt";

// Encrypt the file using the provided mainKey
const encryptedData = temcrypt.encrypt({
  dataFiles: filePath,
  mainKey: key
});

// Return Encrypted file
console.log("------- Encrypt Single File -------");
console.log("Encrypted File:", encryptedData.encryptedData[0].fileName);
console.log("Time Key:", encryptedData.encryptedData[0].timeKey);
console.log("---");

// Decrypt the encrypted file using the same mainKey
const decryptedData = temcrypt.decrypt({
  dataFiles: encryptedData.encryptedData[0].fileName,
  mainKey: key
});

// Return Decrypted file
console.log("------- Decrypt Single File -------");
console.log("Decrypted File:", decryptedData.decryptedData[0].dataString);
console.log("Creation Date:", decryptedData.decryptedData[0].creationDate);
console.log("Last Decryption Date:", decryptedData.decryptedData[0].lastDecryptionDate);
