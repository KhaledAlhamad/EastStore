import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./logContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const Cart = () => {
  // const {params} = props.product
  const { state } = useLocation();
  const [product, setProduct] = useState("");
  const {user, setUser }= useContext(UserContext)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      if(!user.id) return;
      console.log(user.id);
    axios.get(`http://localhost:8080/order/${user.id}`).then((res) => {
      setProduct(res.data);
    //   setLoading(false);
    });
    // console.log(state);
  }, [user]);
  if (loading) {
    return (
        <div className="sweet-loading">
      <ClipLoader loading={loading} css={override} size={150} />
    </div>
    );
  }
  return <div></div>;
};

export default Cart;
