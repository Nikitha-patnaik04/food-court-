function displayRecipes(recipesToDisplay) {
    recipesContainer.innerHTML = '';
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <span class="recipe-cuisine ${recipe.cuisine}">${recipe.cuisine.charAt(0).toUpperCase() + recipe.cuisine.slice(1)}</span>
                <p class="recipe-desc">${recipe.description}</p>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> Prep: ${recipe.prepTime}</span>
                    <span><i class="fas fa-fire"></i> Cook: ${recipe.cookTime}</span>
                </div>
                <a href="recipe-detail.html?id=${recipe.id}" class="view-recipe">View Recipe</a>
            </div>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });
}