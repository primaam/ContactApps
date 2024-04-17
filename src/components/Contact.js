import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';
import {primaryColor, primaryTextColor, thirdColor} from '../assets/color';

const Contact = ({photo, firstName, lastName, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {photo.substring(0, 5) !== 'https' ? (
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>{firstName.charAt(0)}</Text>
        </View>
      ) : (
        <Image source={{uri: photo}} style={styles.cardImage} />
      )}
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText}>{firstName}</Text>
        <Text style={styles.cardText}> {lastName}</Text>
      </View>
    </Pressable>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: hs(10),
    height: vs(60),
    borderWidth: 1,
    backgroundColor: thirdColor,
    borderColor: primaryTextColor,
    borderRadius: ms(10),
    marginVertical: vs(5),
  },

  cardTextContainer: {
    flexDirection: 'row',
    marginLeft: hs(10),
  },
  cardText: {
    fontFamily: 'Poppins-Regular',
    color: primaryTextColor,
    fontSize: ms(14),
  },
  cardImage: {
    width: vs(40),
    height: vs(40),
    borderRadius: vs(20),
  },
  initialsContainer: {
    width: vs(40),
    height: vs(40),
    borderRadius: vs(20),
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
    backgroundColor: '#e5e5e5',
  },
  initialsText: {
    fontSize: 20,
    color: primaryColor,
  },
});
