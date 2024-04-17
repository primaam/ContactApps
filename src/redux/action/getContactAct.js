import axios from 'axios';
import {baseUrl} from '../../util/apiHelper';

export const getContactList = async () => {
  return await axios({
    method: 'GET',
    url: `${baseUrl}/contact`,
  });
};
