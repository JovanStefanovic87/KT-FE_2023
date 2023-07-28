'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface NameState {
    value: string;
}

const initialState: NameState = {
    value: 'Jovan',
};

export const nameSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        toAlen: (state) => {
            state.value = 'Alen';
        },
        toAdri: (state) => {
            state.value = 'Adri';
        },
        toJovan: (state) => {
            state.value = 'Jovan';
        },
    },
});

export const { toAlen, toAdri, toJovan } = nameSlice.actions;

export default nameSlice.reducer;
