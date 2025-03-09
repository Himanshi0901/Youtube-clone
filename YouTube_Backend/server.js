import express from 'express';
import mongoose from 'mongoose';
import {routes as youtubeDataRoutes } from './Routes/YoutubeData.routes.js'
import { userRoutes } from './Routes/User.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { commentRoutes } from './Routes/comment.routes.js';

dotenv.config();

const app=express();
const databaseName='Youtube_Clone';


mongoose.connect(process.env.MONGO_URL);

let db=mongoose.connection;

db.on('open',()=>{
  console.log(`Connection is Successful`)
});

db.on('error',()=>{
  console.log(`Connection isn't successful`)
});

app.use(cors());
app.use(express.json());

youtubeDataRoutes(app);
userRoutes(app);
commentRoutes(app);


// Starting the server using environment variable
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});