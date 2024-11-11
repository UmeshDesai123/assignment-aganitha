import React, { useState } from 'react';
import './style.css';
import axios from 'axios';


function Recipe() {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);

  const searchMeals = async () => {
    setLoading(true);
    // Join multiple ingredients with commas
    const ingredientQuery = ingredients.split(',').map(ing => ing.trim()).join('&');
    console.log(ingredientQuery);

    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientQuery}`);
      setMeals(response.data.meals ?? []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching meal data", error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <div className='recipe-container'>
      <h1>Recipe Ideas</h1>
      <input
        type="text"
        placeholder="Enter ingredients (e.g., chicken, tomato, garlic)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={searchMeals} disabled={loading}>Get Recipe</button>
      {
        loading ? <p>Loading...</p> :
          <div className='recipe-results'>
            {
              (ingredients && meals.length == 0) && <p>No recipe found</p>
            }
            {
              meals.map((item) =>
                <div className='recipe-item' key={item.idMeal}>
                  <img src={item.strMealThumb}></img>
                  <h3>{item.strMeal}</h3>
                </div>)
            }

          </div>
      }

    </div>

  )
}

export default Recipe;