import {useContext, useEffect} from "react";
import { CartContext } from "../contexts/CartContext";

const CartDropdown = () => {
    const {cart,setCart}=useContext(CartContext);
let cartTotal=0;
    return (
        <>
        <div className="absolute top-0 right-0  p-3 m-4 mt-20 bg-white border border-gray-500">
{
    cart.map((product)=> {return (
<div className="mb-4 text-xl" key={product.id}>
<p>{product.name}</p>
<div className="flex justify-between"><p className="font-bold p-2">{product.qty}<span className="font-normal"> x {product.price}</span></p> <span className="pl-3 pr-3 p-2 font-bold" onClick={()=>setCart(cart.filter((item)=>item.id !== product.id))}>x</span></div>

</div>
    )}
    )
}
<hr className=" mt-4"></hr>
<p className="font-bold text-lg">Total: {cart.reduce((acc, p) => acc + p.qty * p.price, 0).toFixed(2)} </p>
        </div>
        </>
      );
}
 
export default CartDropdown;