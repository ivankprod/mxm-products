import { Flex } from "antd";

import { auth } from "@/auth";

import { AccessDeniedError } from "@/components/auth";
import ProductAddForm from "@/components/productAddForm";

export default async function ProductAdd() {
	const session = await auth();

	let content!: JSX.Element;

	if (!session) {
		content = <AccessDeniedError />;
	} else {
		content = (
			<>
				<h2>Создать новый продукт</h2>
				<ProductAddForm />
			</>
		);
	}

	return (
		<Flex vertical align="center" gap="middle" style={{ minHeight: 360 }}>
			{content}
		</Flex>
	);
}
