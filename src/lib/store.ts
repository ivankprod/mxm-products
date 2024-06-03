import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/lib/features/api";

export const makeStore = (persistedState: any) => {
	const store = configureStore({
		reducer: combineReducers({
			[apiSlice.reducerPath]: apiSlice.reducer
		}),
		preloadedState: persistedState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
	});

	return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
