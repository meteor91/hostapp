import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from 'Core/models';

interface State {
    authorized: boolean
    currentUser: User | null
}

const initialState: State = {
    authorized: false,
    currentUser: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthorized: (state, action: PayloadAction<User>) => {
            state.authorized = true;
            state.currentUser = action.payload;
        },
        clearAuthorized: (state) => {
            state.authorized = false;
            state.currentUser = null;
        },
    },
});

export const { setAuthorized, clearAuthorized } = authSlice.actions;
