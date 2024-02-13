import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../Redux/order/OrderActions";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../Redux/order/OrderConstants";
import ImageMongoMultimedia from "../components/ImageMongoMultimedia";
import { toast } from "react-toastify";
import { createProductReview } from "../Redux/product/ProductActions";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const [sdkReady, setSdkReady] = useState(false);
  const [priceNoTax, setPriceNoTax] = useState(0);
  const [cantLoadingSDK, setCantLoadingSDK] = useState(0);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const email = useSelector((state) => state.userLogin.userInfo.email);
  const isAdmin = useSelector((state) => state.userLogin.userInfo.isAdmin);
  const { loading: loadingPay, success: successPay } = orderPay;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const [comment, setComment] = useState("");
  const [projectReview, setProjectReview] = useState("");
  const [cantReviewMissing, setCantReviewMissing] = useState(0);
  const [rating, setRating] = useState(0);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    const addPayPalScript = async () => {
      // const { data: clientId } = await axios.get("/api/config/paypal");
      // const script = document.createElement("script");
      // script.type = "text/javascript";
      // script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      // script.async = true;
      // script.onload = () => {
      //   setSdkReady(true);
      // };
      // document.body.appendChild(script);
      console.log("SDK READY");
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    setPriceNoTax(addDecimals(order?.totalPrice - order?.taxPrice));
    let countReviewsMissing = 0;
    order?.orderItems.map((item) => {
      if (item.hasReview === false) countReviewsMissing++;
    });
    setCantReviewMissing(countReviewsMissing);
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (projectReview === "") return;

    dispatch(
      createProductReview(projectReview, orderId, {
        rating,
        comment,
      })
    );

    if (!error) {
      toast.success("Review Creada!", {
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
      toast.error(
        "No es posible hacer la review en estos momentos:  " + error,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const payOrderNowHandler = (paymentResult) => {
    // Ejemplo de objeto con valores
    const examplePaymentResult = {
      id: "123456789",
      status: "completed",
      update_time: Date.now(),
      email_address: email,
    };
    dispatch(payOrder(orderId, examplePaymentResult));

    if (!error) {
      toast.success("Orden Pagada!", {
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
      toast.error("No es posible pagar en estos momentos:  " + error, {
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

  const setOrderFinishedHandler = () => {
    dispatch(deliverOrder(orderId));

    if (!error) {
      toast.success("Orden Entregada!", {
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
      toast.error("No es posible entregar en estos momentos:  " + error, {
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

  const updateCommentHandler = (e) => {
    const scrollPosition = window.pageYOffset;
    setComment(e.target.value);
    window.scrollTo(0, scrollPosition);
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* HACER UNA REVIEW */}
        <div>
          {cantReviewMissing === 0 ? (
            <h3>¡Muchas gracias por darnos tu opinión!</h3>
          ) : (
            <>
              {order?.isPaid && (
                <div>
                  <h6 className="text-center">Escribe una review</h6>
                  <div className="my-4">
                    {loadingCreateReview && <Loading />}
                    {errorCreateReview && (
                      <Message variant="alert-danger">
                        {errorCreateReview}
                      </Message>
                    )}
                  </div>
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="my-4">
                        <strong>Servicio a valorar</strong>
                        <select
                          value={projectReview}
                          onChange={(e) => setProjectReview(e.target.value)}
                          className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        >
                          <option value="">Selecciona un servicio</option>
                          {order.orderItems.map((serviceItem) =>
                            !serviceItem.hasReview ? (
                              <option
                                key={serviceItem.product}
                                value={serviceItem.product}
                              >
                                {serviceItem.name}
                              </option>
                            ) : null
                          )}
                        </select>
                      </div>
                      <div className="my-4">
                        <strong>Valoración</strong>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        >
                          <option value="5">5 - Excelente</option>
                          <option value="4">4 - Muy bien</option>
                          <option value="3">3 - Bien</option>
                          <option value="2">2 - Mal</option>
                          <option value="1">1 - Muy mal</option>
                        </select>
                      </div>
                      <div className="my-4">
                        <strong>Comentarios</strong>
                        <textarea
                          rows="3"
                          value={comment}
                          onChange={updateCommentHandler}
                          className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        ></textarea>
                      </div>
                      <div className="my-3">
                        <button
                          disabled={loadingCreateReview}
                          className="col-12 bg-black border-0 p-3 rounded text-white"
                        >
                          ENVIAR VALORACIÓN
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="my-3">
                      <Message variant="alert-warning">
                        Por favor{" "}
                        <Link to="/login">
                          <strong>Login</strong>
                        </Link>{" "}
                        para escribir una review.
                      </Message>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* /// FACTURA */}

        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Cliente</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Información de compra</strong>
                    </h5>
                    <p>Método de pago: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="bg-primary p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Pagado: {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          No pagado
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Datos de entrega:</strong>
                    </h5>
                    {order.isDelivered ? (
                      <div className="bg-primary p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Entregado en: {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          No entregado
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Tu pedido esta vacio.
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <ImageMongoMultimedia
                            image={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>PLAN</h4>
                          <h6>{item.planSelected}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>SUBTOTAL</h4>
                          <h6>{item.price} €</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Productos</strong>
                      </td>
                      <td>{priceNoTax} €</td>
                    </tr>
                    {/* <tr>
                      <td>
                        <strong>Envío</strong>
                      </td>
                      <td>{order.shippingPrice}€</td>
                    </tr> */}
                    <tr>
                      <td>
                        <strong>Impuestos</strong>
                      </td>
                      <td>{order.taxPrice} €</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>{order.totalPrice} €</td>
                      {/* <td>{order?.isPaid ? "xddd" : "sdfsfsd"}€</td> */}
                    </tr>

                    {order?.isPaid === false ? (
                      <tr>
                        <td colSpan="2">
                          <button type="button" on onClick={payOrderNowHandler}>
                            {" "}
                            Pagar
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}

                    {isAdmin && order?.isDelivered === false ? (
                      <tr>
                        <td colSpan="2">
                          <button
                            type="button"
                            on
                            onClick={setOrderFinishedHandler}
                          >
                            {" "}
                            Marcar Terminado
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                {!order.isPaid && (
                  <div className="col-12">
                    {/* {loadingPay && <Loading />}
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )} */}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
