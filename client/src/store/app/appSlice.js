import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isShowModal: false,
        childrenModal: null,
        posts: null,
        categories: [],
        prices: [],
        acreages: [],
    },

    reducers: {
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal;
            state.childrenModal = action.payload.childrenModal;
        },
    },
    extraReducers: builder => {
        // builder.addCase(getPosts.pending, state => {
        //     state.isLoading = true;
        // });

        builder.addCase(actions.getPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.result;
        });

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.result;
        });

        builder.addCase(actions.getPrices.fulfilled, (state, action) => {
            state.isLoading = false;
            state.prices = action.payload.result.sort(function (a, b) {
                return +a.idPrice - +b.idPrice; // db k đều nên sort id theo index
            });
        });

        builder.addCase(actions.getAcreages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.acreages = action.payload.result.sort(function (a, b) {
                return +a.idAcreage - +b.idAcreage;
            });
        });

        builder.addCase(actions.getPosts.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

export const { showModal } = appSlice.actions;

export default appSlice.reducer;
