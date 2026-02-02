import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

const ProductsList = () => {
const {products,loading,error}=useContext(ProductContext);
const {changeQuantity,addToCart}=useContext(CartContext);

const checkStockDisplay=(product)=>{ useEffect(()=>{
if(product.quantity<1){return"text-red-800/80 text-xl"} else {return "text-blue-900/60"}
},[cart])
}

    return ( <>
			
			<h2 className="text-center text-xl font-bolder text-blue-900/80 m-5">Browse Products</h2>
      {loading && <p>Loading..</p>}
      {error && <p>{error}</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product)=>(<div className="flex flex-col w-5/6 md:w-auto m-auto mb-3 md:m-3 text-center bg-blue-900/8 border border-gray-300 pt-2 pb-4" key={product.id}>
        <h5 className="self-end font-light text-blue-900/60 mr-5">{product.category}</h5>
        <h2 className="font-bold text-xl md:text-2xl pt-4 p-1">{product.name}</h2>
        <h3 className="text-sm md:text-base m-2">{product.description}</h3>
        <h3 className="text-base font-bold text-blue-600">{product.rating} / 5 *</h3>
        <img className="h-5/6 w-full bg-cover pt-2" src={`./${product.image}`} alt={`${product.name} photo`}/>
        <h3 className="text-xl md:text-2xl pt-6 text-blue-600 font-bold p-3">${new Intl.NumberFormat('pl-PL').format(product.price)}</h3>
       <button className={`p-3 m-auto w-5/6 border border-blue-950 bg-blue-500 text-white font-bold uppercase disabled:bg-gray-300 disabled:border-0`} disabled={product.quantity < 1}
  onClick={product.quantity < 1 ? undefined : ()=>addToCart(product,1)}>Add to Cart</button>
       <p className={`${product.quantity<1 ? "text-red-800/80 text-xl": "text-blue-900/60"} m-3`} >{product.quantity > 70 ? "Full stock" : product.quantity > 30?"Medium stock": product.quantity<1 ? "Out of stock" : "Low on stock" }</p> 
      </div>))}
  </div>
		</> );
}
 
export default ProductsList;