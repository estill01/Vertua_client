import { 
	createSlice, 
	createAsyncThunk, 
	createEntityAdapter,
} from '@reduxjs/toolkit'

const EntitiesSlice= createSlice({
	name: 'entities',
	initialState: {
		projects: {
			byId: {},
			allIds: []
		},
		users: {
			byId: {},
			allIds: []
		},
		userProject: {
			byId: {},
			allIds: [],
		},
	},
	reducers: {
	},
	extraReducers: {
	}
})

export const { } = EntitiesSlice.actions

export default EntitiesSlice.reducer
