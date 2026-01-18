import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [cartTotal,setCartTotal] = useState(0);
	const [cart, setCart] = useState(() => {
		const storedCart = localStorage.getItem("cart");
		return storedCart ? JSON.parse(storedCart):[];
	});
	const [dropdownActive, setDropdownActive] = useState(false);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	useEffect(() => {
				setCartTotal( new Intl.NumberFormat("pl-PL").format(
							cart.reduce((acc, p) => acc + p.qty * Number(p.price), 0),
						));
	}, [cart]);

const addToCart = (product) => {
		setCart((prevCart) => {
			const existing = prevCart.find((item) => item.id === product.id);
			if (existing) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, qty: item.qty + 1 } : item
				);
			}
			return [...prevCart, { ...product, qty: 1 }];
		});
	};

	const removeFromCart = (product) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
		// setCart(cart.filter((item)=>item.id !== product.id));
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				addToCart,
				cartTotal,
				setCartTotal,
				dropdownActive,
				setDropdownActive,
				removeFromCart,
             
			}}
		>
			{children}
		</CartContext.Provider>
	);
}
