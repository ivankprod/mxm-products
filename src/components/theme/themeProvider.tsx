"use client";

import { ConfigProvider } from "antd";

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "inherit",
					fontSize: 16
				},
				components: {
					Layout: {
						headerBg: "#fff" /* Не работает, хотя должно */
					}
				}
			}}
		>
			{children}
		</ConfigProvider>
	);
};

export default ThemeProvider;
