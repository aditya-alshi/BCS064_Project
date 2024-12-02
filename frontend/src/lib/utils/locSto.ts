import { CartItem } from "../types/cartTypes";

export const addToCart = (item: CartItem): void => {
    const storedCart = localStorage.getItem('cart');
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
  
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.productId === item.productId);
  
    if (existingItemIndex !== -1) {
      // Update the quantity of the existing item
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // Add the new item to the cart
      cart.push(item);
    }
  
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };