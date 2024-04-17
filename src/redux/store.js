import {configureStore} from '@reduxjs/toolkit';
import contactListStore from './reducer/getContactRed';
import addContactStore from './reducer/addContactRed';
import updateContactStore from './reducer/updateContactRed';
import deleteContactStore from './reducer/deleteContactRed';

export const store = configureStore({
  reducer: {
    contactListStore,
    addContactStore,
    updateContactStore,
    deleteContactStore,
  },
});
