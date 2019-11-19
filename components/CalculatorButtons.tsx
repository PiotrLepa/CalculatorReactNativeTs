import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import {Operation} from './../model/Operation';
import {SpecialOperation} from './../model/SpecialOperation';
import {CalcButton} from './CalcButton';

export interface Props {
  onNumberClick: (number: number) => void;
  onClearClick: () => void;
  onOperationClick: (operation: Operation) => void;
  onSpecialOperationClick: (operation: SpecialOperation) => void;
  onDotClick: () => void;
  onCalculateClick: () => void;
}

export const CalculatorButtons: React.FC<Props> = props => {
  const isPortraitOrientation = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [isPortrait, setIsPortrait] = useState(isPortraitOrientation());

  const getTopRow = () => {
    const clear = getClearView();
    const empty = getTopEmptyView();
    const operation = getViewWithOperation(Operation.division);
    return [clear, empty, operation];
  };

  const getTopRowLandscape = () => {
    const square = getSpecialOperationView(SpecialOperation.Sqrt);
    const factorial = getSpecialOperationView(SpecialOperation.Factorial);
    const clear = getClearView();
    const changeSign = getSpecialOperationView(SpecialOperation.ChangeSign);
    const percent = getSpecialOperationView(SpecialOperation.Percent);
    const operation = getViewWithOperation(Operation.division);
    return [square, factorial, clear, changeSign, percent, operation];
  };

  const getMiddleRowLandscape = (
    specialOperations: SpecialOperation[],
    numbers: number[],
    operation: Operation,
  ) => {
    const specialOperationsViews = specialOperations.map(el =>
      getSpecialOperationView(el),
    );
    const numbersView = numbers.map(el => getViewWithNumber(el));
    const operationView = getViewWithOperation(operation);
    return [...specialOperationsViews, ...numbersView, operationView];
  };

  const getMiddleRow = (numbers: number[], operation: Operation) => {
    const views = numbers.map(el => getViewWithNumber(el));
    views.push(getViewWithOperation(operation));
    return views;
  };

  const getBottomRowLandscape = () => {
    const pi = getSpecialOperationView(SpecialOperation.Pi);
    const cubicPower = getSpecialOperationView(SpecialOperation.CubicPower);
    const number = getViewWithNumber(0, 2);
    const comma = getViewWithComma();
    const calculation = getViewWithCalculation();
    return [pi, cubicPower, number, comma, calculation];
  };

  const getBottomRow = () => {
    const number = getViewWithNumber(0, 2);
    const comma = getViewWithComma();
    const calculation = getViewWithCalculation();
    return [number, comma, calculation];
  };

  const getViewWithNumber = (number: number, flex: number = 1) => (
    <CalcButton
      onPress={() => props.onNumberClick(number)}
      backgroundColor="#7d7e80"
      title={number.toString()}
      flex={flex}
    />
  );

  const getViewWithComma = () => (
    <CalcButton
      onPress={() => props.onDotClick()}
      backgroundColor="#7d7e80"
      title="."
      flex={1}
    />
  );

  const getSpecialOperationView = (operation: SpecialOperation) => (
    <CalcButton
      onPress={() => props.onSpecialOperationClick(operation)}
      backgroundColor="#636365"
      title={operation}
      flex={1}
    />
  );

  const getClearView = () => (
    <CalcButton
      onPress={() => props.onClearClick()}
      backgroundColor="#636365"
      title="AC"
      flex={1}
    />
  );

  const getTopEmptyView = () => (
    <CalcButton onPress={() => 1} backgroundColor="#636365" title="" flex={2} />
  );

  const getViewWithOperation = (operation: Operation) => (
    <CalcButton
      onPress={() => props.onOperationClick(operation)}
      backgroundColor="#f2a33c"
      title={operation}
      flex={1}
    />
  );

  const getViewWithCalculation = () => (
    <CalcButton
      onPress={() => props.onCalculateClick()}
      backgroundColor="#f2a33c"
      title="="
      flex={1}
    />
  );

  const onLayoutChange = () => {
    setIsPortrait(isPortraitOrientation);
  };

  const createPortraitView = () => {
    return [
      <View style={styles.rowContainer} key={Math.random()}>
        {getTopRow()}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getMiddleRow([7, 8, 9], Operation.multiplication)}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getMiddleRow([4, 5, 6], Operation.subtraction)}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getMiddleRow([1, 2, 3], Operation.addition)}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getBottomRow()}
      </View>,
    ];
  };

  const createLandscapeView = () => {
    return [
      <View style={styles.rowContainer} key={Math.random()}>
        {getTopRowLandscape()}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getMiddleRowLandscape(
          [SpecialOperation.ExpPower, SpecialOperation.DecimalPower],
          [7, 8, 9],
          Operation.multiplication,
        )}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getMiddleRowLandscape(
          [SpecialOperation.LogarithmExp, SpecialOperation.Logarithm],
          [4, 5, 6],
          Operation.subtraction,
        )}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getMiddleRowLandscape(
          [SpecialOperation.Exp, SpecialOperation.SquarePower],
          [1, 2, 3],
          Operation.addition,
        )}
      </View>,
      <View style={styles.rowContainer} key={Math.random()}>
        {getBottomRowLandscape()}
      </View>,
    ];
  };

  return (
    <>
      <View style={styles.container} onLayout={() => onLayoutChange()}>
        {isPortrait ? createPortraitView() : createLandscapeView()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
