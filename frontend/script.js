const baseURL = 'http://localhost:3000';

async function fetchRecipes() {
  const response = await fetch(`${baseURL}/recipes`);
  const recipes = await response.json();
  const recipeList = document.getElementById('recipes');
  recipeList.innerHTML = '';
  recipes.forEach(recipe => {
    const recipeItem = document.createElement('li');
    recipeItem.classList.add('recipe');
    recipeItem.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Steps:</strong> ${recipe.steps}</p>
      <button onclick="deleteRecipe('${recipe._id}')">Delete</button>
    `;
    recipeList.appendChild(recipeItem);
  });
}

async function addRecipe() {
  const title = document.getElementById('title').value;
  const ingredients = document.getElementById('ingredients').value;
  const steps = document.getElementById('steps').value;

  const response = await fetch(`${baseURL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, ingredients, steps }),
  });

  if (response.ok) {
    fetchRecipes();
    document.getElementById('title').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('steps').value = '';
  }
}

async function deleteRecipe(id) {
  await fetch(`${baseURL}/recipes/${id}`, { method: 'DELETE' });
  fetchRecipes();
}

document.getElementById('add-recipe').addEventListener('click', addRecipe);
fetchRecipes();
