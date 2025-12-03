import express from 'express';
const router = express.Router();
import Lecture from '../models/Lecture.js';
import auth from '../middleware/authMiddleware.js';

// Get lectures for logged-in instructor
router.get('/my-lectures', auth, async (req, res) => {
  try {
    // req.user.id comes from the auth middleware token
    const lectures = await Lecture.find({ instructor: req.user.id })
      .populate('course', 'name level description') // Provide course details
      .sort({ date: 1 }); // Sort by date
      
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;