import axios from 'axios';
import {baseUrl} from '../../util/apiHelper';
import {getContactList} from './getContactAct';

export const updateContact = async payload => {
  try {
    const data = JSON.stringify(payload);
    await axios({
      method: 'PUT',
      url: `${baseUrl}/contact/${payload.id}`,
      data: data,
    });
    getContactList();
  } catch (error) {
    console.error('Error update contact:', error);
  }
};
