import { useRef, useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import Checkout from "./Checkout.jsx";
import { Link } from "react-router";
import { useLocation } from "react-router";

const CartDropdown = () => {
	const { cart, setCart, cartTotal,setCartTotal, dropdownActive, setDropdownActive, removeFromCart } =
		useContext(CartContext);

	const [selectField, setselectField] = useState("");

	const changeQuantity = (productId, newQty) => {
		const qty = Math.max(1, Number(newQty));
		setCart((prevCart) =>
			prevCart.map((item) => (item.id === productId ? { ...item, qty } : item)),
		);
	};
	useEffect(() => {
		if (cart.length === 0 ) {
			setDropdownActive(false);
		}
	}, [cart]);

	const dropdownRef = useRef(null);
	useEffect(() => {
		if (!dropdownActive) return;
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};

	
	}, [dropdownActive, setDropdownActive]);

		
	return dropdownActive ? (
	
			<div
				className="absolute top-0 right-0  p-3 m-4 mt-20 bg-white border border-gray-500"
				ref={dropdownRef}
			>
				{cart.map((product) => {
					return (
						<div className="mb-4 p-3 text-2xl" key={product.id}>
							<p>{product.name}</p>
							<div className="flex justify-between">
								<p className="font-bold p-3">
									{product.qty}
									<span className="font-normal"> x {product.price}</span>
								</p>
								<div className="flex justify-between h-8 self-center border border-blue-600">
									<label htmlFor={`qty-${product.id}`} className="sr-only">
										Quantity for {product.name}
									</label>
									<input
										className="bg-blue-50 inline-block w-20 border-t border-blue-800"
										type="text"
										id={`qty-${product.id}`}
										onChange={(e) => changeQuantity(product.id, e.target.value)}
									/>
									<div className="flex justify-evenly self-center bg-gray-200 border-none">
										<select
											className="w-8 content-center focus:bg-gray-150 hover:bg-gray-250 opacity-20"
											name="qty"
											id={product.id}
											value={selectField}
											onChange={(e) => {
												if (e.target.value !== "") {
													changeQuantity(product.id, e.target.value);
													setselectField("");
												}
											}}
										>
											<option value=""></option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</div>
								</div>
								<span
									className="h-10 pl-3 pr-3 p-2 self-center ml-6 cursor-pointer text-sm text-red-700"
									onClick={() => removeFromCart(product)}
								>
									remove
								</span>
							</div>
						</div>
					);
				})}
				<hr className=" mt-4"></hr>
				<div className="flex justify-between">
					<p className="font-bold text-2xl text-blue-800 ">
						Total:{" "}
						{cartTotal}{" "}
					</p>
					<Link
						to="/checkout" onClick={(e)=>{e.stopPropagation();setDropdownActive(false)}}
						className="px-5 pb-1 text-2xl font-bold bg-blue-800 text-white"
					>
						Checkout
					</Link>
				</div>
			</div>
	) : null;
};

export default CartDropdown;
