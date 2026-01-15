import Navigation from "./components/Navigation.jsx"
import Footer from "./components/Footer.jsx";
import ProductsList from "./components/ProductsList.jsx";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext.jsx";


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
