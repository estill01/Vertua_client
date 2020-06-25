import { createAsyncThunk, createSlice, createEntity } from '@reduxjs/toolkit'
import { getProjectsForUser } from '../remote/firebase'

export const fetchProjectsForUser =
	createAsyncThunk('user/fetchProjects',
	async (arg, thunkAPI) => getProjectsForUser(arg),
	{ condition: (arg, { getState, extra }) => {
		const { isLoading } = getState()
		console.log("isLoading?: ", isLoading)
		if (isLoading) { return false }
	}}
)

export const UserSlice = createSlice({
	name: 'user',
	initialState: {
		status: 'idle',
		isLoading: false, 
		projects: [],
	},
	reducers: {
	},
	extraReducers: {
		[fetchProjectsForUser.pending]: (state, action) => {
			console.log("[users/fetchProjects.pending]")
			state.status = 'pending'
			state.isLoading = true
		},
		[fetchProjectsForUser.rejected]: (state, action) => {
			console.log("[users/fetchProjects.rejected]")
			state.status = 'error'
			state.isLoading = false 
		},
		[fetchProjectsForUser.fulfilled]: (state, action) => {
			console.log("[users/fetchProjects.fulfilled]")
			state.status = 'idle'
			state.isLoading = false
			state.projects = action.payload
		},
	}
})

export const {
} = UserSlice.actions

export default UserSlice.reducer
