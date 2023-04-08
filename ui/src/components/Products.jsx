import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ sort, size, color, cat }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await publicRequest.get(
        cat ? `products?category=${cat}` : `products`
      );
      setProducts(res.data);
    };
    fetchProducts();
  }, [cat]);
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.color.indexOf(color) !== -1)
    );
  }, [color, products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.size.indexOf(size) !== -1)
    );
  }, [size, products]);

  useEffect(() => {
    if (sort === "new") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  console.log(filteredProducts);

  return (
    <Container>
      {cat
        ? filteredProducts.length === 0
          ? products.map((item) => <Product item={item} key={item._id} />)
          : filteredProducts.map((item) => (
              <Product item={item} key={item._id} />
            ))
        : products
            .slice(0, 4)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
