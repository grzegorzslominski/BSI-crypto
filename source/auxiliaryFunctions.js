/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/

import fs from 'fs';

/**
 * Function for retrieving text data from a file with a given path
 * @param {string} filePath - Path relative to the file from which we want to download the data
 * @returns {string} - Data from the file
 */

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Function for saving the obtained value in the parameter to the file located in the path given in the parameter. The function overwrites the previous value in the file.
 * @param {string} filePath - The path to the file where the text will be saved
 * @param {string} text - The text that will be saved in the file
 */

function openFile(filePath, text) {
  fs.writeFile(filePath, JSON.stringify(text), (err) => {
    if (err) console.log(err);
    else {
      console.log('File has been encoded');
    }
  });
}

/**
 * A function that randomizes a number from a given range
 * @param {number} min - The minimum value of the range
 * @param {number} max - Maximum Range Value
 * @returns {number} - A random number within the given range
 */

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * A function that randomizes 10 random numbers from the range given in the parameters
 * @param {number} min - The minimum value of the range
 * @param {number} max - Maximum Range Value
 * @returns {object} - An array with ten random numbers from a given range
 */

function getTenNonRepeatingRandomNumbers(min, max) {
  const arr = [];
  while (arr.length < 10) {
    const number = getRandomIntInclusive(min, max);
    if (!arr.includes(number)) arr.push(number);
  }
  return arr;
}

export {
  readFile,
  openFile,
  getRandomIntInclusive,
  getTenNonRepeatingRandomNumbers,
};
