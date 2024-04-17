import {
  Alert,
  BackHandler,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
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
import PrimaryButton from '../components/PrimaryButton';
import {fakeData} from '../util/fakeData';
import Contact from '../components/Contact';
import MainLayout from '../components/MainLayout';

const HomeScreens = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert('Tunggu!', 'Anda yakin ingin keluar?', [
        {
          text: 'Kembali',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yakin',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={{backgroundColor: primaryColor}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Contact List</Text>
      </View>
      <MainLayout>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fakeData}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={({item}) => (
            <Contact
              firstName={item.firstName}
              lastName={item.lastName}
              photo={item.photo}
              onPress={() => navigation.navigate('Details', {...item})}
            />
          )}
          keyExtractor={item => item.id}
        />
      </MainLayout>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => navigation.navigate('AddContact')}
          title={'Add Contact'}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: secondaryColor,
    paddingHorizontal: hs(20),
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hs(10),
    paddingVertical: vs(8),
    borderBottomWidth: 1,
    borderBottomColor: primaryTextColor,
    backgroundColor: primaryColor,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: vs(80),
    width: '100%',
    paddingHorizontal: hs(20),
  },
  headerText: {
    fontSize: ms(24),
    fontFamily: 'Poppins-Medium',
    color: primaryTextColor,
  },
});
