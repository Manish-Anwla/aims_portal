import axios from 'axios';

const backend_api_url = process.env.NEXT_PUBLIC_BACKEND_API;
console.log('Backend API URL:', backend_api_url); // Debugging log

export async function sendEmail(email) {
  try {
    const response = await axios.post(`${backend_api_url}/check-email`, { email });
    console.log(response.otp);
    console.log("Email sent successfully!");
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('type' in data) || !('otp' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return { exists: true, role: data.type, otp: data.otp }; // Assuming the backend sends the OTP back.
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { exists: false, message: 'Email not found in the database' };
    }
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
}

export async function addCourse(courseData) {
  try {
    console.log('Sending course data to backend:', courseData); // Debugging log
    const response = await axios.post(`${backend_api_url}/courses`, courseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    console.log('Response from backend:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
}

export async function getCourses(email) {
  try {
    const response = await axios.get(`${backend_api_url}/courses`, {
      params: { email }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('courses' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching courses:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function getEnrollmentRequests(email) {
  try {
    const response = await axios.get(`${backend_api_url}/enrollment-requests`, {
      params: { email }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('requests' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching enrollment requests:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function getEnrolledCourses(email) {
  try {
    const response = await axios.get(`${backend_api_url}/stdEnrolledCourses`, {
      params: { email }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('enrolled_courses' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data.enrolled_courses;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function getRequestedCourses(email) {
  try {
    const response = await axios.get(`${backend_api_url}/stdRequestedCourses`, {
      params: { email }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('requested_courses' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching requested courses:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function getOfferedCourses(email) {
  try {
    const response = await axios.get(`${backend_api_url}/stdOfferedCourses`, {
      params: { email }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('offered_courses' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching offered courses:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function addRequestedCourses(courseData) {
  try {
    console.log('Sending requested course data to backend:', courseData); // Debugging log
    const response = await axios.post(`${backend_api_url}/stdRequestedCourses`, courseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    console.log('Response from backend:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
}

export async function updateRequestedCourses(courseData) {
  try {
    console.log('Updating requested course data to backend:', courseData); // Debugging log
    const response = await axios.patch(`${backend_api_url}/stdRequestedCourses`, courseData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    console.log('Response from backend:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('There was a problem with the axios operation:', error);
    throw error;
  }
}

export async function getEnrolledStudents(email, courseName) {
  try {
    const response = await axios.get(`${backend_api_url}/enrolled-students`, {
      params: { email, courseName }
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = response.data;

    // Validate the response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    if (!('enrolled_students' in data)) {
      throw new Error('Missing expected fields in response data');
    }

    return data.enrolled_students;
  } catch (error) {
    console.error('Error fetching enrolled students:', error.response ? error.response.data : error.message);
    throw error;
  }
}
