export type TProductStatus = {
	value: "published" | "unpublished";
	label: "Опубликован" | "Не опубликован";
	color: "success" | "orange";
};

export type TProduct = {
	id: string;
	key?: string; // Потому что в ответе API данного поля нет
	title: string;
	price: number;
	description: string;
	category?: string;
	image?: string;
	status?: TProductStatus["value"]; // Не TProductStatus, потому что antd select option не работает с объектами в value
	createdAt?: string;
	rating?: {
		rate: number;
		count: number;
	};
};

export type TAddProductDTO = Omit<TProduct, "id">;
export type TUpdateProductDTO = Partial<TProduct>;
export type TDeleteProductDTO = Pick<TProduct, "id">;

export type TProducts = TProduct[];
