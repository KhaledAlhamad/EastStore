import React from 'react'
import styled from "styled-components";
import { categories } from "../../data";
import Item from "../Item/Item";
// import '../Category/Category.css'
import { mobile } from "../../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;


const Category = () => {
    
    return (
      <Container>
      {categories.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </Container>
    )
}

export default Category
