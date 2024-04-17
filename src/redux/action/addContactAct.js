import axios from 'axios';
import {baseUrl} from '../../util/apiHelper';
import {getContactList} from './getContactAct';

export const addContact = async payload => {
  try {
    const data = JSON.stringify(payload);
    await axios({
      method: 'POST',
      url: `${baseUrl}/contact`,
      data: data,
    });
    getContactList();
  } catch (error) {
    console.error('Error adding contact:', error);
  }
};
