import axios from 'axios';

// ************ PRIVATE APIs ************

// get all orders
const getAllOrders = async (token) => {
  const { data } = await axios.get(`/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get order by id
const getOrderById = async (id, token) => {
  const { data } = await axios.get(`/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create order
const createOrder = async (order, token) => {
  const { data } = await axios.post(`/api/orders`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete order
const deleteOrder = async (id, token) => {
  const { data } = await axios.delete(`/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all orders
const deleteAllOrders = async (token) => {
  const { data } = await axios.delete(`/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// checkout from stripe
const stripePayment = async (datas, token) => {
  const { data } = await axios.post(`/api/orders/checkout`, datas, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// export
export {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  deleteAllOrders,
  stripePayment,
};
