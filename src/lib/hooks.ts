import { useDispatch, useSelector, useStore } from "react-redux";
import { useLocalStorageValue } from "@react-hookz/web";

import type { RootState, AppDispatch, AppStore } from "@/lib/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const usePersistedState = (initialState?: any) =>
	useLocalStorageValue("state", {
		defaultValue: initialState,
		initializeWithValue: false
	});
