import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';
import {
  primaryColor,
  primaryTextColor,
  thirdColor,
  warnColor,
} from '../assets/color';

const PrimaryButton = ({title, onPress, isWarning}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: isWarning === true ? warnColor : thirdColor,
      }}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hs(10),
    borderRadius: ms(10),
    minHeight: vs(50),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: primaryTextColor,
    fontSize: ms(16),
    fontFamily: 'Poppins-Medium',
  },
});
