import { Flex } from "antd";

import ProductUpdateForm from "@/components/productUpdateForm";

interface IProductEditProps {
	params: {
		id: string;
	};
}

export default function ProductEdit({ params }: IProductEditProps) {
	return (
		<Flex vertical align="center" gap="middle" style={{ minHeight: 360 }}>
			<h2>Редактировать продукт</h2>
			<ProductUpdateForm productID={params.id} />
		</Flex>
	);
}
