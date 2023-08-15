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

// Encrypt the file at filePath using the provided mainKey
const encryptedData = temcrypt.encrypt({
  dataFiles: filePath,
  mainKey: key,
  extraBytes: 16, // Optional: Add extra bytes to increase security
});

// Return of results
console.log("Encrypted File:", encryptedData.encryptedData[0].fileName);
console.log("Main Key:", encryptedData.encryptedData[0].mainKey);
console.log("Time Key:", encryptedData.encryptedData[0].timeKey);
console.log("File Size:", encryptedData.fileSize);
