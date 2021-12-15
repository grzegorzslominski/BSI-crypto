/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/

import CryptoJs from 'crypto-js';

const algorithm3DES = {
  secretKey: 'vOVH6sdsakkjjkjkjkjkjkjddhggj111112',

  /**
   * Function that encrypts the string received in the parameter using 3DES encryption
   * @param {string} text - The string to be encrypted
   * @returns {string} - An encrypted string
   */

  encrypt(text) {
    try {
      const encryptedText = CryptoJs.TripleDES.encrypt(
        JSON.stringify(text),
        this.secretKey
      ).toString();
      return encryptedText;
    } catch (err) {
      return err;
    }
  },

  /**
   * Function that decrypts an encrypted string with the 3DES method
   * @param {string} hashString - 3DES encrypted string that will be decrypted
   * @returns {string} - The decrypted string
   */
  decrypt(text) {
    try {
      const bytes = CryptoJs.TripleDES.decrypt(text, this.secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
      return decryptedData;
    } catch (err) {
      return err;
    }
  }
};

export default algorithm3DES;
