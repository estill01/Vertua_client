import { createAsyncThunk, createSlice, createEntity } from '@reduxjs/toolkit'
import { firebase } from '../remote'


export const createProject = 
	createAsyncThunk('project/create',
	async (arg, thunkAPI) => {
	},
	{ condition: () => {
	}}
)

export const ProjectSlice = createSlice({
	name: 'projects',
	initialState: {
		status: 'idle',
	},
	reducers: {
		
	},
	extraReducers: {
	}
})

export const {
} = ProjectSlice.actions

export default ProjectSlice.reducer
