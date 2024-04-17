import axios from 'axios';
import {baseUrl} from '../../util/apiHelper';
import {getContactList} from './getContactAct';

export const deleteContact = async payload => {
  try {
    const data = payload.id;
    await axios({
      method: 'DELETE',
      url: `${baseUrl}/contact/${data}`,
    });
    getContactList();
  } catch (error) {
    console.error('Error delete contact:', error);
  }
};
