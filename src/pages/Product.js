import React from "react";

const Products = () => {
  const product = {
    name: "Sample Product",
    description: "This is a sample product description.",
    price: "$19.99",
    imageUrl: "https://example.com/sample-product-image.jpg",
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "300px" }}
      />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default Products;
