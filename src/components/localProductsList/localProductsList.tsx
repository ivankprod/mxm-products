"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Flex, Select, Space, Switch, Table, TableProps, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { PerPageOptions } from "@/lib/constants";
import { TProduct, statusPublished, statusUnpublished } from "@/types/product";

import styles from "./localProductsList.module.css";
import { updateProduct, deleteProduct, addProduct } from "@/lib/features/local";

const columns: TableProps<TProduct>["columns"] = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id"
	},
	{
		title: "Название",
		dataIndex: "title",
		key: "title",
		render: (_, { id, title }) => <Link href={`/products/${id}`}>{title}</Link>
	},
	{
		title: "Цена",
		dataIndex: "price",
		key: "price"
	},
	{
		title: "Описание",
		dataIndex: "description",
		key: "description"
	},
	{
		title: "Статус",
		key: "status",
		dataIndex: "status",
		render: (_, { status }) => (
			<Tag color={status?.color} key={status?.type}>
				{status?.label.toUpperCase()}
			</Tag>
		)
	},
	{
		title: "Действия",
		key: "actions",
		render: (_, product) => (
			<Space>
				<Button
					onClick={() => {
						useAppDispatch()(updateProduct(product));
					}}
					icon={<EditOutlined />}
				></Button>
				<Button
					onClick={() => {
						useAppDispatch()(deleteProduct(product));
					}}
					icon={<DeleteOutlined />}
				></Button>
			</Space>
		)
	}
];

export const LocalProductsList: React.FC = () => {
	const [shown, setShown] = useState(PerPageOptions[0].value as number);
	const [filteredByStatus, setFilteredByStatus] = useState(false);

	const products = useAppSelector((state) => state.local);
	const dispatch = useAppDispatch();

	const productsFilteredByStatus = filteredByStatus
		? products.filter((product) =>
				product.status ? product.status === statusPublished : false
		  )
		: products;

	return (
		<Flex className={styles["cards-container"]} vertical>
			<Flex className={styles["filter-wrapper"]} gap="large">
				<Flex
					className={styles["filter-container"]}
					style={{
						justifyContent: "flex-start",
						flexGrow: 1
					}}
				>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => {
							dispatch(
								addProduct({
									id: 1,
									key: "3",
									title: "Test",
									description: "Test desc",
									price: 100,
									status: statusUnpublished
								})
							);
						}}
					>
						Создать продукт
					</Button>
				</Flex>
				<Flex className={styles["filter-container"]}>
					<Space style={{ justifyContent: "center" }}>Только опубликованные:</Space>
					<Switch
						onChange={(checked) => {
							setFilteredByStatus(checked);
						}}
					/>
				</Flex>
				<Flex className={styles["filter-container"]}>
					<Space style={{ justifyContent: "center" }}>На странице:</Space>
					<Select
						value={shown}
						style={{ width: 160 }}
						options={PerPageOptions}
						onChange={(value) => {
							setShown(() => value);
						}}
					/>
				</Flex>
			</Flex>
			<Table dataSource={productsFilteredByStatus}>
				<Table.Column title="ID" dataIndex="id" key="id" />
				<Table.Column
					title="Название"
					dataIndex="title"
					key="title"
					render={(_, { id, title }: TProduct) => (
						<Link href={`/products/${id}`}>{title}</Link>
					)}
				/>
				<Table.Column title="Цена" dataIndex="price" key="price" />
				<Table.Column title="Описание" dataIndex="description" key="description" />
				<Table.Column
					title="Статус"
					key="status"
					dataIndex="status"
					render={(_, { status }: TProduct) => (
						<Tag color={status?.color} key={status?.type}>
							{status?.label.toUpperCase()}
						</Tag>
					)}
				/>
				<Table.Column
					title="Действия"
					key="actions"
					render={(_, product: TProduct) => (
						<Space>
							<Button
								onClick={() => {
									dispatch(updateProduct(product));
								}}
								icon={<EditOutlined />}
							></Button>
							<Button
								onClick={() => {
									dispatch(deleteProduct(product));
								}}
								icon={<DeleteOutlined />}
							></Button>
						</Space>
					)}
				/>
			</Table>
		</Flex>
	);
};

export default LocalProductsList;