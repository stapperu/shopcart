import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import dogeImg from "../assets/doge.png"

const Checkout = () => {
const {cart,cartTotal} = useContext(CartContext);


    return ( <>
    <div className="min-h-screen">
        <img src={dogeImg} alt="doge begging" className="h-100 w-100 m-auto" />
   <h1 className=" text-3xl font-bold text-center">Please give ${cartTotal} money</h1> 
   </div>
    </> );
}
 
export default Checkout;