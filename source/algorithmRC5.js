/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/

import RC5 from 'rc5';

const algorithmRC5 = {
  rc5: new RC5('tajnyKlucz', 32, 12),

  /**
   * Function that encrypts the string received in the parameter using RC5 encryption
   * @param {string} text - The string to be encrypted
   * @returns {string} - An encrypted string
   */

  encrypt(text) {
    return this.rc5.encrypt(text).toString();
  },

  /**
   * Function that decrypts an encrypted string with the RC5 method
   * @param {string} hashString - RC5 encrypted string that will be decrypted
   * @returns {string} - The decrypted string
   */
  decrypt(hashString) {
    return this.rc5.decrypt(hashString).toString();
  },
};

export default algorithmRC5;
