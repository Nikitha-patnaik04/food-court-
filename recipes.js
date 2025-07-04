// Sample recipe data
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
    
    {
        id: 2,
        title: "Kung Pao Chicken",
        cuisine: "chinese",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Spicy, sweet, and savory stir-fry with chicken, peanuts, and vegetables.",
        prepTime: "15 mins",
        cookTime: "10 mins"
    },
    {
        id: 3,
        title: "Classic Burger",
        cuisine: "american",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce in a soft bun.",
        prepTime: "10 mins",
        cookTime: "10 mins"
    },
    {
        id: 4,
        title: "Biryani",
        cuisine: "indian",
        image: "https://images.unsplash.com/photo-1633945274309-2c16c9682a8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Fragrant rice dish cooked with spices, meat, and caramelized onions.",
        prepTime: "30 mins",
        cookTime: "40 mins"
    },
   
    {
        id: 6,
        title: "Mac & Cheese",
        cuisine: "american",
        image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Creamy elbow macaroni with a rich cheese sauce, baked to perfection.",
        prepTime: "10 mins",
        cookTime: "25 mins"
    },
    {
        id: 7,
        title: "Tandoori Chicken",
        cuisine: "indian",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Marinated chicken cooked in a clay oven, with smoky flavors.",
        prepTime: "4 hours",
        cookTime: "20 mins"
    },
    {
        id: 8,
        title: "Peking Duck",
        cuisine: "chinese",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Crispy duck skin served with thin pancakes, hoisin sauce, and scallions.",
        prepTime: "24 hours",
        cookTime: "1 hour"
    },
    {
        id: 9,
        title: "BBQ Ribs",
        cuisine: "american",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: "Slow-cooked pork ribs basted in tangy barbecue sauce.",
        prepTime: "15 mins",
        cookTime: "3 hours"
    }
];

// DOM Elements
const recipesContainer = document.getElementById('recipes-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-links li a');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// Display all recipes initially
displayRecipes(recipes);

// Filter recipes by cuisine
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const cuisine = btn.dataset.cuisine;
        if (cuisine === 'all') {
            displayRecipes(recipes);
        } else {
            const filteredRecipes = recipes.filter(recipe => recipe.cuisine === cuisine);
            displayRecipes(filteredRecipes);
        }
    });
});

// Navigation links filter
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.dataset.cuisine) {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            const cuisine = link.dataset.cuisine;
            if (cuisine === 'all') {
                displayRecipes(recipes);
            } else {
                const filteredRecipes = recipes.filter(recipe => recipe.cuisine === cuisine);
                displayRecipes(filteredRecipes);
            }
            
            // Scroll to recipes section
            document.querySelector('.featured-recipes').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Burger menu for mobile
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Function to display recipes
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
                <a href="C:\Users\narasimha\Documents\food court\recipe\css\viwe.html" class="view-recipe">View Recipe chicken</a>
            </div>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });
}

// Explore button scroll to recipes
document.querySelector('.explore-btn').addEventListener('click', () => {
    document.querySelector('.featured-recipes').scrollIntoView({
        behavior: 'smooth'
    });
});

// Get all recipe titles
const titles = recipes.map(recipe => recipe.title);

// Find quick recipes (under 30 minutes total time)
const quickRecipes = recipes.filter(recipe => {
  const prep = parseInt(recipe.prepTime);
  const cook = parseInt(recipe.cookTime);
  return (prep + cook) <= 30;
});

// Display recipe information
function displayRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (recipe) {
    console.log(`**${recipe.title}**`);
    console.log(`Cuisine: ${recipe.cuisine}`);
    console.log(`Description: ${recipe.description}`);
    console.log(`Time: ${recipe.prepTime} prep, ${recipe.cookTime} cooking`);
  }
}