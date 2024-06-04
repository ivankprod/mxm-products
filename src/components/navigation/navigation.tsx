"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "antd";

import styles from "./navigation.module.css";

export const Navigation: React.FC = () => {
	const pathname = usePathname();

	return (
		<Menu
			className={styles.menu}
			theme="light"
			mode="horizontal"
			items={[
				{
					key: "/",
					label: <Link href="/">Главная</Link>
				}, {
					key: "/products",
					label: <Link href="/products">Продукты</Link>
				}
			]}
			selectedKeys={[pathname]}
		/>
	)
};

export default Navigation;
