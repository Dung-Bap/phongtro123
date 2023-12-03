import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getPosts = createAsyncThunk('app/getPosts', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetPosts(data);
    if (!response.success) return rejectWithValue(response);
    return response;
});

export const getCategories = createAsyncThunk('app/getCategories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategory();
    if (!response.success) return rejectWithValue(response);
    return response;
});

export const getPrices = createAsyncThunk('app/getPrices', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetPrices();
    if (!response.success) return rejectWithValue(response);
    return response;
});

export const getAcreages = createAsyncThunk('app/getAcreages', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetAcreages();
    if (!response.success) return rejectWithValue(response);
    return response;
});

export const getProvinces = createAsyncThunk('app/getProvinces', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProvinces();
    if (!response.success) return rejectWithValue(response);
    return response;
});
