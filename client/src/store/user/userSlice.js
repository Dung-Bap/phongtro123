import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: null,
        isLoading: false,
        dataUser: null,
    },

    reducers: {
        registerUser: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.isLoading = false;
        },
    },
    extraReducers: builder => {
        // builder.addCase(getPosts.pending, state => {
        //     state.isLoading = true;
        // });

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataUser = action.payload.user;
        });
    },
});

export const { registerUser, logout } = userSlice.actions;

export default userSlice.reducer;
