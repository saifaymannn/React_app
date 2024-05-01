import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  label: String,
  image: String,
  ingredients: [{ text: String }],
  cookingTime: Number,
  nutritionData: {
    calories: Number,
    totalNutrients: Map // or use an object of objects if needed
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe; 
    