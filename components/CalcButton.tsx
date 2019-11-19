import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export interface Props {
  onPress: () => void;
  backgroundColor: string;
  title: string;
  flex: number
}

export const CalcButton: React.FC<Props> = props => {
  return (
    <TouchableOpacity
        style={{
            flex: props.flex,
            backgroundColor: props.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={() => props.onPress()}
        key={Math.random()}>
        <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>  
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        color: 'white',
    },
});