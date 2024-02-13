import Order from '../Models/OrderModel.js';
import Products from '../Models/ProductsModel.js';
import expressAsyncHandler from 'express-async-handler';
import EmailSender from '../middleware/Nodemailer.js';

// @desc Create a new order
// @route POST /api/shop/orders
// @access Private

const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const { orderItems, subTotalPrice, totalPrice } = req.body;

    const order = new Order({
      orderItems,
      user: req.user._id,
      subTotalPrice,
      totalPrice,
    });

    // reduce stock of ordered products
    orderItems.forEach(async (item) => {
      const product = await Products.findById(item.product);
      product.stock = product.stock - item.qty;
      await product.save();
    });

    // TODO: send email to admin if product is out of stock

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get user orders
// @route GET /api/shop/orders/
// @access Private

const getUserOrders = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    // get total orders
    const totalOrders = await Order.countDocuments({ user: req.user._id });
    // get pending orders
    const pendingOrders = await Order.countDocuments({
      user: req.user._id,
      'payments.status': 'pending',
    });
    // get completed orders
    const completedOrders = await Order.countDocuments({
      user: req.user._id,
      'payments.status': 'completed',
    });
    // get cancelled orders
    const cancelledOrders = await Order.countDocuments({
      user: req.user._id,
      'payments.status': 'cancelled',
    });
    res.json({
      orders,
      total: totalOrders,
      pending: pendingOrders,
      completed: completedOrders,
      cancelled: cancelledOrders,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete order
// @route DELETE /api/shop/orders/:id
// @access Private

const deleteOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (order) {
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get order by id
// @route GET /api/shop/orders/:id
// @access Private

const getOrderById = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'fullName email phone'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete all orders
// @route DELETE /api/shop/orders
// @access Private

const deleteAllOrders = expressAsyncHandler(async (req, res) => {
  try {
    await Order.deleteMany({
      user: req.user._id,
    });
    res.json({ message: 'Orders removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Update order to paid
// From stripe webhook
// @access Private

const updateOrderToPaid = async (customer, data) => {
  // find order
  const order = await Order.findById(customer?.metadata?.orderId);
  // if order exists update payment status to completed and save shipping info from stripe
  if (order) {
    order.payments.status =
      data?.payment_status === 'paid'
        ? 'completed'
        : data?.payment_status === 'canceled'
        ? 'cancelled'
        : 'pending';
    order.payments.paymentMethod = 'Stripe';
    order.payments.paymentDate = Date.now();
    order.totalPrice = data.amount_total / 100;
    order.subTotalPrice = data.amount_subtotal / 100;
    order.shippingAddress = {
      fullName: data.customer_details?.name,
      email: data.customer_details?.email,
      address: `Line1: ${data.shipping?.address?.line1}, Line2: ${data.shipping?.address?.line2}, Postal Code : ${data.shipping?.address?.postal_code}, State: ${data.shipping?.address?.state}`,
      location: `${data.shipping?.address?.city}, ${data.shipping?.address?.country}`,
      phoneNumber: data.customer_details?.phone,
      shippingMethod:
        data.total_details?.amount_shipping === 1500
          ? 'Express shipping'
          : data.total_details?.amount_shipping === 4500
          ? 'Premium shipping'
          : 'Free shipping',
      shippingCost: data.total_details?.amount_shipping / 100,
    };
    // save order
    await order.save();
    // send email to user
    EmailSender({
      email: customer.metadata.email
        ? customer.metadata.email
        : data.customer_details?.email,
      subject: "Your order's payment status has been updated",
      order: {
        status: true,
        orderUrl: `${process.env.CLIENT_URL}/order/${customer.metadata.orderId}`,
        products: order.orderItems,
        subTotal: data.amount_subtotal / 100,
        shippingCost: data.total_details?.amount_shipping / 100,
        totalPrice: data.amount_total / 100,
        taxPrice: 0,
        siteName: 'OnlineShop',
        url: process.env.CLIENT_URL,
      },
    });
  } else {
    console.log('Order not found');
  }
};

// export all order controllers
export {
  createOrder,
  getUserOrders,
  deleteOrder,
  getOrderById,
  deleteAllOrders,
  updateOrderToPaid,
};
