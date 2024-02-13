import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removefromcart } from "../Redux/cart/cartActions";
import { useParams } from "react-router";
import ImageMongoMultimedia from "../components/ImageMongoMultimedia";

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();
  const planName = location.search ? location.search.split("=")[1] : "Básico";
  const productId = match.params.id != null ? match.params.id : "";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.price, 0).toFixed(2);

  useEffect(() => {
    console.log(productId);
    if (productId) {
      console.log(productId);
      console.log(planName);
      dispatch(addToCart(productId, planName));
    }
  }, [dispatch, productId, planName]);

  const checkOutHandler = () => {
    history.push("/login?redirect=payment");
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  const updatePlanSelectedHandler = (idProduct, e) => {
    const scrollPosition = window.pageYOffset;
    dispatch(addToCart(idProduct, e.target.value));
    window.scrollTo(0, scrollPosition);
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Tu carro está vacio
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              Comprar ahora
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Productos totales del carro
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <div className="cart-iterm row" key={item.product}>
                <div
                  onClick={() => removeFromCartHandle(item.product)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <ImageMongoMultimedia image={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>PLAN</h6>
                  <select
                    value={item.planSelected}
                    onChange={(e) => updatePlanSelectedHandler(item.product, e)}
                  >
                    <option value="Básico">Básico</option>
                    <option value="Estándar">Estándar</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>PRECIO</h6>
                  <h4>{item.price}€</h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">TOTAL:</span>
              <span className="total-price">€{total}</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continuar comprando</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>Checkout</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
