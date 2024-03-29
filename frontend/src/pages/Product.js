import React, { useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { mobile } from "../responsive";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../reducers/cart/cart";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../components/logContext";
import { useContext } from "react";




const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid");
  const AuthStr = "Bearer ".concat(token);
  const cart = localStorage.getItem("cart")
  const products = useSelector((state) => state.cart);




  useEffect(() => {
    console.log(AuthStr);
    console.log(uid);
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/product/${id}`)
        setProduct(res.data[0]);
        console.log(res.data[0]);
        console.log(user);
      } catch {}
    };
    getProduct();
    
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if(user){
      dispatch(
        addProduct({ ...product, quantity, color, size })
      );
      // localStorage.setItem("cart", [...products,product]);
      try {
        axios.post('http://localhost:8080/cart', { userId: uid,
        products: [{productId: product._id}] },
        {
          headers: { token: AuthStr },
        }).then((res) => {
            console.log(res)
        })
      } catch {}
      Swal.fire({
        icon: "success",
        title: `Product Added to Cart`,
      });
    }
    else{
      Swal.fire({
        icon: "warning",
        title: `Please login first`,
      });
    setTimeout(() => {
        navigate("/login", { replace: true });
        // window.location.reload()
      }, 2000);
      
    }
   
  };

  const updateCart = () => {
    if(user){
      dispatch(
        addProduct({ ...product, quantity, color, size })
      );
      try {
        axios.put(`http://localhost:8080/cart/${uid}`, 
        {
        products: {product}
       },
        {
          headers: { token: AuthStr },
        }).then((res) => {
            console.log(res)
        })

        // const res = await axios.post(`http://localhost:8080/cart/`)
        // setProduct(res.data[0]);
        // console.log(res.data[0]);
        // console.log(user);
      } catch {}
      Swal.fire({
        icon: "success",
        title: `Product Added to Cart`,
      });
    }
    else{
      Swal.fire({
        icon: "warning",
        title: `Please login first`,
      });
    setTimeout(() => {
        navigate("/login", { replace: true });
        // window.location.reload()
      }, 2000);
    }
  }

  return (
    <div>
      <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button> 
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
    </div>
  );
};

export default Product;
