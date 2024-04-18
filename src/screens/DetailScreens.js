import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

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

import {MainLayout, Form, PrimaryButton, Header} from '../components';

import {updateContact} from '../redux/action/updateContactAct';
import {deleteContact} from '../redux/action/deleteContactAct';
import {storeUpdateContactData} from '../redux/reducer/updateContactRed';
import {storeDeleteContactData} from '../redux/reducer/deleteContactRed';

const DetailScreens = ({route, navigation}) => {
  const {id, firstName, lastName, age, photo} = route.params;
  const [showWarning, setShowWarning] = React.useState(false);
  const [details, setDetails] = React.useState({
    ...route.params,
  });

  const dispatch = useDispatch();

  const handleFormChange = (key, value) => {
    setDetails(prevDetails => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleImagePick = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }).then(res => {
      if (res.didCancel) {
        console.log('Image selection cancelled');
      } else if (res.errorCode || res.errorMessage) {
        console.log('Image selection error');
      } else {
        console.log(res);
        handleFormChange('photo', res.assets[0].uri);
      }
    });
  };

  const handleUpdate = async () => {
    try {
      if (
        details.age === null ||
        details.firstName.length === 0 ||
        details.lastName.length === 0 ||
        details.photo.length === 0
      ) {
        setShowWarning(true);
      } else {
        const update = await updateContact({...details});
        dispatch(storeUpdateContactData(update));

        setTimeout(() => {
          setShowWarning(false);
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      console.log('error add contact', error);
    }
  };

  const handleDelete = async () => {
    try {
      const deleteData = await deleteContact(details.id);
      dispatch(storeDeleteContactData(deleteData));

      setTimeout(() => {
        setShowWarning(false);
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.log('error add contact', error);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: primaryColor}}>
      <Header
        title="Edit Contact"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <MainLayout>
        <View style={styles.cameraContainer}>
          <Pressable
            style={styles.cameraIconContainer}
            onPress={() => handleImagePick()}>
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
        {showWarning === true ? (
          <Text style={styles.warningText}>
            You cannot leave the empty field
          </Text>
        ) : (
          <></>
        )}
        <PrimaryButton
          isWarning={true}
          onPress={() => handleDelete()}
          title={'Delete'}
        />
        <View style={{marginVertical: vs(10)}} />
        <PrimaryButton onPress={() => handleUpdate()} title={'Update'} />
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
  warningText: {
    color: warnColor,
    fontSize: ms(14),
    fontFamily: 'Poppins-Medium',
    marginBottom: vs(15),
    textAlign: 'center',
  },
});
