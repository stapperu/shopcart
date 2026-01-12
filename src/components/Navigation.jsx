import { useContext } from "react";
import { cartContext } from "../contexts/cartContext";
import shoppingCart from "../assets/cart-shopping-thin.svg";
const Navigation = () => {
const cart = useContext(cartContext);
let value=0;


    return (
<>

<div className="flex flex-row align-middle"><h1 className="mb-auto w-full ml-2 m-auto text-4xl text-blue-950 uppercase font-bold border-b-2">I.Shop</h1>
<div className={`w-22 h-22 justify-self-end p-3 m-4`}><img className="w-full h-full" src={shoppingCart} alt="shopping cart icon" title="FontAwsome" />{value > 0 && (<span className="text-white block relative w-7 h-7 bottom-17 left-5 bg-blue-400 rounded-full text-center text-base font-bold">{value}</span>) }</div>

</div>

</>

      );
}
 
export default Navigation ;