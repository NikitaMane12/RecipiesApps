import { useState, useEffect } from "react";
import Navbar from "./componets/Navbar";
import "./App.css";

const API_KEY = "4e9d6b019f25425596ca3d9ef92e078f";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [servings, setServings] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegetarian`
      );
      const data = await response.json();
      setRecipes(data.recipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setServings(recipe.servings || 1);
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
  };

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">Vegetarian Recipes</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search recipes..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="recipe-list">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-img"
                  />
                  <h3 className="recipe-name">{recipe.title}</h3>
                  <button
                    onClick={() => openRecipe(recipe)}
                    className="recipe-link"
                  >
                    View Recipe
                  </button>
                </div>
              ))
            ) : (
              <p className="no-results">No recipes found.</p>
            )}
          </div>
        )}

        {selectedRecipe && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={closeRecipe}>
                ✖
              </button>
              <h2>{selectedRecipe.title}</h2>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="modal-img"
              />
              <p>{selectedRecipe.summary.replace(/<[^>]*>/g, "")}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
