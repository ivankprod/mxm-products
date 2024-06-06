import { Flex } from "antd";

import ProductAddForm from "@/components/productAddForm";

export default function ProductAdd() {
	return (
		<Flex vertical align="center" gap="middle" style={{ minHeight: 360 }}>
			<h2>Создать новый продукт</h2>
			<ProductAddForm />
		</Flex>
	);
}
