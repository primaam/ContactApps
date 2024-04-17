import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
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
import Icon from 'react-native-vector-icons/Ionicons';
import MainLayout from '../components/MainLayout';
import Form from '../components/Form';
import PrimaryButton from '../components/PrimaryButton';

const DetailScreens = ({route, navigation}) => {
  const {id, firstName, lastName, age, photo} = route.params;
  const [details, setDetails] = React.useState({
    ...route.params,
  });

  const handleFormChange = (key, value) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    navigation.goBack();
  };

  const handleDelete = () => {};
  return (
    <SafeAreaView style={{backgroundColor: primaryColor}}>
      <Header
        title="Edit Contact"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <MainLayout>
        <View style={styles.cameraContainer}>
          <Pressable style={styles.cameraIconContainer}>
            {details.photo.substring(0, 5) !== 'https' ? (
              <Icon name="camera" size={ms(30)} color={primaryColor} />
            ) : (
              <Image source={{uri: details.photo}} style={styles.image} />
            )}
          </Pressable>
        </View>
        <Form
          onChangeText={val => handleFormChange('firstName', val)}
          value={details.firstName}
          title="First Name"
          placeholder="Type your first name here"
        />
        <Form
          onChangeText={val => handleFormChange('lastName', val)}
          value={details.lastName}
          title="Last Name"
          placeholder="Type your last name here"
        />
        <Form
          onChangeText={val => handleFormChange('age', val)}
          value={details.age.toString()}
          title="Age"
          placeholder="Type your age here"
          keyboardType="numeric"
        />
      </MainLayout>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          isWarning={true}
          onPress={() => handleDelete()}
          title={'Delete'}
        />
        <View style={{marginVertical: vs(10)}} />
        <PrimaryButton onPress={() => handleSubmit()} title={'Update'} />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreens;

const styles = StyleSheet.create({
  cameraContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(20),
  },
  cameraIconContainer: {
    width: vs(80),
    height: vs(80),
    borderRadius: vs(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: thirdColor,
  },
  image: {
    width: vs(80),
    height: vs(80),
    borderRadius: vs(40),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: vs(80),
    width: '100%',
    paddingHorizontal: hs(20),
  },
});
