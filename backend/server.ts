import express, { application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import songsRouter from './routes/songRoutes';

const app= express();
//app.use(cors());
app.use(cors({
  origin: 'https://inquisitive-griffin-a97ff5.netlify.app', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(express.json());

mongoose.connect('mongodb://admin:5V2NuPFfT7yRvsYJ@SG-songs-66516.servers.mongodirector.com:27017/admin').then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/', songsRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
