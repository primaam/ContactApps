import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const updateContactSlice = createSlice({
  name: 'UPDATE_CONTACT_SLICE',
  initialState,
  reducers: {
    storeUpdateContactData: (state, actions) => {
      state = actions;
    },
  },
});

export default updateContactSlice.reducer;
export const {storeUpdateContactData} = updateContactSlice.actions;
