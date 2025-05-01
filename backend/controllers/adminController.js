// controllers/adminController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const createAdminOrAgent = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Ensure only 'admin' can create admin or agent
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const newUser = new User({ name, email, password, role });

    await newUser.save();
    res.status(201).json({ message: `${role} created successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { createAdminOrAgent };
