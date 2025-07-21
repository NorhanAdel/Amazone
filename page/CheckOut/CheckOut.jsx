import { useState } from "react";
import CheckOutForm from "../../component/CheckOutForm/CheckOutForm";
import PaymentMethod from "../../component/PaymentMethod/PaymentMethod";
import "./CheckOut.scss";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handlePlaceOrder = async () => {
    try {
      // إرسال بيانات الفورم
      const shippingAddress = formData;
      const paymentMethod = "Credit Card"; // أو قم بتخزين هذه القيمة بناءً على اختيارات المستخدم

      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const response = await fetch("/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // للتأكد من إرسال الكوكيز مع الطلب
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      alert("Order placed successfully!");
      window.location.href = `/order/${data._id}`; // توجيه المستخدم لصفحة عرض الأوردر
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <CheckOutForm setFormData={setFormData} />
        <PaymentMethod />
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Your Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
