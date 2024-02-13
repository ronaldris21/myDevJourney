import React, { useEffect } from "react";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/product/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import PortfolioSmallView from "./PortfolioSmallView";

const PortfolioSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();

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

  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <h3 className="titulos_services">{props.tittle}</h3>
          <div className="col-lg-12 col-md-12 article">
            <div className="shopcontainer row justify-content-center">
              {loading ? (
                <div className="mb-5">
                  <Loading />
                </div>
              ) : error ? (
                <Message variant="alert-danger">{error}</Message>
              ) : (
                <>
                  <h3 className="titulos_services">Portfolio</h3>
                  {/* SERVICES */}

                  {products.map((product) =>
                    product.isPorfolio === true ? (
                      <PortfolioSmallView
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
  );
};

export default PortfolioSection;
