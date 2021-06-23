import "./App.scss";
import React, { useState, useEffect } from "react";

function App() {
  const [meal, setMeal] = useState("");

  const handleNewMeal = async () => {
    try {
      const result = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (result.ok) {
        const randomMeal = await result.json();
        setMeal(randomMeal.meals[0]);
        console.log(meal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleNewMeal();
  }, []);

  return (
    <div className="App">
      <header>
        <h2>Don't know what to cook tonight? Press the button!</h2>
        <button onClick={handleNewMeal}>New Recipe</button>
      </header>

      <div id="container">
        <div id="meal-info">
          <h4 id="meal-name">{meal.strMeal}</h4>
          <div id="recipe-details">
            <h5>Cuisine: {meal.strArea}</h5>
            <h5>Category: {meal.strCategory}</h5>
          </div>
        </div>

        <div id="recipe-box">
          <div id="meal-img">
            <img src={meal.strMealThumb} alt={meal.strMeal} height="400px" />
          </div>
          <div id="recipe">
            <h3>Instructions:</h3>
            <p id="instructions">{meal.strInstructions}</p>
          </div>
          <div id="ingredients">
            <h3>Ingredients:</h3>
            <ul>
              {Object.keys(meal).map((key, i) => {
                if (
                  meal[key] &&
                  key.includes("Ingredient") &&
                  meal[key] !== " "
                ) {
                  return <li>{meal[key]}</li>;
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
