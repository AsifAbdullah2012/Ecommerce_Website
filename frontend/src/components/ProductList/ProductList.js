import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/quries";

const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading)
    return <p className="text-center text-lg">Loading products...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300"
          >
            <img
              src={`http://localhost:4000${product.image_url}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-green-600 font-bold">{product.price} €</p>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
