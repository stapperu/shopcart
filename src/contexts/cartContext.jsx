import {createContext,useState,useContext} from "react";
import { ProductContext } from "./ProductContext";

export const CartContext=createContext();

export function CartProvider({children}){
const [cart,setCart]=useState([]);
const {loading,error}=useContext(ProductContext);







return (
    <CartContext.Provider value={{cart,setCart}}>
        {children}
    </CartContext.Provider>
)
}

