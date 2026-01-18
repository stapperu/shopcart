import { useContext } from "react";
import {  CartContext } from "../contexts/CartContext.jsx";
import shoppingCart from "../assets/cart-shopping-thin.svg";
import CartDropdown from "./CartDropdown.jsx";
import ProductsList from "./ProductsList.jsx";
import { useLocation,Link } from "react-router-dom";

const Navigation = () => {
    const location=useLocation();
const {cart,cartTotal,dropdownActive,setDropdownActive} = useContext(CartContext);

const cartCounter=cart.reduce((acc,item)=>acc+item.qty,0);



    return (
<>

<div className="nav flex flex-row align-middle"><h1 className="mb-auto w-full ml-2 m-auto text-4xl text-blue-950 uppercase font-bold border-b-2">I.Shop</h1>
<div className={`cartIcon w-21 h-21 justify-self-end p-3 m-4 cursor-pointer` } onClick={(e)=>{e.stopPropagation();setDropdownActive(!dropdownActive)}}><img className="w-full h-full" src={shoppingCart} alt="shopping cart icon" title="FontAwsome" />{cart.length > 0 && (<span className="text-white block relative w-7 h-7 bottom-17 left-5 bg-blue-500 rounded-full text-center text-base font-bold">{cartCounter}</span>) }</div>
{dropdownActive ? <CartDropdown/> : null}
</div>

{location.pathname !== '/'? <Link
						to="/"
						className="px-5 pb-1 text-2xl font-bold bg-blue-800 text-white"
					>
						 Go Back
					</Link> :"" }
</>

      );
}
 
export default Navigation ;