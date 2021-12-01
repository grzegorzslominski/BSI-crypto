/* eslint-disable import/extensions */
/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/
import {
  readFile,
  openFile,
  getRandomIntInclusive,
  getTenNonRepeatingRandomNumbers,
} from './auxiliaryFunctions.js';
import algorithmAES from './algorithmAES.js';
import algorithmRC5 from './algorithmRC5.js';
import algorithm3DES from './algorithm3DES.js';

function mainFunction() {
  const arrayOfFilesNumber = getTenNonRepeatingRandomNumbers(1, 20);

  arrayOfFilesNumber.map((number) => {
    const a = readFile(`../textFiles/text${number}.txt`);
    const drawFunction = getRandomIntInclusive(0, 2);
    let encryptedText = '';
    if (drawFunction === 0) encryptedText = algorithmAES.encrypt(a);
    if (drawFunction === 1) encryptedText = algorithmRC5.encrypt(a);
    if (drawFunction === 2) encryptedText = algorithm3DES.encrypt(a);
    openFile(`../textFiles/text${number}.txt`, encryptedText);
    return '10 files encrypted';
  });
}
mainFunction();
