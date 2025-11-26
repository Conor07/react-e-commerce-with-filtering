import React from "react";
import { Link } from "react-router-dom";

type BookCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const BookCard: React.FC<BookCardProps> = ({ id, title, image, price }) => {
  return (
    <div className="border p-4 rounded">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-32 object-cover mb-2"
        />

        <h2 className="font-bold">{title}</h2>

        <p className="text-gray-700 font-bold">${price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default BookCard;
