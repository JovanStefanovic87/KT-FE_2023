'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import activePageReducer from './features/nav/activePageSlice';
import nameReducer from './features/name/nameSlice';
import formReducer from './features/form/formSlice';
import employeeReducer from './features/employee/employeeSlice';
import userReducer from './features/user/userSlice';
import deviceReducer from './features/device/deviceSlice';
import calendarModeReducer from './features/calendarMode/calendarModeSlice';

export const store = configureStore({
  reducer: {
    activePage: activePageReducer,
    counter: counterReducer,
    name: nameReducer,
    form: formReducer,
    employee: employeeReducer,
    user: userReducer,
    device: deviceReducer,
    calendarMode: calendarModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
