import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';
import {primaryColor, primaryTextColor, thirdColor} from '../assets/color';

const Header = ({title, showBackButton, onBackPress}) => {
  return (
    <View style={styles.header}>
      {showBackButton == true ? (
        <Pressable onPress={onBackPress}>
          <Icon name="arrow-back" size={ms(24)} color={'#DCD7C9'} />
        </Pressable>
      ) : (
        <View></View>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(10),
    paddingVertical: vs(8),
    borderBottomWidth: 1,
    borderBottomColor: primaryTextColor,
    backgroundColor: primaryColor,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: ms(20),
    color: primaryTextColor,
  },
});
