import Course from '../models/course.js'; // Assuming you have a Course model

export const addCourse = async (req, res) => {
  const { email, courseName, department, courseDescription } = req.body;

  try {
    const newCourse = new Course({
      email,
      courseName,
      department,
      courseDescription,
    });

    await newCourse.save();
    res.status(200).json(newCourse);
  } catch (error) {
    console.error('Failed to add course:', error);
    res.status(500).json({ error: 'Failed to add course' });
  }
};

export const getCourses = async (req, res) => {
    const { email } = req.query;
    console.log(`Received email to fetch courses: ${email}`);
  
    try {
      const trimmedEmail = email.trim().toLowerCase();
      console.log(`Trimmed and lowercased email: ${trimmedEmail}`);
  
      const courses = await Course.find({ email: trimmedEmail });
      console.log(`Database query result: ${courses}`);
  
      res.status(200).json({ courses });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  };

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  // Implement the logic to delete a course from the database
  // Example:
  try {
    // Delete course from the database using courseId
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
