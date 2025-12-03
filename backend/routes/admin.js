import express from 'express';
const router = express.Router();
import Course from '../models/Course.js';
import  User from '../models/User.js';
import Lecture from '../models/Lecture.js';
import auth from '../middleware/authMiddleware.js';

// 1. Add Course
router.post('/add-course', auth, async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    const newCourse = new Course({ name, level, description, image });
    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/courses', auth, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get All Instructors
router.get('/instructors', auth, async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }).select('-password');
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Assign Lecture (THE MAIN LOGIC)
router.post('/assign-lecture', auth, async (req, res) => {
  try {
    const { courseId, instructorId, date } = req.body;
    
    // Normalize date to avoid time mismatches (set time to 00:00:00)
    const lectureDate = new Date(date);
    lectureDate.setHours(0, 0, 0, 0);

    // CHECK CONFLICT: Look for any lecture with same instructor and same date
    const existingLecture = await Lecture.findOne({
      instructor: instructorId,
      date: lectureDate
    });

    // "The admin panel shouldn't allow the instructor to be assigned to any other lecture on that date" [cite: 14]
    if (existingLecture) {
      return res.status(400).json({ 
        msg: `Instructor is already occupied on ${lectureDate.toDateString()}` 
      });
    }

    // If no conflict, create lecture
    const newLecture = new Lecture({
      course: courseId,
      instructor: instructorId,
      date: lectureDate
    });
    
    await newLecture.save();
    
    // Link lecture to course
    await Course.findByIdAndUpdate(courseId, { $push: { lectures: newLecture._id } });

    res.json({ msg: 'Lecture assigned successfully', lecture: newLecture });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;