import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/users.js'; 
import { recipeRouter } from './routes/recipes.js'; // Update this path if necessary

const app = express();
app.use(express.json());
app.use(cors());
//test
app.use('/recipes', recipeRouter);
//test 

app.use('/', userRouter);  // This sets up your routes under the root path

mongoose.connect("mongodb+srv://saifayman9916:Saif1234@recipes.yb3i9f5.mongodb.net/?retryWrites=true&w=majority&appName=recipes");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => { 
  console.log("saif's MongoDB is connected successfully");
});

const PORT = process.env.PORT || 3003; 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
 