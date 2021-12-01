/* eslint-disable no-console */
/* eslint-disable import/extensions */
/*
Author:
-Grzegorz Słomiński
-Mikolaj Saja
*/

import * as readline from 'readline';
import {
  probabilitySelectingPerson,
  numberEmployeesAndProfitableAnnualFee,
  numberPartsToReplace,
  probabilityOfBeingShotDown,
  probabilityOfSelectTwoChildren,
} from './functions.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const mapOfFunctions = new Map();
mapOfFunctions.set(1, probabilitySelectingPerson);
mapOfFunctions.set(2, numberEmployeesAndProfitableAnnualFee);
mapOfFunctions.set(3, numberPartsToReplace);
mapOfFunctions.set(4, probabilityOfBeingShotDown);
mapOfFunctions.set(5, probabilityOfSelectTwoChildren);

const get = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let input;
      rl.on('line', (line) => {
        input = line.match(/\d+\.*\d*/g);
        if (input === null) {
          resolve();
        } else {
          resolve(input.map((e) => parseFloat(e)));
        }
      });
    }, 400);
  });
};

async function startProgram() {
  console.log(
    'Select the function you want to use: \n 1: Calculate probability to select one person with two \n 2: Calculate number of needed employers and anual fee for one client \n 3: Calculate number of parts that should be replaced \n 4: Calculate probability shootings down the plane in a series of shots \n 5: Probability of choosing two children from a group of people'
  );
  const selectedFunctions = await get();
  if (selectedFunctions[0] > 0 && selectedFunctions[0] < 6) {
    console.log('Enter the necessary parameters');
    const enteredParameters = await get();
    rl.close();
    try {
      const choiceFunction = mapOfFunctions.get(selectedFunctions[0]);
      console.log(choiceFunction(...enteredParameters));
    } catch (error) {
      console.log(`Invalid value for parameter \n ${error}`);
    }
  } else {
    console.log('Invalid value. The correct function has not been selected');
    rl.close();
  }
}

startProgram();
// console.log(mapOfFunctions.get(2)(200, 600, 1, 2, 200, 20));
