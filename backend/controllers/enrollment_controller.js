export const getEnrollmentRequests = async (req, res) => {
  // Implement the logic to get enrollment requests from the database
  // Example:
  try {
    const requests = [
      { id: 1, studentName: 'Student 1', courseName: 'Course 1' },
      { id: 2, studentName: 'Student 2', courseName: 'Course 2' }
    ]; // Replace with actual database logic
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrollment requests' });
  }
};

export const respondToEnrollmentRequest = async (req, res) => {
  const { requestId, isApproved } = req.body;
  // Implement the logic to respond to an enrollment request
  // Example:
  try {
    // Update the enrollment request status in the database using requestId and isApproved
    res.status(200).json({ message: 'Enrollment request responded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to enrollment request' });
  }
};
