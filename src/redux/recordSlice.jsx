import { createSlice } from '@reduxjs/toolkit';

const recordSlice = createSlice({
  name: 'records',
  initialState: [],
  reducers: {
    addRecord: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addRecord } = recordSlice.actions;
export default recordSlice.reducer;
