import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    // Automatically set the role to 'user' in the backend, no role should be passed from the client
    req.body.role = 'user';  // Default role is 'user'
    await register(req, res);
  } catch (err) {
    res.status(500).json({ message: 'Error in registration' });
  }
});

// Login route
router.post('/login', login);  // Login route, no change needed

export default router;
