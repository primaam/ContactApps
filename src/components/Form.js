import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';
import {
  primaryColor,
  primaryTextColor,
  secondaryColor,
  thirdColor,
} from '../assets/color';

const Form = ({title, onChangeText, value, placeholder, keyboardType}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.inputText}>{title}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholderTextColor={primaryColor}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  formContainer: {},
  inputText: {
    fontSize: ms(16),
    fontFamily: 'Poppins-Regular',
    color: primaryTextColor,
  },
  input: {
    borderWidth: 1,
    borderColor: primaryTextColor,
    padding: hs(10),
    borderRadius: 10,
    color: primaryColor,
    height: vs(50),
    marginVertical: vs(10),
    backgroundColor: thirdColor,
  },
});
