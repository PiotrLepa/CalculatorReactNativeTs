import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { Operation } from './../model/Operation'
import { SpecialOperation } from './../model/SpecialOperation';

export interface Props {
    onNumberClick: (number: number) => void;
    onClearClick: () => void;
    onOperationClick: (operation: Operation) => void;
    onSpecialOperationClick: (operation: SpecialOperation) => void;
    onDotClick: () => void;
    onCalculateClick: () => void;
}

export const CalculatorButtons: React.FC<Props> = (props) => {

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

    const getMiddleRowLandscape = (specialOperations: SpecialOperation[], numbers: number[], operation: Operation) => {
        const specialOperationsViews = specialOperations.map(el => getSpecialOperationView(el));
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
        const number = getViewWithNumber(0, styles.wideNumber);
        const comma = getViewWithComma();
        const calculation = getViewWithCalculation();
        return [pi, cubicPower, number, comma, calculation];
    };

    const getBottomRow = () => {
        const number = getViewWithNumber(0, styles.wideNumber);
        const comma = getViewWithComma();
        const calculation = getViewWithCalculation();
        return [number, comma, calculation];
    };

    const getViewWithNumber = (number: number, style = styles.number) => (
        <TouchableOpacity
            style={style}
            onPress={() => props.onNumberClick(number)}
            key={Math.random()}>
            <Text style={styles.text}>{number}</Text>
        </TouchableOpacity>
    );

    const getViewWithComma = () => (
        <TouchableOpacity
            style={styles.number}
            onPress={() => props.onDotClick()}
            key={Math.random()}>
            <Text style={styles.text}>.</Text>
        </TouchableOpacity>
    );

    const getSpecialOperationView = (operation: SpecialOperation) => (
        <TouchableOpacity
            style={styles.specialOperation}
            onPress={() => props.onSpecialOperationClick(operation)}
            key={Math.random()}>
            <Text style={styles.text}>{operation}</Text>
        </TouchableOpacity>
    );

    const getClearView = () => (
        <TouchableOpacity
            style={styles.specialOperation}
            onPress={() => props.onClearClick()}
            key={Math.random()}>
            <Text style={styles.text}>AC</Text>
        </TouchableOpacity>
    );

    const getTopEmptyView = () => (
        <TouchableOpacity
            style={styles.wideEmpty}
            key={Math.random()}
            disabled={true}>
            <Text style={styles.text}></Text>
        </TouchableOpacity>
    );

    const getViewWithOperation = (operation: Operation) => (
        <TouchableOpacity
            style={styles.operation}
            key={Math.random()}
            onPress={() => props.onOperationClick(operation)}>
            <Text style={styles.text}>{operation}</Text>
        </TouchableOpacity>
    );

    const getViewWithCalculation = () => (
        <TouchableOpacity
            style={styles.operation}
            key={Math.random()}
            onPress={() => props.onCalculateClick()}>
            <Text style={styles.text}>{'='}</Text>
        </TouchableOpacity>
    );

    const onLayoutChange = () => {
        setIsPortrait(isPortraitOrientation)
    }

    const createPortraitView = () => {
        return [
            <View style={styles.rowContainer} key={Math.random()}>{getTopRow()}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getMiddleRow([7, 8, 9], Operation.multiplication)}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getMiddleRow([4, 5, 6], Operation.subtraction)}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getMiddleRow([1, 2, 3], Operation.addition)}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getBottomRow()}</View>
        ]
    }

    const createLandscapeView = () => {
        return [
            <View style={styles.rowContainer} key={Math.random()}>{getTopRowLandscape()}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getMiddleRowLandscape([SpecialOperation.ExpPower, SpecialOperation.DecimalPower], [7, 8, 9], Operation.multiplication)}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getMiddleRowLandscape([SpecialOperation.LogarithmExp, SpecialOperation.Logarithm], [4, 5, 6], Operation.subtraction)}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getMiddleRowLandscape([SpecialOperation.Exp, SpecialOperation.SquarePower], [1, 2, 3], Operation.addition)}</View>,
            <View style={styles.rowContainer} key={Math.random()}>{getBottomRowLandscape()}</View>
        ]
    }

    return (
        <>
            <View style={styles.container} onLayout={() => onLayoutChange()}>
                {isPortrait ? createPortraitView() : createLandscapeView()}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 32,
        color: 'white',
    },
    wideEmpty: {
        flex: 2,
        backgroundColor: '#636365',
    },
    specialOperation: {
        flex: 1,
        backgroundColor: '#636365',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    number: {
        flex: 1,
        backgroundColor: '#7d7e80',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wideNumber: {
        flex: 2,
        backgroundColor: '#7d7e80',
        justifyContent: 'center',
        alignItems: 'center',
    },
    operation: {
        flex: 1,
        backgroundColor: '#f2a33c',
        justifyContent: 'center',
        alignItems: 'center',
    },
});