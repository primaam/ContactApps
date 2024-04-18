import {
  StyleSheet,
  Text,
  View,
  Animated,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {primaryTextColor, secondaryColor} from '../assets/color';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';

import {getContactList} from '../redux/action/getContactAct';
import {storeContactListData} from '../redux/reducer/getContactRed';

const SplashScreens = ({navigation}) => {
  const dispatch = useDispatch();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const contactList = await getContactList();

        dispatch(storeContactListData(contactList.data));
      } catch (error) {
        console.error('Error fetching contact list:', error);
      }
    };
    setTimeout(async () => {
      await fetchData();
      navigation.navigate('Home');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}>
        <ActivityIndicator size="large" color={primaryTextColor} />

        <Text style={styles.text}>Please Wait</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreens;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryColor,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: ms(20),
    color: primaryTextColor,
  },
});
