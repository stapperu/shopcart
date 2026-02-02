import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CartProvider } from "./contexts/CartContext.jsx";
import { ProductProvider } from  "./contexts/ProductContext.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";



createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter basename="/shopcart/">
		<ProductProvider>
			<CartProvider>
			<App />
			</CartProvider>
		</ProductProvider>
		</BrowserRouter>
	 </StrictMode>
);
