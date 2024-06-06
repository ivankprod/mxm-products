import { DefaultOptionType } from "antd/es/select";

import { TProductStatus } from "@/types/product";

export const statusPublished: TProductStatus = {
	value: "published",
	label: "Опубликован",
	color: "success"
};

export const statusUnpublished: TProductStatus = {
	value: "unpublished",
	label: "Не опубликован",
	color: "orange"
};

export const statuses = {
	published: statusPublished,
	unpublished: statusUnpublished
}

export const perPageOptions: DefaultOptionType[] = [
	{ label: "8", value: 8 },
	{ label: "16", value: 16 },
	{ label: "Показать все", value: 20 }
];

export const productAddFormErrors: Record<string, string> = {
	"NO_TITLE": "Укажите название",
	"NO_DESCRIPTION": "Укажите описание",
	"NO_PRICE": "Укажите цену"
}
