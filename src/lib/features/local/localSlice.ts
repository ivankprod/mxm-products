import { v4 as uuid } from "uuid";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TProduct, TAddProductDTO, TProducts, TUpdateProductDTO } from "@/types/product";

const initialState: TProducts = [];

export const localSlice = createSlice({
	name: "local",
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<TAddProductDTO>) => {
			const newID = uuid();
			
			state.push({
				...action.payload,
				createdAt: new Date().toString(),
				id: newID,
				key: `product-${newID}`
			});
		},
		updateProduct: (state, action: PayloadAction<TUpdateProductDTO>) => {
			const { id } = action.payload;

			let existingPost = state.find((product) => product.id == id);

			if (existingPost) {
				if (action.payload.title) existingPost.title = action.payload.title;
				if (action.payload.description) existingPost.description = action.payload.description;
				if (action.payload.price) existingPost.price = action.payload.price;
				if (action.payload.status) existingPost.status = action.payload.status;
			}
		},
		deleteProduct: (state, action: PayloadAction<TProduct>) => {
			return state.filter((product) => product.id !== action.payload.id);
		},
		clearLocal: () => []
	}
});

export const { addProduct, updateProduct, deleteProduct, clearLocal } = localSlice.actions;
