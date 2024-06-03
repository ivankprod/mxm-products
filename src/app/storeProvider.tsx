"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "@/lib/store";

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const storeRef = useRef<AppStore>();

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
