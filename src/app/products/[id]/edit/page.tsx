import { Flex } from "antd";

import { auth } from "@/auth";

import { AccessDeniedError } from "@/components/auth";
import ProductUpdateForm from "@/components/productUpdateForm";

interface IProductEditProps {
	params: {
		id: string;
	};
}

export default async function ProductEdit({ params }: IProductEditProps) {
	const session = await auth();

	let content!: JSX.Element;

	if (!session) {
		content = <AccessDeniedError />;
	} else {
		content = (
			<>
				<h2>Редактировать продукт</h2>
				<ProductUpdateForm productID={params.id} />
			</>
		);
	}

	return (
		<Flex vertical align="center" gap="middle" style={{ minHeight: 360 }}>
			{content}
		</Flex>
	);
}
