import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { UserContext } from "../logContext";
import { useContext } from "react";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../../responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Header = () => {
  const { user } = useContext(UserContext);
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div>
      <Container>
        <Wrapper>
          <Left>
            <Logo>
              <Link to="/">
                <img
                  src="https://www.freepnglogos.com/uploads/running/running-icon-transparent-running-images-vector-8.png"
                  width="50"
                  alt="running icon transparent running images vector"
                />
              </Link>
            </Logo>
          </Left>
          <Right>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>SHOP</MenuItem>
            </Link>

            {/* <Link to="/signup" style={{ textDecoration: 'none' , color: 'black'}}><MenuItem>SIGN UP</MenuItem></Link> */}
            {user ? (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>{user.username}</MenuItem>
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>LOG IN</MenuItem>
              </Link>
            )}
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  <ShoppingCartOutlined />
                </Link>
              </Badge>
            </MenuItem>
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Header;
