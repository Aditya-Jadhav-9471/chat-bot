// routes/adminRoutes.js
import express from 'express';
import { createAdminOrAgent } from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/verifyAuth.js'; // Middleware to ensure admin role

const router = express.Router();

router.post('/create', verifyAdmin, createAdminOrAgent);

export default router;
