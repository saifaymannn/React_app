import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import CustomAppBar from './AppBar';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const APP_ID = 'b95f8b74';
  const API_KEY = 'd80a5808b973dabf52aadb7d3a19b70c';

  useEffect(() => {
    const keywords = ['chicken', 'beef', 'vegan', 'dessert', 'pasta', 'salad', 'egyptian', 'sweets'];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    fetchRecipes(randomKeyword);
  }, []);

  const fetchRecipes = async (query, diet = '', country = '') => {
    let API_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    if (diet) {
      API_URL += `&diet=${diet}`;
    }
    if (country) {
      API_URL += `&cuisineType=${country}`;
    }

    try {
      const response = await axios.get(API_URL);
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchRecipes(query, dietFilter, countryFilter);
  };

  const getCookingTime = (recipe) => {
    return recipe.totalTime || Math.floor(Math.random() * 60) + 1;
  };

  return (
    <div>
      <CustomAppBar setDietFilter={setDietFilter} setCountryFilter={setCountryFilter} />
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Enter a keyword (e.g., chicken)"
          value={query}
          onChange={handleInputChange}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe.recipe} cookingTime={getCookingTime(recipe.recipe)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
