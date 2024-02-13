import React from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import IsAdminOnlyVisible from "../components/IsAdminOnlyVisible";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Página no encontrada</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/not-found.png"
            alt="Not-found"
          />
          <IsAdminOnlyVisible>
            <Link
              to="/"
              className="text-white text-decoration-none text-center mt-5"
            >
              <button className="btn btn-success px-5 py-2">Home page</button>
            </Link>
          </IsAdminOnlyVisible>
        </div>
      </div>
    </>
  );
};

export default NotFound;
