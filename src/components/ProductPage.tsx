import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  discountPercentage: number;
  stock: number;
  brand: string;
  images: string[];
}

const ProductPage = () => {
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          //   navigate("/"); // Redirect to home on error
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  if (!product && loading) {
    return <h1 className="w-full my-8">Loading...</h1>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded "
      >
        Back
      </button>

      <img
        src={product?.images[0]}
        alt={product?.title}
        className="w-[50%] h-auto mb-5"
      />

      <h1 className="text-2xl mb-4 font-bold">{product?.title}</h1>

      <div className="mb-4 text-gray-700 w-[70%]">{product?.description}</div>

      <div className="flex">
        <p>Price: £{product?.price}</p>

        <p className="ml-10">Rating: {product?.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
