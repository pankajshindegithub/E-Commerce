import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // 1️⃣ Initialize cart from localStorage
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 2️⃣ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  // 3️⃣ Add to cart
  const addToCart = (product) => {
    if (!product) return;

    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity updated in cart!");
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  };

  // 4️⃣ Update quantity
  const updateQuantity = (productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") newUnit += 1;
            if (action === "decrease") newUnit -= 1;

            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  // 5️⃣ Delete item
  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.error("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
