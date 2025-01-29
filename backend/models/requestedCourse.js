import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  st_email: {
    type: String,
    required: true,
  },
    prof_email: {
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
    status: {
        type: String,
        required: true,
    },
});

const requestedCourse = mongoose.model('requestedCourse', CourseSchema);
export default requestedCourse;