import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCourses, addCourse, getEnrollmentRequests, updateRequestedCourses, getEnrolledStudents } from '../service/api';
import styles from './prof-dashboard.module.css';

export default function ProfDashboardPage() {
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('offered'); // 'offered', 'requests', 'enrolled'
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get email from query parameters
    const { email: queryEmail } = router.query;
    if (queryEmail) {
      setEmail(queryEmail);
      // Store email in localStorage for future use
      localStorage.setItem('email', queryEmail);
    } else {
      // Fallback to email stored in localStorage
      const storedEmail = localStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [router.query]);

  const fetchCourses = async () => {
    if (email) {
      try {
        const coursesData = await getCourses(email);
        setCourses(coursesData.courses); // Ensure coursesData is correctly accessed
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    }
  };

  const fetchEnrollmentRequests = async () => {
    if (email) {
      try {
        const requestsData = await getEnrollmentRequests(email);
        setEnrollmentRequests(requestsData.requests);
      } catch (error) {
        console.error('Failed to fetch enrollment requests:', error);
      }
    }
  };

  const fetchEnrolledStudents = async (course) => {
    if (email) {
      try {
        const enrolledData = await getEnrolledStudents(email, course.courseName);
        setEnrolledStudents(enrolledData);
        setSelectedCourse(course);
        setView('enrolled');
      } catch (error) {
        console.error('Failed to fetch enrolled students:', error);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollmentRequests();
  }, [email]);

  const refreshData = async () => {
    await fetchCourses();
    await fetchEnrollmentRequests();
  };

  const handleAddCourse = async () => {
    try {
      const newCourse = {
        courseName,
        department,
        courseDescription,
        email,
      };
      console.log('Adding course:', newCourse); // Debugging log
      const addedCourse = await addCourse(newCourse);
      console.log('Course added:', addedCourse); // Debugging log
      setCourses([...courses, addedCourse]);
      setShowModal(false);
      setCourseName('');
      setDepartment('');
      setCourseDescription('');
      await refreshData();
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const handleUpdateRequest = async (request, status) => {
    try {
      const updatedRequest = {
        ...request,
        status,
      };
      console.log(`Updating request for course: ${request.courseName} to ${status}`); // Debugging log
      await updateRequestedCourses(updatedRequest);
      await refreshData();
    } catch (error) {
      console.error(`Failed to update request to ${status}:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.email}>{email}</div>
        <div className={styles.coursesButton} onClick={() => setView('offered')}>Offered Courses</div>
        <div className={styles.enrollmentRequestsButton} onClick={() => setView('requests')}>Enrollment Requests</div>
        <div className={styles.addCourse} onClick={() => setShowModal(true)}>Add Course</div>
      </div>
      <h1 className={styles.title}>Professor Dashboard</h1>
      {view === 'offered' && (
        <>
          <h2>Offered Courses</h2>
          <ul className={styles.courseList}>
            {courses.map((course) => (
              <li key={course._id} className={styles.courseItem}>
                <h3>{course.courseName}</h3>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Description:</strong> {course.courseDescription}</p>
                <button className={styles.viewEnrolledButton} onClick={() => fetchEnrolledStudents(course)}>View Enrolled Students</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {view === 'requests' && (
        <>
          <h2>Enrollment Requests</h2>
          <ul className={styles.courseList}>
            {enrollmentRequests.map((request) => (
              <li key={request._id} className={styles.courseItem}>
                <h3>{request.courseName}</h3>
                <p><strong>Student Email:</strong> {request.st_email}</p>
                <p><strong>Department:</strong> {request.department}</p>
                <p><strong>Description:</strong> {request.courseDescription}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <button className={styles.acceptButton} onClick={() => handleUpdateRequest(request, 'accepted')}>Accept</button>
                <button className={styles.rejectButton} onClick={() => handleUpdateRequest(request, 'rejected')}>Reject</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {view === 'enrolled' && selectedCourse && (
        <>
          <button className={styles.backButton} onClick={() => setView('offered')}>Back</button>
          <h2>Course Details</h2>
          <div className={styles.courseDetails}>
            <h3>{selectedCourse.courseName}</h3>
            <p><strong>Department:</strong> {selectedCourse.department}</p>
            <p><strong>Description:</strong> {selectedCourse.courseDescription}</p>
          </div>
          <h2>Enrolled Students</h2>
          <ul className={styles.courseList}>
            {enrolledStudents.map((student, index) => (
              <li key={student._id} className={styles.courseItem}>
                <h3>{index + 1}. {student.st_email}</h3>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className={`${styles.modal} ${showModal ? styles.show : ''}`}>
        <div className={styles['modal-content']}>
          <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
          <h2>Add New Course</h2>
          <div className={styles['form-group']}>
            <label>Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <label>Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <label>Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
          </div>
          <button className={styles.button} onClick={handleAddCourse}>Add Course</button>
        </div>
      </div>
    </div>
  );
}