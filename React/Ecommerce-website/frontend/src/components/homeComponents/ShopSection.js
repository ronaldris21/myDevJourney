import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/product/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { ProductoSmallView } from "./ProductoSmallView";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const [categorySelected, setCategorySelected] = useState("all");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  const userLogin = useSelector((state) => state.userLogin);

  ////Validar si es admin
  let isAdmin = false;
  if (userLogin != null)
    if (userLogin?.userInfo?.isAdmin) isAdmin = userLogin?.userInfo.isAdmin;


  const changeCategoryHandler = (e, categoryName) => {
    e.preventDefault();
    setCategorySelected(categoryName);
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <h3 className="titulos_services">{props.tittle}</h3>

            <div class="tiposServicios">
              <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container justify-content-center">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <button
                        id="separ"
                        type="button"
                        class="btn btn-light active"
                        onClick={(e) => changeCategoryHandler(e, "all")}
                      >
                        Todos los tipos
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        id="separ"
                        type="button"
                        class="btn btn-light"
                        onClick={(e) => changeCategoryHandler(e, "Website")}
                      >
                        Website
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        id="separ"
                        type="button"
                        class="btn btn-light"
                        onClick={(e) => changeCategoryHandler(e, "Mobile")}
                      >
                        Mobile
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        id="separ"
                        type="button"
                        class="btn btn-light"
                        onClick={(e) => changeCategoryHandler(e, "Desktop")}
                      >
                        Desktop
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="col-lg-12 col-md-12 article mt-4">
              <div className="shopcontainer row justify-content-center">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) =>
                      product.isShownInService === true &&
                      (categorySelected === "all" ||
                        product.category === categorySelected) ? (
                        <ProductoSmallView
                          product={product}
                          isAdmin={isAdmin}
                          key={product._id}
                        />
                      ) : (
                        <></>
                      )
                    )}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
