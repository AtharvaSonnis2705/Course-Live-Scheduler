import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// LOGIN Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json(
        { msg: 'Invalid credentials'
         });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET );
    res.json({ 
        token,
        user: { id: user._id, username: user.username, role: user.role }
     });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER Route (For you to create the initial Admin/Instructors)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;