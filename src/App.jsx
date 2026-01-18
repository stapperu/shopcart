import Navigation from "./components/Navigation.jsx"
import Footer from "./components/Footer.jsx";
import ProductsList from "./components/ProductsList.jsx";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext.jsx";
import Checkout from "./components/Checkout.jsx";
import { Route,Routes } from "react-router";



function App() {
	const {cart}=useContext(CartContext);

	return (
	<>
		<Navigation/>
		<Routes>
			<Route path='/' element={<ProductsList/>} />
			<Route path="/checkout" element={<Checkout />} />
		</Routes>
		<Footer/>
		</>
	);
}

export default App;
