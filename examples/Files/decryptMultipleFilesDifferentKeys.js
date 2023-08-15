let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const keys = ["key1", "key2", "key3"];
const encryptedFile1Path = "data/test1.txt.trypt";
const encryptedFile2Path = "data/test2.txt.trypt";
const encryptedFile3Path = "data/test3.txt.trypt";

// Decrypt multiple files with different keys
const decryptedData = temcrypt.decrypt({
  dataFiles: [encryptedFile1Path, encryptedFile2Path, encryptedFile3Path],
  mainKey: keys,
});

console.log("------- Decrypt Multiple Files with Different Keys -------");
decryptedData.forEach((data, index) => {
  console.log(`Decrypted File ${index + 1}:`, data.dataString);
  console.log(`Creation Date ${index + 1}:`, data.creationDate);
  console.log(`Last Decryption Date ${index + 1}:`, data.lastDecryptionDate);
  console.log("---");
});
