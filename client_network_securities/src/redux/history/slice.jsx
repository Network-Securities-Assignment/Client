import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating a history event
export const createHistoryEvent = createAsyncThunk(
    'history/createEvent',
    async ({ action, details }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/createEvent', {
                action,
                details
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getHistoryEvent = createAsyncThunk(
    'history/getHistoryEvent',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/viewEvents');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// History slice
const historySlice = createSlice({
    name: 'history',
    initialState: {
        events: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createHistoryEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(createHistoryEvent.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createHistoryEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getHistoryEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHistoryEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getHistoryEvent.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export default historySlice.reducer;
