import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.items = action.payload.data.users;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
