import { Tabs } from "antd";
import type { TabsProps } from "antd";

import ProductsList from "@/components/productsList";
import LocalProductsList from "@/components/localProductsList";

const items: TabsProps["items"] = [
	{
		key: "tab-api",
		label: "Внешние",
		children: <ProductsList />
	}, {
		key: "tab-local",
		label: "Созданные",
		children: <LocalProductsList />
	}
];

export default function Products() {
	return (
		<Tabs
			defaultActiveKey="tab-api"
			items={items}
			centered
			tabBarStyle={{ marginBottom: 24 }}
		/>
	);
}
