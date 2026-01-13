import {createContext,useState,useContext} from "react";
import { ProductContext } from "./ProductContext";

export const CartContext=createContext();

export function CartProvider({children}){
const [cart,setCart]=useState([]);
const [cartCount,setCartCount]=useState(0);
const [dropdownActive,setDropdownActive]=useState(false);


const addToCart=(product)=>{
    setCartCount((prev)=> prev+1);
  setCart((prevCart)=>{
const existing =prevCart.find((item)=>item.id ===product.id);
if(existing){
    return prevCart.map((item)=> item.id === product.id ? {...item,qty:item.qty+1} : item);
}
return [...prevCart,{...product,qty:1}]
  });
}

const removeFromCart=(product)=>{};

const previewCart=()=>{
setDropdownActive(true);

}




return (
    <CartContext.Provider value={{cart,setCart,addToCart,previewCart,cartCount,setCartCount,dropdownActive,setDropdownActive}}>
        {children}
    </CartContext.Provider>
)
}

