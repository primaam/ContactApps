import {
  Alert,
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
} from '../util/metrics';
import {primaryColor, primaryTextColor, secondaryColor} from '../assets/color';
import {PrimaryButton, Contact, MainLayout} from '../components';

import {getContactList} from '../redux/action/getContactAct';
import {storeContactListData} from '../redux/reducer/getContactRed';

const HomeScreens = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  const contactListData = useSelector(
    ({contactListStore}) => contactListStore.data,
  );

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

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const contactList = await getContactList();
      setTimeout(() => {
        dispatch(storeContactListData(contactList.data));
        setRefreshing(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching contact list:', error);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: primaryColor}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Contact List</Text>
      </View>
      <MainLayout>
        {contactListData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={contactListData}
            style={styles.listContainer}
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
        ) : (
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.headerText,
                {fontSize: ms(16), textAlign: 'center'},
              ]}>{`Empty contact list:(`}</Text>
          </View>
        )}
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
  listContainer: {
    marginBottom: vs(170),
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
