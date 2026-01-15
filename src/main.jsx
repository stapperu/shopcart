import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CartProvider } from "temp.jsx";
import { ProductProvider } from  "./contexts/ProductContext.jsx";
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
