import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { isNumeric } from 'rxjs/util/isNumeric';

import { Operation } from './model/Operation';
import { SpecialOperation } from './model/SpecialOperation';

import { CalculatorButtons } from './components/CalculatorButtons'

const defaultResultValue = "0";

let firstNumber: number | null = null;
let secondNumber: number | null = null;
let currentOperation: Operation | null = null;
let canAddDot = true;

const App = () => {

  const [result, setResult] = useState(defaultResultValue);

  const onNumberClick = (number: number) => {
    console.log(`onNumberClick: ${number}`);
    if (result === defaultResultValue) {
      setResult(number.toString());
    } else {
      appendToResult(number.toString());
    }
  }

  const onOperationClick = (operation: Operation) => {
    console.log(`onOperationClick: ${operation}`);
    if (isLastCharNumber(result) === false) return;

    parseNumbers();
    const calculations = calculate();
    if (calculations !== null) {
      firstNumber = calculations;
      setResult(calculations.toString() + operation);
    } else {
      appendToResult(operation);
    }

    currentOperation = operation;
  }

  const onSpecialOperationClick = (operation: SpecialOperation) => {
    console.log(`onSpecialOperationClick: ${operation}`);

    const number = parseFloat(result);

    let calculatedValue: Number = 0;
    switch (operation) {
      case SpecialOperation.Sqrt:
        calculatedValue = Math.sqrt(number);
        break;
      case SpecialOperation.Factorial:
        calculatedValue = factorial(number);
        break;
      case SpecialOperation.ExpPower:
        calculatedValue = Math.exp(number);
        break;
      case SpecialOperation.DecimalPower:
        calculatedValue = Math.pow(10, number);
        break;
      case SpecialOperation.LogarithmExp:
        calculatedValue = Math.log1p(number);
        break;
      case SpecialOperation.Logarithm:
        calculatedValue = Math.log10(number);
        break;
      case SpecialOperation.Exp:
        calculatedValue = Math.E;
        break;
      case SpecialOperation.Pi:
        calculatedValue = Math.PI;
        break;
      case SpecialOperation.SquarePower:
        calculatedValue = Math.pow(number, 2);
        break;
      case SpecialOperation.CubicPower:
        calculatedValue = Math.pow(number, 3);
        break;
      case SpecialOperation.Percent:
        calculatedValue = Math.pow(number, 3);
        break;
      case SpecialOperation.ChangeSign:
        calculatedValue = number * -1;
        break;
    }

    setResult(parseFloat(calculatedValue.toFixed(2)).toString());
  }

  const factorial = (num: Number) => {
    var rval = 1;
    for (var i = 2; i <= num; i++)
      rval = rval * i;
    return rval;
  }

  const onCalculateClick = () => {
    console.log(`onCalculateClick`);
    parseNumbers();
    setResultIfNotNull(calculate());
  }

  const onDotClick = () => {
    console.log(`onDotClick`);
    if (canAddDot && isLastCharNumber(result)) {
      canAddDot = false;
      appendToResult('.');
    }
  }

  const onClearClick = () => {
    console.log(`onClearClick`);
    firstNumber = null;
    secondNumber = null;
    currentOperation = null;
    canAddDot = true;
    setResult(defaultResultValue);
  }

  const parseNumbers = () => {
    canAddDot = true;
    if (firstNumber === null) {
      firstNumber = parseFloat(result);
    } else {
      const firstNumberLength = firstNumber.toString().length;
      const secondNum = result.substr(firstNumberLength + 1);
      secondNumber = parseFloat(secondNum);
    }
  }

  const calculate = (): number | null => {
    console.log(`calculate: first: ${firstNumber}, second: ${secondNumber}, operation: ${currentOperation}`);
    if (firstNumber === null
      || secondNumber === null
      || currentOperation === null
      || !isLastCharNumber(result)
    ) return null;

    const firstNum = firstNumber!;
    const secondNum = secondNumber!;
    const operation = currentOperation!;

    firstNumber = null;
    secondNumber = null;
    currentOperation = null;

    let toReturn: number = 0;
    switch (operation) {
      case Operation.addition:
        toReturn = firstNum + secondNum;
        break;
      case Operation.subtraction:
        toReturn = firstNum - secondNum;
        break;
      case Operation.multiplication:
        toReturn = firstNum * secondNum;
        break;
      case Operation.division:
        toReturn = firstNum / secondNum;
        break;
    }
    return parseFloat(toReturn.toFixed(2));
  }

  const setResultIfNotNull = (text: number | null) => {
    if (text !== null) {
      setResult(text.toString());
    }
  }

  const appendToResult = (text: string) => {
    setResult(result + text)
  }

  const isLastCharNumber = (text: string) => isNumeric(getLastChar(text));

  const getLastChar = (text: string) => text.charAt(text.length - 1);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText} numberOfLines={1} >{result}</Text>
        </View>
        <View style={styles.calculatorButtons}>
          <CalculatorButtons
            onNumberClick={onNumberClick}
            onOperationClick={onOperationClick}
            onClearClick={onClearClick}
            onDotClick={onDotClick}
            onCalculateClick={onCalculateClick}
            onSpecialOperationClick={onSpecialOperationClick} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculatorButtons: {
    height: '80%',
  },
  result: {
    height: '20%',
    backgroundColor: '#545557',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  resultText: {
    fontSize: 48,
    color: 'white',
  },
});

export default App;
