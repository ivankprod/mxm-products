import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from "antd";
import { Header, Footer, Content } from "antd/lib/layout/layout";

import "@/app/globals.css";

import StoreProvider from "@/app/storeProvider";
import ThemeProvider from "@/components/theme";
import Navigation from "@/components/navigation";
import { ResetStateButton } from "@/components/resetStateButton";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	title: "Products",
	description: "Test project for Maxima Online IT School"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={inter.className}>
				<AntdRegistry>
					<ThemeProvider>
						<StoreProvider>
							<Layout style={{ minHeight: "100vh" }}>
								<Header style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-around",
									padding: "0 10%",
									backgroundColor: "#fff", /* т. к. в ThemeProvider не работает */
									boxShadow: "0px 0px 20px #00000010"
								}}>
									<Navigation />
									<ResetStateButton />
								</Header>
								<Content className="content-container">
									{children}
								</Content>
								<Footer style={{
									padding: "24px 148px",
									textAlign: "center"
								}}>
									© {new Date().getFullYear()} Ivan Kulakov
								</Footer>
							</Layout>
						</StoreProvider>
					</ThemeProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
