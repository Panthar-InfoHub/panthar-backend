import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/ConnectDB.js';
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());




// const skillRoutes = require('./routes/skills');
// const projectRoutes = require('./routes/project');
// app.use('/api/skills', skillRoutes);
// app.use('/api/projects', projectRoutes);


app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`)
});
