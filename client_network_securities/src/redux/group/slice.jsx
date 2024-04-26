import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchAllGroups = createAsyncThunk(
    'group/searchAllGroups',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.get('http://localhost:3000/searchAllGroups')
            const rawData = response.data.groups;
            let maxGID = 0;
            if(rawData.length > 0) {
                rawData.forEach((item) => {
                    const currGID = parseInt(item[1].values[0], 10);
                    if(currGID > maxGID){
                        maxGID = currGID
                    }
                })
            }
            dispatch(setMaxGID(maxGID))
            return rawData;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const deleteGroup = createAsyncThunk(
    'group/deleteGroup', 
    async (cn, {rejectWithValue,dispatch}) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteGroup/${cn}`)
            dispatch(searchAllGroups())
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addGroup = createAsyncThunk(
    'group/addGroup', 
    async (groupInfo, {rejectWithValue, getState}) => {
        try {
            const state = getState()
            const gid = state.group.maxGID + 1
            const response = await axios.post('http://localhost:3000/createGroup', {
                groupname: groupInfo.groupName,
                gid: gid,
            })
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const addUserToGroup = createAsyncThunk(
    'group/addUserToGroup', 
    async ({userList, groupName}, {rejectWithValue}) => {
        try {
            console.log(userList, groupName)
            const response = await axios.post('http://localhost:3000/addManyUserToGroup', {
                groupName,
                userList,
            })
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const searchGroup = createAsyncThunk(
    'group/searchGroup',
    async (groupName, {rejectWithValue}) => {
        try {
            console.log(groupName)
            const response = await axios.get(`http://localhost:3000/searchGroup/${groupName}`);
            console.log(response.data.group)
            return response.data.group;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeUserFromGroup = createAsyncThunk(
    'group/removeUserFromGroup', 
    async ({userCN, groupName}, {rejectWithValue,dispatch}) => {
        try {
            console.log(userCN, groupName)
            const response = await axios.delete(`http://localhost:3000/removeUserFromGroup`,{
                data: {
                    userCN,
                    groupName
                },
                headers: {
                    'Content-Type': 'application/json'
                }
,
            })
            dispatch(searchGroup(groupName))
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


const Slice = createSlice({
    name: 'group',
    initialState: {
        allGroupsData : [],
        loading: false,
        error: null,
        maxGID: 0,
        currentGroup:{},
    },
    reducers: {
        setMaxGID(state, action) {
            state.maxGID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchAllGroups.fulfilled, (state, action) => {
            state.loading = false;
            state.allGroupsData = action.payload
        })
        .addCase(searchAllGroups.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchAllGroups.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.allGroupsData = null;
        })
        .addCase(addGroup.fulfilled, (state) => {
            state.loading = false;
            alert('Add group successfully')
        })
        .addCase(addGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addGroup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.allGroupsData = null;
        })
        .addCase(deleteGroup.fulfilled, (state) => {
            state.loading = false;
            alert('Delete group successfully')
        })
        .addCase(deleteGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteGroup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.allGroupsData = null;
        })
        .addCase(addUserToGroup.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addUserToGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUserToGroup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(searchGroup.fulfilled, (state, action) => {
            state.currentGroup = action.payload;
            state.loading = false;
        })
        .addCase(searchGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchGroup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(removeUserFromGroup.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(removeUserFromGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeUserFromGroup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});
export const { setMaxGID } = Slice.actions;

export default Slice.reducer;
