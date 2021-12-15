/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/

import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithmAES = {
  algorithm: 'aes-256-ctr',
  secretKey: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr2',
  iv: randomBytes(16),

  /**
   * Function that encrypts the string received in the parameter using AES encryption
   * @param {string} text - The string to be encrypted
   * @returns {string} - An encrypted string
   */
  encrypt(text) {
    const cipher = createCipheriv(this.algorithm, this.secretKey, this.iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return JSON.stringify({ iv: this.iv.toString('hex'), content: encrypted.toString('hex') });
  },

  /**
   * Function that decrypts an encrypted string with the AES method
   * @param {string} hashString - AES encrypted string that will be decrypted
   * @returns {string} - The decrypted string
   */
  decrypt(hashString) {
    const hashObject = JSON.parse(hashString);
    const decipher = createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(hashObject.iv, 'hex')
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hashObject.content, 'hex')),
      decipher.final()
    ]);

    return decrpyted.toString();
  }
};

export default algorithmAES;
