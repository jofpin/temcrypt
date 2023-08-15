let temcrypt;

try {
  // Try to import the installed version of temcrypt
  temcrypt = require('temcrypt');
} catch (error) {
  // If the library is not installed, use the local version
  temcrypt = require('./../../temcrypt');
}

const keys = ["key1", "key2", "key3"];
const file1Path = "data/test1.txt";
const file2Path = "data/test2.txt";
const file3Path = "data/test3.txt";

// Encrypt multiple files with different keys
const encryptedData = temcrypt.encrypt({
  dataFiles: [file1Path, file2Path, file3Path],
  mainKey: keys,
  extraBytes: 16, // Optional: Add extra bytes to increase security
});

console.log("------- Encrypt Multiple Files with Different Keys -------");
encryptedData.encryptedData.forEach((data, index) => {
  console.log(`Encrypted File ${index + 1}:`, data.fileName);
  console.log(`Main Key ${index + 1}:`, data.mainKey);
  console.log(`Time Key ${index + 1}:`, data.timeKey);
  console.log("---");
});
console.log("Total Files:", encryptedData.totalFiles);
console.log("Total File Size:", encryptedData.fileSize);
