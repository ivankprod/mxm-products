"use client";

import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Link from "next/link";
import {
	Button,
	Empty,
	Flex,
	Input,
	InputRef,
	Select,
	Space,
	Switch,
	Table,
	TableColumnType,
	Tag,
	Tooltip,
	notification
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { perPageOptions, statuses } from "@/lib/constants";
import { useDeleteProductMutation } from "@/lib/features/api";
import { deleteProduct } from "@/lib/features/local";
import { TProduct } from "@/types/product";

import styles from "./localProductsList.module.css";

type DataIndex = keyof TProduct;

interface ILocalProductsListProps {
	loggedIn: boolean;
}

export const LocalProductsList: React.FC<ILocalProductsListProps> = ({ loggedIn }) => {
	const [shown, setShown] = useState(perPageOptions[0].value as number);
	const [filteredByStatus, setFilteredByStatus] = useState(false);

	const [api, contextHolder] = notification.useNotification();

	const products = useAppSelector((state) => state.local);
	const dispatch = useAppDispatch();

	const [deleteProductAPI] = useDeleteProductMutation();

	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef<InputRef>(null);

	const productsFilteredByStatus = filteredByStatus
		? products.filter((product) =>
				product.status ? product.status === statuses.published.value : false
		  )
		: products;

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps["confirm"],
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
	};

	const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<TProduct> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<SearchOutlined />}
					>
						Найти
					</Button>
					<Button onClick={() => clearFilters && handleReset(clearFilters)}>
						Очистить
					</Button>
					<Button
						type="link"
						onClick={() => {
							confirm();
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Применить
					</Button>
					<Button type="link" size="middle" onClick={() => close()}>
						Закрыть
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]!.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			)
	});

	return (
		<Flex className={styles["cards-container"]} vertical gap="large">
			<Flex className={styles["filter-wrapper"]} wrap gap="large">
				<Flex
					className={styles["filter-container"]}
					justify="flex-start"
					style={{ flexGrow: 1 }}
				>
					<Link href="/products/add" passHref>
						<Button type="primary" icon={<PlusOutlined />}>
							Создать продукт
						</Button>
					</Link>
				</Flex>
				<Flex gap="small" className={styles["filter-container"]}>
					<Space style={{ justifyContent: "center" }}>Только опубликованные:</Space>
					<Switch
						onChange={(checked) => {
							setFilteredByStatus(checked);
						}}
					/>
				</Flex>
				<Flex gap="small" className={styles["filter-container"]}>
					<Space style={{ justifyContent: "center" }}>На странице:</Space>
					<Select
						value={shown}
						style={{ width: 160 }}
						options={perPageOptions}
						onChange={(value) => setShown(value)}
					/>
				</Flex>
			</Flex>
			<Table
				dataSource={productsFilteredByStatus}
				locale={{
					emptyText: (
						<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
					)
				}}
				showSorterTooltip={{
					title: "Нажмите для сортировки",
					overlayStyle: { fontSize: 14 }
				}}
				pagination={{
					position: ["bottomCenter"],
					hideOnSinglePage: true,
					showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} записей`,
					pageSize: shown
				}}
				style={{ overflowX: "auto" }}
			>
				<Table.Column<TProduct>
					title="Дата создания"
					dataIndex="createdAt"
					key="createdAt"
					sortDirections={["ascend", "descend", "ascend"]}
					defaultSortOrder="descend"
					sorter={(a, b) =>
						a.createdAt && b.createdAt
							? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
							: 0
					}
					render={(_, { createdAt }) =>
						createdAt ? new Date(createdAt).toLocaleString() : "-"
					}
				/>
				<Table.Column<TProduct>
					title="Название"
					dataIndex="title"
					key="title"
					{...getColumnSearchProps("title")}
				/>
				<Table.Column<TProduct>
					title="Цена"
					dataIndex="price"
					key="price"
					sorter={(a, b) => a.price - b.price}
				/>
				<Table.Column<TProduct>
					title="Описание"
					dataIndex="description"
					key="description"
					{...getColumnSearchProps("description")}
				/>
				<Table.Column<TProduct>
					title="Статус"
					key="status"
					dataIndex="status"
					render={(_, { status }) =>
						status && (
							<Tag color={statuses[status].color} key={statuses[status].value}>
								{statuses[status].label.toUpperCase()}
							</Tag>
						)
					}
				/>
				<Table.Column<TProduct>
					title="Действия"
					key="actions"
					render={(_, product) => (
						<Space>
							<Tooltip
								title="Редактировать"
								overlayInnerStyle={{ fontSize: "0.8rem" }}
							>
								<Link href={`/products/${product.id}/edit`} passHref>
									<Button icon={<EditOutlined />}></Button>
								</Link>
							</Tooltip>
							<Tooltip title="Удалить" overlayInnerStyle={{ fontSize: "0.8rem" }}>
								{contextHolder}
								<Button
									onClick={async () => {
										if (!loggedIn) {
											api.error({
												message: "Ошибка 403",
												description: "Доступ запрещен",
												placement: "top"
											});
										} else {
											try {
												await deleteProductAPI({
													id: "1" // Mock, т.к. форматы ID разные
												}).unwrap();

												/* Очень странно, что уведомление здесь не работает,
											   хотя в productUpdateForm после сабмита все прекрасно работает
											*/
												api.success({
													message: "API",
													description: "Продукт успешно удален",
													placement: "top"
												});

												dispatch(deleteProduct(product));
											} catch (e: any) {
												// А здесь работает :D
												api.error({
													message: `API: Ошибка ${e?.status}`,
													description: e?.data?.message,
													placement: "top"
												});
											}
										}
									}}
									icon={<DeleteOutlined />}
								></Button>
							</Tooltip>
						</Space>
					)}
				/>
			</Table>
		</Flex>
	);
};

export default LocalProductsList;
