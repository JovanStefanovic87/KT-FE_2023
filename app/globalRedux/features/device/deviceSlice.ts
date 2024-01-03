import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DeviceState {
  isMobile: boolean;
}

const initialState: DeviceState = {
  isMobile: false,
};

export const detectDevice = createAsyncThunk(
  'device/detectDevice',
  async (_, { getState, dispatch }) => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobile = Boolean(
      userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
    );
    dispatch(setMobile(mobile));
  },
);

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setMobile } = deviceSlice.actions;
export default deviceSlice.reducer;
