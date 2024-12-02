import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { CartItem } from "../../types/cartTypes";

const PaymentComponent = () => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = async () => {
    const storedCart: CartItem[] =
      JSON.parse(localStorage.getItem("cart") || "[]") || [];
    const amount = storedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: {},
      }),
    });
    const order = await response.json();
    const options: RazorpayOrderOptions = {
      key: "rzp_test_0pdjcJqaNptqwP",
      amount: amount, // Amount in paise
      currency: "INR",
      name: "Indian Sweets And Savories",
      description: "Test Transaction",
      order_id: order.id, // Generate order_id on server
      handler: (response) => {
        fetch("http://localhost:5000/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "ok") {
              console.log("Payment successful!");
            } else {
              alert("Payment verification failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Error verifying payment");
          });
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#763A12",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="min-h-full bg-[#F2EEEC] flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#763A12] mb-4 text-center">
          Payment Page
        </h1>
        {isLoading && (
          <p className="text-yellow-500 text-center">Loading Razorpay...</p>
        )}
        {error && (
          <p className="text-red-500 text-center">
            Error loading Razorpay: {error}
          </p>
        )}
        <div className="flex flex-col items-center">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="bg-[#E08600] text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-[#AA4C0A] transition duration-300"
          >
            Pay Now
          </button>
        </div>
        <div className="mt-4">
          <p className="text-center text-[#763A12] text-sm">
            Secure payments powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
