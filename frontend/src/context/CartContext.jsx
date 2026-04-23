import { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem('cartItems');
    if (items) setCartItems(JSON.parse(items));
  }, []);

  const addToCart = (product, qty = 1, selectedOption = null) => {
    // If a selectedOption is provided, we use it as part of the unique key
    const cartItemId = selectedOption ? `${product._id}-${selectedOption.label}` : product._id;
    const existItem = cartItems.find((x) => x.cartItemId === cartItemId);
    let newItems;
    if (existItem) {
      newItems = cartItems.map((x) =>
        x.cartItemId === cartItemId ? { ...x, qty: x.qty + qty } : x
      );
    } else {
      // Store the option and its price directly in the cart item
      const itemPrice = selectedOption ? selectedOption.price : (product.discountPrice || product.price);
      newItems = [...cartItems, { ...product, cartItemId, qty, selectedOption, itemPrice }];
    }
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    toast.success('Added to cart');
  };

  const updateQty = (cartItemId, change) => {
    const newItems = cartItems.map((x) => {
      if (x.cartItemId === cartItemId || x._id === cartItemId) { // Fallback for old items
        const newQty = x.qty + change;
        return { ...x, qty: newQty > 0 ? newQty : 1 };
      }
      return x;
    });
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
  };

  const removeFromCart = (cartItemId) => {
    const newItems = cartItems.filter((x) => x.cartItemId !== cartItemId && x._id !== cartItemId);
    setCartItems(newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    toast.success('Removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
