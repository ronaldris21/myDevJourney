import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetDatosGeneralesServicio from "../../components/newServiceComponents/SetDatosGeneralesServicio";
import UploadServiceImagesComponent from "../../components/newServiceComponents/UploadServiceImagesComponent";
import SetPlanesServicio from "../../components/newServiceComponents/SetPlanesServicio";
import {
  newProductDetails,
  newProductPostChanges,
} from "../../Redux/newProduct/NewProductActions";
import Header from "../../components/Header";
import { NEW_PRODUCT_ATTRIBUTE_UPDATE } from "../../Redux/newProduct/NewProductConstants";
import axios from "axios";
import {  toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const NewServiceScreen = ({ history, match }) => {
  window.scrollTo(0, 0);

  ///ProductID _id from URL
  const productId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  if (userLogin?.userInfo?.isAdmin) {
    //Todo bien
  } else {
    history.push("/login?redirect=admin");
  }

  const newProduct = useSelector((state) => state.newProduct);
  const { loading, error, editProduct } = newProduct;

  useEffect(() => {
    dispatch(newProductDetails(productId));
  }, [dispatch]);

  const updateAttributeNewProduct = (atributte, value) => {
    dispatch({
      type: NEW_PRODUCT_ATTRIBUTE_UPDATE,
      payload: { attribute: atributte, value: value },
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [error]);

  const updateProductOnDB = async () => {
    ///PUBLICO LOS CAMBIOS EN LA BASE DE DATOS
    dispatch(newProductPostChanges());

    if (!error) {
      toast.success("Actualizado!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("No es posible subir los cambios " + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const EliminarServicio = async (e) => {
    const options = {
      title: "Eliminar:",
      message: editProduct.name,
      buttons: [
        {
          label: "Sí",
          onClick: async () => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userLogin.userInfo.token}`,
              },
            };
            axios
              .delete(`/api/products/${productId}`, config)
              .then(async (response) => {
                toast.success("servicio eliminado", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                await new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                  }, 3000);
                });

                history.push("/admin");
              })
              .catch((error) => {
                toast.error("No fue posible eliminarlo", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      childrenElement: () => <div />,
      // customUI: ({ onClose }) => <div>Custom UI</div>,
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };

    confirmAlert(options);
  };

  return (
    <>
      <Header />
      <section>
        {/* Submit button */}
          <h1 className="text-center">{editProduct?.name}</h1>
        <div className="d-flex align-items-center justify-content-between container mt-lg-5 mt-3 gap-2">
          <section className="d-flex justify-content-center gap-4">
            <label>
              Público
              <input
                type="checkbox"
                className="m-2"
                checked={editProduct?.isShownInService}
                onChange={() => {
                  updateAttributeNewProduct(
                    "isShownInService",
                    !!!editProduct?.isShownInService
                  );

                  updateProductOnDB();
                }}
              />
            </label>
            <label>
              Portafolio
              <input
                type="checkbox"
                className="m-2"
                checked={editProduct?.isPorfolio}
                onChange={() => {
                  updateAttributeNewProduct(
                    "isPorfolio",
                    !!!editProduct.isPorfolio
                  );
                  updateProductOnDB();
                }}
              />
            </label>
          </section>
          <section className="d-flex gap-3">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={EliminarServicio}
            >
              Eliminar
            </button>
          </section>
        </div>
        <div className="container mt-lg-5 mt-3">
          <div className="row align-items-start">
            {/* Left Menu */}
            <div className="col-lg-2 p-0 shadow ">
              <div className="wizard pt-3 ">
                <div className="d-flex align-items-start">
                  <div
                    className="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Datos Generales
                    </button>
                    <button
                      className="nav-link d-flex justify-content-between"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-imagenes"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-imagenes"
                      aria-selected="false"
                    >
                      Imágenes
                      <span className="badge2">
                        {editProduct?.multimedia
                          ? editProduct.multimedia.length
                          : 0}
                      </span>
                    </button>
                    <button
                      className="nav-link d-flex justify-content-between"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-planes"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Planes
                      <span className="badge2">{3}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* panels formualrios */}
            <div
              className="tab-content col-lg-10 pb-5 pt-lg-0 pt-3 "
              id="v-pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <SetDatosGeneralesServicio />
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-imagenes"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <UploadServiceImagesComponent idService={productId} />
              </div>

              <div
                className="tab-pane fade"
                id="v-pills-planes"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <SetPlanesServicio plans={editProduct?.plans} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewServiceScreen;
