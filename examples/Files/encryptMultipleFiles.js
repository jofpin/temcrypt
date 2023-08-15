let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const key = "yourSecretKey";
const file1Path = "data/test1.txt";
const file2Path = "data/test2.txt";

// Encrypt multiple files using the provided mainKey
const encryptedData = temcrypt.encrypt({
  dataFiles: [file1Path, file2Path],
  mainKey: key,
  extraBytes: 32 // Optional: Add extra bytes to increase security
});

// Return of results
console.log("------- Encrypt Multiple Files -------");
encryptedData.encryptedData.forEach((data, index) => {
  console.log(`Encrypted File ${index + 1}:`, data.fileName);
  console.log(`Main Key ${index + 1}:`, data.mainKey);
  console.log(`Time Key ${index + 1}:`, data.timeKey);
  console.log('---');
});


console.log("Total Files:", encryptedData.totalFiles);
console.log("Total File Size:", encryptedData.fileSize);
