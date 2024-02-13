import { Router } from 'express';
import * as categories from '../Controllers/CategoryContoller.js';
import { protect } from '../middleware/Auth.js';

const router = Router();

router
  .route('/')
  .post(protect, categories.createCategory)
  .get(categories.getCategories);

router
  .route('/:id')
  .put(protect, categories.updateCategory)
  .delete(protect, categories.deleteCategory);

router.route('/import').get(categories.importCategories);

export default router;
