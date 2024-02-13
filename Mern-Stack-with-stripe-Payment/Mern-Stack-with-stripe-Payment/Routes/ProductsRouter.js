import { Router } from 'express';
import * as products from '../Controllers/ProductsController.js';
import { protect } from '../middleware/Auth.js';

const router = Router();

router
  .route('/')
  .post(protect, products.createProduct)
  .get(products.getProducts);
router
  .route('/:id')
  .get(products.getProductById)
  .put(protect, products.updateProduct)
  .delete(protect, products.deleteProduct);
router.route('/all/tags').get(products.getPopularTags);
router.route('/import/all').get(products.importProducts);

export default router;
