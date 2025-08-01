# Backend Setup Instructions

## Prerequisites
- Node.js installed
- MongoDB Atlas account

## Setup Steps

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `env.example` to `.env`
   - Replace the MongoDB connection string with your actual MongoDB Atlas connection string
   - The connection string should point to your `Formdata` database

3. **Start the Server**
   ```bash
   npm run dev
   ```
   The server will start on port 3000

## API Endpoints

- `POST /api/register` - Register a new user
- `GET /api/students` - Get all registered students
- `GET /` - Health check

## MongoDB Connection
Make sure your MongoDB Atlas connection string includes:
- Your actual username and password
- The correct cluster URL
- Database name: `Formdata`
- Collection will be automatically created as `RegistrationDetails` 