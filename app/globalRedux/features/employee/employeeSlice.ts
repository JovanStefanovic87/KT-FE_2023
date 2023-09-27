import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: { employeeId: '' },
  reducers: {
    setEmployeeId: (state, action) => {
      state.employeeId = action.payload;
    },
  },
});

export const { setEmployeeId } = employeeSlice.actions;
export default employeeSlice.reducer;
