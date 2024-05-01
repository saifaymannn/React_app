import React, { useState } from 'react';
import axios from 'axios';
import './search.css';
import RecipeCard from './RecipeCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const APP_ID = 'b95f8b74';
  const API_KEY = 'd80a5808b973dabf52aadb7d3a19b70c';
  const API_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(API_URL);
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCookingTime = (recipe) => {
    return recipe.totalTime || Math.floor(Math.random() * 60) + 1; // If cooking time is not available, generate a random reasonable number
  };

  return (
    <div className="search-container">
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipe-container">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe.recipe} cookingTime={getCookingTime(recipe.recipe)} />
        ))}
      </div>
    </div>
  );
};

export default Search;
