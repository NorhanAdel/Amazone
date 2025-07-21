import React, { useEffect, useState, useContext } from "react";
import "./Navbar.scss";
import IMG from "../../assets/amazon_PNG25.png";
import IMG2 from "../../assets/india.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { CiLocationOn } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";

import { LoginContext } from "../../Context/ContextProvider.js";
import SearchBox from "../SearchBox/SearchBox";

function Navbar() {
  
  
  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();
  const getValidUser = async () => {
    const res = fetch("/uservalite", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (res.status !== 200) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  const logoutUser = async () => {
    const res2 = fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    console.log(data2);
    if (res2.status !== 200) {
      console.log("error");
    } else {
      console.log("data valid");
       toast.warn("User Logout Succesfully", {
         position: "top-center",
       });
      history("/");

      setAccount(false);
      
    }
  };

  useEffect(() => {
    getValidUser();
  }, []);

  const send = () => {
    history("/");
  };
  console.log(`account ${account.users}`);

  return (
    <header>
      <nav>
        <div className="left">
          <Link to="/">
            <div className="navlogo">
              <img src={IMG} alt="logo" />
            </div>
          </Link>
          <div className="navlocation">
            <div className="navbarlocationimg">
              <CiLocationOn />
            </div>
            <div className="navbarlocationplace">
              <div className="navbarlocationtop">Delivery to pun</div>
              <div className="navbarlocationbottom">Update Location</div>
            </div>
          </div>
          <div className="searchbx">
            <SearchBox />
          </div>
        </div>
        <div className="right">
          <div className="indiaCode">
            <img src={IMG2} alt="logo" />
            <div className="indiaCodebelt">EN</div>
          </div>
          <div className="helloNav">
            <Link to="/account">
              <div className="helloTop">Hello,User</div>
              <div className="helloBottom">Account & List</div>
            </Link>
          </div>
          <div className="navbtn">
            <Link to="/login">Signin</Link>
          </div>
          <Link to="/buynow">
            <div className="cart_btn">
              {account ? (
                <NavLink to="/buynow">
                  <Badge
                    badgeContent={account?.users?.carts?.length || 0}
                    color="primary"
                  >
                    <MdOutlineShoppingCart />
                  </Badge>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <MdOutlineShoppingCart />
                  </Badge>
                </NavLink>
              )}
              <ToastContainer />
              <p>Cart</p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
