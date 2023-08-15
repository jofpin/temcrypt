let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";
const dataString = "This is a confidential message!";

// Encrypt dataString using the provided mainKey
const encryptedData = temcrypt.encrypt({
  dataString: dataString,
  mainKey: key,
  extraBytes: 16
});

// Return Encrypted
console.log("------- Encrypt -------");
console.log("Encrypted Data:", encryptedData.dataString);
console.log("Hash:", encryptedData.hash);
console.log("Main Key:", encryptedData.mainKey);
console.log("Time Key:", encryptedData.timeKey);
console.log("Data Sizes:", encryptedData.dataSizes);

// Decrypt dataString using the provided mainKey
const decryptedData = temcrypt.decrypt({
  dataString: encryptedData.dataString,
  mainKey: key,
});

// Return Decrypted
console.log("\n------- Decrypt -------");
console.log("Decrypted Data:", decryptedData.dataString);
console.log("Creation Date:", decryptedData.creationDate);
console.log("Last Decryption Date:", decryptedData.lastDecryptionDate);
