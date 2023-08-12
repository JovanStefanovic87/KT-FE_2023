import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface navState {
  activeLink: string;
}

const initialState: navState = {
  activeLink: '',
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setActiveLink: (state, action: PayloadAction<string>) => {
      state.activeLink = action.payload;
    },
  },
});

export const { setActiveLink } = navSlice.actions;
export default navSlice.reducer;
