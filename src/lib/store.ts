import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/lib/features/api";
import { usePersistedState } from "@/lib/hooks";

export const makeStore = () => {
	const { value } = usePersistedState();

	return configureStore({
		reducer: combineReducers({
			[apiSlice.reducerPath]: apiSlice.reducer
		}),
		preloadedState: value,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
