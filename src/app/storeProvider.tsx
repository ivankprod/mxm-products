"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { makeStore, AppStore } from "@/lib/store";

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const storeRef = useRef<AppStore>();

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	const persistor = persistStore(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default StoreProvider;
