import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'
import {
	PageReducer,
	SessionReducer,
} from './slices'


const middleware = [ ...getDefaultMiddleware() ]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

export default configureStore({
	reducer: {
		page: PageReducer,
		session: SessionReducer,
	},
	middleware
})
