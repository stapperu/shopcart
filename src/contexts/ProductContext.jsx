import { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();

export function ProductProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	//initialized, then fills localStock with a copy of products state so it can track and modify the amount of products moved to the cart without impacting the real stock
	const [localStock, setLocalStock] = useState({});

	useEffect(() => {
		if (products.length === 0) return;
		const stockCopy = products.reduce((localstock, product) => {
			localstock[product.id] = product.quantity;
			return localstock;
		}, {});
		setLocalStock(stockCopy);
	}, [products]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`data/db.json`);
				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}
				const data = await res.json();
				setProducts(data.products || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<ProductContext.Provider value={{ products, localStock, setLocalStock }}>
			{children}
		</ProductContext.Provider>
	);
}
