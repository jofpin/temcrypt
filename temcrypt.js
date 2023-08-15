/**
 * temcrypt.js
 * Evolutionary encryption framework based on scalable complexity over time.
 *
 * @author Jose Pino
 * @version 1.0.0
 * @license MIT
 *
 * Find the project on GitHub:
 * https://github.com/jofpin/temcrypt
 *
 * ===============================
 * Copyright (c) 2023 by Jose Pino
 * https://x.com/jofpin
 * ===============================
 *
 * Released on: August 15, 2023
 * Last update: August 15, 2023
 *
 */
const temcrypt = (() => {
    const main = {
        core: {
            credits: {
                AUTHOR: "Jose Pino",
                VERSION: "1.0.0"
            },
            date: {
                START: new Date("August 15, 2023 00:00:00"),
                CURRENT: new Date(),
                LAST_UPDATE: new Date("August 15, 2023")
            },
            time: {
                DIGIT_UPGRADE_YEARS: 1.8, // Increases one digit every 18 months
                HOUR_BOOST_PER_MONTH: 6 // Increase 1 hour every 6 months
            },
            PREFIX_STRING: "\x54\x33\x4D",
            SUFFIX_EXTENSION: "\x2e\x74\x72\x79\x70\x74",
            MINIMUM_BYTE_SIZE: 859,
            IMPORTANT_ERRORS: {
                DECRYPTION_EXCEEDED: {
                    code: 420,
                    message: "Decryption time limit exceeded",
                },
                DECRYPTION_FAILED: {
                    code: 444,
                    message: "Decryption failed",
                },
                NO_DATA: {
                    code: 777,
                    message: "No data provided",
                },
                NO_TEM: {
                    code: 859,
                    message: "The provided string is not a valid temcrypt encrypted string"
                }
            }
        },
        /**
         * nodeOrBrowser: Determines the execution mode of the temcrypt lib, whether it is running in Node.js or a Browser.
         */
        nodeOrBrowser: function() {
            const isNode = typeof window === "undefined";
            let CryptoJS, fs;

            function checkDependencies(dependency) {
                try {
                    require("child_process").execSync(`npm -v`);
                } catch (error) {
                    console.error("npm is not installed. You must install it before running this script.");
                    throw error;
                }

                try {
                    console.log("\n")
                    console.log("TEMCRYPT: SELF INSTALLATION OF DEPENDENCIES");
                    console.log("----------------");
                    console.log(`> Installing TEM dependencies: ${dependency}...`);
                    console.log("--");
                    require("child_process").execSync(`npm install ${dependency}`);
                    console.log(`> ${dependency} installed.`);
                    console.log("----------------");
                    console.log("| Now you can successfully use TEM!");
                    console.log("----------------");
                } catch (error) {
                    console.error(`Failed to install ${dependency}. Please install it manually by running: npm install ${dependency}`);
                    throw error;
                }
            }

            if (isNode) {
                try {
                    CryptoJS = require("crypto-js");
                } catch (error) {
                    checkDependencies("crypto-js");
                    CryptoJS = require("crypto-js");
                }

                try {
                    fs = require("fs");
                } catch (error) {
                    fs = null;
                }
            } else {
                if (!window.CryptoJS) {
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js", false);
                    xhr.send(null);
                    if (xhr.status === 200) {
                        const script = document.createElement("script");
                        script.text = xhr.responseText;
                        document.head.appendChild(script);
                        CryptoJS = window.CryptoJS;
                    } else {
                        throw new Error("Could not load CryptoJS");
                    }
                } else {
                    CryptoJS = window.CryptoJS;
                }
                fs = null;
            }

            return { mode: isNode ? "NODE" : "BROWSER", CryptoJS, fs };
        },
        credits: function() {
            console.log(
                `\n` +
                `temcrypt v${this.core.credits.VERSION} is being used!\n` +
                `---\n` +
                `> Author: ${this.core.credits.AUTHOR}\n` +
                `> Release Date: ${this.core.date.START.toLocaleDateString()}\n` +
                `> Last Update: ${this.core.date.LAST_UPDATE.toLocaleDateString()}\n` +
                `--------------------------\n` +
                `- Base Time: ${this.baseTime().toString()}\n` +
                `--------------------------\n` +
                `- Execution Mode: ${this.nodeOrBrowser().mode}\n` +
                `---` +
                `\n`
            );
        },
        /**
         * baseTime: Returns information about the time base used in the temcrypt library. Temcrypt has its own scalable time setting.
         */
        baseTime: function() {
            let now = new Date();
            let compared = now - this.core.date.START;
            let hours = Math.floor(compared / (1000 * 60 * 60) % 24);
            let minutes = Math.floor(compared / (1000 * 60) % 60);
            let seconds = Math.floor(compared / 1000 % 60);
            let monthsElapsed = now.getMonth() - this.core.date.START.getMonth() + (12 * (now.getFullYear() - this.core.date.START.getFullYear()));

            hours += Math.floor(monthsElapsed / this.core.time.HOUR_BOOST_PER_MONTH);

            return {
                hours: ("0" + hours).slice(-2),
                minutes: ("0" + minutes).slice(-2),
                seconds: ("0" + seconds).slice(-2),
                toString: function() {
                    return this.hours + ":" + this.minutes + ":" + this.seconds;
                }
            }
        },
        /**
         * helper: is a function for cryptographic and data manipulation operations (is an important helper function in temcrypt).
         */
        helper: function(str) {
            const sha256 = function(key) {
                return CryptoJS.SHA256(key).toString();
            };

            const enc256 = function(key) {
                return CryptoJS.AES.encrypt(str, key).toString();
            };

            const dec256 = function(key) {
                let decrypted = CryptoJS.AES.decrypt(str, key);
                let decryptStr = decrypted.toString(CryptoJS.enc.Utf8);
                return decryptStr;
            };

            const splitKey = function(key) {
                const one = sha256(key.substring(0, key.length / 2));
                const two = sha256(key.substring(key.length / 2));

                return { one, two }
            };

            const readerFile = function(namepath) {
                const fileValues = fs.readFileSync(namepath);
                return fileValues.toString("base64");
            };

            const writerFile = function(namepath, dataFile) {
                const fileValues = Buffer.from(dataFile, "base64");
                fs.writeFileSync(namepath, fileValues);
            };

            const outputFilename = function(inputFile, suffixExtension) {
                let outputFile = inputFile.replace(suffixExtension, "");
                const fileExtension = outputFile.includes(".") ? outputFile.slice(outputFile.lastIndexOf(".")) : "";
                const fileName = outputFile.slice(0, outputFile.lastIndexOf(".") !== -1 ? outputFile.lastIndexOf(".") : outputFile.length);
                const regex = /\((\d+)\)$/;

                let counter = 1;
                let newFileName = fileName;

                if (regex.test(fileName)) {
                    const match = fileName.match(regex);
                    counter = parseInt(match[1]);
                    newFileName = fileName.replace(regex, '');
                }

                outputFile = `${newFileName} (${counter})${fileExtension}`;

                while (fs.existsSync(outputFile)) {
                    counter++;
                    outputFile = `${newFileName} (${counter})${fileExtension}`;
                }

                return outputFile;
            }

            const calculateBytes = function(bytes) {
                const units = ["Bytes", "KB", "MB", "GB"];
                const kbytes = 1024;

                if (bytes === 0) {
                    return "0 Bytes";
                }

                const index = Math.floor(Math.log(bytes) / Math.log(kbytes));
                const convertBytes = bytes / Math.pow(kbytes, index);
                const formatBytes = convertBytes % 1 === 0 ? convertBytes.toFixed(0) : convertBytes.toFixed(2);

                return `${formatBytes} ${units[index]}`;
            };

            return { sha256, enc256, dec256, splitKey, readerFile, writerFile, outputFilename, calculateBytes }

        },
        shuffle: function(value) {
            if (!Array.isArray(value) && typeof value !== "string") {
                throw new Error("The value must be a array or an string");
            }
            return Array.isArray(value) ? value.sort(() => Math.random() - 0.5).join("") : value.split("").sort(() => Math.random() - 0.5).join("");
        },
        shadowToken: function() {
            const hash = this.helper().sha256(CryptoJS.lib.WordArray.random(256));
            const formedHash = this.shuffle(hash);
            return formedHash;
        },
        createKey: function(prefix, key, saltIncrease) {
            let timeKey = key + this.baseTime().hours + this.baseTime().minutes;
            let composition = [prefix, timeKey, saltIncrease];
            let noRepeat = new Set();
            let randomPosition = composition.filter(elem => {
                if (noRepeat.has(elem)) {
                    return false;
                } else {
                    noRepeat.add(elem);
                    return true;
                }
            });
            return this.shuffle(randomPosition);
        },
        hexGenerator: function(length) {
            const charactersHex = "0123456789abcdef";
            let value = "";
            for (let i = 0; i < length; i++) {
                value += charactersHex.charAt(Math.floor(Math.random() * charactersHex.length));
            }
            return value;
        },
        byteLength: function(string) {
            if (this.nodeOrBrowser().mode === "BROWSER") {
                return new Blob([string]).size;
            } else {
                return Buffer.byteLength(string, "utf-8");
            }
        },
        increaseDigit: function() {
            let addDigit = 1 + Math.floor((this.core.date.CURRENT.getFullYear() - this.core.date.START.getFullYear()) / this.core.time.DIGIT_UPGRADE_YEARS);
            return {
                value: Math.pow(10, addDigit),
                saltIncrease: Math.floor(Math.random() * Math.pow(10, addDigit)).toString()
            };
        },
        /**
         * multiLayer: Generates a multi-layer encryption by applying multiple encryption rounds to the provided data.
         */
        multiLayer: function(data, mainKeyComposition) {
            // The first encryption layer using the first half of the key composition.
            const encryptionLayerOne = this.helper(JSON.stringify(data)).enc256(this.helper().splitKey(mainKeyComposition).one);

            // The second encryption layer using the second half of the key composition.
            const encryptionLayerTwo = this.helper(encryptionLayerOne).enc256(this.helper().splitKey(mainKeyComposition).two);

            // Reverses the characters of the second encryption layer and applies the setting the current seconds obtained from based on this.baseTime().seconds
            // Convert the encryptionLayerTwo to a UTF-8 encoded string and then convert it to Hexadecimal format.
            const encryptionLayerTwoWrapper = CryptoJS.enc.Utf8.parse(encryptionLayerTwo).toString(CryptoJS.enc.Hex);
            // Reverse the characters of the encryptionLayerTwoWrapper.
            const invertedWrapper = encryptionLayerTwoWrapper.split("").reverse().join("");
            // Get a portion of the invertedWrapper to wrap the encrypted data, based on the number of seconds obtained from this.baseTime().seconds
            const wrapStart = invertedWrapper.substring(0, this.baseTime().seconds);
            const wrapEnd = invertedWrapper.substring(invertedWrapper.length - this.baseTime().seconds);
            // Concatenate the wrapped portions with the middle part of the invertedWrapper to form the final encrypted data.
            const formedLayers = wrapEnd + invertedWrapper.substring(this.baseTime().seconds, invertedWrapper.length - this.baseTime().seconds) + wrapStart;

            return formedLayers;
        },
        _encryptableString: function(string, mainKey, extraBytes) {
            if (!string && !mainKey) {
                throw new Error("Both string and key are required");
            }
            if (!string) {
                throw new Error("string cannot be empty");
            }

            mainKey = mainKey || this.shadowToken();

            const shadowToken = this.shadowToken();
            const encryptedGhostLayer = this.helper(string).enc256(shadowToken + this.baseTime().minutes);
            const exposedSize = this.byteLength(string);
            const exposedSizeBytes = this.helper().calculateBytes(exposedSize);

            let extraBytesData = "";

            if (extraBytes) {
                if (typeof extraBytes !== "number") {
                    throw new Error("extraBytes must be a number");
                }
                extraBytesData = this.hexGenerator(extraBytes);
            }

            const data = {
                tem: {
                    string: encryptedGhostLayer,
                    token: shadowToken,
                    extraBytes: extraBytesData,
                    creationDate: this.core.date.CURRENT.toLocaleDateString(),
                    lastDecryptionDate: ""
                }
            }

            const mainKeyComposition = this.createKey(this.shuffle(this.core.PREFIX_STRING), mainKey, this.increaseDigit().saltIncrease);
            const outputMainKey = this.multiLayer(data, mainKeyComposition);
            const outputDataEncrypt = this.core.PREFIX_STRING + outputMainKey;
            const hashedData = this.helper().sha256(outputDataEncrypt);
            const encryptedSize = this.byteLength(outputDataEncrypt);
            const encryptedSizeBytes = this.helper().calculateBytes(encryptedSize);
            const percentageIncrease = ((encryptedSize - exposedSize) / exposedSize) * 100;

            return {
                hash: hashedData,
                mainKey: mainKey,
                timeKey: this.baseTime().hours + ":" + this.baseTime().minutes,
                dataString: outputDataEncrypt,
                dataSizes: {
                    exposed: exposedSizeBytes,
                    encrypted: encryptedSizeBytes,
                    percentageIncrease: percentageIncrease.toFixed(2) + "%"
                },
                extraBytes: extraBytesData
            }
        },
        _decryptableString: function(stringEncrypted, key) {
            if (!stringEncrypted || !key) {
                throw new Error("Both encrypted data and key are required");
            }

            let iterationCount = this.increaseDigit().value;
            let maxSteps = 60;

            for (let currentStep = 0; currentStep <= maxSteps; currentStep++) {
                for (let currentIteration = 0; currentIteration < iterationCount; currentIteration++) {
                    for (let encryptionRound = 0; encryptionRound <= maxSteps; encryptionRound++) {
                        for (let keyIndex = 0; keyIndex <= 6; keyIndex++) {

                            let mainKeyComposition = this.createKey(this.shuffle(this.core.PREFIX_STRING), key, currentIteration.toString());

                            let initialData = stringEncrypted.substring(this.core.PREFIX_STRING.length);
                            let wrapStart = initialData.substring(0, currentStep);
                            let wrapEnd = initialData.substring(initialData.length - currentStep);
                            let wrappedData = wrapEnd + initialData.substring(currentStep, initialData.length - currentStep) + wrapStart;
                            let reverseWrappedData = wrappedData.split("").reverse().join("");

                            const averageTime = (new Date() - this.core.date.CURRENT) / 1000;

                            if (averageTime > maxSteps || this.baseTime().seconds === "00") {
                                return {
                                    status: false,
                                    error_code: this.core.IMPORTANT_ERRORS.DECRYPTION_EXCEEDED.code,
                                    message: this.core.IMPORTANT_ERRORS.DECRYPTION_EXCEEDED.message
                                };
                            }

                            try {
                                let decryptionLayerOne = this.helper(CryptoJS.enc.Hex.parse(reverseWrappedData).toString(CryptoJS.enc.Utf8)).dec256(this.helper().splitKey(mainKeyComposition).two);
                                let decryptionLayerTwo = this.helper(decryptionLayerOne).dec256(this.helper().splitKey(mainKeyComposition).one);
                                let decryptedData = JSON.parse(decryptionLayerTwo);
                                let decryptedString = decryptedData.tem.string;
                                let tokenGhostWithMinutes = decryptedData.tem.token + this.baseTime().minutes;
                                let decryptedOutput = this.helper(decryptedString).dec256(tokenGhostWithMinutes);

                                decryptedData.tem.lastDecryptionDate = this.core.date.CURRENT.toDateString();

                                const updatedKeyComposition = this.createKey(this.shuffle(this.core.PREFIX_STRING), key, this.increaseDigit().saltIncrease);
                                const updatedMainKey = this.multiLayer(decryptedData, updatedKeyComposition);
                                const updatedEncryptedData = this.core.PREFIX_STRING + updatedMainKey;
                                const updatedHash = this.helper().sha256(updatedEncryptedData);

                                return {
                                    status: true,
                                    hash: updatedHash,
                                    dataString: decryptedOutput,
                                    updatedEncryptedData: updatedEncryptedData,
                                    creationDate: decryptedData.tem.creationDate,
                                    lastDecryptionDate: decryptedData.tem.lastDecryptionDate
                                };
                            } catch (error) {
                                continue;
                            }
                        }
                    }
                }
            }

            return {
                status: false,
                error_code: this.core.IMPORTANT_ERRORS.DECRYPTION_FAILED.code,
                message: this.core.IMPORTANT_ERRORS.DECRYPTION_FAILED.message
            };
        },
        _encryptableFiles: function(inputFiles, mainKeys, extraBytes) {
            if (this.nodeOrBrowser().mode === "BROWSER") {
                console.warn("WARNING: This property is only supported in NODE.js and not in the Browser");
                return;
            }

            if (typeof inputFiles === "string") {
                inputFiles = [inputFiles];
            }
            if (!Array.isArray(inputFiles)) {
                throw new Error("Must be an array or a string");
            }
            if (typeof mainKeys === "string") {
                mainKeys = Array(inputFiles.length).fill(mainKeys);
            }
            if (!Array.isArray(mainKeys)) {
                throw new Error("Must be an array or a string");
            }
            if (inputFiles.length !== mainKeys.length) {
                throw new Error("File(s) and mainKey(s) must have the same length");
            }

            const encryptedResults = inputFiles.map((inputFile, index) => {
                const fileContent = this.helper().readerFile(inputFile);
                const encryptedObj = this._encryptableString(fileContent, mainKeys[index], extraBytes);
                const outputFile = inputFile + this.core.SUFFIX_EXTENSION;

                this.nodeOrBrowser().fs.writeFileSync(outputFile, encryptedObj.dataString);

                return {
                    fileName: outputFile,
                    mainKey: mainKeys[index],
                    timeKey: encryptedObj.timeKey
                };
            });

            return {
                encryptedData: encryptedResults,
                totalFiles: encryptedResults.length
            };
        },
        _decryptableFiles: function(inputFiles, mainKeys) {
            if (this.nodeOrBrowser().mode === "BROWSER") {
                console.warn("WARNING: This property is only supported in NODE.js and not in the Browser");
                return;
            }

            if (typeof inputFiles === "string") {
                inputFiles = [inputFiles];
            }
            if (!Array.isArray(inputFiles)) {
                throw new Error("Must be an array or a string");
            }
            if (typeof mainKeys === "string") {
                mainKeys = Array(inputFiles.length).fill(mainKeys);
            }
            if (!Array.isArray(mainKeys)) {
                throw new Error("Must be an array or a string");
            }

            const decryptedFiles = [];
            const invalidFiles = [];

            for (let i = 0; i < inputFiles.length; i++) {
                const inputFile = inputFiles[i];
                const mainKey = mainKeys[i];
                const encryptedObj = this.nodeOrBrowser().fs.readFileSync(inputFile, "utf-8");
                const isValidFormat = encryptedObj.startsWith(this.core.PREFIX_STRING) || this.byteLength(encryptedObj) < this.core.MINIMUM_BYTE_SIZE

                if (!isValidFormat) {
                    invalidFiles.push({
                        fileName: inputFile,
                        message: `Invalid temcrypt file: ${inputFile}`
                    });
                    continue;
                }

                try {
                    const decryptedObj = this._decryptableString(encryptedObj, mainKey);
                    const outputFile = this.helper().outputFilename(inputFile, this.core.SUFFIX_EXTENSION);

                    this.helper().writerFile(outputFile, decryptedObj.dataString);

                    this.nodeOrBrowser().fs.writeFileSync(inputFile, decryptedObj.updatedEncryptedData, "utf-8");

                    const decodedString = Buffer.from(decryptedObj.dataString, "base64").toString("utf-8");

                    decryptedFiles.push({
                        fileName: outputFile,
                        creationDate: decryptedObj.creationDate,
                        lastDecryptionDate: decryptedObj.lastDecryptionDate,
                        dataString: decodedString
                    });
                } catch {
                    invalidFiles.push({
                        fileName: inputFile,
                        message: "Error during decryption, the mainKey or timeKey may be incorrect"
                    });
                    continue;
                }
            }

            return {
                status: decryptedFiles.length > 0,
                message: decryptedFiles.length > 0 ? "Successfully decrypted the valid temcrypt files." : "No valid temcrypt files found.",
                decryptedData: decryptedFiles,
                totalFiles: decryptedFiles.length,
                invalidFiles: invalidFiles
            };
        },
        /**
         * Encrypts data using temcrypt encryption.
         *
         *  @param {Object} params - The parameters for the encryption operation.
         *  @param {string} params.dataString - The string data to encrypt.
         *  @param {string} params.dataFiles - The file path to encrypt.
         *  @param {string} params.mainKey - The main key (private) for encryption.
         *  @param {number} [params.extraBytes=0] - Additional random bytes to add to the encryption.
         *  @returns {Object} - The encryption result.
         *   - If a data string is provided:
         *     - {string} hash - The unique hash generated for the encrypted data.
         *     - {string} mainKey - The main key (private) used for encryption.
         *     - {string} timeKey - The time key (private) of the encryption.
         *     - {string} dataString - The encrypted string.
         *     - {string} extraBytes - The extra bytes used for encryption.
         *   - If a data file is provided:
         *     - {string} hash - The unique hash generated for the encrypted data.
         *     - {string} mainKey - The main key used for encryption.
         *     - {string} timeKey - The time key of the encryption.
         *     - {string} dataFiles - The file path of the encrypted file.
         *     - {string} extraBytes - The extra bytes used for encryption.
         * @example
         * // Encrypt a data string
         * const resultString = temcrypt.encrypt({
         *   dataString: "data to encrypt",
         *   mainKey: "your secret key"
         * });
         *
         * // Encrypt a data file
         * const resultFile = temcrypt.encrypt({
         *   dataFiles: "test.txt",
         *   mainKey: "your secret key",
         *   extraBytes: 128 // optional
         * });
         *
         * @throws {Error} - If the required parameters are not provided or the data is invalid.
         */
        encrypt: function(params) {
            if (!params) {
                throw new Error("Provides the parameters");
            }

            if (!params.dataString && !params.dataFiles) {
                return {
                    status: false,
                    error_code: this.core.IMPORTANT_ERRORS.NO_DATA.code,
                    message: this.core.IMPORTANT_ERRORS.NO_DATA.message
                };
            }

            const extraBytes = params.extraBytes || 0;

            if (params.dataString) {
                return this._encryptableString(params.dataString, params.mainKey, extraBytes);
            } else if (params.dataFiles) {
                return this._encryptableFiles(params.dataFiles, params.mainKey, extraBytes);
            } else {
                throw new Error("Unexpected error: dataString or dataFiles must be provided");
            }
        },
        /**
         * Decrypts temcrypt encrypted data.
         *
         *  @param {Object} params - The parameters for the decryption operation.
         *  @param {string} params.dataString - The encrypted string to decrypt.
         *  @param {string} params.dataFiles - The file file to decrypt.
         *  @param {string} params.mainKey - The main key for decryption.
         *  @returns {{ status: ("true"|"false") }} - The decryption result.
         *   - If a data string is provided:
         *     - {boolean} status - The decryption status.
         *     - {string} message - The result message.
         *   - If a data file is provided:
         *     - {boolean} status - The decryption status.
         *     - {string} message - The result message.
         * @example
         * // Decrypt a data string
         * const resultString = temcrypt.decrypt({
         *   dataString: "encrypted string",
         *   mainKey: "your secret key"
         * });
         *
         * // Decrypt a data file
         * const resultFile = temcrypt.decrypt({
         *   dataFiles: "test.txt.trypt",
         *   mainKey: "your secret key"
         * });
         *
         * @throws {Error} - If the required parameters are not provided or the data is invalid.
         */
        decrypt: function(params) {
            if (!params) {
                throw new Error("Provides the parameters");
            }

            if (!params.dataString && !params.dataFiles) {
                return {
                    status: false,
                    error_code: this.core.IMPORTANT_ERRORS.NO_DATA.code,
                    message: this.core.IMPORTANT_ERRORS.NO_DATA.message
                };
            }

            if (params.dataString) {

                const isValidFormat = params.dataString.startsWith(this.core.PREFIX_STRING) || this.byteLength(params.dataString) < this.core.MINIMUM_BYTE_SIZE

                if (!isValidFormat) {
                    return {
                        status: false,
                        error_code: this.core.IMPORTANT_ERRORS.NO_TEM.code,
                        message: this.core.IMPORTANT_ERRORS.NO_TEM.message
                    };
                }

                return this._decryptableString(params.dataString, params.mainKey);
            }

            if (params.dataFiles) {
                return this._decryptableFiles(params.dataFiles, params.mainKey);
            }

            throw new Error("Unexpected error: dataString or dataFiles must be provided");
        },
        /**
         * Provides additional utilities (utils) for working with temcrypt encryption.
         *   @param {Object} params - The parameters for the utility operation.
         *   @param {Object} [params.changeKey] - Parameters for changing the main key.
         *   @param {string} params.changeKey.dataFiles - The file path to change the main key.
         *   @param {string} params.changeKey.dataString - The string to change the main key.
         *   @param {string} params.changeKey.mainKey - The current main key.
         *   @param {string} params.changeKey.newKey - The new main key.
         *   @param {Object} [params.check] - Parameters for verifying encrypted files or strings.
         *   @param {string} params.check.dataFiles - The file path to verify.
         *   @param {string} params.check.dataString - The string to verify.
         *   @param {Object} [params.verify] - Parameters for verifying a specific hash.
         *   @param {string} params.verify.hash - The specific hash to verify.
         *   @param {string} params.verify.dataFiles - The file path to verify the hash.
         *   @param {string} params.verify.dataString - The string to verify the hash.
         *   @returns {Object} - The utility result.
         *   - If changing the key:
         *     - {boolean} status - The status of the key change.
         *     - {string} message - The result message.
         *   - If checking encrypted files or strings:
         *     - {boolean} status - The verification status.
         *     - {string} message - The result message.
         *     - {string} [fileSize] - The size of the verified file (for file verification only).
         *     - {string} [stringSize] - The size of the verified string (for string verification only).
         *   - If verifying a specific hash:
         *     - {boolean} status - The verification status.
         *     - {string} message - The result message.
         * @example
         * // Change the main key of an encrypted file
         * const fileKeyChange = temcrypt.utils({
         *   changeKey: {
         *     dataFiles: "test.txt.trypt",
         *     mainKey: "currentMainKey",
         *     newKey: "newMainKey"
         *   }
         * });
         *
         * // Change the main key of an encrypted string
         * const stringKeyChange = temcrypt.utils({
         *   changeKey: {
         *     dataString: "encryptedString",
         *     mainKey: "currentMainKey",
         *     newKey: "newMainKey"
         *   }
         * });
         *
         * // Verify the validity of an encrypted file
         * const fileVerification = temcrypt.utils({
         *   check: {
         *     dataFiles: "test.txt"
         *   }
         * });
         *
         * // It is used to verify if the Hash is compatible with the encrypted string
         * const stringVerification = temcrypt.utils({
         *   check: {
         *     dataString: "encryptedString"
         *   }
         * });
         *
         * // Verify a specific Hash of a file
         * const fileHashVerification = temcrypt.utils({
         *   verify: {
         *     hash: "9933d77e080b0db3466f6645be3e196f27adfdae41faf998489a9e",
         *     dataFiles: "test.txt.trypt"
         *   }
         * });
         *
         * // Verify a specific Hash of a string
         * const stringHashVerification = temcrypt.utils({
         *   verify: {
         *     hash: "9933d77e080b0db3466f6645be3e196f27adfdae41faf998489a9e",
         *     dataString: "encryptedString"
         *   }
         * });
         *
         * @throws {Error} - If the required parameters are not provided.
         */
        utils: function(params) {
            if (!params) {
                throw new Error("Provide the parameters");
            }

            if (params.changeKey) {
                const { dataFiles, dataString, mainKey, newKey } = params.changeKey;

                if (dataFiles) {
                    const encryptedObj = this.nodeOrBrowser().fs.readFileSync(dataFiles, "utf-8");
                    const decryptedObj = this._decryptableString(encryptedObj, mainKey);

                    if (decryptedObj.status) {
                        const newEncryptedObj = this._encryptableString(decryptedObj.dataString, newKey);
                        this.nodeOrBrowser().fs.writeFileSync(dataFiles, newEncryptedObj.dataString, "utf-8");

                        return {
                            status: true,
                            message: "mainKey updated successfully for the file."
                        };
                    } else {
                        return {
                            status: false,
                            message: "Error updating mainKey for the file."
                        };
                    }
                } else if (dataString) {
                    const decryptedObj = this._decryptableString(dataString, mainKey);

                    if (decryptedObj.status) {
                        const newEncryptedObj = this._encryptableString(decryptedObj.dataString, newKey);

                        return {
                            status: true,
                            message: "mainKey updated successfully for the string.",
                            newEncryptedString: newEncryptedObj.dataString
                        };
                    } else {
                        return {
                            status: false,
                            message: "Error updating mainKey for the string."
                        };
                    }
                } else {
                    throw new Error("dataFiles or dataString must be provided");
                }
            } else if (params.check) {
                const { dataFiles, dataString } = params.check;

                if (dataFiles) {
                    const encryptedObj = this.nodeOrBrowser().fs.readFileSync(dataFiles, "utf-8");
                    const isValidTemFile = encryptedObj.startsWith(this.core.PREFIX_STRING) && this.byteLength(encryptedObj) >= this.core.MINIMUM_BYTE_SIZE;
                    const fileSize = isValidTemFile ? this.nodeOrBrowser().fs.statSync(dataFiles).size : 0;
                    const formattedSize = this.helper().calculateBytes(fileSize);

                    return {
                        status: isValidTemFile,
                        message: isValidTemFile ? "Is a valid temcrypt file." : "Invalid temcrypt file.",
                        fileSize: formattedSize
                    };
                } else if (dataString) {
                    const isValidTemString = dataString.startsWith(this.core.PREFIX_STRING) && this.byteLength(dataString) >= this.core.MINIMUM_BYTE_SIZE;
                    const stringSize = isValidTemString ? dataString.length : 0;
                    const formattedSize = this.helper().calculateBytes(stringSize);

                    return {
                        status: isValidTemString,
                        message: isValidTemString ? "Is a valid temcrypt string." : "Invalid temcrypt string.",
                        stringSize: formattedSize
                    };
                } else {
                    throw new Error("dataFiles or dataString must be provided");
                }
            } else if (params.verify) {
                const { hash, dataFiles, dataString } = params.verify;

                if (dataFiles) {
                    const encryptedObj = this.nodeOrBrowser().fs.readFileSync(dataFiles, "utf-8");
                    const isValidHash = this.helper().sha256(encryptedObj) === hash;

                    return {
                        status: isValidHash,
                        message: isValidHash ? "Valid Hash for the file (temcrypt)" : "Invalid Hash for the file (temcrypt)"
                    };
                } else if (dataString) {
                    const isValidHash = this.helper().sha256(dataString) === hash;

                    return {
                        status: isValidHash,
                        message: isValidHash ? "Valid Hash for the encrypted string (temcrypt)" : "Invalid Hash for the encrypted string (temcrypt)"
                    };
                } else {
                    throw new Error("dataFiles or dataString must be provided");
                }
            }
        }
    };

    // Dependencies deployment
    const { CryptoJS, fs } = main.nodeOrBrowser();

    // Display of credits, temcrypt basetime and execution mode (Node.js or Browser)
    main.credits();

    // Library export in node or in the browser
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = main;
    } else {
        window.temcrypt = main;
    }

    // General execution of the library
    return main;

})();
