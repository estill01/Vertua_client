import { createAsyncThunk, createSlice, createEntity } from '@reduxjs/toolkit'
import { firebase, getProjectsForUser } from '../remote/firebase'


export const createProject = 
	createAsyncThunk('project/create',
	async (arg, thunkAPI) => {
	},
	{ condition: () => {
	}}
)

export const fetchProjectsForUser = 
  createAsyncThunk('projects/fetchForUser',
	async (arg, thunkAPI) => { getProjectsForUser(arg) },
	{ condition: () => {}}
)

export const ProjectSlice = createSlice({
	name: 'projects',
	initialState: {
		status: 'idle',
		isLoading: false,
		projects: []
	},
	reducers: {
		
	},
	extraReducers: {
	}
})

export const {
} = ProjectSlice.actions

export default ProjectSlice.reducer
