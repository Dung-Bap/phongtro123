import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: null,
        isLoading: false,
        dataUser: null,
        mess: '',
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
        clearMessage: state => {
            state.mess = '';
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

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.isLoading = false;
            state.mess = 'Phiên đăng nhập đã hết hạn ,bạn đăng nhập lại nhé !';
        });
    },
});

export const { registerUser, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer;
