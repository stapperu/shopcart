import Navigation from "./components/Navigation"
import Footer from "./components/Footer";
import ProductsList from "./components/ProductsList";
import { useState, useEffect, useContext } from "react";


function App() {

	return (<>
		<Navigation/>
		<ProductsList/>
		<Footer/>
		</>
	);
}

export default App;
