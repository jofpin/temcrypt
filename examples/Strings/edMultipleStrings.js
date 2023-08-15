let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";

const stringsToEncrypt = [
  "Secret data 1",
  "Secret data 2",
  "Secret data 3",
];

// Return Encrypt data
console.log("------- Encrypt Multiple Strings with a Single Key -------");
const encryptedData = stringsToEncrypt.map((string, index) => {
  const encryptedString = temcrypt.encrypt({
    dataString: string,
    mainKey: key,
  });

  console.log(`Encrypted String ${index + 1}:`, encryptedString.dataString);
  console.log(`Time Key ${index + 1}:`, encryptedString.timeKey);
  console.log("---");

  return encryptedString.dataString;
});

// Return Decrypt data
console.log("------- Decrypt Multiple Strings with a Single Key -------");
const decryptedData = encryptedData.map((dataString, index) => {
  const decryptedString = temcrypt.decrypt({
    dataString: dataString,
    mainKey: key,
  });

  console.log(`Decrypted String ${index + 1}:`, decryptedString.dataString);
  console.log(`Creation Date ${index + 1}:`, decryptedString.creationDate);
  console.log(`Last Decryption Date ${index + 1}:`, decryptedString.lastDecryptionDate);
  console.log("---");

  return decryptedString.dataString;
});

// Return of decrypted secret data
console.log("All Decrypted Strings:", decryptedData);
