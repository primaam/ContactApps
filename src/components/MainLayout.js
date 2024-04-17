import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {secondaryColor} from '../assets/color';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';

const MainLayout = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: secondaryColor,
    paddingHorizontal: hs(20),
    paddingTop: vs(20),
  },
});
