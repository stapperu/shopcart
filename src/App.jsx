import Navigation from "./components/Navigation"
import Footer from "./components/Footer";
import ProductsList from "./components/ProductsList";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext";


function App() {
	const {cart}=useContext(CartContext);

	return (
	<>
		<Navigation/>
		<ProductsList/>
		<Footer/>
		</>
	);
}

export default App;
