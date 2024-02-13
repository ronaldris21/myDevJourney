import { Router } from 'express';
import * as OrdersController from '../Controllers/OrderController.js';
import { protect } from '../middleware/Auth.js';

const router = Router();

router
  .route('/')
  .post(protect, OrdersController.createOrder)
  .get(protect, OrdersController.getUserOrders)
  .delete(protect, OrdersController.deleteAllOrders);

router
  .route('/:id')
  .delete(protect, OrdersController.deleteOrder)
  .get(protect, OrdersController.getOrderById);

export default router;
