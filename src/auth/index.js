import express from 'express';
import setupLocal from './local/setup';
import local from './local';

const router = express.Router();

// Passport Configuration
setupLocal();

router.use('/local', local);

export default router;
