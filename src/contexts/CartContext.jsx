import { createContext, useState, useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { localStock, setLocalStock } = useContext(ProductContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCartTotal(
      new Intl.NumberFormat("pl-PL").format(
        cart.reduce((acc, p) => acc + p.qty * Number(p.price), 0),
      ),
    );
  }, [cart]);

  useEffect(() => {
  setLocalStock(prev => {
    let newStock = { ...prev };
    cart.forEach(item => {
      newStock[item.id] = (newStock[item.id] ?? 0) - item.qty;
    });
    return newStock;
  });
}, []);

  const addToCart = (product, newQty = 1) => {
  setCart(prevCart => {
    const existing = prevCart.find(item => item.id === product.id);
    const currentQty = existing ? existing.qty : 0;
    const available = localStock[product.id] ?? product.quantity ?? 0;

    const finalQty = currentQty + newQty;

    if (finalQty > available) {
      alert(`Cannot add ${newQty} – only ${available - currentQty} more available`);
      return prevCart;
    }

    let newCart;
    if (existing) {
      newCart = prevCart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + newQty } : item
      );
    } else {
      newCart = [...prevCart, { ...product, qty: newQty, quantity: product.quantity }];
    }

    return newCart;
  });

  // Update localStock AFTER
  setLocalStock(prev => ({
    ...prev,
    [product.id]: Math.max(0, (prev[product.id] ?? 0) - newQty)
  }));
};

const changeQuantity = (product, newQty) => {
  let diff = 0;

  setCart(prevCart => {
    return prevCart.map(item => {
      if (item.id !== product.id) return item;

      const oldQty = item.qty;
      const nQty = Math.max(1, Number(newQty));

      // Fresh available from localStock + what we already have in cart
      const currentStock = localStock[product.id] ?? item.quantity ?? 0;
      const combinedAvailable = currentStock + oldQty;

      if (nQty > combinedAvailable) {
        alert(`Cannot set to ${nQty} – only ${combinedAvailable} total available`);
        return item; // keep old qty
      }

      diff = oldQty - nQty; // positive = add back to stock

      return { ...item, qty: nQty };
    });
  });

  // Update localStock AFTER cart is updated
  if (diff !== 0) {
    setLocalStock(prev => ({
      ...prev,
      [product.id]: Math.max(0, (prev[product.id] ?? 0) + diff)
    }));
  }
};

  const removeFromCart = (product) => {
    let qtyToReturn = 0;

    setCart((prevCart) => {
      const item = prevCart.find(i => i.id === product.id);
      if (!item) return prevCart;

      qtyToReturn = item.qty;

      return prevCart.filter(i => i.id !== product.id);
    });

    if (qtyToReturn > 0) {
      setLocalStock(prev => ({
        ...prev,
        [product.id]: (prev[product.id] ?? 0) + qtyToReturn
      }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        changeQuantity,
        cartTotal,
        setCartTotal,
        dropdownActive,
        setDropdownActive,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}