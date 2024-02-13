import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const {
        orderItems,
        // shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        // shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
        return;
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          // shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          // shippingPrice,
          totalPrice,
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
      }
    } catch (error) {
      next(error);
    }
  })
);

// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    console.log("ADMIN ---> ALL ORDERS");
    try {
      const orders = await Order.find({})
        .sort({ _id: -1 })
        .populate("user", "id name email");
      res.json(orders);
    } catch (error) {
      next(error);
    }
  })
);
// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
      res.json(order);
    } catch (error) {
      next(error);
    }
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );

      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order Not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      console.table(["order", order]);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404);
        throw new Error("Order Not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// ORDER IS DELIVERY
orderRouter.put(
  "/:id/delivered",
  protect,
  admin,
  asyncHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404);
        throw new Error("Order Not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

// ORDER IS PAID
orderRouter.put(
  "/:orderId/product/:productId/review",
  protect,
  asyncHandler(async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      const productId = req.params.productId;

      if (!orderId || !productId) throw new Error("Faltan parametros");

      const order = await Order.findById(orderId);
      
      console.table([orderId, productId, order]);
      if (order) {
        order.orderItems.map((items) => {
          if (items.product == productId) items.hasReview = true;
        });

        const updatedOrder = await order.save();
        console.log(updatedOrder);
        res.json(updatedOrder);
      } else {
        console.log("ERROR");

        res.status(404);
        throw new Error("Order Not Found");
      }
    } catch (error) {
      next(error);
    }
  })
);

export default orderRouter;
