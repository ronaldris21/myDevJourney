import { Router } from 'express';

import * as UserController from '../Controllers/UserController.js';
import { protect } from '../middleware/Auth.js';

const router = Router();

router.get('/import/all', UserController.importUsers);
router.post('/', UserController.registerUser);
router.post('/login', UserController.login);
router.put('/', protect, UserController.updateProfile);
router.delete('/', protect, UserController.deleteUser);
router.put('/password', protect, UserController.changePassword);

export default router;
