import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchAllUsers = createAsyncThunk(
    'user/searchAllUsers',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.get('http://localhost:3000/searchAllUsers')
            const rawData = response.data.users;
            let maxUID = 1000;
            if(rawData.length > 0) {
                rawData.forEach((item) => {
                    const currentUid = parseInt(item.info.uidNumber[0], 10);
                    if(currentUid > maxUID){
                        maxUID = currentUid
                    }
                })
            }
            dispatch(setMaxUID(maxUID))
            console.log(rawData, maxUID)
            return rawData;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (username, {rejectWithValue, dispatch}) => {
        console.log(username)
        try {
            const response = await axios.delete(`http://localhost:3000/deleteUser/${username}`)
            dispatch(searchAllUsers())
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData, {rejectWithValue, getState}) => {
        try {
            const state = getState()
            console.log(userData, state.user.maxUID)
            const submitData = {
                uidNumber: `${state.user.maxUID + 1}`,
                sn: userData.firstName,
                givenName: userData.lastName,
                gidNumber:userData.group,
                mail: userData.email,
                username: userData.username,
                password: userData.password,
            }
            console.log(submitData)
            const response = await axios.post('http://localhost:3000/createUser', submitData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const searchUser = createAsyncThunk(
    'user/searchUser',
    async (username, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://localhost:3000/searchUser/${username}`);
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser', 
    async ({username, userData}, {rejectWithValue}) => {
        try {
            console.log(username, userData)
            const response = await axios.put(`http://localhost:3000/updateUser/${username}`,{userData:userData});
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const Slice = createSlice({
    name: 'user',
    initialState: {
        allUserData : [],
        loading: false,
        error: null,
        maxUID: 0,
        currentUser: {},
    },
    reducers: {
        setMaxUID(state, action) {
            state.maxUID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.allUserData = action.payload
        })
        .addCase(searchAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchAllUsers.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.allUserData = null;
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            alert('Delete user successfully ')
            state.loading = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(addUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(addUser.fulfilled, (state) => {
            alert('Add user successfully ');
            state.loading = false;
        })
        .addCase(addUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(searchUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(searchUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log('Get user data successfully ');
            state.currentUser = action.payload
        })
        .addCase(searchUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state) => {
            state.loading = false;
            alert('Update user successfully ');
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});

export const { setMaxUID } = Slice.actions;

export default Slice.reducer;
