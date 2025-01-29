import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCourses, addCourse, getEnrolledCourses, getRequestedCourses, getOfferedCourses, addRequestedCourses } from '../service/api';
import styles from './student-dashboard.module.css';

export default function StudentDashboardPage() {
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [requestedCourses, setRequestedCourses] = useState([]);
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('enrolled'); // 'enrolled', 'requested', 'offered'
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

  useEffect(() => {
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

    const fetchEnrolledCourses = async () => {
      if (email) {
        try {
          const enrolledCoursesData = await getEnrolledCourses(email);
          setEnrolledCourses(enrolledCoursesData);
        } catch (error) {
          console.error('Failed to fetch enrolled courses:', error);
        }
      }
    };

    const fetchRequestedCourses = async () => {
      if (email) {
        try {
          const requestedCoursesData = await getRequestedCourses(email);
          setRequestedCourses(requestedCoursesData.requested_courses);
        } catch (error) {
          console.error('Failed to fetch requested courses:', error);
        }
      }
    };

    const fetchOfferedCourses = async () => {
      if (email) {
        try {
          const offeredCoursesData = await getOfferedCourses(email);
          setOfferedCourses(offeredCoursesData.offered_courses);
        } catch (error) {
          console.error('Failed to fetch offered courses:', error);
        }
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
    fetchRequestedCourses();
    fetchOfferedCourses();
  }, [email]);

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
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const handleRequestEnrollment = async (course) => {
    try {
      const newRequestedCourse = {
        st_email: email,
        prof_email: course.email,
        courseName: course.courseName,
        department: course.department,
        courseDescription: course.courseDescription,
        status: 'pending',
      };
      console.log('Requesting enrollment for course:', newRequestedCourse); // Debugging log
      const addedRequestedCourse = await addRequestedCourses(newRequestedCourse);
      console.log('Requested course added:', addedRequestedCourse); // Debugging log
      setRequestedCourses([...requestedCourses, addedRequestedCourse]);
      setOfferedCourses(offeredCourses.filter(c => c._id !== course._id));
    } catch (error) {
      console.error('Failed to request enrollment:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.email}>{email}</div>
        <div className={styles.coursesButton} onClick={() => setView('enrolled')}>Enrolled Courses</div>
        <div className={styles.coursesButton} onClick={() => setView('requested')}>Requested Courses</div>
        <div className={styles.coursesButton} onClick={() => setView('offered')}>Offered Courses</div>
      </div>
      <h1 className={styles.title}>Student Dashboard</h1>
      {view === 'enrolled' && (
        <div className={styles.enrolledCourses}>
          <h2>Enrolled Courses</h2>
          <ul>
            {enrolledCourses.map((course) => (
              <li key={course._id}>
                <h3>{course.courseName}</h3>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Description:</strong> {course.courseDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'requested' && (
        <div className={styles.enrolledCourses}>
          <h2>Requested Courses</h2>
          <ul>
            {requestedCourses.map((course) => (
              <li key={course._id}>
                <h3>{course.courseName}</h3>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Description:</strong> {course.courseDescription}</p>
                <p><strong>Professor Email:</strong> {course.prof_email}</p>
                <p><strong>Status:</strong> {course.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {view === 'offered' && (
        <div className={styles.enrolledCourses}>
          <h2>Offered Courses</h2>
          <ul>
            {offeredCourses.map((course) => (
              <li key={course._id}>
                <h3>{course.courseName}</h3>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Description:</strong> {course.courseDescription}</p>
                <p><strong>Professor Email:</strong> {course.email}</p>
                <button className={styles.requestButton} onClick={() => handleRequestEnrollment(course)}>Request for Enrollment</button>
              </li>
            ))}
          </ul>
        </div>
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