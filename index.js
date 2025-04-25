import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/ConnectDB.js';
import { userRouter } from './routes/userRouter.js';
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());



app.use('/api/users', userRouter)


app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`)
});
