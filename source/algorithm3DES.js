/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/
import crypto from 'crypto';

const algorithm3DES = {
  sharedKey: 'Cc7rdxs01lwHzfr2',

  /**
   * Function that encrypts the string received in the parameter using 3DES encryption
   * @param {string} text - The string to be encrypted
   * @returns {string} - An encrypted string
   */

  encrypt(plainText) {
    try {
      const bufferedKey = Buffer.from(this.sharedKey, 'utf16le');

      const key = crypto.createHash('md5').update(bufferedKey).digest();
      const newKey = Buffer.concat([key, key.slice(0, 8)]);
      const IV = Buffer.alloc(8, '\0');

      const cipher = crypto
        .createCipheriv('des-ede3-cbc', newKey, IV)
        .setAutoPadding(true);
      return (
        cipher.update(plainText, 'utf8', 'base64') + cipher.final('base64')
      );
    } catch (err) {
      return err;
    }
  },

  /**
   * Function that decrypts an encrypted string with the 3DES method
   * @param {string} hashString - 3DES encrypted string that will be decrypted
   * @returns {string} - The decrypted string
   */
  decrypt(cipherText) {
    try {
      const bufferedKey = Buffer.from(this.sharedKey, 'utf16le');

      const key = crypto.createHash('md5').update(bufferedKey).digest();
      const newKey = Buffer.concat([key, key.slice(0, 8)]);
      const IV = Buffer.alloc(8, '\0');
      const cipher = crypto
        .createDecipheriv('des-ede3-cbc', newKey, IV)
        .setAutoPadding(true);
      return cipher.update(cipherText, 'base64', 'utf8') + cipher.final('utf8');
    } catch (err) {
      return err;
    }
  },
};

export default algorithm3DES;
