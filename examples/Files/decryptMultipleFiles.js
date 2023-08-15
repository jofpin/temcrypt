let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";
const encryptedFile1Path = "data/test1.trypt";
const encryptedFile2Path = "data/test2.trypt";

// Decrypt multiple files using the provided mainKey
const decryptedData = temcrypt.decrypt({
  dataFiles: [encryptedFile1Path, encryptedFile2Path],
  mainKey: key
});

console.log("------- Decrypt Multiple Files -------");
decryptedData.forEach((data, index) => {
  console.log(`Decrypted File ${index + 1}:`, data.dataString);
  console.log(`Creation Date ${index + 1}:`, data.creationDate);
  console.log(`Last Decryption Date ${index + 1}:`, data.lastDecryptionDate);
  console.log("---");
});
