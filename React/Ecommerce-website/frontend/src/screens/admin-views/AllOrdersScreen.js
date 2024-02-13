import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {  useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Orders from "../../components/profileComponents/Orders";
import axios from "axios";

const AllOrdersScreen = ({ location, history }) => {
  ///SI NO ES ADMIN NO PUEDE ESTAR ACA, hay que redireccionarlo

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (userInfo?.isAdmin) {
    //Todo bien
  } else {
    history.push("/login");
  }

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    setLoading(true);
    await axios
      .get(`/api/orders/all`, config)
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);

      });
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  ////Validar si es admin
  let isAdmin = false;
  if (userLogin != null)
    if (userLogin?.userInfo?.isAdmin) isAdmin = userLogin?.userInfo.isAdmin;

  return (
    <>
      <Header />
      <section className="position-relative container">
        <h1 className="text-center">Vista de administrador</h1>
        <h4 className="text-center">Todas las órdenes</h4>
      </section>
      <>
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col-lg-12 col-md-12 article">
                <div className="shopcontainer row">
                  <Orders orders={orders} loading={loading} error={error} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AllOrdersScreen;
