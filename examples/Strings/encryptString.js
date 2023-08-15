let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

// Your personalized data
const key = "yourSecretKey";
const data = "This is a confidential message!";

// temcrypt is called to encrypt the data in dataString using the provided mainKey
const encryptedData = temcrypt.encrypt({
  dataString: data,
  mainKey: key,
  extraBytes: 16, // Optional: Add extra bytes to increase security
});

// Return of results
console.log("Encrypted Data:", encryptedData.dataString);
console.log("Hash:", encryptedData.hash);
console.log("Main Key:", encryptedData.mainKey);
console.log("Time Key:", encryptedData.timeKey);
console.log("Data Sizes:", encryptedData.dataSizes);