import express, { application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songsRouter from './routes/songs';

const app: application = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/musicdb').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api', songsRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
