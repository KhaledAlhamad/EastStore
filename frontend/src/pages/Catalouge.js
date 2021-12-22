import React from "react";
import styled from "styled-components";
import Navbar from "../components/Header/Header";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Catalogue = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState('')
  const [sort, setSort] = useState('latest')

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  console.log(filters);
  return (
    <div>
      <Container>
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="color" onChange={handleFilters}>
              <Option disabled>Color</Option>
              <Option>white</Option>
              <Option>black</Option>
            </Select>
            <Select name="size" onChange={handleFilters}>
              <Option disabled>Size</Option>
              <Option>41</Option>
              <Option>42</Option>
              <Option>43</Option>
              <Option>44</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="latest">Latest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products  cat={cat} filters={filters} sort={sort}/>
      </Container>
    </div>
  );
};

export default Catalogue;
