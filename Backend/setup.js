const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up the backend...');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from env.example');
    console.log('⚠️  Please edit .env file with your MongoDB connection string');
  } else {
    console.log('❌ env.example file not found');
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📋 Next steps:');
console.log('1. Edit the .env file with your MongoDB Atlas connection string');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('\n🔗 Your MongoDB connection string should look like:');
console.log('mongodb+srv://username:password@cluster.mongodb.net/Formdata?retryWrites=true&w=majority'); 