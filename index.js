require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Debug log to ensure MongoDB URI is loaded
console.log("Connecting to:", process.env.MONGODB_URI);

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  }
})();

const skillRoutes = require('./routes/skills');
const projectRoutes = require('./routes/project');

app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);

// Make sure this port is used (Cloud Run sets PORT=8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
