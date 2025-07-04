const recipes = [
    {
        id: 1,
        title: "Butter Chicken",
        cuisine: "indian",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Creamy tomato-based curry with tender chicken pieces, a North Indian favorite.",
        prepTime: "20 mins",
        cookTime: "30 mins",
        ingredients: [
            "500g chicken thigh fillets",
            "1 cup yogurt",
            "2 tbsp lemon juice",
            "2 tsp garam masala",
            "1 tbsp ginger garlic paste",
            "2 tbsp butter",
            "1 large onion, diced",
            "400g tomato puree",
            "1 cup heavy cream",
            "1 tsp sugar",
            "Salt to taste"
        ],
        instructions: [
            "Marinate chicken with yogurt, lemon juice, and spices for at least 1 hour.",
            "Grill or pan-fry chicken until lightly charred but not fully cooked.",
            "In a pan, melt butter and sauté onions until golden.",
            "Add tomato puree and cook for 5 minutes.",
            "Add cream, sugar, and salt, then simmer for 10 minutes.",
            "Add chicken and simmer for another 10 minutes.",
            "Garnish with fresh cream and coriander leaves."
        ]
    },
    // ... (your other recipes with added ingredients and instructions)
];

const recipesContainer = document.getElementById('recipes-container');
const recipeDetails = document.getElementById('recipe-details');

// Initial display of all recipes
displayRecipes(recipes);

function displayRecipes(recipesToDisplay) {
    recipesContainer.innerHTML = '';
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.dataset.id = recipe.id;
        
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <span class="recipe-cuisine ${recipe.cuisine}">
                    ${recipe.cuisine.charAt(0).toUpperCase() + recipe.cuisine.slice(1)}
                </span>
                <p class="recipe-desc">${recipe.description}</p>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime}</span>
                    <span><i class="fas fa-fire"></i> Cook: ${recipe.cookTime}</span>
                </div>
                <button class="view-recipe" data-id="${recipe.id}">
                    View Recipe
                </button>
            </div>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });

    // Add event listeners to all buttons
    document.querySelectorAll('.view-recipe').forEach(button => {
        button.addEventListener('click', showRecipeDetails);
    });
}

function showRecipeDetails(e) {
    const recipeId = parseInt(e.target.dataset.id);
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (!recipe) return;
    
    // Hide recipes container and show details
    recipesContainer.style.display = 'none';
    recipeDetails.style.display = 'block';
    
    // Generate ingredients list
    const ingredientsList = recipe.ingredients.map(ing => 
        `<li>${ing}</li>`
    ).join('');
    
    // Generate instructions list
    const instructionsList = recipe.instructions.map((step, i) => 
        `<li><strong>Step ${i+1}:</strong> ${step}</li>`
    ).join('');
    
    // Populate details
    recipeDetails.innerHTML = `
        <button class="back-button" id="back-button">
            <i class="fas fa-arrow-left"></i> Back to Recipes
        </button>
        
        <h2>${recipe.title}</h2>
        
        <div class="recipe-info">
            <span class="recipe-cuisine ${recipe.cuisine}">
                ${recipe.cuisine.charAt(0).toUpperCase() + recipe.cuisine.slice(1)}
            </span>
            <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime}</span>
            <span><i class="fas fa-fire"></i> Cook: ${recipe.cookTime}</span>
        </div>
        
        <img src="${recipe.image}" alt="${recipe.title}">
        
        <p>${recipe.description}</p>
        
        <h3>Ingredients</h3>
        <ul>${ingredientsList}</ul>
        
        <h3>Instructions</h3>
        <ol>${instructionsList}</ol>
        
        <button class="back-button" id="back-button-bottom">
            <i class="fas fa-arrow-left"></i> Back to Recipes
        </button>
    `;
    
    // Add back button functionality
    document.getElementById('back-button').addEventListener('click', () => {
        recipeDetails.style.display = 'none';
        recipesContainer.style.display = 'grid';
    });
    
    document.getElementById('back-button-bottom').addEventListener('click', () => {
        recipeDetails.style.display = 'none';
        recipesContainer.style.display = 'grid';
    });
    
    // Scroll to top of details
    window.scrollTo({ top: 0, behavior: 'smooth' });
}