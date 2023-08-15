let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const stringsToEncrypt = [
  { key: "key1", data: "Secret data 1" },
  { key: "key2", data: "Secret data 2" },
  { key: "key3", data: "Secret data 3" },
];

// Return Encrypt data
console.log("------- Encrypt Multiple Strings with Different Keys -------");
const encryptedData = stringsToEncrypt.map((entry, index) => {
  const encryptedString = temcrypt.encrypt({
    dataString: entry.data,
    mainKey: entry.key,
  });

  console.log(`Encrypted String ${index + 1}:`, encryptedString.dataString);
  console.log(`Time Key ${index + 1}:`, encryptedString.timeKey);
  console.log("---");

  return { key: entry.key, dataString: encryptedString.dataString };
});

// Return Decrypt data
console.log("------- Decrypt Multiple Strings with Different Keys -------");
const decryptedData = encryptedData.map((entry, index) => {
  const decryptedString = temcrypt.decrypt({
    dataString: entry.dataString,
    mainKey: entry.key,
  });

  console.log(`Decrypted String ${index + 1}:`, decryptedString.dataString);
  console.log(`Creation Date ${index + 1}:`, decryptedString.creationDate);
  console.log(`Last Decryption Date ${index + 1}:`, decryptedString.lastDecryptionDate);
  console.log("---");

  return decryptedString.dataString;
});

// Return of decrypted secret data
console.log("All Decrypted Strings:", decryptedData);