import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../Modules/Auth/slices';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export type TAppState = ReturnType<typeof store.getState>;
