import { Router } from 'express';

import { createUser, listUsers } from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createUserSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/', listUsers);
router.post('/', validate(createUserSchema), createUser);

export default router;
