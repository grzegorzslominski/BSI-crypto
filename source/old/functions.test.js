/* eslint-disable import/extensions */
import {
  probabilitySelectingPerson,
  numberEmployeesAndProfitableAnnualFee,
  numberPartsToReplace,
  probabilityOfBeingShotDown,
  probabilityOfSelectTwoChildren,
} from './functions.js';

describe('Function - probabilitySelectingPerson', () => {
  test('standard variables', () => {
    expect(probabilitySelectingPerson(1, 2, 1, 2)).toBe(
      'The probability of choosing one of the given persons is 1 / 2 in fraction and 0.5000 decimal'
    );
  });
  test('numerator greater than the denominator', () => {
    expect(probabilitySelectingPerson(2, 1, 2, 1)).toBe(
      'Invalid value, denominator cannot be greater than numerator.'
    );
  });
});

describe('Function - numberEmployeesAndProfitableAnnualFee', () => {
  test('standard variables', () => {
    expect(numberEmployeesAndProfitableAnnualFee(10, 600, 1, 2, 200, 20)).toBe(
      'The number of employees needed is 6 the annual amount paid by clients should be 1252.32.'
    );
  });
  test('Possible number of hours per week exceeded', () => {
    expect(numberEmployeesAndProfitableAnnualFee(169, 600, 1, 2, 200, 20)).toBe(
      'Inavalid value, possible number of hours per week exceeded.'
    );
  });
  test('Extreme values of parameters', () => {
    expect(numberEmployeesAndProfitableAnnualFee(168, 1, 1, 1, 1, 0)).toBe(
      'The number of employees needed is 1 the annual amount paid by clients should be 87.66.'
    );
  });
});

describe('Function - numberPartsToReplace', () => {
  test('standard variables', () => {
    expect(numberPartsToReplace(0.00000005, 0.00000025, 350, 5000)).toBe(
      'For the first failure rate, you will have to replace 3 parts and for the second 11 parts.'
    );
  });
  test('extreme low variables, for high test subjects', () => {
    expect(numberPartsToReplace(0.000000002, 0.000000048, 365, 8000)).toBe(
      'For the first failure rate, you will have to replace 1 parts and for the second 4 parts.'
    );
  });
});

describe('Function - probabilityOfBeingShotDown', () => {
  test('standard variables', () => {
    expect(probabilityOfBeingShotDown(0.4, 0.3, 0.2, 0.1)).toBe(
      'The probability of hitting the target in the given series of shots is 0.6976.'
    );
  });
  test('different variables for 4 shots', () => {
    expect(probabilityOfBeingShotDown(0.5, 0.4, 0.3, 0.2)).toBe(
      'The probability of hitting the target in the given series of shots is 0.8320.'
    );
  });
  test('different variables for 3 shots', () => {
    expect(probabilityOfBeingShotDown(0.4, 0.3, 0.2)).toBe(
      'The probability of hitting the target in the given series of shots is 0.6640.'
    );
  });
});

describe('Function - probabilityOfSelectTwoChildren', () => {
  test('standard variables', () => {
    expect(probabilityOfSelectTwoChildren(3, 2, 4)).toBe(
      'The probability of choosing two children from a group of people is 0.476'
    );
  });
  test('outcome when half of all people are children', () => {
    expect(probabilityOfSelectTwoChildren(1, 2, 3)).toBe(
      'The probability of choosing two children from a group of people is 0.600'
    );
  });
});
