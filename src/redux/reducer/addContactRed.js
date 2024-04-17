import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  message: '',
};

const addContactSlice = createSlice({
  name: 'ADD_CONTACT_SLICE',
  initialState,
  reducers: {
    storeNewContactData: (state, actions) => {
      state.message = actions.payload;
    },
  },
});

export default addContactSlice.reducer;
export const {storeNewContactData} = addContactSlice.actions;
