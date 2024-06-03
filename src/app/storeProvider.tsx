"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "@/lib/store";
import { usePersistedState } from "@/lib/hooks";

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const storeRef = useRef<AppStore>();

	if (!storeRef.current) {
		storeRef.current = makeStore();
	} else {
		const { set } = usePersistedState(storeRef.current);

		storeRef.current.subscribe(() => {
			set(storeRef.current!.getState());
		});
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
