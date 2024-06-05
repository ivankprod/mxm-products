import { Flex } from "antd";

import ProductInfo from "@/components/productInfo";

interface IProductProps {
	params: {
		id: number;
	};
}

export default function Product({ params }: IProductProps) {
	return (
		<Flex vertical align="center" justify="center" gap="middle" style={{ minHeight: 360 }}>
			<ProductInfo id={params.id} />
		</Flex>
	);
}
