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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
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
  warnColor,
} from '../assets/color';

import {Header, MainLayout, Form, PrimaryButton} from '../components';

import {addContact} from '../redux/action/addContactAct';
import {storeNewContactData} from '../redux/reducer/addContactRed';

const AddContactScreens = ({navigation}) => {
  const [showWarning, setShowWarning] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    age: null,
    photo: '',
  });

  const dispatch = useDispatch();

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

  const handleImagePick = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }).then(res => {
      if (res.didCancel) {
        console.log('Image selection cancelled');
      } else {
        handleFormChange('photo', res.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    try {
      if (
        form.age === null ||
        form.firstName.length === 0 ||
        form.lastName.length === 0 ||
        form.photo.length === 0
      ) {
        setShowWarning(true);
      } else {
        const submitContact = await addContact({...form});
        dispatch(storeNewContactData(submitContact));

        setTimeout(() => {
          setShowWarning(false);
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      console.log('error add contact', error);
    }
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
          <Pressable
            style={styles.cameraIconContainer}
            onPress={() => handleImagePick()}>
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
        {showWarning === true ? (
          <Text style={styles.warningText}>
            You have to complete all the form detail first
          </Text>
        ) : (
          <></>
        )}
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
  warningText: {
    color: warnColor,
    fontSize: ms(14),
    fontFamily: 'Poppins-Medium',
    marginBottom: vs(15),
    textAlign: 'center',
  },
});
