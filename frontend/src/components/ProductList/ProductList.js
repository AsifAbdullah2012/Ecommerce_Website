import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/quries";

const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 bg-red-100 text-red-700 p-4 rounded-md">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`http://localhost:4000${product.image_url}`}
              alt={product.name}
              className="h-44 w-full object-contain bg-white p-2"
            />
            <div className="flex-1 p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <p className="text-green-600 font-medium">{product.price} €</p>
            </div>
            <div className="p-4">
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
