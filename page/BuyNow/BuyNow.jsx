import React, { useState, useEffect } from "react";
import "./BuyNow.scss";
import Slider from "../../component/Slider/Slider";
import HomeDetails from "../../component/HomeDetails/HomeDetails";

import { slideOne, slidetwo } from "../../constant/slideOne";
import { Divider } from "@mui/material";

import Option from "../../component/Option/Option";
import SubTotal from "../../component/SubTotal/SubTotal";
import TotalPrice from "../../component/TotalPrice";

function BuyNow() {
  const [cartData, setCartData] = useState([]);
  console.log(cartData);

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Error fetching cart details: ", data.message);
      return;
    } else {
      setCartData(data.carts);
      console.log(data.carts[0]?.productId);
    }
  };
  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartData.length ? (
        <div className="buynow_page">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shoping Card</h1>
              <p className="sel">Sellect All Item</p>
              <span className="leftPrice">Price</span>
              <Divider />

              {cartData.map((item, i) => {
                return (
                  <>
                    <div className="item_container">
                      <img src={item.productId.thumbnail} alt="" />
                      <div className="item_details">
                        <h3> {item.productId.description.slice(0, 50)}</h3>
                        <h3>{item.productId.title}</h3>

                        <h3 className="diffrentPric">
                          Discount : {item.productId.discountPercentage}%
                        </h3>
                        <p className="unusuall">Usually dispatch in 8 days.</p>
                        <p>Eligable for FREE Shipping</p>
                        <Option
                          deleteData={item.productId.id}
                          get={setCartData} 
                        />
                      </div>
                      <h3 className="price">${item.productId.price}</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}
              <TotalPrice item={cartData} />
            </div>
            <div className="right_buy">
              <SubTotal item={cartData} />
            </div>
          </div>
          <HomeDetails data={slideOne} />

          <HomeDetails data={slidetwo} />
          <Slider title="upto 80% off" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BuyNow;
