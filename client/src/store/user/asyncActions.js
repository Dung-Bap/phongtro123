import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getCurrent = createAsyncThunk('app/getCurrent', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCurrent(data);
    if (!response.success) return rejectWithValue(response);
    return response;
});
