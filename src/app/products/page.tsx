import { Tabs } from "antd";

import { auth } from "@/auth";

import ProductsList from "@/components/productsList";
import LocalProductsList from "@/components/localProductsList";

export default async function Products() {
	const session = await auth();

	return (
		<Tabs
			defaultActiveKey="tab-api"
			items={[
				{
					key: "tab-api",
					label: "Внешние",
					children: <ProductsList />
				},
				{
					key: "tab-local",
					label: "Созданные",
					children: <LocalProductsList loggedIn={ session ? true : false } />
				}
			]}
			centered
			tabBarStyle={{ marginBottom: 24 }}
		/>
	);
}
