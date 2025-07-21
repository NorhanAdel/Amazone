import React, { useState, useEffect } from "react";
import "./SubTotal.scss";

function SubTotal({item}) {
     const [price, setPrice] = useState(0);
     const totalAmount = () => {
       let price = 0;
       item.map((items) => {
         return (price += items.productId.price);
       });
       setPrice(price);
     };

     useEffect(() => {
       totalAmount();
     }, [item]);
    
  return (
    <div className="subtotal">
      <div className="cost_right">
        <p
          style={{
            color: " rgb(13, 124, 124)",
            fontWeight: 500,
            fontSize: "12px",
          }}
        >
          Your order is eligible for FREE Delivery
        </p>
        <span style={{ color: "#565959", fontWeight: 400 }}>
          Select this option at checkout. Details
        </span>
        <h3 style={{ fontWeight: 500 }}>
          Subtotal ({item.length} item):{" "}
          <span style={{ fontWeight: 700, color: "111" }}>${price}.00</span>{" "}
        </h3>
        <button className="buy_process">Process to Buy</button>
        <div className="emi">Emi available</div>
      </div>
    </div>
  );
}

export default SubTotal;
