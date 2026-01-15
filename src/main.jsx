import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ProductProvider } from  "./contexts/ProductContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import App from "./App.jsx";



createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ProductProvider>
			<CartProvider>
			<App />
			</CartProvider>
		</ProductProvider>
	</StrictMode>
);
