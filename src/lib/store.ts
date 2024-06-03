import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useLocalStorageValue } from "@react-hookz/web";

import { apiSlice } from "@/lib/features/api";

export const makeStore = () => {
	/* eslint-disable */
	const { value, set } = useLocalStorageValue("state", {
		defaultValue: {},
		initializeWithValue: false
	});

	/* eslint-enable */
	const store = configureStore({
		reducer: combineReducers({
			[apiSlice.reducerPath]: apiSlice.reducer
		}),
		preloadedState: value,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
	});

	store.subscribe(() => {
		set(store.getState());
	});

	return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
