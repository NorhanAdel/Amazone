import React, { useEffect, useState } from "react";
import "./Order.scss";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="font-semibold">Order ID: {order._id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total:</p>
                <p className="text-xl font-bold text-green-700">
                  EGP {order.totalPrice}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 border-t pt-2">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: EGP {item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
