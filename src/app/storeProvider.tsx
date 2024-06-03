"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { useLocalStorageValue } from "@react-hookz/web";

import { makeStore, AppStore } from "@/lib/store";

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const storeRef = useRef<AppStore>();

	const { value, set } = useLocalStorageValue("state", {
		defaultValue: {},
		initializeWithValue: false
	});

	if (!storeRef.current) {
		storeRef.current = makeStore(value);

		storeRef.current.subscribe(() => {
			set(storeRef.current!.getState());
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
