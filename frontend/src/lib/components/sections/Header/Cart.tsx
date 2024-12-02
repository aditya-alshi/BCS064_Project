import React, { useState, useEffect } from "react";
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import { CartItem } from "../../../types/cartTypes";
import { proceedToCheckOut } from "../../../data/orderAPI";

export async function action() {
  const storedCart: CartItem[] =
    JSON.parse(localStorage.getItem("cart") || "[]") || [];
  const totalAmount = storedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const response = await proceedToCheckOut({ cart: storedCart, totalAmount });

  if (response.message) {
    return redirect("/checkout");
  }

  return response || "";
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const actioData = (useActionData() as string) || "";

  console.log(cart);
  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
    setCart(storedCart);
  }, []);

  // Function to remove an item from the cart
  const deleteItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item removed from cart!");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#F2EEEC] p-4 m-4 rounded shadow">
      <p>{actioData}</p>
      <h1 className="text-center text-4xl mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-4xl text-[#AA4C0A]">
          Your cart is empty!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-[#E08600] rounded">
            <thead className="bg-[#EFBF38]">
              <tr>
                <th className="border border-[#E08600] px-4 py-2 text-left">
                  Product Name
                </th>
                <th className="border border-[#E08600] px-4 py-2 text-left">
                  Quantity
                </th>
                <th className="border border-[#E08600] px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-[#E08600] px-4 py-2 text-left">
                  Total
                </th>
                <th className="border border-[#E08600] px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item.productId}
                  className="odd:bg-[#F5DE7A] even:bg-[#F2EEEC]"
                >
                  <td className="border border-[#E08600] px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-[#E08600] px-4 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-[#E08600] px-4 py-2">
                    ₹{item.price}
                  </td>
                  <td className="border border-[#E08600] px-4 py-2">
                    ₹{item.quantity * item.price}
                  </td>
                  <td className="border border-[#E08600] px-4 py-2">
                    <button
                      className="bg-[#E08600] hover:bg-[#AA4C0A] text-white py-1 px-3 rounded"
                      onClick={() => deleteItem(item.productId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h2 className="text-right text-2xl mt-4">
        Total Price: <span className="text-[#f1a208]">₹{totalPrice}</span>
      </h2>
      <div className="text-right mt-4">
        {cart.length > 0 && (
          <Form method="post">
            <button
              className="bg-[#E08600] hover:bg-[#AA4C0A] text-white py-2 px-4 rounded"
              type="submit"
            >
              Proceed to Checkout
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
