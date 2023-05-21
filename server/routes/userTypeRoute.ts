import { Router } from 'express';
import { getUsersTypes } from '../controllers/userTypeController copy';

const router = Router();

router.get('/', getUsersTypes);

export default router;
