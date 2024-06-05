"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "antd";

export const Navigation: React.FC = () => {
	const pathname = usePathname();

	return (
		<Menu
			theme="light"
			mode="horizontal"
			items={[
				{
					key: "/",
					label: <Link href="/">Главная</Link>
				},
				{
					key: "/products",
					label: <Link href="/products">Продукты</Link>
				}
			]}
			selectedKeys={["/" + pathname.split("/")[1]]}
			style={{ minWidth: 0, flex: "auto", fontSize: 20 }}
		/>
	);
};

export default Navigation;
