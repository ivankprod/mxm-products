"use client";

import Image from "next/image";
import { Button, Flex, Rate, Result, Space, Spin } from "antd";

import { useGetProductByIDQuery } from "@/lib/features/api";

import styles from "./productInfo.module.css";

interface IProductInfoProps {
	id: string;
}

export const ProductInfo: React.FC<IProductInfoProps> = ({ id }) => {
	const { data: product, isLoading, isSuccess, isError, error } = useGetProductByIDQuery({ id });

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
			<Flex
				className={styles["product-info"]}
				gap={36}
				align="flex-start"
				style={{ width: "100%" }}
			>
				{product.image && (
					<Image
						width={340}
						height={340}
						sizes="100vw"
						src={product.image}
						priority
						style={{
							padding: 24,
							marginTop: 8,
							backgroundColor: "#fff",
							borderRadius: 12,
							boxShadow: "0px 4px 14px #0000000a",
							objectFit: "contain"
						}}
						alt={product.title}
					/>
				)}
				<Flex vertical gap="large">
					<h1>{product.title}</h1>
					<p>{product.description}</p>
					<h2>$ {product.price}</h2>
					{product.rating && <Rate disabled defaultValue={product.rating.rate} />}
					<Space>
						<Button
							type="primary"
							size="large"
							style={{ padding: "2px 24px 0 24px", height: 48 }}
						>
							В корзину
						</Button>
					</Space>
				</Flex>
			</Flex>
		);
	}

	return <>{content}</>;
};

export default ProductInfo;
