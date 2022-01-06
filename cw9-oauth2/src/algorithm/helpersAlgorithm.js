/* eslint-disable import/extensions */
/* eslint-disable no-console */
import algorithmAES from './algorithmAES.js';
import algorithm3DES from './algorithm3DES.js';
import algorithmDES from './algorithmDES.js';
import algorithmRSA from './algorithmRSA.js';

const algorithmArray = [algorithmAES, algorithm3DES, algorithmDES, algorithmRSA];

/**
 * Function  encrypted string with the chosen algorithm
 * @param {string} text - Entered text to be encrypted
 * @param {number} algorithmNumber - The number of the selected encryption algorithm
 * @returns {string} - The decrypted string
 */
const encryptFunction = (text, algorithmNumber) => {
  const encryptText = algorithmArray[algorithmNumber - 1].encrypt(text);
  return encryptText;
};

/**
 * Function decrypted string with the chosen algorithm
 * @param {string} text - Entered text to be decrypted
 * @param {number} algorithmNumber - The number of the selected encryption algorithm
 * @returns {number} - The decrypted string
 */
const decryptFunction = (text, algorithmNumber) => {
  const decryptText = algorithmArray[algorithmNumber - 1].decrypt(text);
  return decryptText;
};

export default { encryptFunction, decryptFunction };
