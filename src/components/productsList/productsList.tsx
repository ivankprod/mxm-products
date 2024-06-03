"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, Flex, List, Result, Select, Space, Spin } from "antd";

import { useGetProductsQuery } from "@/lib/features/api";

const PerPageOptions = [
	{ label: "8", value: 8 },
	{ label: "16", value: 16 },
	{ label: "Показать все", value: 20 }
];

export const ProductsList: React.FC = () => {
	const [shown, setShown] = useState(PerPageOptions[0].value);

	const {
		data: products,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetProductsQuery({ limit: shown != 20 ? shown : undefined });

	let content;

	if (isLoading) {
		content = (
			<Flex>
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
			<Flex vertical style={{ width: "80%" }}>
				<Flex style={{ alignSelf: "flex-end", marginBottom: 24 }}>
					<Space>На странице:</Space>
					<Select
						value={shown}
						style={{ width: 160, marginLeft: 12 }}
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
						<List.Item style={{ display: "flex" }}>
							<Card
								key={item.id}
								hoverable
								cover={
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
					)}
				/>
			</Flex>
		);
	}

	return <>{content}</>;
};

export default ProductsList;
