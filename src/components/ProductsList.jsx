import { useState, useEffect, useContext } from "react";

const ProductsList = () => {

const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`http://localhost:3000/products`);
				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}
				const data = await res.json();
				setProducts(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);



    return ( <>
			
			<h2 className="text-center text-xl font-bolder text-blue-900/80 m-5">Browse Products</h2>
      {loading && <p>Loading..</p>}
      {error && <p>{error}</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product)=>(<div className="flex flex-col w-5/6 md:w-auto m-auto mb-3 md:m-3 text-center bg-blue-900/10 border border-gray-300 pt-2 pb-4" key={product.id}>
        <h5 className="self-end font-light text-blue-900/60 mr-5">{product.category}</h5>
        <h2 className="font-bold text-xl md:text-2xl pt-4 p-1">{product.name}</h2>
        <h3 className="text-sm md:text-base m-2">{product.description}</h3>
        <h3 className="text-base font-bold text-blue-600">{product.rating} / 5 *</h3>
        <img className="h-5/6 w-full bg-cover pt-2" src={`./src/${product.image}`} alt={`${product.name} photo`}/>
        <h3 className="text-xl md:text-2xl pt-6 text-blue-600 font-bold p-3">${product.price}</h3>
       <p className={`${product.quantity<1 ? "text-red-800/80 text-xl": "text-blue-900/60"}`} >{product.quantity > 70 ? "Full stock" : product.quantity > 30?"Medium stock": product.quantity<1 ? "Out of stock" : "Low on stock" }</p> 
      </div>))}
  </div>
		</> );
}
 
export default ProductsList;