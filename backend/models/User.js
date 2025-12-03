import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Will be hashed
  role: { 
    type: String, 
    enum: ['admin', 'instructor'], 
    default: 'instructor' 
  }
});

export default mongoose.model('User', UserSchema);