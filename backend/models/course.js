import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;