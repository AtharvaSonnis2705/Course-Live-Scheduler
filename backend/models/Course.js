import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
});

export default mongoose.model('Course', CourseSchema);