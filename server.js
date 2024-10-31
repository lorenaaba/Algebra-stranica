const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const API_BASE_URL = 'https://www.fulek.com/data/api';

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      username,
      password
    });
    res.json(response.data);  // JWT token will be in response.data
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

// Get all courses (requires token)
app.get('/courses', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const response = await axios.get(`${API_BASE_URL}/supit/curriculum-list/hr`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch courses', error: error.message });
  }
});

// Get specific course details (requires token)
app.get('/course/:id', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const courseId = req.params.id;
  try {
    const response = await axios.get(`${API_BASE_URL}/supit/get-curriculum/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: `Failed to fetch course ${courseId}`, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
