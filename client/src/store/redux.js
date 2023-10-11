/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from './user/userSlice';

const persistConfig = {
    key: 'phongtro123/user',
    storage,
};

const userConfig = {
    ...persistConfig,
    whitelist: ['isLoggedIn', 'token'],
};

export const store = configureStore({
    reducer: {
        user: persistReducer(userConfig, userSlice),
    },
});

export const persistor = persistStore(store);
