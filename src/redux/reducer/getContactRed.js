import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const contactListSlice = createSlice({
  name: 'CONTACT_LIST_SLICE',
  initialState,
  reducers: {
    storeContactListData: (state, actions) => {
      state.data = actions.payload.data;
    },
  },
});

export default contactListSlice.reducer;
export const {storeContactListData} = contactListSlice.actions;
