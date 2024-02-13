import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import MainDrawer from './MainDrawer';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeAllWishListAction,
  removeWishListAction,
} from '../../Redux/Actions/CardAction';
import { MdDelete } from 'react-icons/md';
import { FaShoppingBag, FaShoppingBasket } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { createOrderAction } from '../../Redux/Actions/OrderAction';

function Cart({ cartDrawerOpen, closeCartDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // states
  const {
    wishlists: { wishlist },
    userLogin: { userInfo },
    createOrder: { loading: orderLoading, error: orderError, success, order },
  } = useSelector((state) => state);

  const totalPrices = wishlist?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // remove wishlists
  const removeWishlist = () => {
    dispatch(removeAllWishListAction());
    closeCartDrawer();
  };

  // delete wishlist
  const deleteWishlist = (id) => {
    dispatch(removeWishListAction(id));
  };

  const summery = [
    {
      title: 'Total Products',
      value: wishlist?.length,
    },

    {
      title: 'Total',
      value: `$${totalPrices}`,
    },
  ];

  // place order
  const placeOrderHandler = () => {
    if (!userInfo) {
      navigate('/registation');
      closeCartDrawer();
      return;
    } else {
      dispatch(
        createOrderAction({
          orderItems: wishlist?.map((item) => {
            return {
              product: item?._id,
              name: item?.title,
              qty: item?.quantity,
              image: item?.images[0],
              price: item?.price,
              color: item?.color,
              size: item?.size,
            };
          }),
          totalPrice: totalPrices,
          subTotalPrice: totalPrices,
        })
      );
    }
  };

  // error handling
  useEffect(() => {
    if (orderError) {
      toast.error(orderError);
      dispatch({ type: 'ORDER_CREATE_RESET' });
    }
  }, [orderError, dispatch]);

  // after order is created
  useEffect(() => {
    if (success) {
      navigate(`/order/${order?._id}`);
      dispatch({ type: 'ORDER_CREATE_RESET' });
      // clear cart
      removeWishlist();
    }
  }, [success, dispatch, navigate, order]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainDrawer DrawerOpen={cartDrawerOpen} closeDrawer={closeCartDrawer}>
      <div className="flex flex-col w-full h-full justify-between items-middle bg-white rounded">
        <div className="w-full flex justify-between items-center relative px-5 py-4 border-b bg-deepest border-deepGray">
          <h2 className="font-semibold text-lg m-0 text-heading flex items-center">
            <span className="text-xl mr-2 mb-1">
              <FaShoppingBag className="text-main" />
            </span>
            Cart
          </h2>
          <button
            onClick={closeCartDrawer}
            className="flex-colo p-2 font-medium text-flash bg-white rounded-full hover:bg-main hover:text-white"
          >
            <IoClose />
          </button>
        </div>

        {/* cart items */}
        <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          {wishlist?.length > 0 ? (
            <div className="px-2 space-y-8">
              <div>
                {wishlist?.map((p) => (
                  <div
                    key={p?._id}
                    className="grid grid-cols-8 gap-2 my-6 items-center"
                  >
                    <Link
                      to={`/card/${p._id}`}
                      className="col-span-2 bg-deepGray rounded p-2 h-24 border border-deepest"
                    >
                      <img
                        alt={p?.title}
                        src={p?.images[0]}
                        className="w-full h-full object-cover rounded"
                      />
                    </Link>
                    <div className="col-span-5 flex flex-col text-sm gap-2">
                      <h3 className="truncate">{p?.title}</h3>
                      <h2 className="text-xs text-gray-800">
                        ${p?.price} x {p?.quantity} ={' '}
                        <span className="font-bold">
                          ${p?.price * p?.quantity}
                        </span>
                      </h2>
                    </div>
                    <div className="col-span-1 flex-colo ">
                      <button
                        onClick={() => deleteWishlist(p?._id)}
                        className="flex-colo p-2 text-lg bg-flash rounded text-white"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* summery */}
              <div className="flex flex-col gap-5 py-2">
                {summery.map((s) => (
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm">{s?.title}</h3>
                    <h3 className="text-sm font-bold">{s?.value}</h3>
                  </div>
                ))}
              </div>
              {/* place order */}

              <button
                disabled={orderLoading}
                onClick={() => placeOrderHandler()}
                className="w-full rounded hover:bg-subMain transitions py-3 px-3 bg-main text-sm sm:text-base text-white"
              >
                {orderLoading
                  ? 'Loading...'
                  : userInfo
                  ? 'Place Order'
                  : 'Login to place order'}
              </button>
            </div>
          ) : (
            <div className="flex-colo w-full h-full gap-4">
              <div className="flex-colo w-24 rounded-full h-24 text-main border border-main">
                <FaShoppingBasket className="text-4xl" />
              </div>
              <h1 className="text-sm text-center font-light">
                Your Cart is empty
              </h1>
            </div>
          )}
        </div>
        {/* checkout Button */}
        {wishlist?.length > 0 && (
          <button
            onClick={removeWishlist}
            className="w-full border hover:border-subMain transitions py-3 px-3 border-main flex-rows gap-4 text-sm sm:text-base text-main"
          >
            Clear cart <RiDeleteBin6Fill />
          </button>
        )}
      </div>
    </MainDrawer>
  );
}

export default Cart;
