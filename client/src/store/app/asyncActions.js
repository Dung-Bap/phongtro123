import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getPosts = createAsyncThunk('app/getPosts', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetPosts();
    if (!response.success) return rejectWithValue(response);
    return response;
});

export const getCategories = createAsyncThunk('app/getCategories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategory();
    if (!response.success) return rejectWithValue(response);
    return response;
});
