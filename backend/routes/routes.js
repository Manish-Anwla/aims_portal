import express from 'express';
import { check_email } from '../controllers/email_checking.js';
import { addCourse, getCourses} from '../controllers/course_controller.js';
import { getEnrolledCourses, getOfferedCourses, getEnrolledStudents } from '../controllers/student.js';
import { addEnrolledCourses } from '../controllers/student.js';
import { getRequestedCourses } from '../controllers/student.js';
import { addRequestedCourses } from '../controllers/student.js';
import { updateRequestedCourses } from '../controllers/student.js';
import { getEnrollmentRequests } from '../controllers/student.js';

const router = express.Router();

router.post('/check-email', check_email);

router.post('/courses', addCourse); // Ensure this endpoint is correct
router.get('/courses', getCourses);

router.get('/stdEnrolledCourses', getEnrolledCourses);
router.post('/stdEnrolledCourses', addEnrolledCourses);

router.get('/stdRequestedCourses', getRequestedCourses);
router.post('/stdRequestedCourses', addRequestedCourses);
router.patch('/stdRequestedCourses', updateRequestedCourses);

router.get('/stdOfferedCourses', getOfferedCourses);

router.get('/enrollment-requests', getEnrollmentRequests);

router.get('/enrolled-students', getEnrolledStudents);

export default router;