import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PostNewService from "../../components/newServiceComponents/PostNewService";
import { listProduct } from "../../Redux/product/ProductActions";
import { ProductoSmallView } from "../../components/homeComponents/ProductoSmallView";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ServicesAdminScreen = ({ location, history }) => {
  ///SI NO ES ADMIN NO PUEDE ESTAR ACA, hay que redireccionarlo

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (userInfo?.isAdmin) {
    //Todo bien
  } else {
    history.push("/login");
  }

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const createNewProduct = async (e) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <PostNewService config={config} history={history} />;
      },
    });
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
        <h4 className="text-center">Panel de control</h4>

        <button
          type="button"
          className="btn btn-primary position-absolute top-0 end-0 mx-2"
          onClick={createNewProduct}
        >
          {" "}
          Agregar Servicio
        </button>
      </section>
      <>
        <div className="container">
          <div className="section">
            <div className="row">
              <h3 className="titulos_services">Todos los servicios y portafolios</h3>

              <div className="col-lg-12 col-md-12 article">
                <div className="shopcontainer row">
                  {products.map((product) => (
                    <ProductoSmallView
                      product={product}
                      isAdmin={isAdmin}
                      key={product._id}
                    >
                      <div className="d-flex justify-content-end p-2 position-relative">
                        <section className="m-0 p-2">
                          <label for="isPorfolio">
                            <input
                              type="checkbox"
                              name="isPorfolio"
                              checked={product.isPorfolio}
                            />
                            Portafolio
                          </label>
                          <br></br>
                          <label for="isShownInService">
                            <input
                              type="checkbox"
                              name="isShownInService"
                              checked={product.isShownInService}
                            />
                            Público
                          </label>
                        </section>
                        <Link to={`/edit-service/${product._id}`}>
                          <button className="btn btn-primary " type="button">
                            Editar
                          </button>
                        </Link>
                      </div>
                    </ProductoSmallView>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ServicesAdminScreen;
