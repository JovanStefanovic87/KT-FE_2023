'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
    firstName: string;
    lastName: string;
}

const initialState: FormState = {
    firstName: 'J',
    lastName: 'S',
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
    },
});

export const { setFirstName, setLastName } = formSlice.actions;

export default formSlice.reducer;
