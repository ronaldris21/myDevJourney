import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ImageMongoMultimedia from "../ImageMongoMultimedia";

function PortfolioSmallView({ product, isAdmin, children }) {
  if (isAdmin == null) isAdmin = false;

  return (
    <div className="shop col-lg-4 col-md-6 col-sm-6" key={product._id}>
      <div className="border-product">
        {children ? children : <></>}

        <Link to={`/products/${product._id}`}>
          <div className="shopBack">
            <ImageMongoMultimedia image={product.image} />
          </div>
        </Link>

        <div className="shoptext">
          <p>
            <strong>{product.category}</strong>
          </p>
          <hr />
          <h3>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h3>

          <p>
            {product.description.length < 200
              ? product.description
              : product.description.substring(0, 200).concat("...")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSmallView;
