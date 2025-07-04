
// Function to display recipes on the page
function displayRecipes(recipesToDisplay) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = '';  // Clear any previous content

    recipesToDisplay.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
        `;
        recipeList.appendChild(recipeDiv);
    });
}

// Function to filter recipes based on search input
function filterRecipes() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchInput));
    displayRecipes(filteredRecipes);
}

// Event listener for the search input to filter recipes dynamically
document.getElementById("searchInput").addEventListener("input", filterRecipes);

// Display all recipes when the page loads
displayRecipes(recipes);

// Log social media clicks
document.querySelectorAll('.social-media a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default link behavior
      const platform = this.getAttribute('title'); // Get the platform name
      console.log(`Clicked on ${platform}`); // Log the click
      window.open(this.href, '_blank'); // Open the link in a new tab
    });
  });

