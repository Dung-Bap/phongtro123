import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        token: null,
        isLoading: false,
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
});

export const { registerUser, logout } = userSlice.actions;

export default userSlice.reducer;
