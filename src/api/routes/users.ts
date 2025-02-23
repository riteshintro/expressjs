import { Router } from 'express';
import { getUsers, createUser } from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/create', createUser);

export default router;