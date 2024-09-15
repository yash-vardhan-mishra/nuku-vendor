import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, className }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const openProduct = () => {
    console.log('what is this', product);

    navigate('/product', { state: { product } });

  };

  if (product) {
    return (
      <div
        className={twMerge(
          "flex flex-col justify-between gap-5 border border-gray-300 p-4",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="overflow-hidden">
            <img
              className={`aspect-square w-full  cursor-pointer object-contain transition duration-500 ease-out ${isHovered && "scale-110"}`}
              src={product.image_url}
              alt={product.name}
              onClick={() => openProduct()}
            />
          </div>
          <span className="p-2 text-sm font-bold uppercase">
            {product.category}
          </span>
        </div>
        <div className="p-2">
          <h3
            className={`text-xs font-semibold ${isHovered && "text-gray-500"}`}
          >
            {product.name}
          </h3>
          <div className="mt-5 flex items-center">
            <div className="relative">
              <span className="block bg-yellow-300 p-2 pr-4 text-xs font-bold">
                {product.price} NZD
              </span>
              <span className="absolute left-full top-0 -ml-2 block h-full w-3 skew-x-12 bg-yellow-400"></span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductCard;
