import { createSlice } from '@reduxjs/toolkit';

interface CalendarModeState {
  mode: 'week' | 'day';
}

const initialState: CalendarModeState = {
  mode: 'day',
};

const calendarModeSlice = createSlice({
  name: 'calendarMode',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'week' ? 'day' : 'week';
    },
  },
});

export const { setMode, toggleMode } = calendarModeSlice.actions;

export default calendarModeSlice.reducer;
