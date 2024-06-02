import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout } from "antd";
import { Header, Footer, Content } from "antd/lib/layout/layout";

import "@/app/globals.css";

import ThemeProvider from "@/components/theme";
import Navigation from "@/components/navigation";

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
						<Layout style={{ height: "100vh" }}>
							<Header style={{
								display: "flex",
								alignItems: "center",
								padding: 0,
								backgroundColor: "#fff" /* т. к. в ThemeProvider не работает */
							}}>
								<Navigation />
							</Header>
							<Content style={{
								display: "flex",
								justifyContent: "center",
								padding: "48px 148px"
							}}>
								{children}
							</Content>
							<Footer style={{
								padding: "24px 148px",
								textAlign: "center"
							}}>
								© {new Date().getFullYear()} Ivan Kulakov
							</Footer>
						</Layout>
					</ThemeProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
