let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";
const filesToEncrypt = ["data/test1.txt", "data/test2.txt", "data/test3.txt"];

// Encrypt the files using the provided mainKey
const encryptedData = temcrypt.encrypt({
  dataFiles: filesToEncrypt,
  mainKey: key
});

console.log("------- Encrypt Multiple Files -------");
encryptedData.encryptedData.forEach((fileData) => {
  console.log("Encrypted File:", fileData.fileName);
  console.log("Time Key:", fileData.timeKey);
  console.log("---");
});

// Decrypt the encrypted files using the same mainKey
const decryptedData = temcrypt.decrypt({
  dataFiles: encryptedData.encryptedData.map((fileData) => fileData.fileName),
  mainKey: key
});

console.log("------- Decrypt Multiple Files -------");
decryptedData.forEach((fileData) => {
  console.log("Decrypted File:", fileData.dataString);
  console.log("Creation Date:", fileData.creationDate);
  console.log("Last Decryption Date:", fileData.lastDecryptionDate);
  console.log("---");
});
