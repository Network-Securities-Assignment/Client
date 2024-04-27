import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createHistoryEvent } from '../history/slice';

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
            if (response.status === 200) {  // Check if the user was successfully created
                // Prepare and dispatch the history event
                const preparedEvent = {
                    action: "Remove Group",
                    details: {
                        group: cn,
                    }
                };
                await dispatch(createHistoryEvent(preparedEvent));
                dispatch(searchAllGroups())
                return response.data;  // Return the newly created user data
            } else {
                throw new Error('Failed to remove group');
            }
            // dispatch(searchAllGroups())
            // return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addGroup = createAsyncThunk(
    'group/addGroup', 
    async (groupInfo, {rejectWithValue, getState, dispatch}) => {
        try {
            const state = getState()
            const gid = state.group.maxGID + 1
            const response = await axios.post('http://localhost:3000/createGroup', {
                groupname: groupInfo.groupName,
                gid: gid,
            })
            if (response.status === 200) {  // Check if the user was successfully created
                // Prepare and dispatch the history event
                const preparedEvent = {
                    action: "Add Group",
                    details: {
                        group:  groupInfo.groupName,
                    }
                };
                await dispatch(createHistoryEvent(preparedEvent));
                dispatch(searchAllGroups())
                return response.data;  // Return the newly created user data
            } else {
                throw new Error('Failed to remove group');
            }
            // return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateGroup = createAsyncThunk(
    'group/updateGroup', 
    async(groupInfo,{rejectWithValue,dispatch}) => {
        try {
            const response = await axios.put(`http://localhost:3000/updateGroup/${groupInfo.groupName}`,{
                groupData: {
                    groupName: groupInfo.groupName,
                    gidNumber: groupInfo.gidNumber,
                    userList: groupInfo.userMember
                }
            })
            if (response.status === 200) {  // Check if the user was successfully created
                // Prepare and dispatch the history event
                const preparedEvent = {
                    action: "Update Group",
                    details: {
                        group: groupInfo.groupName,
                    }
                };
                await dispatch(createHistoryEvent(preparedEvent));
                dispatch(searchGroup(groupInfo.groupName))
                return response.data;  // Return the newly created user data
            } else {
                throw new Error('Failed to update group');
            }
            // return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const addUserToGroup = createAsyncThunk(
    'group/addUserToGroup', 
    async ({userList, groupName}, {rejectWithValue}) => {
        try {
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
            const response = await axios.get(`http://localhost:3000/searchGroup/${groupName}`);
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
        })
        .addCase(updateGroup.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateGroup.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateGroup.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    }
});
export const { setMaxGID } = Slice.actions;

export default Slice.reducer;
