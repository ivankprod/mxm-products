import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TProduct, TProducts } from "@/types/product";

const initialState: TProducts = [];

export const localSlice = createSlice({
	name: "local",
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<TProduct>) => {
			state.push(action.payload);
		},
		updateProduct: (state, action: PayloadAction<TProduct>) => {
			console.log(action.payload);
		},
		deleteProduct: (state, action: PayloadAction<TProduct>) => {
			return state.filter((product) => product.id !== action.payload.id);
		}
	}
});

export const { addProduct, updateProduct, deleteProduct } = localSlice.actions;
