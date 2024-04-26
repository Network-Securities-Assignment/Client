import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticateUser = createAsyncThunk(
    'auth/authenticate',
    async ({ username, password }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/authenticate', {
                username,
                password
            });
            sessionStorage.setItem('userData', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const Slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        userInfo: JSON.parse(sessionStorage.getItem('userData')),
        status: 'idle',
        error: null,
        
    },
    reducers: {
        logout(state) {
            state.userInfo = null;
            state.status = 'idle';
            state.error = null;
            sessionStorage.removeItem('userData');
            window.location.reload()
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = true;
                state.userInfo = action.payload;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.userInfo = null;
            });
    }
});

export const { logout } = Slice.actions;

export default Slice.reducer;
