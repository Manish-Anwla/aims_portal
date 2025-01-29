import enrolledcourse from "../models/enrolledCourse.js";
import requestedcourse from "../models/requestedCourse.js";
import Course from "../models/course.js";

export const getEnrolledCourses = async (req, res) => {
    const { email } = req.query;
    console.log(`Received email to fetch enrolled courses: ${email}`);
  
    try {
      const trimmedEmail = email.trim().toLowerCase();
      console.log(`Trimmed and lowercased email: ${trimmedEmail}`);
  
      const enrolled_courses = await enrolledcourse.find({ st_email: trimmedEmail });
      console.log(`Database query result: ${enrolled_courses}`);
  
      res.status(200).json({ enrolled_courses });
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      res.status(500).json({ error: 'Failed to fetch enrolled courses' });
    }
};

export const addEnrolledCourses = async (req, res) => {
    const { st_email, prof_email, courseName, department, courseDescription } = req.body;
  
    try {
      const newCourse = new enrolledcourse({
        st_email,
        prof_email,
        courseName,
        department,
        courseDescription,
      });
  
      await newCourse.save();
      res.status(200).json(newCourse);
    } catch (error) {
      console.error('Failed to add enrolledcourse:', error);
      res.status(500).json({ error: 'Failed to add enrolledcourse' });
    }
  };
  
export const getRequestedCourses = async (req, res) => {
    const { email } = req.query;
    console.log(`Received email to fetch requested courses: ${email}`);
  
    try {
      const trimmedEmail = email.trim().toLowerCase();
      console.log(`Trimmed and lowercased email: ${trimmedEmail}`);
  
      const requested_courses = await requestedcourse.find({ st_email: trimmedEmail });
      console.log(`Database query result: ${requested_courses}`);
  
      res.status(200).json({requested_courses});
    } catch (error) {
      console.error('Failed to fetch requested courses:', error);
      res.status(500).json({ error: 'Failed to fetch requested courses' });
    }
}

export const addRequestedCourses = async (req, res) => {
    const { st_email, prof_email, courseName, department, courseDescription, status } = req.body;
  
    try {
      const newCourse = new requestedcourse({
        st_email,
        prof_email,
        courseName,
        department,
        courseDescription,
        status,
      });
  
      await newCourse.save();
      res.status(200).json(newCourse);
    } catch (error) {
      console.error('Failed to add requested course:', error);
      res.status(500).json({ error: 'Failed to add requested course' });
    }
};
  
export const updateRequestedCourses = async (req, res) => {
    const { st_email, prof_email, courseName, department, courseDescription, status } = req.body;

    // const allowedStatuses = ['pending', 'accepted', 'rejected'];
    // if (!allowedStatuses.includes(status)) {
    //     return res.status(400).json({ error: 'Invalid status value' });
    // }

    try {
        const updatedCourse = await requestedcourse.findOneAndUpdate(
            { st_email, prof_email, courseName },
            { status },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Requested course not found' });
        }

        if (status === 'accepted' || status === 'Accepted') {
            const newEnrolledCourse = new enrolledcourse({
                st_email,
                prof_email,
                courseName,
                department,
                courseDescription,
            });
            await newEnrolledCourse.save();
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Failed to update requested course:', error);
        res.status(500).json({ error: 'Failed to update requested course' });
    }
};

export const getOfferedCourses = async (req, res) => {
  const { email } = req.query;
  console.log(`Received email to fetch offered courses: ${email}`);

  try {
    const trimmedEmail = email.trim().toLowerCase();
    console.log(`Trimmed and lowercased email: ${trimmedEmail}`);

    const requestedCourses = await requestedcourse.find({ st_email: trimmedEmail });
    const requestedCourseNames = requestedCourses.map(course => course.courseName);

    const offeredCourses = await Course.find({
      courseName: { $nin: requestedCourseNames }
    });

    console.log(`Database query result: ${offeredCourses}`);

    res.status(200).json({ offered_courses: offeredCourses });
  } catch (error) {
    console.error('Failed to fetch offered courses:', error);
    res.status(500).json({ error: 'Failed to fetch offered courses' });
  }
};

export const getEnrollmentRequests = async (req, res) => {
  const { email } = req.query;
  console.log(`Received email to fetch enrollment requests: ${email}`);

  try {
    const trimmedEmail = email.trim().toLowerCase();
    console.log(`Trimmed and lowercased email: ${trimmedEmail}`);

    const courses = await Course.find({ email: trimmedEmail });
    const courseNames = courses.map(course => course.courseName);

    const requests = await requestedcourse.find({
      prof_email: trimmedEmail,
      courseName: { $in: courseNames },
      status: 'pending'
    });

    console.log(`Database query result: ${requests}`);

    res.status(200).json({ requests });
  } catch (error) {
    console.error('Failed to fetch enrollment requests:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment requests' });
  }
};

export const getEnrolledStudents = async (req, res) => {
  const { email, courseName } = req.query;
  console.log(`Received email to fetch enrolled students: ${email} for course: ${courseName}`);

  try {
    const trimmedEmail = email.trim().toLowerCase();
    console.log(`Trimmed and lowercased email: ${trimmedEmail}`);

    const enrolledStudents = await enrolledcourse.find({
      prof_email: trimmedEmail,
      courseName: courseName
    });

    console.log(`Database query result: ${enrolledStudents}`);

    res.status(200).json({ enrolled_students: enrolledStudents });
  } catch (error) {
    console.error('Failed to fetch enrolled students:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled students' });
  }
};