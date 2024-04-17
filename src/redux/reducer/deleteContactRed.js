import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const deleteContactSlice = createSlice({
  name: 'DELETE_CONTACT_SLICE',
  initialState,
  reducers: {
    storeDeleteContactData: (state, actions) => {
      state = actions;
    },
  },
});

export default deleteContactSlice.reducer;
export const {storeDeleteContactData} = deleteContactSlice.actions;
