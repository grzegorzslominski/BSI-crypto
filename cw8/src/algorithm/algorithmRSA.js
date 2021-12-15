/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/

import NodeRSA from 'node-rsa';

const algorithmRSA = {
  key: new NodeRSA({ b: 512 }),

  /**
   * Function that encrypts the string received in the parameter using RSA encryption
   * @param {string} text - The string to be encrypted
   * @returns {string} - An encrypted string
   */

  encrypt(text) {
    try {
      return this.key.encrypt(text, 'base64');
    } catch (err) {
      return err;
    }
  },

  /**
   * Function that decrypts an encrypted string with the RSA method
   * @param {string} encryptedText - RSA encrypted string that will be decrypted
   * @returns {string} - The decrypted string
   */
  decrypt(encryptedText) {
    try {
      return this.key.decrypt(encryptedText, 'utf8');
    } catch (err) {
      return err;
    }
  }
};

export default algorithmRSA;
