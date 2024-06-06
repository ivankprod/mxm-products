import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
	TAddProductDTO,
	TUpdateProductDTO,
	TDeleteProductDTO,
	TProduct,
	TProducts
} from "@/types/product";

interface IGetParams {
	limit?: number;
	sort?: "asc" | "desc";
}

interface IGetProductByID {
	id: string;
}

const apiRoute = "/products";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		addProduct: builder.mutation<TProduct, TAddProductDTO>({
			query: (body) => {
				return { url: apiRoute, method: "POST", body };
			},
			invalidatesTags: ["Products"]
		}),
		updateProduct: builder.mutation<TProduct, TUpdateProductDTO>({
			query: (body) => {
				const { id: _, ...updates } = body;

				return { url: `${apiRoute}/${body.id}`, method: "PATCH", updates };
			},
			invalidatesTags: ["Products"]
		}),
		deleteProduct: builder.mutation<TProduct, TDeleteProductDTO>({
			query: (body) => ({ url: `${apiRoute}/${body.id}`, method: "DELETE" }),
			invalidatesTags: ["Products"]
		}),
		getProducts: builder.query<TProducts, IGetParams | void>({
			query: (params) => {
				return params ? { url: apiRoute, params: { ...params } } : { url: apiRoute };
			},
			providesTags: ["Products"]
		}),
		getProductByID: builder.query<TProduct, IGetProductByID>({
			query: (params) => ({ url: `${apiRoute}/${params.id}` }),
			providesTags: ["Products"]
		})
	})
});

export const {
	useAddProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetProductsQuery,
	useGetProductByIDQuery
} = apiSlice;
export const clearApi = () => apiSlice.util.resetApiState();
