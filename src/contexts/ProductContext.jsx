import { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();

export function ProductProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
    
    return( <ProductContext.Provider value={{products,loading,error}}>
    {children}
    </ProductContext.Provider>
)
}