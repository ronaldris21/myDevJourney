import React from 'react';
import { Link } from 'react-router-dom';

function Products({ product }) {
  return (
    <>
      <div className=" gap-2 rounded-lg p-4 flex-colo bg-white hover:shadow-lg transitions">
        <Link
          to={`/card/${product?._id}`}
          className="p-2 border border-gray-300 rounded-lg w-full h-auto md:h-96 overflow-hidden relative"
        >
          <img
            alt={product?.title}
            src={
              product?.images?.length > 0
                ? product?.images[0]
                : 'https://via.placeholder.com/150'
            }
            className="w-full hover:scale-105 rounded-lg transitions h-full object-cover"
          />
          {product?.salesOffer?.status && (
            <div className="absolute z-10 top-3 text-xs py-1 px-3 font-bold left-3 bg-flash rounded-full text-white">
              {product?.salesOffer?.discount}% OFF
            </div>
          )}
        </Link>

        <h3 className="text-sm mt-2">{product?.title}</h3>
        <h2 className="text-lg font-bold">${product?.price}</h2>
      </div>
    </>
  );
}

export default Products;
