const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema, 'RegistrationDetails');


module.exports = Student;
