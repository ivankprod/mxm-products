type TProductStatus = {
	type: "published" | "unpublished";
	label: "Опубликован" | "Не опубликован";
	color: "success" | "orange";
}

export const statusPublished: TProductStatus = {
	type: "published",
	label: "Опубликован",
	color: "success"
}

export const statusUnpublished: TProductStatus = {
	type: "unpublished",
	label: "Не опубликован",
	color: "orange"
}

export type TProduct = {
	id: number;
	key?: string;
	title: string;
	price: number;
	description: string;
	category?: string;
	image?: string;
	status?: TProductStatus;
	rating?: {
		rate: number;
		count: number;
	};
};

export type TProducts = TProduct[];
