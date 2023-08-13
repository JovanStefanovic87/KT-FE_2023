'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import activePageReducer from './features/nav/activePageSlice';
import nameReducer from './features/name/nameSlice';
import formReducer from './features/form/formSlice';

export const store = configureStore({
  reducer: {
    activePage: activePageReducer,
    counter: counterReducer,
    name: nameReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
