import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TProduct, TProducts } from "@/types/product";

interface IGetParams {
	limit?: number;
	sort?: "asc" | "desc";
	[key: string]: any;
}

interface IGetProductByID {
	id: number;
	params?: IGetParams;
}

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
	endpoints: (builder) => ({
		getProducts: builder.query<TProducts, IGetParams | void>({
			query: (params) => {
				return params ? { url: "/products", params: { ...params } } : { url: "/products" };
			}
		}),
		getProductByID: builder.query<TProduct, IGetProductByID>({
			query: (params) => {
				const { params: otherParams } = params;

				return otherParams
					? { url: `/products/${params.id}`, params: { ...otherParams } }
					: { url: `/products/${params.id}` };
			}
		})
	})
});

export const { useGetProductsQuery, useGetProductByIDQuery } = apiSlice;
