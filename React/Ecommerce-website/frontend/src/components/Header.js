import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/user/userActions";
import DibujitoCanvas from "./homeComponents/DibujitoCanvas";
import { ToastContainer } from "react-toastify";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <>
      {/* Top Header */}
      <ToastContainer />
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+34 655 54 34 22</p>
              <p>info@cybermarket.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <a href="https://es-es.facebook.com/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <div className="logoTAM">
                      <DibujitoCanvas />
                    </div>
                  </Link>

                  <canvas width="50" height="50" id="dibujito"></canvas>

                  <script src="logo.js"></script>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/servicios">
                          Servicios
                        </Link>
                        <Link className="dropdown-item" to="/portfolio">
                          Portfolio
                        </Link>
                        <Link className="dropdown-item" to="/profile">
                          Perfil
                        </Link>
                        {/* ///Menu de de Servicios en caso de que sea Admin */}
                        {userInfo.isAdmin ? (
                          <>
                            <Link className="dropdown-item" to="/admin">
                              Servicios (admin)
                            </Link>
                            <Link className="dropdown-item" to="/admin/orders">
                              Órdenes (admin)
                            </Link>
                          </>
                        ) : (
                          <></>
                        )}

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/servicios">
                          Servicios
                        </Link>
                        <Link className="dropdown-item" to="/portfolio">
                          Portfolio
                        </Link>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                        <Link className="dropdown-item" to="/register">
                          Registro
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Buscar"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                {/* <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link> */}

                <Link className="navbar-brand" to="/">
                  {/* <div className="logoTAM"> */}
                  <DibujitoCanvas className="m-0 p-0" />
                  {/* </div> */}
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <div className="col-md-3 col-4 d-flex align-items-center">
                  <Link to="/servicios">Servicios</Link>
                </div>

                <div className="col-md-3 col-4 d-flex align-items-center">
                  <Link to="/portfolio">Portfolio</Link>
                </div>

                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Buscar"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hola, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Perfil
                      </Link>
                      {userInfo.isAdmin ? (
                        <>
                          <Link className="dropdown-item" to="/admin">
                            Servicios (admin)
                          </Link>
                          <Link className="dropdown-item" to="/admin/orders">
                            Órdenes (admin)
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Registrar</Link>
                    <Link to="/login">Iniciar sesión</Link>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
