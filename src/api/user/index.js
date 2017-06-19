import express from 'express';
import * as controller from './user.controller';
import { isAuthenticated, hasRole, verify } from '../../auth/auth.service';

const router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);

router.get('/activate', isAuthenticated(), controller.activateUser);

router.get('/me', isAuthenticated(), controller.getUser);

router.get('/:id', controller.getUser);

export default router;
