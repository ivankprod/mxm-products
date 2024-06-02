import StoreProvider from "@/app/storeProvider";

import ProductsList from "@/components/productsList";

export default function Products() {
	return (
		<StoreProvider>
			<ProductsList />
		</StoreProvider>
	);
}
