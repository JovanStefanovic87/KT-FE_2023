import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string;
  userType: string;
}

const initialState: UserState = {
  userId: '',
  userType: 'admin',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ userId: string; userType: string }>) => {
      const { userId, userType } = action.payload;
      state.userId = userId;
      state.userType = userType;
    },
    clearUserInfo: (state) => {
      state.userId = '';
      state.userType = 'guest';
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
