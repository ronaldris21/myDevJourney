import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { dateFormat } from '../Context/Functionalty';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderAction } from '../Redux/Actions/OrderAction';

function Table({ dashboard, datas }) {
  const Head = 'text-xs font-semibold px-6 py-2 uppercase';
  const Text = 'px-5 text-sm py-3 leading-6 whitespace-nowrap';
  const badge = ' py-1 px-2 rounded-full text-xs font-semibold';
  const dispatch = useDispatch();

  // states
  const {
    deleteOrder: { error },
    getAllOrders: { error: allError },
  } = useSelector((state) => state);

  // delete order
  const deleteHandler = (id) => {
    if (window.confirm('This order will be deleted!')) {
      dispatch(deleteOrderAction(id));
    }
  };

  // error handler
  useEffect(() => {
    if (error || allError) {
      toast.error(error || allError);
      dispatch({ type: error ? 'ORDER_DELETE_RESET' : 'ORDER_LIST_RESET' });
    }
  }, [error, allError, dispatch]);

  // rows
  const Rows = ({ order }) => {
    return (
      <tr>
        <td className={`${Text} font-medium`}>{order?._id?.slice(6, 15)}</td>
        <td className={`${Text} text-center`}>
          {dateFormat(order?.createdAt)}
        </td>

        <td className={`${Text} text-center`}>
          {order?.payments?.paymentMethod
            ? order?.payments?.paymentMethod
            : '---'}
        </td>
        <td className={`${Text} text-center`}>
          {order?.payments?.status === 'completed' && (
            <span className={`${badge} text-green-600 bg-green-100`}>
              {order?.payments?.status}
            </span>
          )}
          {order?.payments?.status === 'pending' && (
            <span className={`${badge} text-star bg-orange-100`}>
              {order?.payments?.status}
            </span>
          )}
          {order?.payments?.status === 'cancelled' && (
            <span className={`${badge} text-flash bg-red-100`}>
              {order?.payments?.status}
            </span>
          )}
        </td>
        <td className={`${Text} font-bold text-center`}>
          ${order?.totalPrice}.00
        </td>
        <td className={`${Text} float-right flex gap-2`}>
          {!dashboard && (
            <button
              onClick={() => deleteHandler(order?._id)}
              className="border text-flash border-flash rounded flex-colo w-6 h-6"
            >
              <RiDeleteBinLine />
            </button>
          )}

          <Link
            to={`/order/${order?._id}`}
            className="border text-main border-main rounded flex-colo w-6 h-6"
          >
            <GoEye />
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full relative overflow-hidden overflow-x-scroll">
      <table className="table-auto min-w-full border border-deepest divide-y divide-gray-200">
        <thead>
          <tr className="bg-deepest">
            <th scope="col" className={`${Head} text-left`}>
              ID
            </th>
            <th scope="col" className={`${Head} text-center`}>
              Date
            </th>

            <th scope="col" className={`${Head} text-center`}>
              Method
            </th>
            <th scope="col" className={`${Head} text-center`}>
              Payment Status
            </th>
            <th scope="col" className={`${Head} text-center`}>
              Total
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-deepest">
          {dashboard
            ? datas
                ?.slice(0, 5)
                ?.map((order) => <Rows key={order?._id} order={order} />)
            : datas?.map((order) => <Rows key={order?._id} order={order} />)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
