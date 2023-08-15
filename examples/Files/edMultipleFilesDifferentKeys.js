let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const filesToEncrypt = [
  { filePath: "data/test1.txt", key: "key1" },
  { filePath: "data/test2.txt", key: "key2" },
  { filePath: "data/test3.txt", key: "key3" },
];

// Encrypt the files using different keys for each file
const encryptedData = filesToEncrypt.map((fileData) => {
    return temcrypt.encrypt({
      dataFiles: [fileData.filePath],
      mainKey: fileData.key,
    });
  });
  
  console.log("------- Encrypt Multiple Files with Different Keys -------");
  encryptedData.forEach((fileData, index) => {
    console.log("Encrypted File:", fileData.encryptedData[0].fileName);
    console.log("Time Key:", fileData.encryptedData[0].timeKey);
    console.log("Key Used:", filesToEncrypt[index].key);
    console.log("---");
  });
  
  // Decrypt the encrypted files using the corresponding keys
  const decryptedData = encryptedData.map((fileData, index) => {
    return temcrypt.decrypt({
      dataString: fileData.encryptedData[0].dataString,
      mainKey: filesToEncrypt[index].key,
    });
  });
  
  console.log("------- Decrypt Multiple Files with Different Keys -------");
  decryptedData.forEach((fileData, index) => {
    console.log("Decrypted File:", fileData.dataString);
    console.log("Creation Date:", fileData.creationDate);
    console.log("Last Decryption Date:", fileData.lastDecryptionDate);
    console.log("Key Used:", filesToEncrypt[index].key);
    console.log("---");
  });
