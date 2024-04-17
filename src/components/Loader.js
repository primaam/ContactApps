import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {primaryColor, primaryTextColor} from '../assets/color';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={primaryTextColor}
        // style={styles.loader}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
