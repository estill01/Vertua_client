import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'
import {
	PageReducer,
	SessionReducer,
	FirebaseReducer,
	EntitiesReducer,
	SearchReducer,
	ItemsReducer,
} from './slices'


// serializableCheck: false,
// immutableStateInvariant: false,
const middleware = [ ...getDefaultMiddleware() ]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

export default configureStore({
	reducer: {
		page: PageReducer,
		session: SessionReducer,
		firebase: FirebaseReducer,
		entities: EntitiesReducer,
		search: SearchReducer,
		items: ItemsReducer,
	},
	middleware
})
