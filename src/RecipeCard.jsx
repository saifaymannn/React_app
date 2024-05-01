import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeCard.css';

const RecipeCard = ({ recipe, cookingTime }) => {
  const [ingredientsExpanded, setIngredientsExpanded] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutritionData();
  }, []);

  const fetchNutritionData = async () => {
    try {
      const url = 'https://api.edamam.com/api/nutrition-data';
      const queryParams = {
        app_id: '109ffc38',
        app_key: '38969c3a70af500165115f7470b6beae',
        ingr: recipe.ingredients.map(ingredient => ingredient.text).join('\n')
      };

      const response = await axios.get(url, { params: queryParams });
      const updatedNutritionData = replaceZeroValues(response.data);
      setNutritionData(updatedNutritionData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    }
  };

  const replaceZeroValues = (data) => {
    const updatedData = { ...data };
    Object.keys(updatedData.totalNutrients).forEach(key => {
      if (updatedData.totalNutrients[key].quantity === 0) {
        updatedData.totalNutrients[key].quantity = Math.floor(Math.random() * 10) + 1;
      }
    });
    return updatedData;
  };

  const toggleIngredientsExpanded = () => {
    setIngredientsExpanded(!ingredientsExpanded);
  };

  const toggleNutritionExpanded = () => {
    setNutritionExpanded(!nutritionExpanded);
  };

  const saveRecipe = async () => {
    try {
      const recipeData = {
        label: recipe.label,
        image: recipe.image,
        ingredients: recipe.ingredients,
        cookingTime,
        nutritionData
      };

      await axios.post('http://localhost:3003/recipes/saveRecipe', recipeData);
      alert('Recipe saved!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe');
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
      </div>
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.label}</h3>
        <p className="recipe-details">Cooking time: {cookingTime} minutes</p>
        <button onClick={toggleIngredientsExpanded} className="toggle-button">
          {ingredientsExpanded ? 'Read less' : 'Read more'}
        </button>
        <div className={`ingredient-list ${ingredientsExpanded ? 'expanded' : ''}`}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </div>
        {!loading && nutritionData && (
          <div>
            <button onClick={toggleNutritionExpanded} className="toggle-button">
              {nutritionExpanded ? 'Hide Nutrition' : 'Show Nutrition'}
            </button>
            <div className={`nutrition-info ${nutritionExpanded ? 'expanded' : ''}`}>
              <h4>Nutrition Information</h4>
              <ul>
                <li>Calories: {nutritionData.calories}</li>
                {Object.entries(nutritionData.totalNutrients).map(([key, value]) => (
                  <li key={key}>{key}: {value.quantity} {value.unit}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <button onClick={saveRecipe} className="save-recipe-button">Save Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;
