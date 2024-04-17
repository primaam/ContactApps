import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
import MainLayout from '../components/MainLayout';
import Form from '../components/Form';
import PrimaryButton from '../components/PrimaryButton';

const AddContactScreens = ({navigation}) => {
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    age: null,
    photo: '',
  });

  const handleFormChange = (key, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const handleNumericInput = text => {
    let newText = '';
    const numbers = '0123456789';
    const numbersWithoutZero = '123456789';

    for (let i = 0; i < text.length; i++) {
      if (newText.length == 0 && numbersWithoutZero.includes(text[i])) {
        newText += text[i];
      } else if (newText.length > 0 && numbers.includes(text[i])) {
        newText += text[i];
      }
    }
    setForm(prevForm => ({
      ...prevForm,
      age: newText.length > 0 ? Number.parseInt(newText) : null,
    }));

    return newText;
  };

  return (
    <SafeAreaView style={{backgroundColor: primaryColor}}>
      <Header
        title="Add Contact"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <MainLayout>
        <View style={styles.cameraContainer}>
          <Pressable style={styles.cameraIconContainer}>
            {form.photo.length == 0 ? (
              <Icon name="camera" size={ms(30)} color={primaryColor} />
            ) : (
              <Image source={{uri: form.photo}} style={styles.image} />
            )}
          </Pressable>
        </View>
        <Form
          value={form.firstName}
          onChangeText={val => handleFormChange('firstName', val)}
          title="First Name"
          placeholder="Type your first name here"
        />
        <Form
          value={form.lastName}
          onChangeText={val => handleFormChange('lastName', val)}
          title="Last Name"
          placeholder="Type your last name here"
        />
        <Form
          value={form.age !== null ? form.age.toString() : ''}
          onChangeText={val => handleNumericInput(val)}
          title="Age"
          placeholder="Type your age here"
          keyboardType="numeric"
        />
      </MainLayout>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => handleSubmit()} title={'Submit'} />
      </View>
    </SafeAreaView>
  );
};

export default AddContactScreens;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: vs(80),
    width: '100%',
    paddingHorizontal: hs(20),
  },
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
});
