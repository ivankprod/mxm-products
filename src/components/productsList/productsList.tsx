"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, Flex, List, Result, Select, Space, Spin } from "antd";

import { useGetProductsQuery } from "@/lib/features/api";
import { PerPageOptions } from "@/lib/constants";

import styles from "./productsList.module.css";

export const ProductsList: React.FC = () => {
	const [shown, setShown] = useState(PerPageOptions[0].value as number);

	const {
		data: products,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetProductsQuery({ limit: shown != 20 ? shown : undefined });

	let content!: JSX.Element;

	if (isLoading) {
		content = (
			<Flex style={{ margin: 48 }}>
				<Spin style={{ marginRight: 16 }} />
				Загрузка данных...
			</Flex>
		);
	} else if (isError && error) {
		if ("status" in error) {
			content = (
				<Result
					status="error"
					title={`Ошибка ${error.status}`}
					subTitle={JSON.stringify(error.data)}
				/>
			);
		} else {
			content = (
				<Result status="error" title={`Ошибка ${error.code}`} subTitle={error.message} />
			);
		}
	} else if (isSuccess) {
		content = (
			<Flex className={styles["cards-container"]} vertical gap="large">
				<Flex className={styles["filter-container"]} gap="small">
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
				<List
					grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
					dataSource={products}
					renderItem={(item) => (
						<Link href={`/products/${item.id}`}>
							<List.Item style={{ display: "flex" }}>
								<Card
									key={item.id}
									hoverable
									cover={
										item.image && (
											<Image
												width={0}
												height={0}
												sizes="100vw"
												src={item.image}
												priority
												style={{
													width: "100%",
													height: 240,
													objectFit: "contain"
												}}
												alt={item.title}
											/>
										)
									}
									style={{ width: "100%" }}
									styles={{
										cover: {
											padding: 18,
											borderBottom: "1px solid #eee"
										}
									}}
								>
									<Card.Meta title={item.title} description={`$ ${item.price}`} />
								</Card>
							</List.Item>
						</Link>
					)}
				/>
			</Flex>
		);
	}

	return <>{content}</>;
};

export default ProductsList;
