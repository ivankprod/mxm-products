import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "@/lib/features/api";

export const makeStore = () => {
	return configureStore({
		reducer: {
			[apiSlice.reducerPath]: apiSlice.reducer
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(apiSlice.middleware)
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
