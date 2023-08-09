import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, type User } from 'core/models';
import { TAppState } from '../../core/store';

interface State {
    currentUser: User | null,
    authStatus: AuthStatus,
}

const initialState: State = {
    currentUser: null,
    authStatus: AuthStatus.LOADING,
};

export const selectAuthStatus = (state: TAppState) => state.auth.authStatus;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setNotAuthorized: (state) => {
            state.authStatus = AuthStatus.NOT_AUTHORIZED;
            state.currentUser = null;
        },
        // to simplify token validation, login, get current user united in this action
        setAuthorized: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.authStatus = AuthStatus.AUTHORIZED;
        },
    },
});

export const {
    setAuthorized,
    setNotAuthorized,
} = authSlice.actions;
