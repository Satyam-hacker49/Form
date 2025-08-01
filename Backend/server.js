require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/student');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    console.log('Received registration data:', req.body);
    
    const { firstname, username, password, confirmPassword } = req.body;
    
    // Validation
    if (!firstname || !username || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }
    
    // Check if user already exists
    const existingUser = await Student.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already exists' 
      });
    }
    
    // Create new student
    const newStudent = new Student({
      firstname,
      username,
      password,
      confirmPassword
    });
    
    const savedStudent = await newStudent.save();
    console.log('Student saved successfully:', savedStudent);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: {
        id: savedStudent._id,
        firstname: savedStudent.firstname,
        username: savedStudent.username
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('Received login data:', req.body);
    
    const { username, password } = req.body;
    
    // Validation
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    // Find user by username
    const user = await Student.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
    
    // Check password
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }
    
    console.log('Login successful for user:', user.username);
    
    res.json({
      success: true,
      message: 'Login successful!',
      data: {
        id: user._id,
        firstname: user.firstname,
        username: user.username
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0, confirmPassword: 0 });
    res.json({
      success: true,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});